jQuery(document).ready(function(t) {
    t(".tabs").each(function(a, e) {
        current_tabs = t(this), t(this).prepend('<div class="tab-nav line"></div>');
        var l = t(e).find(".tab-label");
        t(this).children(".tab-nav").prepend(l), t(this).children(".tab-item").each(function(a) {
            t(this).attr("id", "tab-" + (a + 1))
        }), t(".tab-nav").each(function() {
            t(this).children().each(function(a) {
                t(this).attr("href", "#tab-" + (a + 1))
            })
        }), t(this).find(".tab-nav a").click(function(a) {
            t(this).parent().children().removeClass("active-btn"), t(this).addClass("active-btn");
            var e = t(this).attr("href");
            return t(this).parent().parent().find(".tab-item").not(e).css("display", "none"), t(this).parent().parent().find(e).fadeIn(), !1
        })
    }), t(".aside-nav > ul > li ul").each(function(a, e) {
        var l = '<span class="count-number"> ' + t(e).find("li").length + "</span>";
        t(e).closest("li").children("a").append(l)
    }), t(".aside-nav > ul > li:has(ul)").addClass("aside-submenu"), t(".aside-nav > ul ul > li:has(ul)").addClass("aside-sub-submenu"), t(".aside-nav > ul > li.aside-submenu > a").attr("aria-haspopup", "true").click(function() {
        t(".aside-nav ul li.aside-submenu > ul").removeClass("show-aside-ul", "slow"), t(".aside-nav ul li.aside-submenu:hover > ul").toggleClass("show-aside-ul", "slow")
    }), t(".aside-nav > ul ul > li.aside-sub-submenu > a").attr("aria-haspopup", "true").click(function() {
        t(".aside-nav ul ul li > ul").removeClass("show-aside-ul", "slow"), t(".aside-nav ul ul li:hover > ul").toggleClass("show-aside-ul", "slow")
    }), t(".aside-nav-text").each(function(a, e) {
        t(e).click(function() {
            t(".aside-nav > ul").toggleClass("show-menu", "slow")
        })
    }), t(".top-nav > ul > li ul").each(function(a, e) {
        var l = '<span class="count-number"> ' + t(e).find("li").length + "</span>";
        t(e).closest("li").children("a").append(l)
    }), t(".top-nav > ul li:has(ul)").addClass("submenu"), t(".top-nav > ul ul li:has(ul)").addClass("sub-submenu").removeClass("submenu"), t(".top-nav > ul li.submenu > a").attr("aria-haspopup", "true").click(function() {
        t(".top-nav > ul li.submenu > ul").removeClass("show-ul", "slow"), t(".top-nav > ul li.submenu:hover > ul").toggleClass("show-ul", "slow")
    }), t(".top-nav > ul ul > li.sub-submenu > a").attr("aria-haspopup", "true").click(function() {
        t(".top-nav ul ul li > ul").removeClass("show-ul", "slow"), t(".top-nav ul ul li:hover > ul").toggleClass("show-ul", "slow")
    }), t(".nav-text").click(function() {
        t(".top-nav > ul").toggleClass("show-menu", "slow")
    }), t(function() {
        "placeholder" in document.createElement("input") == 0 && t("[placeholder]").focus(function() {
            var a = t(this);
            a.val() == a.attr("placeholder") && (a.val("").removeClass("placeholder"), a.hasClass("password") && (a.removeClass("password"), this.type = "password"))
        }).blur(function() {
            var a = t(this);
            "" != a.val() && a.val() != a.attr("placeholder") || ("password" == this.type && (a.addClass("password"), this.type = "text"), a.addClass("placeholder").val(a.attr("placeholder")))
        }).blur().parents("form").submit(function() {
            t(this).find("[placeholder]").each(function() {
                var a = t(this);
                a.val() == a.attr("placeholder") && a.val("")
            })
        })
    }), t(".tooltip-container").each(function() {
        t(this).hover(function() {
            var a = t(this).position(),
                e = t(this);
            a = e.offset();
            tip = t(this).find(".tooltip-content"), tip_top = t(this).find(".tooltip-content.tooltip-top"), tip_bottom = t(this).find(".tooltip-content.tooltip-bottom");
            var l = tip.height();
            tip.fadeIn("fast"), tip_top.css({
                top: a.top - l,
                left: a.left + e.width() / 2 - tip.outerWidth(!0) / 2
            }), tip_bottom.css({
                top: a.top,
                left: a.left + e.width() / 2 - tip.outerWidth(!0) / 2
            })
        }, function() {
            tip.fadeOut("fast")
        })
    });
    var a = window.location.href;
    t("a").filter(function() {
        return this.href == a
    }).parent("li").addClass("active-item");
    a = window.location.href;
    t(".aside-nav a").filter(function() {
        return this.href == a
    }).parent("li").parent("ul").addClass("active-aside-item");
    a = window.location.href;
    t(".aside-nav a").filter(function() {
        return this.href == a
    }).parent("li").parent("ul").parent("li").parent("ul").addClass("active-aside-item");
    a = window.location.href;
    t(".aside-nav a").filter(function() {
        return this.href == a
    }).parent("li").parent("ul").parent("li").parent("ul").parent("li").parent("ul").addClass("active-aside-item"), 
    /** BOX MENU */
    $(".box-menu li li").hover(function(){
        $(this).find('span').css({
            color:"white"
        })
    }),
    /** ACCORDION-1 */
    $('.accordion-1 .head').click(function() {
        $(this).toggleClass('active'),
        $(this).parent().find('.head h4').toggleClass('text-transform'),
        $(this).parent().find('.arrow').toggleClass('arrow-animate'),
        $(this).parent().find('.accobox').slideToggle(280)
    }),
    $('.accordion-1:last-child').click(function() {
        var __this = this;
        if (!$(this).find('.head').hasClass('active') && $(this).find('.head').css('border-radius') == '0px') {
            setTimeout(() => {
                $(__this).find('.head').css({'border-radius': '0px 0px 10px 10px'})
            }, 280)
        } else {
            $(__this).find('.head').css({'border-radius': '0px'})
        }
    }),
    /** scrolling to the top */
    $('.tothetop').on('click',function(e){
        e.preventDefault(),
        $('html, body').animate({scrollTop: '0px'}, 200)
    }),
    
    /** MODAL */
    $('.open-modal-btn').click(openModal),
    $('.close-btn').click(closeModal),
    /** Mencegah modal tertutup saat klik backdrop/modal*/
    $('.modal-backdrop, .modal-box').click(function (e) {
        e.stopPropagation()
    }),
    /** Preloader */
    $(".content").fadeIn('slow')
});
function openModal() {
    $('.modal-backdrop').fadeIn(200),
    $('.modal-box').fadeIn(200).addClass('show'),
    $('body').addClass('no-scroll');
    var getBody = $('body');
    if(hasVerticalScrollbar(getBody))
        $('body').addClass('modal-margin')
}
function closeModal() {
    $('.modal-box').fadeOut(200).removeClass('show'),
    $('.modal-backdrop').fadeOut(200),
    $('body').removeClass('no-scroll');
    var getBody = $('body');
    if(hasVerticalScrollbar(getBody)) 
        $('body').removeClass('modal-margin')
}
function hasVerticalScrollbar(el) {
    return $(el).prop('scrollHeight') > $(el).innerHeight();
}
function hasHorizontalScrollbar(el) {
    return $(el).prop('scrollWidth') > $(el).innerWidth();
}