/*! Healper function 
function scss(e){var t=document.head||document.getElementsByTagName("head")[0],c=document.createElement("link");c.href=e,c.type="text/css",c.rel="stylesheet",t.append(c)}function jscript(e){var t=document.createElement("script");t.type="text/javascript",t.charset="utf-8",t.src=e,document.body.appendChild(t)} 
*/ 
/** Simple Autocomplete 
 * 
*/
(function ($) {
    $.fn.simpleAutocomplete = function (options) {
        var settings = $.extend({
            data: []
        }, options);

        var $input = $(this);
        var $suggestions = $('<div class="autocomplete-suggestions"></div>').insertAfter($input);
        var selectedIndex = -1;

        function highlightMatch(text, term) {
            var regex = new RegExp("(" + term + ")", "ig");
            return $("<div/>").text(text).html().replace(regex, '<span class="highlight">$1</span>');
        }

        function filterSuggestions(query) {
            var results = $.grep(settings.data, function (item) {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            return results;
        }

        function renderSuggestions(query) {
            var matches = filterSuggestions(query);

            $suggestions.empty().hide();
            selectedIndex = -1;

            if (query && matches.length !== 0) {
                $.each(matches, function (index, item) {
                    var highlighted = highlightMatch(item.label, query);
                    $('<div class="autocomplete-item"></div>')
                        .html(highlighted)
                        .attr("data-id", item.id)
                        .attr("data-label", item.label)
                        .appendTo($suggestions);
                });
                $suggestions.show();
            }
        }

        function moveSelection(step) {
            var $items = $suggestions.children(".autocomplete-item");

            if ($items.length === 0) return;

            selectedIndex += step;

            if (selectedIndex < 0) selectedIndex = $items.length - 1;
            if (selectedIndex >= $items.length) selectedIndex = 0;

            $items.removeClass("hover");
            var $selected = $items.eq(selectedIndex).addClass("hover");

            var scrollTop = $suggestions.scrollTop();
            var containerHeight = $suggestions.height();
            var itemTop = $selected.position().top;
            var itemHeight = $selected.outerHeight();

            if (itemTop + itemHeight > containerHeight) {
                $suggestions.scrollTop(scrollTop + itemTop + itemHeight - containerHeight);
            } else if (itemTop < 0) {
                $suggestions.scrollTop(scrollTop + itemTop);
            }
        }

        $input.on("keydown", function (e) {
            var key = e.which;

            if (key === 38) { // Up
                moveSelection(-1);
                e.preventDefault();
            } else if (key === 40) { // Down
                moveSelection(1);
                e.preventDefault();
            } else if (key === 13) { // Enter
                var $selectedItem = $suggestions.children(".autocomplete-item").eq(selectedIndex);
                if ($selectedItem.length) {
                    $input.val($selectedItem.data("label")).data("id", $selectedItem.data("id"));
                    $suggestions.hide();
                }
                e.preventDefault();
            } else if (key === 27 || key === 9) { // Esc or Tab
                $suggestions.hide();
            }
        });

        $input.on("keyup", function (e) {
            if ($.inArray(e.which, [13, 38, 40, 27, 9]) === -1) {
                renderSuggestions($input.val());
            }
        });

        $suggestions.on("click", ".autocomplete-item", function () {
            $input.val($(this).data("label")).data("id", $(this).data("id"));
            $suggestions.hide();
        });

        $input.on("blur", function () {
            setTimeout(function () {
                var inputValue = $.trim($input.val().toLowerCase());
                var found = false;

                $.each(settings.data, function (index, item) {
                    if (item.label.toLowerCase() === inputValue) {
                        $input.data("id", item.id);
                        found = true;
                        return false;
                    }
                });

                if (!found) {
                    $input.data("id", null);
                }
            }, 150);
        });

        $(document).on("click", function (e) {
            if (!$(e.target).closest($input).length && !$(e.target).closest($suggestions).length) {
                $suggestions.hide();
            }
        });
    };
})(jQuery);
/** Simple Paginate 
 * 
// cara panggil plugin
$("#myTable").simplePaginate({
    data: data,
    rowsPerPage: 5,
    currentPage: 3, // (optional) misal ingin langsung kehalaman 3
    columns: ["no", "nama", "alamat"],
    onSuccess: function (data, tbody) {
        $(this).find('tbody td').on('click', function () {
            $('tr').removeClass('active');
            $(this).parent('tr').addClass('active');
        });
    }
});
// Jika data API sudah diperbarui tetap di currentPage aktif
$("#myTable").simplePaginate('updateData', newData);
// Jika data API sudah diperbarui dan ingin pergi ke halaman 3
$("#myTable").simplePaginate('updateData', newData, 3);
// Jika ingin mendestroy plugin
$("#myTable").simplePaginate('destroy');
*/

(function ($) {
    $.fn.simplePaginate = function (optionsOrMethod) {
        if (typeof optionsOrMethod === 'string') {
            const method = optionsOrMethod;
            const args = Array.prototype.slice.call(arguments, 1);
            const instance = this.data('simplePaginate');

            if (instance && typeof instance[method] === 'function') {
                return instance[method].apply(instance, args);
            }
            return this;
        }

        const settings = $.extend({
            data: [],
            rowsPerPage: 5,
            currentPage: 1,
            columns: [],
            onSuccess: function () { }
        }, optionsOrMethod);

        const table = this;
        const pagination = $('<div class="align-content-center simple-pg"></div>').insertAfter(table);
        let currentPage = settings.currentPage;

        function renderPage(page) {
            const startIndex = (page - 1) * settings.rowsPerPage;
            const endIndex = startIndex + settings.rowsPerPage;
            const pageData = settings.data.slice(startIndex, endIndex);

            let tbody = table.find("tbody");
            if (tbody.length === 0) {
                tbody = $("<tbody></tbody>").appendTo(table);
            }

            tbody.empty();

            pageData.forEach(rowData => {
                const row = $("<tr></tr>");
                settings.columns.forEach(column => {
                    row.append(`<td>${rowData[column]}</td>`);
                });
                tbody.append(row);
            });

            settings.onSuccess.call(table, pageData, tbody);
        }

        function renderPagination() {
            const totalPages = Math.ceil(settings.data.length / settings.rowsPerPage);

            pagination.empty();

            if (settings.data.length <= settings.rowsPerPage) {
                pagination.hide();
            } else {
                pagination.show();
                for (let i = 1; i <= totalPages; i++) {
                    const button = $(`<button data-page="${i}">${i}</button>`);
                    if (i === currentPage) button.addClass("active");
                    pagination.append(button);
                }
            }
        }

        pagination.on("click", "button", function () {
            currentPage = parseInt($(this).attr("data-page"));
            renderPage(currentPage);
            renderPagination();
        });

        this.data('simplePaginate', {
            updateData: function (newData, newPage) {
                settings.data = newData;

                if (typeof newPage !== 'undefined' && !isNaN(newPage)) {
                    currentPage = newPage;
                }

                const totalPages = Math.ceil(settings.data.length / settings.rowsPerPage);
                if (currentPage > totalPages) {
                    currentPage = totalPages > 0 ? totalPages : 1;
                }

                renderPage(currentPage);
                renderPagination();
            },
            destroy: function () {
                pagination.remove();
                table.find('tbody').remove();
                table.removeData('simplePaginate');
            }
        });

        renderPage(currentPage);
        renderPagination();

        return this;
    }
})(jQuery);
/** Array to Table just for icon list
 * $('#icon-table').arrayToTable(icons, { columnsPerRow: 8 });
*/
(function($) {
    $.fn.arrayToTable = function(data, options) {
        var settings = $.extend({
            columnsPerRow: 6,       // Default jumlah kolom per baris
            allRowInsert: true,     // Jika false, semua baris masuk ke tbody
            filterData: null
        }, options);

        return this.each(function() {
            var $table = $(this);
            var $tableHead = $table.find('thead');
            var $tableBody = $table.find('tbody');

            // Reset isi tabel
            $tableHead.empty();
            $tableBody.empty();

            var row = $('<tr></tr>');
            var num = 0;
            var cell, fdata;

            $.each(data, function(index, value) {
                // Jalankan filterData jika disediakan, jika tidak gunakan value asli
                fdata = (typeof settings.filterData !== 'function') ? value : settings.filterData(index, value);

                // Jika allRowInsert true, baris pertama ke thead, sisanya ke tbody
                if (settings.allRowInsert && num === 0) {
                    cell = $('<th></th>').html(fdata);
                } else {
                    cell = $('<td></td>').html(fdata);
                }

                row.append(cell);

                if ((index + 1) % settings.columnsPerRow === 0) {
                    if (settings.allRowInsert && num === 0) {
                        $tableHead.append(row);
                    } else {
                        $tableBody.append(row);
                    }
                    row = $('<tr></tr>');
                    num++;
                }
            });

            // Jika ada sisa baris terakhir
            if (row.children().length > 0) {
                var remainingCells = settings.columnsPerRow - row.children().length;

                for (var i = 0; i < remainingCells; i++) {
                    var emptyCell = (settings.allRowInsert && num === 0) ? $('<th></th>').html('&nbsp;') : $('<td></td>').html('&nbsp;');
                    row.append(emptyCell);
                }

                if (settings.allRowInsert && num === 0) {
                    $tableHead.append(row);
                } else {
                    $tableBody.append(row);
                }
            }
        });
    };
})(jQuery);


/** Button Ajax */
!function(a){a.fn.ajaxButton=function(n){return this.each(function(){let o=a(this),s=o.find(".icon"),t=o.data("icon")||"check",e=o.data("url")||n.url||"#",c=o.data("method")||n.method||"GET";o.data("alert")||n.alert,o.on("click",function(){o.hasClass("loading")||(o.hasClass("btn-ajax")||o.addClass("btn-ajax"),o.addClass("loading").prop("disabled",!0),s.removeClass(`icon-${t}`).addClass("icon-spinner_2"),a.ajax({url:e,method:c,data:n.payload||{example:"data"},success:function(a){"function"==typeof n.onSuccess&&n.onSuccess(a,o)},error:function(a){"function"==typeof n.onError&&n.onError(a,o)},complete:function(){o.removeClass("loading").prop("disabled",!1),s.removeClass("icon-spinner_2").addClass(`icon-${t}`)}}))})}),this}}(jQuery);

/** ini contoh simple Alert */
(function($) {
    $.simpleAlert = function(options) {
        var settings = $.extend({
            title: 'Alert',
            message: 'This is a simple alert!',
            type: '', // success, error, warning, info
            showYesNo: false,
            yesText: 'Yes',
            noText: 'No',
            buttonText: 'OK',
            autoClose: 0, // in milliseconds, 0 = manual close
            onClose: null,
            onYes: null,
            onNo: null
        }, options);

        // Remove existing alerts
        $('.simple-alert-overlay').remove();

        var overlay = $('<div class="simple-alert-overlay"></div>');
        var box = $('<div class="simple-alert-box"></div>').addClass(settings.type);

        var title = $('<h4></h4>').html(settings.title);
        var message = $('<p></p>').html(settings.message);

        box.append(title, message);

        // Button Config
        if (settings.showYesNo) {
            var btnYes = $('<button></button>').text(settings.yesText);
            var btnNo = $('<button></button>').text(settings.noText).css('background', '#6c757d');

            btnYes.on('click', function() {
                overlay.fadeOut(200, function() {
                    overlay.remove();
                    if (typeof settings.onYes === 'function') settings.onYes();
                });
            });

            btnNo.on('click', function() {
                overlay.fadeOut(200, function() {
                    overlay.remove();
                    if (typeof settings.onNo === 'function') settings.onNo();
                });
            });

            box.append(btnYes, btnNo);

        } else if (settings.autoClose === 0) {
            // Show single button if no auto-close
            var btnClose = $('<button></button>').text(settings.buttonText);
            btnClose.on('click', function() {
                overlay.fadeOut(200, function() {
                    overlay.remove();
                    if (typeof settings.onClose === 'function') settings.onClose();
                });
            });
            box.append(btnClose);
        }

        overlay.append(box);
        $('body').append(overlay);

        // Auto close logic
        if (settings.autoClose > 0) {
            setTimeout(function() {
                overlay.fadeOut(200, function() {
                    overlay.remove();
                    if (typeof settings.onClose === 'function') settings.onClose();
                });
            }, settings.autoClose);
        }
    };
})(jQuery);
// anti XSS dan even On Off for jquery 1.8.3
// https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js
// Contoh Penggunaan
// $(".target").xhtml('<img src="x" onerror="alert(\'XSS\')">');
// $(".target").xbind('click',function(e){});
(function($) {
    $.fn.xbind = function(eventName, callback) {
        return this.each(function() {
            $(this).off(eventName).on(eventName, callback);
        })
    };
    $.fn.xhtml = function(source) {

        function sanitizeAndRender(element) {
            var cleanInput = DOMPurify.sanitize(source);
            $(element).html(cleanInput);
        }

        function loadDOMPurify(callback) {
            if (typeof DOMPurify === 'undefined') {
                $.getScript('https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js')
                    .done(function() {
                        callback();
                    })
                    .fail(function() {
                        console.error('Failed to load DOMPurify.');
                    });
            } else {
                callback();
            }
        }

        return this.each(function() {
            var element = this; // Ini DOM element yang spesifik
            loadDOMPurify(function() {
                sanitizeAndRender(element);
            });
        });

    };
})(jQuery);