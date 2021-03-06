! function(a) {
    a.slidebars = function(b) {
        function c() {
            !j.disableOver || "number" == typeof j.disableOver && j.disableOver >= w ? (v = !0, a("html").addClass("sb-init"), j.hideControlClasses && x.removeClass("sb-hide"), d()) : "number" == typeof j.disableOver && j.disableOver < w && (v = !1, a("html").removeClass("sb-init"), j.hideControlClasses && x.addClass("sb-hide"), q.css("minHeight", ""), (s || u) && g())
        }

        function d() {
            q.css("minHeight", ""), q.css("minHeight", a("html").height() + "px"), r && r.hasClass("sb-width-custom") && r.css("width", r.attr("data-sb-width")), t && t.hasClass("sb-width-custom") && t.css("width", t.attr("data-sb-width")), r && (r.hasClass("sb-style-push") || r.hasClass("sb-style-overlay")) && r.css("marginLeft", "-" + r.css("width")), t && (t.hasClass("sb-style-push") || t.hasClass("sb-style-overlay")) && t.css("marginRight", "-" + t.css("width")), j.scrollLock && a("html").addClass("sb-scroll-lock")
        }

        function e(a, b, c) {
            var e;
            if (e = a.hasClass("sb-style-push") ? q.add(a).add(y) : a.hasClass("sb-style-overlay") ? a : q.add(y), "translate" === z) e.css("transform", "translate(" + b + ")");
            else if ("side" === z) "-" === b[0] && (b = b.substr(1)), "0px" !== b && e.css(c, "0px"), setTimeout(function() {
                e.css(c, b)
            }, 1);
            else if ("jQuery" === z) {
                "-" === b[0] && (b = b.substr(1));
                var f = {};
                f[c] = b, e.stop().animate(f, 400)
            }
            setTimeout(function() {
                "0px" === b && (e.removeAttr("style"), d())
            }, 400)
        }

        function f(b, c) {
            function d() {
                v && "left" === b && r ? (a("html").addClass("sb-active sb-active-left"), r.addClass("sb-active"), e(r, r.css("width"), "left"), setTimeout(function() {
                    s = !0, "function" == typeof c && c()
                }, 400)) : v && "right" === b && t && (a("html").addClass("sb-active sb-active-right"), t.addClass("sb-active"), e(t, "-" + t.css("width"), "right"), setTimeout(function() {
                    u = !0, "function" == typeof c && c()
                }, 400))
            }
            "left" === b && r && u || "right" === b && t && s ? (g(), setTimeout(d, 400)) : d()
        }

        function g(b) {
            (s || u) && (s && (e(r, "0px", "left"), s = !1), u && (e(t, "0px", "right"), u = !1), setTimeout(function() {
                a("html").removeClass("sb-active sb-active-left sb-active-right"), r && r.removeClass("sb-active"), t && t.removeClass("sb-active"), "function" == typeof b && b()
            }, 400))
        }

        function h(a, b) {
            "left" === a && r && (s ? g(null, b) : f("left", b)), "right" === a && t && (u ? g(null, b) : f("right", b))
        }

        function i(a, b) {
            a.stopPropagation(), a.preventDefault(), "touchend" === a.type && b.off("click")
        }
        var j = a.extend({
                siteClose: !0,
                scrollLock: !1,
                disableOver: !1,
                hideControlClasses: !1
            }, b),
            k = document.createElement("div").style,
            l = !1,
            m = !1;
        ("" === k.MozTransition || "" === k.WebkitTransition || "" === k.OTransition || "" === k.transition) && (l = !0), ("" === k.MozTransform || "" === k.WebkitTransform || "" === k.OTransform || "" === k.transform) && (m = !0);
        var n = navigator.userAgent,
            o = !1,
            p = !1;
        /Android/.test(n) ? o = n.substr(n.indexOf("Android") + 8, 3) : /(iPhone|iPod|iPad)/.test(n) && (p = n.substr(n.indexOf("OS ") + 3, 3).replace("_", ".")), (o && 3 > o || p && 5 > p) && a("html").addClass("sb-static");
        var q = a("#sb-site, .sb-site-container");
        if (a(".sb-left").length) var r = a(".sb-left"),
            s = !1;
        if (a(".sb-right").length) var t = a(".sb-right"),
            u = !1;
        var v = !1,
            w = a(window).width(),
            x = a(".sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close"),
            y = a(".sb-slide");
        c(), a(window).resize(function() {
            var b = a(window).width();
            w !== b && (w = b, c(), s && f("left"), u && f("right"))
        });
        var z;
        l && m ? (z = "translate", o && 4.4 > o && (z = "side")) : z = "jQuery", this.slidebars = {
            open: f,
            close: g,
            toggle: h,
            init: function() {
                return v
            },
            reInit: c,
            resetCSS: d,
            active: function(a) {
                return "left" === a && r ? s : "right" === a && t ? u : void 0
            },
            destroy: function(a) {
                "left" === a && r && (s && g(), setTimeout(function() {
                    r.remove(), r = !1
                }, 400)), "right" === a && t && (u && g(), setTimeout(function() {
                    t.remove(), t = !1
                }, 400))
            }
        }, a(".sb-toggle-left").on("touchend click", function(b) {
            i(b, a(this)), h("left")
        }), a(".sb-toggle-right").on("touchend click", function(b) {
            i(b, a(this)), h("right")
        }), a(".sb-open-left").on("touchend click", function(b) {
            i(b, a(this)), f("left")
        }), a(".sb-open-right").on("touchend click", function(b) {
            i(b, a(this)), f("right")
        }), a(".sb-close").on("touchend click", function(b) {
            if (a(this).is("a") || a(this).children().is("a")) {
                if ("click" === b.type) {
                    b.preventDefault();
                    var c = a(this).is("a") ? a(this).attr("href") : a(this).find("a").attr("href");
                    g(function() {
                        window.location = c
                    })
                }
            } else i(b, a(this)), g()
        }), q.on("touchend click", function(b) {
            j.siteClose && (s || u) && (i(b, a(this)), g())
        })
    }
}(jQuery);