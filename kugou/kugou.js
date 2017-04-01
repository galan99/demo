function sdnClick(e, t) {
	if (t = t || !0) try {
		setTimeout(function() {
			(new Image).src = "http://sdn.kugou.com/link.aspx?id=" + e + "&url=&t=" + Math.random()
		}, 0)
	} catch (e) {} else try {
		(new Image).src = "http://sdn.kugou.com/link.aspx?id=" + e + "&url=&t=" + Math.random()
	} catch (e) {}
}

function logClick(e, t) {
	if (t = t || !0) try {
		setTimeout(function() {
			(new Image).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + e + "&d=" + Math.random()
		}, 0)
	} catch (e) {} else try {
		(new Image).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + e + "&d=" + Math.random()
	} catch (e) {}
}

function phpLogClick(e, t) {
	if (t = t || !0) try {
		setTimeout(function() {
			(new Image).src = "http://tj.kugou.com/front/link.php?id=" + e + "&d=" + Math.random()
		}, 0)
	} catch (e) {} else try {
		(new Image).src = "http://tj.kugou.com/front/link.php?id=" + e + "&d=" + Math.random()
	} catch (e) {}
}

function pageInit() {
	phpLogClick(4242), playerModule.init(), pageModule.init(), Kg.$(window).addEvent("scroll", function() {
		pageModule.init(), toTopModule.showHideTop(), commonModule.topShowBg()
	})
}
try {
	document.execCommand("BackgroundImageCache", !1, !0)
} catch (e) {}
String.prototype.getBytes = function() {
	for (var e = 0, t = 0, n = this.length; t < n; t++) e += this.charCodeAt(t) > 256 ? 2 : 1;
	return e
}, String.prototype.replaceChar = function() {
	return this.replace(/&nbsp;/g, "&amp;nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}, String.prototype.trim = function() {
	return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g, "")
}, String.prototype.intercept = function(e, t) {
	var n = this;
	if (n = n.trim(), n.getBytes() < e) return n;
	var a = 0,
		r = 0;
	t.length > 0 && (e -= t.length);
	for (var o = 0; o < n.length && (a += this.charCodeAt(o) > 256 ? 2 : 1, !(a > e)); o++) r++;
	return n.substr(0, r) + t
}, String.prototype.encode = function() {
	return encodeURIComponent(encodeURIComponent(this))
};
var Kg = Kg || {
	Ver: 2,
	UA: {
		Ie: !!document.all,
		Ie6: !!document.all && !window.XMLHttpRequest,
		Ie7: !!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
		Ie8: !!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
		FF: /firefox/gi.test(window.navigator.userAgent),
		Opera: /opera/gi.test(window.navigator.userAgent),
		Chrom: /Chrom/gi.test(window.navigator.userAgent),
		Maxthon: /Maxthon/gi.test(window.navigator.userAgent)
	},
	$: function(e) {
		var t = [];
		if ("string" == typeof e) {
			e = e.trim();
			for (var n = e.split(","), a = 0, r = n.length; a < r; a++) t = t.concat(Kg.$S(n[a]));
			Kg.extend(t, Kg, !0)
		} else e instanceof Array || "object" == typeof e && e.length ? (t = e, Kg.extend(t, Kg, !0)) : (t.push(e), Kg.extend(t, Kg, !0));
		return t
	},
	$S: function(e, t) {
		for (var n = e.split(/\s+/g), t = t || [], a = 0, r = n.length; a < r; a++) {
			var o = [];
			if (/^\*$/.test(n[a])) {
				if (t.length > 0)
					for (var i = 0, s = t.length; i < s; i++) o = o.concat(this.$T("*", t[i]));
				else o = this.$T("*");
				t = o
			} else if (/#/.test(n[a])) {
				var l = n[a].split("#");
				Kg.$I(l[1]) && o.push(Kg.$I(l[1])), t = o
			} else if (/\./.test(n[a])) {
				var c = n[a].split("."),
					u = c[1],
					l = c[0];
				if (t.length > 0)
					for (var i = 0, s = t.length; i < s; i++) o = o.concat(this.$C(u, t[i]));
				else o = this.$C(u);
				if (l.length > 0) {
					for (var d = [], i = 0, s = o.length; i < s; i++) o[i].tagName.toLowerCase() == l && d.push(o[i]);
					t = d
				} else t = o
			} else {
				var l = n[a];
				if (t.length > 0) {
					for (var i = 0, s = t.length; i < s; i++) o = o.concat(this.$T(l, t[i]));
					t = o
				} else t = this.$T(l)
			}
		}
		return t
	},
	$I: function() {
		for (var e = [], t = 0, n = arguments.length; t < n; t++) {
			var a = arguments[t];
			if ("string" == typeof a && (a = document.getElementById(a)), 1 == n) return a;
			e.push(a)
		}
		return e
	},
	$T: function(e, t) {
		var n = (this.$I(t) || document).getElementsByTagName(e || "*");
		return this.$A(n)
	},
	$C: function(e, t, n) {
		var a = [],
			r = 0;
		if (document.getElementsByClassName) {
			var o = this.$I(t || document).getElementsByClassName(e);
			if (o = this.$A(o), n && "*" !== n)
				for (var i = o.length; r < i; r++) o[r].tagName.toLowerCase() === n.toLowerCase() && a.push(o[r]);
			else a = o
		} else
			for (var o = this.$T(n, t), i = o.length; r < i; r++) new RegExp("\\b" + e + "\\b", "g").test(o[r].className) && a.push(o[r]);
		return a
	},
	$A: function(e) {
		for (var t = [], n = 0, a = e.length; n < a; n++) t.push(e[n]);
		return t
	},
	index: function() {
		var e = -1;
		if (this.length > 0) {
			for (var t = this[0], n = [], a = t.parentNode.childNodes, r = 0, o = a.length; r < o; r++) a[r].tagName == t.tagName && n.push(a[r]);
			e = Kg.indexOf(n, t)
		}
		return e
	},
	attr: function(e, t) {
		if (this.UA.Ie && (e = {
				for: "htmlFor",
				class: "className"
			}[e] || e), void 0 != t) {
			for (var n = 0, a = this.length; n < a; n++) "checked" == e ? this[n][e] = t : this[n].setAttribute(e, t);
			return this
		}
		return this[0].getAttribute(e)
	},
	addClass: function(e, t) {
		if (t) t.className += " " + e;
		else
			for (var n = 0, a = this.length; n < a; n++) this[n].className += " " + e;
		return this
	},
	removeClass: function(e, t) {
		if (t) t.className = t.className.replace(new RegExp("\\b" + e + "\\b", "g"), "");
		else
			for (var n = 0, a = this.length; n < a; n++) this[n].className = this[n].className.replace(new RegExp("\\b" + e + "\\b", "g"), "");
		return this
	},
	toggleClass: function(e) {
		for (var t = 0, n = this.length; t < n; t++) {
			var a = this[t];
			this.hasClass(e, a) ? this.removeClass(e, a) : this.addClass(e, a)
		}
		return Kg
	},
	hasClass: function(e, t) {
		return new RegExp("\\b" + e + "\\b").test((t || this[0]).className)
	},
	html: function(e) {
		if (null == e) return this[0].innerHTML;
		for (var t = 0, n = this.length; t < n; t++) this[t].innerHTML = e;
		return this
	},
	val: function(e) {
		if (null == e) return this[0].value;
		for (var t = 0, n = this.length; t < n; t++) this[t].value = e;
		return this
	},
	eq: function(e) {
		var t = this[e];
		return this.length = 0, this.push(t), this
	},
	parent: function() {
		for (var e = 0, t = this.length; e < t; e++) {
			var n = this[e];
			this[e] = n.parentNode
		}
		return this
	},
	next: function() {
		for (var e = 0; e < this.length; e++) {
			for (var t = this[e], n = t.nextSibling; n && 1 != n.nodeType;) n = n.nextSibling;
			n && 1 == n.nodeType ? this[e] = n : (this.splice(e, 1), e--)
		}
		return this
	},
	prev: function() {
		for (var e = 0; e < this.length; e++) {
			for (var t = this[e], n = t.previousSibling; n && 1 != n.nodeType;) n = n.previousSibling;
			n && 1 == n.nodeType ? this[e] = n : (this.splice(e, 1), e--)
		}
		return this
	},
	find: function(e) {
		var t = Kg.$S(e, this);
		return Kg.extend(t, Kg), t
	},
	remove: function() {
		for (var e = 0, t = this.length; e < t; e++) {
			var n = this[e];
			n.parentNode.removeChild(n)
		}
		return this.length = 0, Kg
	},
	css: function(e, t) {
		if ("string" == typeof e) {
			if (null == t) return this.getStyle(this[0], e);
			for (var n = 0, a = this.length; n < a; n++) {
				var r = e.replace(/-(\w)/, function(e, t) {
					return t.toUpperCase()
				});
				this[n].style[r] = t
			}
		} else
			for (var o in e)
				for (var n = 0, a = this.length; n < a; n++) {
					var r = o.replace(/-(\w)/, function(e, t) {
						return t.toUpperCase()
					});
					this[n].style[r] = e[o]
				}
		return this
	},
	show: function() {
		return this.css("display", "block"), this
	},
	hide: function() {
		return this.css("display", "none"), this
	},
	each: function(e, t) {
		var n = func = null;
		1 == arguments.length ? (n = this, func = e) : 2 == arguments.length && (n = e, func = t);
		for (var a = 0, r = n.length; a < r; a++) func.call(n[a], a, n[a]);
		return this
	},
	append: function(e, t) {
		t = t || "last";
		var n = null;
		if ("string" == typeof e) {
			var a = /^<([^>]+)>(.+?)<\/\w+>$/,
				r = e.match(a),
				o = r[2],
				i = r[1].match(/^\w+\b/),
				s = r[1].replace(/^\w+\b/, "").trim().match(/\b(\w+)=("[^"]+"|'[^']+\')/g);
			n = document.createElement(i);
			for (var l = 0, c = s.length; l < c; l++) {
				var u = s[l].split("=");
				if (/^style$/i.test(u[0])) n.style.cssText = u[1].substring(1, u[1].length - 1);
				else {
					if (this.UA.Ie) var d = {
						for: "htmlFor",
						class: "className"
					}[u[0]] || u[0];
					else var d = u[0];
					n.setAttribute(d, u[1].substring(1, u[1].length - 1))
				}
			}
			n.innerHTML = o
		} else n = e;
		for (var l = 0, c = this.length; l < c; l++) {
			var f = this[l];
			if ("last" == t) f.appendChild(n);
			else if ("first" == t) {
				var g = f.childNodes[0];
				f.insertBefore(n, g)
			} else if ("before" == t) {
				var h = f.parentNode;
				h.insertBefore(n, f)
			}
		}
		return this
	},
	prepend: function(e) {
		return this.append(e, "first")
	},
	insertBefore: function(e) {
		return this.append(e, "before")
	},
	extend: function(e, t, n) {
		for (var a in t) n ? e[a] = t[a] : e[a] || (e[a] = t[a]);
		return e
	},
	getStyle: function(e, t) {
		return e = this.$I(e), "float" === t && (t = Kg.UA.Ie ? "styleFloat" : "cssFloat"), t = t.replace(/-(\w)/, function(e, t) {
			return t.toUpperCase()
		}), Kg.UA.Ie ? e.currentStyle[t] : window.getComputedStyle(e, null)[t]
	},
	getBodySize: function() {
		if ("BackCompat" == document.compatMode) var e = document.body.clientHeight,
			t = document.body.clientWidth,
			n = document.body.scrollHeight,
			a = document.body.scrollWidth,
			r = document.body.scrollTop,
			o = document.body.scrollLeft;
		else if ("CSS1Compat" == document.compatMode) var e = document.documentElement.clientHeight,
			t = document.documentElement.clientWidth,
			n = document.documentElement.scrollHeight,
			a = document.documentElement.scrollWidth,
			r = document.body.scrollTop || document.documentElement.scrollTop,
			o = document.body.scrollLeft || document.documentElement.scrollLeft;
		return {
			cH: e,
			cW: t,
			sH: n,
			sW: a,
			sT: r,
			sL: o
		}
	},
	getXY: function(e) {
		e = e ? this.$I(e) : this[0];
		var t = this.getBodySize(),
			n = e.getBoundingClientRect();
		return {
			left: t.sL + n.left,
			right: t.sL + n.right,
			top: t.sT + n.top,
			bottom: t.sT + n.bottom
		}
	},
	isFather: function(e, t, n) {
		if (e = this.$I(e), t = this.$I(t), n && e == t) return !0;
		if (e.compareDocumentPosition) return 20 == e.compareDocumentPosition(t);
		for (; t && t.parentNode;)
			if (t = t.parentNode, t == e) return !0;
		return !1
	},
	addEvent: function(e, t, n) {
		if (3 == arguments.length) e = this.$I(e), e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
		else
			for (var a = 0, r = this.length; a < r; a++) {
				var o = this[a];
				this.addEvent(o, arguments[0], Kg.bind(arguments[1], o))
			}
		return this
	},
	removeEvent: function(e, t, n) {
		if (3 == arguments.length) e = this.$I(e), e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
		else
			for (var a = 0, r = this.length; a < r; a++) {
				var o = this[a];
				this.removeEvent(o, arguments[0], Kg.bind(arguments[1], o))
			}
		return this
	},
	bind: function(e, t) {
		var n = Array.prototype.slice.call(arguments, 2);
		return function() {
			e.apply(t, n.concat(Array.prototype.slice.call(arguments)))
		}
	},
	stopEvent: function(e) {
		return e = window.event || e, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, Kg
	},
	inArray: function(e, t) {
		for (var n = 0, a = e.length; n < a; n++)
			if (e[n] === t) return !0;
		return !1
	},
	indexOf: function(e, t) {
		for (var n = 0, a = e.length; n < a; n++)
			if (e[n] === t) return n;
		return -1
	},
	setOpacity: function(e, t) {
		return e = this.$I(e), document.all ? e.style.filter = "Alpha(Opacity=" + t + ")" : e.style.opacity = t / 100, e
	},
	fadein: function(e, t, n, a) {
		t = t || 1, n = n || 1, e = this.$I(e);
		var r = 0,
			o = Kg,
			i = setInterval(function() {
				o.setOpacity(e, r += n), r >= 100 && (clearInterval(i), a && a(e))
			}, t);
		return i
	},
	fadeout: function(e, t, n, a) {
		t = t || 1, n = n || 1, e = this.$I(e);
		var r = 100,
			o = Kg,
			i = setInterval(function() {
				o.setOpacity(e, r -= n), r <= 0 && (clearInterval(i), a && a(e))
			}, t);
		return i
	},
	slide: function(e, t, n, a, r, o, i) {
		e = this.$I(e), r = r || .1;
		var s = "",
			l = e;
		"height" !== t && "width" !== t && "top" !== t && "bottom" !== t && "left" !== t && "right" !== t || (e = e.style, s = "px");
		var c = setInterval(function() {
			n > a ? (n -= Math.ceil((n - a) * r), e[t] = n + s, i && i(l), n <= a && (clearInterval(c), o && o(l))) : (n += Math.ceil((a - n) * r), e[t] = n + s, i && i(l), n >= a && (clearInterval(c), o && o(l)))
		}, 1);
		return c
	},
	JSON: function() {
		function f(e) {
			return e < 10 ? "0" + e : e
		}

		function stringify(e, t) {
			var n, a, r, o, i, s = /["\\\x00-\x1f\x7f-\x9f]/g;
			switch (typeof e) {
				case "string":
					return s.test(e) ? '"' + e.replace(s, function(e) {
						var t = m[e];
						return t ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
					}) + '"' : '"' + e + '"';
				case "number":
					return isFinite(e) ? String(e) : "null";
				case "boolean":
				case "null":
					return String(e);
				case "object":
					if (!e) return "null";
					if ("function" == typeof e.toJSON) return stringify(e.toJSON());
					if (n = [], "number" == typeof e.length && !e.propertyIsEnumerable("length")) {
						for (o = e.length, a = 0; a < o; a += 1) n.push(stringify(e[a], t) || "null");
						return "[" + n.join(",") + "]"
					}
					if (t)
						for (o = t.length, a = 0; a < o; a += 1) r = t[a], "string" == typeof r && (i = stringify(e[r], t), i && n.push(stringify(r) + ":" + i));
					else
						for (r in e) "string" == typeof r && (i = stringify(e[r], t), i && n.push(stringify(r) + ":" + i));
					return "{" + n.join(",") + "}"
			}
		}
		Date.prototype.toJSON = function() {
			return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
		};
		var m = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		};
		return {
			stringify: stringify,
			parse: function(text, filter) {
				function walk(e, t) {
					var n, a;
					if (t && "object" == typeof t)
						for (n in t) Object.prototype.hasOwnProperty.apply(t, [n]) && (a = walk(n, t[n]), void 0 !== a ? t[n] = a : delete t[n]);
					return filter(e, t)
				}
				var j;
				if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof filter ? walk("", j) : j;
				throw new SyntaxError("parseJSON")
			}
		}
	}(),
	Cookie: {
		write: function(e, t, n, a, r, o) {
			/^\w*$/.test(e) || alert("cookie格式不正确"), /; /.test(t) && alert("cookie格式不正确");
			var i = e + "=" + t;
			if (n) {
				var s = new Date;
				s.setTime(s.getTime() + 1e3 * n), i += "; expires=" + s.toGMTString()
			}
			a && (i += "; path=" + a), r && (i += "; domain=" + r), o && (i += "; secure"), document.cookie = i
		},
		rewriteKey: function(e, t, n, a, r, o, i) {
			var s = t;
			if (n) {
				var l = this.read(e),
					c = new RegExp("\\b" + t + "=([^&]*)\\b", "g");
				s = l.replace(c, function(e, t) {
					return e.replace(t, n)
				})
			}
			/^\d+(s|m|h|d)$/i.test(a) ? (/^\d+s$/i.test(a) && this.setSec(e, s, a.replace(/s$/i, ""), r, o, i), /^\d+m$/i.test(a) && this.setMin(e, s, a.replace(/m$/i, ""), r, o, i), /^\d+h$/i.test(a) && this.setHour(e, s, a.replace(/h$/i, ""), r, o, i), /^\d+d$/i.test(a) && this.setDay(e, s, a.replace(/d$/i, ""), r, o, i)) : this.write(e, s, a, r, o, i)
		},
		setDay: function(e, t, n, a, r, o) {
			this.write(e, t, 24 * n * 60 * 60, a, r, o)
		},
		setHour: function(e, t, n, a, r, o) {
			this.write(e, t, 60 * n * 60, a, r, o)
		},
		setMin: function(e, t, n, a, r, o) {
			this.write(e, t, 60 * n, a, r, o)
		},
		setSec: function(e, t, n, a, r, o) {
			this.write(e, t, n, a, r, o)
		},
		read: function(e, t, n) {
			for (var a = "", r = document.cookie.split("; "), o = 0; o < r.length; o++) {
				var i = r[o].match(/^(\w+)=(.+)$/);
				if (i && i.length > 1 && i[1] == e) {
					a = i[2];
					break
				}
			}
			return t ? n ? Kg.JSON.parse(a)[t] : (new Kg.Param).parse(a)[t] : a
		},
		remove: function(e, t, n) {
			var a = e + "=";
			t && (a += "; path=" + t), n && (a += ";domain=" + n), a += "; expires=Fri, 02-Jan-1970 00:00:00 GMT", document.cookie = a
		}
	},
	Param: function() {
		var e = [],
			t = {};
		this.parse = function(e) {
			for (var n = e.split("&"), a = 0, r = n.length; a < r; a++) {
				var o = n[a].split("=");
				t[o[0]] = o[1]
			}
			return t
		}, this.toString = function(t) {
			return t = t || "&", e.join(t)
		}, this.add = function(t, n) {
			var a = t + "=" + n;
			return e.push(a), this
		}
	},
	Ajax: function(e, t, n, a, r, o, i) {
		if (1 == arguments.length) var s = arguments[0],
			e = s.method,
			t = s.url,
			n = s.async,
			a = s.args || "",
			r = s.callback,
			l = s.callbackName || "callback",
			c = s.callbackFuncName,
			o = s.error,
			i = s.docType;
		var u = a || "";
		if (n = null == n || n, a && "object" == typeof a) {
			var d = "";
			for (var f in a) d += f + "=" + a[f] + "&";
			u = d.substr(0, d.length - 1)
		}
		if (e = e ? e.toUpperCase() : "POST", i = i ? i.toLowerCase() : "text", "jsonp" == i) {
			var g = "";
			return g = c ? c : "kgJSONP" + Math.random().toString().substr(2, 9), window[g] = r, u = u.length > 0 ? u + "&" + l + "=" + g : l + "=" + g, void this.loadScript(t, u)
		}
		var h = null;
		if (window.XMLHttpRequest && !window.ActiveXObject) h = new XMLHttpRequest;
		else if (window.ActiveXObject) try {
			h = new ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {
			try {
				h = new ActiveXObject("Msxml2.XMLHTTP")
			} catch (e) {
				h = null
			}
		}
		return h.onreadystatechange = function() {
			if (4 == h.readyState)
				if (200 == h.status || 0 == h.status) {
					var e = null;
					switch (i) {
						case "xml":
							e = h.responseXML;
							break;
						case "json":
							e = Kg.JSON.parse(h.responseText);
							break;
						default:
							e = h.responseText
					}
					r && r(e, h), h = null
				} else o && o()
		}, "GET" == e ? (t.indexOf("?") != -1 ? h.open(e, t + (u ? "&" + u : ""), n) : h.open(e, t + (u ? "?" + u : ""), n), h.send(null)) : (h.open(e, t, n), h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.send(u)), h
	},
	get: function(e, t, n, a, r) {
		return this.Ajax("get", e, r, t, n, a)
	},
	post: function(e, t, n, a, r) {
		return this.Ajax("post", e, r, t, n, a)
	},
	getJSON: function(e, t, n, a, r) {
		return this.Ajax("get", e, r, t, n, a, "json")
	},
	postJSON: function(e, t, n, a, r) {
		return this.Ajax("post", e, r, t, n, a, "json")
	},
	loadScript: function(e, t, n) {
		var a = t || "";
		if (t && "object" == typeof t) {
			var r = "";
			for (var o in t) r += o + "=" + t[o] + "&";
			a = r.substr(0, r.length - 1)
		}
		a = a.trim();
		var i = document.createElement("script");
		i.type = "text/javascript", i.src = e + (a ? "?" + a : ""), i.onload = i.onreadystatechange = function() {
			this.readyState && "complete" != this.readyState && "loaded" != this.readyState || (n && n(), i.onreadystatechange = i.onload = null, i = null)
		}, document.getElementsByTagName("head")[0].appendChild(i)
	},
	flash: {
		ready: !1,
		hasFlash: !1,
		version: 0,
		init: function() {
			try {
				if (window.ActiveXObject) {
					var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (e) {
						this.hasFlash = !0;
						var t = e.GetVariable("$version"),
							n = t.split(" ")[1].split(",");
						this.version = parseFloat(n[0] + "." + n[1])
					}
				} else if (navigator.plugins && navigator.plugins.length > 0) {
					var e = navigator.plugins["Shockwave Flash"];
					if (e) {
						this.hasFlash = !0;
						for (var a = e.description.split(" "), r = 0; r < a.length; r++) isNaN(parseFloat(a[r])) || (this.version = parseFloat(a[r]))
					}
				}
				this.ready = !0
			} catch (e) {}
		},
		getStr: function(e, t, n, a, r) {
			this.init();
			var o = "",
				i = {
					flashvars: "",
					wmode: "",
					allowFullScreen: !1,
					version: "10"
				};
			return r = r || {}, Kg.extend(i, r, !0), this.hasFlash && this.version > i.version ? (o += '<object id="' + e + '" name="' + e + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.32" width="' + n + '" height="' + a + '">', o += '<param name="bgColor" value="#666666" />', o += '<param name="movie" value="' + t + '" />', o += '<param name="flashvars" value="' + i.flashvars + '" />', o += '<param name="quality" value="high" />', o += '<param name="allowScriptAccess" value="always" />', o += '<param name="WMODE" value="' + i.wmode + '"/>', o += '<param name="allowFullScreen" value="' + i.allowFullScreen + '">', o += '<embed name="' + e + '" src="' + t + '" width="' + n + '"  height="' + a + '" allowScriptAccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + i.flashvars + '" type="application/x-shockwave-flash" wmode="' + i.wmode + '" allowFullScreen="' + i.allowFullScreen + '"></embed>', o += "</object>") : o += '您没有安装flash或者您的flash版本不足，请先<a href="http://get.adobe.com/cn/flashplayer/?promoid=JZEFT" target="_blank">安装</a>。', o
		},
		write: function(e, t, n, a, r) {
			document.write(this.getStr(e, t, n, a, r))
		},
		getObj: function(e) {
			return Kg.UA.FF ? document[e][1] : Kg.UA.Ie ? window[e] : window[e][1]
		},
		Ajax: function(e, t, n, a, r) {
			var o = this,
				i = Kg.$("Ajax-flash-object");
			if (i) 1 == this.ready && this.getObj("KugouAjaxFlash").SetParameters(t, n, a, r);
			else {
				var i = document.createElement("div");
				i.id = "Ajax-flash-object", document.body.appendChild(i), i.innerHTML = this.getStr("KugouAjaxFlash", e, 1, 1, {
					flashvars: "ini=Kg.flash.init"
				});
				var s = setInterval(function() {
					var e = o.getObj("KugouAjaxFlash");
					e && e.SetParameters && (clearInterval(s), e.SetParameters(t, n, a, r))
				}, 100)
			}
		}
	},
	request: {
		hash: function(e) {
			var t = location.hash.replace("#", "");
			if (e) {
				var n = (new Kg.Param).parse(t);
				return n[e]
			}
			return t
		},
		search: function(e) {
			var t = location.search.replace("?", "");
			if (e) {
				var n = (new Kg.Param).parse(t);
				return n[e]
			}
			return t
		}
	},
	bubbleSort: function(e, t, n) {
		for (var e = [].concat(e), a = [], r = 0; r < e.length; r++) {
			for (var o = r + 1; o < e.length; o++) {
				if (t) {
					if (parseInt(e[r][t]) > parseInt(e[o][t])) break
				} else if (e[r] > e[o]) break;
				o == e.length - 1 && (a.push(e[r]), e.splice(r, 1), r = -1)
			}
			r == e.length - 1 && (a.push(e[r]), e.splice(r, 1), r = -1)
		}
		return n ? a.reverse() : a
	},
	placeholder: function(e, t, n) {
		e = this.$I(e), e.onfocus = function() {
			e.value == e.defaultValue && (e.value = "", e.style.color = t)
		}, e.onblur = function() {
			"" == e.value && (e.value = e.defaultValue, e.style.color = n)
		}
	}
};
! function() {
	function e() {
		var e = {
				"&": "&#38;",
				"<": "&#60;",
				">": "&#62;",
				'"': "&#34;",
				"'": "&#39;",
				"/": "&#47;"
			},
			t = /&(?!#?\w+;)|<|>|"|'|\//g;
		return function() {
			return this ? this.replace(t, function(t) {
				return e[t] || t
			}) : this
		}
	}

	function t(e, n, a) {
		return ("string" == typeof n ? n : n.toString()).replace(e.define || i, function(t, n, r, o) {
			return 0 === n.indexOf("def.") && (n = n.substring(4)), n in a || (":" === r ? (e.defineParams && o.replace(e.defineParams, function(e, t, r) {
				a[n] = {
					arg: t,
					text: r
				}
			}), n in a || (a[n] = o)) : new Function("def", "def['" + n + "']=" + o)(a)), ""
		}).replace(e.use || i, function(n, r) {
			e.useParams && (r = r.replace(e.useParams, function(e, t, n, r) {
				if (a[n] && a[n].arg && r) return e = (n + ":" + r).replace(/'|\\/g, "_"), a.__exp = a.__exp || {}, a.__exp[e] = a[n].text.replace(RegExp("(^|[^\\w$])" + a[n].arg + "([^\\w$])", "g"), "$1" + r + "$2"), t + "def.__exp['" + e + "']"
			}));
			var o = new Function("def", "return " + r)(a);
			return o ? t(e, o, a) : o
		})
	}

	function n(e) {
		return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
	}
	var a, r = {
		version: "1.0.1",
		templateSettings: {
			evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
			interpolate: /\{\{=([\s\S]+?)\}\}/g,
			encode: /\{\{!([\s\S]+?)\}\}/g,
			use: /\{\{#([\s\S]+?)\}\}/g,
			useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
			define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
			defineParams: /^\s*([\w$]+):([\s\S]+)/,
			conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
			iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			varname: "it",
			strip: !0,
			append: !0,
			selfcontained: !1
		},
		template: void 0,
		compile: void 0
	};
	"undefined" != typeof module && module.exports ? module.exports = r : "function" == typeof define && define.amd ? define(function() {
		return r
	}) : (a = function() {
		return this || (0, eval)("this")
	}(), a.doT = r), String.prototype.encodeHTML = e();
	var o = {
			append: {
				start: "'+(",
				end: ")+'",
				endencode: "||'').toString().encodeHTML()+'"
			},
			split: {
				start: "';out+=(",
				end: ");out+='",
				endencode: "||'').toString().encodeHTML();out+='"
			}
		},
		i = /$^/;
	r.template = function(a, s, l) {
		s = s || r.templateSettings;
		var c, u, d = s.append ? o.append : o.split,
			f = 0;
		a = s.use || s.define ? t(s, a, l || {}) : a, a = ("var out='" + (s.strip ? a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : a).replace(/'|\\/g, "\\$&").replace(s.interpolate || i, function(e, t) {
			return d.start + n(t) + d.end
		}).replace(s.encode || i, function(e, t) {
			return c = !0, d.start + n(t) + d.endencode
		}).replace(s.conditional || i, function(e, t, a) {
			return t ? a ? "';}else if(" + n(a) + "){out+='" : "';}else{out+='" : a ? "';if(" + n(a) + "){out+='" : "';}out+='"
		}).replace(s.iterate || i, function(e, t, a, r) {
			return t ? (f += 1, u = r || "i" + f, t = n(t), "';var arr" + f + "=" + t + ";if(arr" + f + "){var " + a + "," + u + "=-1,l" + f + "=arr" + f + ".length-1;while(" + u + "<l" + f + "){" + a + "=arr" + f + "[" + u + "+=1];out+='") : "';} } out+='"
		}).replace(s.evaluate || i, function(e, t) {
			return "';" + n(t) + "out+='"
		}) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|\}|^|\{)out\+=''\+/g, "$1out+="), c && s.selfcontained && (a = "String.prototype.encodeHTML=(" + e.toString() + "());" + a);
		try {
			return new Function(s.varname, a)
		} catch (e) {
			throw "undefined" != typeof console && console.log("Could not create a template function: " + a), e
		}
	}, r.compile = function(e, t) {
		return r.template(e, null, t)
	}
}(), doT.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		encode: /<%!([\s\S]+?)%>/g,
		use: /<%#([\s\S]+?)%>/g,
		define: /<%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#%>/g,
		conditional: /<%\?(\?)?\s*([\s\S]*?)\s*%>/g,
		iterate: /<%~\s*(?:%>|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*%>)/g,
		varname: "it",
		strip: !0,
		append: !0,
		selfcontained: !1
	},
	function() {
		var e = function(t) {
			return this instanceof e ? (this.setOpt(t || {}), this) : new e(t)
		};
		return e.prototype = {
			father: null,
			bar: null,
			isMove: !1,
			startX: 0,
			maxW: 0,
			fLeft: 0,
			pre: 0,
			startEvent: "touchstart",
			moveEvent: "touchmove",
			upEvent: "touchend",
			cancelEvent: "touchcancel",
			setOpt: function(e) {
				var t = this;
				t.opt = {
					fatherId: null,
					barId: null,
					afterFunc: null,
					moveFunc: null,
					startFunc: null
				};
				for (var n in e) t.opt[n] = e[n];
				t.father = Kg.$("#" + t.opt.fatherId), t.bar = Kg.$("#" + t.opt.barId), t.maxW = t.father[0].offsetWidth, t.fLeft = t.father[0].getBoundingClientRect().left, t.bind()
			},
			dcBind: function() {
				var e = this,
					t = document,
					n = function(n) {
						t.removeEventListener(e.moveEvent, a, !1), e.isMove && e.opt.afterFunc && e.opt.afterFunc(e.pre), e.isMove = !1
					},
					a = function(t) {
						var n = e.bar[0].offsetWidth;
						if ("touchmove" == e.moveEvent) {
							if (t.targetTouches.length > 0) {
								var a = t.targetTouches[0];
								n = a.pageX - e.fLeft
							}
						} else n = t.clientX - e.fLeft;
						e.isMove && (n < 0 ? n = 0 : n > e.maxW && (n = e.maxW), e.maxW > 0 ? e.pre = n / e.maxW : e.pre = 0, e.bar.css("width", 100 * e.pre + "%"), e.opt.moveFunc && e.opt.moveFunc(e.pre)), t.preventDefault()
					};
				t.addEventListener("touchmove", a, !1), t.addEventListener("touchend", n, !1), t.addEventListener("touchcancel", n, !1)
			},
			bind: function() {
				var e = this,
					t = function(t) {
						t = window.event || t;
						var n = t.clientX || t.targetTouches[0].pageX,
							a = e.bar[0].offsetWidth;
						e.startX = n, e.isMove = !0, a = n - e.fLeft, a < 0 ? a = 0 : a > e.maxW && (a = e.maxW), e.maxW > 0 ? e.pre = a / e.maxW : e.pre = 0, e.opt.startFunc && e.opt.startFunc(e.pre), e.bar.css("width", 100 * e.pre + "%"), e.dcBind(), t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, t.preventDefault()
					};
				document.getElementById("timeWrap").addEventListener(e.startEvent, t, !1), e.father[0].addEventListener(e.startEvent, t, !1), e.bar[0].addEventListener(e.startEvent, t, !1), window.addEventListener("resize", function() {
					e.maxW = e.father[0].offsetWidth, e.fLeft = e.father[0].getBoundingClientRect().left
				}, !1)
			}
		}, window.BarMove = e
	}(),
	function() {
		LRC = function() {
			this.initialize.apply(this, arguments)
		}, LRC.prototype = {
			arrLyricTime: [],
			arrLyric: [],
			initialize: function(e) {
				this.lyricWrapper = e.lyricWrapper, this.curRowClassName = e.curRowClassName, this.separator = e.separator, this.wordTime = -1, this.arrLyricTime = [], this.arrLyric = [], this.initArray(e.lyric), this.arrLyricTime = this.sort(this.arrLyricTime), this.setLyricTable(this.arrLyric)
			},
			initArray: function(e) {
				for (var t = new RegExp("\\[[0-9:.]*\\]", "g"), n = e.split(this.separator), a = 0, r = 0, o = 0; o < n.length; o++) {
					var i = n[o].replace(/\[[\w\W]*\]/g, "").trim();
					if ("" !== i)
						for (this.arrLyric[o - r] = i; null !== (lrc_result = t.exec(n[o]));) {
							var s = this.parseSecond(lrc_result.toString().replace(/\[|\]/g, ""));
							isNaN(s) || (this.arrLyricTime[a] = o - r + "|" + s, a++)
						} else r++
				}
			},
			IsLyricValid: function(e) {
				return this.arrLyricTime.length > 0
			},
			DoSync: function(e) {
				clearInterval(this.wordTime);
				for (var t = this.arrLyricTime, n = 0; n < t.length; n++) {
					var a = t[n].split("|");
					if (0 === n && e < a[1]) break;
					if ("undefined" == typeof t[n + 1]) {
						this.setRow(a[0]);
						break
					}
					var r = t[n + 1].split("|");
					if (e >= a[1] && e < r[1]) {
						this.setRow(a[0]);
						break
					}
				}
			},
			parseSecond: function(e) {
				try {
					var t = e.split(":");
					return 60 * parseInt(t[0], 10) + parseFloat(t[1])
				} catch (e) {
					return 0
				}
			},
			setLyricTable: function(e) {
				var t = "";
				this.lyricWrapper.scrollTop = 0, this.lyricWrapper.innerHTML = "";
				for (var n = 0; n < e.length; n++) t += "<p>" + e[n] + "</p>";
				this.lyricWrapper.innerHTML = t;
				var a = this.lyricWrapper.getElementsByTagName("p"),
					r = a[0].offsetHeight,
					o = 0;
				this.outLrc || (this.outLrc = this.lyricWrapper.parentNode), o = Math.floor(this.outLrc.clientHeight / r), this.lyricWrapper.style.height = r * o + "px"
			},
			setRow: function(e) {
				this.setRowClass(e), this.setScroll(e)
			},
			setRowClass: function(e) {
				var t = this.lyricWrapper.getElementsByTagName("p"),
					n = t.length;
				if (n < 1) return !1;
				for (var a = 0; a < n; a++) t[a].className = "";
				t[e].className = this.curRowClassName, t[e].scrollWidth > t[e].offsetWidth && (this.wordTime = setInterval(function() {
					t[e].scrollLeft++
				}, 1e3))
			},
			setScroll: function(e) {
				var t = this.lyricWrapper.getElementsByTagName("p"),
					n = t.length;
				if (n < 1) return !1;
				var a = t[0].offsetHeight,
					r = 0;
				this.outLrc || (this.outLrc = this.lyricWrapper.parentNode), r = Math.floor(this.outLrc.clientHeight / a), this.lyricWrapper.style.height = a * r + "px", this.lyricWrapper.scrollTop = t[e].offsetTop - t[0].offsetTop - t[e].offsetHeight * Math.floor(r / 2)
			},
			sort: function(e) {
				for (var t = 0; t < e.length - 1; t++)
					for (var n = t + 1; n < e.length; n++) {
						var a = parseFloat(e[t].split("|")[1]),
							r = parseFloat(e[n].split("|")[1]);
						if (a > r) {
							var o = e[t];
							e[t] = e[n], e[n] = o
						}
					}
				return e
			}
		};
		var e = function() {
			if (!(this instanceof e)) return new e
		};
		e.prototype = {
			extend: function(e, t, n) {
				for (var a in t) n ? e[a] = t[a] : e[a] || (e[a] = t[a]);
				return e
			},
			formatNumber: function(e) {
				return e.toString().length < 2 ? "0" + e : e
			},
			formatData: function(e) {
				e = parseInt(e, 10);
				var t = this.formatNumber(Math.floor(e / 60)),
					n = this.formatNumber(Math.floor(e % 60));
				return t + ":" + n
			},
			addZero: function(e) {
				return e.toString().length <= 1 ? "0" + e : e
			},
			isIOS: function() {
				return !!(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
			},
			isKnowAdr: function() {
				return !(!navigator.userAgent.match(/HUAWEI/i) && !navigator.userAgent.match(/Chrome/i))
			},
			isCanPlayAudio: function() {
				return !!document.createElement("audio").canPlayType("audio/mpeg")
			},
			formatImgSize: function(e) {
				size = e.size || 400;
				var t = e.img;
				return t && (t = t.replace(/softhead\/\d+\//, "softhead/" + size + "/")), t
			}
		};
		var t = function(n) {
			var a = this;
			return this instanceof t ? (a.utils = e(), a.init(n), this) : new t(n)
		};
		t.prototype = {
			ver: "1",
			cacheList: {},
			_default: {
				fatherId: "player",
				playId: "kugou",
				currentTime: "current_time",
				totalTime: "total_time",
				btnNext: "play_next",
				btnMain: "play_main",
				playClass: "play",
				pauseClass: "pause",
				loadClass: "load",
				btnMode: "play_mode",
				songName: "song_name",
				singerName: "singer_name",
				fullName: "songname",
				playBarPlay: "play_bar_play",
				playBarLoad: "play_bar_load",
				songLrc: "song_lrc",
				isShowLrc: !1,
				songCover: "song_cover",
				defCover: "http://m.kugou.com/static/images/share2014/list/cover.png",
				isSongCover: !1,
				songCls: "songsList",
				curPlayCls: "cur",
				songsListExt: "songs_",
				loadName: "loading",
				isCycle: !0,
				isAuto: !1,
				playMode: "list",
				isPlayRadio: !1,
				isPlayRing: !1,
				playBarFather: "progressBar",
				isBarMove: !1,
				playStaticId: null,
				derection: "next"
			},
			prevSong: function() {
				var e = this;
				curIndex = e.curIndex, e.derection = "prev", e._default.isPlayRadio && e.getFmSongs(), e.curIndex--, e.curIndex >= 0 ? e.create() : (e.curIndex = e.songsList.length - 1, e.create())
			},
			nextSong: function() {
				var e = this;
				curIndex = e.curIndex, e.derection = "next", e._default.isPlayRadio && e.getFmSongs(), e.curIndex++, e.curIndex < e.songsList.length ? e.create() : (e.curIndex = 0, e.create())
			},
			getFmSongs: function() {},
			cusload: function() {},
			cusPlay: function() {},
			loadStart: function() {
				var e = this;
				e.utils.isIOS() || e.utils.isKnowAdr() ? e.isFirst || !e.isAuto ? e.cusload() : e.isFirst = !0 : e.cusload()
			},
			playStart: function(e) {
				var t = this;
				t.cusPlay(e)
			},
			play: function() {
				try {
					clearInterval(this.playSt), clearInterval(this.loadSt)
				} catch (e) {}
				var e = this,
					t = document;
				t.getElementById(e._default.playId) && t.getElementById(e._default.playId).play()
			},
			pause: function() {
				var e = this,
					t = document;
				try {
					t.getElementById(e._default.playId).pause()
				} catch (e) {}
			},
			setLoadProgress: function() {
				var e = this;
				document.getElementById(e._default.playBarLoad);
				try {
					var t = Math.ceil(document.getElementById(e._default.playId).duration);
					document.getElementById(e._default.playBarLoad).style.width = Math.ceil(e.getCurrentBufferedTime() / t * 100) + "%", Math.ceil(e.getCurrentBufferedTime()) >= t && e.clearInterval(e.loadSt)
				} catch (e) {}
			},
			setPlayProgress: function() {
				var e = this,
					t = {};
				t = e.songsList[e.curIndex];
				try {
					document.getElementById(e._default.playBarPlay).style.width = e.getCurrentTime() / t.timeLength * 100 + "%"
				} catch (e) {}
			},
			createCallback: function(e) {
				var t = this,
					n = document;
				t.utils.isIOS() || t.utils.isKnowAdr() ? n.getElementById(t._default.playId).src = e : (n.getElementById(t._default.fatherId).innerHTML = '<audio id="' + t._default.playId + '" src="' + e + '" autoplay="autoplay"></audio>', t.bindAudio()), t.utils.isIOS() && n.getElementById(t._default.playId).pause(), n.getElementById(t._default.playId).play(), n.getElementById(t._default.songLrc) && t.getLrc(), t.setSongHead(), t._default.playStaticId && phpLogClick(t._default.playStaticId)
			},
			getSongInfo: function(e, t) {
				var n = this,
					a = location.href.indexOf("singer") > -1 ? "singer" : "mkugou";
				Kg.getJSON("http://m.kugou.com/app/i/getSongInfo.php", {
					cmd: "playInfo",
					hash: e.hash,
					from: a
				}, function(a) {
					var r = a.ctype;
					if (Kg.$("." + n._default.curPlayCls).attr("ctype", r), "1003" == r || "1000" == r || "1001" == r || "1002" == r || "1004" == r) n.isLoadSrc = !1, t ? "1003" == r ? showHideUI.show("dialogFeeDownload") : showHideUI.show("dialogNotDownload") : "prev" == n.derection ? n.prevSong() : n.nextSong();
					else {
						if (t && "none" == Kg.$("#ftPlayer").css("display") && (showHideUI.show("ftPlayer"), Kg.$(".js-bd-box").addClass("bd-bottom")), n.songsList[n.curIndex].hash && n.songsList[n.curIndex].hash.toUpperCase() != a.hash.toUpperCase()) return;
						a && 1 == a.status && (src = a.url, n.songsList[n.curIndex].src = src, n.songsList[n.curIndex].timeLength = a.timeLength, n.songsList[n.curIndex].filename = unescape(e.filename) || a.fileName, n.cacheList[e.hash] = {
							src: src,
							timeLength: a.length,
							filename: unescape(e.filename) || a.fileName
						}, n.createCallback(src))
					}
				}, "", !1)
			},
			create: function(e) {
				var t = this,
					n = document,
					a = {},
					r = "",
					o = "";
				if (!t.isLoadSrc) {
					if (t.isLoadSrc = !0, a = t.songsList[t.curIndex], n.getElementById(t._default.playId).removeAttribute("src"), !t.utils.isCanPlayAudio()) return void alert("此款手机不支持HTML5播放");
					!a.hash || t._default.isPlayRadio || t._default.isPlayRing || (o = t._default.songsListExt + a.hash.toUpperCase(), Kg.$("." + t._default.songCls).removeClass(t._default.curPlayCls), Kg.$("#" + o).addClass(t._default.curPlayCls)), t.cacheList[a.hash] ? (r = t.cacheList[a.hash].src, t.createCallback(r)) : t._default.isPlayRing ? (r = a.songurl, t.songsList[t.curIndex].src = r, t.songsList[t.curIndex].timeLength = 0, t.songsList[t.curIndex].filename = a.filename, t.createCallback(r)) : a.hash ? t.getSongInfo(a, e) : (r = a.songurl, t.songsList[t.curIndex].src = r, t.songsList[t.curIndex].timeLength = a.timeLength, t.songsList[t.curIndex].filename = a.filename, t.createCallback(r))
				}
			},
			setSongHead: function() {
				var e = this,
					t = document,
					n = "",
					a = 0,
					r = {};
				r = e.songsList[e.curIndex], r.filename && (n = r.filename.split(/\s?-\s?/), n.length < 2 && (n = r.filename.split(/-/))),
					a = r.timeLength, e._default.isSongCover && (r.filename ? document.title = r.filename + " - 酷狗音乐 让音乐改变世界" : document.title = "酷狗音乐 让音乐改变世界"), t.getElementById(e._default.fullName) && (t.getElementById(e._default.fullName).innerHTML = r.filename), t.getElementById(e._default.songName) && n[1] && (t.getElementById(e._default.songName).innerHTML = n[1]), t.getElementById(e._default.singerName) && n[0] && (t.getElementById(e._default.singerName).innerHTML = n[0]), t.getElementById(e._default.currentTime) && (t.getElementById(e._default.currentTime).innerHTML = "00:00", t.getElementById(e._default.totalTime).innerHTML = e.utils.addZero(Math.floor(a / 60)) + ":" + e.utils.addZero(Math.floor(a % 60))), t.getElementById(e._default.playBarPlay) && (t.getElementById(e._default.playBarPlay).style.width = "0"), t.getElementById(e._default.playBarLoad) && (t.getElementById(e._default.playBarLoad).style.width = "0"), e._default.isSongCover && Kg.getJSON("http://m.kugou.com/app/i/getSingerHead_new.php", {
						singerName: n[0],
						size: a
					}, function(t) {
						var n = e._default.defCover;
						t && (n = e.utils.formatImgSize({
							img: t.url
						})), document.getElementById(e._default.songCover) && (document.getElementById(e._default.songCover).src = n)
					})
			},
			getBufferedTime: function() {
				var e = this,
					t = {};
				t = e.songsList[e.curIndex];
				var n = Math.ceil(e.getCurrentBufferedTime());
				return n > t.timeLength && (n = t.timeLength), n
			},
			getPlayTime: function() {
				var e = this,
					t = {};
				t = e.songsList[e.curIndex];
				var n = Math.ceil(e.getCurrentTime());
				n > t.timeLength && (n = t.timeLength);
				var a = Math.floor(n / 60),
					r = n % 60;
				return e.utils.addZero(a) + ":" + e.utils.addZero(r)
			},
			getCurrentTime: function() {
				try {
					return document.getElementById(this._default.playId).currentTime
				} catch (e) {}
				return 0
			},
			getCurrentBufferedTime: function() {
				try {
					return document.getElementById(this._default.playId).buffered.end(0)
				} catch (e) {}
				return 0
			},
			addSongsAndPlay: function(e) {
				var t = this;
				e && (e.write ? t.songsList = e.songs : t.songsList = t.songsList.concat(e.songs), t.songsList.length > 0 && (t.curIndex = 0, t.create()))
			},
			addSongsNoPlay: function(e) {
				var t = this;
				e && (e.write ? t.songsList = e.songs : t.songsList = t.songsList.concat(e.songs))
			},
			getLrc: function() {
				try {
					clearInterval(this.lrcSt)
				} catch (e) {}
				var e = this,
					t = document,
					n = {},
					a = {};
				a = e.songsList[e.curIndex], t.getElementById(e._default.songLrc).style.scrollTop = "0px", a.lrc ? (e.uiLRC = new LRC({
					lyric: a.lrc,
					lyricWrapper: t.getElementById(e._default.songLrc),
					curRowClassName: "current",
					separator: "\r\n"
				}), e.getLrcStatus()) : (n = {
					cmd: 100,
					keyword: unescape(a.filename),
					hash: a.hash,
					timelength: 1e3 * a.timeLength,
					d: Math.random()
				}, Kg.get("http://m.kugou.com/app/i/krc.php", n, function(n) {
					n && "" !== n.trim() ? (e.uiLRC = new LRC({
						lyric: n,
						lyricWrapper: t.getElementById(e._default.songLrc),
						curRowClassName: "current",
						separator: "\r\n"
					}), e.getLrcStatus()) : t.getElementById(e._default.songLrc).innerHTML = '<div class="nolrc">酷狗音乐，让音乐改变世界！</div>'
				}))
			},
			getLrcStatus: function() {
				var e = this;
				e.uiLRC && e.uiLRC.IsLyricValid() && (e.lrcSt = setInterval(function() {
					e.uiLRC.DoSync(e.getCurrentTime())
				}, 200))
			},
			bindAudio: function() {
				var e = this,
					t = document;
				e.isInClient || (Kg.$("#" + e._default.playId).addEvent("ended", function() {
					e._default.isCycle && "list" == e._default.playMode ? e.nextSong() : e._default.isCycle ? document.getElementById(e._default.playId).play() : e.ended && e.ended()
				}), Kg.$("#" + e._default.playId).addEvent("pause", function() {
					Kg.$(e._default.btnMain)[0] && (Kg.$(e._default.btnMain).addClass(e._default.playClass), Kg.$(e._default.btnMain).removeClass(e._default.pauseClass)), e.playStart("pause")
				}), Kg.$("#" + e._default.playId).addEvent("play", function() {
					Kg.$(e._default.btnMain)[0] && (Kg.$(e._default.btnMain).addClass(e._default.pauseClass), Kg.$(e._default.btnMain).removeClass(e._default.playClass)), e.playing && e.playing()
				}), Kg.$("#" + e._default.playId).addEvent("error", function() {
					e.playStart("error")
				}), Kg.$("#" + e._default.playId).addEvent("timeupdate", function() {
					e._default.isBarMove || (t.getElementById(e._default.currentTime) && (t.getElementById(e._default.currentTime).innerHTML = e.getPlayTime()), e.setPlayProgress(), e.getLrcStatus(), e.setLoadProgress())
				}), Kg.$("#" + e._default.playId).addEvent("loadstart", function() {
					e.loadStart(), e.isLoadSrc = !1
				}), Kg.$("#" + e._default.playId).addEvent("canplay", function() {
					e.isLoadSrc = !1, e.playStart()
				}), Kg.$("#" + e._default.playId).addEvent("suspend", function() {
					e.playStart()
				}), Kg.$("#" + e._default.playId).addEvent("loadeddata", function() {
					document.getElementById(e._default.playId).play()
				}))
			},
			bind: function() {
				var e = this,
					t = document;
				Kg.$(e._default.btnMain)[0] && Kg.$(e._default.btnMain).addEvent("click", function() {
					e.songsList && e.songsList.length > 0 && e.curIndex != -1 && (this.className.indexOf(e._default.playClass) > -1 ? e.play() : e.pause())
				}), Kg.$(e._default.btnPrev)[0] && Kg.$(e._default.btnPrev).addEvent("click", function() {
					e.prevSong()
				}), Kg.$(e._default.btnNext)[0] && Kg.$(e._default.btnNext).addEvent("click", function() {
					e.nextSong()
				});
				var n = function(n) {
					try {
						var a = parseInt(t.getElementById(e._default.playId).duration, 10);
						if (!isNaN(a)) {
							var r = Math.ceil(a * n);
							t.getElementById(e._default.currentTime).innerHTML = e.getPlayTime(r), e.getLrcStatus(r)
						}
					} catch (e) {}
				};
				if (document.getElementById(e._default.playBarPlay)) {
					BarMove({
						fatherId: e._default.playBarFather,
						barId: e._default.playBarPlay,
						startFunc: function(t) {
							e._default.isBarMove = !0, n(t)
						},
						moveFunc: function(t) {
							e._default.isBarMove = !0, n(t)
						},
						afterFunc: function(n) {
							e._default.isBarMove = !1;
							try {
								var a = parseInt(t.getElementById(e._default.playId).duration, 10);
								if (!isNaN(a)) {
									var r = Math.ceil(a * n);
									t.getElementById(e._default.currentTime).innerHTML = e.getPlayTime(r), t.getElementById(e._default.playBarLoad).style.width = 100 * n + "%", t.getElementById(e._default.playId).currentTime = a * n
								}
							} catch (e) {}
						}
					})
				}
				e.bindAudio()
			},
			createAudio: function() {
				var e = this,
					t = document;
				if (!t.getElementById(e._default.fatherId)) {
					var n = document.createElement("div");
					n.id = e._default.fatherId, n.style.display = "none", e._default.isAuto ? n.innerHTML = '<audio id="' + e._default.playId + '" autoplay height="100%" width="100%" controls></audio>' : n.innerHTML = '<audio id="' + e._default.playId + '" height="100%" width="100%" controls></audio>', t.body.appendChild(n)
				}
			},
			init: function(e) {
				var t = this;
				document;
				return t.songsList = [], t.curIndex = -1, t.uiLRC = null, e && t.utils.extend(t._default, e, !0), t.createAudio(), t.bind(), this
			}
		}, window.Player = t
	}();
var dialogUI = function(e) {
		function t(t, n) {
			e.$("#" + t).show(), n && n()
		}

		function n(t, n) {
			e.$("#" + t).hide(), n && n()
		}
		return e.$("body")[0].addEventListener("click", function(e) {
			var n, a = e.target;
			"dialog" == a.getAttribute("data-show") && (n = a.getAttribute("data-dialog-id"), t(n))
		}, !1), e.$(".js-dialog-hide").addEvent("click", function(t) {
			n(e.$(this).attr("data-dialog-id"))
		}), {
			show: t,
			hide: n
		}
	}(Kg),
	downloadModule = function(e) {
		function t(e) {
			var t = "kugou://start.weixin" + (e ? "?" + e : ""),
				n = /qqdownloader/gi.test(window.navigator.userAgent),
				a = n ? "tmast://appdetails?pname=com.kugou.android&scene=20280504" : "http://downmobile.kugou.com/promote/package/download/channel=6",
				o = document.createElement("iframe");
			document.getElementById("pageSingerInfo") && (a = "http://downmobile.kugou.com/promote/package/download/channel=128");
			var i = window.location.href,
				s = /frombaidu/g,
				l = /from_sogou/g,
				c = /from_360/g,
				u = /fromweixin/g;
			if (1 == s.test(i)) var a = "http://downmobile.kugou.com/promote/package/download/channel=376";
			else if (1 == l.test(i)) var a = "http://m.kugou.com/download/oi7vrwie.html";
			else if (1 == c.test(i)) var a = "http://m.kugou.com/download/oioguurh.html";
			else if (1 == u.test(i)) var a = "http://m.kugou.com/download/omw9w5fk.html";
			o.style.width = "1px", o.style.height = "1px", o.style.display = "none";
			var d = (new Date).valueOf();
			o.src = t, document.body.appendChild(o), r = setTimeout(function() {
				if (document.webkitHidden) try {
					kgplayer.pause()
				} catch (e) {} else {
					var e = (new Date).valueOf();
					e - d < 1550 && (location.href = a)
				}
			}, 1500)
		}

		function n(e) {
			var t = "kugouurl://start.weixin" + (e ? "?" + e : ""),
				n = window.location.href,
				a = /http:\/\/m\.kugou\.com\/kgsong\/((?!\/).)*\.html/g,
				o = /frombaidu/g,
				i = /from_360/g,
				s = /from_sogou/g,
				l = /fromweixin/g;
			if (1 == o.test(n)) var c = "http://m.kugou.com/download/ogf0b936.html";
			else if (1 == s.test(n)) var c = "http://m.kugou.com/download/oi7vrwie.html";
			else if (1 == i.test(n)) var c = "http://m.kugou.com/download/oioguurh.html";
			else if (1 == l.test(n)) var c = "http://m.kugou.com/download/omw9w5fk.html";
			else if (1 == a.test(n)) var c = "http://mobilelog.kugou.com/statistics.php?cmd=107&type=app&appid=372&url=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fku-gou-yin-le%2Fid472208016%3Fmt%3D8";
			else var c = "https://itunes.apple.com/app/apple-store/id472208016?pt=624347&ct=%E9%85%B7%E7%8B%97H5&mt=8";
			var u = (new Date).valueOf();
			location.href = t, r = setTimeout(function() {
				if (document.webkitHidden) try {
					kgplayer.pause()
				} catch (e) {} else {
					var e = (new Date).valueOf();
					e - u < 2e3 && (location.href = c)
				}
			}, 1500)
		}

		function a(e, a) {
			var r = navigator.userAgent,
				o = /http:\/\/m\.kugou\.com\/kgsong\/((?!\/).)*\.html/g,
				i = /frombaidu/g,
				s = /from_360/g,
				l = /from_sogou/g,
				c = /fromweixin/g,
				u = window.location.href;
			if (e) {
				var d = {
						cmd: 301
					},
					f = JSON.parse(e);
				f && (f.size = f.filesize || 0, f.sqfilesize = f.sqfilesize || 0, f["320size"] = f["320filesize"] || 0, f.m4asize = f.m4afilesize || 0, f.timelength = f.duration), d.jsonStr = f, d = JSON.stringify(d)
			}
			r.match(/QQ\//i) ? r.match(/iPhone|iPod|iPad/i) ? 1 == i.test(u) ? location.href = "http://m.kugou.com/download/ogf0b936.html" : 1 == l.test(u) ? location.href = "http://m.kugou.com/download/oi7vrwie.html" : 1 == s.test(u) ? location.href = "http://m.kugou.com/download/oioguurh.html" : 1 == c.test(u) ? location.href = "http://m.kugou.com/download/omw9w5fk.html" : 1 == o.test(u) ? location.href = "http://mobilelog.kugou.com/statistics.php?cmd=107&type=app&appid=372&url=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fku-gou-yin-le%2Fid472208016%3Fmt%3D8" : location.href = "https://itunes.apple.com/app/apple-store/id472208016?pt=624347&ct=%E9%85%B7%E7%8B%97H5&mt=8" : t(d) : "micromessenger" == r.toLowerCase().match(/MicroMessenger/i) ? a ? r.match(/iPhone|iPod|iPad/i) ? showHideUI.show("dialogWeiXinIOS") : showHideUI.show("dialogWeiXinAndroid") : 1 == o.test(u) ? r.match(/iPhone|iPod|iPad/i) ? showHideUI.show("dialogWeiXinIOS") : showHideUI.show("dialogWeiXinAndroid") : location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.kugou.android" : r.match(/iPhone|iPod|iPad/) ? n(d) : r.match(/Android|Adr/) && t(d)
		}
		var r;
		return {
			openApp: a,
			downkey: r
		}
	}(Kg),
	dialogDownload = function(e) {
		function t(t, n) {
			var a = t ? e.$(t) : e.$(".js-cur").find(".panel-songs-item-download"),
				r = a.attr("data-dialog-id");
			n ? (e.$("body").attr("islist", "true"), e.$(".panel-songslist-item").removeClass("js-down-cur"), e.$(t.parentNode).addClass("js-down-cur")) : e.$("body").attr("islist", "false"), showHideUI.show(r)
		}

		function n(n, a, r) {
			var o = r ? e.$(n.parentNode) : e.$(".js-cur"),
				i = o.attr("ctype"),
				s = o[0].id.replace(/^songs_/i, "");
			i ? t(n, r) : e.getJSON("http://m.kugou.com/app/i/getSongInfo.php", {
				cmd: "playInfo",
				hash: s
			}, function(e) {
				o.attr("ctype", e.ctype), t(n, r)
			}, "", !1), a.stopPropagation(), a.preventDefault()
		}
		return e.$(".js-dialog-show").addEvent("click", function(e) {
			n(this, e, !1)
		}), e.$(".js-downloadApp")[0] && e.$(".js-downloadApp").addEvent("click", function() {
			phpLogClick(5535), clearTimeout(downloadModule.downkey), downloadModule.openApp()
		}), document.getElementById("downloadBtn") && document.getElementById("downloadBtn").addEventListener("click", function(t) {
			t.preventDefault(), phpLogClick(5536), clearTimeout(downloadModule.downkey);
			var n, a, r;
			a = "true" == e.$("body").attr("islist") ? e.$(".js-down-cur")[0] : e.$(".js-cur")[0], r = e.$(a).attr("ctype"), n = "1009" == r ? a.children[1].children[0].innerHTML : "", downloadModule.openApp(n)
		}, !1), document.getElementById("downloadFeeBtn") && document.getElementById("downloadFeeBtn").addEventListener("click", function(e) {
			e.preventDefault(), phpLogClick(5536), clearTimeout(downloadModule.downkey), downloadModule.openApp()
		}, !1), document.getElementById("downloadNotBtn") && document.getElementById("downloadNotBtn").addEventListener("click", function(e) {
			e.preventDefault(), phpLogClick(5536), clearTimeout(downloadModule.downkey), downloadModule.openApp()
		}, !1), document.getElementById("openAppBtn") && document.getElementById("openAppBtn").addEventListener("click", function() {
			phpLogClick(5537), clearTimeout(downloadModule.downkey), downloadModule.openApp()
		}, !1), {
			showDialog: n
		}
	}(Kg),
	showHideUI = function(e) {
		function t(t, n) {
			n && n(), e.$("#" + t).show()
		}

		function n(t, n) {
			e.$("#" + t).hide(), n && n()
		}
		return {
			show: t,
			hide: n
		}
	}(Kg),
	commonModule = function(e, t) {
		function n() {
			t.referrer.match("m.kugou.com") && window.history.length > 0 ? history.go(-1) : location.href = gbParams.kg_domain
		}

		function a() {
			t.body.scrollTop >= parseInt(e.$("#imgBoxInfo").css("height")) ? e.$("#topGoback").hasClass("top-goback-scroll") || e.$("#topGoback").addClass("top-goback-scroll") : e.$("#topGoback").removeClass("top-goback-scroll")
		}

		function r() {
			var n = parseInt(e.$("#imgBoxInfo").css("height"), 10),
				a = e.$("#imgBoxInfo img"),
				r = t.body.clientWidth;
			a.css("margin-top", (n - r) / 2 + "px")
		}

		function o() {
			var e = t.getElementById("goback");
			e && e.addEventListener("click", function(e) {
				n(), e.preventDefault()
			}, !1), t.getElementById("imgBoxInfo") && r()
		}
		return o(), {
			gobackFun: n,
			topShowBg: a,
			formatImg: r
		}
	}(Kg, document),
	toTopModule = function(e, t) {
		function n() {
			t.body.scrollTop = 0
		}

		function a() {
			t.body.scrollTop > 3 * window.screen.height ? showHideUI.show("toTop") : showHideUI.hide("toTop")
		}
		var r = t.getElementById("toTop");
		return r && t.getElementById("toTop").addEventListener("click", function(e) {
			n()
		}, !1), {
			showHideTop: a
		}
	}(Kg, document),
	playerModule = function(e) {
		function t() {
			var t = e.$(".js-btnPlayPause");
			t.addClass("btn-loading"), t.removeClass("btn-pause"), t.removeClass("btn-play")
		}

		function n(t) {
			var n = e.$(".js-btnPlayPause");
			n.removeClass("btn-loading"), t || n.addClass("btn-pause")
		}

		function a() {
			var t = kgplayer,
				n = document,
				a = "",
				r = 0,
				o = {},
				o = t.songsList[t.curIndex];
			if (o.filename && (a = o.filename.split(/\s?-\s?/), a.length < 2 && (a = o.filename.split(/-/))), t._default.isSongCover && (o.filename ? document.title = o.filename + " - 酷狗音乐 让音乐改变世界" : document.title = "酷狗音乐 让音乐改变世界"), e.$(t._default.fullName)[0] && e.$(t._default.fullName).html(o.filename), e.$(t._default.songName)[0] && a[1] && e.$(t._default.songName).html(a[1]), e.$(t._default.singerName)[0] && a[0] && e.$(t._default.singerName).html(a[0]), n.getElementById(t._default.currentTime) && (n.getElementById(t._default.currentTime).innerHTML = "00:00", n.getElementById(t._default.totalTime).innerHTML = t.utils.addZero(Math.floor(r / 60)) + ":" + t.utils.addZero(Math.floor(r % 60))), n.getElementById(t._default.playBarPlay) && (n.getElementById(t._default.playBarPlay).style.width = "0"), t._default.isSongCover) {
				var i = {
					hash: o.hash,
					size: 200,
					format: "jsonp"
				};
				e.Ajax({
					docType: "jsonp",
					method: "get",
					url: "http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash",
					args: i,
					callback: function(n) {
						var a = e.$(t._default.songCover)[0].getAttribute("data-default-src");
						n && n.url && (a = n.url), e.$(t._default.songCover)[0] && e.$(t._default.songCover).attr("src", a), e.$(t._default.bgSongCover)[0] && e.$(t._default.bgSongCover).css("background-image", "url(" + a + ")")
					},
					error: function() {}
				})
			}
		}

		function r() {
			var t = [];
			return e.$("#panelSongsList li").each(function(e, n) {
				var a = JSON.parse(n.children[1].children[0].innerHTML);
				a.hash = a.hash.toUpperCase(), a.timeLength = a.duration, t[e] = a, e++
			}), t
		}

		function o() {
			f = r(), kgplayer.addSongsNoPlay({
				songs: f
			})
		}

		function i(e) {
			var t = e.id,
				n = kgplayer,
				a = t.replace(/^songs_/i, ""),
				r = !0;
			if (n.isLoadSrc) return !1;
			if (n.songsList.length > 0)
				for (var o = 0; o < n.songsList.length; o++)
					if (n.songsList[o].hash == a) {
						n.curIndex = o, n.create(r);
						break
					}
		}

		function s() {
			e.$("#panelPlay").css("visibility", "visible"), showHideUI.hide("bd"), showHideUI.hide("ftPlayer"), showHideUI.hide("topFixed")
		}

		function l() {
			e.$("#panelPlay").css("visibility", "hidden"), showHideUI.show("topFixed"), showHideUI.show("bd"), showHideUI.show("ftPlayer")
		}

		function c() {
			var t = e.$("#panelPlayBd")[0].offsetHeight,
				n = document.documentElement.clientHeight;
			e.$("#panelPlay")[0].style.height = (n > t ? n : t) + "px"
		}

		function u(r) {
			o(), kgplayer.cusload = t, kgplayer.cusPlay = n, kgplayer.setSongHead = a, e.$("#goPlay").addEvent("click", function(e) {
				e.preventDefault(), s(), c()
			}), e.$("#hidePlay").addEvent("click", function(e) {
				e.preventDefault(), l()
			})
		}

		function d() {
			kgplayer.cacheList = {}
		}
		kgplayer = Player({
			btnMain: ".js-btnPlayPause",
			playClass: "btn-play",
			pauseClass: "btn-pause",
			loadClass: "btn-loading",
			btnNext: ".js-btnNext",
			btnPrev: ".js-btnPrev",
			songName: ".js-ftSongName",
			singerName: ".js-ftUserName",
			currentTime: "timeshow",
			totalTime: "time",
			songCover: ".js-ftImg",
			isSongCover: !0,
			playBarPlay: "progress",
			playBarLoad: "previewProgress",
			bgSongCover: ".js-bg-overlay",
			isShowLrc: !0,
			songLrc: "playLrc",
			songCls: "panel-songslist-item",
			curPlayCls: "js-cur",
			playStaticId: 5532
		});
		var f;
		return {
			init: u,
			addAllSongs: o,
			playSong: i,
			resetCache: d
		}
	}(Kg),
	pageModule = function(e) {
		function t() {
			return document.body.scrollTop + window.screen.height >= document.body.clientHeight
		}

		function n(t) {
			e.$("#panelSongsList")[0].innerHTML += doT.compile(e.$("#panelSongsListTmpl")[0].innerHTML)(t.songs), playerModule.addAllSongs()
		}

		function a() {
			var t = parseInt(gbParams.totalPage, 10);
			return gbParams.curPage >= t ? (showHideUI.hide("ploading"), showHideUI.show("ploadingDone"), !1) : void e.Ajax({
				docType: "json",
				method: "get",
				url: "/rank/info/",
				callbackFuncName: "",
				args: {
					rankid: gbParams.rankid,
					page: ++gbParams.curPage,
					json: !0
				},
				callback: function(e) {
					n(e)
				},
				error: function() {
					showHideUI.hide("ploading")
				}
			})
		}

		function r() {
			var e = t();
			gbParams.totalPage > 1 && showHideUI.show("ploading"), e && a()
		}
		return {
			init: r
		}
	}(Kg);
pageInit();
var _bdhmProtocol = "https:" == document.location.protocol ? " https://" : " http://";
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc0eb0e71efad9184bda4158ff5385e91' type='text/javascript'%3E%3C/script%3E"));