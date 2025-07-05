jQuery(document).ready(function(t) {
    // Tabs
    t(".tabs").each(function(a, e) {
        var current_tabs = t(this);
        current_tabs.prepend('<div class="tab-nav line"></div>');
        var l = t(e).find(".tab-label");
        current_tabs.children(".tab-nav").prepend(l);
        current_tabs.children(".tab-item").each(function(a) {
            t(this).attr("id", "tab-" + (a + 1));
        });

        t(".tab-nav").each(function() {
            t(this).children().each(function(a) {
                t(this).attr("href", "#tab-" + (a + 1));
            });
        });

        current_tabs.find(".tab-nav a").click(function(a) {
            t(this).parent().children().removeClass("active-btn");
            t(this).addClass("active-btn");
            var e = t(this).attr("href");
            t(this).parent().parent().find(".tab-item").not(e).hide();
            t(this).parent().parent().find(e).fadeIn();
            return false;
        });
    });

    // Aside Navigation
    t(".aside-nav > ul > li ul").each(function(a, e) {
        var l = '<span class="count-number"> ' + t(e).find("li").length + "</span>";
        t(e).closest("li").children("a").append(l);
    });

    t(".aside-nav > ul > li:has(ul)").addClass("aside-submenu");
    t(".aside-nav > ul ul > li:has(ul)").addClass("aside-sub-submenu");

    t(".aside-nav > ul > li.aside-submenu > a").on('click', function(e) {
        e.preventDefault();
        var ul = t(this).next('ul');
        if (ul.hasClass("show-aside-ul")) {
            ul.removeClass("show-aside-ul").slideUp("slow");
        } else {
            t(".aside-nav ul li.aside-submenu > ul").removeClass("show-aside-ul").slideUp("slow");
            ul.addClass("show-aside-ul").slideDown("slow");
        }
    });

    t(".aside-nav > ul ul > li.aside-sub-submenu > a").on('click', function(e) {
        e.preventDefault();
        var ul = t(this).next('ul');
        if (ul.hasClass("show-aside-ul")) {
            ul.removeClass("show-aside-ul").slideUp("slow");
        } else {
            t(".aside-nav ul ul li > ul").removeClass("show-aside-ul").slideUp("slow");
            ul.addClass("show-aside-ul").slideDown("slow");
        }
    });

    t(".aside-nav-text").on('click', function() {
        t(".aside-nav > ul").toggleClass("show-menu");
    });

    // Nav Menu
    t(".nav-menu > ul > li ul").each(function(a, e) {
        var l = '<span class="count-number"> ' + t(e).find("li").length + "</span>";
        t(e).closest("li").children("a").append(l);
    });

    t(".nav-menu > ul li:has(ul)").addClass("submenu");
    t(".nav-menu > ul ul li:has(ul)").addClass("sub-submenu").removeClass("submenu");

    t(".nav-menu > ul li.submenu > a").on('click', function(e) {
        e.preventDefault();
        var ul = t(this).next('ul');
        if (ul.hasClass("show-ul")) {
            ul.removeClass("show-ul").slideUp("slow");
        } else {
            t(".nav-menu > ul li.submenu > ul").removeClass("show-ul").slideUp("slow");
            ul.addClass("show-ul").slideDown("slow");
        }
    });

    t(".nav-menu > ul ul > li.sub-submenu > a").on('click', function(e) {
        e.preventDefault();
        var ul = t(this).next('ul');
        if (ul.hasClass("show-ul")) {
            ul.removeClass("show-ul").slideUp("slow");
        } else {
            t(".nav-menu ul ul li > ul").removeClass("show-ul").slideUp("slow");
            ul.addClass("show-ul").slideDown("slow");
        }
    });

    t(".nav-text").on('click', function() {
        t(".nav-menu > ul").toggleClass("show-menu");
    });

    // Placeholder Compatibility
    if (!("placeholder" in document.createElement("input"))) {
        t("[placeholder]").focus(function() {
            var a = t(this);
            if (a.val() == a.attr("placeholder")) {
                a.val("").removeClass("placeholder");
                if (a.hasClass("password")) {
                    a.removeClass("password");
                    this.type = "password";
                }
            }
        }).blur(function() {
            var a = t(this);
            if (a.val() == "" || a.val() == a.attr("placeholder")) {
                if (this.type == "password") {
                    a.addClass("password");
                    this.type = "text";
                }
                a.addClass("placeholder").val(a.attr("placeholder"));
            }
        }).blur().parents("form").submit(function() {
            t(this).find("[placeholder]").each(function() {
                var a = t(this);
                if (a.val() == a.attr("placeholder")) {
                    a.val("");
                }
            });
        });
    }

    // Tooltip
    t(".tooltip-container").each(function() {
        t(this).hover(function() {
            var a = t(this).offset();
            var e = t(this);
            var tip = t(this).find(".tooltip-content");
            var tip_top = t(this).find(".tooltip-content.tooltip-top");
            var tip_bottom = t(this).find(".tooltip-content.tooltip-bottom");
            var l = tip.height();
            tip.fadeIn("fast");
            tip_top.css({
                top: a.top - l,
                left: a.left + e.width() / 2 - tip.outerWidth(true) / 2
            });
            tip_bottom.css({
                top: a.top,
                left: a.left + e.width() / 2 - tip.outerWidth(true) / 2
            });
        }, function() {
            t(this).find(".tooltip-content").fadeOut("fast");
        });
    });

    // Active Item Highlighting
    var a = window.location.href;
    t("a").filter(function() {
        return this.href == a;
    }).parent("li").addClass("active-item");

    t(".aside-nav a").filter(function() {
        return this.href == a;
    }).parent("li").parent("ul").addClass("active-aside-item");

    t(".aside-nav a").filter(function() {
        return this.href == a;
    }).parent("li").parent("ul").parent("li").parent("ul").addClass("active-aside-item");

    t(".aside-nav a").filter(function() {
        return this.href == a;
    }).parent("li").parent("ul").parent("li").parent("ul").parent("li").parent("ul").addClass("active-aside-item");

    // Box Menu Hover
    t(".box-menu li li").hover(function() {
        t(this).find('span').css({ color: "white" });
    });

    // Accordion
    t('.accordion-1 .head').on('click', function() {
        t(this).toggleClass('active');
        t(this).parent().find('.head h4').toggleClass('text-transform');
        t(this).parent().find('.arrow').toggleClass('arrow-animate');
        t(this).parent().find('.accobox').slideToggle(280);
    });

    t('.accordion-1:last-child').on('click', function() {
        var __this = this;
        if (!t(this).find('.head').hasClass('active') && t(this).find('.head').css('border-radius') == '0px') {
            setTimeout(function() {
                t(__this).find('.head').css({ 'border-radius': '0px 0px 10px 10px' });
            }, 280);
        } else {
            t(__this).find('.head').css({ 'border-radius': '0px' });
        }
    });

    // Scroll to Top
    t('.tothetop').on('click', function(e) {
        e.preventDefault();
        t('html, body').animate({ scrollTop: '0px' }, 200);
    });

    // Modal
    t('.open-modal-btn').on('click', openModal);
    t('.close-btn').on('click', closeModal);

    t('.modal-backdrop, .modal-box').on('click', function(e) {
        e.stopPropagation();
    });
});

function openModal() {
    jQuery('.modal-backdrop').fadeIn(200);
    jQuery('.modal-box').fadeIn(200).addClass('show');
    jQuery('body').addClass('no-scroll');
    if (hasVerticalScrollbar())
        jQuery('body').addClass('modal-margin');
}

function closeModal() {
    jQuery('.modal-box').fadeOut(200).removeClass('show');
    jQuery('.modal-backdrop').fadeOut(200);
    jQuery('body').removeClass('no-scroll');
    if (hasVerticalScrollbar())
        jQuery('body').removeClass('modal-margin');
}

function hasVerticalScrollbar() {
    return document.body.scrollHeight > document.body.clientHeight;
}