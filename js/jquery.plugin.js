/*! Healper function 
function scss(e){var t=document.head||document.getElementsByTagName("head")[0],c=document.createElement("link");c.href=e,c.type="text/css",c.rel="stylesheet",t.append(c)}function jscript(e){var t=document.createElement("script");t.type="text/javascript",t.charset="utf-8",t.src=e,document.body.appendChild(t)} 
*/ 
/** Simple Autocomplete 
 * 
!function(t){t.fn.simpleAutocomplete=function(e){var a=t.extend({data:[]},e),n=t(this),i=t('<div class="autocomplete-suggestions"></div>').insertAfter(n),o=-1;function l(e,a){var n=new RegExp("("+a+")","ig");return function(e){return t("<div/>").text(e).html()}(e).replace(n,'<span class="highlight">$1</span>')}function r(e){0;var n=function(e){return t.grep(a.data,function(t){return-1!==t.label.toLowerCase().indexOf(e.toLowerCase())})}(e);i.empty().hide(),o=-1,e&&0!==n.length&&(t.each(n,function(a,n){var o=l(n.label,e);t('<div class="autocomplete-item"></div>').html(o).attr("data-id",n.id).attr("data-label",n.label).appendTo(i)}),i.show())}function c(t){var e=i.children(".autocomplete-item");if(0!==e.length){(o+=t)<0&&(o=e.length-1),o>=e.length&&(o=0),e.removeClass("hover");var a=e.eq(o).addClass("hover"),n=i.scrollTop(),l=i.height(),r=a.position().top,c=a.outerHeight();r+c>l?i.scrollTop(n+r+c-l):r<0&&i.scrollTop(n+r)}}n.on("keydown",function(t){var e,a=t.which;38===a?(c(-1),t.preventDefault()):40===a?(c(1),t.preventDefault()):13===a?((e=i.children(".autocomplete-item").eq(o)).length&&(n.val(e.data("label")).data("id",e.data("id")),i.hide()),t.preventDefault()):(27===a||9===a)&&i.hide()}),n.on("keyup",function(e){-1===t.inArray(e.which,[13,38,40,27,9])&&r(n.val())}),i.on("click",".autocomplete-item",function(){n.val(t(this).data("label")).data("id",t(this).data("id")),i.hide()}),n.on("blur",function(){setTimeout(function(){var e=t.trim(n.val().toLowerCase()),i=!1;t.each(a.data,function(t,a){if(a.label.toLowerCase()===e)return n.data("id",a.id),i=!0,!1}),i||n.data("id",null)},150)}),t(document).on("click",function(e){t(e.target).closest(n).length||t(e.target).closest(i).length||i.hide()})}}(jQuery);
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
!function(t){t.fn.simplePaginate=function(e){const n=t.extend({data:[],rowsPerPage:5,columns:[]},e),a=this,o=t('<div class="align-content-center pagination2 margin-bottom"></div>').insertAfter(a);let s=1;function i(e){const o=(e-1)*n.rowsPerPage,s=o+n.rowsPerPage,i=n.data.slice(o,s);let r=a.find("tbody");0===r.length&&(r=t("<tbody></tbody>").appendTo(a)),r.empty(),i.forEach(e=>{const a=t("<tr></tr>");n.columns.forEach(t=>{a.append(`<td>${e[t]}</td>`)}),r.append(a)})}function r(){const e=Math.ceil(n.data.length/n.rowsPerPage);if(o.empty(),n.data.length<=n.rowsPerPage)o.hide();else{o.show();for(let n=1;n<=e;n++){const e=t(`<button data-page="${n}">${n}</button>`);n===s&&e.addClass("active"),o.append(e)}}}return o.on("click","button",function(){s=parseInt(t(this).attr("data-page")),i(s),r()}),i(s),r(),this}}(jQuery);
*/
(function ($) {
    $.fn.simplePaginate = function (options) {
        const settings = $.extend({
            data: [],
            rowsPerPage: 5,
            columns: [],
            onSuccess: function () { } // Dipanggil setelah semua data ter-append
        }, options);

        const table = this;
        const pagination = $('<div class="align-content-center pagination2 margin-bottom"></div>').insertAfter(table);

        let currentPage = 1;

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

            // Panggil event onSuccess setelah semua data ter-append
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

        renderPage(currentPage);
        renderPagination();

        return this;
    }
})(jQuery);

/** Button Ajax */
!function(a){a.fn.ajaxButton=function(n){return this.each(function(){let o=a(this),s=o.find(".icon"),t=o.data("icon")||"check",e=o.data("url")||n.url||"#",c=o.data("method")||n.method||"GET";o.data("alert")||n.alert,o.on("click",function(){o.hasClass("loading")||(o.hasClass("btn-ajax")||o.addClass("btn-ajax"),o.addClass("loading").prop("disabled",!0),s.removeClass(`icon-${t}`).addClass("icon-spinner_2"),a.ajax({url:e,method:c,data:n.payload||{example:"data"},success:function(a){"function"==typeof n.onSuccess&&n.onSuccess(a,o)},error:function(a){"function"==typeof n.onError&&n.onError(a,o)},complete:function(){o.removeClass("loading").prop("disabled",!1),s.removeClass("icon-spinner_2").addClass(`icon-${t}`)}}))})}),this}}(jQuery);