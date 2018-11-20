! function() {
    function a(a, b) {
        return b > a ? -1 : a > b ? 1 : a >= b ? 0 : NaN
    }

    function b(a) {
        return null === a ? NaN : +a
    }

    function c(a) {
        return !isNaN(a)
    }

    function d(a) {
        return {
            left: function(b, c, d, e) {
                for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); e > d;) {
                    var f = d + e >>> 1;
                    a(b[f], c) < 0 ? d = f + 1 : e = f
                }
                return d
            },
            right: function(b, c, d, e) {
                for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); e > d;) {
                    var f = d + e >>> 1;
                    a(b[f], c) > 0 ? e = f : d = f + 1
                }
                return d
            }
        }
    }

    function e(a) {
        return a.length
    }

    function f(a) {
        for (var b = 1; a * b % 1;) b *= 10;
        return b
    }

    function g(a, b) {
        for (var c in b) Object.defineProperty(a.prototype, c, {
            value: b[c],
            enumerable: !1
        })
    }

    function h() {
        this._ = Object.create(null)
    }

    function i(a) {
        return (a += "") === qg || a[0] === rg ? rg + a : a
    }

    function j(a) {
        return (a += "")[0] === rg ? a.slice(1) : a
    }

    function k(a) {
        return i(a) in this._
    }

    function l(a) {
        return (a = i(a)) in this._ && delete this._[a]
    }

    function m() {
        var a = [];
        for (var b in this._) a.push(j(b));
        return a
    }

    function n() {
        var a = 0;
        for (var b in this._) ++a;
        return a
    }

    function o() {
        for (var a in this._) return !1;
        return !0
    }

    function p() {
        this._ = Object.create(null)
    }

    function q(a, b, c) {
        return function() {
            var d = c.apply(b, arguments);
            return d === b ? a : d
        }
    }

    function r(a, b) {
        if (b in a) return b;
        b = b.charAt(0).toUpperCase() + b.slice(1);
        for (var c = 0, d = sg.length; d > c; ++c) {
            var e = sg[c] + b;
            if (e in a) return e
        }
    }

    function s() {}

    function t() {}

    function u(a) {
        function b() {
            for (var b, d = c, e = -1, f = d.length; ++e < f;)(b = d[e].on) && b.apply(this, arguments);
            return a
        }
        var c = [],
            d = new h;
        return b.on = function(b, e) {
            var f, g = d.get(b);
            return arguments.length < 2 ? g && g.on : (g && (g.on = null, c = c.slice(0, f = c.indexOf(g)).concat(c.slice(f + 1)), d.remove(b)), e && c.push(d.set(b, {
                on: e
            })), a)
        }, b
    }

    function v() {
        bg.event.preventDefault()
    }

    function w() {
        for (var a, b = bg.event; a = b.sourceEvent;) b = a;
        return b
    }

    function x(a) {
        for (var b = new t, c = 0, d = arguments.length; ++c < d;) b[arguments[c]] = u(b);
        return b.of = function(c, d) {
            return function(e) {
                try {
                    var f = e.sourceEvent = bg.event;
                    e.target = a, bg.event = e, b[e.type].apply(c, d)
                } finally {
                    bg.event = f
                }
            }
        }, b
    }

    function y(a) {
        return ug(a, zg), a
    }

    function z(a) {
        return "function" == typeof a ? a : function() {
            return vg(a, this)
        }
    }

    function A(a) {
        return "function" == typeof a ? a : function() {
            return wg(a, this)
        }
    }

    function B(a, b) {
        function c() {
            this.removeAttribute(a)
        }

        function d() {
            this.removeAttributeNS(a.space, a.local)
        }

        function e() {
            this.setAttribute(a, b)
        }

        function f() {
            this.setAttributeNS(a.space, a.local, b)
        }

        function g() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttribute(a) : this.setAttribute(a, c)
        }

        function h() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, c)
        }
        return a = bg.ns.qualify(a), null == b ? a.local ? d : c : "function" == typeof b ? a.local ? h : g : a.local ? f : e
    }

    function C(a) {
        return a.trim().replace(/\s+/g, " ")
    }

    function D(a) {
        return new RegExp("(?:^|\\s+)" + bg.requote(a) + "(?:\\s+|$)", "g")
    }

    function E(a) {
        return (a + "").trim().split(/^|\s+/)
    }

    function F(a, b) {
        function c() {
            for (var c = -1; ++c < e;) a[c](this, b)
        }

        function d() {
            for (var c = -1, d = b.apply(this, arguments); ++c < e;) a[c](this, d)
        }
        a = E(a).map(G);
        var e = a.length;
        return "function" == typeof b ? d : c
    }

    function G(a) {
        var b = D(a);
        return function(c, d) {
            if (e = c.classList) return d ? e.add(a) : e.remove(a);
            var e = c.getAttribute("class") || "";
            d ? (b.lastIndex = 0, b.test(e) || c.setAttribute("class", C(e + " " + a))) : c.setAttribute("class", C(e.replace(b, " ")))
        }
    }

    function H(a, b, c) {
        function d() {
            this.style.removeProperty(a)
        }

        function e() {
            this.style.setProperty(a, b, c)
        }

        function f() {
            var d = b.apply(this, arguments);
            null == d ? this.style.removeProperty(a) : this.style.setProperty(a, d, c)
        }
        return null == b ? d : "function" == typeof b ? f : e
    }

    function I(a, b) {
        function c() {
            delete this[a]
        }

        function d() {
            this[a] = b
        }

        function e() {
            var c = b.apply(this, arguments);
            null == c ? delete this[a] : this[a] = c
        }
        return null == b ? c : "function" == typeof b ? e : d
    }

    function J(a) {
        return "function" == typeof a ? a : (a = bg.ns.qualify(a)).local ? function() {
            return this.ownerDocument.createElementNS(a.space, a.local)
        } : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, a)
        }
    }

    function K() {
        var a = this.parentNode;
        a && a.removeChild(this)
    }

    function L(a) {
        return {
            __data__: a
        }
    }

    function M(a) {
        return function() {
            return yg(this, a)
        }
    }

    function N(b) {
        return arguments.length || (b = a),
            function(a, c) {
                return a && c ? b(a.__data__, c.__data__) : !a - !c
            }
    }

    function O(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
            for (var e, f = a[c], g = 0, h = f.length; h > g; g++)(e = f[g]) && b(e, g, c);
        return a
    }

    function P(a) {
        return ug(a, Bg), a
    }

    function Q(a) {
        var b, c;
        return function(d, e, f) {
            var g, h = a[f].update,
                i = h.length;
            for (f != c && (c = f, b = 0), e >= b && (b = e + 1); !(g = h[b]) && ++b < i;);
            return g
        }
    }

    function R(a, b, c) {
        function d() {
            var b = this[g];
            b && (this.removeEventListener(a, b, b.$), delete this[g])
        }

        function e() {
            var e = i(b, dg(arguments));
            d.call(this), this.addEventListener(a, this[g] = e, e.$ = c), e._ = b
        }

        function f() {
            var b, c = new RegExp("^__on([^.]+)" + bg.requote(a) + "$");
            for (var d in this)
                if (b = d.match(c)) {
                    var e = this[d];
                    this.removeEventListener(b[1], e, e.$), delete this[d]
                }
        }
        var g = "__on" + a,
            h = a.indexOf("."),
            i = S;
        h > 0 && (a = a.slice(0, h));
        var j = Dg.get(a);
        return j && (a = j, i = T), h ? b ? e : d : b ? s : f
    }

    function S(a, b) {
        return function(c) {
            var d = bg.event;
            bg.event = c, b[0] = this.__data__;
            try {
                a.apply(this, b)
            } finally {
                bg.event = d
            }
        }
    }

    function T(a, b) {
        var c = S(a, b);
        return function(a) {
            var b = this,
                d = a.relatedTarget;
            d && (d === b || 8 & d.compareDocumentPosition(b)) || c.call(b, a)
        }
    }

    function U() {
        var a = ".dragsuppress-" + ++Fg,
            b = "click" + a,
            c = bg.select(gg).on("touchmove" + a, v).on("dragstart" + a, v).on("selectstart" + a, v);
        if (Eg) {
            var d = fg.style,
                e = d[Eg];
            d[Eg] = "none"
        }
        return function(f) {
            if (c.on(a, null), Eg && (d[Eg] = e), f) {
                var g = function() {
                    c.on(b, null)
                };
                c.on(b, function() {
                    v(), g()
                }, !0), setTimeout(g, 0)
            }
        }
    }

    function V(a, b) {
        b.changedTouches && (b = b.changedTouches[0]);
        var c = a.ownerSVGElement || a;
        if (c.createSVGPoint) {
            var d = c.createSVGPoint();
            if (0 > Gg && (gg.scrollX || gg.scrollY)) {
                c = bg.select("body").append("svg").style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    border: "none"
                }, "important");
                var e = c[0][0].getScreenCTM();
                Gg = !(e.f || e.e), c.remove()
            }
            return Gg ? (d.x = b.pageX, d.y = b.pageY) : (d.x = b.clientX, d.y = b.clientY), d = d.matrixTransform(a.getScreenCTM().inverse()), [d.x, d.y]
        }
        var f = a.getBoundingClientRect();
        return [b.clientX - f.left - a.clientLeft, b.clientY - f.top - a.clientTop]
    }

    function W() {
        return bg.event.changedTouches[0].identifier
    }

    function X() {
        return bg.event.target
    }

    function Y() {
        return gg
    }

    function Z(a) {
        return a > 0 ? 1 : 0 > a ? -1 : 0
    }

    function $(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
    }

    function _(a) {
        return a > 1 ? 0 : -1 > a ? Jg : Math.acos(a)
    }

    function aa(a) {
        return a > 1 ? Mg : -1 > a ? -Mg : Math.asin(a)
    }

    function ba(a) {
        return ((a = Math.exp(a)) - 1 / a) / 2
    }

    function ca(a) {
        return ((a = Math.exp(a)) + 1 / a) / 2
    }

    function da(a) {
        return ((a = Math.exp(2 * a)) - 1) / (a + 1)
    }

    function ea(a) {
        return (a = Math.sin(a / 2)) * a
    }

    function fa() {}

    function ga(a, b, c) {
        return this instanceof ga ? (this.h = +a, this.s = +b, void(this.l = +c)) : arguments.length < 2 ? a instanceof ga ? new ga(a.h, a.s, a.l) : ua("" + a, va, ga) : new ga(a, b, c)
    }

    function ha(a, b, c) {
        function d(a) {
            return a > 360 ? a -= 360 : 0 > a && (a += 360), 60 > a ? f + (g - f) * a / 60 : 180 > a ? g : 240 > a ? f + (g - f) * (240 - a) / 60 : f
        }

        function e(a) {
            return Math.round(255 * d(a))
        }
        var f, g;
        return a = isNaN(a) ? 0 : (a %= 360) < 0 ? a + 360 : a, b = isNaN(b) ? 0 : 0 > b ? 0 : b > 1 ? 1 : b, c = 0 > c ? 0 : c > 1 ? 1 : c, g = .5 >= c ? c * (1 + b) : c + b - c * b, f = 2 * c - g, new qa(e(a + 120), e(a), e(a - 120))
    }

    function ia(a, b, c) {
        return this instanceof ia ? (this.h = +a, this.c = +b, void(this.l = +c)) : arguments.length < 2 ? a instanceof ia ? new ia(a.h, a.c, a.l) : a instanceof ka ? ma(a.l, a.a, a.b) : ma((a = wa((a = bg.rgb(a)).r, a.g, a.b)).l, a.a, a.b) : new ia(a, b, c)
    }

    function ja(a, b, c) {
        return isNaN(a) && (a = 0), isNaN(b) && (b = 0), new ka(c, Math.cos(a *= Ng) * b, Math.sin(a) * b)
    }

    function ka(a, b, c) {
        return this instanceof ka ? (this.l = +a, this.a = +b, void(this.b = +c)) : arguments.length < 2 ? a instanceof ka ? new ka(a.l, a.a, a.b) : a instanceof ia ? ja(a.h, a.c, a.l) : wa((a = qa(a)).r, a.g, a.b) : new ka(a, b, c)
    }

    function la(a, b, c) {
        var d = (a + 16) / 116,
            e = d + b / 500,
            f = d - c / 200;
        return e = na(e) * Yg, d = na(d) * Zg, f = na(f) * $g, new qa(pa(3.2404542 * e - 1.5371385 * d - .4985314 * f), pa(-.969266 * e + 1.8760108 * d + .041556 * f), pa(.0556434 * e - .2040259 * d + 1.0572252 * f))
    }

    function ma(a, b, c) {
        return a > 0 ? new ia(Math.atan2(c, b) * Og, Math.sqrt(b * b + c * c), a) : new ia(NaN, NaN, a)
    }

    function na(a) {
        return a > .206893034 ? a * a * a : (a - 4 / 29) / 7.787037
    }

    function oa(a) {
        return a > .008856 ? Math.pow(a, 1 / 3) : 7.787037 * a + 4 / 29
    }

    function pa(a) {
        return Math.round(255 * (.00304 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055))
    }

    function qa(a, b, c) {
        return this instanceof qa ? (this.r = ~~a, this.g = ~~b, void(this.b = ~~c)) : arguments.length < 2 ? a instanceof qa ? new qa(a.r, a.g, a.b) : ua("" + a, qa, ha) : new qa(a, b, c)
    }

    function ra(a) {
        return new qa(a >> 16, 255 & a >> 8, 255 & a)
    }

    function sa(a) {
        return ra(a) + ""
    }

    function ta(a) {
        return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
    }

    function ua(a, b, c) {
        var d, e, f, g = 0,
            h = 0,
            i = 0;
        if (d = /([a-z]+)\((.*)\)/i.exec(a)) switch (e = d[2].split(","), d[1]) {
            case "hsl":
                return c(parseFloat(e[0]), parseFloat(e[1]) / 100, parseFloat(e[2]) / 100);
            case "rgb":
                return b(ya(e[0]), ya(e[1]), ya(e[2]))
        }
        return (f = bh.get(a)) ? b(f.r, f.g, f.b) : (null == a || "#" !== a.charAt(0) || isNaN(f = parseInt(a.slice(1), 16)) || (4 === a.length ? (g = (3840 & f) >> 4, g = g >> 4 | g, h = 240 & f, h = h >> 4 | h, i = 15 & f, i = i << 4 | i) : 7 === a.length && (g = (16711680 & f) >> 16, h = (65280 & f) >> 8, i = 255 & f)), b(g, h, i))
    }

    function va(a, b, c) {
        var d, e, f = Math.min(a /= 255, b /= 255, c /= 255),
            g = Math.max(a, b, c),
            h = g - f,
            i = (g + f) / 2;
        return h ? (e = .5 > i ? h / (g + f) : h / (2 - g - f), d = a == g ? (b - c) / h + (c > b ? 6 : 0) : b == g ? (c - a) / h + 2 : (a - b) / h + 4, d *= 60) : (d = NaN, e = i > 0 && 1 > i ? 0 : d), new ga(d, e, i)
    }

    function wa(a, b, c) {
        a = xa(a), b = xa(b), c = xa(c);
        var d = oa((.4124564 * a + .3575761 * b + .1804375 * c) / Yg),
            e = oa((.2126729 * a + .7151522 * b + .072175 * c) / Zg),
            f = oa((.0193339 * a + .119192 * b + .9503041 * c) / $g);
        return ka(116 * e - 16, 500 * (d - e), 200 * (e - f))
    }

    function xa(a) {
        return (a /= 255) <= .04045 ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
    }

    function ya(a) {
        var b = parseFloat(a);
        return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
    }

    function za(a) {
        return "function" == typeof a ? a : function() {
            return a
        }
    }

    function Aa(a) {
        return a
    }

    function Ba(a) {
        return function(b, c, d) {
            return 2 === arguments.length && "function" == typeof c && (d = c, c = null), Ca(b, c, a, d)
        }
    }

    function Ca(a, b, c, d) {
        function e() {
            var a, b = i.status;
            if (!b && Ea(i) || b >= 200 && 300 > b || 304 === b) {
                try {
                    a = c.call(f, i)
                } catch (d) {
                    return void g.error.call(f, d)
                }
                g.load.call(f, a)
            } else g.error.call(f, i)
        }
        var f = {},
            g = bg.dispatch("beforesend", "progress", "load", "error"),
            h = {},
            i = new XMLHttpRequest,
            j = null;
        return !gg.XDomainRequest || "withCredentials" in i || !/^(http(s)?:)?\/\//.test(a) || (i = new XDomainRequest), "onload" in i ? i.onload = i.onerror = e : i.onreadystatechange = function() {
            i.readyState > 3 && e()
        }, i.onprogress = function(a) {
            var b = bg.event;
            bg.event = a;
            try {
                g.progress.call(f, i)
            } finally {
                bg.event = b
            }
        }, f.header = function(a, b) {
            return a = (a + "").toLowerCase(), arguments.length < 2 ? h[a] : (null == b ? delete h[a] : h[a] = b + "", f)
        }, f.mimeType = function(a) {
            return arguments.length ? (b = null == a ? null : a + "", f) : b
        }, f.responseType = function(a) {
            return arguments.length ? (j = a, f) : j
        }, f.response = function(a) {
            return c = a, f
        }, ["get", "post"].forEach(function(a) {
            f[a] = function() {
                return f.send.apply(f, [a].concat(dg(arguments)))
            }
        }), f.send = function(c, d, e) {
            if (2 === arguments.length && "function" == typeof d && (e = d, d = null), i.open(c, a, !0), null == b || "accept" in h || (h.accept = b + ",*/*"), i.setRequestHeader)
                for (var k in h) i.setRequestHeader(k, h[k]);
            return null != b && i.overrideMimeType && i.overrideMimeType(b), null != j && (i.responseType = j), null != e && f.on("error", e).on("load", function(a) {
                e(null, a)
            }), g.beforesend.call(f, i), i.send(null == d ? null : d), f
        }, f.abort = function() {
            return i.abort(), f
        }, bg.rebind(f, g, "on"), null == d ? f : f.get(Da(d))
    }

    function Da(a) {
        return 1 === a.length ? function(b, c) {
            a(null == b ? c : null)
        } : a
    }

    function Ea(a) {
        var b = a.responseType;
        return b && "text" !== b ? a.response : a.responseText
    }

    function Fa() {
        var a = Ga(),
            b = Ha() - a;
        b > 24 ? (isFinite(b) && (clearTimeout(fh), fh = setTimeout(Fa, b)), eh = 0) : (eh = 1, hh(Fa))
    }

    function Ga() {
        var a = Date.now();
        for (gh = ch; gh;) a >= gh.t && (gh.f = gh.c(a - gh.t)), gh = gh.n;
        return a
    }

    function Ha() {
        for (var a, b = ch, c = 1 / 0; b;) b.f ? b = a ? a.n = b.n : ch = b.n : (b.t < c && (c = b.t), b = (a = b).n);
        return dh = a, c
    }

    function Ia(a, b) {
        return b - (a ? Math.ceil(Math.log(a) / Math.LN10) : 1)
    }

    function Ja(a, b) {
        var c = Math.pow(10, 3 * pg(8 - b));
        return {
            scale: b > 8 ? function(a) {
                return a / c
            } : function(a) {
                return a * c
            },
            symbol: a
        }
    }

    function Ka(a) {
        var b = a.decimal,
            c = a.thousands,
            d = a.grouping,
            e = a.currency,
            f = d && c ? function(a, b) {
                for (var e = a.length, f = [], g = 0, h = d[0], i = 0; e > 0 && h > 0 && (i + h + 1 > b && (h = Math.max(1, b - i)), f.push(a.substring(e -= h, e + h)), !((i += h + 1) > b));) h = d[g = (g + 1) % d.length];
                return f.reverse().join(c)
            } : Aa;
        return function(a) {
            var c = jh.exec(a),
                d = c[1] || " ",
                g = c[2] || ">",
                h = c[3] || "-",
                i = c[4] || "",
                j = c[5],
                k = +c[6],
                l = c[7],
                m = c[8],
                n = c[9],
                o = 1,
                p = "",
                q = "",
                r = !1,
                s = !0;
            switch (m && (m = +m.substring(1)), (j || "0" === d && "=" === g) && (j = d = "0", g = "="), n) {
                case "n":
                    l = !0, n = "g";
                    break;
                case "%":
                    o = 100, q = "%", n = "f";
                    break;
                case "p":
                    o = 100, q = "%", n = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    "#" === i && (p = "0" + n.toLowerCase());
                case "c":
                    s = !1;
                case "d":
                    r = !0, m = 0;
                    break;
                case "s":
                    o = -1, n = "r"
            }
            "$" === i && (p = e[0], q = e[1]), "r" != n || m || (n = "g"), null != m && ("g" == n ? m = Math.max(1, Math.min(21, m)) : ("e" == n || "f" == n) && (m = Math.max(0, Math.min(20, m)))), n = kh.get(n) || La;
            var t = j && l;
            return function(a) {
                var c = q;
                if (r && a % 1) return "";
                var e = 0 > a || 0 === a && 0 > 1 / a ? (a = -a, "-") : "-" === h ? "" : h;
                if (0 > o) {
                    var i = bg.formatPrefix(a, m);
                    a = i.scale(a), c = i.symbol + q
                } else a *= o;
                a = n(a, m);
                var u, v, w = a.lastIndexOf(".");
                if (0 > w) {
                    var x = s ? a.lastIndexOf("e") : -1;
                    0 > x ? (u = a, v = "") : (u = a.substring(0, x), v = a.substring(x))
                } else u = a.substring(0, w), v = b + a.substring(w + 1);
                !j && l && (u = f(u, 1 / 0));
                var y = p.length + u.length + v.length + (t ? 0 : e.length),
                    z = k > y ? new Array(y = k - y + 1).join(d) : "";
                return t && (u = f(z + u, z.length ? k - v.length : 1 / 0)), e += p, a = u + v, ("<" === g ? e + a + z : ">" === g ? z + e + a : "^" === g ? z.substring(0, y >>= 1) + e + a + z.substring(y) : e + (t ? a : z + a)) + c
            }
        }
    }

    function La(a) {
        return a + ""
    }

    function Ma() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Na(a, b, c) {
        function d(b) {
            var c = a(b),
                d = f(c, 1);
            return d - b > b - c ? c : d
        }

        function e(c) {
            return b(c = a(new mh(c - 1)), 1), c
        }

        function f(a, c) {
            return b(a = new mh(+a), c), a
        }

        function g(a, d, f) {
            var g = e(a),
                h = [];
            if (f > 1)
                for (; d > g;) c(g) % f || h.push(new Date(+g)), b(g, 1);
            else
                for (; d > g;) h.push(new Date(+g)), b(g, 1);
            return h
        }

        function h(a, b, c) {
            try {
                mh = Ma;
                var d = new Ma;
                return d._ = a, g(d, b, c)
            } finally {
                mh = Date
            }
        }
        a.floor = a, a.round = d, a.ceil = e, a.offset = f, a.range = g;
        var i = a.utc = Oa(a);
        return i.floor = i, i.round = Oa(d), i.ceil = Oa(e), i.offset = Oa(f), i.range = h, a
    }

    function Oa(a) {
        return function(b, c) {
            try {
                mh = Ma;
                var d = new Ma;
                return d._ = b, a(d, c)._
            } finally {
                mh = Date
            }
        }
    }

    function Pa(a) {
        function b(a) {
            function b(b) {
                for (var c, e, f, g = [], h = -1, i = 0; ++h < d;) 37 === a.charCodeAt(h) && (g.push(a.slice(i, h)), null != (e = oh[c = a.charAt(++h)]) && (c = a.charAt(++h)), (f = C[c]) && (c = f(b, null == e ? "e" === c ? " " : "0" : e)), g.push(c), i = h + 1);
                return g.push(a.slice(i, h)), g.join("")
            }
            var d = a.length;
            return b.parse = function(b) {
                var d = {
                        y: 1900,
                        m: 0,
                        d: 1,
                        H: 0,
                        M: 0,
                        S: 0,
                        L: 0,
                        Z: null
                    },
                    e = c(d, a, b, 0);
                if (e != b.length) return null;
                "p" in d && (d.H = d.H % 12 + 12 * d.p);
                var f = null != d.Z && mh !== Ma,
                    g = new(f ? Ma : mh);
                return "j" in d ? g.setFullYear(d.y, 0, d.j) : "w" in d && ("W" in d || "U" in d) ? (g.setFullYear(d.y, 0, 1), g.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + 7 * d.W - (g.getDay() + 5) % 7 : d.w + 7 * d.U - (g.getDay() + 6) % 7)) : g.setFullYear(d.y, d.m, d.d), g.setHours(d.H + (0 | d.Z / 100), d.M + d.Z % 100, d.S, d.L), f ? g._ : g
            }, b.toString = function() {
                return a
            }, b
        }

        function c(a, b, c, d) {
            for (var e, f, g, h = 0, i = b.length, j = c.length; i > h;) {
                if (d >= j) return -1;
                if (e = b.charCodeAt(h++), 37 === e) {
                    if (g = b.charAt(h++), f = D[g in oh ? b.charAt(h++) : g], !f || (d = f(a, c, d)) < 0) return -1
                } else if (e != c.charCodeAt(d++)) return -1
            }
            return d
        }

        function d(a, b, c) {
            w.lastIndex = 0;
            var d = w.exec(b.slice(c));
            return d ? (a.w = x.get(d[0].toLowerCase()), c + d[0].length) : -1
        }

        function e(a, b, c) {
            u.lastIndex = 0;
            var d = u.exec(b.slice(c));
            return d ? (a.w = v.get(d[0].toLowerCase()), c + d[0].length) : -1
        }

        function f(a, b, c) {
            A.lastIndex = 0;
            var d = A.exec(b.slice(c));
            return d ? (a.m = B.get(d[0].toLowerCase()), c + d[0].length) : -1
        }

        function g(a, b, c) {
            y.lastIndex = 0;
            var d = y.exec(b.slice(c));
            return d ? (a.m = z.get(d[0].toLowerCase()), c + d[0].length) : -1
        }

        function h(a, b, d) {
            return c(a, C.c.toString(), b, d)
        }

        function i(a, b, d) {
            return c(a, C.x.toString(), b, d)
        }

        function j(a, b, d) {
            return c(a, C.X.toString(), b, d)
        }

        function k(a, b, c) {
            var d = t.get(b.slice(c, c += 2).toLowerCase());
            return null == d ? -1 : (a.p = d, c)
        }
        var l = a.dateTime,
            m = a.date,
            n = a.time,
            o = a.periods,
            p = a.days,
            q = a.shortDays,
            r = a.months,
            s = a.shortMonths;
        b.utc = function(a) {
            function c(a) {
                try {
                    mh = Ma;
                    var b = new mh;
                    return b._ = a, d(b)
                } finally {
                    mh = Date
                }
            }
            var d = b(a);
            return c.parse = function(a) {
                try {
                    mh = Ma;
                    var b = d.parse(a);
                    return b && b._
                } finally {
                    mh = Date
                }
            }, c.toString = d.toString, c
        }, b.multi = b.utc.multi = hb;
        var t = bg.map(),
            u = Ra(p),
            v = Sa(p),
            w = Ra(q),
            x = Sa(q),
            y = Ra(r),
            z = Sa(r),
            A = Ra(s),
            B = Sa(s);
        o.forEach(function(a, b) {
            t.set(a.toLowerCase(), b)
        });
        var C = {
                a: function(a) {
                    return q[a.getDay()]
                },
                A: function(a) {
                    return p[a.getDay()]
                },
                b: function(a) {
                    return s[a.getMonth()]
                },
                B: function(a) {
                    return r[a.getMonth()]
                },
                c: b(l),
                d: function(a, b) {
                    return Qa(a.getDate(), b, 2)
                },
                e: function(a, b) {
                    return Qa(a.getDate(), b, 2)
                },
                H: function(a, b) {
                    return Qa(a.getHours(), b, 2)
                },
                I: function(a, b) {
                    return Qa(a.getHours() % 12 || 12, b, 2)
                },
                j: function(a, b) {
                    return Qa(1 + lh.dayOfYear(a), b, 3)
                },
                L: function(a, b) {
                    return Qa(a.getMilliseconds(), b, 3)
                },
                m: function(a, b) {
                    return Qa(a.getMonth() + 1, b, 2)
                },
                M: function(a, b) {
                    return Qa(a.getMinutes(), b, 2)
                },
                p: function(a) {
                    return o[+(a.getHours() >= 12)]
                },
                S: function(a, b) {
                    return Qa(a.getSeconds(), b, 2)
                },
                U: function(a, b) {
                    return Qa(lh.sundayOfYear(a), b, 2)
                },
                w: function(a) {
                    return a.getDay()
                },
                W: function(a, b) {
                    return Qa(lh.mondayOfYear(a), b, 2)
                },
                x: b(m),
                X: b(n),
                y: function(a, b) {
                    return Qa(a.getFullYear() % 100, b, 2)
                },
                Y: function(a, b) {
                    return Qa(a.getFullYear() % 1e4, b, 4)
                },
                Z: fb,
                "%": function() {
                    return "%"
                }
            },
            D = {
                a: d,
                A: e,
                b: f,
                B: g,
                c: h,
                d: _a,
                e: _a,
                H: bb,
                I: bb,
                j: ab,
                L: eb,
                m: $a,
                M: cb,
                p: k,
                S: db,
                U: Ua,
                w: Ta,
                W: Va,
                x: i,
                X: j,
                y: Xa,
                Y: Wa,
                Z: Ya,
                "%": gb
            };
        return b
    }

    function Qa(a, b, c) {
        var d = 0 > a ? "-" : "",
            e = (d ? -a : a) + "",
            f = e.length;
        return d + (c > f ? new Array(c - f + 1).join(b) + e : e)
    }

    function Ra(a) {
        return new RegExp("^(?:" + a.map(bg.requote).join("|") + ")", "i")
    }

    function Sa(a) {
        for (var b = new h, c = -1, d = a.length; ++c < d;) b.set(a[c].toLowerCase(), c);
        return b
    }

    function Ta(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 1));
        return d ? (a.w = +d[0], c + d[0].length) : -1
    }

    function Ua(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c));
        return d ? (a.U = +d[0], c + d[0].length) : -1
    }

    function Va(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c));
        return d ? (a.W = +d[0], c + d[0].length) : -1
    }

    function Wa(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 4));
        return d ? (a.y = +d[0], c + d[0].length) : -1
    }

    function Xa(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.y = Za(+d[0]), c + d[0].length) : -1
    }

    function Ya(a, b, c) {
        return /^[+-]\d{4}$/.test(b = b.slice(c, c + 5)) ? (a.Z = -b, c + 5) : -1
    }

    function Za(a) {
        return a + (a > 68 ? 1900 : 2e3)
    }

    function $a(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.m = d[0] - 1, c + d[0].length) : -1
    }

    function _a(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.d = +d[0], c + d[0].length) : -1
    }

    function ab(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 3));
        return d ? (a.j = +d[0], c + d[0].length) : -1
    }

    function bb(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.H = +d[0], c + d[0].length) : -1
    }

    function cb(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.M = +d[0], c + d[0].length) : -1
    }

    function db(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 2));
        return d ? (a.S = +d[0], c + d[0].length) : -1
    }

    function eb(a, b, c) {
        ph.lastIndex = 0;
        var d = ph.exec(b.slice(c, c + 3));
        return d ? (a.L = +d[0], c + d[0].length) : -1
    }

    function fb(a) {
        var b = a.getTimezoneOffset(),
            c = b > 0 ? "-" : "+",
            d = 0 | pg(b) / 60,
            e = pg(b) % 60;
        return c + Qa(d, "0", 2) + Qa(e, "0", 2)
    }

    function gb(a, b, c) {
        qh.lastIndex = 0;
        var d = qh.exec(b.slice(c, c + 1));
        return d ? c + d[0].length : -1
    }

    function hb(a) {
        for (var b = a.length, c = -1; ++c < b;) a[c][0] = this(a[c][0]);
        return function(b) {
            for (var c = 0, d = a[c]; !d[1](b);) d = a[++c];
            return d[0](b)
        }
    }

    function ib() {}

    function jb(a, b, c) {
        var d = c.s = a + b,
            e = d - a,
            f = d - e;
        c.t = a - f + (b - e)
    }

    function kb(a, b) {
        a && uh.hasOwnProperty(a.type) && uh[a.type](a, b)
    }

    function lb(a, b, c) {
        var d, e = -1,
            f = a.length - c;
        for (b.lineStart(); ++e < f;) d = a[e], b.point(d[0], d[1], d[2]);
        b.lineEnd()
    }

    function mb(a, b) {
        var c = -1,
            d = a.length;
        for (b.polygonStart(); ++c < d;) lb(a[c], b, 1);
        b.polygonEnd()
    }

    function nb() {
        function a(a, b) {
            a *= Ng, b = b * Ng / 2 + Jg / 4;
            var c = a - d,
                g = c >= 0 ? 1 : -1,
                h = g * c,
                i = Math.cos(b),
                j = Math.sin(b),
                k = f * j,
                l = e * i + k * Math.cos(h),
                m = k * g * Math.sin(h);
            wh.add(Math.atan2(m, l)), d = a, e = i, f = j
        }
        var b, c, d, e, f;
        xh.point = function(g, h) {
            xh.point = a, d = (b = g) * Ng, e = Math.cos(h = (c = h) * Ng / 2 + Jg / 4), f = Math.sin(h)
        }, xh.lineEnd = function() {
            a(b, c)
        }
    }

    function ob(a) {
        var b = a[0],
            c = a[1],
            d = Math.cos(c);
        return [d * Math.cos(b), d * Math.sin(b), Math.sin(c)]
    }

    function pb(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    }

    function qb(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
    }

    function rb(a, b) {
        a[0] += b[0], a[1] += b[1], a[2] += b[2]
    }

    function sb(a, b) {
        return [a[0] * b, a[1] * b, a[2] * b]
    }

    function tb(a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        a[0] /= b, a[1] /= b, a[2] /= b
    }

    function ub(a) {
        return [Math.atan2(a[1], a[0]), aa(a[2])]
    }

    function vb(a, b) {
        return pg(a[0] - b[0]) < Hg && pg(a[1] - b[1]) < Hg
    }

    function wb(a, b) {
        a *= Ng;
        var c = Math.cos(b *= Ng);
        xb(c * Math.cos(a), c * Math.sin(a), Math.sin(b))
    }

    function xb(a, b, c) {
        ++yh, Ah += (a - Ah) / yh, Bh += (b - Bh) / yh, Ch += (c - Ch) / yh
    }

    function yb() {
        function a(a, e) {
            a *= Ng;
            var f = Math.cos(e *= Ng),
                g = f * Math.cos(a),
                h = f * Math.sin(a),
                i = Math.sin(e),
                j = Math.atan2(Math.sqrt((j = c * i - d * h) * j + (j = d * g - b * i) * j + (j = b * h - c * g) * j), b * g + c * h + d * i);
            zh += j, Dh += j * (b + (b = g)), Eh += j * (c + (c = h)), Fh += j * (d + (d = i)), xb(b, c, d)
        }
        var b, c, d;
        Jh.point = function(e, f) {
            e *= Ng;
            var g = Math.cos(f *= Ng);
            b = g * Math.cos(e), c = g * Math.sin(e), d = Math.sin(f), Jh.point = a, xb(b, c, d)
        }
    }

    function zb() {
        Jh.point = wb
    }

    function Ab() {
        function a(a, b) {
            a *= Ng;
            var c = Math.cos(b *= Ng),
                g = c * Math.cos(a),
                h = c * Math.sin(a),
                i = Math.sin(b),
                j = e * i - f * h,
                k = f * g - d * i,
                l = d * h - e * g,
                m = Math.sqrt(j * j + k * k + l * l),
                n = d * g + e * h + f * i,
                o = m && -_(n) / m,
                p = Math.atan2(m, n);
            Gh += o * j, Hh += o * k, Ih += o * l, zh += p, Dh += p * (d + (d = g)), Eh += p * (e + (e = h)), Fh += p * (f + (f = i)), xb(d, e, f)
        }
        var b, c, d, e, f;
        Jh.point = function(g, h) {
            b = g, c = h, Jh.point = a, g *= Ng;
            var i = Math.cos(h *= Ng);
            d = i * Math.cos(g), e = i * Math.sin(g), f = Math.sin(h), xb(d, e, f)
        }, Jh.lineEnd = function() {
            a(b, c), Jh.lineEnd = zb, Jh.point = wb
        }
    }

    function Bb(a, b) {
        function c(c, d) {
            return c = a(c, d), b(c[0], c[1])
        }
        return a.invert && b.invert && (c.invert = function(c, d) {
            return c = b.invert(c, d), c && a.invert(c[0], c[1])
        }), c
    }

    function Cb() {
        return !0
    }

    function Db(a, b, c, d, e) {
        var f = [],
            g = [];
        if (a.forEach(function(a) {
                if (!((b = a.length - 1) <= 0)) {
                    var b, c = a[0],
                        d = a[b];
                    if (vb(c, d)) {
                        e.lineStart();
                        for (var h = 0; b > h; ++h) e.point((c = a[h])[0], c[1]);
                        return void e.lineEnd()
                    }
                    var i = new Fb(c, a, null, !0),
                        j = new Fb(c, null, i, !1);
                    i.o = j, f.push(i), g.push(j), i = new Fb(d, a, null, !1), j = new Fb(d, null, i, !0), i.o = j, f.push(i), g.push(j)
                }
            }), g.sort(b), Eb(f), Eb(g), f.length) {
            for (var h = 0, i = c, j = g.length; j > h; ++h) g[h].e = i = !i;
            for (var k, l, m = f[0];;) {
                for (var n = m, o = !0; n.v;)
                    if ((n = n.n) === m) return;
                k = n.z, e.lineStart();
                do {
                    if (n.v = n.o.v = !0, n.e) {
                        if (o)
                            for (var h = 0, j = k.length; j > h; ++h) e.point((l = k[h])[0], l[1]);
                        else d(n.x, n.n.x, 1, e);
                        n = n.n
                    } else {
                        if (o) {
                            k = n.p.z;
                            for (var h = k.length - 1; h >= 0; --h) e.point((l = k[h])[0], l[1])
                        } else d(n.x, n.p.x, -1, e);
                        n = n.p
                    }
                    n = n.o, k = n.z, o = !o
                } while (!n.v);
                e.lineEnd()
            }
        }
    }

    function Eb(a) {
        if (b = a.length) {
            for (var b, c, d = 0, e = a[0]; ++d < b;) e.n = c = a[d], c.p = e, e = c;
            e.n = c = a[0], c.p = e
        }
    }

    function Fb(a, b, c, d) {
        this.x = a, this.z = b, this.o = c, this.e = d, this.v = !1, this.n = this.p = null
    }

    function Gb(a, b, c, d) {
        return function(e, f) {
            function g(b, c) {
                var d = e(b, c);
                a(b = d[0], c = d[1]) && f.point(b, c)
            }

            function h(a, b) {
                var c = e(a, b);
                q.point(c[0], c[1])
            }

            function i() {
                s.point = h, q.lineStart()
            }

            function j() {
                s.point = g, q.lineEnd()
            }

            function k(a, b) {
                p.push([a, b]);
                var c = e(a, b);
                u.point(c[0], c[1])
            }

            function l() {
                u.lineStart(), p = []
            }

            function m() {
                k(p[0][0], p[0][1]), u.lineEnd();
                var a, b = u.clean(),
                    c = t.buffer(),
                    d = c.length;
                if (p.pop(), o.push(p), p = null, d)
                    if (1 & b) {
                        a = c[0];
                        var e, d = a.length - 1,
                            g = -1;
                        if (d > 0) {
                            for (v || (f.polygonStart(), v = !0), f.lineStart(); ++g < d;) f.point((e = a[g])[0], e[1]);
                            f.lineEnd()
                        }
                    } else d > 1 && 2 & b && c.push(c.pop().concat(c.shift())), n.push(c.filter(Hb))
            }
            var n, o, p, q = b(f),
                r = e.invert(d[0], d[1]),
                s = {
                    point: g,
                    lineStart: i,
                    lineEnd: j,
                    polygonStart: function() {
                        s.point = k, s.lineStart = l, s.lineEnd = m, n = [], o = []
                    },
                    polygonEnd: function() {
                        s.point = g, s.lineStart = i, s.lineEnd = j, n = bg.merge(n);
                        var a = Nb(r, o);
                        n.length ? (v || (f.polygonStart(), v = !0), Db(n, Jb, a, c, f)) : a && (v || (f.polygonStart(), v = !0), f.lineStart(), c(null, null, 1, f), f.lineEnd()), v && (f.polygonEnd(), v = !1), n = o = null
                    },
                    sphere: function() {
                        f.polygonStart(), f.lineStart(), c(null, null, 1, f), f.lineEnd(), f.polygonEnd()
                    }
                },
                t = Ib(),
                u = b(t),
                v = !1;
            return s
        }
    }

    function Hb(a) {
        return a.length > 1
    }

    function Ib() {
        var a, b = [];
        return {
            lineStart: function() {
                b.push(a = [])
            },
            point: function(b, c) {
                a.push([b, c])
            },
            lineEnd: s,
            buffer: function() {
                var c = b;
                return b = [], a = null, c
            },
            rejoin: function() {
                b.length > 1 && b.push(b.pop().concat(b.shift()))
            }
        }
    }

    function Jb(a, b) {
        return ((a = a.x)[0] < 0 ? a[1] - Mg - Hg : Mg - a[1]) - ((b = b.x)[0] < 0 ? b[1] - Mg - Hg : Mg - b[1])
    }

    function Kb(a) {
        var b, c = NaN,
            d = NaN,
            e = NaN;
        return {
            lineStart: function() {
                a.lineStart(), b = 1
            },
            point: function(f, g) {
                var h = f > 0 ? Jg : -Jg,
                    i = pg(f - c);
                pg(i - Jg) < Hg ? (a.point(c, d = (d + g) / 2 > 0 ? Mg : -Mg), a.point(e, d), a.lineEnd(), a.lineStart(), a.point(h, d), a.point(f, d), b = 0) : e !== h && i >= Jg && (pg(c - e) < Hg && (c -= e * Hg), pg(f - h) < Hg && (f -= h * Hg), d = Lb(c, d, f, g), a.point(e, d), a.lineEnd(), a.lineStart(), a.point(h, d), b = 0), a.point(c = f, d = g), e = h
            },
            lineEnd: function() {
                a.lineEnd(), c = d = NaN
            },
            clean: function() {
                return 2 - b
            }
        }
    }

    function Lb(a, b, c, d) {
        var e, f, g = Math.sin(a - c);
        return pg(g) > Hg ? Math.atan((Math.sin(b) * (f = Math.cos(d)) * Math.sin(c) - Math.sin(d) * (e = Math.cos(b)) * Math.sin(a)) / (e * f * g)) : (b + d) / 2
    }

    function Mb(a, b, c, d) {
        var e;
        if (null == a) e = c * Mg, d.point(-Jg, e), d.point(0, e), d.point(Jg, e), d.point(Jg, 0), d.point(Jg, -e), d.point(0, -e), d.point(-Jg, -e), d.point(-Jg, 0), d.point(-Jg, e);
        else if (pg(a[0] - b[0]) > Hg) {
            var f = a[0] < b[0] ? Jg : -Jg;
            e = c * f / 2, d.point(-f, e), d.point(0, e), d.point(f, e)
        } else d.point(b[0], b[1])
    }

    function Nb(a, b) {
        var c = a[0],
            d = a[1],
            e = [Math.sin(c), -Math.cos(c), 0],
            f = 0,
            g = 0;
        wh.reset();
        for (var h = 0, i = b.length; i > h; ++h) {
            var j = b[h],
                k = j.length;
            if (k)
                for (var l = j[0], m = l[0], n = l[1] / 2 + Jg / 4, o = Math.sin(n), p = Math.cos(n), q = 1;;) {
                    q === k && (q = 0), a = j[q];
                    var r = a[0],
                        s = a[1] / 2 + Jg / 4,
                        t = Math.sin(s),
                        u = Math.cos(s),
                        v = r - m,
                        w = v >= 0 ? 1 : -1,
                        x = w * v,
                        y = x > Jg,
                        z = o * t;
                    if (wh.add(Math.atan2(z * w * Math.sin(x), p * u + z * Math.cos(x))), f += y ? v + w * Kg : v, y ^ m >= c ^ r >= c) {
                        var A = qb(ob(l), ob(a));
                        tb(A);
                        var B = qb(e, A);
                        tb(B);
                        var C = (y ^ v >= 0 ? -1 : 1) * aa(B[2]);
                        (d > C || d === C && (A[0] || A[1])) && (g += y ^ v >= 0 ? 1 : -1)
                    }
                    if (!q++) break;
                    m = r, o = t, p = u, l = a
                }
        }
        return (-Hg > f || Hg > f && 0 > wh) ^ 1 & g
    }

    function Ob(a) {
        function b(a, b) {
            return Math.cos(a) * Math.cos(b) > f
        }

        function c(a) {
            var c, f, i, j, k;
            return {
                lineStart: function() {
                    j = i = !1, k = 1
                },
                point: function(l, m) {
                    var n, o = [l, m],
                        p = b(l, m),
                        q = g ? p ? 0 : e(l, m) : p ? e(l + (0 > l ? Jg : -Jg), m) : 0;
                    if (!c && (j = i = p) && a.lineStart(), p !== i && (n = d(c, o), (vb(c, n) || vb(o, n)) && (o[0] += Hg, o[1] += Hg, p = b(o[0], o[1]))), p !== i) k = 0, p ? (a.lineStart(), n = d(o, c), a.point(n[0], n[1])) : (n = d(c, o), a.point(n[0], n[1]), a.lineEnd()), c = n;
                    else if (h && c && g ^ p) {
                        var r;
                        q & f || !(r = d(o, c, !0)) || (k = 0, g ? (a.lineStart(), a.point(r[0][0], r[0][1]), a.point(r[1][0], r[1][1]), a.lineEnd()) : (a.point(r[1][0], r[1][1]), a.lineEnd(), a.lineStart(), a.point(r[0][0], r[0][1])))
                    }!p || c && vb(c, o) || a.point(o[0], o[1]), c = o, i = p, f = q
                },
                lineEnd: function() {
                    i && a.lineEnd(), c = null
                },
                clean: function() {
                    return k | (j && i) << 1
                }
            }
        }

        function d(a, b, c) {
            var d = ob(a),
                e = ob(b),
                g = [1, 0, 0],
                h = qb(d, e),
                i = pb(h, h),
                j = h[0],
                k = i - j * j;
            if (!k) return !c && a;
            var l = f * i / k,
                m = -f * j / k,
                n = qb(g, h),
                o = sb(g, l),
                p = sb(h, m);
            rb(o, p);
            var q = n,
                r = pb(o, q),
                s = pb(q, q),
                t = r * r - s * (pb(o, o) - 1);
            if (!(0 > t)) {
                var u = Math.sqrt(t),
                    v = sb(q, (-r - u) / s);
                if (rb(v, o), v = ub(v), !c) return v;
                var w, x = a[0],
                    y = b[0],
                    z = a[1],
                    A = b[1];
                x > y && (w = x, x = y, y = w);
                var B = y - x,
                    C = pg(B - Jg) < Hg,
                    D = C || Hg > B;
                if (!C && z > A && (w = z, z = A, A = w), D ? C ? z + A > 0 ^ v[1] < (pg(v[0] - x) < Hg ? z : A) : z <= v[1] && v[1] <= A : B > Jg ^ (x <= v[0] && v[0] <= y)) {
                    var E = sb(q, (-r + u) / s);
                    return rb(E, o), [v, ub(E)]
                }
            }
        }

        function e(b, c) {
            var d = g ? a : Jg - a,
                e = 0;
            return -d > b ? e |= 1 : b > d && (e |= 2), -d > c ? e |= 4 : c > d && (e |= 8), e
        }
        var f = Math.cos(a),
            g = f > 0,
            h = pg(f) > Hg,
            i = nc(a, 6 * Ng);
        return Gb(b, c, i, g ? [0, -a] : [-Jg, a - Jg])
    }

    function Pb(a, b, c, d) {
        return function(e) {
            var f, g = e.a,
                h = e.b,
                i = g.x,
                j = g.y,
                k = h.x,
                l = h.y,
                m = 0,
                n = 1,
                o = k - i,
                p = l - j;
            if (f = a - i, o || !(f > 0)) {
                if (f /= o, 0 > o) {
                    if (m > f) return;
                    n > f && (n = f)
                } else if (o > 0) {
                    if (f > n) return;
                    f > m && (m = f)
                }
                if (f = c - i, o || !(0 > f)) {
                    if (f /= o, 0 > o) {
                        if (f > n) return;
                        f > m && (m = f)
                    } else if (o > 0) {
                        if (m > f) return;
                        n > f && (n = f)
                    }
                    if (f = b - j, p || !(f > 0)) {
                        if (f /= p, 0 > p) {
                            if (m > f) return;
                            n > f && (n = f)
                        } else if (p > 0) {
                            if (f > n) return;
                            f > m && (m = f)
                        }
                        if (f = d - j, p || !(0 > f)) {
                            if (f /= p, 0 > p) {
                                if (f > n) return;
                                f > m && (m = f)
                            } else if (p > 0) {
                                if (m > f) return;
                                n > f && (n = f)
                            }
                            return m > 0 && (e.a = {
                                x: i + m * o,
                                y: j + m * p
                            }), 1 > n && (e.b = {
                                x: i + n * o,
                                y: j + n * p
                            }), e
                        }
                    }
                }
            }
        }
    }

    function Qb(a, b, c, d) {
        function e(d, e) {
            return pg(d[0] - a) < Hg ? e > 0 ? 0 : 3 : pg(d[0] - c) < Hg ? e > 0 ? 2 : 1 : pg(d[1] - b) < Hg ? e > 0 ? 1 : 0 : e > 0 ? 3 : 2
        }

        function f(a, b) {
            return g(a.x, b.x)
        }

        function g(a, b) {
            var c = e(a, 1),
                d = e(b, 1);
            return c !== d ? c - d : 0 === c ? b[1] - a[1] : 1 === c ? a[0] - b[0] : 2 === c ? a[1] - b[1] : b[0] - a[0]
        }
        return function(h) {
            function i(a) {
                for (var b = 0, c = q.length, d = a[1], e = 0; c > e; ++e)
                    for (var f, g = 1, h = q[e], i = h.length, j = h[0]; i > g; ++g) f = h[g], j[1] <= d ? f[1] > d && $(j, f, a) > 0 && ++b : f[1] <= d && $(j, f, a) < 0 && --b, j = f;
                return 0 !== b
            }

            function j(f, h, i, j) {
                var k = 0,
                    l = 0;
                if (null == f || (k = e(f, i)) !== (l = e(h, i)) || g(f, h) < 0 ^ i > 0) {
                    do j.point(0 === k || 3 === k ? a : c, k > 1 ? d : b); while ((k = (k + i + 4) % 4) !== l)
                } else j.point(h[0], h[1])
            }

            function k(e, f) {
                return e >= a && c >= e && f >= b && d >= f
            }

            function l(a, b) {
                k(a, b) && h.point(a, b)
            }

            function m() {
                D.point = o, q && q.push(r = []), y = !0, x = !1, v = w = NaN
            }

            function n() {
                p && (o(s, t), u && x && B.rejoin(), p.push(B.buffer())), D.point = l, x && h.lineEnd()
            }

            function o(a, b) {
                a = Math.max(-Lh, Math.min(Lh, a)), b = Math.max(-Lh, Math.min(Lh, b));
                var c = k(a, b);
                if (q && r.push([a, b]), y) s = a, t = b, u = c, y = !1, c && (h.lineStart(), h.point(a, b));
                else if (c && x) h.point(a, b);
                else {
                    var d = {
                        a: {
                            x: v,
                            y: w
                        },
                        b: {
                            x: a,
                            y: b
                        }
                    };
                    C(d) ? (x || (h.lineStart(), h.point(d.a.x, d.a.y)), h.point(d.b.x, d.b.y), c || h.lineEnd(), z = !1) : c && (h.lineStart(), h.point(a, b), z = !1)
                }
                v = a, w = b, x = c
            }
            var p, q, r, s, t, u, v, w, x, y, z, A = h,
                B = Ib(),
                C = Pb(a, b, c, d),
                D = {
                    point: l,
                    lineStart: m,
                    lineEnd: n,
                    polygonStart: function() {
                        h = B, p = [], q = [], z = !0
                    },
                    polygonEnd: function() {
                        h = A, p = bg.merge(p);
                        var b = i([a, d]),
                            c = z && b,
                            e = p.length;
                        (c || e) && (h.polygonStart(), c && (h.lineStart(), j(null, null, 1, h), h.lineEnd()), e && Db(p, f, b, j, h), h.polygonEnd()), p = q = r = null
                    }
                };
            return D
        }
    }

    function Rb(a) {
        var b = 0,
            c = Jg / 3,
            d = fc(a),
            e = d(b, c);
        return e.parallels = function(a) {
            return arguments.length ? d(b = a[0] * Jg / 180, c = a[1] * Jg / 180) : [180 * (b / Jg), 180 * (c / Jg)]
        }, e
    }

    function Sb(a, b) {
        function c(a, b) {
            var c = Math.sqrt(f - 2 * e * Math.sin(b)) / e;
            return [c * Math.sin(a *= e), g - c * Math.cos(a)]
        }
        var d = Math.sin(a),
            e = (d + Math.sin(b)) / 2,
            f = 1 + d * (2 * e - d),
            g = Math.sqrt(f) / e;
        return c.invert = function(a, b) {
            var c = g - b;
            return [Math.atan2(a, c) / e, aa((f - (a * a + c * c) * e * e) / (2 * e))]
        }, c
    }

    function Tb() {
        function a(a, b) {
            Nh += e * a - d * b, d = a, e = b
        }
        var b, c, d, e;
        Sh.point = function(f, g) {
            Sh.point = a, b = d = f, c = e = g
        }, Sh.lineEnd = function() {
            a(b, c)
        }
    }

    function Ub(a, b) {
        Oh > a && (Oh = a), a > Qh && (Qh = a), Ph > b && (Ph = b), b > Rh && (Rh = b)
    }

    function Vb() {
        function a(a, b) {
            g.push("M", a, ",", b, f)
        }

        function b(a, b) {
            g.push("M", a, ",", b), h.point = c
        }

        function c(a, b) {
            g.push("L", a, ",", b)
        }

        function d() {
            h.point = a
        }

        function e() {
            g.push("Z")
        }
        var f = Wb(4.5),
            g = [],
            h = {
                point: a,
                lineStart: function() {
                    h.point = b
                },
                lineEnd: d,
                polygonStart: function() {
                    h.lineEnd = e
                },
                polygonEnd: function() {
                    h.lineEnd = d, h.point = a
                },
                pointRadius: function(a) {
                    return f = Wb(a), h
                },
                result: function() {
                    if (g.length) {
                        var a = g.join("");
                        return g = [], a
                    }
                }
            };
        return h
    }

    function Wb(a) {
        return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a + "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z"
    }

    function Xb(a, b) {
        Ah += a, Bh += b, ++Ch
    }

    function Yb() {
        function a(a, d) {
            var e = a - b,
                f = d - c,
                g = Math.sqrt(e * e + f * f);
            Dh += g * (b + a) / 2, Eh += g * (c + d) / 2, Fh += g, Xb(b = a, c = d)
        }
        var b, c;
        Uh.point = function(d, e) {
            Uh.point = a, Xb(b = d, c = e)
        }
    }

    function Zb() {
        Uh.point = Xb
    }

    function $b() {
        function a(a, b) {
            var c = a - d,
                f = b - e,
                g = Math.sqrt(c * c + f * f);
            Dh += g * (d + a) / 2, Eh += g * (e + b) / 2, Fh += g, g = e * a - d * b, Gh += g * (d + a), Hh += g * (e + b), Ih += 3 * g, Xb(d = a, e = b)
        }
        var b, c, d, e;
        Uh.point = function(f, g) {
            Uh.point = a, Xb(b = d = f, c = e = g)
        }, Uh.lineEnd = function() {
            a(b, c)
        }
    }

    function _b(a) {
        function b(b, c) {
            a.moveTo(b + g, c), a.arc(b, c, g, 0, Kg)
        }

        function c(b, c) {
            a.moveTo(b, c), h.point = d
        }

        function d(b, c) {
            a.lineTo(b, c)
        }

        function e() {
            h.point = b
        }

        function f() {
            a.closePath()
        }
        var g = 4.5,
            h = {
                point: b,
                lineStart: function() {
                    h.point = c
                },
                lineEnd: e,
                polygonStart: function() {
                    h.lineEnd = f
                },
                polygonEnd: function() {
                    h.lineEnd = e, h.point = b
                },
                pointRadius: function(a) {
                    return g = a, h
                },
                result: s
            };
        return h
    }

    function ac(a) {
        function b(a) {
            return (h ? d : c)(a)
        }

        function c(b) {
            return dc(b, function(c, d) {
                c = a(c, d), b.point(c[0], c[1])
            })
        }

        function d(b) {
            function c(c, d) {
                c = a(c, d), b.point(c[0], c[1])
            }

            function d() {
                t = NaN, y.point = f, b.lineStart()
            }

            function f(c, d) {
                var f = ob([c, d]),
                    g = a(c, d);
                e(t, u, s, v, w, x, t = g[0], u = g[1], s = c, v = f[0], w = f[1], x = f[2], h, b), b.point(t, u)
            }

            function g() {
                y.point = c, b.lineEnd()
            }

            function i() {
                d(), y.point = j, y.lineEnd = k
            }

            function j(a, b) {
                f(l = a, m = b), n = t, o = u, p = v, q = w, r = x, y.point = f
            }

            function k() {
                e(t, u, s, v, w, x, n, o, l, p, q, r, h, b), y.lineEnd = g, g()
            }
            var l, m, n, o, p, q, r, s, t, u, v, w, x, y = {
                point: c,
                lineStart: d,
                lineEnd: g,
                polygonStart: function() {
                    b.polygonStart(), y.lineStart = i
                },
                polygonEnd: function() {
                    b.polygonEnd(), y.lineStart = d
                }
            };
            return y
        }

        function e(b, c, d, h, i, j, k, l, m, n, o, p, q, r) {
            var s = k - b,
                t = l - c,
                u = s * s + t * t;
            if (u > 4 * f && q--) {
                var v = h + n,
                    w = i + o,
                    x = j + p,
                    y = Math.sqrt(v * v + w * w + x * x),
                    z = Math.asin(x /= y),
                    A = pg(pg(x) - 1) < Hg || pg(d - m) < Hg ? (d + m) / 2 : Math.atan2(w, v),
                    B = a(A, z),
                    C = B[0],
                    D = B[1],
                    E = C - b,
                    F = D - c,
                    G = t * E - s * F;
                (G * G / u > f || pg((s * E + t * F) / u - .5) > .3 || g > h * n + i * o + j * p) && (e(b, c, d, h, i, j, C, D, A, v /= y, w /= y, x, q, r), r.point(C, D), e(C, D, A, v, w, x, k, l, m, n, o, p, q, r))
            }
        }
        var f = .5,
            g = Math.cos(30 * Ng),
            h = 16;
        return b.precision = function(a) {
            return arguments.length ? (h = (f = a * a) > 0 && 16, b) : Math.sqrt(f)
        }, b
    }

    function bc(a) {
        var b = ac(function(b, c) {
            return a([b * Og, c * Og])
        });
        return function(a) {
            return gc(b(a))
        }
    }

    function cc(a) {
        this.stream = a
    }

    function dc(a, b) {
        return {
            point: b,
            sphere: function() {
                a.sphere()
            },
            lineStart: function() {
                a.lineStart()
            },
            lineEnd: function() {
                a.lineEnd()
            },
            polygonStart: function() {
                a.polygonStart()
            },
            polygonEnd: function() {
                a.polygonEnd()
            }
        }
    }

    function ec(a) {
        return fc(function() {
            return a
        })()
    }

    function fc(a) {
        function b(a) {
            return a = h(a[0] * Ng, a[1] * Ng), [a[0] * m + i, j - a[1] * m]
        }

        function c(a) {
            return a = h.invert((a[0] - i) / m, (j - a[1]) / m), a && [a[0] * Og, a[1] * Og]
        }

        function d() {
            h = Bb(g = jc(r, s, t), f);
            var a = f(p, q);
            return i = n - a[0] * m, j = o + a[1] * m, e()
        }

        function e() {
            return k && (k.valid = !1, k = null), b
        }
        var f, g, h, i, j, k, l = ac(function(a, b) {
                return a = f(a, b), [a[0] * m + i, j - a[1] * m]
            }),
            m = 150,
            n = 480,
            o = 250,
            p = 0,
            q = 0,
            r = 0,
            s = 0,
            t = 0,
            u = Kh,
            v = Aa,
            w = null,
            x = null;
        return b.stream = function(a) {
                return k && (k.valid = !1), k = gc(u(g, l(v(a)))), k.valid = !0, k
            }, b.clipAngle = function(a) {
                return arguments.length ? (u = null == a ? (w = a, Kh) : Ob((w = +a) * Ng), e()) : w
            }, b.clipExtent = function(a) {
                return arguments.length ? (x = a, v = a ? Qb(a[0][0], a[0][1], a[1][0], a[1][1]) : Aa, e()) : x
            }, b.scale = function(a) {
                return arguments.length ? (m = +a, d()) : m
            }, b.translate = function(a) {
                return arguments.length ? (n = +a[0], o = +a[1], d()) : [n, o]
            }, b.center = function(a) {
                return arguments.length ? (p = a[0] % 360 * Ng, q = a[1] % 360 * Ng, d()) : [p * Og, q * Og]
            }, b.rotate = function(a) {
                return arguments.length ? (r = a[0] % 360 * Ng, s = a[1] % 360 * Ng, t = a.length > 2 ? a[2] % 360 * Ng : 0, d()) : [r * Og, s * Og, t * Og]
            }, bg.rebind(b, l, "precision"),
            function() {
                return f = a.apply(this, arguments), b.invert = f.invert && c, d()
            }
    }

    function gc(a) {
        return dc(a, function(b, c) {
            a.point(b * Ng, c * Ng)
        })
    }

    function hc(a, b) {
        return [a, b]
    }

    function ic(a, b) {
        return [a > Jg ? a - Kg : -Jg > a ? a + Kg : a, b]
    }

    function jc(a, b, c) {
        return a ? b || c ? Bb(lc(a), mc(b, c)) : lc(a) : b || c ? mc(b, c) : ic
    }

    function kc(a) {
        return function(b, c) {
            return b += a, [b > Jg ? b - Kg : -Jg > b ? b + Kg : b, c]
        }
    }

    function lc(a) {
        var b = kc(a);
        return b.invert = kc(-a), b
    }

    function mc(a, b) {
        function c(a, b) {
            var c = Math.cos(b),
                h = Math.cos(a) * c,
                i = Math.sin(a) * c,
                j = Math.sin(b),
                k = j * d + h * e;
            return [Math.atan2(i * f - k * g, h * d - j * e), aa(k * f + i * g)]
        }
        var d = Math.cos(a),
            e = Math.sin(a),
            f = Math.cos(b),
            g = Math.sin(b);
        return c.invert = function(a, b) {
            var c = Math.cos(b),
                h = Math.cos(a) * c,
                i = Math.sin(a) * c,
                j = Math.sin(b),
                k = j * f - i * g;
            return [Math.atan2(i * f + j * g, h * d + k * e), aa(k * d - h * e)]
        }, c
    }

    function nc(a, b) {
        var c = Math.cos(a),
            d = Math.sin(a);
        return function(e, f, g, h) {
            var i = g * b;
            null != e ? (e = oc(c, e), f = oc(c, f), (g > 0 ? f > e : e > f) && (e += g * Kg)) : (e = a + g * Kg, f = a - .5 * i);
            for (var j, k = e; g > 0 ? k > f : f > k; k -= i) h.point((j = ub([c, -d * Math.cos(k), -d * Math.sin(k)]))[0], j[1])
        }
    }

    function oc(a, b) {
        var c = ob(b);
        c[0] -= a, tb(c);
        var d = _(-c[1]);
        return ((-c[2] < 0 ? -d : d) + 2 * Math.PI - Hg) % (2 * Math.PI)
    }

    function pc(a, b, c) {
        var d = bg.range(a, b - Hg, c).concat(b);
        return function(a) {
            return d.map(function(b) {
                return [a, b]
            })
        }
    }

    function qc(a, b, c) {
        var d = bg.range(a, b - Hg, c).concat(b);
        return function(a) {
            return d.map(function(b) {
                return [b, a]
            })
        }
    }

    function rc(a) {
        return a.source
    }

    function sc(a) {
        return a.target
    }

    function tc(a, b, c, d) {
        var e = Math.cos(b),
            f = Math.sin(b),
            g = Math.cos(d),
            h = Math.sin(d),
            i = e * Math.cos(a),
            j = e * Math.sin(a),
            k = g * Math.cos(c),
            l = g * Math.sin(c),
            m = 2 * Math.asin(Math.sqrt(ea(d - b) + e * g * ea(c - a))),
            n = 1 / Math.sin(m),
            o = m ? function(a) {
                var b = Math.sin(a *= m) * n,
                    c = Math.sin(m - a) * n,
                    d = c * i + b * k,
                    e = c * j + b * l,
                    g = c * f + b * h;
                return [Math.atan2(e, d) * Og, Math.atan2(g, Math.sqrt(d * d + e * e)) * Og]
            } : function() {
                return [a * Og, b * Og]
            };
        return o.distance = m, o
    }

    function uc() {
        function a(a, e) {
            var f = Math.sin(e *= Ng),
                g = Math.cos(e),
                h = pg((a *= Ng) - b),
                i = Math.cos(h);
            Vh += Math.atan2(Math.sqrt((h = g * Math.sin(h)) * h + (h = d * f - c * g * i) * h), c * f + d * g * i), b = a, c = f, d = g
        }
        var b, c, d;
        Wh.point = function(e, f) {
            b = e * Ng, c = Math.sin(f *= Ng), d = Math.cos(f), Wh.point = a
        }, Wh.lineEnd = function() {
            Wh.point = Wh.lineEnd = s
        }
    }

    function vc(a, b) {
        function c(b, c) {
            var d = Math.cos(b),
                e = Math.cos(c),
                f = a(d * e);
            return [f * e * Math.sin(b), f * Math.sin(c)]
        }
        return c.invert = function(a, c) {
            var d = Math.sqrt(a * a + c * c),
                e = b(d),
                f = Math.sin(e),
                g = Math.cos(e);
            return [Math.atan2(a * f, d * g), Math.asin(d && c * f / d)]
        }, c
    }

    function wc(a, b) {
        function c(a, b) {
            g > 0 ? -Mg + Hg > b && (b = -Mg + Hg) : b > Mg - Hg && (b = Mg - Hg);
            var c = g / Math.pow(e(b), f);
            return [c * Math.sin(f * a), g - c * Math.cos(f * a)]
        }
        var d = Math.cos(a),
            e = function(a) {
                return Math.tan(Jg / 4 + a / 2)
            },
            f = a === b ? Math.sin(a) : Math.log(d / Math.cos(b)) / Math.log(e(b) / e(a)),
            g = d * Math.pow(e(a), f) / f;
        return f ? (c.invert = function(a, b) {
            var c = g - b,
                d = Z(f) * Math.sqrt(a * a + c * c);
            return [Math.atan2(a, c) / f, 2 * Math.atan(Math.pow(g / d, 1 / f)) - Mg]
        }, c) : yc
    }

    function xc(a, b) {
        function c(a, b) {
            var c = f - b;
            return [c * Math.sin(e * a), f - c * Math.cos(e * a)]
        }
        var d = Math.cos(a),
            e = a === b ? Math.sin(a) : (d - Math.cos(b)) / (b - a),
            f = d / e + a;
        return pg(e) < Hg ? hc : (c.invert = function(a, b) {
            var c = f - b;
            return [Math.atan2(a, c) / e, f - Z(e) * Math.sqrt(a * a + c * c)]
        }, c)
    }

    function yc(a, b) {
        return [a, Math.log(Math.tan(Jg / 4 + b / 2))]
    }

    function zc(a) {
        var b, c = ec(a),
            d = c.scale,
            e = c.translate,
            f = c.clipExtent;
        return c.scale = function() {
            var a = d.apply(c, arguments);
            return a === c ? b ? c.clipExtent(null) : c : a
        }, c.translate = function() {
            var a = e.apply(c, arguments);
            return a === c ? b ? c.clipExtent(null) : c : a
        }, c.clipExtent = function(a) {
            var g = f.apply(c, arguments);
            if (g === c) {
                if (b = null == a) {
                    var h = Jg * d(),
                        i = e();
                    f([
                        [i[0] - h, i[1] - h],
                        [i[0] + h, i[1] + h]
                    ])
                }
            } else b && (g = null);
            return g
        }, c.clipExtent(null)
    }

    function Ac(a, b) {
        return [Math.log(Math.tan(Jg / 4 + b / 2)), -a]
    }

    function Bc(a) {
        return a[0]
    }

    function Cc(a) {
        return a[1]
    }

    function Dc(a) {
        for (var b = a.length, c = [0, 1], d = 2, e = 2; b > e; e++) {
            for (; d > 1 && $(a[c[d - 2]], a[c[d - 1]], a[e]) <= 0;) --d;
            c[d++] = e
        }
        return c.slice(0, d)
    }

    function Ec(a, b) {
        return a[0] - b[0] || a[1] - b[1]
    }

    function Fc(a, b, c) {
        return (c[0] - b[0]) * (a[1] - b[1]) < (c[1] - b[1]) * (a[0] - b[0])
    }

    function Gc(a, b, c, d) {
        var e = a[0],
            f = c[0],
            g = b[0] - e,
            h = d[0] - f,
            i = a[1],
            j = c[1],
            k = b[1] - i,
            l = d[1] - j,
            m = (h * (i - j) - l * (e - f)) / (l * g - h * k);
        return [e + m * g, i + m * k]
    }

    function Hc(a) {
        var b = a[0],
            c = a[a.length - 1];
        return !(b[0] - c[0] || b[1] - c[1])
    }

    function Ic() {
        bd(this), this.edge = this.site = this.circle = null
    }

    function Jc(a) {
        var b = gi.pop() || new Ic;
        return b.site = a, b
    }

    function Kc(a) {
        Uc(a), di.remove(a), gi.push(a), bd(a)
    }

    function Lc(a) {
        var b = a.circle,
            c = b.x,
            d = b.cy,
            e = {
                x: c,
                y: d
            },
            f = a.P,
            g = a.N,
            h = [a];
        Kc(a);
        for (var i = f; i.circle && pg(c - i.circle.x) < Hg && pg(d - i.circle.cy) < Hg;) f = i.P, h.unshift(i), Kc(i), i = f;
        h.unshift(i), Uc(i);
        for (var j = g; j.circle && pg(c - j.circle.x) < Hg && pg(d - j.circle.cy) < Hg;) g = j.N, h.push(j), Kc(j), j = g;
        h.push(j), Uc(j);
        var k, l = h.length;
        for (k = 1; l > k; ++k) j = h[k], i = h[k - 1], $c(j.edge, i.site, j.site, e);
        i = h[0], j = h[l - 1], j.edge = Yc(i.site, j.site, null, e), Tc(i), Tc(j)
    }

    function Mc(a) {
        for (var b, c, d, e, f = a.x, g = a.y, h = di._; h;)
            if (d = Nc(h, g) - f, d > Hg) h = h.L;
            else {
                if (e = f - Oc(h, g), !(e > Hg)) {
                    d > -Hg ? (b = h.P, c = h) : e > -Hg ? (b = h, c = h.N) : b = c = h;
                    break
                }
                if (!h.R) {
                    b = h;
                    break
                }
                h = h.R
            }
        var i = Jc(a);
        if (di.insert(b, i), b || c) {
            if (b === c) return Uc(b), c = Jc(b.site), di.insert(i, c), i.edge = c.edge = Yc(b.site, i.site), Tc(b), void Tc(c);
            if (!c) return void(i.edge = Yc(b.site, i.site));
            Uc(b), Uc(c);
            var j = b.site,
                k = j.x,
                l = j.y,
                m = a.x - k,
                n = a.y - l,
                o = c.site,
                p = o.x - k,
                q = o.y - l,
                r = 2 * (m * q - n * p),
                s = m * m + n * n,
                t = p * p + q * q,
                u = {
                    x: (q * s - n * t) / r + k,
                    y: (m * t - p * s) / r + l
                };
            $c(c.edge, j, o, u), i.edge = Yc(j, a, null, u), c.edge = Yc(a, o, null, u), Tc(b), Tc(c)
        }
    }

    function Nc(a, b) {
        var c = a.site,
            d = c.x,
            e = c.y,
            f = e - b;
        if (!f) return d;
        var g = a.P;
        if (!g) return -1 / 0;
        c = g.site;
        var h = c.x,
            i = c.y,
            j = i - b;
        if (!j) return h;
        var k = h - d,
            l = 1 / f - 1 / j,
            m = k / j;
        return l ? (-m + Math.sqrt(m * m - 2 * l * (k * k / (-2 * j) - i + j / 2 + e - f / 2))) / l + d : (d + h) / 2
    }

    function Oc(a, b) {
        var c = a.N;
        if (c) return Nc(c, b);
        var d = a.site;
        return d.y === b ? d.x : 1 / 0
    }

    function Pc(a) {
        this.site = a, this.edges = []
    }

    function Qc(a) {
        for (var b, c, d, e, f, g, h, i, j, k, l = a[0][0], m = a[1][0], n = a[0][1], o = a[1][1], p = ci, q = p.length; q--;)
            if (f = p[q], f && f.prepare())
                for (h = f.edges, i = h.length, g = 0; i > g;) k = h[g].end(), d = k.x, e = k.y, j = h[++g % i].start(), b = j.x, c = j.y, (pg(d - b) > Hg || pg(e - c) > Hg) && (h.splice(g, 0, new _c(Zc(f.site, k, pg(d - l) < Hg && o - e > Hg ? {
                    x: l,
                    y: pg(b - l) < Hg ? c : o
                } : pg(e - o) < Hg && m - d > Hg ? {
                    x: pg(c - o) < Hg ? b : m,
                    y: o
                } : pg(d - m) < Hg && e - n > Hg ? {
                    x: m,
                    y: pg(b - m) < Hg ? c : n
                } : pg(e - n) < Hg && d - l > Hg ? {
                    x: pg(c - n) < Hg ? b : l,
                    y: n
                } : null), f.site, null)), ++i)
    }

    function Rc(a, b) {
        return b.angle - a.angle
    }

    function Sc() {
        bd(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function Tc(a) {
        var b = a.P,
            c = a.N;
        if (b && c) {
            var d = b.site,
                e = a.site,
                f = c.site;
            if (d !== f) {
                var g = e.x,
                    h = e.y,
                    i = d.x - g,
                    j = d.y - h,
                    k = f.x - g,
                    l = f.y - h,
                    m = 2 * (i * l - j * k);
                if (!(m >= -Ig)) {
                    var n = i * i + j * j,
                        o = k * k + l * l,
                        p = (l * n - j * o) / m,
                        q = (i * o - k * n) / m,
                        l = q + h,
                        r = hi.pop() || new Sc;
                    r.arc = a, r.site = e, r.x = p + g, r.y = l + Math.sqrt(p * p + q * q), r.cy = l, a.circle = r;
                    for (var s = null, t = fi._; t;)
                        if (r.y < t.y || r.y === t.y && r.x <= t.x) {
                            if (!t.L) {
                                s = t.P;
                                break
                            }
                            t = t.L
                        } else {
                            if (!t.R) {
                                s = t;
                                break
                            }
                            t = t.R
                        }
                    fi.insert(s, r), s || (ei = r)
                }
            }
        }
    }

    function Uc(a) {
        var b = a.circle;
        b && (b.P || (ei = b.N), fi.remove(b), hi.push(b), bd(b), a.circle = null)
    }

    function Vc(a) {
        for (var b, c = bi, d = Pb(a[0][0], a[0][1], a[1][0], a[1][1]), e = c.length; e--;) b = c[e], (!Wc(b, a) || !d(b) || pg(b.a.x - b.b.x) < Hg && pg(b.a.y - b.b.y) < Hg) && (b.a = b.b = null, c.splice(e, 1))
    }

    function Wc(a, b) {
        var c = a.b;
        if (c) return !0;
        var d, e, f = a.a,
            g = b[0][0],
            h = b[1][0],
            i = b[0][1],
            j = b[1][1],
            k = a.l,
            l = a.r,
            m = k.x,
            n = k.y,
            o = l.x,
            p = l.y,
            q = (m + o) / 2,
            r = (n + p) / 2;
        if (p === n) {
            if (g > q || q >= h) return;
            if (m > o) {
                if (f) {
                    if (f.y >= j) return
                } else f = {
                    x: q,
                    y: i
                };
                c = {
                    x: q,
                    y: j
                }
            } else {
                if (f) {
                    if (f.y < i) return
                } else f = {
                    x: q,
                    y: j
                };
                c = {
                    x: q,
                    y: i
                }
            }
        } else if (d = (m - o) / (p - n), e = r - d * q, -1 > d || d > 1)
            if (m > o) {
                if (f) {
                    if (f.y >= j) return
                } else f = {
                    x: (i - e) / d,
                    y: i
                };
                c = {
                    x: (j - e) / d,
                    y: j
                }
            } else {
                if (f) {
                    if (f.y < i) return
                } else f = {
                    x: (j - e) / d,
                    y: j
                };
                c = {
                    x: (i - e) / d,
                    y: i
                }
            }
        else if (p > n) {
            if (f) {
                if (f.x >= h) return
            } else f = {
                x: g,
                y: d * g + e
            };
            c = {
                x: h,
                y: d * h + e
            }
        } else {
            if (f) {
                if (f.x < g) return
            } else f = {
                x: h,
                y: d * h + e
            };
            c = {
                x: g,
                y: d * g + e
            }
        }
        return a.a = f, a.b = c, !0
    }

    function Xc(a, b) {
        this.l = a, this.r = b, this.a = this.b = null
    }

    function Yc(a, b, c, d) {
        var e = new Xc(a, b);
        return bi.push(e), c && $c(e, a, b, c), d && $c(e, b, a, d), ci[a.i].edges.push(new _c(e, a, b)), ci[b.i].edges.push(new _c(e, b, a)), e
    }

    function Zc(a, b, c) {
        var d = new Xc(a, null);
        return d.a = b, d.b = c, bi.push(d), d
    }

    function $c(a, b, c, d) {
        a.a || a.b ? a.l === c ? a.b = d : a.a = d : (a.a = d, a.l = b, a.r = c)
    }

    function _c(a, b, c) {
        var d = a.a,
            e = a.b;
        this.edge = a, this.site = b, this.angle = c ? Math.atan2(c.y - b.y, c.x - b.x) : a.l === b ? Math.atan2(e.x - d.x, d.y - e.y) : Math.atan2(d.x - e.x, e.y - d.y)
    }

    function ad() {
        this._ = null
    }

    function bd(a) {
        a.U = a.C = a.L = a.R = a.P = a.N = null
    }

    function cd(a, b) {
        var c = b,
            d = b.R,
            e = c.U;
        e ? e.L === c ? e.L = d : e.R = d : a._ = d, d.U = e, c.U = d, c.R = d.L, c.R && (c.R.U = c), d.L = c
    }

    function dd(a, b) {
        var c = b,
            d = b.L,
            e = c.U;
        e ? e.L === c ? e.L = d : e.R = d : a._ = d, d.U = e, c.U = d, c.L = d.R, c.L && (c.L.U = c), d.R = c
    }

    function ed(a) {
        for (; a.L;) a = a.L;
        return a
    }

    function fd(a, b) {
        var c, d, e, f = a.sort(gd).pop();
        for (bi = [], ci = new Array(a.length), di = new ad, fi = new ad;;)
            if (e = ei, f && (!e || f.y < e.y || f.y === e.y && f.x < e.x))(f.x !== c || f.y !== d) && (ci[f.i] = new Pc(f), Mc(f), c = f.x, d = f.y), f = a.pop();
            else {
                if (!e) break;
                Lc(e.arc)
            }
        b && (Vc(b), Qc(b));
        var g = {
            cells: ci,
            edges: bi
        };
        return di = fi = bi = ci = null, g
    }

    function gd(a, b) {
        return b.y - a.y || b.x - a.x
    }

    function hd(a, b, c) {
        return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)
    }

    function id(a) {
        return a.x
    }

    function jd(a) {
        return a.y
    }

    function kd() {
        return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
        }
    }

    function ld(a, b, c, d, e, f) {
        if (!a(b, c, d, e, f)) {
            var g = .5 * (c + e),
                h = .5 * (d + f),
                i = b.nodes;
            i[0] && ld(a, i[0], c, d, g, h), i[1] && ld(a, i[1], g, d, e, h), i[2] && ld(a, i[2], c, h, g, f), i[3] && ld(a, i[3], g, h, e, f)
        }
    }

    function md(a, b, c, d, e, f, g) {
        var h, i = 1 / 0;
        return function j(a, k, l, m, n) {
            if (!(k > f || l > g || d > m || e > n)) {
                if (o = a.point) {
                    var o, p = b - o[0],
                        q = c - o[1],
                        r = p * p + q * q;
                    if (i > r) {
                        var s = Math.sqrt(i = r);
                        d = b - s, e = c - s, f = b + s, g = c + s, h = o
                    }
                }
                for (var t = a.nodes, u = .5 * (k + m), v = .5 * (l + n), w = b >= u, x = c >= v, y = x << 1 | w, z = y + 4; z > y; ++y)
                    if (a = t[3 & y]) switch (3 & y) {
                        case 0:
                            j(a, k, l, u, v);
                            break;
                        case 1:
                            j(a, u, l, m, v);
                            break;
                        case 2:
                            j(a, k, v, u, n);
                            break;
                        case 3:
                            j(a, u, v, m, n)
                    }
            }
        }(a, d, e, f, g), h
    }

    function nd(a, b) {
        a = bg.rgb(a), b = bg.rgb(b);
        var c = a.r,
            d = a.g,
            e = a.b,
            f = b.r - c,
            g = b.g - d,
            h = b.b - e;
        return function(a) {
            return "#" + ta(Math.round(c + f * a)) + ta(Math.round(d + g * a)) + ta(Math.round(e + h * a))
        }
    }

    function od(a, b) {
        var c, d = {},
            e = {};
        for (c in a) c in b ? d[c] = rd(a[c], b[c]) : e[c] = a[c];
        for (c in b) c in a || (e[c] = b[c]);
        return function(a) {
            for (c in d) e[c] = d[c](a);
            return e
        }
    }

    function pd(a, b) {
        return a = +a, b = +b,
            function(c) {
                return a * (1 - c) + b * c
            }
    }

    function qd(a, b) {
        var c, d, e, f = ji.lastIndex = ki.lastIndex = 0,
            g = -1,
            h = [],
            i = [];
        for (a += "", b += "";
            (c = ji.exec(a)) && (d = ki.exec(b));)(e = d.index) > f && (e = b.slice(f, e), h[g] ? h[g] += e : h[++g] = e), (c = c[0]) === (d = d[0]) ? h[g] ? h[g] += d : h[++g] = d : (h[++g] = null, i.push({
            i: g,
            x: pd(c, d)
        })), f = ki.lastIndex;
        return f < b.length && (e = b.slice(f), h[g] ? h[g] += e : h[++g] = e), h.length < 2 ? i[0] ? (b = i[0].x, function(a) {
            return b(a) + ""
        }) : function() {
            return b
        } : (b = i.length, function(a) {
            for (var c, d = 0; b > d; ++d) h[(c = i[d]).i] = c.x(a);
            return h.join("")
        })
    }

    function rd(a, b) {
        for (var c, d = bg.interpolators.length; --d >= 0 && !(c = bg.interpolators[d](a, b)););
        return c
    }

    function sd(a, b) {
        var c, d = [],
            e = [],
            f = a.length,
            g = b.length,
            h = Math.min(a.length, b.length);
        for (c = 0; h > c; ++c) d.push(rd(a[c], b[c]));
        for (; f > c; ++c) e[c] = a[c];
        for (; g > c; ++c) e[c] = b[c];
        return function(a) {
            for (c = 0; h > c; ++c) e[c] = d[c](a);
            return e
        }
    }

    function td(a) {
        return function(b) {
            return 0 >= b ? 0 : b >= 1 ? 1 : a(b)
        }
    }

    function ud(a) {
        return function(b) {
            return 1 - a(1 - b)
        }
    }

    function vd(a) {
        return function(b) {
            return .5 * (.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
        }
    }

    function wd(a) {
        return a * a
    }

    function xd(a) {
        return a * a * a
    }

    function yd(a) {
        if (0 >= a) return 0;
        if (a >= 1) return 1;
        var b = a * a,
            c = b * a;
        return 4 * (.5 > a ? c : 3 * (a - b) + c - .75)
    }

    function zd(a) {
        return function(b) {
            return Math.pow(b, a)
        }
    }

    function Ad(a) {
        return 1 - Math.cos(a * Mg)
    }

    function Bd(a) {
        return Math.pow(2, 10 * (a - 1))
    }

    function Cd(a) {
        return 1 - Math.sqrt(1 - a * a)
    }

    function Dd(a, b) {
        var c;
        return arguments.length < 2 && (b = .45), arguments.length ? c = b / Kg * Math.asin(1 / a) : (a = 1, c = b / 4),
            function(d) {
                return 1 + a * Math.pow(2, -10 * d) * Math.sin((d - c) * Kg / b)
            }
    }

    function Ed(a) {
        return a || (a = 1.70158),
            function(b) {
                return b * b * ((a + 1) * b - a)
            }
    }

    function Fd(a) {
        return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
    }

    function Gd(a, b) {
        a = bg.hcl(a), b = bg.hcl(b);
        var c = a.h,
            d = a.c,
            e = a.l,
            f = b.h - c,
            g = b.c - d,
            h = b.l - e;
        return isNaN(g) && (g = 0, d = isNaN(d) ? b.c : d), isNaN(f) ? (f = 0, c = isNaN(c) ? b.h : c) : f > 180 ? f -= 360 : -180 > f && (f += 360),
            function(a) {
                return ja(c + f * a, d + g * a, e + h * a) + ""
            }
    }

    function Hd(a, b) {
        a = bg.hsl(a), b = bg.hsl(b);
        var c = a.h,
            d = a.s,
            e = a.l,
            f = b.h - c,
            g = b.s - d,
            h = b.l - e;
        return isNaN(g) && (g = 0, d = isNaN(d) ? b.s : d), isNaN(f) ? (f = 0, c = isNaN(c) ? b.h : c) : f > 180 ? f -= 360 : -180 > f && (f += 360),
            function(a) {
                return ha(c + f * a, d + g * a, e + h * a) + ""
            }
    }

    function Id(a, b) {
        a = bg.lab(a), b = bg.lab(b);
        var c = a.l,
            d = a.a,
            e = a.b,
            f = b.l - c,
            g = b.a - d,
            h = b.b - e;
        return function(a) {
            return la(c + f * a, d + g * a, e + h * a) + ""
        }
    }

    function Jd(a, b) {
        return b -= a,
            function(c) {
                return Math.round(a + b * c)
            }
    }

    function Kd(a) {
        var b = [a.a, a.b],
            c = [a.c, a.d],
            d = Md(b),
            e = Ld(b, c),
            f = Md(Nd(c, b, -e)) || 0;
        b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1), this.rotate = (d ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * Og, this.translate = [a.e, a.f], this.scale = [d, f], this.skew = f ? Math.atan2(e, f) * Og : 0
    }

    function Ld(a, b) {
        return a[0] * b[0] + a[1] * b[1]
    }

    function Md(a) {
        var b = Math.sqrt(Ld(a, a));
        return b && (a[0] /= b, a[1] /= b), b
    }

    function Nd(a, b, c) {
        return a[0] += c * b[0], a[1] += c * b[1], a
    }

    function Od(a, b) {
        var c, d = [],
            e = [],
            f = bg.transform(a),
            g = bg.transform(b),
            h = f.translate,
            i = g.translate,
            j = f.rotate,
            k = g.rotate,
            l = f.skew,
            m = g.skew,
            n = f.scale,
            o = g.scale;
        return h[0] != i[0] || h[1] != i[1] ? (d.push("translate(", null, ",", null, ")"), e.push({
                i: 1,
                x: pd(h[0], i[0])
            }, {
                i: 3,
                x: pd(h[1], i[1])
            })) : i[0] || i[1] ? d.push("translate(" + i + ")") : d.push(""), j != k ? (j - k > 180 ? k += 360 : k - j > 180 && (j += 360), e.push({
                i: d.push(d.pop() + "rotate(", null, ")") - 2,
                x: pd(j, k)
            })) : k && d.push(d.pop() + "rotate(" + k + ")"), l != m ? e.push({
                i: d.push(d.pop() + "skewX(", null, ")") - 2,
                x: pd(l, m)
            }) : m && d.push(d.pop() + "skewX(" + m + ")"), n[0] != o[0] || n[1] != o[1] ? (c = d.push(d.pop() + "scale(", null, ",", null, ")"), e.push({
                i: c - 4,
                x: pd(n[0], o[0])
            }, {
                i: c - 2,
                x: pd(n[1], o[1])
            })) : (1 != o[0] || 1 != o[1]) && d.push(d.pop() + "scale(" + o + ")"), c = e.length,
            function(a) {
                for (var b, f = -1; ++f < c;) d[(b = e[f]).i] = b.x(a);
                return d.join("")
            }
    }

    function Pd(a, b) {
        return b = (b -= a = +a) || 1 / b,
            function(c) {
                return (c - a) / b
            }
    }

    function Qd(a, b) {
        return b = (b -= a = +a) || 1 / b,
            function(c) {
                return Math.max(0, Math.min(1, (c - a) / b))
            }
    }

    function Rd(a) {
        for (var b = a.source, c = a.target, d = Td(b, c), e = [b]; b !== d;) b = b.parent, e.push(b);
        for (var f = e.length; c !== d;) e.splice(f, 0, c), c = c.parent;
        return e
    }

    function Sd(a) {
        for (var b = [], c = a.parent; null != c;) b.push(a), a = c, c = c.parent;
        return b.push(a), b
    }

    function Td(a, b) {
        if (a === b) return a;
        for (var c = Sd(a), d = Sd(b), e = c.pop(), f = d.pop(), g = null; e === f;) g = e, e = c.pop(), f = d.pop();
        return g
    }

    function Ud(a) {
        a.fixed |= 2
    }

    function Vd(a) {
        a.fixed &= -7
    }

    function Wd(a) {
        a.fixed |= 4, a.px = a.x, a.py = a.y
    }

    function Xd(a) {
        a.fixed &= -5
    }

    function Yd(a, b, c) {
        var d = 0,
            e = 0;
        if (a.charge = 0, !a.leaf)
            for (var f, g = a.nodes, h = g.length, i = -1; ++i < h;) f = g[i], null != f && (Yd(f, b, c), a.charge += f.charge, d += f.charge * f.cx, e += f.charge * f.cy);
        if (a.point) {
            a.leaf || (a.point.x += Math.random() - .5, a.point.y += Math.random() - .5);
            var j = b * c[a.point.index];
            a.charge += a.pointCharge = j, d += j * a.point.x, e += j * a.point.y
        }
        a.cx = d / a.charge, a.cy = e / a.charge
    }

    function Zd(a, b) {
        return bg.rebind(a, b, "sort", "children", "value"), a.nodes = a, a.links = de, a
    }

    function $d(a, b) {
        for (var c = [a]; null != (a = c.pop());)
            if (b(a), (e = a.children) && (d = e.length))
                for (var d, e; --d >= 0;) c.push(e[d])
    }

    function _d(a, b) {
        for (var c = [a], d = []; null != (a = c.pop());)
            if (d.push(a), (f = a.children) && (e = f.length))
                for (var e, f, g = -1; ++g < e;) c.push(f[g]);
        for (; null != (a = d.pop());) b(a)
    }

    function ae(a) {
        return a.children
    }

    function be(a) {
        return a.value
    }

    function ce(a, b) {
        return b.value - a.value
    }

    function de(a) {
        return bg.merge(a.map(function(a) {
            return (a.children || []).map(function(b) {
                return {
                    source: a,
                    target: b
                }
            })
        }))
    }

    function ee(a) {
        return a.x
    }

    function fe(a) {
        return a.y
    }

    function ge(a, b, c) {
        a.y0 = b, a.y = c
    }

    function he(a) {
        return bg.range(a.length)
    }

    function ie(a) {
        for (var b = -1, c = a[0].length, d = []; ++b < c;) d[b] = 0;
        return d
    }

    function je(a) {
        for (var b, c = 1, d = 0, e = a[0][1], f = a.length; f > c; ++c)(b = a[c][1]) > e && (d = c, e = b);
        return d
    }

    function ke(a) {
        return a.reduce(le, 0)
    }

    function le(a, b) {
        return a + b[1]
    }

    function me(a, b) {
        return ne(a, Math.ceil(Math.log(b.length) / Math.LN2 + 1))
    }

    function ne(a, b) {
        for (var c = -1, d = +a[0], e = (a[1] - d) / b, f = []; ++c <= b;) f[c] = e * c + d;
        return f
    }

    function oe(a) {
        return [bg.min(a), bg.max(a)]
    }

    function pe(a, b) {
        return a.value - b.value
    }

    function qe(a, b) {
        var c = a._pack_next;
        a._pack_next = b, b._pack_prev = a, b._pack_next = c, c._pack_prev = b
    }

    function re(a, b) {
        a._pack_next = b, b._pack_prev = a
    }

    function se(a, b) {
        var c = b.x - a.x,
            d = b.y - a.y,
            e = a.r + b.r;
        return .999 * e * e > c * c + d * d
    }

    function te(a) {
        function b(a) {
            k = Math.min(a.x - a.r, k), l = Math.max(a.x + a.r, l), m = Math.min(a.y - a.r, m), n = Math.max(a.y + a.r, n)
        }
        if ((c = a.children) && (j = c.length)) {
            var c, d, e, f, g, h, i, j, k = 1 / 0,
                l = -1 / 0,
                m = 1 / 0,
                n = -1 / 0;
            if (c.forEach(ue), d = c[0], d.x = -d.r, d.y = 0, b(d), j > 1 && (e = c[1], e.x = e.r, e.y = 0, b(e), j > 2))
                for (f = c[2], xe(d, e, f), b(f), qe(d, f), d._pack_prev = f, qe(f, e), e = d._pack_next, g = 3; j > g; g++) {
                    xe(d, e, f = c[g]);
                    var o = 0,
                        p = 1,
                        q = 1;
                    for (h = e._pack_next; h !== e; h = h._pack_next, p++)
                        if (se(h, f)) {
                            o = 1;
                            break
                        }
                    if (1 == o)
                        for (i = d._pack_prev; i !== h._pack_prev && !se(i, f); i = i._pack_prev, q++);
                    o ? (q > p || p == q && e.r < d.r ? re(d, e = h) : re(d = i, e), g--) : (qe(d, f), e = f, b(f))
                }
            var r = (k + l) / 2,
                s = (m + n) / 2,
                t = 0;
            for (g = 0; j > g; g++) f = c[g], f.x -= r, f.y -= s, t = Math.max(t, f.r + Math.sqrt(f.x * f.x + f.y * f.y));
            a.r = t, c.forEach(ve)
        }
    }

    function ue(a) {
        a._pack_next = a._pack_prev = a
    }

    function ve(a) {
        delete a._pack_next, delete a._pack_prev
    }

    function we(a, b, c, d) {
        var e = a.children;
        if (a.x = b += d * a.x, a.y = c += d * a.y, a.r *= d, e)
            for (var f = -1, g = e.length; ++f < g;) we(e[f], b, c, d)
    }

    function xe(a, b, c) {
        var d = a.r + c.r,
            e = b.x - a.x,
            f = b.y - a.y;
        if (d && (e || f)) {
            var g = b.r + c.r,
                h = e * e + f * f;
            g *= g, d *= d;
            var i = .5 + (d - g) / (2 * h),
                j = Math.sqrt(Math.max(0, 2 * g * (d + h) - (d -= h) * d - g * g)) / (2 * h);
            c.x = a.x + i * e + j * f, c.y = a.y + i * f - j * e
        } else c.x = a.x + d, c.y = a.y
    }

    function ye(a, b) {
        return a.parent == b.parent ? 1 : 2
    }

    function ze(a) {
        var b = a.children;
        return b.length ? b[0] : a.t
    }

    function Ae(a) {
        var b, c = a.children;
        return (b = c.length) ? c[b - 1] : a.t
    }

    function Be(a, b, c) {
        var d = c / (b.i - a.i);
        b.c -= d, b.s += c, a.c += d, b.z += c, b.m += c
    }

    function Ce(a) {
        for (var b, c = 0, d = 0, e = a.children, f = e.length; --f >= 0;) b = e[f], b.z += c, b.m += c, c += b.s + (d += b.c)
    }

    function De(a, b, c) {
        return a.a.parent === b.parent ? a.a : c
    }

    function Ee(a) {
        return 1 + bg.max(a, function(a) {
            return a.y
        })
    }

    function Fe(a) {
        return a.reduce(function(a, b) {
            return a + b.x
        }, 0) / a.length
    }

    function Ge(a) {
        var b = a.children;
        return b && b.length ? Ge(b[0]) : a
    }

    function He(a) {
        var b, c = a.children;
        return c && (b = c.length) ? He(c[b - 1]) : a
    }

    function Ie(a) {
        return {
            x: a.x,
            y: a.y,
            dx: a.dx,
            dy: a.dy
        }
    }

    function Je(a, b) {
        var c = a.x + b[3],
            d = a.y + b[0],
            e = a.dx - b[1] - b[3],
            f = a.dy - b[0] - b[2];
        return 0 > e && (c += e / 2, e = 0), 0 > f && (d += f / 2, f = 0), {
            x: c,
            y: d,
            dx: e,
            dy: f
        }
    }

    function Ke(a) {
        var b = a[0],
            c = a[a.length - 1];
        return c > b ? [b, c] : [c, b]
    }

    function Le(a) {
        return a.rangeExtent ? a.rangeExtent() : Ke(a.range())
    }

    function Me(a, b, c, d) {
        var e = c(a[0], a[1]),
            f = d(b[0], b[1]);
        return function(a) {
            return f(e(a))
        }
    }

    function Ne(a, b) {
        var c, d = 0,
            e = a.length - 1,
            f = a[d],
            g = a[e];
        return f > g && (c = d, d = e, e = c, c = f, f = g, g = c), a[d] = b.floor(f), a[e] = b.ceil(g), a
    }

    function Oe(a) {
        return a ? {
            floor: function(b) {
                return Math.floor(b / a) * a
            },
            ceil: function(b) {
                return Math.ceil(b / a) * a
            }
        } : vi
    }

    function Pe(a, b, c, d) {
        var e = [],
            f = [],
            g = 0,
            h = Math.min(a.length, b.length) - 1;
        for (a[h] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse()); ++g <= h;) e.push(c(a[g - 1], a[g])), f.push(d(b[g - 1], b[g]));
        return function(b) {
            var c = bg.bisect(a, b, 1, h) - 1;
            return f[c](e[c](b))
        }
    }

    function Qe(a, b, c, d) {
        function e() {
            var e = Math.min(a.length, b.length) > 2 ? Pe : Me,
                i = d ? Qd : Pd;
            return g = e(a, b, i, c), h = e(b, a, i, rd), f
        }

        function f(a) {
            return g(a)
        }
        var g, h;
        return f.invert = function(a) {
            return h(a)
        }, f.domain = function(b) {
            return arguments.length ? (a = b.map(Number), e()) : a
        }, f.range = function(a) {
            return arguments.length ? (b = a, e()) : b
        }, f.rangeRound = function(a) {
            return f.range(a).interpolate(Jd)
        }, f.clamp = function(a) {
            return arguments.length ? (d = a, e()) : d
        }, f.interpolate = function(a) {
            return arguments.length ? (c = a, e()) : c
        }, f.ticks = function(b) {
            return Ue(a, b)
        }, f.tickFormat = function(b, c) {
            return Ve(a, b, c)
        }, f.nice = function(b) {
            return Se(a, b), e()
        }, f.copy = function() {
            return Qe(a, b, c, d)
        }, e()
    }

    function Re(a, b) {
        return bg.rebind(a, b, "range", "rangeRound", "interpolate", "clamp")
    }

    function Se(a, b) {
        return Ne(a, Oe(Te(a, b)[2]))
    }

    function Te(a, b) {
        null == b && (b = 10);
        var c = Ke(a),
            d = c[1] - c[0],
            e = Math.pow(10, Math.floor(Math.log(d / b) / Math.LN10)),
            f = b / d * e;
        return .15 >= f ? e *= 10 : .35 >= f ? e *= 5 : .75 >= f && (e *= 2), c[0] = Math.ceil(c[0] / e) * e, c[1] = Math.floor(c[1] / e) * e + .5 * e, c[2] = e, c
    }

    function Ue(a, b) {
        return bg.range.apply(bg, Te(a, b))
    }

    function Ve(a, b, c) {
        var d = Te(a, b);
        if (c) {
            var e = jh.exec(c);
            if (e.shift(), "s" === e[8]) {
                var f = bg.formatPrefix(Math.max(pg(d[0]), pg(d[1])));
                return e[7] || (e[7] = "." + We(f.scale(d[2]))), e[8] = "f", c = bg.format(e.join("")),
                    function(a) {
                        return c(f.scale(a)) + f.symbol
                    }
            }
            e[7] || (e[7] = "." + Xe(e[8], d)), c = e.join("")
        } else c = ",." + We(d[2]) + "f";
        return bg.format(c)
    }

    function We(a) {
        return -Math.floor(Math.log(a) / Math.LN10 + .01)
    }

    function Xe(a, b) {
        var c = We(b[2]);
        return a in wi ? Math.abs(c - We(Math.max(pg(b[0]), pg(b[1])))) + +("e" !== a) : c - 2 * ("%" === a)
    }

    function Ye(a, b, c, d) {
        function e(a) {
            return (c ? Math.log(0 > a ? 0 : a) : -Math.log(a > 0 ? 0 : -a)) / Math.log(b)
        }

        function f(a) {
            return c ? Math.pow(b, a) : -Math.pow(b, -a)
        }

        function g(b) {
            return a(e(b))
        }
        return g.invert = function(b) {
            return f(a.invert(b))
        }, g.domain = function(b) {
            return arguments.length ? (c = b[0] >= 0, a.domain((d = b.map(Number)).map(e)), g) : d
        }, g.base = function(c) {
            return arguments.length ? (b = +c, a.domain(d.map(e)), g) : b
        }, g.nice = function() {
            var b = Ne(d.map(e), c ? Math : yi);
            return a.domain(b), d = b.map(f), g
        }, g.ticks = function() {
            var a = Ke(d),
                g = [],
                h = a[0],
                i = a[1],
                j = Math.floor(e(h)),
                k = Math.ceil(e(i)),
                l = b % 1 ? 2 : b;
            if (isFinite(k - j)) {
                if (c) {
                    for (; k > j; j++)
                        for (var m = 1; l > m; m++) g.push(f(j) * m);
                    g.push(f(j))
                } else
                    for (g.push(f(j)); j++ < k;)
                        for (var m = l - 1; m > 0; m--) g.push(f(j) * m);
                for (j = 0; g[j] < h; j++);
                for (k = g.length; g[k - 1] > i; k--);
                g = g.slice(j, k)
            }
            return g
        }, g.tickFormat = function(a, b) {
            if (!arguments.length) return xi;
            arguments.length < 2 ? b = xi : "function" != typeof b && (b = bg.format(b));
            var d, h = Math.max(.1, a / g.ticks().length),
                i = c ? (d = 1e-12, Math.ceil) : (d = -1e-12, Math.floor);
            return function(a) {
                return a / f(i(e(a) + d)) <= h ? b(a) : ""
            }
        }, g.copy = function() {
            return Ye(a.copy(), b, c, d)
        }, Re(g, a)
    }

    function Ze(a, b, c) {
        function d(b) {
            return a(e(b))
        }
        var e = $e(b),
            f = $e(1 / b);
        return d.invert = function(b) {
            return f(a.invert(b))
        }, d.domain = function(b) {
            return arguments.length ? (a.domain((c = b.map(Number)).map(e)), d) : c
        }, d.ticks = function(a) {
            return Ue(c, a)
        }, d.tickFormat = function(a, b) {
            return Ve(c, a, b)
        }, d.nice = function(a) {
            return d.domain(Se(c, a))
        }, d.exponent = function(g) {
            return arguments.length ? (e = $e(b = g), f = $e(1 / b), a.domain(c.map(e)), d) : b
        }, d.copy = function() {
            return Ze(a.copy(), b, c)
        }, Re(d, a)
    }

    function $e(a) {
        return function(b) {
            return 0 > b ? -Math.pow(-b, a) : Math.pow(b, a)
        }
    }

    function _e(a, b) {
        function c(c) {
            return f[((e.get(c) || ("range" === b.t ? e.set(c, a.push(c)) : NaN)) - 1) % f.length]
        }

        function d(b, c) {
            return bg.range(a.length).map(function(a) {
                return b + c * a
            })
        }
        var e, f, g;
        return c.domain = function(d) {
            if (!arguments.length) return a;
            a = [], e = new h;
            for (var f, g = -1, i = d.length; ++g < i;) e.has(f = d[g]) || e.set(f, a.push(f));
            return c[b.t].apply(c, b.a)
        }, c.range = function(a) {
            return arguments.length ? (f = a, g = 0, b = {
                t: "range",
                a: arguments
            }, c) : f
        }, c.rangePoints = function(e, h) {
            arguments.length < 2 && (h = 0);
            var i = e[0],
                j = e[1],
                k = a.length < 2 ? (i = (i + j) / 2, 0) : (j - i) / (a.length - 1 + h);
            return f = d(i + k * h / 2, k), g = 0, b = {
                t: "rangePoints",
                a: arguments
            }, c
        }, c.rangeRoundPoints = function(e, h) {
            arguments.length < 2 && (h = 0);
            var i = e[0],
                j = e[1],
                k = a.length < 2 ? (i = j = Math.round((i + j) / 2), 0) : 0 | (j - i) / (a.length - 1 + h);
            return f = d(i + Math.round(k * h / 2 + (j - i - (a.length - 1 + h) * k) / 2), k), g = 0, b = {
                t: "rangeRoundPoints",
                a: arguments
            }, c
        }, c.rangeBands = function(e, h, i) {
            arguments.length < 2 && (h = 0), arguments.length < 3 && (i = h);
            var j = e[1] < e[0],
                k = e[j - 0],
                l = e[1 - j],
                m = (l - k) / (a.length - h + 2 * i);
            return f = d(k + m * i, m), j && f.reverse(), g = m * (1 - h), b = {
                t: "rangeBands",
                a: arguments
            }, c
        }, c.rangeRoundBands = function(e, h, i) {
            arguments.length < 2 && (h = 0), arguments.length < 3 && (i = h);
            var j = e[1] < e[0],
                k = e[j - 0],
                l = e[1 - j],
                m = Math.floor((l - k) / (a.length - h + 2 * i));
            return f = d(k + Math.round((l - k - (a.length - h) * m) / 2), m), j && f.reverse(), g = Math.round(m * (1 - h)), b = {
                t: "rangeRoundBands",
                a: arguments
            }, c
        }, c.rangeBand = function() {
            return g
        }, c.rangeExtent = function() {
            return Ke(b.a[0])
        }, c.copy = function() {
            return _e(a, b)
        }, c.domain(a)
    }

    function af(d, e) {
        function f() {
            var a = 0,
                b = e.length;
            for (h = []; ++a < b;) h[a - 1] = bg.quantile(d, a / b);
            return g
        }

        function g(a) {
            return isNaN(a = +a) ? void 0 : e[bg.bisect(h, a)]
        }
        var h;
        return g.domain = function(e) {
            return arguments.length ? (d = e.map(b).filter(c).sort(a), f()) : d
        }, g.range = function(a) {
            return arguments.length ? (e = a, f()) : e
        }, g.quantiles = function() {
            return h
        }, g.invertExtent = function(a) {
            return a = e.indexOf(a), 0 > a ? [NaN, NaN] : [a > 0 ? h[a - 1] : d[0], a < h.length ? h[a] : d[d.length - 1]]
        }, g.copy = function() {
            return af(d, e)
        }, f()
    }

    function bf(a, b, c) {
        function d(b) {
            return c[Math.max(0, Math.min(g, Math.floor(f * (b - a))))]
        }

        function e() {
            return f = c.length / (b - a), g = c.length - 1, d
        }
        var f, g;
        return d.domain = function(c) {
            return arguments.length ? (a = +c[0], b = +c[c.length - 1], e()) : [a, b]
        }, d.range = function(a) {
            return arguments.length ? (c = a, e()) : c
        }, d.invertExtent = function(b) {
            return b = c.indexOf(b), b = 0 > b ? NaN : b / f + a, [b, b + 1 / f]
        }, d.copy = function() {
            return bf(a, b, c)
        }, e()
    }

    function cf(a, b) {
        function c(c) {
            return c >= c ? b[bg.bisect(a, c)] : void 0
        }
        return c.domain = function(b) {
            return arguments.length ? (a = b, c) : a
        }, c.range = function(a) {
            return arguments.length ? (b = a, c) : b
        }, c.invertExtent = function(c) {
            return c = b.indexOf(c), [a[c - 1], a[c]]
        }, c.copy = function() {
            return cf(a, b)
        }, c
    }

    function df(a) {
        function b(a) {
            return +a
        }
        return b.invert = b, b.domain = b.range = function(c) {
            return arguments.length ? (a = c.map(b), b) : a
        }, b.ticks = function(b) {
            return Ue(a, b)
        }, b.tickFormat = function(b, c) {
            return Ve(a, b, c)
        }, b.copy = function() {
            return df(a)
        }, b
    }

    function ef() {
        return 0
    }

    function ff(a) {
        return a.innerRadius
    }

    function gf(a) {
        return a.outerRadius
    }

    function hf(a) {
        return a.startAngle
    }

    function jf(a) {
        return a.endAngle
    }

    function kf(a) {
        return a && a.padAngle
    }

    function lf(a, b, c, d) {
        return (a - c) * b - (b - d) * a > 0 ? 0 : 1
    }

    function mf(a, b, c, d, e) {
        var f = a[0] - b[0],
            g = a[1] - b[1],
            h = (e ? d : -d) / Math.sqrt(f * f + g * g),
            i = h * g,
            j = -h * f,
            k = a[0] + i,
            l = a[1] + j,
            m = b[0] + i,
            n = b[1] + j,
            o = (k + m) / 2,
            p = (l + n) / 2,
            q = m - k,
            r = n - l,
            s = q * q + r * r,
            t = c - d,
            u = k * n - m * l,
            v = (0 > r ? -1 : 1) * Math.sqrt(t * t * s - u * u),
            w = (u * r - q * v) / s,
            x = (-u * q - r * v) / s,
            y = (u * r + q * v) / s,
            z = (-u * q + r * v) / s,
            A = w - o,
            B = x - p,
            C = y - o,
            D = z - p;
        return A * A + B * B > C * C + D * D && (w = y, x = z), [
            [w - i, x - j],
            [w * c / t, x * c / t]
        ]
    }

    function nf(a) {
        function b(b) {
            function g() {
                j.push("M", f(a(k), h))
            }
            for (var i, j = [], k = [], l = -1, m = b.length, n = za(c), o = za(d); ++l < m;) e.call(this, i = b[l], l) ? k.push([+n.call(this, i, l), +o.call(this, i, l)]) : k.length && (g(), k = []);
            return k.length && g(), j.length ? j.join("") : null
        }
        var c = Bc,
            d = Cc,
            e = Cb,
            f = of ,
            g = f.key,
            h = .7;
        return b.x = function(a) {
            return arguments.length ? (c = a, b) : c
        }, b.y = function(a) {
            return arguments.length ? (d = a, b) : d
        }, b.defined = function(a) {
            return arguments.length ? (e = a, b) : e
        }, b.interpolate = function(a) {
            return arguments.length ? (g = "function" == typeof a ? f = a : (f = Ei.get(a) || of ).key, b) : g
        }, b.tension = function(a) {
            return arguments.length ? (h = a, b) : h
        }, b
    }

    function of (a) {
        return a.join("L")
    }

    function pf(a) {
        return of(a) + "Z"
    }

    function qf(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("H", (d[0] + (d = a[b])[0]) / 2, "V", d[1]);
        return c > 1 && e.push("H", d[0]), e.join("")
    }

    function rf(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("V", (d = a[b])[1], "H", d[0]);
        return e.join("")
    }

    function sf(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("H", (d = a[b])[0], "V", d[1]);
        return e.join("")
    }

    function tf(a, b) {
        return a.length < 4 ? of (a) : a[1] + wf(a.slice(1, -1), xf(a, b))
    }

    function uf(a, b) {
        return a.length < 3 ? of (a) : a[0] + wf((a.push(a[0]), a), xf([a[a.length - 2]].concat(a, [a[1]]), b))
    }

    function vf(a, b) {
        return a.length < 3 ? of (a) : a[0] + wf(a, xf(a, b))
    }

    function wf(a, b) {
        if (b.length < 1 || a.length != b.length && a.length != b.length + 2) return of(a);
        var c = a.length != b.length,
            d = "",
            e = a[0],
            f = a[1],
            g = b[0],
            h = g,
            i = 1;
        if (c && (d += "Q" + (f[0] - 2 * g[0] / 3) + "," + (f[1] - 2 * g[1] / 3) + "," + f[0] + "," + f[1], e = a[1], i = 2), b.length > 1) {
            h = b[1], f = a[i], i++, d += "C" + (e[0] + g[0]) + "," + (e[1] + g[1]) + "," + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1];
            for (var j = 2; j < b.length; j++, i++) f = a[i], h = b[j], d += "S" + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1]
        }
        if (c) {
            var k = a[i];
            d += "Q" + (f[0] + 2 * h[0] / 3) + "," + (f[1] + 2 * h[1] / 3) + "," + k[0] + "," + k[1]
        }
        return d
    }

    function xf(a, b) {
        for (var c, d = [], e = (1 - b) / 2, f = a[0], g = a[1], h = 1, i = a.length; ++h < i;) c = f, f = g, g = a[h], d.push([e * (g[0] - c[0]), e * (g[1] - c[1])]);
        return d
    }

    function yf(a) {
        if (a.length < 3) return of(a);
        var b = 1,
            c = a.length,
            d = a[0],
            e = d[0],
            f = d[1],
            g = [e, e, e, (d = a[1])[0]],
            h = [f, f, f, d[1]],
            i = [e, ",", f, "L", Cf(Hi, g), ",", Cf(Hi, h)];
        for (a.push(a[c - 1]); ++b <= c;) d = a[b], g.shift(), g.push(d[0]), h.shift(), h.push(d[1]), Df(i, g, h);
        return a.pop(), i.push("L", d), i.join("")
    }

    function zf(a) {
        if (a.length < 4) return of(a);
        for (var b, c = [], d = -1, e = a.length, f = [0], g = [0]; ++d < 3;) b = a[d], f.push(b[0]), g.push(b[1]);
        for (c.push(Cf(Hi, f) + "," + Cf(Hi, g)), --d; ++d < e;) b = a[d], f.shift(), f.push(b[0]), g.shift(), g.push(b[1]), Df(c, f, g);
        return c.join("")
    }

    function Af(a) {
        for (var b, c, d = -1, e = a.length, f = e + 4, g = [], h = []; ++d < 4;) c = a[d % e], g.push(c[0]), h.push(c[1]);
        for (b = [Cf(Hi, g), ",", Cf(Hi, h)], --d; ++d < f;) c = a[d % e], g.shift(), g.push(c[0]), h.shift(), h.push(c[1]), Df(b, g, h);
        return b.join("")
    }

    function Bf(a, b) {
        var c = a.length - 1;
        if (c)
            for (var d, e, f = a[0][0], g = a[0][1], h = a[c][0] - f, i = a[c][1] - g, j = -1; ++j <= c;) d = a[j], e = j / c, d[0] = b * d[0] + (1 - b) * (f + e * h), d[1] = b * d[1] + (1 - b) * (g + e * i);
        return yf(a)
    }

    function Cf(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
    }

    function Df(a, b, c) {
        a.push("C", Cf(Fi, b), ",", Cf(Fi, c), ",", Cf(Gi, b), ",", Cf(Gi, c), ",", Cf(Hi, b), ",", Cf(Hi, c))
    }

    function Ef(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0])
    }

    function Ff(a) {
        for (var b = 0, c = a.length - 1, d = [], e = a[0], f = a[1], g = d[0] = Ef(e, f); ++b < c;) d[b] = (g + (g = Ef(e = f, f = a[b + 1]))) / 2;
        return d[b] = g, d
    }

    function Gf(a) {
        for (var b, c, d, e, f = [], g = Ff(a), h = -1, i = a.length - 1; ++h < i;) b = Ef(a[h], a[h + 1]), pg(b) < Hg ? g[h] = g[h + 1] = 0 : (c = g[h] / b, d = g[h + 1] / b, e = c * c + d * d, e > 9 && (e = 3 * b / Math.sqrt(e), g[h] = e * c, g[h + 1] = e * d));
        for (h = -1; ++h <= i;) e = (a[Math.min(i, h + 1)][0] - a[Math.max(0, h - 1)][0]) / (6 * (1 + g[h] * g[h])), f.push([e || 0, g[h] * e || 0]);
        return f
    }

    function Hf(a) {
        return a.length < 3 ? of (a) : a[0] + wf(a, Gf(a))
    }

    function If(a) {
        for (var b, c, d, e = -1, f = a.length; ++e < f;) b = a[e], c = b[0], d = b[1] - Mg, b[0] = c * Math.cos(d), b[1] = c * Math.sin(d);
        return a
    }

    function Jf(a) {
        function b(b) {
            function i() {
                p.push("M", h(a(r), l), k, j(a(q.reverse()), l), "Z")
            }
            for (var m, n, o, p = [], q = [], r = [], s = -1, t = b.length, u = za(c), v = za(e), w = c === d ? function() {
                    return n
                } : za(d), x = e === f ? function() {
                    return o
                } : za(f); ++s < t;) g.call(this, m = b[s], s) ? (q.push([n = +u.call(this, m, s), o = +v.call(this, m, s)]), r.push([+w.call(this, m, s), +x.call(this, m, s)])) : q.length && (i(), q = [], r = []);
            return q.length && i(), p.length ? p.join("") : null
        }
        var c = Bc,
            d = Bc,
            e = 0,
            f = Cc,
            g = Cb,
            h = of ,
            i = h.key,
            j = h,
            k = "L",
            l = .7;
        return b.x = function(a) {
            return arguments.length ? (c = d = a, b) : d
        }, b.x0 = function(a) {
            return arguments.length ? (c = a, b) : c
        }, b.x1 = function(a) {
            return arguments.length ? (d = a, b) : d
        }, b.y = function(a) {
            return arguments.length ? (e = f = a, b) : f
        }, b.y0 = function(a) {
            return arguments.length ? (e = a, b) : e
        }, b.y1 = function(a) {
            return arguments.length ? (f = a, b) : f
        }, b.defined = function(a) {
            return arguments.length ? (g = a, b) : g
        }, b.interpolate = function(a) {
            return arguments.length ? (i = "function" == typeof a ? h = a : (h = Ei.get(a) || of ).key,
                j = h.reverse || h, k = h.closed ? "M" : "L", b) : i
        }, b.tension = function(a) {
            return arguments.length ? (l = a, b) : l
        }, b
    }

    function Kf(a) {
        return a.radius
    }

    function Lf(a) {
        return [a.x, a.y]
    }

    function Mf(a) {
        return function() {
            var b = a.apply(this, arguments),
                c = b[0],
                d = b[1] - Mg;
            return [c * Math.cos(d), c * Math.sin(d)]
        }
    }

    function Nf() {
        return 64
    }

    function Of() {
        return "circle"
    }

    function Pf(a) {
        var b = Math.sqrt(a / Jg);
        return "M0," + b + "A" + b + "," + b + " 0 1,1 0," + -b + "A" + b + "," + b + " 0 1,1 0," + b + "Z"
    }

    function Qf(a) {
        return function() {
            var b, c;
            (b = this[a]) && (c = b[b.active]) && (--b.count ? (delete b[b.active], b.active += .5) : delete this[a], c.event && c.event.interrupt.call(this, this.__data__, c.index))
        }
    }

    function Rf(a, b, c) {
        return ug(a, Oi), a.namespace = b, a.id = c, a
    }

    function Sf(a, b, c, d) {
        var e = a.id,
            f = a.namespace;
        return O(a, "function" == typeof c ? function(a, g, h) {
            a[f][e].tween.set(b, d(c.call(a, a.__data__, g, h)))
        } : (c = d(c), function(a) {
            a[f][e].tween.set(b, c)
        }))
    }

    function Tf(a) {
        return null == a && (a = ""),
            function() {
                this.textContent = a
            }
    }

    function Uf(a) {
        return null == a ? "__transition__" : "__transition_" + a + "__"
    }

    function Vf(a, b, c, d, e) {
        var f = a[c] || (a[c] = {
                active: 0,
                count: 0
            }),
            g = f[d];
        if (!g) {
            var i = e.time;
            g = f[d] = {
                tween: new h,
                time: i,
                delay: e.delay,
                duration: e.duration,
                ease: e.ease,
                index: b
            }, e = null, ++f.count, bg.timer(function(e) {
                function h(c) {
                    if (f.active > d) return k();
                    var e = f[f.active];
                    e && (--f.count, delete f[f.active], e.event && e.event.interrupt.call(a, a.__data__, e.index)), f.active = d, g.event && g.event.start.call(a, a.__data__, b), g.tween.forEach(function(c, d) {
                        (d = d.call(a, a.__data__, b)) && p.push(d)
                    }), m = g.ease, l = g.duration, bg.timer(function() {
                        return o.c = j(c || 1) ? Cb : j, 1
                    }, 0, i)
                }

                function j(c) {
                    if (f.active !== d) return 1;
                    for (var e = c / l, h = m(e), i = p.length; i > 0;) p[--i].call(a, h);
                    return e >= 1 ? (g.event && g.event.end.call(a, a.__data__, b), k()) : void 0
                }

                function k() {
                    return --f.count ? delete f[d] : delete a[c], 1
                }
                var l, m, n = g.delay,
                    o = gh,
                    p = [];
                return o.t = n + i, e >= n ? h(e - n) : void(o.c = h)
            }, 0, i)
        }
    }

    function Wf(a, b, c) {
        a.attr("transform", function(a) {
            var d = b(a);
            return "translate(" + (isFinite(d) ? d : c(a)) + ",0)"
        })
    }

    function Xf(a, b, c) {
        a.attr("transform", function(a) {
            var d = b(a);
            return "translate(0," + (isFinite(d) ? d : c(a)) + ")"
        })
    }

    function Yf(a) {
        return a.toISOString()
    }

    function Zf(a, b, c) {
        function d(b) {
            return a(b)
        }

        function e(a, c) {
            var d = a[1] - a[0],
                e = d / c,
                f = bg.bisect(Xi, e);
            return f == Xi.length ? [b.year, Te(a.map(function(a) {
                return a / 31536e6
            }), c)[2]] : f ? b[e / Xi[f - 1] < Xi[f] / e ? f - 1 : f] : [$i, Te(a, c)[2]]
        }
        return d.invert = function(b) {
            return $f(a.invert(b))
        }, d.domain = function(b) {
            return arguments.length ? (a.domain(b), d) : a.domain().map($f)
        }, d.nice = function(a, b) {
            function c(c) {
                return !isNaN(c) && !a.range(c, $f(+c + 1), b).length
            }
            var f = d.domain(),
                g = Ke(f),
                h = null == a ? e(g, 10) : "number" == typeof a && e(g, a);
            return h && (a = h[0], b = h[1]), d.domain(Ne(f, b > 1 ? {
                floor: function(b) {
                    for (; c(b = a.floor(b));) b = $f(b - 1);
                    return b
                },
                ceil: function(b) {
                    for (; c(b = a.ceil(b));) b = $f(+b + 1);
                    return b
                }
            } : a))
        }, d.ticks = function(a, b) {
            var c = Ke(d.domain()),
                f = null == a ? e(c, 10) : "number" == typeof a ? e(c, a) : !a.range && [{
                    range: a
                }, b];
            return f && (a = f[0], b = f[1]), a.range(c[0], $f(+c[1] + 1), 1 > b ? 1 : b)
        }, d.tickFormat = function() {
            return c
        }, d.copy = function() {
            return Zf(a.copy(), b, c)
        }, Re(d, a)
    }

    function $f(a) {
        return new Date(a)
    }

    function _f(a) {
        return JSON.parse(a.responseText)
    }

    function ag(a) {
        var b = eg.createRange();
        return b.selectNode(eg.body), b.createContextualFragment(a.responseText)
    }
    var bg = {
        version: "3.5.2"
    };
    Date.now || (Date.now = function() {
        return +new Date
    });
    var cg = [].slice,
        dg = function(a) {
            return cg.call(a)
        },
        eg = document,
        fg = eg.documentElement,
        gg = window;
    try {
        dg(fg.childNodes)[0].nodeType
    } catch (hg) {
        dg = function(a) {
            for (var b = a.length, c = new Array(b); b--;) c[b] = a[b];
            return c
        }
    }
    try {
        eg.createElement("div").style.setProperty("opacity", 0, "")
    } catch (ig) {
        var jg = gg.Element.prototype,
            kg = jg.setAttribute,
            lg = jg.setAttributeNS,
            mg = gg.CSSStyleDeclaration.prototype,
            ng = mg.setProperty;
        jg.setAttribute = function(a, b) {
            kg.call(this, a, b + "")
        }, jg.setAttributeNS = function(a, b, c) {
            lg.call(this, a, b, c + "")
        }, mg.setProperty = function(a, b, c) {
            ng.call(this, a, b + "", c)
        }
    }
    bg.ascending = a, bg.descending = function(a, b) {
        return a > b ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    }, bg.min = function(a, b) {
        var c, d, e = -1,
            f = a.length;
        if (1 === arguments.length) {
            for (; ++e < f;)
                if (null != (d = a[e]) && d >= d) {
                    c = d;
                    break
                }
            for (; ++e < f;) null != (d = a[e]) && c > d && (c = d)
        } else {
            for (; ++e < f;)
                if (null != (d = b.call(a, a[e], e)) && d >= d) {
                    c = d;
                    break
                }
            for (; ++e < f;) null != (d = b.call(a, a[e], e)) && c > d && (c = d)
        }
        return c
    }, bg.max = function(a, b) {
        var c, d, e = -1,
            f = a.length;
        if (1 === arguments.length) {
            for (; ++e < f;)
                if (null != (d = a[e]) && d >= d) {
                    c = d;
                    break
                }
            for (; ++e < f;) null != (d = a[e]) && d > c && (c = d)
        } else {
            for (; ++e < f;)
                if (null != (d = b.call(a, a[e], e)) && d >= d) {
                    c = d;
                    break
                }
            for (; ++e < f;) null != (d = b.call(a, a[e], e)) && d > c && (c = d)
        }
        return c
    }, bg.extent = function(a, b) {
        var c, d, e, f = -1,
            g = a.length;
        if (1 === arguments.length) {
            for (; ++f < g;)
                if (null != (d = a[f]) && d >= d) {
                    c = e = d;
                    break
                }
            for (; ++f < g;) null != (d = a[f]) && (c > d && (c = d), d > e && (e = d))
        } else {
            for (; ++f < g;)
                if (null != (d = b.call(a, a[f], f)) && d >= d) {
                    c = e = d;
                    break
                }
            for (; ++f < g;) null != (d = b.call(a, a[f], f)) && (c > d && (c = d), d > e && (e = d))
        }
        return [c, e]
    }, bg.sum = function(a, b) {
        var d, e = 0,
            f = a.length,
            g = -1;
        if (1 === arguments.length)
            for (; ++g < f;) c(d = +a[g]) && (e += d);
        else
            for (; ++g < f;) c(d = +b.call(a, a[g], g)) && (e += d);
        return e
    }, bg.mean = function(a, d) {
        var e, f = 0,
            g = a.length,
            h = -1,
            i = g;
        if (1 === arguments.length)
            for (; ++h < g;) c(e = b(a[h])) ? f += e : --i;
        else
            for (; ++h < g;) c(e = b(d.call(a, a[h], h))) ? f += e : --i;
        return i ? f / i : void 0
    }, bg.quantile = function(a, b) {
        var c = (a.length - 1) * b + 1,
            d = Math.floor(c),
            e = +a[d - 1],
            f = c - d;
        return f ? e + f * (a[d] - e) : e
    }, bg.median = function(d, e) {
        var f, g = [],
            h = d.length,
            i = -1;
        if (1 === arguments.length)
            for (; ++i < h;) c(f = b(d[i])) && g.push(f);
        else
            for (; ++i < h;) c(f = b(e.call(d, d[i], i))) && g.push(f);
        return g.length ? bg.quantile(g.sort(a), .5) : void 0
    }, bg.variance = function(a, d) {
        var e, f, g = a.length,
            h = 0,
            i = 0,
            j = -1,
            k = 0;
        if (1 === arguments.length)
            for (; ++j < g;) c(e = b(a[j])) && (f = e - h, h += f / ++k, i += f * (e - h));
        else
            for (; ++j < g;) c(e = b(d.call(a, a[j], j))) && (f = e - h, h += f / ++k, i += f * (e - h));
        return k > 1 ? i / (k - 1) : void 0
    }, bg.deviation = function() {
        var a = bg.variance.apply(this, arguments);
        return a ? Math.sqrt(a) : a
    };
    var og = d(a);
    bg.bisectLeft = og.left, bg.bisect = bg.bisectRight = og.right, bg.bisector = function(b) {
        return d(1 === b.length ? function(c, d) {
            return a(b(c), d)
        } : b)
    }, bg.shuffle = function(a, b, c) {
        (f = arguments.length) < 3 && (c = a.length, 2 > f && (b = 0));
        for (var d, e, f = c - b; f;) e = 0 | Math.random() * f--, d = a[f + b], a[f + b] = a[e + b], a[e + b] = d;
        return a
    }, bg.permute = function(a, b) {
        for (var c = b.length, d = new Array(c); c--;) d[c] = a[b[c]];
        return d
    }, bg.pairs = function(a) {
        for (var b, c = 0, d = a.length - 1, e = a[0], f = new Array(0 > d ? 0 : d); d > c;) f[c] = [b = e, e = a[++c]];
        return f
    }, bg.zip = function() {
        if (!(d = arguments.length)) return [];
        for (var a = -1, b = bg.min(arguments, e), c = new Array(b); ++a < b;)
            for (var d, f = -1, g = c[a] = new Array(d); ++f < d;) g[f] = arguments[f][a];
        return c
    }, bg.transpose = function(a) {
        return bg.zip.apply(bg, a)
    }, bg.keys = function(a) {
        var b = [];
        for (var c in a) b.push(c);
        return b
    }, bg.values = function(a) {
        var b = [];
        for (var c in a) b.push(a[c]);
        return b
    }, bg.entries = function(a) {
        var b = [];
        for (var c in a) b.push({
            key: c,
            value: a[c]
        });
        return b
    }, bg.merge = function(a) {
        for (var b, c, d, e = a.length, f = -1, g = 0; ++f < e;) g += a[f].length;
        for (c = new Array(g); --e >= 0;)
            for (d = a[e], b = d.length; --b >= 0;) c[--g] = d[b];
        return c
    };
    var pg = Math.abs;
    bg.range = function(a, b, c) {
        if (arguments.length < 3 && (c = 1, arguments.length < 2 && (b = a, a = 0)), 1 / 0 === (b - a) / c) throw new Error("infinite range");
        var d, e = [],
            g = f(pg(c)),
            h = -1;
        if (a *= g, b *= g, c *= g, 0 > c)
            for (;
                (d = a + c * ++h) > b;) e.push(d / g);
        else
            for (;
                (d = a + c * ++h) < b;) e.push(d / g);
        return e
    }, bg.map = function(a, b) {
        var c = new h;
        if (a instanceof h) a.forEach(function(a, b) {
            c.set(a, b)
        });
        else if (Array.isArray(a)) {
            var d, e = -1,
                f = a.length;
            if (1 === arguments.length)
                for (; ++e < f;) c.set(e, a[e]);
            else
                for (; ++e < f;) c.set(b.call(a, d = a[e], e), d)
        } else
            for (var g in a) c.set(g, a[g]);
        return c
    };
    var qg = "__proto__",
        rg = "\x00";
    g(h, {
        has: k,
        get: function(a) {
            return this._[i(a)]
        },
        set: function(a, b) {
            return this._[i(a)] = b
        },
        remove: l,
        keys: m,
        values: function() {
            var a = [];
            for (var b in this._) a.push(this._[b]);
            return a
        },
        entries: function() {
            var a = [];
            for (var b in this._) a.push({
                key: j(b),
                value: this._[b]
            });
            return a
        },
        size: n,
        empty: o,
        forEach: function(a) {
            for (var b in this._) a.call(this, j(b), this._[b])
        }
    }), bg.nest = function() {
        function a(b, g, i) {
            if (i >= f.length) return d ? d.call(e, g) : c ? g.sort(c) : g;
            for (var j, k, l, m, n = -1, o = g.length, p = f[i++], q = new h; ++n < o;)(m = q.get(j = p(k = g[n]))) ? m.push(k) : q.set(j, [k]);
            return b ? (k = b(), l = function(c, d) {
                k.set(c, a(b, d, i))
            }) : (k = {}, l = function(c, d) {
                k[c] = a(b, d, i)
            }), q.forEach(l), k
        }

        function b(a, c) {
            if (c >= f.length) return a;
            var d = [],
                e = g[c++];
            return a.forEach(function(a, e) {
                d.push({
                    key: a,
                    values: b(e, c)
                })
            }), e ? d.sort(function(a, b) {
                return e(a.key, b.key)
            }) : d
        }
        var c, d, e = {},
            f = [],
            g = [];
        return e.map = function(b, c) {
            return a(c, b, 0)
        }, e.entries = function(c) {
            return b(a(bg.map, c, 0), 0)
        }, e.key = function(a) {
            return f.push(a), e
        }, e.sortKeys = function(a) {
            return g[f.length - 1] = a, e
        }, e.sortValues = function(a) {
            return c = a, e
        }, e.rollup = function(a) {
            return d = a, e
        }, e
    }, bg.set = function(a) {
        var b = new p;
        if (a)
            for (var c = 0, d = a.length; d > c; ++c) b.add(a[c]);
        return b
    }, g(p, {
        has: k,
        add: function(a) {
            return this._[i(a += "")] = !0, a
        },
        remove: l,
        values: m,
        size: n,
        empty: o,
        forEach: function(a) {
            for (var b in this._) a.call(this, j(b))
        }
    }), bg.behavior = {}, bg.rebind = function(a, b) {
        for (var c, d = 1, e = arguments.length; ++d < e;) a[c = arguments[d]] = q(a, b, b[c]);
        return a
    };
    var sg = ["webkit", "ms", "moz", "Moz", "o", "O"];
    bg.dispatch = function() {
        for (var a = new t, b = -1, c = arguments.length; ++b < c;) a[arguments[b]] = u(a);
        return a
    }, t.prototype.on = function(a, b) {
        var c = a.indexOf("."),
            d = "";
        if (c >= 0 && (d = a.slice(c + 1), a = a.slice(0, c)), a) return arguments.length < 2 ? this[a].on(d) : this[a].on(d, b);
        if (2 === arguments.length) {
            if (null == b)
                for (a in this) this.hasOwnProperty(a) && this[a].on(d, null);
            return this
        }
    }, bg.event = null, bg.requote = function(a) {
        return a.replace(tg, "\\$&")
    };
    var tg = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
        ug = {}.__proto__ ? function(a, b) {
            a.__proto__ = b
        } : function(a, b) {
            for (var c in b) a[c] = b[c]
        },
        vg = function(a, b) {
            return b.querySelector(a)
        },
        wg = function(a, b) {
            return b.querySelectorAll(a)
        },
        xg = fg.matches || fg[r(fg, "matchesSelector")],
        yg = function(a, b) {
            return xg.call(a, b)
        };
    "function" == typeof Sizzle && (vg = function(a, b) {
        return Sizzle(a, b)[0] || null
    }, wg = Sizzle, yg = Sizzle.matchesSelector), bg.selection = function() {
        return Cg
    };
    var zg = bg.selection.prototype = [];
    zg.select = function(a) {
        var b, c, d, e, f = [];
        a = z(a);
        for (var g = -1, h = this.length; ++g < h;) {
            f.push(b = []), b.parentNode = (d = this[g]).parentNode;
            for (var i = -1, j = d.length; ++i < j;)(e = d[i]) ? (b.push(c = a.call(e, e.__data__, i, g)), c && "__data__" in e && (c.__data__ = e.__data__)) : b.push(null)
        }
        return y(f)
    }, zg.selectAll = function(a) {
        var b, c, d = [];
        a = A(a);
        for (var e = -1, f = this.length; ++e < f;)
            for (var g = this[e], h = -1, i = g.length; ++h < i;)(c = g[h]) && (d.push(b = dg(a.call(c, c.__data__, h, e))), b.parentNode = c);
        return y(d)
    };
    var Ag = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    bg.ns = {
        prefix: Ag,
        qualify: function(a) {
            var b = a.indexOf(":"),
                c = a;
            return b >= 0 && (c = a.slice(0, b), a = a.slice(b + 1)), Ag.hasOwnProperty(c) ? {
                space: Ag[c],
                local: a
            } : a
        }
    }, zg.attr = function(a, b) {
        if (arguments.length < 2) {
            if ("string" == typeof a) {
                var c = this.node();
                return a = bg.ns.qualify(a), a.local ? c.getAttributeNS(a.space, a.local) : c.getAttribute(a)
            }
            for (b in a) this.each(B(b, a[b]));
            return this
        }
        return this.each(B(a, b))
    }, zg.classed = function(a, b) {
        if (arguments.length < 2) {
            if ("string" == typeof a) {
                var c = this.node(),
                    d = (a = E(a)).length,
                    e = -1;
                if (b = c.classList) {
                    for (; ++e < d;)
                        if (!b.contains(a[e])) return !1
                } else
                    for (b = c.getAttribute("class"); ++e < d;)
                        if (!D(a[e]).test(b)) return !1;
                return !0
            }
            for (b in a) this.each(F(b, a[b]));
            return this
        }
        return this.each(F(a, b))
    }, zg.style = function(a, b, c) {
        var d = arguments.length;
        if (3 > d) {
            if ("string" != typeof a) {
                2 > d && (b = "");
                for (c in a) this.each(H(c, a[c], b));
                return this
            }
            if (2 > d) return gg.getComputedStyle(this.node(), null).getPropertyValue(a);
            c = ""
        }
        return this.each(H(a, b, c))
    }, zg.property = function(a, b) {
        if (arguments.length < 2) {
            if ("string" == typeof a) return this.node()[a];
            for (b in a) this.each(I(b, a[b]));
            return this
        }
        return this.each(I(a, b))
    }, zg.text = function(a) {
        return arguments.length ? this.each("function" == typeof a ? function() {
            var b = a.apply(this, arguments);
            this.textContent = null == b ? "" : b
        } : null == a ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = a
        }) : this.node().textContent
    }, zg.html = function(a) {
        return arguments.length ? this.each("function" == typeof a ? function() {
            var b = a.apply(this, arguments);
            this.innerHTML = null == b ? "" : b
        } : null == a ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = a
        }) : this.node().innerHTML
    }, zg.append = function(a) {
        return a = J(a), this.select(function() {
            return this.appendChild(a.apply(this, arguments))
        })
    }, zg.insert = function(a, b) {
        return a = J(a), b = z(b), this.select(function() {
            return this.insertBefore(a.apply(this, arguments), b.apply(this, arguments) || null)
        })
    }, zg.remove = function() {
        return this.each(K)
    }, zg.data = function(a, b) {
        function c(a, c) {
            var d, e, f, g = a.length,
                l = c.length,
                m = Math.min(g, l),
                n = new Array(l),
                o = new Array(l),
                p = new Array(g);
            if (b) {
                var q, r = new h,
                    s = new Array(g);
                for (d = -1; ++d < g;) r.has(q = b.call(e = a[d], e.__data__, d)) ? p[d] = e : r.set(q, e), s[d] = q;
                for (d = -1; ++d < l;)(e = r.get(q = b.call(c, f = c[d], d))) ? e !== !0 && (n[d] = e, e.__data__ = f) : o[d] = L(f), r.set(q, !0);
                for (d = -1; ++d < g;) r.get(s[d]) !== !0 && (p[d] = a[d])
            } else {
                for (d = -1; ++d < m;) e = a[d], f = c[d], e ? (e.__data__ = f, n[d] = e) : o[d] = L(f);
                for (; l > d; ++d) o[d] = L(c[d]);
                for (; g > d; ++d) p[d] = a[d]
            }
            o.update = n, o.parentNode = n.parentNode = p.parentNode = a.parentNode, i.push(o), j.push(n), k.push(p)
        }
        var d, e, f = -1,
            g = this.length;
        if (!arguments.length) {
            for (a = new Array(g = (d = this[0]).length); ++f < g;)(e = d[f]) && (a[f] = e.__data__);
            return a
        }
        var i = P([]),
            j = y([]),
            k = y([]);
        if ("function" == typeof a)
            for (; ++f < g;) c(d = this[f], a.call(d, d.parentNode.__data__, f));
        else
            for (; ++f < g;) c(d = this[f], a);
        return j.enter = function() {
            return i
        }, j.exit = function() {
            return k
        }, j
    }, zg.datum = function(a) {
        return arguments.length ? this.property("__data__", a) : this.property("__data__")
    }, zg.filter = function(a) {
        var b, c, d, e = [];
        "function" != typeof a && (a = M(a));
        for (var f = 0, g = this.length; g > f; f++) {
            e.push(b = []), b.parentNode = (c = this[f]).parentNode;
            for (var h = 0, i = c.length; i > h; h++)(d = c[h]) && a.call(d, d.__data__, h, f) && b.push(d)
        }
        return y(e)
    }, zg.order = function() {
        for (var a = -1, b = this.length; ++a < b;)
            for (var c, d = this[a], e = d.length - 1, f = d[e]; --e >= 0;)(c = d[e]) && (f && f !== c.nextSibling && f.parentNode.insertBefore(c, f), f = c);
        return this
    }, zg.sort = function(a) {
        a = N.apply(this, arguments);
        for (var b = -1, c = this.length; ++b < c;) this[b].sort(a);
        return this.order()
    }, zg.each = function(a) {
        return O(this, function(b, c, d) {
            a.call(b, b.__data__, c, d)
        })
    }, zg.call = function(a) {
        var b = dg(arguments);
        return a.apply(b[0] = this, b), this
    }, zg.empty = function() {
        return !this.node()
    }, zg.node = function() {
        for (var a = 0, b = this.length; b > a; a++)
            for (var c = this[a], d = 0, e = c.length; e > d; d++) {
                var f = c[d];
                if (f) return f
            }
        return null
    }, zg.size = function() {
        var a = 0;
        return O(this, function() {
            ++a
        }), a
    };
    var Bg = [];
    bg.selection.enter = P, bg.selection.enter.prototype = Bg, Bg.append = zg.append, Bg.empty = zg.empty, Bg.node = zg.node, Bg.call = zg.call, Bg.size = zg.size, Bg.select = function(a) {
        for (var b, c, d, e, f, g = [], h = -1, i = this.length; ++h < i;) {
            d = (e = this[h]).update, g.push(b = []), b.parentNode = e.parentNode;
            for (var j = -1, k = e.length; ++j < k;)(f = e[j]) ? (b.push(d[j] = c = a.call(e.parentNode, f.__data__, j, h)), c.__data__ = f.__data__) : b.push(null)
        }
        return y(g)
    }, Bg.insert = function(a, b) {
        return arguments.length < 2 && (b = Q(this)), zg.insert.call(this, a, b)
    }, bg.select = function(a) {
        var b = ["string" == typeof a ? vg(a, eg) : a];
        return b.parentNode = fg, y([b])
    }, bg.selectAll = function(a) {
        var b = dg("string" == typeof a ? wg(a, eg) : a);
        return b.parentNode = fg, y([b])
    };
    var Cg = bg.select(fg);
    zg.on = function(a, b, c) {
        var d = arguments.length;
        if (3 > d) {
            if ("string" != typeof a) {
                2 > d && (b = !1);
                for (c in a) this.each(R(c, a[c], b));
                return this
            }
            if (2 > d) return (d = this.node()["__on" + a]) && d._;
            c = !1
        }
        return this.each(R(a, b, c))
    };
    var Dg = bg.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    Dg.forEach(function(a) {
        "on" + a in eg && Dg.remove(a)
    });
    var Eg = "onselectstart" in eg ? null : r(fg.style, "userSelect"),
        Fg = 0;
    bg.mouse = function(a) {
        return V(a, w())
    };
    var Gg = /WebKit/.test(gg.navigator.userAgent) ? -1 : 0;
    bg.touch = function(a, b, c) {
        if (arguments.length < 3 && (c = b, b = w().changedTouches), b)
            for (var d, e = 0, f = b.length; f > e; ++e)
                if ((d = b[e]).identifier === c) return V(a, d)
    }, bg.behavior.drag = function() {
        function a() {
            this.on("mousedown.drag", e).on("touchstart.drag", f)
        }

        function b(a, b, e, f, g) {
            return function() {
                function h() {
                    var a, c, d = b(m, p);
                    d && (a = d[0] - t[0], c = d[1] - t[1], o |= a | c, t = d, n({
                        type: "drag",
                        x: d[0] + j[0],
                        y: d[1] + j[1],
                        dx: a,
                        dy: c
                    }))
                }

                function i() {
                    b(m, p) && (r.on(f + q, null).on(g + q, null), s(o && bg.event.target === l), n({
                        type: "dragend"
                    }))
                }
                var j, k = this,
                    l = bg.event.target,
                    m = k.parentNode,
                    n = c.of(k, arguments),
                    o = 0,
                    p = a(),
                    q = ".drag" + (null == p ? "" : "-" + p),
                    r = bg.select(e()).on(f + q, h).on(g + q, i),
                    s = U(),
                    t = b(m, p);
                d ? (j = d.apply(k, arguments), j = [j.x - t[0], j.y - t[1]]) : j = [0, 0], n({
                    type: "dragstart"
                })
            }
        }
        var c = x(a, "drag", "dragstart", "dragend"),
            d = null,
            e = b(s, bg.mouse, Y, "mousemove", "mouseup"),
            f = b(W, bg.touch, X, "touchmove", "touchend");
        return a.origin = function(b) {
            return arguments.length ? (d = b, a) : d
        }, bg.rebind(a, c, "on")
    }, bg.touches = function(a, b) {
        return arguments.length < 2 && (b = w().touches), b ? dg(b).map(function(b) {
            var c = V(a, b);
            return c.identifier = b.identifier, c
        }) : []
    };
    var Hg = 1e-6,
        Ig = Hg * Hg,
        Jg = Math.PI,
        Kg = 2 * Jg,
        Lg = Kg - Hg,
        Mg = Jg / 2,
        Ng = Jg / 180,
        Og = 180 / Jg,
        Pg = Math.SQRT2,
        Qg = 2,
        Rg = 4;
    bg.interpolateZoom = function(a, b) {
        function c(a) {
            var b = a * s;
            if (r) {
                var c = ca(p),
                    g = f / (Qg * m) * (c * da(Pg * b + p) - ba(p));
                return [d + g * j, e + g * k, f * c / ca(Pg * b + p)]
            }
            return [d + a * j, e + a * k, f * Math.exp(Pg * b)]
        }
        var d = a[0],
            e = a[1],
            f = a[2],
            g = b[0],
            h = b[1],
            i = b[2],
            j = g - d,
            k = h - e,
            l = j * j + k * k,
            m = Math.sqrt(l),
            n = (i * i - f * f + Rg * l) / (2 * f * Qg * m),
            o = (i * i - f * f - Rg * l) / (2 * i * Qg * m),
            p = Math.log(Math.sqrt(n * n + 1) - n),
            q = Math.log(Math.sqrt(o * o + 1) - o),
            r = q - p,
            s = (r || Math.log(i / f)) / Pg;
        return c.duration = 1e3 * s, c
    }, bg.behavior.zoom = function() {
        function a(a) {
            a.on(E, k).on(Ug + ".zoom", m).on("dblclick.zoom", n).on(H, l)
        }

        function b(a) {
            return [(a[0] - z.x) / z.k, (a[1] - z.y) / z.k]
        }

        function c(a) {
            return [a[0] * z.k + z.x, a[1] * z.k + z.y]
        }

        function d(a) {
            z.k = Math.max(B[0], Math.min(B[1], a))
        }

        function e(a, b) {
            b = c(b), z.x += a[0] - b[0], z.y += a[1] - b[1]
        }

        function f(b, c, f, g) {
            b.__chart__ = {
                x: z.x,
                y: z.y,
                k: z.k
            }, d(Math.pow(2, g)), e(p = c, f), b = bg.select(b), C > 0 && (b = b.transition().duration(C)), b.call(a.event)
        }

        function g() {
            u && u.domain(t.range().map(function(a) {
                return (a - z.x) / z.k
            }).map(t.invert)), y && y.domain(w.range().map(function(a) {
                return (a - z.y) / z.k
            }).map(w.invert))
        }

        function h(a) {
            D++ || a({
                type: "zoomstart"
            })
        }

        function i(a) {
            g(), a({
                type: "zoom",
                scale: z.k,
                translate: [z.x, z.y]
            })
        }

        function j(a) {
            --D || a({
                type: "zoomend"
            }), p = null
        }

        function k() {
            function a() {
                k = 1, e(bg.mouse(d), m), i(g)
            }

            function c() {
                l.on(F, null).on(G, null), n(k && bg.event.target === f), j(g)
            }
            var d = this,
                f = bg.event.target,
                g = I.of(d, arguments),
                k = 0,
                l = bg.select(gg).on(F, a).on(G, c),
                m = b(bg.mouse(d)),
                n = U();
            Ni.call(d), h(g)
        }

        function l() {
            function a() {
                var a = bg.touches(o);
                return n = z.k, a.forEach(function(a) {
                    a.identifier in q && (q[a.identifier] = b(a))
                }), a
            }

            function c() {
                var b = bg.event.target;
                bg.select(b).on(u, g).on(w, m), x.push(b);
                for (var c = bg.event.changedTouches, d = 0, e = c.length; e > d; ++d) q[c[d].identifier] = null;
                var h = a(),
                    i = Date.now();
                if (1 === h.length) {
                    if (500 > i - s) {
                        var j = h[0];
                        f(o, j, q[j.identifier], Math.floor(Math.log(z.k) / Math.LN2) + 1), v()
                    }
                    s = i
                } else if (h.length > 1) {
                    var j = h[0],
                        k = h[1],
                        l = j[0] - k[0],
                        n = j[1] - k[1];
                    r = l * l + n * n
                }
            }

            function g() {
                var a, b, c, f, g = bg.touches(o);
                Ni.call(o);
                for (var h = 0, j = g.length; j > h; ++h, f = null)
                    if (c = g[h], f = q[c.identifier]) {
                        if (b) break;
                        a = c, b = f
                    }
                if (f) {
                    var k = (k = c[0] - a[0]) * k + (k = c[1] - a[1]) * k,
                        l = r && Math.sqrt(k / r);
                    a = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2], b = [(b[0] + f[0]) / 2, (b[1] + f[1]) / 2], d(l * n)
                }
                s = null, e(a, b), i(p)
            }

            function m() {
                if (bg.event.touches.length) {
                    for (var b = bg.event.changedTouches, c = 0, d = b.length; d > c; ++c) delete q[b[c].identifier];
                    for (var e in q) return void a()
                }
                bg.selectAll(x).on(t, null), y.on(E, k).on(H, l), A(), j(p)
            }
            var n, o = this,
                p = I.of(o, arguments),
                q = {},
                r = 0,
                t = ".zoom-" + bg.event.changedTouches[0].identifier,
                u = "touchmove" + t,
                w = "touchend" + t,
                x = [],
                y = bg.select(o),
                A = U();
            c(), h(p), y.on(E, null).on(H, c)
        }

        function m() {
            var a = I.of(this, arguments);
            r ? clearTimeout(r) : (o = b(p = q || bg.mouse(this)), Ni.call(this), h(a)), r = setTimeout(function() {
                r = null, j(a)
            }, 50), v(), d(Math.pow(2, .002 * Sg()) * z.k), e(p, o), i(a)
        }

        function n() {
            var a = bg.mouse(this),
                c = Math.log(z.k) / Math.LN2;
            f(this, a, b(a), bg.event.shiftKey ? Math.ceil(c) - 1 : Math.floor(c) + 1)
        }
        var o, p, q, r, s, t, u, w, y, z = {
                x: 0,
                y: 0,
                k: 1
            },
            A = [960, 500],
            B = Tg,
            C = 250,
            D = 0,
            E = "mousedown.zoom",
            F = "mousemove.zoom",
            G = "mouseup.zoom",
            H = "touchstart.zoom",
            I = x(a, "zoomstart", "zoom", "zoomend");
        return a.event = function(a) {
            a.each(function() {
                var a = I.of(this, arguments),
                    b = z;
                Li ? bg.select(this).transition().each("start.zoom", function() {
                    z = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, h(a)
                }).tween("zoom:zoom", function() {
                    var c = A[0],
                        d = A[1],
                        e = p ? p[0] : c / 2,
                        f = p ? p[1] : d / 2,
                        g = bg.interpolateZoom([(e - z.x) / z.k, (f - z.y) / z.k, c / z.k], [(e - b.x) / b.k, (f - b.y) / b.k, c / b.k]);
                    return function(b) {
                        var d = g(b),
                            h = c / d[2];
                        this.__chart__ = z = {
                            x: e - d[0] * h,
                            y: f - d[1] * h,
                            k: h
                        }, i(a)
                    }
                }).each("interrupt.zoom", function() {
                    j(a)
                }).each("end.zoom", function() {
                    j(a)
                }) : (this.__chart__ = z, h(a), i(a), j(a))
            })
        }, a.translate = function(b) {
            return arguments.length ? (z = {
                x: +b[0],
                y: +b[1],
                k: z.k
            }, g(), a) : [z.x, z.y]
        }, a.scale = function(b) {
            return arguments.length ? (z = {
                x: z.x,
                y: z.y,
                k: +b
            }, g(), a) : z.k
        }, a.scaleExtent = function(b) {
            return arguments.length ? (B = null == b ? Tg : [+b[0], +b[1]], a) : B
        }, a.center = function(b) {
            return arguments.length ? (q = b && [+b[0], +b[1]], a) : q
        }, a.size = function(b) {
            return arguments.length ? (A = b && [+b[0], +b[1]], a) : A
        }, a.duration = function(b) {
            return arguments.length ? (C = +b, a) : C
        }, a.x = function(b) {
            return arguments.length ? (u = b, t = b.copy(), z = {
                x: 0,
                y: 0,
                k: 1
            }, a) : u
        }, a.y = function(b) {
            return arguments.length ? (y = b, w = b.copy(), z = {
                x: 0,
                y: 0,
                k: 1
            }, a) : y
        }, bg.rebind(a, I, "on")
    };
    var Sg, Tg = [0, 1 / 0],
        Ug = "onwheel" in eg ? (Sg = function() {
            return -bg.event.deltaY * (bg.event.deltaMode ? 120 : 1)
        }, "wheel") : "onmousewheel" in eg ? (Sg = function() {
            return bg.event.wheelDelta
        }, "mousewheel") : (Sg = function() {
            return -bg.event.detail
        }, "MozMousePixelScroll");
    bg.color = fa, fa.prototype.toString = function() {
        return this.rgb() + ""
    }, bg.hsl = ga;
    var Vg = ga.prototype = new fa;
    Vg.brighter = function(a) {
        return a = Math.pow(.7, arguments.length ? a : 1), new ga(this.h, this.s, this.l / a)
    }, Vg.darker = function(a) {
        return a = Math.pow(.7, arguments.length ? a : 1), new ga(this.h, this.s, a * this.l)
    }, Vg.rgb = function() {
        return ha(this.h, this.s, this.l)
    }, bg.hcl = ia;
    var Wg = ia.prototype = new fa;
    Wg.brighter = function(a) {
        return new ia(this.h, this.c, Math.min(100, this.l + Xg * (arguments.length ? a : 1)))
    }, Wg.darker = function(a) {
        return new ia(this.h, this.c, Math.max(0, this.l - Xg * (arguments.length ? a : 1)))
    }, Wg.rgb = function() {
        return ja(this.h, this.c, this.l).rgb()
    }, bg.lab = ka;
    var Xg = 18,
        Yg = .95047,
        Zg = 1,
        $g = 1.08883,
        _g = ka.prototype = new fa;
    _g.brighter = function(a) {
        return new ka(Math.min(100, this.l + Xg * (arguments.length ? a : 1)), this.a, this.b)
    }, _g.darker = function(a) {
        return new ka(Math.max(0, this.l - Xg * (arguments.length ? a : 1)), this.a, this.b)
    }, _g.rgb = function() {
        return la(this.l, this.a, this.b)
    }, bg.rgb = qa;
    var ah = qa.prototype = new fa;
    ah.brighter = function(a) {
        a = Math.pow(.7, arguments.length ? a : 1);
        var b = this.r,
            c = this.g,
            d = this.b,
            e = 30;
        return b || c || d ? (b && e > b && (b = e), c && e > c && (c = e), d && e > d && (d = e), new qa(Math.min(255, b / a), Math.min(255, c / a), Math.min(255, d / a))) : new qa(e, e, e)
    }, ah.darker = function(a) {
        return a = Math.pow(.7, arguments.length ? a : 1), new qa(a * this.r, a * this.g, a * this.b)
    }, ah.hsl = function() {
        return va(this.r, this.g, this.b)
    }, ah.toString = function() {
        return "#" + ta(this.r) + ta(this.g) + ta(this.b)
    };
    var bh = bg.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    bh.forEach(function(a, b) {
        bh.set(a, ra(b))
    }), bg.functor = za, bg.xhr = Ba(Aa), bg.dsv = function(a, b) {
        function c(a, c, f) {
            arguments.length < 3 && (f = c, c = null);
            var g = Ca(a, b, null == c ? d : e(c), f);
            return g.row = function(a) {
                return arguments.length ? g.response(null == (c = a) ? d : e(a)) : c
            }, g
        }

        function d(a) {
            return c.parse(a.responseText)
        }

        function e(a) {
            return function(b) {
                return c.parse(b.responseText, a)
            }
        }

        function f(b) {
            return b.map(g).join(a)
        }

        function g(a) {
            return h.test(a) ? '"' + a.replace(/\"/g, '""') + '"' : a
        }
        var h = new RegExp('["' + a + "\n]"),
            i = a.charCodeAt(0);
        return c.parse = function(a, b) {
            var d;
            return c.parseRows(a, function(a, c) {
                if (d) return d(a, c - 1);
                var e = new Function("d", "return {" + a.map(function(a, b) {
                    return JSON.stringify(a) + ": d[" + b + "]"
                }).join(",") + "}");
                d = b ? function(a, c) {
                    return b(e(a), c)
                } : e
            })
        }, c.parseRows = function(a, b) {
            function c() {
                if (k >= j) return g;
                if (e) return e = !1, f;
                var b = k;
                if (34 === a.charCodeAt(b)) {
                    for (var c = b; c++ < j;)
                        if (34 === a.charCodeAt(c)) {
                            if (34 !== a.charCodeAt(c + 1)) break;
                            ++c
                        }
                    k = c + 2;
                    var d = a.charCodeAt(c + 1);
                    return 13 === d ? (e = !0, 10 === a.charCodeAt(c + 2) && ++k) : 10 === d && (e = !0), a.slice(b + 1, c).replace(/""/g, '"')
                }
                for (; j > k;) {
                    var d = a.charCodeAt(k++),
                        h = 1;
                    if (10 === d) e = !0;
                    else if (13 === d) e = !0, 10 === a.charCodeAt(k) && (++k, ++h);
                    else if (d !== i) continue;
                    return a.slice(b, k - h)
                }
                return a.slice(b)
            }
            for (var d, e, f = {}, g = {}, h = [], j = a.length, k = 0, l = 0;
                (d = c()) !== g;) {
                for (var m = []; d !== f && d !== g;) m.push(d), d = c();
                b && null == (m = b(m, l++)) || h.push(m)
            }
            return h
        }, c.format = function(b) {
            if (Array.isArray(b[0])) return c.formatRows(b);
            var d = new p,
                e = [];
            return b.forEach(function(a) {
                for (var b in a) d.has(b) || e.push(d.add(b))
            }), [e.map(g).join(a)].concat(b.map(function(b) {
                return e.map(function(a) {
                    return g(b[a])
                }).join(a)
            })).join("\n")
        }, c.formatRows = function(a) {
            return a.map(f).join("\n")
        }, c
    }, bg.csv = bg.dsv(",", "text/csv"), bg.tsv = bg.dsv("	", "text/tab-separated-values");
    var ch, dh, eh, fh, gh, hh = gg[r(gg, "requestAnimationFrame")] || function(a) {
        setTimeout(a, 17)
    };
    bg.timer = function(a, b, c) {
        var d = arguments.length;
        2 > d && (b = 0), 3 > d && (c = Date.now());
        var e = c + b,
            f = {
                c: a,
                t: e,
                f: !1,
                n: null
            };
        dh ? dh.n = f : ch = f, dh = f, eh || (fh = clearTimeout(fh), eh = 1, hh(Fa))
    }, bg.timer.flush = function() {
        Ga(), Ha()
    }, bg.round = function(a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
    };
    var ih = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Ja);
    bg.formatPrefix = function(a, b) {
        var c = 0;
        return a && (0 > a && (a *= -1), b && (a = bg.round(a, Ia(a, b))), c = 1 + Math.floor(1e-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, 3 * Math.floor((c - 1) / 3)))), ih[8 + c / 3]
    };
    var jh = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
        kh = bg.map({
            b: function(a) {
                return a.toString(2)
            },
            c: function(a) {
                return String.fromCharCode(a)
            },
            o: function(a) {
                return a.toString(8)
            },
            x: function(a) {
                return a.toString(16)
            },
            X: function(a) {
                return a.toString(16).toUpperCase()
            },
            g: function(a, b) {
                return a.toPrecision(b)
            },
            e: function(a, b) {
                return a.toExponential(b)
            },
            f: function(a, b) {
                return a.toFixed(b)
            },
            r: function(a, b) {
                return (a = bg.round(a, Ia(a, b))).toFixed(Math.max(0, Math.min(20, Ia(a * (1 + 1e-15), b))))
            }
        }),
        lh = bg.time = {},
        mh = Date;
    Ma.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            nh.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            nh.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            nh.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            nh.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            nh.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            nh.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            nh.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            nh.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            nh.setTime.apply(this._, arguments)
        }
    };
    var nh = Date.prototype;
    lh.year = Na(function(a) {
        return a = lh.day(a), a.setMonth(0, 1), a
    }, function(a, b) {
        a.setFullYear(a.getFullYear() + b)
    }, function(a) {
        return a.getFullYear()
    }), lh.years = lh.year.range, lh.years.utc = lh.year.utc.range, lh.day = Na(function(a) {
        var b = new mh(2e3, 0);
        return b.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), b
    }, function(a, b) {
        a.setDate(a.getDate() + b)
    }, function(a) {
        return a.getDate() - 1
    }), lh.days = lh.day.range, lh.days.utc = lh.day.utc.range, lh.dayOfYear = function(a) {
        var b = lh.year(a);
        return Math.floor((a - b - 6e4 * (a.getTimezoneOffset() - b.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(a, b) {
        b = 7 - b;
        var c = lh[a] = Na(function(a) {
            return (a = lh.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7), a
        }, function(a, b) {
            a.setDate(a.getDate() + 7 * Math.floor(b))
        }, function(a) {
            var c = lh.year(a).getDay();
            return Math.floor((lh.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
        });
        lh[a + "s"] = c.range, lh[a + "s"].utc = c.utc.range, lh[a + "OfYear"] = function(a) {
            var c = lh.year(a).getDay();
            return Math.floor((lh.dayOfYear(a) + (c + b) % 7) / 7)
        }
    }), lh.week = lh.sunday, lh.weeks = lh.sunday.range, lh.weeks.utc = lh.sunday.utc.range, lh.weekOfYear = lh.sundayOfYear;
    var oh = {
            "-": "",
            _: " ",
            0: "0"
        },
        ph = /^\s*\d+/,
        qh = /^%/;
    bg.locale = function(a) {
        return {
            numberFormat: Ka(a),
            timeFormat: Pa(a)
        }
    };
    var rh = bg.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    bg.format = rh.numberFormat, bg.geo = {}, ib.prototype = {
        s: 0,
        t: 0,
        add: function(a) {
            jb(a, this.t, sh), jb(sh.s, this.s, this), this.s ? this.t += sh.t : this.s = sh.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var sh = new ib;
    bg.geo.stream = function(a, b) {
        a && th.hasOwnProperty(a.type) ? th[a.type](a, b) : kb(a, b)
    };
    var th = {
            Feature: function(a, b) {
                kb(a.geometry, b)
            },
            FeatureCollection: function(a, b) {
                for (var c = a.features, d = -1, e = c.length; ++d < e;) kb(c[d].geometry, b)
            }
        },
        uh = {
            Sphere: function(a, b) {
                b.sphere()
            },
            Point: function(a, b) {
                a = a.coordinates, b.point(a[0], a[1], a[2])
            },
            MultiPoint: function(a, b) {
                for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) a = c[d],
                    b.point(a[0], a[1], a[2])
            },
            LineString: function(a, b) {
                lb(a.coordinates, b, 0)
            },
            MultiLineString: function(a, b) {
                for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) lb(c[d], b, 0)
            },
            Polygon: function(a, b) {
                mb(a.coordinates, b)
            },
            MultiPolygon: function(a, b) {
                for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) mb(c[d], b)
            },
            GeometryCollection: function(a, b) {
                for (var c = a.geometries, d = -1, e = c.length; ++d < e;) kb(c[d], b)
            }
        };
    bg.geo.area = function(a) {
        return vh = 0, bg.geo.stream(a, xh), vh
    };
    var vh, wh = new ib,
        xh = {
            sphere: function() {
                vh += 4 * Jg
            },
            point: s,
            lineStart: s,
            lineEnd: s,
            polygonStart: function() {
                wh.reset(), xh.lineStart = nb
            },
            polygonEnd: function() {
                var a = 2 * wh;
                vh += 0 > a ? 4 * Jg + a : a, xh.lineStart = xh.lineEnd = xh.point = s
            }
        };
    bg.geo.bounds = function() {
        function a(a, b) {
            t.push(u = [k = a, m = a]), l > b && (l = b), b > n && (n = b)
        }

        function b(b, c) {
            var d = ob([b * Ng, c * Ng]);
            if (r) {
                var e = qb(r, d),
                    f = [e[1], -e[0], 0],
                    g = qb(f, e);
                tb(g), g = ub(g);
                var i = b - o,
                    j = i > 0 ? 1 : -1,
                    p = g[0] * Og * j,
                    q = pg(i) > 180;
                if (q ^ (p > j * o && j * b > p)) {
                    var s = g[1] * Og;
                    s > n && (n = s)
                } else if (p = (p + 360) % 360 - 180, q ^ (p > j * o && j * b > p)) {
                    var s = -g[1] * Og;
                    l > s && (l = s)
                } else l > c && (l = c), c > n && (n = c);
                q ? o > b ? h(k, b) > h(k, m) && (m = b) : h(b, m) > h(k, m) && (k = b) : m >= k ? (k > b && (k = b), b > m && (m = b)) : b > o ? h(k, b) > h(k, m) && (m = b) : h(b, m) > h(k, m) && (k = b)
            } else a(b, c);
            r = d, o = b
        }

        function c() {
            v.point = b
        }

        function d() {
            u[0] = k, u[1] = m, v.point = a, r = null
        }

        function e(a, c) {
            if (r) {
                var d = a - o;
                s += pg(d) > 180 ? d + (d > 0 ? 360 : -360) : d
            } else p = a, q = c;
            xh.point(a, c), b(a, c)
        }

        function f() {
            xh.lineStart()
        }

        function g() {
            e(p, q), xh.lineEnd(), pg(s) > Hg && (k = -(m = 180)), u[0] = k, u[1] = m, r = null
        }

        function h(a, b) {
            return (b -= a) < 0 ? b + 360 : b
        }

        function i(a, b) {
            return a[0] - b[0]
        }

        function j(a, b) {
            return b[0] <= b[1] ? b[0] <= a && a <= b[1] : a < b[0] || b[1] < a
        }
        var k, l, m, n, o, p, q, r, s, t, u, v = {
            point: a,
            lineStart: c,
            lineEnd: d,
            polygonStart: function() {
                v.point = e, v.lineStart = f, v.lineEnd = g, s = 0, xh.polygonStart()
            },
            polygonEnd: function() {
                xh.polygonEnd(), v.point = a, v.lineStart = c, v.lineEnd = d, 0 > wh ? (k = -(m = 180), l = -(n = 90)) : s > Hg ? n = 90 : -Hg > s && (l = -90), u[0] = k, u[1] = m
            }
        };
        return function(a) {
            n = m = -(k = l = 1 / 0), t = [], bg.geo.stream(a, v);
            var b = t.length;
            if (b) {
                t.sort(i);
                for (var c, d = 1, e = t[0], f = [e]; b > d; ++d) c = t[d], j(c[0], e) || j(c[1], e) ? (h(e[0], c[1]) > h(e[0], e[1]) && (e[1] = c[1]), h(c[0], e[1]) > h(e[0], e[1]) && (e[0] = c[0])) : f.push(e = c);
                for (var g, c, o = -1 / 0, b = f.length - 1, d = 0, e = f[b]; b >= d; e = c, ++d) c = f[d], (g = h(e[1], c[0])) > o && (o = g, k = c[0], m = e[1])
            }
            return t = u = null, 1 / 0 === k || 1 / 0 === l ? [
                [NaN, NaN],
                [NaN, NaN]
            ] : [
                [k, l],
                [m, n]
            ]
        }
    }(), bg.geo.centroid = function(a) {
        yh = zh = Ah = Bh = Ch = Dh = Eh = Fh = Gh = Hh = Ih = 0, bg.geo.stream(a, Jh);
        var b = Gh,
            c = Hh,
            d = Ih,
            e = b * b + c * c + d * d;
        return Ig > e && (b = Dh, c = Eh, d = Fh, Hg > zh && (b = Ah, c = Bh, d = Ch), e = b * b + c * c + d * d, Ig > e) ? [NaN, NaN] : [Math.atan2(c, b) * Og, aa(d / Math.sqrt(e)) * Og]
    };
    var yh, zh, Ah, Bh, Ch, Dh, Eh, Fh, Gh, Hh, Ih, Jh = {
            sphere: s,
            point: wb,
            lineStart: yb,
            lineEnd: zb,
            polygonStart: function() {
                Jh.lineStart = Ab
            },
            polygonEnd: function() {
                Jh.lineStart = yb
            }
        },
        Kh = Gb(Cb, Kb, Mb, [-Jg, -Jg / 2]),
        Lh = 1e9;
    bg.geo.clipExtent = function() {
        var a, b, c, d, e, f, g = {
            stream: function(a) {
                return e && (e.valid = !1), e = f(a), e.valid = !0, e
            },
            extent: function(h) {
                return arguments.length ? (f = Qb(a = +h[0][0], b = +h[0][1], c = +h[1][0], d = +h[1][1]), e && (e.valid = !1, e = null), g) : [
                    [a, b],
                    [c, d]
                ]
            }
        };
        return g.extent([
            [0, 0],
            [960, 500]
        ])
    }, (bg.geo.conicEqualArea = function() {
        return Rb(Sb)
    }).raw = Sb, bg.geo.albers = function() {
        return bg.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, bg.geo.albersUsa = function() {
        function a(a) {
            var f = a[0],
                g = a[1];
            return b = null, c(f, g), b || (d(f, g), b) || e(f, g), b
        }
        var b, c, d, e, f = bg.geo.albers(),
            g = bg.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
            h = bg.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
            i = {
                point: function(a, c) {
                    b = [a, c]
                }
            };
        return a.invert = function(a) {
            var b = f.scale(),
                c = f.translate(),
                d = (a[0] - c[0]) / b,
                e = (a[1] - c[1]) / b;
            return (e >= .12 && .234 > e && d >= -.425 && -.214 > d ? g : e >= .166 && .234 > e && d >= -.214 && -.115 > d ? h : f).invert(a)
        }, a.stream = function(a) {
            var b = f.stream(a),
                c = g.stream(a),
                d = h.stream(a);
            return {
                point: function(a, e) {
                    b.point(a, e), c.point(a, e), d.point(a, e)
                },
                sphere: function() {
                    b.sphere(), c.sphere(), d.sphere()
                },
                lineStart: function() {
                    b.lineStart(), c.lineStart(), d.lineStart()
                },
                lineEnd: function() {
                    b.lineEnd(), c.lineEnd(), d.lineEnd()
                },
                polygonStart: function() {
                    b.polygonStart(), c.polygonStart(), d.polygonStart()
                },
                polygonEnd: function() {
                    b.polygonEnd(), c.polygonEnd(), d.polygonEnd()
                }
            }
        }, a.precision = function(b) {
            return arguments.length ? (f.precision(b), g.precision(b), h.precision(b), a) : f.precision()
        }, a.scale = function(b) {
            return arguments.length ? (f.scale(b), g.scale(.35 * b), h.scale(b), a.translate(f.translate())) : f.scale()
        }, a.translate = function(b) {
            if (!arguments.length) return f.translate();
            var j = f.scale(),
                k = +b[0],
                l = +b[1];
            return c = f.translate(b).clipExtent([
                [k - .455 * j, l - .238 * j],
                [k + .455 * j, l + .238 * j]
            ]).stream(i).point, d = g.translate([k - .307 * j, l + .201 * j]).clipExtent([
                [k - .425 * j + Hg, l + .12 * j + Hg],
                [k - .214 * j - Hg, l + .234 * j - Hg]
            ]).stream(i).point, e = h.translate([k - .205 * j, l + .212 * j]).clipExtent([
                [k - .214 * j + Hg, l + .166 * j + Hg],
                [k - .115 * j - Hg, l + .234 * j - Hg]
            ]).stream(i).point, a
        }, a.scale(1070)
    };
    var Mh, Nh, Oh, Ph, Qh, Rh, Sh = {
            point: s,
            lineStart: s,
            lineEnd: s,
            polygonStart: function() {
                Nh = 0, Sh.lineStart = Tb
            },
            polygonEnd: function() {
                Sh.lineStart = Sh.lineEnd = Sh.point = s, Mh += pg(Nh / 2)
            }
        },
        Th = {
            point: Ub,
            lineStart: s,
            lineEnd: s,
            polygonStart: s,
            polygonEnd: s
        },
        Uh = {
            point: Xb,
            lineStart: Yb,
            lineEnd: Zb,
            polygonStart: function() {
                Uh.lineStart = $b
            },
            polygonEnd: function() {
                Uh.point = Xb, Uh.lineStart = Yb, Uh.lineEnd = Zb
            }
        };
    bg.geo.path = function() {
        function a(a) {
            return a && ("function" == typeof h && f.pointRadius(+h.apply(this, arguments)), g && g.valid || (g = e(f)), bg.geo.stream(a, g)), f.result()
        }

        function b() {
            return g = null, a
        }
        var c, d, e, f, g, h = 4.5;
        return a.area = function(a) {
            return Mh = 0, bg.geo.stream(a, e(Sh)), Mh
        }, a.centroid = function(a) {
            return Ah = Bh = Ch = Dh = Eh = Fh = Gh = Hh = Ih = 0, bg.geo.stream(a, e(Uh)), Ih ? [Gh / Ih, Hh / Ih] : Fh ? [Dh / Fh, Eh / Fh] : Ch ? [Ah / Ch, Bh / Ch] : [NaN, NaN]
        }, a.bounds = function(a) {
            return Qh = Rh = -(Oh = Ph = 1 / 0), bg.geo.stream(a, e(Th)), [
                [Oh, Ph],
                [Qh, Rh]
            ]
        }, a.projection = function(a) {
            return arguments.length ? (e = (c = a) ? a.stream || bc(a) : Aa, b()) : c
        }, a.context = function(a) {
            return arguments.length ? (f = null == (d = a) ? new Vb : new _b(a), "function" != typeof h && f.pointRadius(h), b()) : d
        }, a.pointRadius = function(b) {
            return arguments.length ? (h = "function" == typeof b ? b : (f.pointRadius(+b), +b), a) : h
        }, a.projection(bg.geo.albersUsa()).context(null)
    }, bg.geo.transform = function(a) {
        return {
            stream: function(b) {
                var c = new cc(b);
                for (var d in a) c[d] = a[d];
                return c
            }
        }
    }, cc.prototype = {
        point: function(a, b) {
            this.stream.point(a, b)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    }, bg.geo.projection = ec, bg.geo.projectionMutator = fc, (bg.geo.equirectangular = function() {
        return ec(hc)
    }).raw = hc.invert = hc, bg.geo.rotation = function(a) {
        function b(b) {
            return b = a(b[0] * Ng, b[1] * Ng), b[0] *= Og, b[1] *= Og, b
        }
        return a = jc(a[0] % 360 * Ng, a[1] * Ng, a.length > 2 ? a[2] * Ng : 0), b.invert = function(b) {
            return b = a.invert(b[0] * Ng, b[1] * Ng), b[0] *= Og, b[1] *= Og, b
        }, b
    }, ic.invert = hc, bg.geo.circle = function() {
        function a() {
            var a = "function" == typeof d ? d.apply(this, arguments) : d,
                b = jc(-a[0] * Ng, -a[1] * Ng, 0).invert,
                e = [];
            return c(null, null, 1, {
                point: function(a, c) {
                    e.push(a = b(a, c)), a[0] *= Og, a[1] *= Og
                }
            }), {
                type: "Polygon",
                coordinates: [e]
            }
        }
        var b, c, d = [0, 0],
            e = 6;
        return a.origin = function(b) {
            return arguments.length ? (d = b, a) : d
        }, a.angle = function(d) {
            return arguments.length ? (c = nc((b = +d) * Ng, e * Ng), a) : b
        }, a.precision = function(d) {
            return arguments.length ? (c = nc(b * Ng, (e = +d) * Ng), a) : e
        }, a.angle(90)
    }, bg.geo.distance = function(a, b) {
        var c, d = (b[0] - a[0]) * Ng,
            e = a[1] * Ng,
            f = b[1] * Ng,
            g = Math.sin(d),
            h = Math.cos(d),
            i = Math.sin(e),
            j = Math.cos(e),
            k = Math.sin(f),
            l = Math.cos(f);
        return Math.atan2(Math.sqrt((c = l * g) * c + (c = j * k - i * l * h) * c), i * k + j * l * h)
    }, bg.geo.graticule = function() {
        function a() {
            return {
                type: "MultiLineString",
                coordinates: b()
            }
        }

        function b() {
            return bg.range(Math.ceil(f / q) * q, e, q).map(m).concat(bg.range(Math.ceil(j / r) * r, i, r).map(n)).concat(bg.range(Math.ceil(d / o) * o, c, o).filter(function(a) {
                return pg(a % q) > Hg
            }).map(k)).concat(bg.range(Math.ceil(h / p) * p, g, p).filter(function(a) {
                return pg(a % r) > Hg
            }).map(l))
        }
        var c, d, e, f, g, h, i, j, k, l, m, n, o = 10,
            p = o,
            q = 90,
            r = 360,
            s = 2.5;
        return a.lines = function() {
            return b().map(function(a) {
                return {
                    type: "LineString",
                    coordinates: a
                }
            })
        }, a.outline = function() {
            return {
                type: "Polygon",
                coordinates: [m(f).concat(n(i).slice(1), m(e).reverse().slice(1), n(j).reverse().slice(1))]
            }
        }, a.extent = function(b) {
            return arguments.length ? a.majorExtent(b).minorExtent(b) : a.minorExtent()
        }, a.majorExtent = function(b) {
            return arguments.length ? (f = +b[0][0], e = +b[1][0], j = +b[0][1], i = +b[1][1], f > e && (b = f, f = e, e = b), j > i && (b = j, j = i, i = b), a.precision(s)) : [
                [f, j],
                [e, i]
            ]
        }, a.minorExtent = function(b) {
            return arguments.length ? (d = +b[0][0], c = +b[1][0], h = +b[0][1], g = +b[1][1], d > c && (b = d, d = c, c = b), h > g && (b = h, h = g, g = b), a.precision(s)) : [
                [d, h],
                [c, g]
            ]
        }, a.step = function(b) {
            return arguments.length ? a.majorStep(b).minorStep(b) : a.minorStep()
        }, a.majorStep = function(b) {
            return arguments.length ? (q = +b[0], r = +b[1], a) : [q, r]
        }, a.minorStep = function(b) {
            return arguments.length ? (o = +b[0], p = +b[1], a) : [o, p]
        }, a.precision = function(b) {
            return arguments.length ? (s = +b, k = pc(h, g, 90), l = qc(d, c, s), m = pc(j, i, 90), n = qc(f, e, s), a) : s
        }, a.majorExtent([
            [-180, -90 + Hg],
            [180, 90 - Hg]
        ]).minorExtent([
            [-180, -80 - Hg],
            [180, 80 + Hg]
        ])
    }, bg.geo.greatArc = function() {
        function a() {
            return {
                type: "LineString",
                coordinates: [b || d.apply(this, arguments), c || e.apply(this, arguments)]
            }
        }
        var b, c, d = rc,
            e = sc;
        return a.distance = function() {
            return bg.geo.distance(b || d.apply(this, arguments), c || e.apply(this, arguments))
        }, a.source = function(c) {
            return arguments.length ? (d = c, b = "function" == typeof c ? null : c, a) : d
        }, a.target = function(b) {
            return arguments.length ? (e = b, c = "function" == typeof b ? null : b, a) : e
        }, a.precision = function() {
            return arguments.length ? a : 0
        }, a
    }, bg.geo.interpolate = function(a, b) {
        return tc(a[0] * Ng, a[1] * Ng, b[0] * Ng, b[1] * Ng)
    }, bg.geo.length = function(a) {
        return Vh = 0, bg.geo.stream(a, Wh), Vh
    };
    var Vh, Wh = {
            sphere: s,
            point: s,
            lineStart: uc,
            lineEnd: s,
            polygonStart: s,
            polygonEnd: s
        },
        Xh = vc(function(a) {
            return Math.sqrt(2 / (1 + a))
        }, function(a) {
            return 2 * Math.asin(a / 2)
        });
    (bg.geo.azimuthalEqualArea = function() {
        return ec(Xh)
    }).raw = Xh;
    var Yh = vc(function(a) {
        var b = Math.acos(a);
        return b && b / Math.sin(b)
    }, Aa);
    (bg.geo.azimuthalEquidistant = function() {
        return ec(Yh)
    }).raw = Yh, (bg.geo.conicConformal = function() {
        return Rb(wc)
    }).raw = wc, (bg.geo.conicEquidistant = function() {
        return Rb(xc)
    }).raw = xc;
    var Zh = vc(function(a) {
        return 1 / a
    }, Math.atan);
    (bg.geo.gnomonic = function() {
        return ec(Zh)
    }).raw = Zh, yc.invert = function(a, b) {
        return [a, 2 * Math.atan(Math.exp(b)) - Mg]
    }, (bg.geo.mercator = function() {
        return zc(yc)
    }).raw = yc;
    var $h = vc(function() {
        return 1
    }, Math.asin);
    (bg.geo.orthographic = function() {
        return ec($h)
    }).raw = $h;
    var _h = vc(function(a) {
        return 1 / (1 + a)
    }, function(a) {
        return 2 * Math.atan(a)
    });
    (bg.geo.stereographic = function() {
        return ec(_h)
    }).raw = _h, Ac.invert = function(a, b) {
        return [-b, 2 * Math.atan(Math.exp(a)) - Mg]
    }, (bg.geo.transverseMercator = function() {
        var a = zc(Ac),
            b = a.center,
            c = a.rotate;
        return a.center = function(a) {
            return a ? b([-a[1], a[0]]) : (a = b(), [a[1], -a[0]])
        }, a.rotate = function(a) {
            return a ? c([a[0], a[1], a.length > 2 ? a[2] + 90 : 90]) : (a = c(), [a[0], a[1], a[2] - 90])
        }, c([0, 0, 90])
    }).raw = Ac, bg.geom = {}, bg.geom.hull = function(a) {
        function b(a) {
            if (a.length < 3) return [];
            var b, e = za(c),
                f = za(d),
                g = a.length,
                h = [],
                i = [];
            for (b = 0; g > b; b++) h.push([+e.call(this, a[b], b), +f.call(this, a[b], b), b]);
            for (h.sort(Ec), b = 0; g > b; b++) i.push([h[b][0], -h[b][1]]);
            var j = Dc(h),
                k = Dc(i),
                l = k[0] === j[0],
                m = k[k.length - 1] === j[j.length - 1],
                n = [];
            for (b = j.length - 1; b >= 0; --b) n.push(a[h[j[b]][2]]);
            for (b = +l; b < k.length - m; ++b) n.push(a[h[k[b]][2]]);
            return n
        }
        var c = Bc,
            d = Cc;
        return arguments.length ? b(a) : (b.x = function(a) {
            return arguments.length ? (c = a, b) : c
        }, b.y = function(a) {
            return arguments.length ? (d = a, b) : d
        }, b)
    }, bg.geom.polygon = function(a) {
        return ug(a, ai), a
    };
    var ai = bg.geom.polygon.prototype = [];
    ai.area = function() {
        for (var a, b = -1, c = this.length, d = this[c - 1], e = 0; ++b < c;) a = d, d = this[b], e += a[1] * d[0] - a[0] * d[1];
        return .5 * e
    }, ai.centroid = function(a) {
        var b, c, d = -1,
            e = this.length,
            f = 0,
            g = 0,
            h = this[e - 1];
        for (arguments.length || (a = -1 / (6 * this.area())); ++d < e;) b = h, h = this[d], c = b[0] * h[1] - h[0] * b[1], f += (b[0] + h[0]) * c, g += (b[1] + h[1]) * c;
        return [f * a, g * a]
    }, ai.clip = function(a) {
        for (var b, c, d, e, f, g, h = Hc(a), i = -1, j = this.length - Hc(this), k = this[j - 1]; ++i < j;) {
            for (b = a.slice(), a.length = 0, e = this[i], f = b[(d = b.length - h) - 1], c = -1; ++c < d;) g = b[c], Fc(g, k, e) ? (Fc(f, k, e) || a.push(Gc(f, g, k, e)), a.push(g)) : Fc(f, k, e) && a.push(Gc(f, g, k, e)), f = g;
            h && a.push(a[0]), k = e
        }
        return a
    };
    var bi, ci, di, ei, fi, gi = [],
        hi = [];
    Pc.prototype.prepare = function() {
        for (var a, b = this.edges, c = b.length; c--;) a = b[c].edge, a.b && a.a || b.splice(c, 1);
        return b.sort(Rc), b.length
    }, _c.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, ad.prototype = {
        insert: function(a, b) {
            var c, d, e;
            if (a) {
                if (b.P = a, b.N = a.N, a.N && (a.N.P = b), a.N = b, a.R) {
                    for (a = a.R; a.L;) a = a.L;
                    a.L = b
                } else a.R = b;
                c = a
            } else this._ ? (a = ed(this._), b.P = null, b.N = a, a.P = a.L = b, c = a) : (b.P = b.N = null, this._ = b, c = null);
            for (b.L = b.R = null, b.U = c, b.C = !0, a = b; c && c.C;) d = c.U, c === d.L ? (e = d.R, e && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.R && (cd(this, c), a = c, c = a.U), c.C = !1, d.C = !0, dd(this, d))) : (e = d.L, e && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.L && (dd(this, c), a = c, c = a.U), c.C = !1, d.C = !0, cd(this, d))), c = a.U;
            this._.C = !1
        },
        remove: function(a) {
            a.N && (a.N.P = a.P), a.P && (a.P.N = a.N), a.N = a.P = null;
            var b, c, d, e = a.U,
                f = a.L,
                g = a.R;
            if (c = f ? g ? ed(g) : f : g, e ? e.L === a ? e.L = c : e.R = c : this._ = c, f && g ? (d = c.C, c.C = a.C, c.L = f, f.U = c, c !== g ? (e = c.U, c.U = a.U, a = c.R, e.L = a, c.R = g, g.U = c) : (c.U = e, e = c, a = c.R)) : (d = a.C, a = c), a && (a.U = e), !d) {
                if (a && a.C) return void(a.C = !1);
                do {
                    if (a === this._) break;
                    if (a === e.L) {
                        if (b = e.R, b.C && (b.C = !1, e.C = !0, cd(this, e), b = e.R), b.L && b.L.C || b.R && b.R.C) {
                            b.R && b.R.C || (b.L.C = !1, b.C = !0, dd(this, b), b = e.R), b.C = e.C, e.C = b.R.C = !1, cd(this, e), a = this._;
                            break
                        }
                    } else if (b = e.L, b.C && (b.C = !1, e.C = !0, dd(this, e), b = e.L), b.L && b.L.C || b.R && b.R.C) {
                        b.L && b.L.C || (b.R.C = !1, b.C = !0, cd(this, b), b = e.L), b.C = e.C, e.C = b.L.C = !1, dd(this, e), a = this._;
                        break
                    }
                    b.C = !0, a = e, e = e.U
                } while (!a.C);
                a && (a.C = !1)
            }
        }
    }, bg.geom.voronoi = function(a) {
        function b(a) {
            var b = new Array(a.length),
                d = h[0][0],
                e = h[0][1],
                f = h[1][0],
                g = h[1][1];
            return fd(c(a), h).cells.forEach(function(c, h) {
                var i = c.edges,
                    j = c.site,
                    k = b[h] = i.length ? i.map(function(a) {
                        var b = a.start();
                        return [b.x, b.y]
                    }) : j.x >= d && j.x <= f && j.y >= e && j.y <= g ? [
                        [d, g],
                        [f, g],
                        [f, e],
                        [d, e]
                    ] : [];
                k.point = a[h]
            }), b
        }

        function c(a) {
            return a.map(function(a, b) {
                return {
                    x: Math.round(f(a, b) / Hg) * Hg,
                    y: Math.round(g(a, b) / Hg) * Hg,
                    i: b
                }
            })
        }
        var d = Bc,
            e = Cc,
            f = d,
            g = e,
            h = ii;
        return a ? b(a) : (b.links = function(a) {
            return fd(c(a)).edges.filter(function(a) {
                return a.l && a.r
            }).map(function(b) {
                return {
                    source: a[b.l.i],
                    target: a[b.r.i]
                }
            })
        }, b.triangles = function(a) {
            var b = [];
            return fd(c(a)).cells.forEach(function(c, d) {
                for (var e, f, g = c.site, h = c.edges.sort(Rc), i = -1, j = h.length, k = h[j - 1].edge, l = k.l === g ? k.r : k.l; ++i < j;) e = k, f = l, k = h[i].edge, l = k.l === g ? k.r : k.l, d < f.i && d < l.i && hd(g, f, l) < 0 && b.push([a[d], a[f.i], a[l.i]])
            }), b
        }, b.x = function(a) {
            return arguments.length ? (f = za(d = a), b) : d
        }, b.y = function(a) {
            return arguments.length ? (g = za(e = a), b) : e
        }, b.clipExtent = function(a) {
            return arguments.length ? (h = null == a ? ii : a, b) : h === ii ? null : h
        }, b.size = function(a) {
            return arguments.length ? b.clipExtent(a && [
                [0, 0], a
            ]) : h === ii ? null : h && h[1]
        }, b)
    };
    var ii = [
        [-1e6, -1e6],
        [1e6, 1e6]
    ];
    bg.geom.delaunay = function(a) {
        return bg.geom.voronoi().triangles(a)
    }, bg.geom.quadtree = function(a, b, c, d, e) {
        function f(a) {
            function f(a, b, c, d, e, f, g, h) {
                if (!isNaN(c) && !isNaN(d))
                    if (a.leaf) {
                        var i = a.x,
                            k = a.y;
                        if (null != i)
                            if (pg(i - c) + pg(k - d) < .01) j(a, b, c, d, e, f, g, h);
                            else {
                                var l = a.point;
                                a.x = a.y = a.point = null, j(a, l, i, k, e, f, g, h), j(a, b, c, d, e, f, g, h)
                            }
                        else a.x = c, a.y = d, a.point = b
                    } else j(a, b, c, d, e, f, g, h)
            }

            function j(a, b, c, d, e, g, h, i) {
                var j = .5 * (e + h),
                    k = .5 * (g + i),
                    l = c >= j,
                    m = d >= k,
                    n = m << 1 | l;
                a.leaf = !1, a = a.nodes[n] || (a.nodes[n] = kd()), l ? e = j : h = j, m ? g = k : i = k, f(a, b, c, d, e, g, h, i)
            }
            var k, l, m, n, o, p, q, r, s, t = za(h),
                u = za(i);
            if (null != b) p = b, q = c, r = d, s = e;
            else if (r = s = -(p = q = 1 / 0), l = [], m = [], o = a.length, g)
                for (n = 0; o > n; ++n) k = a[n], k.x < p && (p = k.x), k.y < q && (q = k.y), k.x > r && (r = k.x), k.y > s && (s = k.y), l.push(k.x), m.push(k.y);
            else
                for (n = 0; o > n; ++n) {
                    var v = +t(k = a[n], n),
                        w = +u(k, n);
                    p > v && (p = v), q > w && (q = w), v > r && (r = v), w > s && (s = w), l.push(v), m.push(w)
                }
            var x = r - p,
                y = s - q;
            x > y ? s = q + x : r = p + y;
            var z = kd();
            if (z.add = function(a) {
                    f(z, a, +t(a, ++n), +u(a, n), p, q, r, s)
                }, z.visit = function(a) {
                    ld(a, z, p, q, r, s)
                }, z.find = function(a) {
                    return md(z, a[0], a[1], p, q, r, s)
                }, n = -1, null == b) {
                for (; ++n < o;) f(z, a[n], l[n], m[n], p, q, r, s);
                --n
            } else a.forEach(z.add);
            return l = m = a = k = null, z
        }
        var g, h = Bc,
            i = Cc;
        return (g = arguments.length) ? (h = id, i = jd, 3 === g && (e = c, d = b, c = b = 0), f(a)) : (f.x = function(a) {
            return arguments.length ? (h = a, f) : h
        }, f.y = function(a) {
            return arguments.length ? (i = a, f) : i
        }, f.extent = function(a) {
            return arguments.length ? (null == a ? b = c = d = e = null : (b = +a[0][0], c = +a[0][1], d = +a[1][0], e = +a[1][1]), f) : null == b ? null : [
                [b, c],
                [d, e]
            ]
        }, f.size = function(a) {
            return arguments.length ? (null == a ? b = c = d = e = null : (b = c = 0, d = +a[0], e = +a[1]), f) : null == b ? null : [d - b, e - c]
        }, f)
    }, bg.interpolateRgb = nd, bg.interpolateObject = od, bg.interpolateNumber = pd, bg.interpolateString = qd;
    var ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        ki = new RegExp(ji.source, "g");
    bg.interpolate = rd, bg.interpolators = [function(a, b) {
        var c = typeof b;
        return ("string" === c ? bh.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? nd : qd : b instanceof fa ? nd : Array.isArray(b) ? sd : "object" === c && isNaN(b) ? od : pd)(a, b)
    }], bg.interpolateArray = sd;
    var li = function() {
            return Aa
        },
        mi = bg.map({
            linear: li,
            poly: zd,
            quad: function() {
                return wd
            },
            cubic: function() {
                return xd
            },
            sin: function() {
                return Ad
            },
            exp: function() {
                return Bd
            },
            circle: function() {
                return Cd
            },
            elastic: Dd,
            back: Ed,
            bounce: function() {
                return Fd
            }
        }),
        ni = bg.map({
            "in": Aa,
            out: ud,
            "in-out": vd,
            "out-in": function(a) {
                return vd(ud(a))
            }
        });
    bg.ease = function(a) {
        var b = a.indexOf("-"),
            c = b >= 0 ? a.slice(0, b) : a,
            d = b >= 0 ? a.slice(b + 1) : "in";
        return c = mi.get(c) || li, d = ni.get(d) || Aa, td(d(c.apply(null, cg.call(arguments, 1))))
    }, bg.interpolateHcl = Gd, bg.interpolateHsl = Hd, bg.interpolateLab = Id, bg.interpolateRound = Jd, bg.transform = function(a) {
        var b = eg.createElementNS(bg.ns.prefix.svg, "g");
        return (bg.transform = function(a) {
            if (null != a) {
                b.setAttribute("transform", a);
                var c = b.transform.baseVal.consolidate()
            }
            return new Kd(c ? c.matrix : oi)
        })(a)
    }, Kd.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var oi = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    bg.interpolateTransform = Od, bg.layout = {}, bg.layout.bundle = function() {
        return function(a) {
            for (var b = [], c = -1, d = a.length; ++c < d;) b.push(Rd(a[c]));
            return b
        }
    }, bg.layout.chord = function() {
        function a() {
            var a, j, l, m, n, o = {},
                p = [],
                q = bg.range(f),
                r = [];
            for (c = [], d = [], a = 0, m = -1; ++m < f;) {
                for (j = 0, n = -1; ++n < f;) j += e[m][n];
                p.push(j), r.push(bg.range(f)), a += j
            }
            for (g && q.sort(function(a, b) {
                    return g(p[a], p[b])
                }), h && r.forEach(function(a, b) {
                    a.sort(function(a, c) {
                        return h(e[b][a], e[b][c])
                    })
                }), a = (Kg - k * f) / a, j = 0, m = -1; ++m < f;) {
                for (l = j, n = -1; ++n < f;) {
                    var s = q[m],
                        t = r[s][n],
                        u = e[s][t],
                        v = j,
                        w = j += u * a;
                    o[s + "-" + t] = {
                        index: s,
                        subindex: t,
                        startAngle: v,
                        endAngle: w,
                        value: u
                    }
                }
                d[s] = {
                    index: s,
                    startAngle: l,
                    endAngle: j,
                    value: (j - l) / a
                }, j += k
            }
            for (m = -1; ++m < f;)
                for (n = m - 1; ++n < f;) {
                    var x = o[m + "-" + n],
                        y = o[n + "-" + m];
                    (x.value || y.value) && c.push(x.value < y.value ? {
                        source: y,
                        target: x
                    } : {
                        source: x,
                        target: y
                    })
                }
            i && b()
        }

        function b() {
            c.sort(function(a, b) {
                return i((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
            })
        }
        var c, d, e, f, g, h, i, j = {},
            k = 0;
        return j.matrix = function(a) {
            return arguments.length ? (f = (e = a) && e.length, c = d = null, j) : e
        }, j.padding = function(a) {
            return arguments.length ? (k = a, c = d = null, j) : k
        }, j.sortGroups = function(a) {
            return arguments.length ? (g = a, c = d = null, j) : g
        }, j.sortSubgroups = function(a) {
            return arguments.length ? (h = a, c = null, j) : h
        }, j.sortChords = function(a) {
            return arguments.length ? (i = a, c && b(), j) : i
        }, j.chords = function() {
            return c || a(), c
        }, j.groups = function() {
            return d || a(), d
        }, j
    }, bg.layout.force = function() {
        function a(a) {
            return function(b, c, d, e) {
                if (b.point !== a) {
                    var f = b.cx - a.x,
                        g = b.cy - a.y,
                        h = e - c,
                        i = f * f + g * g;
                    if (i > h * h / q) {
                        if (o > i) {
                            var j = b.charge / i;
                            a.px -= f * j, a.py -= g * j
                        }
                        return !0
                    }
                    if (b.point && i && o > i) {
                        var j = b.pointCharge / i;
                        a.px -= f * j, a.py -= g * j
                    }
                }
                return !b.charge
            }
        }

        function b(a) {
            a.px = bg.event.x, a.py = bg.event.y, h.resume()
        }
        var c, d, e, f, g, h = {},
            i = bg.dispatch("start", "tick", "end"),
            j = [1, 1],
            k = .9,
            l = pi,
            m = qi,
            n = -30,
            o = ri,
            p = .1,
            q = .64,
            r = [],
            s = [];
        return h.tick = function() {
            if ((d *= .99) < .005) return i.end({
                type: "end",
                alpha: d = 0
            }), !0;
            var b, c, h, l, m, o, q, t, u, v = r.length,
                w = s.length;
            for (c = 0; w > c; ++c) h = s[c], l = h.source, m = h.target, t = m.x - l.x, u = m.y - l.y, (o = t * t + u * u) && (o = d * f[c] * ((o = Math.sqrt(o)) - e[c]) / o, t *= o, u *= o, m.x -= t * (q = l.weight / (m.weight + l.weight)), m.y -= u * q, l.x += t * (q = 1 - q), l.y += u * q);
            if ((q = d * p) && (t = j[0] / 2, u = j[1] / 2, c = -1, q))
                for (; ++c < v;) h = r[c], h.x += (t - h.x) * q, h.y += (u - h.y) * q;
            if (n)
                for (Yd(b = bg.geom.quadtree(r), d, g), c = -1; ++c < v;)(h = r[c]).fixed || b.visit(a(h));
            for (c = -1; ++c < v;) h = r[c], h.fixed ? (h.x = h.px, h.y = h.py) : (h.x -= (h.px - (h.px = h.x)) * k, h.y -= (h.py - (h.py = h.y)) * k);
            i.tick({
                type: "tick",
                alpha: d
            })
        }, h.nodes = function(a) {
            return arguments.length ? (r = a, h) : r
        }, h.links = function(a) {
            return arguments.length ? (s = a, h) : s
        }, h.size = function(a) {
            return arguments.length ? (j = a, h) : j
        }, h.linkDistance = function(a) {
            return arguments.length ? (l = "function" == typeof a ? a : +a, h) : l
        }, h.distance = h.linkDistance, h.linkStrength = function(a) {
            return arguments.length ? (m = "function" == typeof a ? a : +a, h) : m
        }, h.friction = function(a) {
            return arguments.length ? (k = +a, h) : k
        }, h.charge = function(a) {
            return arguments.length ? (n = "function" == typeof a ? a : +a, h) : n
        }, h.chargeDistance = function(a) {
            return arguments.length ? (o = a * a, h) : Math.sqrt(o)
        }, h.gravity = function(a) {
            return arguments.length ? (p = +a, h) : p
        }, h.theta = function(a) {
            return arguments.length ? (q = a * a, h) : Math.sqrt(q)
        }, h.alpha = function(a) {
            return arguments.length ? (a = +a, d ? d = a > 0 ? a : 0 : a > 0 && (i.start({
                type: "start",
                alpha: d = a
            }), bg.timer(h.tick)), h) : d
        }, h.start = function() {
            function a(a, d) {
                if (!c) {
                    for (c = new Array(i), h = 0; i > h; ++h) c[h] = [];
                    for (h = 0; j > h; ++h) {
                        var e = s[h];
                        c[e.source.index].push(e.target), c[e.target.index].push(e.source)
                    }
                }
                for (var f, g = c[b], h = -1, j = g.length; ++h < j;)
                    if (!isNaN(f = g[h][a])) return f;
                return Math.random() * d
            }
            var b, c, d, i = r.length,
                k = s.length,
                o = j[0],
                p = j[1];
            for (b = 0; i > b; ++b)(d = r[b]).index = b, d.weight = 0;
            for (b = 0; k > b; ++b) d = s[b], "number" == typeof d.source && (d.source = r[d.source]), "number" == typeof d.target && (d.target = r[d.target]), ++d.source.weight, ++d.target.weight;
            for (b = 0; i > b; ++b) d = r[b], isNaN(d.x) && (d.x = a("x", o)), isNaN(d.y) && (d.y = a("y", p)), isNaN(d.px) && (d.px = d.x), isNaN(d.py) && (d.py = d.y);
            if (e = [], "function" == typeof l)
                for (b = 0; k > b; ++b) e[b] = +l.call(this, s[b], b);
            else
                for (b = 0; k > b; ++b) e[b] = l;
            if (f = [], "function" == typeof m)
                for (b = 0; k > b; ++b) f[b] = +m.call(this, s[b], b);
            else
                for (b = 0; k > b; ++b) f[b] = m;
            if (g = [], "function" == typeof n)
                for (b = 0; i > b; ++b) g[b] = +n.call(this, r[b], b);
            else
                for (b = 0; i > b; ++b) g[b] = n;
            return h.resume()
        }, h.resume = function() {
            return h.alpha(.1)
        }, h.stop = function() {
            return h.alpha(0)
        }, h.drag = function() {
            return c || (c = bg.behavior.drag().origin(Aa).on("dragstart.force", Ud).on("drag.force", b).on("dragend.force", Vd)), arguments.length ? void this.on("mouseover.force", Wd).on("mouseout.force", Xd).call(c) : c
        }, bg.rebind(h, i, "on")
    };
    var pi = 20,
        qi = 1,
        ri = 1 / 0;
    bg.layout.hierarchy = function() {
        function a(e) {
            var f, g = [e],
                h = [];
            for (e.depth = 0; null != (f = g.pop());)
                if (h.push(f), (j = c.call(a, f, f.depth)) && (i = j.length)) {
                    for (var i, j, k; --i >= 0;) g.push(k = j[i]), k.parent = f, k.depth = f.depth + 1;
                    d && (f.value = 0), f.children = j
                } else d && (f.value = +d.call(a, f, f.depth) || 0), delete f.children;
            return _d(e, function(a) {
                var c, e;
                b && (c = a.children) && c.sort(b), d && (e = a.parent) && (e.value += a.value)
            }), h
        }
        var b = ce,
            c = ae,
            d = be;
        return a.sort = function(c) {
            return arguments.length ? (b = c, a) : b
        }, a.children = function(b) {
            return arguments.length ? (c = b, a) : c
        }, a.value = function(b) {
            return arguments.length ? (d = b, a) : d
        }, a.revalue = function(b) {
            return d && ($d(b, function(a) {
                a.children && (a.value = 0)
            }), _d(b, function(b) {
                var c;
                b.children || (b.value = +d.call(a, b, b.depth) || 0), (c = b.parent) && (c.value += b.value)
            })), b
        }, a
    }, bg.layout.partition = function() {
        function a(b, c, d, e) {
            var f = b.children;
            if (b.x = c, b.y = b.depth * e, b.dx = d, b.dy = e, f && (g = f.length)) {
                var g, h, i, j = -1;
                for (d = b.value ? d / b.value : 0; ++j < g;) a(h = f[j], c, i = h.value * d, e), c += i
            }
        }

        function b(a) {
            var c = a.children,
                d = 0;
            if (c && (e = c.length))
                for (var e, f = -1; ++f < e;) d = Math.max(d, b(c[f]));
            return 1 + d
        }

        function c(c, f) {
            var g = d.call(this, c, f);
            return a(g[0], 0, e[0], e[1] / b(g[0])), g
        }
        var d = bg.layout.hierarchy(),
            e = [1, 1];
        return c.size = function(a) {
            return arguments.length ? (e = a, c) : e
        }, Zd(c, d)
    }, bg.layout.pie = function() {
        function a(g) {
            var h, i = g.length,
                j = g.map(function(c, d) {
                    return +b.call(a, c, d)
                }),
                k = +("function" == typeof d ? d.apply(this, arguments) : d),
                l = ("function" == typeof e ? e.apply(this, arguments) : e) - k,
                m = Math.min(Math.abs(l) / i, +("function" == typeof f ? f.apply(this, arguments) : f)),
                n = m * (0 > l ? -1 : 1),
                o = (l - i * n) / bg.sum(j),
                p = bg.range(i),
                q = [];
            return null != c && p.sort(c === si ? function(a, b) {
                return j[b] - j[a]
            } : function(a, b) {
                return c(g[a], g[b])
            }), p.forEach(function(a) {
                q[a] = {
                    data: g[a],
                    value: h = j[a],
                    startAngle: k,
                    endAngle: k += h * o + n,
                    padAngle: m
                }
            }), q
        }
        var b = Number,
            c = si,
            d = 0,
            e = Kg,
            f = 0;
        return a.value = function(c) {
            return arguments.length ? (b = c, a) : b
        }, a.sort = function(b) {
            return arguments.length ? (c = b, a) : c
        }, a.startAngle = function(b) {
            return arguments.length ? (d = b, a) : d
        }, a.endAngle = function(b) {
            return arguments.length ? (e = b, a) : e
        }, a.padAngle = function(b) {
            return arguments.length ? (f = b, a) : f
        }, a
    };
    var si = {};
    bg.layout.stack = function() {
        function a(h, i) {
            if (!(m = h.length)) return h;
            var j = h.map(function(c, d) {
                    return b.call(a, c, d)
                }),
                k = j.map(function(b) {
                    return b.map(function(b, c) {
                        return [f.call(a, b, c), g.call(a, b, c)]
                    })
                }),
                l = c.call(a, k, i);
            j = bg.permute(j, l), k = bg.permute(k, l);
            var m, n, o, p, q = d.call(a, k, i),
                r = j[0].length;
            for (o = 0; r > o; ++o)
                for (e.call(a, j[0][o], p = q[o], k[0][o][1]), n = 1; m > n; ++n) e.call(a, j[n][o], p += k[n - 1][o][1], k[n][o][1]);
            return h
        }
        var b = Aa,
            c = he,
            d = ie,
            e = ge,
            f = ee,
            g = fe;
        return a.values = function(c) {
            return arguments.length ? (b = c, a) : b
        }, a.order = function(b) {
            return arguments.length ? (c = "function" == typeof b ? b : ti.get(b) || he, a) : c
        }, a.offset = function(b) {
            return arguments.length ? (d = "function" == typeof b ? b : ui.get(b) || ie, a) : d
        }, a.x = function(b) {
            return arguments.length ? (f = b, a) : f
        }, a.y = function(b) {
            return arguments.length ? (g = b, a) : g
        }, a.out = function(b) {
            return arguments.length ? (e = b, a) : e
        }, a
    };
    var ti = bg.map({
            "inside-out": function(a) {
                var b, c, d = a.length,
                    e = a.map(je),
                    f = a.map(ke),
                    g = bg.range(d).sort(function(a, b) {
                        return e[a] - e[b]
                    }),
                    h = 0,
                    i = 0,
                    j = [],
                    k = [];
                for (b = 0; d > b; ++b) c = g[b], i > h ? (h += f[c], j.push(c)) : (i += f[c], k.push(c));
                return k.reverse().concat(j)
            },
            reverse: function(a) {
                return bg.range(a.length).reverse()
            },
            "default": he
        }),
        ui = bg.map({
            silhouette: function(a) {
                var b, c, d, e = a.length,
                    f = a[0].length,
                    g = [],
                    h = 0,
                    i = [];
                for (c = 0; f > c; ++c) {
                    for (b = 0, d = 0; e > b; b++) d += a[b][c][1];
                    d > h && (h = d), g.push(d)
                }
                for (c = 0; f > c; ++c) i[c] = (h - g[c]) / 2;
                return i
            },
            wiggle: function(a) {
                var b, c, d, e, f, g, h, i, j, k = a.length,
                    l = a[0],
                    m = l.length,
                    n = [];
                for (n[0] = i = j = 0, c = 1; m > c; ++c) {
                    for (b = 0, e = 0; k > b; ++b) e += a[b][c][1];
                    for (b = 0, f = 0, h = l[c][0] - l[c - 1][0]; k > b; ++b) {
                        for (d = 0, g = (a[b][c][1] - a[b][c - 1][1]) / (2 * h); b > d; ++d) g += (a[d][c][1] - a[d][c - 1][1]) / h;
                        f += g * a[b][c][1]
                    }
                    n[c] = i -= e ? f / e * h : 0, j > i && (j = i)
                }
                for (c = 0; m > c; ++c) n[c] -= j;
                return n
            },
            expand: function(a) {
                var b, c, d, e = a.length,
                    f = a[0].length,
                    g = 1 / e,
                    h = [];
                for (c = 0; f > c; ++c) {
                    for (b = 0, d = 0; e > b; b++) d += a[b][c][1];
                    if (d)
                        for (b = 0; e > b; b++) a[b][c][1] /= d;
                    else
                        for (b = 0; e > b; b++) a[b][c][1] = g
                }
                for (c = 0; f > c; ++c) h[c] = 0;
                return h
            },
            zero: ie
        });
    bg.layout.histogram = function() {
        function a(a, f) {
            for (var g, h, i = [], j = a.map(c, this), k = d.call(this, j, f), l = e.call(this, k, j, f), f = -1, m = j.length, n = l.length - 1, o = b ? 1 : 1 / m; ++f < n;) g = i[f] = [], g.dx = l[f + 1] - (g.x = l[f]), g.y = 0;
            if (n > 0)
                for (f = -1; ++f < m;) h = j[f], h >= k[0] && h <= k[1] && (g = i[bg.bisect(l, h, 1, n) - 1], g.y += o, g.push(a[f]));
            return i
        }
        var b = !0,
            c = Number,
            d = oe,
            e = me;
        return a.value = function(b) {
            return arguments.length ? (c = b, a) : c
        }, a.range = function(b) {
            return arguments.length ? (d = za(b), a) : d
        }, a.bins = function(b) {
            return arguments.length ? (e = "number" == typeof b ? function(a) {
                return ne(a, b)
            } : za(b), a) : e
        }, a.frequency = function(c) {
            return arguments.length ? (b = !!c, a) : b
        }, a
    }, bg.layout.pack = function() {
        function a(a, f) {
            var g = c.call(this, a, f),
                h = g[0],
                i = e[0],
                j = e[1],
                k = null == b ? Math.sqrt : "function" == typeof b ? b : function() {
                    return b
                };
            if (h.x = h.y = 0, _d(h, function(a) {
                    a.r = +k(a.value)
                }), _d(h, te), d) {
                var l = d * (b ? 1 : Math.max(2 * h.r / i, 2 * h.r / j)) / 2;
                _d(h, function(a) {
                    a.r += l
                }), _d(h, te), _d(h, function(a) {
                    a.r -= l
                })
            }
            return we(h, i / 2, j / 2, b ? 1 : 1 / Math.max(2 * h.r / i, 2 * h.r / j)), g
        }
        var b, c = bg.layout.hierarchy().sort(pe),
            d = 0,
            e = [1, 1];
        return a.size = function(b) {
            return arguments.length ? (e = b, a) : e
        }, a.radius = function(c) {
            return arguments.length ? (b = null == c || "function" == typeof c ? c : +c, a) : b
        }, a.padding = function(b) {
            return arguments.length ? (d = +b, a) : d
        }, Zd(a, c)
    }, bg.layout.tree = function() {
        function a(a, e) {
            var k = g.call(this, a, e),
                l = k[0],
                m = b(l);
            if (_d(m, c), m.parent.m = -m.z, $d(m, d), j) $d(l, f);
            else {
                var n = l,
                    o = l,
                    p = l;
                $d(l, function(a) {
                    a.x < n.x && (n = a), a.x > o.x && (o = a), a.depth > p.depth && (p = a)
                });
                var q = h(n, o) / 2 - n.x,
                    r = i[0] / (o.x + h(o, n) / 2 + q),
                    s = i[1] / (p.depth || 1);
                $d(l, function(a) {
                    a.x = (a.x + q) * r, a.y = a.depth * s
                })
            }
            return k
        }

        function b(a) {
            for (var b, c = {
                    A: null,
                    children: [a]
                }, d = [c]; null != (b = d.pop());)
                for (var e, f = b.children, g = 0, h = f.length; h > g; ++g) d.push((f[g] = e = {
                    _: f[g],
                    parent: b,
                    children: (e = f[g].children) && e.slice() || [],
                    A: null,
                    a: null,
                    z: 0,
                    m: 0,
                    c: 0,
                    s: 0,
                    t: null,
                    i: g
                }).a = e);
            return c.children[0]
        }

        function c(a) {
            var b = a.children,
                c = a.parent.children,
                d = a.i ? c[a.i - 1] : null;
            if (b.length) {
                Ce(a);
                var f = (b[0].z + b[b.length - 1].z) / 2;
                d ? (a.z = d.z + h(a._, d._), a.m = a.z - f) : a.z = f
            } else d && (a.z = d.z + h(a._, d._));
            a.parent.A = e(a, d, a.parent.A || c[0])
        }

        function d(a) {
            a._.x = a.z + a.parent.m, a.m += a.parent.m
        }

        function e(a, b, c) {
            if (b) {
                for (var d, e = a, f = a, g = b, i = e.parent.children[0], j = e.m, k = f.m, l = g.m, m = i.m; g = Ae(g), e = ze(e), g && e;) i = ze(i), f = Ae(f), f.a = a, d = g.z + l - e.z - j + h(g._, e._), d > 0 && (Be(De(g, a, c), a, d), j += d, k += d), l += g.m, j += e.m, m += i.m, k += f.m;
                g && !Ae(f) && (f.t = g, f.m += l - k), e && !ze(i) && (i.t = e, i.m += j - m, c = a)
            }
            return c
        }

        function f(a) {
            a.x *= i[0], a.y = a.depth * i[1]
        }
        var g = bg.layout.hierarchy().sort(null).value(null),
            h = ye,
            i = [1, 1],
            j = null;
        return a.separation = function(b) {
            return arguments.length ? (h = b, a) : h
        }, a.size = function(b) {
            return arguments.length ? (j = null == (i = b) ? f : null, a) : j ? null : i
        }, a.nodeSize = function(b) {
            return arguments.length ? (j = null == (i = b) ? null : f, a) : j ? i : null
        }, Zd(a, g)
    }, bg.layout.cluster = function() {
        function a(a, f) {
            var g, h = b.call(this, a, f),
                i = h[0],
                j = 0;
            _d(i, function(a) {
                var b = a.children;
                b && b.length ? (a.x = Fe(b), a.y = Ee(b)) : (a.x = g ? j += c(a, g) : 0, a.y = 0, g = a)
            });
            var k = Ge(i),
                l = He(i),
                m = k.x - c(k, l) / 2,
                n = l.x + c(l, k) / 2;
            return _d(i, e ? function(a) {
                a.x = (a.x - i.x) * d[0], a.y = (i.y - a.y) * d[1]
            } : function(a) {
                a.x = (a.x - m) / (n - m) * d[0], a.y = (1 - (i.y ? a.y / i.y : 1)) * d[1]
            }), h
        }
        var b = bg.layout.hierarchy().sort(null).value(null),
            c = ye,
            d = [1, 1],
            e = !1;
        return a.separation = function(b) {
            return arguments.length ? (c = b, a) : c
        }, a.size = function(b) {
            return arguments.length ? (e = null == (d = b), a) : e ? null : d
        }, a.nodeSize = function(b) {
            return arguments.length ? (e = null != (d = b), a) : e ? d : null
        }, Zd(a, b)
    }, bg.layout.treemap = function() {
        function a(a, b) {
            for (var c, d, e = -1, f = a.length; ++e < f;) d = (c = a[e]).value * (0 > b ? 0 : b), c.area = isNaN(d) || 0 >= d ? 0 : d
        }

        function b(c) {
            var f = c.children;
            if (f && f.length) {
                var g, h, i, j = l(c),
                    k = [],
                    m = f.slice(),
                    o = 1 / 0,
                    p = "slice" === n ? j.dx : "dice" === n ? j.dy : "slice-dice" === n ? 1 & c.depth ? j.dy : j.dx : Math.min(j.dx, j.dy);
                for (a(m, j.dx * j.dy / c.value), k.area = 0;
                    (i = m.length) > 0;) k.push(g = m[i - 1]), k.area += g.area, "squarify" !== n || (h = d(k, p)) <= o ? (m.pop(), o = h) : (k.area -= k.pop().area, e(k, p, j, !1), p = Math.min(j.dx, j.dy), k.length = k.area = 0, o = 1 / 0);
                k.length && (e(k, p, j, !0), k.length = k.area = 0), f.forEach(b)
            }
        }

        function c(b) {
            var d = b.children;
            if (d && d.length) {
                var f, g = l(b),
                    h = d.slice(),
                    i = [];
                for (a(h, g.dx * g.dy / b.value), i.area = 0; f = h.pop();) i.push(f), i.area += f.area, null != f.z && (e(i, f.z ? g.dx : g.dy, g, !h.length), i.length = i.area = 0);
                d.forEach(c)
            }
        }

        function d(a, b) {
            for (var c, d = a.area, e = 0, f = 1 / 0, g = -1, h = a.length; ++g < h;)(c = a[g].area) && (f > c && (f = c), c > e && (e = c));
            return d *= d, b *= b, d ? Math.max(b * e * o / d, d / (b * f * o)) : 1 / 0
        }

        function e(a, b, c, d) {
            var e, f = -1,
                g = a.length,
                h = c.x,
                j = c.y,
                k = b ? i(a.area / b) : 0;
            if (b == c.dx) {
                for ((d || k > c.dy) && (k = c.dy); ++f < g;) e = a[f], e.x = h, e.y = j, e.dy = k, h += e.dx = Math.min(c.x + c.dx - h, k ? i(e.area / k) : 0);
                e.z = !0, e.dx += c.x + c.dx - h, c.y += k, c.dy -= k
            } else {
                for ((d || k > c.dx) && (k = c.dx); ++f < g;) e = a[f], e.x = h, e.y = j, e.dx = k, j += e.dy = Math.min(c.y + c.dy - j, k ? i(e.area / k) : 0);
                e.z = !1, e.dy += c.y + c.dy - j, c.x += k, c.dx -= k
            }
        }

        function f(d) {
            var e = g || h(d),
                f = e[0];
            return f.x = 0, f.y = 0, f.dx = j[0], f.dy = j[1], g && h.revalue(f), a([f], f.dx * f.dy / f.value), (g ? c : b)(f), m && (g = e), e
        }
        var g, h = bg.layout.hierarchy(),
            i = Math.round,
            j = [1, 1],
            k = null,
            l = Ie,
            m = !1,
            n = "squarify",
            o = .5 * (1 + Math.sqrt(5));
        return f.size = function(a) {
            return arguments.length ? (j = a, f) : j
        }, f.padding = function(a) {
            function b(b) {
                var c = a.call(f, b, b.depth);
                return null == c ? Ie(b) : Je(b, "number" == typeof c ? [c, c, c, c] : c)
            }

            function c(b) {
                return Je(b, a)
            }
            if (!arguments.length) return k;
            var d;
            return l = null == (k = a) ? Ie : "function" == (d = typeof a) ? b : "number" === d ? (a = [a, a, a, a], c) : c, f
        }, f.round = function(a) {
            return arguments.length ? (i = a ? Math.round : Number, f) : i != Number;
        }, f.sticky = function(a) {
            return arguments.length ? (m = a, g = null, f) : m
        }, f.ratio = function(a) {
            return arguments.length ? (o = a, f) : o
        }, f.mode = function(a) {
            return arguments.length ? (n = a + "", f) : n
        }, Zd(f, h)
    }, bg.random = {
        normal: function(a, b) {
            var c = arguments.length;
            return 2 > c && (b = 1), 1 > c && (a = 0),
                function() {
                    var c, d, e;
                    do c = 2 * Math.random() - 1, d = 2 * Math.random() - 1, e = c * c + d * d; while (!e || e > 1);
                    return a + b * c * Math.sqrt(-2 * Math.log(e) / e)
                }
        },
        logNormal: function() {
            var a = bg.random.normal.apply(bg, arguments);
            return function() {
                return Math.exp(a())
            }
        },
        bates: function(a) {
            var b = bg.random.irwinHall(a);
            return function() {
                return b() / a
            }
        },
        irwinHall: function(a) {
            return function() {
                for (var b = 0, c = 0; a > c; c++) b += Math.random();
                return b
            }
        }
    }, bg.scale = {};
    var vi = {
        floor: Aa,
        ceil: Aa
    };
    bg.scale.linear = function() {
        return Qe([0, 1], [0, 1], rd, !1)
    };
    var wi = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    bg.scale.log = function() {
        return Ye(bg.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var xi = bg.format(".0e"),
        yi = {
            floor: function(a) {
                return -Math.ceil(-a)
            },
            ceil: function(a) {
                return -Math.floor(-a)
            }
        };
    bg.scale.pow = function() {
        return Ze(bg.scale.linear(), 1, [0, 1])
    }, bg.scale.sqrt = function() {
        return bg.scale.pow().exponent(.5)
    }, bg.scale.ordinal = function() {
        return _e([], {
            t: "range",
            a: [
                []
            ]
        })
    }, bg.scale.category10 = function() {
        return bg.scale.ordinal().range(zi)
    }, bg.scale.category20 = function() {
        return bg.scale.ordinal().range(Ai)
    }, bg.scale.category20b = function() {
        return bg.scale.ordinal().range(Bi)
    }, bg.scale.category20c = function() {
        return bg.scale.ordinal().range(Ci)
    };
    var zi = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(sa),
        Ai = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(sa),
        Bi = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(sa),
        Ci = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(sa);
    bg.scale.quantile = function() {
        return af([], [])
    }, bg.scale.quantize = function() {
        return bf(0, 1, [0, 1])
    }, bg.scale.threshold = function() {
        return cf([.5], [0, 1])
    }, bg.scale.identity = function() {
        return df([0, 1])
    }, bg.svg = {}, bg.svg.arc = function() {
        function a() {
            var a = Math.max(0, +c.apply(this, arguments)),
                j = Math.max(0, +d.apply(this, arguments)),
                k = g.apply(this, arguments) - Mg,
                l = h.apply(this, arguments) - Mg,
                m = Math.abs(l - k),
                n = k > l ? 0 : 1;
            if (a > j && (o = j, j = a, a = o), m >= Lg) return b(j, n) + (a ? b(a, 1 - n) : "") + "Z";
            var o, p, q, r, s, t, u, v, w, x, y, z, A = 0,
                B = 0,
                C = [];
            if ((r = (+i.apply(this, arguments) || 0) / 2) && (q = f === Di ? Math.sqrt(a * a + j * j) : +f.apply(this, arguments), n || (B *= -1), j && (B = aa(q / j * Math.sin(r))), a && (A = aa(q / a * Math.sin(r)))), j) {
                s = j * Math.cos(k + B), t = j * Math.sin(k + B), u = j * Math.cos(l - B), v = j * Math.sin(l - B);
                var D = Math.abs(l - k - 2 * B) <= Jg ? 0 : 1;
                if (B && lf(s, t, u, v) === n ^ D) {
                    var E = (k + l) / 2;
                    s = j * Math.cos(E), t = j * Math.sin(E), u = v = null
                }
            } else s = t = 0;
            if (a) {
                w = a * Math.cos(l - A), x = a * Math.sin(l - A), y = a * Math.cos(k + A), z = a * Math.sin(k + A);
                var F = Math.abs(k - l + 2 * A) <= Jg ? 0 : 1;
                if (A && lf(w, x, y, z) === 1 - n ^ F) {
                    var G = (k + l) / 2;
                    w = a * Math.cos(G), x = a * Math.sin(G), y = z = null
                }
            } else w = x = 0;
            if ((o = Math.min(Math.abs(j - a) / 2, +e.apply(this, arguments))) > .001) {
                p = j > a ^ n ? 0 : 1;
                var H = null == y ? [w, x] : null == u ? [s, t] : Gc([s, t], [y, z], [u, v], [w, x]),
                    I = s - H[0],
                    J = t - H[1],
                    K = u - H[0],
                    L = v - H[1],
                    M = 1 / Math.sin(Math.acos((I * K + J * L) / (Math.sqrt(I * I + J * J) * Math.sqrt(K * K + L * L))) / 2),
                    N = Math.sqrt(H[0] * H[0] + H[1] * H[1]);
                if (null != u) {
                    var O = Math.min(o, (j - N) / (M + 1)),
                        P = mf(null == y ? [w, x] : [y, z], [s, t], j, O, n),
                        Q = mf([u, v], [w, x], j, O, n);
                    o === O ? C.push("M", P[0], "A", O, ",", O, " 0 0,", p, " ", P[1], "A", j, ",", j, " 0 ", 1 - n ^ lf(P[1][0], P[1][1], Q[1][0], Q[1][1]), ",", n, " ", Q[1], "A", O, ",", O, " 0 0,", p, " ", Q[0]) : C.push("M", P[0], "A", O, ",", O, " 0 1,", p, " ", Q[0])
                } else C.push("M", s, ",", t);
                if (null != y) {
                    var R = Math.min(o, (a - N) / (M - 1)),
                        S = mf([s, t], [y, z], a, -R, n),
                        T = mf([w, x], null == u ? [s, t] : [u, v], a, -R, n);
                    o === R ? C.push("L", T[0], "A", R, ",", R, " 0 0,", p, " ", T[1], "A", a, ",", a, " 0 ", n ^ lf(T[1][0], T[1][1], S[1][0], S[1][1]), ",", 1 - n, " ", S[1], "A", R, ",", R, " 0 0,", p, " ", S[0]) : C.push("L", T[0], "A", R, ",", R, " 0 0,", p, " ", S[0])
                } else C.push("L", w, ",", x)
            } else C.push("M", s, ",", t), null != u && C.push("A", j, ",", j, " 0 ", D, ",", n, " ", u, ",", v), C.push("L", w, ",", x), null != y && C.push("A", a, ",", a, " 0 ", F, ",", 1 - n, " ", y, ",", z);
            return C.push("Z"), C.join("")
        }

        function b(a, b) {
            return "M0," + a + "A" + a + "," + a + " 0 1," + b + " 0," + -a + "A" + a + "," + a + " 0 1," + b + " 0," + a
        }
        var c = ff,
            d = gf,
            e = ef,
            f = Di,
            g = hf,
            h = jf,
            i = kf;
        return a.innerRadius = function(b) {
            return arguments.length ? (c = za(b), a) : c
        }, a.outerRadius = function(b) {
            return arguments.length ? (d = za(b), a) : d
        }, a.cornerRadius = function(b) {
            return arguments.length ? (e = za(b), a) : e
        }, a.padRadius = function(b) {
            return arguments.length ? (f = b == Di ? Di : za(b), a) : f
        }, a.startAngle = function(b) {
            return arguments.length ? (g = za(b), a) : g
        }, a.endAngle = function(b) {
            return arguments.length ? (h = za(b), a) : h
        }, a.padAngle = function(b) {
            return arguments.length ? (i = za(b), a) : i
        }, a.centroid = function() {
            var a = (+c.apply(this, arguments) + +d.apply(this, arguments)) / 2,
                b = (+g.apply(this, arguments) + +h.apply(this, arguments)) / 2 - Mg;
            return [Math.cos(b) * a, Math.sin(b) * a]
        }, a
    };
    var Di = "auto";
    bg.svg.line = function() {
        return nf(Aa)
    };
    var Ei = bg.map({
        linear: of ,
        "linear-closed": pf,
        step: qf,
        "step-before": rf,
        "step-after": sf,
        basis: yf,
        "basis-open": zf,
        "basis-closed": Af,
        bundle: Bf,
        cardinal: vf,
        "cardinal-open": tf,
        "cardinal-closed": uf,
        monotone: Hf
    });
    Ei.forEach(function(a, b) {
        b.key = a, b.closed = /-closed$/.test(a)
    });
    var Fi = [0, 2 / 3, 1 / 3, 0],
        Gi = [0, 1 / 3, 2 / 3, 0],
        Hi = [0, 1 / 6, 2 / 3, 1 / 6];
    bg.svg.line.radial = function() {
        var a = nf(If);
        return a.radius = a.x, delete a.x, a.angle = a.y, delete a.y, a
    }, rf.reverse = sf, sf.reverse = rf, bg.svg.area = function() {
        return Jf(Aa)
    }, bg.svg.area.radial = function() {
        var a = Jf(If);
        return a.radius = a.x, delete a.x, a.innerRadius = a.x0, delete a.x0, a.outerRadius = a.x1, delete a.x1, a.angle = a.y, delete a.y, a.startAngle = a.y0, delete a.y0, a.endAngle = a.y1, delete a.y1, a
    }, bg.svg.chord = function() {
        function a(a, h) {
            var i = b(this, f, a, h),
                j = b(this, g, a, h);
            return "M" + i.p0 + d(i.r, i.p1, i.a1 - i.a0) + (c(i, j) ? e(i.r, i.p1, i.r, i.p0) : e(i.r, i.p1, j.r, j.p0) + d(j.r, j.p1, j.a1 - j.a0) + e(j.r, j.p1, i.r, i.p0)) + "Z"
        }

        function b(a, b, c, d) {
            var e = b.call(a, c, d),
                f = h.call(a, e, d),
                g = i.call(a, e, d) - Mg,
                k = j.call(a, e, d) - Mg;
            return {
                r: f,
                a0: g,
                a1: k,
                p0: [f * Math.cos(g), f * Math.sin(g)],
                p1: [f * Math.cos(k), f * Math.sin(k)]
            }
        }

        function c(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1
        }

        function d(a, b, c) {
            return "A" + a + "," + a + " 0 " + +(c > Jg) + ",1 " + b
        }

        function e(a, b, c, d) {
            return "Q 0,0 " + d
        }
        var f = rc,
            g = sc,
            h = Kf,
            i = hf,
            j = jf;
        return a.radius = function(b) {
            return arguments.length ? (h = za(b), a) : h
        }, a.source = function(b) {
            return arguments.length ? (f = za(b), a) : f
        }, a.target = function(b) {
            return arguments.length ? (g = za(b), a) : g
        }, a.startAngle = function(b) {
            return arguments.length ? (i = za(b), a) : i
        }, a.endAngle = function(b) {
            return arguments.length ? (j = za(b), a) : j
        }, a
    }, bg.svg.diagonal = function() {
        function a(a, e) {
            var f = b.call(this, a, e),
                g = c.call(this, a, e),
                h = (f.y + g.y) / 2,
                i = [f, {
                    x: f.x,
                    y: h
                }, {
                    x: g.x,
                    y: h
                }, g];
            return i = i.map(d), "M" + i[0] + "C" + i[1] + " " + i[2] + " " + i[3]
        }
        var b = rc,
            c = sc,
            d = Lf;
        return a.source = function(c) {
            return arguments.length ? (b = za(c), a) : b
        }, a.target = function(b) {
            return arguments.length ? (c = za(b), a) : c
        }, a.projection = function(b) {
            return arguments.length ? (d = b, a) : d
        }, a
    }, bg.svg.diagonal.radial = function() {
        var a = bg.svg.diagonal(),
            b = Lf,
            c = a.projection;
        return a.projection = function(a) {
            return arguments.length ? c(Mf(b = a)) : b
        }, a
    }, bg.svg.symbol = function() {
        function a(a, d) {
            return (Ii.get(b.call(this, a, d)) || Pf)(c.call(this, a, d))
        }
        var b = Of,
            c = Nf;
        return a.type = function(c) {
            return arguments.length ? (b = za(c), a) : b
        }, a.size = function(b) {
            return arguments.length ? (c = za(b), a) : c
        }, a
    };
    var Ii = bg.map({
        circle: Pf,
        cross: function(a) {
            var b = Math.sqrt(a / 5) / 2;
            return "M" + -3 * b + "," + -b + "H" + -b + "V" + -3 * b + "H" + b + "V" + -b + "H" + 3 * b + "V" + b + "H" + b + "V" + 3 * b + "H" + -b + "V" + b + "H" + -3 * b + "Z"
        },
        diamond: function(a) {
            var b = Math.sqrt(a / (2 * Ki)),
                c = b * Ki;
            return "M0," + -b + "L" + c + ",0 0," + b + " " + -c + ",0Z"
        },
        square: function(a) {
            var b = Math.sqrt(a) / 2;
            return "M" + -b + "," + -b + "L" + b + "," + -b + " " + b + "," + b + " " + -b + "," + b + "Z"
        },
        "triangle-down": function(a) {
            var b = Math.sqrt(a / Ji),
                c = b * Ji / 2;
            return "M0," + c + "L" + b + "," + -c + " " + -b + "," + -c + "Z"
        },
        "triangle-up": function(a) {
            var b = Math.sqrt(a / Ji),
                c = b * Ji / 2;
            return "M0," + -c + "L" + b + "," + c + " " + -b + "," + c + "Z"
        }
    });
    bg.svg.symbolTypes = Ii.keys();
    var Ji = Math.sqrt(3),
        Ki = Math.tan(30 * Ng);
    zg.transition = function(a) {
        for (var b, c, d = Li || ++Pi, e = Uf(a), f = [], g = Mi || {
                time: Date.now(),
                ease: yd,
                delay: 0,
                duration: 250
            }, h = -1, i = this.length; ++h < i;) {
            f.push(b = []);
            for (var j = this[h], k = -1, l = j.length; ++k < l;)(c = j[k]) && Vf(c, k, e, d, g), b.push(c)
        }
        return Rf(f, e, d)
    }, zg.interrupt = function(a) {
        return this.each(null == a ? Ni : Qf(Uf(a)))
    };
    var Li, Mi, Ni = Qf(Uf()),
        Oi = [],
        Pi = 0;
    Oi.call = zg.call, Oi.empty = zg.empty, Oi.node = zg.node, Oi.size = zg.size, bg.transition = function(a, b) {
        return a && a.transition ? Li ? a.transition(b) : a : Cg.transition(a)
    }, bg.transition.prototype = Oi, Oi.select = function(a) {
        var b, c, d, e = this.id,
            f = this.namespace,
            g = [];
        a = z(a);
        for (var h = -1, i = this.length; ++h < i;) {
            g.push(b = []);
            for (var j = this[h], k = -1, l = j.length; ++k < l;)(d = j[k]) && (c = a.call(d, d.__data__, k, h)) ? ("__data__" in d && (c.__data__ = d.__data__), Vf(c, k, f, e, d[f][e]), b.push(c)) : b.push(null)
        }
        return Rf(g, f, e)
    }, Oi.selectAll = function(a) {
        var b, c, d, e, f, g = this.id,
            h = this.namespace,
            i = [];
        a = A(a);
        for (var j = -1, k = this.length; ++j < k;)
            for (var l = this[j], m = -1, n = l.length; ++m < n;)
                if (d = l[m]) {
                    f = d[h][g], c = a.call(d, d.__data__, m, j), i.push(b = []);
                    for (var o = -1, p = c.length; ++o < p;)(e = c[o]) && Vf(e, o, h, g, f), b.push(e)
                }
        return Rf(i, h, g)
    }, Oi.filter = function(a) {
        var b, c, d, e = [];
        "function" != typeof a && (a = M(a));
        for (var f = 0, g = this.length; g > f; f++) {
            e.push(b = []);
            for (var c = this[f], h = 0, i = c.length; i > h; h++)(d = c[h]) && a.call(d, d.__data__, h, f) && b.push(d)
        }
        return Rf(e, this.namespace, this.id)
    }, Oi.tween = function(a, b) {
        var c = this.id,
            d = this.namespace;
        return arguments.length < 2 ? this.node()[d][c].tween.get(a) : O(this, null == b ? function(b) {
            b[d][c].tween.remove(a)
        } : function(e) {
            e[d][c].tween.set(a, b)
        })
    }, Oi.attr = function(a, b) {
        function c() {
            this.removeAttribute(h)
        }

        function d() {
            this.removeAttributeNS(h.space, h.local)
        }

        function e(a) {
            return null == a ? c : (a += "", function() {
                var b, c = this.getAttribute(h);
                return c !== a && (b = g(c, a), function(a) {
                    this.setAttribute(h, b(a))
                })
            })
        }

        function f(a) {
            return null == a ? d : (a += "", function() {
                var b, c = this.getAttributeNS(h.space, h.local);
                return c !== a && (b = g(c, a), function(a) {
                    this.setAttributeNS(h.space, h.local, b(a))
                })
            })
        }
        if (arguments.length < 2) {
            for (b in a) this.attr(b, a[b]);
            return this
        }
        var g = "transform" == a ? Od : rd,
            h = bg.ns.qualify(a);
        return Sf(this, "attr." + a, b, h.local ? f : e)
    }, Oi.attrTween = function(a, b) {
        function c(a, c) {
            var d = b.call(this, a, c, this.getAttribute(e));
            return d && function(a) {
                this.setAttribute(e, d(a))
            }
        }

        function d(a, c) {
            var d = b.call(this, a, c, this.getAttributeNS(e.space, e.local));
            return d && function(a) {
                this.setAttributeNS(e.space, e.local, d(a))
            }
        }
        var e = bg.ns.qualify(a);
        return this.tween("attr." + a, e.local ? d : c)
    }, Oi.style = function(a, b, c) {
        function d() {
            this.style.removeProperty(a)
        }

        function e(b) {
            return null == b ? d : (b += "", function() {
                var d, e = gg.getComputedStyle(this, null).getPropertyValue(a);
                return e !== b && (d = rd(e, b), function(b) {
                    this.style.setProperty(a, d(b), c)
                })
            })
        }
        var f = arguments.length;
        if (3 > f) {
            if ("string" != typeof a) {
                2 > f && (b = "");
                for (c in a) this.style(c, a[c], b);
                return this
            }
            c = ""
        }
        return Sf(this, "style." + a, b, e)
    }, Oi.styleTween = function(a, b, c) {
        function d(d, e) {
            var f = b.call(this, d, e, gg.getComputedStyle(this, null).getPropertyValue(a));
            return f && function(b) {
                this.style.setProperty(a, f(b), c)
            }
        }
        return arguments.length < 3 && (c = ""), this.tween("style." + a, d)
    }, Oi.text = function(a) {
        return Sf(this, "text", a, Tf)
    }, Oi.remove = function() {
        var a = this.namespace;
        return this.each("end.transition", function() {
            var b;
            this[a].count < 2 && (b = this.parentNode) && b.removeChild(this)
        })
    }, Oi.ease = function(a) {
        var b = this.id,
            c = this.namespace;
        return arguments.length < 1 ? this.node()[c][b].ease : ("function" != typeof a && (a = bg.ease.apply(bg, arguments)), O(this, function(d) {
            d[c][b].ease = a
        }))
    }, Oi.delay = function(a) {
        var b = this.id,
            c = this.namespace;
        return arguments.length < 1 ? this.node()[c][b].delay : O(this, "function" == typeof a ? function(d, e, f) {
            d[c][b].delay = +a.call(d, d.__data__, e, f)
        } : (a = +a, function(d) {
            d[c][b].delay = a
        }))
    }, Oi.duration = function(a) {
        var b = this.id,
            c = this.namespace;
        return arguments.length < 1 ? this.node()[c][b].duration : O(this, "function" == typeof a ? function(d, e, f) {
            d[c][b].duration = Math.max(1, a.call(d, d.__data__, e, f))
        } : (a = Math.max(1, a), function(d) {
            d[c][b].duration = a
        }))
    }, Oi.each = function(a, b) {
        var c = this.id,
            d = this.namespace;
        if (arguments.length < 2) {
            var e = Mi,
                f = Li;
            try {
                Li = c, O(this, function(b, e, f) {
                    Mi = b[d][c], a.call(b, b.__data__, e, f)
                })
            } finally {
                Mi = e, Li = f
            }
        } else O(this, function(e) {
            var f = e[d][c];
            (f.event || (f.event = bg.dispatch("start", "end", "interrupt"))).on(a, b)
        });
        return this
    }, Oi.transition = function() {
        for (var a, b, c, d, e = this.id, f = ++Pi, g = this.namespace, h = [], i = 0, j = this.length; j > i; i++) {
            h.push(a = []);
            for (var b = this[i], k = 0, l = b.length; l > k; k++)(c = b[k]) && (d = c[g][e], Vf(c, k, g, f, {
                time: d.time,
                ease: d.ease,
                delay: d.delay + d.duration,
                duration: d.duration
            })), a.push(c)
        }
        return Rf(h, g, f)
    }, bg.svg.axis = function() {
        function a(a) {
            a.each(function() {
                var a, j = bg.select(this),
                    k = this.__chart__ || c,
                    l = this.__chart__ = c.copy(),
                    m = null == i ? l.ticks ? l.ticks.apply(l, h) : l.domain() : i,
                    n = null == b ? l.tickFormat ? l.tickFormat.apply(l, h) : Aa : b,
                    o = j.selectAll(".tick").data(m, l),
                    p = o.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Hg),
                    q = bg.transition(o.exit()).style("opacity", Hg).remove(),
                    r = bg.transition(o.order()).style("opacity", 1),
                    s = Math.max(e, 0) + g,
                    t = Le(l),
                    u = j.selectAll(".domain").data([0]),
                    v = (u.enter().append("path").attr("class", "domain"), bg.transition(u));
                p.append("line"), p.append("text");
                var w, x, y, z, A = p.select("line"),
                    B = r.select("line"),
                    C = o.select("text").text(n),
                    D = p.select("text"),
                    E = r.select("text"),
                    F = "top" === d || "left" === d ? -1 : 1;
                if ("bottom" === d || "top" === d ? (a = Wf, w = "x", y = "y", x = "x2", z = "y2", C.attr("dy", 0 > F ? "0em" : ".71em").style("text-anchor", "middle"), v.attr("d", "M" + t[0] + "," + F * f + "V0H" + t[1] + "V" + F * f)) : (a = Xf, w = "y", y = "x", x = "y2", z = "x2", C.attr("dy", ".32em").style("text-anchor", 0 > F ? "end" : "start"), v.attr("d", "M" + F * f + "," + t[0] + "H0V" + t[1] + "H" + F * f)), A.attr(z, F * e), D.attr(y, F * s), B.attr(x, 0).attr(z, F * e), E.attr(w, 0).attr(y, F * s), l.rangeBand) {
                    var G = l,
                        H = G.rangeBand() / 2;
                    k = l = function(a) {
                        return G(a) + H
                    }
                } else k.rangeBand ? k = l : q.call(a, l, k);
                p.call(a, k, l), r.call(a, l, l)
            })
        }
        var b, c = bg.scale.linear(),
            d = Qi,
            e = 6,
            f = 6,
            g = 3,
            h = [10],
            i = null;
        return a.scale = function(b) {
            return arguments.length ? (c = b, a) : c
        }, a.orient = function(b) {
            return arguments.length ? (d = b in Ri ? b + "" : Qi, a) : d
        }, a.ticks = function() {
            return arguments.length ? (h = arguments, a) : h
        }, a.tickValues = function(b) {
            return arguments.length ? (i = b, a) : i
        }, a.tickFormat = function(c) {
            return arguments.length ? (b = c, a) : b
        }, a.tickSize = function(b) {
            var c = arguments.length;
            return c ? (e = +b, f = +arguments[c - 1], a) : e
        }, a.innerTickSize = function(b) {
            return arguments.length ? (e = +b, a) : e
        }, a.outerTickSize = function(b) {
            return arguments.length ? (f = +b, a) : f
        }, a.tickPadding = function(b) {
            return arguments.length ? (g = +b, a) : g
        }, a.tickSubdivide = function() {
            return arguments.length && a
        }, a
    };
    var Qi = "bottom",
        Ri = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
    bg.svg.brush = function() {
        function a(f) {
            f.each(function() {
                var f = bg.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", e).on("touchstart.brush", e),
                    g = f.selectAll(".background").data([0]);
                g.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), f.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var h = f.selectAll(".resize").data(o, Aa);
                h.exit().remove(), h.enter().append("g").attr("class", function(a) {
                    return "resize " + a
                }).style("cursor", function(a) {
                    return Si[a]
                }).append("rect").attr("x", function(a) {
                    return /[ew]$/.test(a) ? -3 : null
                }).attr("y", function(a) {
                    return /^[ns]/.test(a) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), h.style("display", a.empty() ? "none" : null);
                var k, l = bg.transition(f),
                    m = bg.transition(g);
                i && (k = Le(i), m.attr("x", k[0]).attr("width", k[1] - k[0]), c(l)), j && (k = Le(j), m.attr("y", k[0]).attr("height", k[1] - k[0]), d(l)), b(l)
            })
        }

        function b(a) {
            a.selectAll(".resize").attr("transform", function(a) {
                return "translate(" + k[+/e$/.test(a)] + "," + l[+/^s/.test(a)] + ")"
            })
        }

        function c(a) {
            a.select(".extent").attr("x", k[0]), a.selectAll(".extent,.n>rect,.s>rect").attr("width", k[1] - k[0])
        }

        function d(a) {
            a.select(".extent").attr("y", l[0]), a.selectAll(".extent,.e>rect,.w>rect").attr("height", l[1] - l[0])
        }

        function e() {
            function e() {
                32 == bg.event.keyCode && (C || (s = null, E[0] -= k[1], E[1] -= l[1], C = 2), v())
            }

            function o() {
                32 == bg.event.keyCode && 2 == C && (E[0] += k[1], E[1] += l[1], C = 0, v())
            }

            function p() {
                var a = bg.mouse(u),
                    e = !1;
                t && (a[0] += t[0], a[1] += t[1]), C || (bg.event.altKey ? (s || (s = [(k[0] + k[1]) / 2, (l[0] + l[1]) / 2]), E[0] = k[+(a[0] < s[0])], E[1] = l[+(a[1] < s[1])]) : s = null), A && q(a, i, 0) && (c(y), e = !0), B && q(a, j, 1) && (d(y), e = !0), e && (b(y), x({
                    type: "brush",
                    mode: C ? "move" : "resize"
                }))
            }

            function q(a, b, c) {
                var d, e, h = Le(b),
                    i = h[0],
                    j = h[1],
                    o = E[c],
                    p = c ? l : k,
                    q = p[1] - p[0];
                return C && (i -= o, j -= q + o), d = (c ? n : m) ? Math.max(i, Math.min(j, a[c])) : a[c], C ? e = (d += o) + q : (s && (o = Math.max(i, Math.min(j, 2 * s[c] - d))), d > o ? (e = d, d = o) : e = o), p[0] != d || p[1] != e ? (c ? g = null : f = null, p[0] = d, p[1] = e, !0) : void 0
            }

            function r() {
                p(), y.style("pointer-events", "all").selectAll(".resize").style("display", a.empty() ? "none" : null), bg.select("body").style("cursor", null), F.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), D(), x({
                    type: "brushend"
                })
            }
            var s, t, u = this,
                w = bg.select(bg.event.target),
                x = h.of(u, arguments),
                y = bg.select(u),
                z = w.datum(),
                A = !/^(n|s)$/.test(z) && i,
                B = !/^(e|w)$/.test(z) && j,
                C = w.classed("extent"),
                D = U(),
                E = bg.mouse(u),
                F = bg.select(gg).on("keydown.brush", e).on("keyup.brush", o);
            if (bg.event.changedTouches ? F.on("touchmove.brush", p).on("touchend.brush", r) : F.on("mousemove.brush", p).on("mouseup.brush", r), y.interrupt().selectAll("*").interrupt(), C) E[0] = k[0] - E[0], E[1] = l[0] - E[1];
            else if (z) {
                var G = +/w$/.test(z),
                    H = +/^n/.test(z);
                t = [k[1 - G] - E[0], l[1 - H] - E[1]], E[0] = k[G], E[1] = l[H]
            } else bg.event.altKey && (s = E.slice());
            y.style("pointer-events", "none").selectAll(".resize").style("display", null), bg.select("body").style("cursor", w.style("cursor")), x({
                type: "brushstart"
            }), p()
        }
        var f, g, h = x(a, "brushstart", "brush", "brushend"),
            i = null,
            j = null,
            k = [0, 0],
            l = [0, 0],
            m = !0,
            n = !0,
            o = Ti[0];
        return a.event = function(a) {
            a.each(function() {
                var a = h.of(this, arguments),
                    b = {
                        x: k,
                        y: l,
                        i: f,
                        j: g
                    },
                    c = this.__chart__ || b;
                this.__chart__ = b, Li ? bg.select(this).transition().each("start.brush", function() {
                    f = c.i, g = c.j, k = c.x, l = c.y, a({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var c = sd(k, b.x),
                        d = sd(l, b.y);
                    return f = g = null,
                        function(e) {
                            k = b.x = c(e), l = b.y = d(e), a({
                                type: "brush",
                                mode: "resize"
                            })
                        }
                }).each("end.brush", function() {
                    f = b.i, g = b.j, a({
                        type: "brush",
                        mode: "resize"
                    }), a({
                        type: "brushend"
                    })
                }) : (a({
                    type: "brushstart"
                }), a({
                    type: "brush",
                    mode: "resize"
                }), a({
                    type: "brushend"
                }))
            })
        }, a.x = function(b) {
            return arguments.length ? (i = b, o = Ti[!i << 1 | !j], a) : i
        }, a.y = function(b) {
            return arguments.length ? (j = b, o = Ti[!i << 1 | !j], a) : j
        }, a.clamp = function(b) {
            return arguments.length ? (i && j ? (m = !!b[0], n = !!b[1]) : i ? m = !!b : j && (n = !!b), a) : i && j ? [m, n] : i ? m : j ? n : null
        }, a.extent = function(b) {
            var c, d, e, h, m;
            return arguments.length ? (i && (c = b[0], d = b[1], j && (c = c[0], d = d[0]), f = [c, d], i.invert && (c = i(c), d = i(d)), c > d && (m = c, c = d, d = m), (c != k[0] || d != k[1]) && (k = [c, d])), j && (e = b[0], h = b[1], i && (e = e[1], h = h[1]), g = [e, h], j.invert && (e = j(e), h = j(h)), e > h && (m = e, e = h, h = m), (e != l[0] || h != l[1]) && (l = [e, h])), a) : (i && (f ? (c = f[0], d = f[1]) : (c = k[0], d = k[1], i.invert && (c = i.invert(c), d = i.invert(d)), c > d && (m = c, c = d, d = m))), j && (g ? (e = g[0], h = g[1]) : (e = l[0], h = l[1], j.invert && (e = j.invert(e), h = j.invert(h)), e > h && (m = e, e = h, h = m))), i && j ? [
                [c, e],
                [d, h]
            ] : i ? [c, d] : j && [e, h])
        }, a.clear = function() {
            return a.empty() || (k = [0, 0], l = [0, 0], f = g = null), a
        }, a.empty = function() {
            return !!i && k[0] == k[1] || !!j && l[0] == l[1]
        }, bg.rebind(a, h, "on")
    };
    var Si = {
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        },
        Ti = [
            ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
            ["e", "w"],
            ["n", "s"],
            []
        ],
        Ui = lh.format = rh.timeFormat,
        Vi = Ui.utc,
        Wi = Vi("%Y-%m-%dT%H:%M:%S.%LZ");
    Ui.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Yf : Wi, Yf.parse = function(a) {
        var b = new Date(a);
        return isNaN(b) ? null : b
    }, Yf.toString = Wi.toString, lh.second = Na(function(a) {
        return new mh(1e3 * Math.floor(a / 1e3))
    }, function(a, b) {
        a.setTime(a.getTime() + 1e3 * Math.floor(b))
    }, function(a) {
        return a.getSeconds()
    }), lh.seconds = lh.second.range, lh.seconds.utc = lh.second.utc.range, lh.minute = Na(function(a) {
        return new mh(6e4 * Math.floor(a / 6e4))
    }, function(a, b) {
        a.setTime(a.getTime() + 6e4 * Math.floor(b))
    }, function(a) {
        return a.getMinutes()
    }), lh.minutes = lh.minute.range, lh.minutes.utc = lh.minute.utc.range, lh.hour = Na(function(a) {
        var b = a.getTimezoneOffset() / 60;
        return new mh(36e5 * (Math.floor(a / 36e5 - b) + b))
    }, function(a, b) {
        a.setTime(a.getTime() + 36e5 * Math.floor(b))
    }, function(a) {
        return a.getHours()
    }), lh.hours = lh.hour.range, lh.hours.utc = lh.hour.utc.range, lh.month = Na(function(a) {
        return a = lh.day(a), a.setDate(1), a
    }, function(a, b) {
        a.setMonth(a.getMonth() + b)
    }, function(a) {
        return a.getMonth()
    }), lh.months = lh.month.range, lh.months.utc = lh.month.utc.range;
    var Xi = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        Yi = [
            [lh.second, 1],
            [lh.second, 5],
            [lh.second, 15],
            [lh.second, 30],
            [lh.minute, 1],
            [lh.minute, 5],
            [lh.minute, 15],
            [lh.minute, 30],
            [lh.hour, 1],
            [lh.hour, 3],
            [lh.hour, 6],
            [lh.hour, 12],
            [lh.day, 1],
            [lh.day, 2],
            [lh.week, 1],
            [lh.month, 1],
            [lh.month, 3],
            [lh.year, 1]
        ],
        Zi = Ui.multi([
            [".%L", function(a) {
                return a.getMilliseconds()
            }],
            [":%S", function(a) {
                return a.getSeconds()
            }],
            ["%I:%M", function(a) {
                return a.getMinutes()
            }],
            ["%I %p", function(a) {
                return a.getHours()
            }],
            ["%a %d", function(a) {
                return a.getDay() && 1 != a.getDate()
            }],
            ["%b %d", function(a) {
                return 1 != a.getDate()
            }],
            ["%B", function(a) {
                return a.getMonth()
            }],
            ["%Y", Cb]
        ]),
        $i = {
            range: function(a, b, c) {
                return bg.range(Math.ceil(a / c) * c, +b, c).map($f)
            },
            floor: Aa,
            ceil: Aa
        };
    Yi.year = lh.year, lh.scale = function() {
        return Zf(bg.scale.linear(), Yi, Zi)
    };
    var _i = Yi.map(function(a) {
            return [a[0].utc, a[1]]
        }),
        aj = Vi.multi([
            [".%L", function(a) {
                return a.getUTCMilliseconds()
            }],
            [":%S", function(a) {
                return a.getUTCSeconds()
            }],
            ["%I:%M", function(a) {
                return a.getUTCMinutes()
            }],
            ["%I %p", function(a) {
                return a.getUTCHours()
            }],
            ["%a %d", function(a) {
                return a.getUTCDay() && 1 != a.getUTCDate()
            }],
            ["%b %d", function(a) {
                return 1 != a.getUTCDate()
            }],
            ["%B", function(a) {
                return a.getUTCMonth()
            }],
            ["%Y", Cb]
        ]);
    _i.year = lh.year.utc, lh.scale.utc = function() {
        return Zf(bg.scale.linear(), _i, aj)
    }, bg.text = Ba(function(a) {
        return a.responseText
    }), bg.json = function(a, b) {
        return Ca(a, "application/json", _f, b)
    }, bg.html = function(a, b) {
        return Ca(a, "text/html", ag, b)
    }, bg.xml = Ba(function(a) {
        return a.responseXML
    }), "function" == typeof define && define.amd ? define(bg) : "object" == typeof module && module.exports && (module.exports = bg), this.d3 = bg
}();
