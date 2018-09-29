!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.PKCEClient = t() : e.PKCEClient = t()
}(this, function () {
  return function (e) {
    function t(i) {
      if (r[i])return r[i].exports;
      var n = r[i] = {i: i, l: !1, exports: {}};
      return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }

    var r = {};
    return t.m = e, t.c = r, t.i = function (e) {
      return e
    }, t.d = function (e, r, i) {
      t.o(e, r) || Object.defineProperty(e, r, {configurable: !1, enumerable: !0, get: i})
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(r, "a", r), r
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 166)
  }([function (e, t) {
    "function" == typeof Object.create ? e.exports = function (e, t) {
      e.super_ = t, e.prototype = Object.create(t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })
    } : e.exports = function (e, t) {
      e.super_ = t;
      var r = function () {
      };
      r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
    }
  }, function (e, t, r) {
    function i(e, t) {
      for (var r in e)t[r] = e[r]
    }

    function n(e, t, r) {
      return s(e, t, r)
    }

    var o = r(2), s = o.Buffer;
    s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? e.exports = o : (i(o, t), t.Buffer = n), i(s, n), n.from = function (e, t, r) {
      if ("number" == typeof e)throw new TypeError("Argument must not be a number");
      return s(e, t, r)
    }, n.alloc = function (e, t, r) {
      if ("number" != typeof e)throw new TypeError("Argument must be a number");
      var i = s(e);
      return void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0), i
    }, n.allocUnsafe = function (e) {
      if ("number" != typeof e)throw new TypeError("Argument must be a number");
      return s(e)
    }, n.allocUnsafeSlow = function (e) {
      if ("number" != typeof e)throw new TypeError("Argument must be a number");
      return o.SlowBuffer(e)
    }
  }, function (e, t, r) {
    "use strict";
    (function (e) {
      function i() {
        return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function n(e, t) {
        if (i() < t)throw new RangeError("Invalid typed array length");
        return o.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = o.prototype) : (null === e && (e = new o(t)), e.length = t), e
      }

      function o(e, t, r) {
        if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o))return new o(e, t, r);
        if ("number" == typeof e) {
          if ("string" == typeof t)throw new Error("If encoding is specified then the first argument must be a string");
          return c(this, e)
        }
        return s(this, e, t, r)
      }

      function s(e, t, r, i) {
        if ("number" == typeof t)throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? d(e, t, r, i) : "string" == typeof t ? h(e, t, r) : l(e, t)
      }

      function a(e) {
        if ("number" != typeof e)throw new TypeError('"size" argument must be a number');
        if (e < 0)throw new RangeError('"size" argument must not be negative')
      }

      function f(e, t, r, i) {
        return a(t), t <= 0 ? n(e, t) : void 0 !== r ? "string" == typeof i ? n(e, t).fill(r, i) : n(e, t).fill(r) : n(e, t)
      }

      function c(e, t) {
        if (a(t), e = n(e, t < 0 ? 0 : 0 | p(t)), !o.TYPED_ARRAY_SUPPORT)for (var r = 0; r < t; ++r)e[r] = 0;
        return e
      }

      function h(e, t, r) {
        if ("string" == typeof r && "" !== r || (r = "utf8"), !o.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');
        var i = 0 | y(t, r);
        e = n(e, i);
        var s = e.write(t, r);
        return s !== i && (e = e.slice(0, s)), e
      }

      function u(e, t) {
        var r = t.length < 0 ? 0 : 0 | p(t.length);
        e = n(e, r);
        for (var i = 0; i < r; i += 1)e[i] = 255 & t[i];
        return e
      }

      function d(e, t, r, i) {
        if (t.byteLength, r < 0 || t.byteLength < r)throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < r + (i || 0))throw new RangeError("'length' is out of bounds");
        return t = void 0 === r && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, r) : new Uint8Array(t, r, i), o.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = o.prototype) : e = u(e, t), e
      }

      function l(e, t) {
        if (o.isBuffer(t)) {
          var r = 0 | p(t.length);
          return e = n(e, r), 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
        }
        if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t)return "number" != typeof t.length || J(t.length) ? n(e, 0) : u(e, t);
          if ("Buffer" === t.type && $(t.data))return u(e, t.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
      }

      function p(e) {
        if (e >= i())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
        return 0 | e
      }

      function b(e) {
        return +e != e && (e = 0), o.alloc(+e)
      }

      function y(e, t) {
        if (o.isBuffer(e))return e.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var r = e.length;
        if (0 === r)return 0;
        for (var i = !1; ;)switch (t) {
          case"ascii":
          case"latin1":
          case"binary":
            return r;
          case"utf8":
          case"utf-8":
          case void 0:
            return K(e).length;
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return 2 * r;
          case"hex":
            return r >>> 1;
          case"base64":
            return Y(e).length;
          default:
            if (i)return K(e).length;
            t = ("" + t).toLowerCase(), i = !0
        }
      }

      function m(e, t, r) {
        var i = !1;
        if ((void 0 === t || t < 0) && (t = 0), t > this.length)return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0)return "";
        if (r >>>= 0, t >>>= 0, r <= t)return "";
        for (e || (e = "utf8"); ;)switch (e) {
          case"hex":
            return C(this, t, r);
          case"utf8":
          case"utf-8":
            return x(this, t, r);
          case"ascii":
            return O(this, t, r);
          case"latin1":
          case"binary":
            return B(this, t, r);
          case"base64":
            return T(this, t, r);
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return R(this, t, r);
          default:
            if (i)throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), i = !0
        }
      }

      function g(e, t, r) {
        var i = e[t];
        e[t] = e[r], e[r] = i
      }

      function v(e, t, r, i, n) {
        if (0 === e.length)return -1;
        if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = n ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
          if (n)return -1;
          r = e.length - 1
        } else if (r < 0) {
          if (!n)return -1;
          r = 0
        }
        if ("string" == typeof t && (t = o.from(t, i)), o.isBuffer(t))return 0 === t.length ? -1 : w(e, t, r, i, n);
        if ("number" == typeof t)return t &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : w(e, [t], r, i, n);
        throw new TypeError("val must be string, number or Buffer")
      }

      function w(e, t, r, i, n) {
        function o(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }

        var s = 1, a = e.length, f = t.length;
        if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
          if (e.length < 2 || t.length < 2)return -1;
          s = 2, a /= 2, f /= 2, r /= 2
        }
        var c;
        if (n) {
          var h = -1;
          for (c = r; c < a; c++)if (o(e, c) === o(t, -1 === h ? 0 : c - h)) {
            if (-1 === h && (h = c), c - h + 1 === f)return h * s
          } else-1 !== h && (c -= c - h), h = -1
        } else for (r + f > a && (r = a - f), c = r; c >= 0; c--) {
          for (var u = !0, d = 0; d < f; d++)if (o(e, c + d) !== o(t, d)) {
            u = !1;
            break
          }
          if (u)return c
        }
        return -1
      }

      function _(e, t, r, i) {
        r = Number(r) || 0;
        var n = e.length - r;
        i ? (i = Number(i)) > n && (i = n) : i = n;
        var o = t.length;
        if (o % 2 != 0)throw new TypeError("Invalid hex string");
        i > o / 2 && (i = o / 2);
        for (var s = 0; s < i; ++s) {
          var a = parseInt(t.substr(2 * s, 2), 16);
          if (isNaN(a))return s;
          e[r + s] = a
        }
        return s
      }

      function S(e, t, r, i) {
        return X(K(t, e.length - r), e, r, i)
      }

      function k(e, t, r, i) {
        return X(V(t), e, r, i)
      }

      function E(e, t, r, i) {
        return k(e, t, r, i)
      }

      function M(e, t, r, i) {
        return X(Y(t), e, r, i)
      }

      function A(e, t, r, i) {
        return X(W(t, e.length - r), e, r, i)
      }

      function T(e, t, r) {
        return 0 === t && r === e.length ? Z.fromByteArray(e) : Z.fromByteArray(e.slice(t, r))
      }

      function x(e, t, r) {
        r = Math.min(e.length, r);
        for (var i = [], n = t; n < r;) {
          var o = e[n], s = null, a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          if (n + a <= r) {
            var f, c, h, u;
            switch (a) {
              case 1:
                o < 128 && (s = o);
                break;
              case 2:
                f = e[n + 1], 128 == (192 & f) && (u = (31 & o) << 6 | 63 & f) > 127 && (s = u);
                break;
              case 3:
                f = e[n + 1], c = e[n + 2], 128 == (192 & f) && 128 == (192 & c) && (u = (15 & o) << 12 | (63 & f) << 6 | 63 & c) > 2047 && (u < 55296 || u > 57343) && (s = u);
                break;
              case 4:
                f = e[n + 1], c = e[n + 2], h = e[n + 3], 128 == (192 & f) && 128 == (192 & c) && 128 == (192 & h) && (u = (15 & o) << 18 | (63 & f) << 12 | (63 & c) << 6 | 63 & h) > 65535 && u < 1114112 && (s = u)
            }
          }
          null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, i.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), i.push(s), n += a
        }
        return I(i)
      }

      function I(e) {
        var t = e.length;
        if (t <= Q)return String.fromCharCode.apply(String, e);
        for (var r = "", i = 0; i < t;)r += String.fromCharCode.apply(String, e.slice(i, i += Q));
        return r
      }

      function O(e, t, r) {
        var i = "";
        r = Math.min(e.length, r);
        for (var n = t; n < r; ++n)i += String.fromCharCode(127 & e[n]);
        return i
      }

      function B(e, t, r) {
        var i = "";
        r = Math.min(e.length, r);
        for (var n = t; n < r; ++n)i += String.fromCharCode(e[n]);
        return i
      }

      function C(e, t, r) {
        var i = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > i) && (r = i);
        for (var n = "", o = t; o < r; ++o)n += F(e[o]);
        return n
      }

      function R(e, t, r) {
        for (var i = e.slice(t, r), n = "", o = 0; o < i.length; o += 2)n += String.fromCharCode(i[o] + 256 * i[o + 1]);
        return n
      }

      function j(e, t, r) {
        if (e % 1 != 0 || e < 0)throw new RangeError("offset is not uint");
        if (e + t > r)throw new RangeError("Trying to access beyond buffer length")
      }

      function D(e, t, r, i, n, s) {
        if (!o.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > n || t < s)throw new RangeError('"value" argument is out of bounds');
        if (r + i > e.length)throw new RangeError("Index out of range")
      }

      function P(e, t, r, i) {
        t < 0 && (t = 65535 + t + 1);
        for (var n = 0, o = Math.min(e.length - r, 2); n < o; ++n)e[r + n] = (t & 255 << 8 * (i ? n : 1 - n)) >>> 8 * (i ? n : 1 - n)
      }

      function q(e, t, r, i) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var n = 0, o = Math.min(e.length - r, 4); n < o; ++n)e[r + n] = t >>> 8 * (i ? n : 3 - n) & 255
      }

      function U(e, t, r, i, n, o) {
        if (r + i > e.length)throw new RangeError("Index out of range");
        if (r < 0)throw new RangeError("Index out of range")
      }

      function L(e, t, r, i, n) {
        return n || U(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), G.write(e, t, r, i, 23, 4), r + 4
      }

      function N(e, t, r, i, n) {
        return n || U(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), G.write(e, t, r, i, 52, 8), r + 8
      }

      function z(e) {
        if (e = H(e).replace(ee, ""), e.length < 2)return "";
        for (; e.length % 4 != 0;)e += "=";
        return e
      }

      function H(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
      }

      function F(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
      }

      function K(e, t) {
        t = t || 1 / 0;
        for (var r, i = e.length, n = null, o = [], s = 0; s < i; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!n) {
              if (r > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue
              }
              if (s + 1 === i) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue
              }
              n = r;
              continue
            }
            if (r < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), n = r;
              continue
            }
            r = 65536 + (n - 55296 << 10 | r - 56320)
          } else n && (t -= 3) > -1 && o.push(239, 191, 189);
          if (n = null, r < 128) {
            if ((t -= 1) < 0)break;
            o.push(r)
          } else if (r < 2048) {
            if ((t -= 2) < 0)break;
            o.push(r >> 6 | 192, 63 & r | 128)
          } else if (r < 65536) {
            if ((t -= 3) < 0)break;
            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
          } else {
            if (!(r < 1114112))throw new Error("Invalid code point");
            if ((t -= 4) < 0)break;
            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
          }
        }
        return o
      }

      function V(e) {
        for (var t = [], r = 0; r < e.length; ++r)t.push(255 & e.charCodeAt(r));
        return t
      }

      function W(e, t) {
        for (var r, i, n, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)r = e.charCodeAt(s), i = r >> 8, n = r % 256, o.push(n), o.push(i);
        return o
      }

      function Y(e) {
        return Z.toByteArray(z(e))
      }

      function X(e, t, r, i) {
        for (var n = 0; n < i && !(n + r >= t.length || n >= e.length); ++n)t[n + r] = e[n];
        return n
      }

      function J(e) {
        return e !== e
      }

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var Z = r(87), G = r(136), $ = r(56);
      t.Buffer = o, t.SlowBuffer = b, t.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
        try {
          var e = new Uint8Array(1);
          return e.__proto__ = {
            __proto__: Uint8Array.prototype, foo: function () {
              return 42
            }
          }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
        } catch (e) {
          return !1
        }
      }(), t.kMaxLength = i(), o.poolSize = 8192, o._augment = function (e) {
        return e.__proto__ = o.prototype, e
      }, o.from = function (e, t, r) {
        return s(null, e, t, r)
      }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
        value: null,
        configurable: !0
      })), o.alloc = function (e, t, r) {
        return f(null, e, t, r)
      }, o.allocUnsafe = function (e) {
        return c(null, e)
      }, o.allocUnsafeSlow = function (e) {
        return c(null, e)
      }, o.isBuffer = function (e) {
        return !(null == e || !e._isBuffer)
      }, o.compare = function (e, t) {
        if (!o.isBuffer(e) || !o.isBuffer(t))throw new TypeError("Arguments must be Buffers");
        if (e === t)return 0;
        for (var r = e.length, i = t.length, n = 0, s = Math.min(r, i); n < s; ++n)if (e[n] !== t[n]) {
          r = e[n], i = t[n];
          break
        }
        return r < i ? -1 : i < r ? 1 : 0
      }, o.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case"hex":
          case"utf8":
          case"utf-8":
          case"ascii":
          case"latin1":
          case"binary":
          case"base64":
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return !0;
          default:
            return !1
        }
      }, o.concat = function (e, t) {
        if (!$(e))throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length)return o.alloc(0);
        var r;
        if (void 0 === t)for (t = 0, r = 0; r < e.length; ++r)t += e[r].length;
        var i = o.allocUnsafe(t), n = 0;
        for (r = 0; r < e.length; ++r) {
          var s = e[r];
          if (!o.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');
          s.copy(i, n), n += s.length
        }
        return i
      }, o.byteLength = y, o.prototype._isBuffer = !0, o.prototype.swap16 = function () {
        var e = this.length;
        if (e % 2 != 0)throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2)g(this, t, t + 1);
        return this
      }, o.prototype.swap32 = function () {
        var e = this.length;
        if (e % 4 != 0)throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4)g(this, t, t + 3), g(this, t + 1, t + 2);
        return this
      }, o.prototype.swap64 = function () {
        var e = this.length;
        if (e % 8 != 0)throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8)g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), g(this, t + 3, t + 4);
        return this
      }, o.prototype.toString = function () {
        var e = 0 | this.length;
        return 0 === e ? "" : 0 === arguments.length ? x(this, 0, e) : m.apply(this, arguments)
      }, o.prototype.equals = function (e) {
        if (!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === o.compare(this, e)
      }, o.prototype.inspect = function () {
        var e = "", r = t.INSPECT_MAX_BYTES;
        return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">"
      }, o.prototype.compare = function (e, t, r, i, n) {
        if (!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");
        if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === i && (i = 0), void 0 === n && (n = this.length), t < 0 || r > e.length || i < 0 || n > this.length)throw new RangeError("out of range index");
        if (i >= n && t >= r)return 0;
        if (i >= n)return -1;
        if (t >= r)return 1;
        if (t >>>= 0, r >>>= 0, i >>>= 0, n >>>= 0, this === e)return 0;
        for (var s = n - i, a = r - t, f = Math.min(s, a), c = this.slice(i, n), h = e.slice(t, r), u = 0; u < f; ++u)if (c[u] !== h[u]) {
          s = c[u], a = h[u];
          break
        }
        return s < a ? -1 : a < s ? 1 : 0
      }, o.prototype.includes = function (e, t, r) {
        return -1 !== this.indexOf(e, t, r)
      }, o.prototype.indexOf = function (e, t, r) {
        return v(this, e, t, r, !0)
      }, o.prototype.lastIndexOf = function (e, t, r) {
        return v(this, e, t, r, !1)
      }, o.prototype.write = function (e, t, r, i) {
        if (void 0 === t)i = "utf8", r = this.length, t = 0; else if (void 0 === r && "string" == typeof t)i = t, r = this.length, t = 0; else {
          if (!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          t |= 0, isFinite(r) ? (r |= 0, void 0 === i && (i = "utf8")) : (i = r, r = void 0)
        }
        var n = this.length - t;
        if ((void 0 === r || r > n) && (r = n), e.length > 0 && (r < 0 || t < 0) || t > this.length)throw new RangeError("Attempt to write outside buffer bounds");
        i || (i = "utf8");
        for (var o = !1; ;)switch (i) {
          case"hex":
            return _(this, e, t, r);
          case"utf8":
          case"utf-8":
            return S(this, e, t, r);
          case"ascii":
            return k(this, e, t, r);
          case"latin1":
          case"binary":
            return E(this, e, t, r);
          case"base64":
            return M(this, e, t, r);
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
            return A(this, e, t, r);
          default:
            if (o)throw new TypeError("Unknown encoding: " + i);
            i = ("" + i).toLowerCase(), o = !0
        }
      }, o.prototype.toJSON = function () {
        return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
      };
      var Q = 4096;
      o.prototype.slice = function (e, t) {
        var r = this.length;
        e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
        var i;
        if (o.TYPED_ARRAY_SUPPORT)i = this.subarray(e, t), i.__proto__ = o.prototype; else {
          var n = t - e;
          i = new o(n, void 0);
          for (var s = 0; s < n; ++s)i[s] = this[s + e]
        }
        return i
      }, o.prototype.readUIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || j(e, t, this.length);
        for (var i = this[e], n = 1, o = 0; ++o < t && (n *= 256);)i += this[e + o] * n;
        return i
      }, o.prototype.readUIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || j(e, t, this.length);
        for (var i = this[e + --t], n = 1; t > 0 && (n *= 256);)i += this[e + --t] * n;
        return i
      }, o.prototype.readUInt8 = function (e, t) {
        return t || j(e, 1, this.length), this[e]
      }, o.prototype.readUInt16LE = function (e, t) {
        return t || j(e, 2, this.length), this[e] | this[e + 1] << 8
      }, o.prototype.readUInt16BE = function (e, t) {
        return t || j(e, 2, this.length), this[e] << 8 | this[e + 1]
      }, o.prototype.readUInt32LE = function (e, t) {
        return t || j(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
      }, o.prototype.readUInt32BE = function (e, t) {
        return t || j(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
      }, o.prototype.readIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || j(e, t, this.length);
        for (var i = this[e], n = 1, o = 0; ++o < t && (n *= 256);)i += this[e + o] * n;
        return n *= 128, i >= n && (i -= Math.pow(2, 8 * t)), i
      }, o.prototype.readIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || j(e, t, this.length);
        for (var i = t, n = 1, o = this[e + --i]; i > 0 && (n *= 256);)o += this[e + --i] * n;
        return n *= 128, o >= n && (o -= Math.pow(2, 8 * t)), o
      }, o.prototype.readInt8 = function (e, t) {
        return t || j(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      }, o.prototype.readInt16LE = function (e, t) {
        t || j(e, 2, this.length);
        var r = this[e] | this[e + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
      }, o.prototype.readInt16BE = function (e, t) {
        t || j(e, 2, this.length);
        var r = this[e + 1] | this[e] << 8;
        return 32768 & r ? 4294901760 | r : r
      }, o.prototype.readInt32LE = function (e, t) {
        return t || j(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
      }, o.prototype.readInt32BE = function (e, t) {
        return t || j(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
      }, o.prototype.readFloatLE = function (e, t) {
        return t || j(e, 4, this.length), G.read(this, e, !0, 23, 4)
      }, o.prototype.readFloatBE = function (e, t) {
        return t || j(e, 4, this.length), G.read(this, e, !1, 23, 4)
      }, o.prototype.readDoubleLE = function (e, t) {
        return t || j(e, 8, this.length), G.read(this, e, !0, 52, 8)
      }, o.prototype.readDoubleBE = function (e, t) {
        return t || j(e, 8, this.length), G.read(this, e, !1, 52, 8)
      }, o.prototype.writeUIntLE = function (e, t, r, i) {
        if (e = +e, t |= 0, r |= 0, !i) {
          D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
        }
        var n = 1, o = 0;
        for (this[t] = 255 & e; ++o < r && (n *= 256);)this[t + o] = e / n & 255;
        return t + r
      }, o.prototype.writeUIntBE = function (e, t, r, i) {
        if (e = +e, t |= 0, r |= 0, !i) {
          D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
        }
        var n = r - 1, o = 1;
        for (this[t + n] = 255 & e; --n >= 0 && (o *= 256);)this[t + n] = e / o & 255;
        return t + r
      }, o.prototype.writeUInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
      }, o.prototype.writeUInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
      }, o.prototype.writeUInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
      }, o.prototype.writeUInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : q(this, e, t, !0), t + 4
      }, o.prototype.writeUInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : q(this, e, t, !1), t + 4
      }, o.prototype.writeIntLE = function (e, t, r, i) {
        if (e = +e, t |= 0, !i) {
          var n = Math.pow(2, 8 * r - 1);
          D(this, e, t, r, n - 1, -n)
        }
        var o = 0, s = 1, a = 0;
        for (this[t] = 255 & e; ++o < r && (s *= 256);)e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
        return t + r
      }, o.prototype.writeIntBE = function (e, t, r, i) {
        if (e = +e, t |= 0, !i) {
          var n = Math.pow(2, 8 * r - 1);
          D(this, e, t, r, n - 1, -n)
        }
        var o = r - 1, s = 1, a = 0;
        for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);)e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
        return t + r
      }, o.prototype.writeInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
      }, o.prototype.writeInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
      }, o.prototype.writeInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
      }, o.prototype.writeInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : q(this, e, t, !0), t + 4
      }, o.prototype.writeInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : q(this, e, t, !1), t + 4
      }, o.prototype.writeFloatLE = function (e, t, r) {
        return L(this, e, t, !0, r)
      }, o.prototype.writeFloatBE = function (e, t, r) {
        return L(this, e, t, !1, r)
      }, o.prototype.writeDoubleLE = function (e, t, r) {
        return N(this, e, t, !0, r)
      }, o.prototype.writeDoubleBE = function (e, t, r) {
        return N(this, e, t, !1, r)
      }, o.prototype.copy = function (e, t, r, i) {
        if (r || (r = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < r && (i = r), i === r)return 0;
        if (0 === e.length || 0 === this.length)return 0;
        if (t < 0)throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)throw new RangeError("sourceStart out of bounds");
        if (i < 0)throw new RangeError("sourceEnd out of bounds");
        i > this.length && (i = this.length), e.length - t < i - r && (i = e.length - t + r);
        var n, s = i - r;
        if (this === e && r < t && t < i)for (n = s - 1; n >= 0; --n)e[n + t] = this[n + r]; else if (s < 1e3 || !o.TYPED_ARRAY_SUPPORT)for (n = 0; n < s; ++n)e[n + t] = this[n + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + s), t);
        return s
      }, o.prototype.fill = function (e, t, r, i) {
        if ("string" == typeof e) {
          if ("string" == typeof t ? (i = t, t = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), 1 === e.length) {
            var n = e.charCodeAt(0);
            n < 256 && (e = n)
          }
          if (void 0 !== i && "string" != typeof i)throw new TypeError("encoding must be a string");
          if ("string" == typeof i && !o.isEncoding(i))throw new TypeError("Unknown encoding: " + i)
        } else"number" == typeof e && (e &= 255);
        if (t < 0 || this.length < t || this.length < r)throw new RangeError("Out of range index");
        if (r <= t)return this;
        t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);
        var s;
        if ("number" == typeof e)for (s = t; s < r; ++s)this[s] = e; else {
          var a = o.isBuffer(e) ? e : K(new o(e, i).toString()), f = a.length;
          for (s = 0; s < r - t; ++s)this[s + t] = a[s % f]
        }
        return this
      };
      var ee = /[^+\/0-9A-Za-z-_]/g
    }).call(t, r(6))
  }, function (e, t, r) {
    (function (e) {
      !function (e, t) {
        "use strict";
        function i(e, t) {
          if (!e)throw new Error(t || "Assertion failed")
        }

        function n(e, t) {
          e.super_ = t;
          var r = function () {
          };
          r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        }

        function o(e, t, r) {
          if (o.isBN(e))return e;
          this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== e && ("le" !== t && "be" !== t || (r = t, t = 10), this._init(e || 0, t || 10, r || "be"))
        }

        function s(e, t, r) {
          for (var i = 0, n = Math.min(e.length, r), o = t; o < n; o++) {
            var s = e.charCodeAt(o) - 48;
            i <<= 4, i |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
          }
          return i
        }

        function a(e, t, r, i) {
          for (var n = 0, o = Math.min(e.length, r), s = t; s < o; s++) {
            var a = e.charCodeAt(s) - 48;
            n *= i, n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
          }
          return n
        }

        function f(e) {
          for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
            var i = r / 26 | 0, n = r % 26;
            t[r] = (e.words[i] & 1 << n) >>> n
          }
          return t
        }

        function c(e, t, r) {
          r.negative = t.negative ^ e.negative;
          var i = e.length + t.length | 0;
          r.length = i, i = i - 1 | 0;
          var n = 0 | e.words[0], o = 0 | t.words[0], s = n * o, a = 67108863 & s, f = s / 67108864 | 0;
          r.words[0] = a;
          for (var c = 1; c < i; c++) {
            for (var h = f >>> 26, u = 67108863 & f, d = Math.min(c, t.length - 1), l = Math.max(0, c - e.length + 1); l <= d; l++) {
              var p = c - l | 0;
              n = 0 | e.words[p], o = 0 | t.words[l], s = n * o + u, h += s / 67108864 | 0, u = 67108863 & s
            }
            r.words[c] = 0 | u, f = 0 | h
          }
          return 0 !== f ? r.words[c] = 0 | f : r.length--, r.strip()
        }

        function h(e, t, r) {
          r.negative = t.negative ^ e.negative, r.length = e.length + t.length;
          for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
            var s = n;
            n = 0;
            for (var a = 67108863 & i, f = Math.min(o, t.length - 1), c = Math.max(0, o - e.length + 1); c <= f; c++) {
              var h = o - c, u = 0 | e.words[h], d = 0 | t.words[c], l = u * d, p = 67108863 & l;
              s = s + (l / 67108864 | 0) | 0, p = p + a | 0, a = 67108863 & p, s = s + (p >>> 26) | 0, n += s >>> 26, s &= 67108863
            }
            r.words[o] = a, i = s, s = n
          }
          return 0 !== i ? r.words[o] = i : r.length--, r.strip()
        }

        function u(e, t, r) {
          return (new d).mulp(e, t, r)
        }

        function d(e, t) {
          this.x = e, this.y = t
        }

        function l(e, t) {
          this.name = e, this.p = new o(t, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
        }

        function p() {
          l.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
        }

        function b() {
          l.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
        }

        function y() {
          l.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
        }

        function m() {
          l.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
        }

        function g(e) {
          if ("string" == typeof e) {
            var t = o._prime(e);
            this.m = t.p, this.prime = t
          } else i(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null
        }

        function v(e) {
          g.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
        }

        "object" == typeof e ? e.exports = o : t.BN = o, o.BN = o, o.wordSize = 26;
        var w;
        try {
          w = r(167).Buffer
        } catch (e) {
        }
        o.isBN = function (e) {
          return e instanceof o || null !== e && "object" == typeof e && e.constructor.wordSize === o.wordSize && Array.isArray(e.words)
        }, o.max = function (e, t) {
          return e.cmp(t) > 0 ? e : t
        }, o.min = function (e, t) {
          return e.cmp(t) < 0 ? e : t
        }, o.prototype._init = function (e, t, r) {
          if ("number" == typeof e)return this._initNumber(e, t, r);
          if ("object" == typeof e)return this._initArray(e, t, r);
          "hex" === t && (t = 16), i(t === (0 | t) && t >= 2 && t <= 36), e = e.toString().replace(/\s+/g, "");
          var n = 0;
          "-" === e[0] && n++, 16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n), "-" === e[0] && (this.negative = 1), this.strip(), "le" === r && this._initArray(this.toArray(), t, r)
        }, o.prototype._initNumber = function (e, t, r) {
          e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [67108863 & e], this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (i(e < 9007199254740992), this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), t, r)
        }, o.prototype._initArray = function (e, t, r) {
          if (i("number" == typeof e.length), e.length <= 0)return this.words = [0], this.length = 1, this;
          this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
          for (var n = 0; n < this.length; n++)this.words[n] = 0;
          var o, s, a = 0;
          if ("be" === r)for (n = e.length - 1, o = 0; n >= 0; n -= 3)s = e[n] | e[n - 1] << 8 | e[n - 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++); else if ("le" === r)for (n = 0, o = 0; n < e.length; n += 3)s = e[n] | e[n + 1] << 8 | e[n + 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
          return this.strip()
        }, o.prototype._parseHex = function (e, t) {
          this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
          for (var r = 0; r < this.length; r++)this.words[r] = 0;
          var i, n, o = 0;
          for (r = e.length - 6, i = 0; r >= t; r -= 6)n = s(e, r, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, i++);
          r + 6 !== t && (n = s(e, t, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303), this.strip()
        }, o.prototype._parseBase = function (e, t, r) {
          this.words = [0], this.length = 1;
          for (var i = 0, n = 1; n <= 67108863; n *= t)i++;
          i--, n = n / t | 0;
          for (var o = e.length - r, s = o % i, f = Math.min(o, o - s) + r, c = 0, h = r; h < f; h += i)c = a(e, h, h + i, t), this.imuln(n), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
          if (0 !== s) {
            var u = 1;
            for (c = a(e, h, e.length, t), h = 0; h < s; h++)u *= t;
            this.imuln(u), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c)
          }
        }, o.prototype.copy = function (e) {
          e.words = new Array(this.length);
          for (var t = 0; t < this.length; t++)e.words[t] = this.words[t];
          e.length = this.length, e.negative = this.negative, e.red = this.red
        }, o.prototype.clone = function () {
          var e = new o(null);
          return this.copy(e), e
        }, o.prototype._expand = function (e) {
          for (; this.length < e;)this.words[this.length++] = 0;
          return this
        }, o.prototype.strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1];)this.length--;
          return this._normSign()
        }, o.prototype._normSign = function () {
          return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
        }, o.prototype.inspect = function () {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
        };
        var _ = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], S = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], k = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
        o.prototype.toString = function (e, t) {
          e = e || 10, t = 0 | t || 1;
          var r;
          if (16 === e || "hex" === e) {
            r = "";
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s], f = (16777215 & (a << n | o)).toString(16);
              o = a >>> 24 - n & 16777215, r = 0 !== o || s !== this.length - 1 ? _[6 - f.length] + f + r : f + r, n += 2, n >= 26 && (n -= 26, s--)
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % t != 0;)r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r
          }
          if (e === (0 | e) && e >= 2 && e <= 36) {
            var c = S[e], h = k[e];
            r = "";
            var u = this.clone();
            for (u.negative = 0; !u.isZero();) {
              var d = u.modn(h).toString(e);
              u = u.idivn(h), r = u.isZero() ? d + r : _[c - d.length] + d + r
            }
            for (this.isZero() && (r = "0" + r); r.length % t != 0;)r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r
          }
          i(!1, "Base should be between 2 and 36")
        }, o.prototype.toNumber = function () {
          var e = this.words[0];
          return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -e : e
        }, o.prototype.toJSON = function () {
          return this.toString(16)
        }, o.prototype.toBuffer = function (e, t) {
          return i(void 0 !== w), this.toArrayLike(w, e, t)
        }, o.prototype.toArray = function (e, t) {
          return this.toArrayLike(Array, e, t)
        }, o.prototype.toArrayLike = function (e, t, r) {
          var n = this.byteLength(), o = r || Math.max(1, n);
          i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0"), this.strip();
          var s, a, f = "le" === t, c = new e(o), h = this.clone();
          if (f) {
            for (a = 0; !h.isZero(); a++)s = h.andln(255), h.iushrn(8), c[a] = s;
            for (; a < o; a++)c[a] = 0
          } else {
            for (a = 0; a < o - n; a++)c[a] = 0;
            for (a = 0; !h.isZero(); a++)s = h.andln(255), h.iushrn(8), c[o - a - 1] = s
          }
          return c
        }, Math.clz32 ? o.prototype._countBits = function (e) {
          return 32 - Math.clz32(e)
        } : o.prototype._countBits = function (e) {
          var t = e, r = 0;
          return t >= 4096 && (r += 13, t >>>= 13), t >= 64 && (r += 7, t >>>= 7), t >= 8 && (r += 4, t >>>= 4), t >= 2 && (r += 2, t >>>= 2), r + t
        }, o.prototype._zeroBits = function (e) {
          if (0 === e)return 26;
          var t = e, r = 0;
          return 0 == (8191 & t) && (r += 13, t >>>= 13), 0 == (127 & t) && (r += 7, t >>>= 7), 0 == (15 & t) && (r += 4, t >>>= 4), 0 == (3 & t) && (r += 2, t >>>= 2), 0 == (1 & t) && r++, r
        }, o.prototype.bitLength = function () {
          var e = this.words[this.length - 1], t = this._countBits(e);
          return 26 * (this.length - 1) + t
        }, o.prototype.zeroBits = function () {
          if (this.isZero())return 0;
          for (var e = 0, t = 0; t < this.length; t++) {
            var r = this._zeroBits(this.words[t]);
            if (e += r, 26 !== r)break
          }
          return e
        }, o.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }, o.prototype.toTwos = function (e) {
          return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone()
        }, o.prototype.fromTwos = function (e) {
          return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone()
        }, o.prototype.isNeg = function () {
          return 0 !== this.negative
        }, o.prototype.neg = function () {
          return this.clone().ineg()
        }, o.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }, o.prototype.iuor = function (e) {
          for (; this.length < e.length;)this.words[this.length++] = 0;
          for (var t = 0; t < e.length; t++)this.words[t] = this.words[t] | e.words[t];
          return this.strip()
        }, o.prototype.ior = function (e) {
          return i(0 == (this.negative | e.negative)), this.iuor(e)
        }, o.prototype.or = function (e) {
          return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this)
        }, o.prototype.uor = function (e) {
          return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this)
        }, o.prototype.iuand = function (e) {
          var t;
          t = this.length > e.length ? e : this;
          for (var r = 0; r < t.length; r++)this.words[r] = this.words[r] & e.words[r];
          return this.length = t.length, this.strip()
        }, o.prototype.iand = function (e) {
          return i(0 == (this.negative | e.negative)), this.iuand(e)
        }, o.prototype.and = function (e) {
          return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this)
        }, o.prototype.uand = function (e) {
          return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this)
        }, o.prototype.iuxor = function (e) {
          var t, r;
          this.length > e.length ? (t = this, r = e) : (t = e, r = this);
          for (var i = 0; i < r.length; i++)this.words[i] = t.words[i] ^ r.words[i];
          if (this !== t)for (; i < t.length; i++)this.words[i] = t.words[i];
          return this.length = t.length, this.strip()
        }, o.prototype.ixor = function (e) {
          return i(0 == (this.negative | e.negative)), this.iuxor(e)
        }, o.prototype.xor = function (e) {
          return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this)
        }, o.prototype.uxor = function (e) {
          return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this)
        }, o.prototype.inotn = function (e) {
          i("number" == typeof e && e >= 0);
          var t = 0 | Math.ceil(e / 26), r = e % 26;
          this._expand(t), r > 0 && t--;
          for (var n = 0; n < t; n++)this.words[n] = 67108863 & ~this.words[n];
          return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this.strip()
        }, o.prototype.notn = function (e) {
          return this.clone().inotn(e)
        }, o.prototype.setn = function (e, t) {
          i("number" == typeof e && e >= 0);
          var r = e / 26 | 0, n = e % 26;
          return this._expand(r + 1), this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n), this.strip()
        }, o.prototype.iadd = function (e) {
          var t;
          if (0 !== this.negative && 0 === e.negative)return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign();
          if (0 === this.negative && 0 !== e.negative)return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign();
          var r, i;
          this.length > e.length ? (r = this, i = e) : (r = e, i = this);
          for (var n = 0, o = 0; o < i.length; o++)t = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & t, n = t >>> 26;
          for (; 0 !== n && o < r.length; o++)t = (0 | r.words[o]) + n, this.words[o] = 67108863 & t, n = t >>> 26;
          if (this.length = r.length, 0 !== n)this.words[this.length] = n, this.length++; else if (r !== this)for (; o < r.length; o++)this.words[o] = r.words[o];
          return this
        }, o.prototype.add = function (e) {
          var t;
          return 0 !== e.negative && 0 === this.negative ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : 0 === e.negative && 0 !== this.negative ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this)
        }, o.prototype.isub = function (e) {
          if (0 !== e.negative) {
            e.negative = 0;
            var t = this.iadd(e);
            return e.negative = 1, t._normSign()
          }
          if (0 !== this.negative)return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
          var r = this.cmp(e);
          if (0 === r)return this.negative = 0, this.length = 1, this.words[0] = 0, this;
          var i, n;
          r > 0 ? (i = this, n = e) : (i = e, n = this);
          for (var o = 0, s = 0; s < n.length; s++)t = (0 | i.words[s]) - (0 | n.words[s]) + o, o = t >> 26, this.words[s] = 67108863 & t;
          for (; 0 !== o && s < i.length; s++)t = (0 | i.words[s]) + o, o = t >> 26, this.words[s] = 67108863 & t;
          if (0 === o && s < i.length && i !== this)for (; s < i.length; s++)this.words[s] = i.words[s];
          return this.length = Math.max(this.length, s), i !== this && (this.negative = 1), this.strip()
        }, o.prototype.sub = function (e) {
          return this.clone().isub(e)
        };
        var E = function (e, t, r) {
          var i, n, o, s = e.words, a = t.words, f = r.words, c = 0, h = 0 | s[0], u = 8191 & h, d = h >>> 13, l = 0 | s[1], p = 8191 & l, b = l >>> 13, y = 0 | s[2], m = 8191 & y, g = y >>> 13, v = 0 | s[3], w = 8191 & v, _ = v >>> 13, S = 0 | s[4], k = 8191 & S, E = S >>> 13, M = 0 | s[5], A = 8191 & M, T = M >>> 13, x = 0 | s[6], I = 8191 & x, O = x >>> 13, B = 0 | s[7], C = 8191 & B, R = B >>> 13, j = 0 | s[8], D = 8191 & j, P = j >>> 13, q = 0 | s[9], U = 8191 & q, L = q >>> 13, N = 0 | a[0], z = 8191 & N, H = N >>> 13, F = 0 | a[1], K = 8191 & F, V = F >>> 13, W = 0 | a[2], Y = 8191 & W, X = W >>> 13, J = 0 | a[3], Z = 8191 & J, G = J >>> 13, $ = 0 | a[4], Q = 8191 & $, ee = $ >>> 13, te = 0 | a[5], re = 8191 & te, ie = te >>> 13, ne = 0 | a[6], oe = 8191 & ne, se = ne >>> 13, ae = 0 | a[7], fe = 8191 & ae, ce = ae >>> 13, he = 0 | a[8], ue = 8191 & he, de = he >>> 13, le = 0 | a[9], pe = 8191 & le, be = le >>> 13;
          r.negative = e.negative ^ t.negative, r.length = 19, i = Math.imul(u, z), n = Math.imul(u, H), n = n + Math.imul(d, z) | 0, o = Math.imul(d, H);
          var ye = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, i = Math.imul(p, z), n = Math.imul(p, H), n = n + Math.imul(b, z) | 0, o = Math.imul(b, H), i = i + Math.imul(u, K) | 0, n = n + Math.imul(u, V) | 0, n = n + Math.imul(d, K) | 0, o = o + Math.imul(d, V) | 0;
          var me = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (me >>> 26) | 0, me &= 67108863, i = Math.imul(m, z), n = Math.imul(m, H), n = n + Math.imul(g, z) | 0, o = Math.imul(g, H), i = i + Math.imul(p, K) | 0, n = n + Math.imul(p, V) | 0, n = n + Math.imul(b, K) | 0, o = o + Math.imul(b, V) | 0, i = i + Math.imul(u, Y) | 0, n = n + Math.imul(u, X) | 0, n = n + Math.imul(d, Y) | 0, o = o + Math.imul(d, X) | 0;
          var ge = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (ge >>> 26) | 0, ge &= 67108863, i = Math.imul(w, z), n = Math.imul(w, H), n = n + Math.imul(_, z) | 0, o = Math.imul(_, H), i = i + Math.imul(m, K) | 0, n = n + Math.imul(m, V) | 0, n = n + Math.imul(g, K) | 0, o = o + Math.imul(g, V) | 0, i = i + Math.imul(p, Y) | 0, n = n + Math.imul(p, X) | 0, n = n + Math.imul(b, Y) | 0, o = o + Math.imul(b, X) | 0, i = i + Math.imul(u, Z) | 0, n = n + Math.imul(u, G) | 0, n = n + Math.imul(d, Z) | 0, o = o + Math.imul(d, G) | 0;
          var ve = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (ve >>> 26) | 0, ve &= 67108863, i = Math.imul(k, z), n = Math.imul(k, H), n = n + Math.imul(E, z) | 0, o = Math.imul(E, H), i = i + Math.imul(w, K) | 0, n = n + Math.imul(w, V) | 0, n = n + Math.imul(_, K) | 0, o = o + Math.imul(_, V) | 0, i = i + Math.imul(m, Y) | 0, n = n + Math.imul(m, X) | 0, n = n + Math.imul(g, Y) | 0, o = o + Math.imul(g, X) | 0, i = i + Math.imul(p, Z) | 0, n = n + Math.imul(p, G) | 0, n = n + Math.imul(b, Z) | 0, o = o + Math.imul(b, G) | 0, i = i + Math.imul(u, Q) | 0, n = n + Math.imul(u, ee) | 0, n = n + Math.imul(d, Q) | 0, o = o + Math.imul(d, ee) | 0;
          var we = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, i = Math.imul(A, z), n = Math.imul(A, H), n = n + Math.imul(T, z) | 0, o = Math.imul(T, H), i = i + Math.imul(k, K) | 0, n = n + Math.imul(k, V) | 0, n = n + Math.imul(E, K) | 0, o = o + Math.imul(E, V) | 0, i = i + Math.imul(w, Y) | 0, n = n + Math.imul(w, X) | 0, n = n + Math.imul(_, Y) | 0, o = o + Math.imul(_, X) | 0, i = i + Math.imul(m, Z) | 0, n = n + Math.imul(m, G) | 0, n = n + Math.imul(g, Z) | 0, o = o + Math.imul(g, G) | 0, i = i + Math.imul(p, Q) | 0, n = n + Math.imul(p, ee) | 0, n = n + Math.imul(b, Q) | 0, o = o + Math.imul(b, ee) | 0, i = i + Math.imul(u, re) | 0, n = n + Math.imul(u, ie) | 0, n = n + Math.imul(d, re) | 0, o = o + Math.imul(d, ie) | 0;
          var _e = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, i = Math.imul(I, z), n = Math.imul(I, H), n = n + Math.imul(O, z) | 0, o = Math.imul(O, H), i = i + Math.imul(A, K) | 0, n = n + Math.imul(A, V) | 0, n = n + Math.imul(T, K) | 0, o = o + Math.imul(T, V) | 0, i = i + Math.imul(k, Y) | 0, n = n + Math.imul(k, X) | 0, n = n + Math.imul(E, Y) | 0, o = o + Math.imul(E, X) | 0, i = i + Math.imul(w, Z) | 0, n = n + Math.imul(w, G) | 0, n = n + Math.imul(_, Z) | 0, o = o + Math.imul(_, G) | 0, i = i + Math.imul(m, Q) | 0, n = n + Math.imul(m, ee) | 0, n = n + Math.imul(g, Q) | 0, o = o + Math.imul(g, ee) | 0, i = i + Math.imul(p, re) | 0, n = n + Math.imul(p, ie) | 0, n = n + Math.imul(b, re) | 0, o = o + Math.imul(b, ie) | 0, i = i + Math.imul(u, oe) | 0, n = n + Math.imul(u, se) | 0, n = n + Math.imul(d, oe) | 0, o = o + Math.imul(d, se) | 0;
          var Se = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, i = Math.imul(C, z), n = Math.imul(C, H), n = n + Math.imul(R, z) | 0, o = Math.imul(R, H), i = i + Math.imul(I, K) | 0, n = n + Math.imul(I, V) | 0, n = n + Math.imul(O, K) | 0, o = o + Math.imul(O, V) | 0, i = i + Math.imul(A, Y) | 0, n = n + Math.imul(A, X) | 0, n = n + Math.imul(T, Y) | 0, o = o + Math.imul(T, X) | 0, i = i + Math.imul(k, Z) | 0, n = n + Math.imul(k, G) | 0, n = n + Math.imul(E, Z) | 0, o = o + Math.imul(E, G) | 0, i = i + Math.imul(w, Q) | 0, n = n + Math.imul(w, ee) | 0, n = n + Math.imul(_, Q) | 0, o = o + Math.imul(_, ee) | 0, i = i + Math.imul(m, re) | 0, n = n + Math.imul(m, ie) | 0, n = n + Math.imul(g, re) | 0, o = o + Math.imul(g, ie) | 0, i = i + Math.imul(p, oe) | 0, n = n + Math.imul(p, se) | 0, n = n + Math.imul(b, oe) | 0, o = o + Math.imul(b, se) | 0, i = i + Math.imul(u, fe) | 0, n = n + Math.imul(u, ce) | 0, n = n + Math.imul(d, fe) | 0, o = o + Math.imul(d, ce) | 0;
          var ke = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, i = Math.imul(D, z), n = Math.imul(D, H), n = n + Math.imul(P, z) | 0, o = Math.imul(P, H), i = i + Math.imul(C, K) | 0, n = n + Math.imul(C, V) | 0, n = n + Math.imul(R, K) | 0, o = o + Math.imul(R, V) | 0, i = i + Math.imul(I, Y) | 0, n = n + Math.imul(I, X) | 0, n = n + Math.imul(O, Y) | 0, o = o + Math.imul(O, X) | 0, i = i + Math.imul(A, Z) | 0, n = n + Math.imul(A, G) | 0, n = n + Math.imul(T, Z) | 0, o = o + Math.imul(T, G) | 0, i = i + Math.imul(k, Q) | 0, n = n + Math.imul(k, ee) | 0, n = n + Math.imul(E, Q) | 0, o = o + Math.imul(E, ee) | 0, i = i + Math.imul(w, re) | 0, n = n + Math.imul(w, ie) | 0, n = n + Math.imul(_, re) | 0, o = o + Math.imul(_, ie) | 0, i = i + Math.imul(m, oe) | 0, n = n + Math.imul(m, se) | 0, n = n + Math.imul(g, oe) | 0, o = o + Math.imul(g, se) | 0, i = i + Math.imul(p, fe) | 0, n = n + Math.imul(p, ce) | 0, n = n + Math.imul(b, fe) | 0, o = o + Math.imul(b, ce) | 0, i = i + Math.imul(u, ue) | 0, n = n + Math.imul(u, de) | 0, n = n + Math.imul(d, ue) | 0, o = o + Math.imul(d, de) | 0;
          var Ee = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, i = Math.imul(U, z), n = Math.imul(U, H), n = n + Math.imul(L, z) | 0, o = Math.imul(L, H), i = i + Math.imul(D, K) | 0, n = n + Math.imul(D, V) | 0, n = n + Math.imul(P, K) | 0, o = o + Math.imul(P, V) | 0, i = i + Math.imul(C, Y) | 0, n = n + Math.imul(C, X) | 0, n = n + Math.imul(R, Y) | 0, o = o + Math.imul(R, X) | 0, i = i + Math.imul(I, Z) | 0, n = n + Math.imul(I, G) | 0, n = n + Math.imul(O, Z) | 0, o = o + Math.imul(O, G) | 0, i = i + Math.imul(A, Q) | 0, n = n + Math.imul(A, ee) | 0, n = n + Math.imul(T, Q) | 0, o = o + Math.imul(T, ee) | 0, i = i + Math.imul(k, re) | 0, n = n + Math.imul(k, ie) | 0, n = n + Math.imul(E, re) | 0, o = o + Math.imul(E, ie) | 0, i = i + Math.imul(w, oe) | 0, n = n + Math.imul(w, se) | 0, n = n + Math.imul(_, oe) | 0, o = o + Math.imul(_, se) | 0, i = i + Math.imul(m, fe) | 0, n = n + Math.imul(m, ce) | 0, n = n + Math.imul(g, fe) | 0, o = o + Math.imul(g, ce) | 0, i = i + Math.imul(p, ue) | 0, n = n + Math.imul(p, de) | 0, n = n + Math.imul(b, ue) | 0, o = o + Math.imul(b, de) | 0, i = i + Math.imul(u, pe) | 0, n = n + Math.imul(u, be) | 0, n = n + Math.imul(d, pe) | 0, o = o + Math.imul(d, be) | 0;
          var Me = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, i = Math.imul(U, K), n = Math.imul(U, V), n = n + Math.imul(L, K) | 0, o = Math.imul(L, V), i = i + Math.imul(D, Y) | 0, n = n + Math.imul(D, X) | 0, n = n + Math.imul(P, Y) | 0, o = o + Math.imul(P, X) | 0, i = i + Math.imul(C, Z) | 0, n = n + Math.imul(C, G) | 0, n = n + Math.imul(R, Z) | 0, o = o + Math.imul(R, G) | 0, i = i + Math.imul(I, Q) | 0, n = n + Math.imul(I, ee) | 0, n = n + Math.imul(O, Q) | 0, o = o + Math.imul(O, ee) | 0, i = i + Math.imul(A, re) | 0, n = n + Math.imul(A, ie) | 0, n = n + Math.imul(T, re) | 0, o = o + Math.imul(T, ie) | 0, i = i + Math.imul(k, oe) | 0, n = n + Math.imul(k, se) | 0, n = n + Math.imul(E, oe) | 0, o = o + Math.imul(E, se) | 0, i = i + Math.imul(w, fe) | 0, n = n + Math.imul(w, ce) | 0, n = n + Math.imul(_, fe) | 0, o = o + Math.imul(_, ce) | 0, i = i + Math.imul(m, ue) | 0, n = n + Math.imul(m, de) | 0, n = n + Math.imul(g, ue) | 0, o = o + Math.imul(g, de) | 0, i = i + Math.imul(p, pe) | 0, n = n + Math.imul(p, be) | 0, n = n + Math.imul(b, pe) | 0, o = o + Math.imul(b, be) | 0;
          var Ae = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, i = Math.imul(U, Y), n = Math.imul(U, X), n = n + Math.imul(L, Y) | 0, o = Math.imul(L, X), i = i + Math.imul(D, Z) | 0, n = n + Math.imul(D, G) | 0, n = n + Math.imul(P, Z) | 0, o = o + Math.imul(P, G) | 0, i = i + Math.imul(C, Q) | 0, n = n + Math.imul(C, ee) | 0, n = n + Math.imul(R, Q) | 0, o = o + Math.imul(R, ee) | 0, i = i + Math.imul(I, re) | 0, n = n + Math.imul(I, ie) | 0, n = n + Math.imul(O, re) | 0, o = o + Math.imul(O, ie) | 0, i = i + Math.imul(A, oe) | 0, n = n + Math.imul(A, se) | 0, n = n + Math.imul(T, oe) | 0, o = o + Math.imul(T, se) | 0, i = i + Math.imul(k, fe) | 0, n = n + Math.imul(k, ce) | 0, n = n + Math.imul(E, fe) | 0, o = o + Math.imul(E, ce) | 0, i = i + Math.imul(w, ue) | 0, n = n + Math.imul(w, de) | 0, n = n + Math.imul(_, ue) | 0, o = o + Math.imul(_, de) | 0, i = i + Math.imul(m, pe) | 0, n = n + Math.imul(m, be) | 0, n = n + Math.imul(g, pe) | 0, o = o + Math.imul(g, be) | 0;
          var Te = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, i = Math.imul(U, Z), n = Math.imul(U, G), n = n + Math.imul(L, Z) | 0, o = Math.imul(L, G), i = i + Math.imul(D, Q) | 0, n = n + Math.imul(D, ee) | 0, n = n + Math.imul(P, Q) | 0, o = o + Math.imul(P, ee) | 0, i = i + Math.imul(C, re) | 0, n = n + Math.imul(C, ie) | 0, n = n + Math.imul(R, re) | 0, o = o + Math.imul(R, ie) | 0, i = i + Math.imul(I, oe) | 0, n = n + Math.imul(I, se) | 0, n = n + Math.imul(O, oe) | 0, o = o + Math.imul(O, se) | 0, i = i + Math.imul(A, fe) | 0, n = n + Math.imul(A, ce) | 0, n = n + Math.imul(T, fe) | 0, o = o + Math.imul(T, ce) | 0, i = i + Math.imul(k, ue) | 0, n = n + Math.imul(k, de) | 0, n = n + Math.imul(E, ue) | 0, o = o + Math.imul(E, de) | 0, i = i + Math.imul(w, pe) | 0, n = n + Math.imul(w, be) | 0, n = n + Math.imul(_, pe) | 0, o = o + Math.imul(_, be) | 0;
          var xe = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863, i = Math.imul(U, Q), n = Math.imul(U, ee), n = n + Math.imul(L, Q) | 0, o = Math.imul(L, ee), i = i + Math.imul(D, re) | 0, n = n + Math.imul(D, ie) | 0, n = n + Math.imul(P, re) | 0, o = o + Math.imul(P, ie) | 0, i = i + Math.imul(C, oe) | 0, n = n + Math.imul(C, se) | 0, n = n + Math.imul(R, oe) | 0, o = o + Math.imul(R, se) | 0, i = i + Math.imul(I, fe) | 0, n = n + Math.imul(I, ce) | 0, n = n + Math.imul(O, fe) | 0, o = o + Math.imul(O, ce) | 0, i = i + Math.imul(A, ue) | 0, n = n + Math.imul(A, de) | 0, n = n + Math.imul(T, ue) | 0, o = o + Math.imul(T, de) | 0, i = i + Math.imul(k, pe) | 0, n = n + Math.imul(k, be) | 0, n = n + Math.imul(E, pe) | 0, o = o + Math.imul(E, be) | 0;
          var Ie = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, i = Math.imul(U, re), n = Math.imul(U, ie), n = n + Math.imul(L, re) | 0, o = Math.imul(L, ie), i = i + Math.imul(D, oe) | 0, n = n + Math.imul(D, se) | 0, n = n + Math.imul(P, oe) | 0, o = o + Math.imul(P, se) | 0, i = i + Math.imul(C, fe) | 0, n = n + Math.imul(C, ce) | 0, n = n + Math.imul(R, fe) | 0, o = o + Math.imul(R, ce) | 0, i = i + Math.imul(I, ue) | 0, n = n + Math.imul(I, de) | 0, n = n + Math.imul(O, ue) | 0, o = o + Math.imul(O, de) | 0, i = i + Math.imul(A, pe) | 0, n = n + Math.imul(A, be) | 0, n = n + Math.imul(T, pe) | 0, o = o + Math.imul(T, be) | 0;
          var Oe = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Oe >>> 26) | 0, Oe &= 67108863, i = Math.imul(U, oe), n = Math.imul(U, se), n = n + Math.imul(L, oe) | 0, o = Math.imul(L, se), i = i + Math.imul(D, fe) | 0, n = n + Math.imul(D, ce) | 0, n = n + Math.imul(P, fe) | 0, o = o + Math.imul(P, ce) | 0, i = i + Math.imul(C, ue) | 0, n = n + Math.imul(C, de) | 0, n = n + Math.imul(R, ue) | 0, o = o + Math.imul(R, de) | 0, i = i + Math.imul(I, pe) | 0, n = n + Math.imul(I, be) | 0, n = n + Math.imul(O, pe) | 0, o = o + Math.imul(O, be) | 0;
          var Be = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, i = Math.imul(U, fe), n = Math.imul(U, ce), n = n + Math.imul(L, fe) | 0, o = Math.imul(L, ce), i = i + Math.imul(D, ue) | 0, n = n + Math.imul(D, de) | 0, n = n + Math.imul(P, ue) | 0, o = o + Math.imul(P, de) | 0, i = i + Math.imul(C, pe) | 0, n = n + Math.imul(C, be) | 0, n = n + Math.imul(R, pe) | 0, o = o + Math.imul(R, be) | 0;
          var Ce = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, i = Math.imul(U, ue), n = Math.imul(U, de), n = n + Math.imul(L, ue) | 0, o = Math.imul(L, de), i = i + Math.imul(D, pe) | 0, n = n + Math.imul(D, be) | 0, n = n + Math.imul(P, pe) | 0, o = o + Math.imul(P, be) | 0;
          var Re = (c + i | 0) + ((8191 & n) << 13) | 0;
          c = (o + (n >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863, i = Math.imul(U, pe), n = Math.imul(U, be), n = n + Math.imul(L, pe) | 0, o = Math.imul(L, be);
          var je = (c + i | 0) + ((8191 & n) << 13) | 0;
          return c = (o + (n >>> 13) | 0) + (je >>> 26) | 0, je &= 67108863, f[0] = ye, f[1] = me, f[2] = ge, f[3] = ve, f[4] = we, f[5] = _e, f[6] = Se, f[7] = ke, f[8] = Ee, f[9] = Me, f[10] = Ae, f[11] = Te, f[12] = xe, f[13] = Ie, f[14] = Oe, f[15] = Be, f[16] = Ce, f[17] = Re, f[18] = je, 0 !== c && (f[19] = c, r.length++), r
        };
        Math.imul || (E = c), o.prototype.mulTo = function (e, t) {
          var r = this.length + e.length;
          return 10 === this.length && 10 === e.length ? E(this, e, t) : r < 63 ? c(this, e, t) : r < 1024 ? h(this, e, t) : u(this, e, t)
        }, d.prototype.makeRBT = function (e) {
          for (var t = new Array(e), r = o.prototype._countBits(e) - 1, i = 0; i < e; i++)t[i] = this.revBin(i, r, e);
          return t
        }, d.prototype.revBin = function (e, t, r) {
          if (0 === e || e === r - 1)return e;
          for (var i = 0, n = 0; n < t; n++)i |= (1 & e) << t - n - 1, e >>= 1;
          return i
        }, d.prototype.permute = function (e, t, r, i, n, o) {
          for (var s = 0; s < o; s++)i[s] = t[e[s]], n[s] = r[e[s]]
        }, d.prototype.transform = function (e, t, r, i, n, o) {
          this.permute(o, e, t, r, i, n);
          for (var s = 1; s < n; s <<= 1)for (var a = s << 1, f = Math.cos(2 * Math.PI / a), c = Math.sin(2 * Math.PI / a), h = 0; h < n; h += a)for (var u = f, d = c, l = 0; l < s; l++) {
            var p = r[h + l], b = i[h + l], y = r[h + l + s], m = i[h + l + s], g = u * y - d * m;
            m = u * m + d * y, y = g, r[h + l] = p + y, i[h + l] = b + m, r[h + l + s] = p - y, i[h + l + s] = b - m, l !== a && (g = f * u - c * d, d = f * d + c * u, u = g)
          }
        }, d.prototype.guessLen13b = function (e, t) {
          var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
          for (r = r / 2 | 0; r; r >>>= 1)n++;
          return 1 << n + 1 + i
        }, d.prototype.conjugate = function (e, t, r) {
          if (!(r <= 1))for (var i = 0; i < r / 2; i++) {
            var n = e[i];
            e[i] = e[r - i - 1], e[r - i - 1] = n, n = t[i], t[i] = -t[r - i - 1], t[r - i - 1] = -n
          }
        }, d.prototype.normalize13b = function (e, t) {
          for (var r = 0, i = 0; i < t / 2; i++) {
            var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
            e[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
          }
          return e
        }, d.prototype.convert13b = function (e, t, r, n) {
          for (var o = 0, s = 0; s < t; s++)o += 0 | e[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
          for (s = 2 * t; s < n; ++s)r[s] = 0;
          i(0 === o), i(0 == (-8192 & o))
        }, d.prototype.stub = function (e) {
          for (var t = new Array(e), r = 0; r < e; r++)t[r] = 0;
          return t
        }, d.prototype.mulp = function (e, t, r) {
          var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), o = this.stub(i), s = new Array(i), a = new Array(i), f = new Array(i), c = new Array(i), h = new Array(i), u = new Array(i), d = r.words;
          d.length = i, this.convert13b(e.words, e.length, s, i), this.convert13b(t.words, t.length, c, i), this.transform(s, o, a, f, i, n), this.transform(c, o, h, u, i, n);
          for (var l = 0; l < i; l++) {
            var p = a[l] * h[l] - f[l] * u[l];
            f[l] = a[l] * u[l] + f[l] * h[l], a[l] = p
          }
          return this.conjugate(a, f, i), this.transform(a, f, d, o, i, n), this.conjugate(d, o, i), this.normalize13b(d, i), r.negative = e.negative ^ t.negative, r.length = e.length + t.length, r.strip()
        }, o.prototype.mul = function (e) {
          var t = new o(null);
          return t.words = new Array(this.length + e.length), this.mulTo(e, t)
        }, o.prototype.mulf = function (e) {
          var t = new o(null);
          return t.words = new Array(this.length + e.length), u(this, e, t)
        }, o.prototype.imul = function (e) {
          return this.clone().mulTo(e, this)
        }, o.prototype.imuln = function (e) {
          i("number" == typeof e), i(e < 67108864);
          for (var t = 0, r = 0; r < this.length; r++) {
            var n = (0 | this.words[r]) * e, o = (67108863 & n) + (67108863 & t);
            t >>= 26, t += n / 67108864 | 0, t += o >>> 26, this.words[r] = 67108863 & o
          }
          return 0 !== t && (this.words[r] = t, this.length++), this
        }, o.prototype.muln = function (e) {
          return this.clone().imuln(e)
        }, o.prototype.sqr = function () {
          return this.mul(this)
        }, o.prototype.isqr = function () {
          return this.imul(this.clone())
        }, o.prototype.pow = function (e) {
          var t = f(e);
          if (0 === t.length)return new o(1);
          for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr());
          if (++i < t.length)for (var n = r.sqr(); i < t.length; i++, n = n.sqr())0 !== t[i] && (r = r.mul(n));
          return r
        }, o.prototype.iushln = function (e) {
          i("number" == typeof e && e >= 0);
          var t, r = e % 26, n = (e - r) / 26, o = 67108863 >>> 26 - r << 26 - r;
          if (0 !== r) {
            var s = 0;
            for (t = 0; t < this.length; t++) {
              var a = this.words[t] & o, f = (0 | this.words[t]) - a << r;
              this.words[t] = f | s, s = a >>> 26 - r
            }
            s && (this.words[t] = s, this.length++)
          }
          if (0 !== n) {
            for (t = this.length - 1; t >= 0; t--)this.words[t + n] = this.words[t];
            for (t = 0; t < n; t++)this.words[t] = 0;
            this.length += n
          }
          return this.strip()
        }, o.prototype.ishln = function (e) {
          return i(0 === this.negative), this.iushln(e)
        }, o.prototype.iushrn = function (e, t, r) {
          i("number" == typeof e && e >= 0);
          var n;
          n = t ? (t - t % 26) / 26 : 0;
          var o = e % 26, s = Math.min((e - o) / 26, this.length), a = 67108863 ^ 67108863 >>> o << o, f = r;
          if (n -= s, n = Math.max(0, n), f) {
            for (var c = 0; c < s; c++)f.words[c] = this.words[c];
            f.length = s
          }
          if (0 === s); else if (this.length > s)for (this.length -= s, c = 0; c < this.length; c++)this.words[c] = this.words[c + s]; else this.words[0] = 0, this.length = 1;
          var h = 0;
          for (c = this.length - 1; c >= 0 && (0 !== h || c >= n); c--) {
            var u = 0 | this.words[c];
            this.words[c] = h << 26 - o | u >>> o, h = u & a
          }
          return f && 0 !== h && (f.words[f.length++] = h), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
        }, o.prototype.ishrn = function (e, t, r) {
          return i(0 === this.negative), this.iushrn(e, t, r)
        }, o.prototype.shln = function (e) {
          return this.clone().ishln(e)
        }, o.prototype.ushln = function (e) {
          return this.clone().iushln(e)
        }, o.prototype.shrn = function (e) {
          return this.clone().ishrn(e)
        }, o.prototype.ushrn = function (e) {
          return this.clone().iushrn(e)
        }, o.prototype.testn = function (e) {
          i("number" == typeof e && e >= 0);
          var t = e % 26, r = (e - t) / 26, n = 1 << t;
          return !(this.length <= r) && !!(this.words[r] & n)
        }, o.prototype.imaskn = function (e) {
          i("number" == typeof e && e >= 0);
          var t = e % 26, r = (e - t) / 26;
          if (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r)return this;
          if (0 !== t && r++, this.length = Math.min(r, this.length), 0 !== t) {
            var n = 67108863 ^ 67108863 >>> t << t;
            this.words[this.length - 1] &= n
          }
          return this.strip()
        }, o.prototype.maskn = function (e) {
          return this.clone().imaskn(e)
        }, o.prototype.iaddn = function (e) {
          return i("number" == typeof e), i(e < 67108864), e < 0 ? this.isubn(-e) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < e ? (this.words[0] = e - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e)
        }, o.prototype._iaddn = function (e) {
          this.words[0] += e;
          for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
          return this.length = Math.max(this.length, t + 1), this
        }, o.prototype.isubn = function (e) {
          if (i("number" == typeof e), i(e < 67108864), e < 0)return this.iaddn(-e);
          if (0 !== this.negative)return this.negative = 0, this.iaddn(e), this.negative = 1, this;
          if (this.words[0] -= e, 1 === this.length && this.words[0] < 0)this.words[0] = -this.words[0], this.negative = 1; else for (var t = 0; t < this.length && this.words[t] < 0; t++)this.words[t] += 67108864, this.words[t + 1] -= 1;
          return this.strip()
        }, o.prototype.addn = function (e) {
          return this.clone().iaddn(e)
        }, o.prototype.subn = function (e) {
          return this.clone().isubn(e)
        }, o.prototype.iabs = function () {
          return this.negative = 0, this
        }, o.prototype.abs = function () {
          return this.clone().iabs()
        }, o.prototype._ishlnsubmul = function (e, t, r) {
          var n, o = e.length + r;
          this._expand(o);
          var s, a = 0;
          for (n = 0; n < e.length; n++) {
            s = (0 | this.words[n + r]) + a;
            var f = (0 | e.words[n]) * t;
            s -= 67108863 & f, a = (s >> 26) - (f / 67108864 | 0), this.words[n + r] = 67108863 & s
          }
          for (; n < this.length - r; n++)s = (0 | this.words[n + r]) + a, a = s >> 26, this.words[n + r] = 67108863 & s;
          if (0 === a)return this.strip();
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)s = -(0 | this.words[n]) + a, a = s >> 26, this.words[n] = 67108863 & s;
          return this.negative = 1, this.strip()
        }, o.prototype._wordDiv = function (e, t) {
          var r = this.length - e.length, i = this.clone(), n = e, s = 0 | n.words[n.length - 1];
          0 !== (r = 26 - this._countBits(s)) && (n = n.ushln(r), i.iushln(r), s = 0 | n.words[n.length - 1]);
          var a, f = i.length - n.length;
          if ("mod" !== t) {
            a = new o(null), a.length = f + 1, a.words = new Array(a.length);
            for (var c = 0; c < a.length; c++)a.words[c] = 0
          }
          var h = i.clone()._ishlnsubmul(n, 1, f);
          0 === h.negative && (i = h, a && (a.words[f] = 1));
          for (var u = f - 1; u >= 0; u--) {
            var d = 67108864 * (0 | i.words[n.length + u]) + (0 | i.words[n.length + u - 1]);
            for (d = Math.min(d / s | 0, 67108863), i._ishlnsubmul(n, d, u); 0 !== i.negative;)d--, i.negative = 0, i._ishlnsubmul(n, 1, u), i.isZero() || (i.negative ^= 1);
            a && (a.words[u] = d)
          }
          return a && a.strip(), i.strip(), "div" !== t && 0 !== r && i.iushrn(r), {div: a || null, mod: i}
        }, o.prototype.divmod = function (e, t, r) {
          if (i(!e.isZero()), this.isZero())return {div: new o(0), mod: new o(0)};
          var n, s, a;
          return 0 !== this.negative && 0 === e.negative ? (a = this.neg().divmod(e, t), "mod" !== t && (n = a.div.neg()), "div" !== t && (s = a.mod.neg(), r && 0 !== s.negative && s.iadd(e)), {
            div: n,
            mod: s
          }) : 0 === this.negative && 0 !== e.negative ? (a = this.divmod(e.neg(), t), "mod" !== t && (n = a.div.neg()), {
            div: n,
            mod: a.mod
          }) : 0 != (this.negative & e.negative) ? (a = this.neg().divmod(e.neg(), t), "div" !== t && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(e)), {
            div: a.div,
            mod: s
          }) : e.length > this.length || this.cmp(e) < 0 ? {
            div: new o(0),
            mod: this
          } : 1 === e.length ? "div" === t ? {div: this.divn(e.words[0]), mod: null} : "mod" === t ? {
            div: null,
            mod: new o(this.modn(e.words[0]))
          } : {div: this.divn(e.words[0]), mod: new o(this.modn(e.words[0]))} : this._wordDiv(e, t)
        }, o.prototype.div = function (e) {
          return this.divmod(e, "div", !1).div
        }, o.prototype.mod = function (e) {
          return this.divmod(e, "mod", !1).mod
        }, o.prototype.umod = function (e) {
          return this.divmod(e, "mod", !0).mod
        }, o.prototype.divRound = function (e) {
          var t = this.divmod(e);
          if (t.mod.isZero())return t.div;
          var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), o = r.cmp(i);
          return o < 0 || 1 === n && 0 === o ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1)
        }, o.prototype.modn = function (e) {
          i(e <= 67108863);
          for (var t = (1 << 26) % e, r = 0, n = this.length - 1; n >= 0; n--)r = (t * r + (0 | this.words[n])) % e;
          return r
        }, o.prototype.idivn = function (e) {
          i(e <= 67108863);
          for (var t = 0, r = this.length - 1; r >= 0; r--) {
            var n = (0 | this.words[r]) + 67108864 * t;
            this.words[r] = n / e | 0, t = n % e
          }
          return this.strip()
        }, o.prototype.divn = function (e) {
          return this.clone().idivn(e)
        }, o.prototype.egcd = function (e) {
          i(0 === e.negative), i(!e.isZero());
          var t = this, r = e.clone();
          t = 0 !== t.negative ? t.umod(e) : t.clone();
          for (var n = new o(1), s = new o(0), a = new o(0), f = new o(1), c = 0; t.isEven() && r.isEven();)t.iushrn(1), r.iushrn(1), ++c;
          for (var h = r.clone(), u = t.clone(); !t.isZero();) {
            for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d, l <<= 1);
            if (d > 0)for (t.iushrn(d); d-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(h), s.isub(u)), n.iushrn(1), s.iushrn(1);
            for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1);
            if (p > 0)for (r.iushrn(p); p-- > 0;)(a.isOdd() || f.isOdd()) && (a.iadd(h), f.isub(u)), a.iushrn(1), f.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), n.isub(a), s.isub(f)) : (r.isub(t), a.isub(n), f.isub(s))
          }
          return {a: a, b: f, gcd: r.iushln(c)}
        }, o.prototype._invmp = function (e) {
          i(0 === e.negative), i(!e.isZero());
          var t = this, r = e.clone();
          t = 0 !== t.negative ? t.umod(e) : t.clone();
          for (var n = new o(1), s = new o(0), a = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0;) {
            for (var f = 0, c = 1; 0 == (t.words[0] & c) && f < 26; ++f, c <<= 1);
            if (f > 0)for (t.iushrn(f); f-- > 0;)n.isOdd() && n.iadd(a), n.iushrn(1);
            for (var h = 0, u = 1; 0 == (r.words[0] & u) && h < 26; ++h, u <<= 1);
            if (h > 0)for (r.iushrn(h); h-- > 0;)s.isOdd() && s.iadd(a), s.iushrn(1);
            t.cmp(r) >= 0 ? (t.isub(r), n.isub(s)) : (r.isub(t), s.isub(n))
          }
          var d;
          return d = 0 === t.cmpn(1) ? n : s, d.cmpn(0) < 0 && d.iadd(e), d
        }, o.prototype.gcd = function (e) {
          if (this.isZero())return e.abs();
          if (e.isZero())return this.abs();
          var t = this.clone(), r = e.clone();
          t.negative = 0, r.negative = 0;
          for (var i = 0; t.isEven() && r.isEven(); i++)t.iushrn(1), r.iushrn(1);
          for (; ;) {
            for (; t.isEven();)t.iushrn(1);
            for (; r.isEven();)r.iushrn(1);
            var n = t.cmp(r);
            if (n < 0) {
              var o = t;
              t = r, r = o
            } else if (0 === n || 0 === r.cmpn(1))break;
            t.isub(r)
          }
          return r.iushln(i)
        }, o.prototype.invm = function (e) {
          return this.egcd(e).a.umod(e)
        }, o.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }, o.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }, o.prototype.andln = function (e) {
          return this.words[0] & e
        }, o.prototype.bincn = function (e) {
          i("number" == typeof e);
          var t = e % 26, r = (e - t) / 26, n = 1 << t;
          if (this.length <= r)return this._expand(r + 1), this.words[r] |= n, this;
          for (var o = n, s = r; 0 !== o && s < this.length; s++) {
            var a = 0 | this.words[s];
            a += o, o = a >>> 26, a &= 67108863, this.words[s] = a
          }
          return 0 !== o && (this.words[s] = o, this.length++), this
        }, o.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }, o.prototype.cmpn = function (e) {
          var t = e < 0;
          if (0 !== this.negative && !t)return -1;
          if (0 === this.negative && t)return 1;
          this.strip();
          var r;
          if (this.length > 1)r = 1; else {
            t && (e = -e), i(e <= 67108863, "Number is too big");
            var n = 0 | this.words[0];
            r = n === e ? 0 : n < e ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -r : r
        }, o.prototype.cmp = function (e) {
          if (0 !== this.negative && 0 === e.negative)return -1;
          if (0 === this.negative && 0 !== e.negative)return 1;
          var t = this.ucmp(e);
          return 0 !== this.negative ? 0 | -t : t
        }, o.prototype.ucmp = function (e) {
          if (this.length > e.length)return 1;
          if (this.length < e.length)return -1;
          for (var t = 0, r = this.length - 1; r >= 0; r--) {
            var i = 0 | this.words[r], n = 0 | e.words[r];
            if (i !== n) {
              i < n ? t = -1 : i > n && (t = 1);
              break
            }
          }
          return t
        }, o.prototype.gtn = function (e) {
          return 1 === this.cmpn(e)
        }, o.prototype.gt = function (e) {
          return 1 === this.cmp(e)
        }, o.prototype.gten = function (e) {
          return this.cmpn(e) >= 0
        }, o.prototype.gte = function (e) {
          return this.cmp(e) >= 0
        }, o.prototype.ltn = function (e) {
          return -1 === this.cmpn(e)
        }, o.prototype.lt = function (e) {
          return -1 === this.cmp(e)
        }, o.prototype.lten = function (e) {
          return this.cmpn(e) <= 0
        }, o.prototype.lte = function (e) {
          return this.cmp(e) <= 0
        }, o.prototype.eqn = function (e) {
          return 0 === this.cmpn(e)
        }, o.prototype.eq = function (e) {
          return 0 === this.cmp(e)
        }, o.red = function (e) {
          return new g(e)
        }, o.prototype.toRed = function (e) {
          return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), e.convertTo(this)._forceRed(e)
        }, o.prototype.fromRed = function () {
          return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
        }, o.prototype._forceRed = function (e) {
          return this.red = e, this
        }, o.prototype.forceRed = function (e) {
          return i(!this.red, "Already a number in reduction context"), this._forceRed(e)
        }, o.prototype.redAdd = function (e) {
          return i(this.red, "redAdd works only with red numbers"), this.red.add(this, e)
        }, o.prototype.redIAdd = function (e) {
          return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e)
        }, o.prototype.redSub = function (e) {
          return i(this.red, "redSub works only with red numbers"), this.red.sub(this, e)
        }, o.prototype.redISub = function (e) {
          return i(this.red, "redISub works only with red numbers"), this.red.isub(this, e)
        }, o.prototype.redShl = function (e) {
          return i(this.red, "redShl works only with red numbers"), this.red.shl(this, e)
        }, o.prototype.redMul = function (e) {
          return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e)
        }, o.prototype.redIMul = function (e) {
          return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e)
        }, o.prototype.redSqr = function () {
          return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
        }, o.prototype.redISqr = function () {
          return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
        }, o.prototype.redSqrt = function () {
          return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
        }, o.prototype.redInvm = function () {
          return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
        }, o.prototype.redNeg = function () {
          return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
        }, o.prototype.redPow = function (e) {
          return i(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e)
        };
        var M = {k256: null, p224: null, p192: null, p25519: null};
        l.prototype._tmp = function () {
          var e = new o(null);
          return e.words = new Array(Math.ceil(this.n / 13)), e
        }, l.prototype.ireduce = function (e) {
          var t, r = e;
          do {
            this.split(r, this.tmp), r = this.imulK(r), r = r.iadd(this.tmp), t = r.bitLength()
          } while (t > this.n);
          var i = t < this.n ? -1 : r.ucmp(this.p);
          return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(), r
        }, l.prototype.split = function (e, t) {
          e.iushrn(this.n, 0, t)
        }, l.prototype.imulK = function (e) {
          return e.imul(this.k)
        }, n(p, l), p.prototype.split = function (e, t) {
          for (var r = Math.min(e.length, 9), i = 0; i < r; i++)t.words[i] = e.words[i];
          if (t.length = r, e.length <= 9)return e.words[0] = 0, void(e.length = 1);
          var n = e.words[9];
          for (t.words[t.length++] = 4194303 & n, i = 10; i < e.length; i++) {
            var o = 0 | e.words[i];
            e.words[i - 10] = (4194303 & o) << 4 | n >>> 22, n = o
          }
          n >>>= 22, e.words[i - 10] = n, 0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9
        }, p.prototype.imulK = function (e) {
          e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
          for (var t = 0, r = 0; r < e.length; r++) {
            var i = 0 | e.words[r];
            t += 977 * i, e.words[r] = 67108863 & t, t = 64 * i + (t / 67108864 | 0)
          }
          return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e
        }, n(b, l), n(y, l), n(m, l), m.prototype.imulK = function (e) {
          for (var t = 0, r = 0; r < e.length; r++) {
            var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
            i >>>= 26, e.words[r] = n, t = i
          }
          return 0 !== t && (e.words[e.length++] = t), e
        }, o._prime = function (e) {
          if (M[e])return M[e];
          var t;
          if ("k256" === e)t = new p; else if ("p224" === e)t = new b; else if ("p192" === e)t = new y; else {
            if ("p25519" !== e)throw new Error("Unknown prime " + e);
            t = new m
          }
          return M[e] = t, t
        }, g.prototype._verify1 = function (e) {
          i(0 === e.negative, "red works only with positives"), i(e.red, "red works only with red numbers")
        }, g.prototype._verify2 = function (e, t) {
          i(0 == (e.negative | t.negative), "red works only with positives"), i(e.red && e.red === t.red, "red works only with red numbers")
        }, g.prototype.imod = function (e) {
          return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this)
        }, g.prototype.neg = function (e) {
          return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this)
        }, g.prototype.add = function (e, t) {
          this._verify2(e, t);
          var r = e.add(t);
          return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
        }, g.prototype.iadd = function (e, t) {
          this._verify2(e, t);
          var r = e.iadd(t);
          return r.cmp(this.m) >= 0 && r.isub(this.m), r
        }, g.prototype.sub = function (e, t) {
          this._verify2(e, t);
          var r = e.sub(t);
          return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
        }, g.prototype.isub = function (e, t) {
          this._verify2(e, t);
          var r = e.isub(t);
          return r.cmpn(0) < 0 && r.iadd(this.m), r
        }, g.prototype.shl = function (e, t) {
          return this._verify1(e), this.imod(e.ushln(t))
        }, g.prototype.imul = function (e, t) {
          return this._verify2(e, t), this.imod(e.imul(t))
        }, g.prototype.mul = function (e, t) {
          return this._verify2(e, t), this.imod(e.mul(t))
        }, g.prototype.isqr = function (e) {
          return this.imul(e, e.clone())
        }, g.prototype.sqr = function (e) {
          return this.mul(e, e)
        }, g.prototype.sqrt = function (e) {
          if (e.isZero())return e.clone();
          var t = this.m.andln(3);
          if (i(t % 2 == 1), 3 === t) {
            var r = this.m.add(new o(1)).iushrn(2);
            return this.pow(e, r)
          }
          for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);)s++, n.iushrn(1);
          i(!n.isZero());
          var a = new o(1).toRed(this), f = a.redNeg(), c = this.m.subn(1).iushrn(1), h = this.m.bitLength();
          for (h = new o(2 * h * h).toRed(this); 0 !== this.pow(h, c).cmp(f);)h.redIAdd(f);
          for (var u = this.pow(h, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = s; 0 !== l.cmp(a);) {
            for (var b = l, y = 0; 0 !== b.cmp(a); y++)b = b.redSqr();
            i(y < p);
            var m = this.pow(u, new o(1).iushln(p - y - 1));
            d = d.redMul(m), u = m.redSqr(), l = l.redMul(u), p = y
          }
          return d
        }, g.prototype.invm = function (e) {
          var t = e._invmp(this.m);
          return 0 !== t.negative ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t)
        }, g.prototype.pow = function (e, t) {
          if (t.isZero())return new o(1).toRed(this);
          if (0 === t.cmpn(1))return e.clone();
          var r = new Array(16);
          r[0] = new o(1).toRed(this), r[1] = e;
          for (var i = 2; i < r.length; i++)r[i] = this.mul(r[i - 1], e);
          var n = r[0], s = 0, a = 0, f = t.bitLength() % 26;
          for (0 === f && (f = 26), i = t.length - 1; i >= 0; i--) {
            for (var c = t.words[i], h = f - 1; h >= 0; h--) {
              var u = c >> h & 1;
              n !== r[0] && (n = this.sqr(n)), 0 !== u || 0 !== s ? (s <<= 1, s |= u, (4 === ++a || 0 === i && 0 === h) && (n = this.mul(n, r[s]), a = 0, s = 0)) : a = 0
            }
            f = 26
          }
          return n
        }, g.prototype.convertTo = function (e) {
          var t = e.umod(this.m);
          return t === e ? t.clone() : t
        }, g.prototype.convertFrom = function (e) {
          var t = e.clone();
          return t.red = null, t
        }, o.mont = function (e) {
          return new v(e)
        }, n(v, g), v.prototype.convertTo = function (e) {
          return this.imod(e.ushln(this.shift))
        }, v.prototype.convertFrom = function (e) {
          var t = this.imod(e.mul(this.rinv));
          return t.red = null, t
        }, v.prototype.imul = function (e, t) {
          if (e.isZero() || t.isZero())return e.words[0] = 0, e.length = 1, e;
          var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), o = n;
          return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
        }, v.prototype.mul = function (e, t) {
          if (e.isZero() || t.isZero())return new o(0)._forceRed(this);
          var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), s = n;
          return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
        }, v.prototype.invm = function (e) {
          return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)
        }
      }(void 0 === e || e, this)
    }).call(t, r(163)(e))
  }, function (e, t, r) {
    "use strict";
    var i = t;
    i.version = r(128).version, i.utils = r(127), i.rand = r(41), i.curve = r(20), i.curves = r(119), i.ec = r(120), i.eddsa = r(123)
  }, function (e, t) {
    function r(e, t) {
      if (!e)throw new Error(t || "Assertion failed")
    }

    e.exports = r, r.equal = function (e, t, r) {
      if (e != t)throw new Error(r || "Assertion failed: " + e + " != " + t)
    }
  }, function (e, t) {
    var r;
    r = function () {
      return this
    }();
    try {
      r = r || Function("return this")() || (0, eval)("this")
    } catch (e) {
      "object" == typeof window && (r = window)
    }
    e.exports = r
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      if (Array.isArray(e))return e.slice();
      if (!e)return [];
      var r = [];
      if ("string" == typeof e)if (t) {
        if ("hex" === t)for (e = e.replace(/[^a-z0-9]+/gi, ""), e.length % 2 != 0 && (e = "0" + e), i = 0; i < e.length; i += 2)r.push(parseInt(e[i] + e[i + 1], 16))
      } else for (var i = 0; i < e.length; i++) {
        var n = e.charCodeAt(i), o = n >> 8, s = 255 & n;
        o ? r.push(o, s) : r.push(s)
      } else for (i = 0; i < e.length; i++)r[i] = 0 | e[i];
      return r
    }

    function n(e) {
      for (var t = "", r = 0; r < e.length; r++)t += a(e[r].toString(16));
      return t
    }

    function o(e) {
      return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0
    }

    function s(e, t) {
      for (var r = "", i = 0; i < e.length; i++) {
        var n = e[i];
        "little" === t && (n = o(n)), r += f(n.toString(16))
      }
      return r
    }

    function a(e) {
      return 1 === e.length ? "0" + e : e
    }

    function f(e) {
      return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e
    }

    function c(e, t, r, i) {
      var n = r - t;
      x(n % 4 == 0);
      for (var o = new Array(n / 4), s = 0, a = t; s < o.length; s++, a += 4) {
        var f;
        f = "big" === i ? e[a] << 24 | e[a + 1] << 16 | e[a + 2] << 8 | e[a + 3] : e[a + 3] << 24 | e[a + 2] << 16 | e[a + 1] << 8 | e[a], o[s] = f >>> 0
      }
      return o
    }

    function h(e, t) {
      for (var r = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++, n += 4) {
        var o = e[i];
        "big" === t ? (r[n] = o >>> 24, r[n + 1] = o >>> 16 & 255, r[n + 2] = o >>> 8 & 255, r[n + 3] = 255 & o) : (r[n + 3] = o >>> 24, r[n + 2] = o >>> 16 & 255, r[n + 1] = o >>> 8 & 255, r[n] = 255 & o)
      }
      return r
    }

    function u(e, t) {
      return e >>> t | e << 32 - t
    }

    function d(e, t) {
      return e << t | e >>> 32 - t
    }

    function l(e, t) {
      return e + t >>> 0
    }

    function p(e, t, r) {
      return e + t + r >>> 0
    }

    function b(e, t, r, i) {
      return e + t + r + i >>> 0
    }

    function y(e, t, r, i, n) {
      return e + t + r + i + n >>> 0
    }

    function m(e, t, r, i) {
      var n = e[t], o = e[t + 1], s = i + o >>> 0, a = (s < i ? 1 : 0) + r + n;
      e[t] = a >>> 0, e[t + 1] = s
    }

    function g(e, t, r, i) {
      return (t + i >>> 0 < t ? 1 : 0) + e + r >>> 0
    }

    function v(e, t, r, i) {
      return t + i >>> 0
    }

    function w(e, t, r, i, n, o, s, a) {
      var f = 0, c = t;
      return c = c + i >>> 0, f += c < t ? 1 : 0, c = c + o >>> 0, f += c < o ? 1 : 0, c = c + a >>> 0, f += c < a ? 1 : 0, e + r + n + s + f >>> 0
    }

    function _(e, t, r, i, n, o, s, a) {
      return t + i + o + a >>> 0
    }

    function S(e, t, r, i, n, o, s, a, f, c) {
      var h = 0, u = t;
      return u = u + i >>> 0, h += u < t ? 1 : 0, u = u + o >>> 0, h += u < o ? 1 : 0, u = u + a >>> 0, h += u < a ? 1 : 0, u = u + c >>> 0, h += u < c ? 1 : 0, e + r + n + s + f + h >>> 0
    }

    function k(e, t, r, i, n, o, s, a, f, c) {
      return t + i + o + a + c >>> 0
    }

    function E(e, t, r) {
      return (t << 32 - r | e >>> r) >>> 0
    }

    function M(e, t, r) {
      return (e << 32 - r | t >>> r) >>> 0
    }

    function A(e, t, r) {
      return e >>> r
    }

    function T(e, t, r) {
      return (e << 32 - r | t >>> r) >>> 0
    }

    var x = r(5), I = r(0);
    t.inherits = I, t.toArray = i, t.toHex = n, t.htonl = o, t.toHex32 = s, t.zero2 = a, t.zero8 = f, t.join32 = c, t.split32 = h, t.rotr32 = u, t.rotl32 = d, t.sum32 = l, t.sum32_3 = p, t.sum32_4 = b, t.sum32_5 = y, t.sum64 = m, t.sum64_hi = g, t.sum64_lo = v, t.sum64_4_hi = w, t.sum64_4_lo = _, t.sum64_5_hi = S, t.sum64_5_lo = k, t.rotr64_hi = E, t.rotr64_lo = M, t.shr64_hi = A, t.shr64_lo = T
  }, function (e, t, r) {
    function i(e) {
      o.call(this), this.hashMode = "string" == typeof e, this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
    }

    var n = r(1).Buffer, o = r(35).Transform, s = r(36).StringDecoder;
    r(0)(i, o), i.prototype.update = function (e, t, r) {
      "string" == typeof e && (e = n.from(e, t));
      var i = this._update(e);
      return this.hashMode ? this : (r && (i = this._toString(i, r)), i)
    }, i.prototype.setAutoPadding = function () {
    }, i.prototype.getAuthTag = function () {
      throw new Error("trying to get auth tag in unsupported state")
    }, i.prototype.setAuthTag = function () {
      throw new Error("trying to set auth tag in unsupported state")
    }, i.prototype.setAAD = function () {
      throw new Error("trying to set aad in unsupported state")
    }, i.prototype._transform = function (e, t, r) {
      var i;
      try {
        this.hashMode ? this._update(e) : this.push(this._update(e))
      } catch (e) {
        i = e
      } finally {
        r(i)
      }
    }, i.prototype._flush = function (e) {
      var t;
      try {
        this.push(this.__final())
      } catch (e) {
        t = e
      }
      e(t)
    }, i.prototype._finalOrDigest = function (e) {
      var t = this.__final() || n.alloc(0);
      return e && (t = this._toString(t, e, !0)), t
    }, i.prototype._toString = function (e, t, r) {
      if (this._decoder || (this._decoder = new s(t), this._encoding = t), this._encoding !== t)throw new Error("can't switch encodings");
      var i = this._decoder.write(e);
      return r && (i += this._decoder.end()), i
    }, e.exports = i
  }, function (e, t) {
    function r() {
      throw new Error("setTimeout has not been defined")
    }

    function i() {
      throw new Error("clearTimeout has not been defined")
    }

    function n(e) {
      if (h === setTimeout)return setTimeout(e, 0);
      if ((h === r || !h) && setTimeout)return h = setTimeout, setTimeout(e, 0);
      try {
        return h(e, 0)
      } catch (t) {
        try {
          return h.call(null, e, 0)
        } catch (t) {
          return h.call(this, e, 0)
        }
      }
    }

    function o(e) {
      if (u === clearTimeout)return clearTimeout(e);
      if ((u === i || !u) && clearTimeout)return u = clearTimeout, clearTimeout(e);
      try {
        return u(e)
      } catch (t) {
        try {
          return u.call(null, e)
        } catch (t) {
          return u.call(this, e)
        }
      }
    }

    function s() {
      b && l && (b = !1, l.length ? p = l.concat(p) : y = -1, p.length && a())
    }

    function a() {
      if (!b) {
        var e = n(s);
        b = !0;
        for (var t = p.length; t;) {
          for (l = p, p = []; ++y < t;)l && l[y].run();
          y = -1, t = p.length
        }
        l = null, b = !1, o(e)
      }
    }

    function f(e, t) {
      this.fun = e, this.array = t
    }

    function c() {
    }

    var h, u, d = e.exports = {};
    !function () {
      try {
        h = "function" == typeof setTimeout ? setTimeout : r
      } catch (e) {
        h = r
      }
      try {
        u = "function" == typeof clearTimeout ? clearTimeout : i
      } catch (e) {
        u = i
      }
    }();
    var l, p = [], b = !1, y = -1;
    d.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)for (var r = 1; r < arguments.length; r++)t[r - 1] = arguments[r];
      p.push(new f(e, t)), 1 !== p.length || b || n(a)
    }, f.prototype.run = function () {
      this.fun.apply(null, this.array)
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, d.removeAllListeners = c, d.emit = c, d.prependListener = c, d.prependOnceListener = c, d.listeners = function (e) {
      return []
    }, d.binding = function (e) {
      throw new Error("process.binding is not supported")
    }, d.cwd = function () {
      return "/"
    }, d.chdir = function (e) {
      throw new Error("process.chdir is not supported")
    }, d.umask = function () {
      return 0
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (!(this instanceof i))return new i(e);
      c.call(this, e), h.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", n)
    }

    function n() {
      this.allowHalfOpen || this._writableState.ended || s.nextTick(o, this)
    }

    function o(e) {
      e.end()
    }

    var s = r(23), a = Object.keys || function (e) {
        var t = [];
        for (var r in e)t.push(r);
        return t
      };
    e.exports = i;
    var f = r(16);
    f.inherits = r(0);
    var c = r(66), h = r(31);
    f.inherits(i, c);
    for (var u = a(h.prototype), d = 0; d < u.length; d++) {
      var l = u[d];
      i.prototype[l] || (i.prototype[l] = h.prototype[l])
    }
    Object.defineProperty(i.prototype, "writableHighWaterMark", {
      enumerable: !1, get: function () {
        return this._writableState.highWaterMark
      }
    }), Object.defineProperty(i.prototype, "destroyed", {
      get: function () {
        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
      }, set: function (e) {
        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
      }
    }), i.prototype._destroy = function (e, t) {
      this.push(null), this.end(), s.nextTick(t, e)
    }
  }, function (e, t, r) {
    "use strict";
    (function (t, i) {
      function n() {
        throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
      }

      function o(e, r) {
        if (e > 65536)throw new Error("requested too many random bytes");
        var n = new t.Uint8Array(e);
        e > 0 && a.getRandomValues(n);
        var o = s.from(n.buffer);
        return "function" == typeof r ? i.nextTick(function () {
          r(null, o)
        }) : o
      }

      var s = r(1).Buffer, a = t.crypto || t.msCrypto;
      a && a.getRandomValues ? e.exports = o : e.exports = n
    }).call(t, r(6), r(9))
  }, function (e, t, r) {
    function i(e, t) {
      this._block = n.alloc(e), this._finalSize = t, this._blockSize = e, this._len = 0
    }

    var n = r(1).Buffer;
    i.prototype.update = function (e, t) {
      "string" == typeof e && (t = t || "utf8", e = n.from(e, t));
      for (var r = this._block, i = this._blockSize, o = e.length, s = this._len, a = 0; a < o;) {
        for (var f = s % i, c = Math.min(o - a, i - f), h = 0; h < c; h++)r[f + h] = e[a + h];
        s += c, a += c, s % i == 0 && this._update(r)
      }
      return this._len += o, this
    }, i.prototype.digest = function (e) {
      var t = this._len % this._blockSize;
      this._block[t] = 128, this._block.fill(0, t + 1), t >= this._finalSize && (this._update(this._block), this._block.fill(0));
      var r = 8 * this._len;
      if (r <= 4294967295)this._block.writeUInt32BE(r, this._blockSize - 4); else {
        var i = (4294967295 & r) >>> 0, n = (r - i) / 4294967296;
        this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(i, this._blockSize - 4)
      }
      this._update(this._block);
      var o = this._hash();
      return e ? o.toString(e) : o
    }, i.prototype._update = function () {
      throw new Error("_update must be implemented by subclass")
    }, e.exports = i
  }, function (e, t, r) {
    var i = t;
    i.bignum = r(3), i.define = r(79).define, i.base = r(14), i.constants = r(38), i.decoders = r(83), i.encoders = r(85)
  }, function (e, t, r) {
    var i = t;
    i.Reporter = r(81).Reporter, i.DecoderBuffer = r(37).DecoderBuffer, i.EncoderBuffer = r(37).EncoderBuffer, i.Node = r(80)
  }, function (e, t, r) {
    (function (t) {
      e.exports = function (e, r) {
        for (var i = Math.min(e.length, r.length), n = new t(i), o = 0; o < i; ++o)n[o] = e[o] ^ r[o];
        return n
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (e) {
      function r(e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === y(e)
      }

      function i(e) {
        return "boolean" == typeof e
      }

      function n(e) {
        return null === e
      }

      function o(e) {
        return null == e
      }

      function s(e) {
        return "number" == typeof e
      }

      function a(e) {
        return "string" == typeof e
      }

      function f(e) {
        return "symbol" == typeof e
      }

      function c(e) {
        return void 0 === e
      }

      function h(e) {
        return "[object RegExp]" === y(e)
      }

      function u(e) {
        return "object" == typeof e && null !== e
      }

      function d(e) {
        return "[object Date]" === y(e)
      }

      function l(e) {
        return "[object Error]" === y(e) || e instanceof Error
      }

      function p(e) {
        return "function" == typeof e
      }

      function b(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
      }

      function y(e) {
        return Object.prototype.toString.call(e)
      }

      t.isArray = r, t.isBoolean = i, t.isNull = n, t.isNullOrUndefined = o, t.isNumber = s, t.isString = a, t.isSymbol = f, t.isUndefined = c, t.isRegExp = h, t.isObject = u, t.isDate = d, t.isError = l, t.isFunction = p, t.isPrimitive = b, t.isBuffer = e.isBuffer
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      f.call(this, "digest"), this._hash = e
    }

    var n = r(0), o = r(30), s = r(33), a = r(34), f = r(8);
    n(i, f), i.prototype._update = function (e) {
      this._hash.update(e)
    }, i.prototype._final = function () {
      return this._hash.digest()
    }, e.exports = function (e) {
      return e = e.toLowerCase(), "md5" === e ? new o : "rmd160" === e || "ripemd160" === e ? new s : new i(a(e))
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
    }

    var n = r(7), o = r(5);
    t.BlockHash = i, i.prototype.update = function (e, t) {
      if (e = n.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
        e = this.pending;
        var r = e.length % this._delta8;
        this.pending = e.slice(e.length - r, e.length), 0 === this.pending.length && (this.pending = null), e = n.join32(e, 0, e.length - r, this.endian);
        for (var i = 0; i < e.length; i += this._delta32)this._update(e, i, i + this._delta32)
      }
      return this
    }, i.prototype.digest = function (e) {
      return this.update(this._pad()), o(null === this.pending), this._digest(e)
    }, i.prototype._pad = function () {
      var e = this.pendingTotal, t = this._delta8, r = t - (e + this.padLength) % t, i = new Array(r + this.padLength);
      i[0] = 128;
      for (var n = 1; n < r; n++)i[n] = 0;
      if (e <<= 3, "big" === this.endian) {
        for (var o = 8; o < this.padLength; o++)i[n++] = 0;
        i[n++] = 0, i[n++] = 0, i[n++] = 0, i[n++] = 0, i[n++] = e >>> 24 & 255, i[n++] = e >>> 16 & 255, i[n++] = e >>> 8 & 255, i[n++] = 255 & e
      } else for (i[n++] = 255 & e, i[n++] = e >>> 8 & 255, i[n++] = e >>> 16 & 255, i[n++] = e >>> 24 & 255, i[n++] = 0, i[n++] = 0, i[n++] = 0, i[n++] = 0, o = 8; o < this.padLength; o++)i[n++] = 0;
      return i
    }
  }, function (e, t, r) {
    function i(e) {
      a.isBuffer(e) || (e = a.from(e));
      for (var t = e.length / 4 | 0, r = new Array(t), i = 0; i < t; i++)r[i] = e.readUInt32BE(4 * i);
      return r
    }

    function n(e) {
      for (; 0 < e.length; e++)e[0] = 0
    }

    function o(e, t, r, i, n) {
      for (var o, s, a, f, c = r[0], h = r[1], u = r[2], d = r[3], l = e[0] ^ t[0], p = e[1] ^ t[1], b = e[2] ^ t[2], y = e[3] ^ t[3], m = 4, g = 1; g < n; g++)o = c[l >>> 24] ^ h[p >>> 16 & 255] ^ u[b >>> 8 & 255] ^ d[255 & y] ^ t[m++], s = c[p >>> 24] ^ h[b >>> 16 & 255] ^ u[y >>> 8 & 255] ^ d[255 & l] ^ t[m++], a = c[b >>> 24] ^ h[y >>> 16 & 255] ^ u[l >>> 8 & 255] ^ d[255 & p] ^ t[m++], f = c[y >>> 24] ^ h[l >>> 16 & 255] ^ u[p >>> 8 & 255] ^ d[255 & b] ^ t[m++], l = o, p = s, b = a, y = f;
      return o = (i[l >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[b >>> 8 & 255] << 8 | i[255 & y]) ^ t[m++], s = (i[p >>> 24] << 24 | i[b >>> 16 & 255] << 16 | i[y >>> 8 & 255] << 8 | i[255 & l]) ^ t[m++], a = (i[b >>> 24] << 24 | i[y >>> 16 & 255] << 16 | i[l >>> 8 & 255] << 8 | i[255 & p]) ^ t[m++], f = (i[y >>> 24] << 24 | i[l >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & b]) ^ t[m++], o >>>= 0, s >>>= 0, a >>>= 0, f >>>= 0, [o, s, a, f]
    }

    function s(e) {
      this._key = i(e), this._reset()
    }

    var a = r(1).Buffer, f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], c = function () {
      for (var e = new Array(256), t = 0; t < 256; t++)e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
      for (var r = [], i = [], n = [[], [], [], []], o = [[], [], [], []], s = 0, a = 0, f = 0; f < 256; ++f) {
        var c = a ^ a << 1 ^ a << 2 ^ a << 3 ^ a << 4;
        c = c >>> 8 ^ 255 & c ^ 99, r[s] = c, i[c] = s;
        var h = e[s], u = e[h], d = e[u], l = 257 * e[c] ^ 16843008 * c;
        n[0][s] = l << 24 | l >>> 8, n[1][s] = l << 16 | l >>> 16, n[2][s] = l << 8 | l >>> 24, n[3][s] = l, l = 16843009 * d ^ 65537 * u ^ 257 * h ^ 16843008 * s, o[0][c] = l << 24 | l >>> 8, o[1][c] = l << 16 | l >>> 16, o[2][c] = l << 8 | l >>> 24, o[3][c] = l, 0 === s ? s = a = 1 : (s = h ^ e[e[e[d ^ h]]], a ^= e[e[a]])
      }
      return {SBOX: r, INV_SBOX: i, SUB_MIX: n, INV_SUB_MIX: o}
    }();
    s.blockSize = 16, s.keySize = 32, s.prototype.blockSize = s.blockSize, s.prototype.keySize = s.keySize, s.prototype._reset = function () {
      for (var e = this._key, t = e.length, r = t + 6, i = 4 * (r + 1), n = [], o = 0; o < t; o++)n[o] = e[o];
      for (o = t; o < i; o++) {
        var s = n[o - 1];
        o % t == 0 ? (s = s << 8 | s >>> 24, s = c.SBOX[s >>> 24] << 24 | c.SBOX[s >>> 16 & 255] << 16 | c.SBOX[s >>> 8 & 255] << 8 | c.SBOX[255 & s], s ^= f[o / t | 0] << 24) : t > 6 && o % t == 4 && (s = c.SBOX[s >>> 24] << 24 | c.SBOX[s >>> 16 & 255] << 16 | c.SBOX[s >>> 8 & 255] << 8 | c.SBOX[255 & s]), n[o] = n[o - t] ^ s
      }
      for (var a = [], h = 0; h < i; h++) {
        var u = i - h, d = n[u - (h % 4 ? 0 : 4)];
        a[h] = h < 4 || u <= 4 ? d : c.INV_SUB_MIX[0][c.SBOX[d >>> 24]] ^ c.INV_SUB_MIX[1][c.SBOX[d >>> 16 & 255]] ^ c.INV_SUB_MIX[2][c.SBOX[d >>> 8 & 255]] ^ c.INV_SUB_MIX[3][c.SBOX[255 & d]]
      }
      this._nRounds = r, this._keySchedule = n, this._invKeySchedule = a
    }, s.prototype.encryptBlockRaw = function (e) {
      return e = i(e), o(e, this._keySchedule, c.SUB_MIX, c.SBOX, this._nRounds)
    }, s.prototype.encryptBlock = function (e) {
      var t = this.encryptBlockRaw(e), r = a.allocUnsafe(16);
      return r.writeUInt32BE(t[0], 0), r.writeUInt32BE(t[1], 4), r.writeUInt32BE(t[2], 8), r.writeUInt32BE(t[3], 12), r
    }, s.prototype.decryptBlock = function (e) {
      e = i(e);
      var t = e[1];
      e[1] = e[3], e[3] = t;
      var r = o(e, this._invKeySchedule, c.INV_SUB_MIX, c.INV_SBOX, this._nRounds), n = a.allocUnsafe(16);
      return n.writeUInt32BE(r[0], 0), n.writeUInt32BE(r[3], 4), n.writeUInt32BE(r[2], 8), n.writeUInt32BE(r[1], 12), n
    }, s.prototype.scrub = function () {
      n(this._keySchedule), n(this._invKeySchedule), n(this._key)
    }, e.exports.AES = s
  }, function (e, t, r) {
    "use strict";
    var i = t;
    i.base = r(115), i.short = r(118), i.mont = r(117), i.edwards = r(116)
  }, function (e, t, r) {
    function i(e, t, r, i) {
      if (n.isBuffer(e) || (e = n.from(e, "binary")), t && (n.isBuffer(t) || (t = n.from(t, "binary")), 8 !== t.length))throw new RangeError("salt should be Buffer with 8 byte length");
      for (var s = r / 8, a = n.alloc(s), f = n.alloc(i || 0), c = n.alloc(0); s > 0 || i > 0;) {
        var h = new o;
        h.update(c), h.update(e), t && h.update(t), c = h.digest();
        var u = 0;
        if (s > 0) {
          var d = a.length - s;
          u = Math.min(s, c.length), c.copy(a, d, 0, u), s -= u
        }
        if (u < c.length && i > 0) {
          var l = f.length - i, p = Math.min(i, c.length - u);
          c.copy(f, l, u, u + p), i -= p
        }
      }
      return c.fill(0), {key: a, iv: f}
    }

    var n = r(1).Buffer, o = r(30);
    e.exports = i
  }, function (e, t, r) {
    (function (t) {
      function i(e) {
        var r;
        "object" != typeof e || t.isBuffer(e) || (r = e.passphrase, e = e.key), "string" == typeof e && (e = new t(e));
        var i, s, f = a(e, r), c = f.tag, h = f.data;
        switch (c) {
          case"CERTIFICATE":
            s = o.certificate.decode(h, "der").tbsCertificate.subjectPublicKeyInfo;
          case"PUBLIC KEY":
            switch (s || (s = o.PublicKey.decode(h, "der")), i = s.algorithm.algorithm.join(".")) {
              case"1.2.840.113549.1.1.1":
                return o.RSAPublicKey.decode(s.subjectPublicKey.data, "der");
              case"1.2.840.10045.2.1":
                return s.subjectPrivateKey = s.subjectPublicKey, {type: "ec", data: s};
              case"1.2.840.10040.4.1":
                return s.algorithm.params.pub_key = o.DSAparam.decode(s.subjectPublicKey.data, "der"), {
                  type: "dsa",
                  data: s.algorithm.params
                };
              default:
                throw new Error("unknown key id " + i)
            }
            throw new Error("unknown key type " + c);
          case"ENCRYPTED PRIVATE KEY":
            h = o.EncryptedPrivateKey.decode(h, "der"), h = n(h, r);
          case"PRIVATE KEY":
            switch (s = o.PrivateKey.decode(h, "der"), i = s.algorithm.algorithm.join(".")) {
              case"1.2.840.113549.1.1.1":
                return o.RSAPrivateKey.decode(s.subjectPrivateKey, "der");
              case"1.2.840.10045.2.1":
                return {
                  curve: s.algorithm.curve,
                  privateKey: o.ECPrivateKey.decode(s.subjectPrivateKey, "der").privateKey
                };
              case"1.2.840.10040.4.1":
                return s.algorithm.params.priv_key = o.DSAparam.decode(s.subjectPrivateKey, "der"), {
                  type: "dsa",
                  params: s.algorithm.params
                };
              default:
                throw new Error("unknown key id " + i)
            }
            throw new Error("unknown key type " + c);
          case"RSA PUBLIC KEY":
            return o.RSAPublicKey.decode(h, "der");
          case"RSA PRIVATE KEY":
            return o.RSAPrivateKey.decode(h, "der");
          case"DSA PRIVATE KEY":
            return {type: "dsa", params: o.DSAPrivateKey.decode(h, "der")};
          case"EC PRIVATE KEY":
            return h = o.ECPrivateKey.decode(h, "der"), {curve: h.parameters.value, privateKey: h.privateKey};
          default:
            throw new Error("unknown key type " + c)
        }
      }

      function n(e, r) {
        var i = e.algorithm.decrypt.kde.kdeparams.salt, n = parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), o = s[e.algorithm.decrypt.cipher.algo.join(".")], a = e.algorithm.decrypt.cipher.iv, h = e.subjectPrivateKey, u = parseInt(o.split("-")[1], 10) / 8, d = c.pbkdf2Sync(r, i, n, u), l = f.createDecipheriv(o, d, a), p = [];
        return p.push(l.update(h)), p.push(l.final()), t.concat(p)
      }

      var o = r(139), s = r(138), a = r(141), f = r(24), c = r(59);
      e.exports = i, i.signature = o.signature
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      function r(e, r, i, n) {
        if ("function" != typeof e)throw new TypeError('"callback" argument must be a function');
        var o, s, a = arguments.length;
        switch (a) {
          case 0:
          case 1:
            return t.nextTick(e);
          case 2:
            return t.nextTick(function () {
              e.call(null, r)
            });
          case 3:
            return t.nextTick(function () {
              e.call(null, r, i)
            });
          case 4:
            return t.nextTick(function () {
              e.call(null, r, i, n)
            });
          default:
            for (o = new Array(a - 1), s = 0; s < o.length;)o[s++] = arguments[s];
            return t.nextTick(function () {
              e.apply(null, o)
            })
        }
      }

      !t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? e.exports = {nextTick: r} : e.exports = t
    }).call(t, r(9))
  }, function (e, t, r) {
    function i() {
      return Object.keys(s)
    }

    var n = r(89), o = r(88), s = r(45);
    t.createCipher = t.Cipher = n.createCipher, t.createCipheriv = t.Cipheriv = n.createCipheriv, t.createDecipher = t.Decipher = o.createDecipher, t.createDecipheriv = t.Decipheriv = o.createDecipheriv, t.listCiphers = t.getCiphers = i
  }, function (e, t, r) {
    var i = {
      ECB: r(95),
      CBC: r(91),
      CFB: r(92),
      CFB8: r(94),
      CFB1: r(93),
      OFB: r(96),
      CTR: r(44),
      GCM: r(44)
    }, n = r(45);
    for (var o in n)n[o].module = i[n[o].mode];
    e.exports = n
  }, function (e, t, r) {
    (function (t) {
      function i(e) {
        var t = o(e);
        return {
          blinder: t.toRed(s.mont(e.modulus)).redPow(new s(e.publicExponent)).fromRed(),
          unblinder: t.invm(e.modulus)
        }
      }

      function n(e, r) {
        var n = i(r), o = r.modulus.byteLength(), a = (s.mont(r.modulus), new s(e).mul(n.blinder).umod(r.modulus)), f = a.toRed(s.mont(r.prime1)), c = a.toRed(s.mont(r.prime2)), h = r.coefficient, u = r.prime1, d = r.prime2, l = f.redPow(r.exponent1), p = c.redPow(r.exponent2);
        l = l.fromRed(), p = p.fromRed();
        var b = l.isub(p).imul(h).umod(u);
        return b.imul(d), p.iadd(b), new t(p.imul(n.unblinder).umod(r.modulus).toArray(!1, o))
      }

      function o(e) {
        for (var t = e.modulus.byteLength(), r = new s(a(t)); r.cmp(e.modulus) >= 0 || !r.umod(e.prime1) || !r.umod(e.prime2);)r = new s(a(t));
        return r
      }

      var s = r(3), a = r(11);
      e.exports = n, n.getr = o
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    t.utils = r(111), t.Cipher = r(108), t.DES = r(109), t.CBC = r(107), t.EDE = r(110)
  }, function (e, t) {
    function r() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function i(e) {
      return "function" == typeof e
    }

    function n(e) {
      return "number" == typeof e
    }

    function o(e) {
      return "object" == typeof e && null !== e
    }

    function s(e) {
      return void 0 === e
    }

    e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
      if (!n(e) || e < 0 || isNaN(e))throw TypeError("n must be a positive number");
      return this._maxListeners = e, this
    }, r.prototype.emit = function (e) {
      var t, r, n, a, f, c;
      if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
        if ((t = arguments[1]) instanceof Error)throw t;
        var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
        throw h.context = t, h
      }
      if (r = this._events[e], s(r))return !1;
      if (i(r))switch (arguments.length) {
        case 1:
          r.call(this);
          break;
        case 2:
          r.call(this, arguments[1]);
          break;
        case 3:
          r.call(this, arguments[1], arguments[2]);
          break;
        default:
          a = Array.prototype.slice.call(arguments, 1), r.apply(this, a)
      } else if (o(r))for (a = Array.prototype.slice.call(arguments, 1), c = r.slice(), n = c.length, f = 0; f < n; f++)c[f].apply(this, a);
      return !0
    }, r.prototype.addListener = function (e, t) {
      var n;
      if (!i(t))throw TypeError("listener must be a function");
      return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (n = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
    }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
      function r() {
        this.removeListener(e, r), n || (n = !0, t.apply(this, arguments))
      }

      if (!i(t))throw TypeError("listener must be a function");
      var n = !1;
      return r.listener = t, this.on(e, r), this
    }, r.prototype.removeListener = function (e, t) {
      var r, n, s, a;
      if (!i(t))throw TypeError("listener must be a function");
      if (!this._events || !this._events[e])return this;
      if (r = this._events[e], s = r.length, n = -1, r === t || i(r.listener) && r.listener === t)delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (o(r)) {
        for (a = s; a-- > 0;)if (r[a] === t || r[a].listener && r[a].listener === t) {
          n = a;
          break
        }
        if (n < 0)return this;
        1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
      }
      return this
    }, r.prototype.removeAllListeners = function (e) {
      var t, r;
      if (!this._events)return this;
      if (!this._events.removeListener)return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
      if (0 === arguments.length) {
        for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
        return this.removeAllListeners("removeListener"), this._events = {}, this
      }
      if (r = this._events[e], i(r))this.removeListener(e, r); else if (r)for (; r.length;)this.removeListener(e, r[r.length - 1]);
      return delete this._events[e], this
    }, r.prototype.listeners = function (e) {
      return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }, r.prototype.listenerCount = function (e) {
      if (this._events) {
        var t = this._events[e];
        if (i(t))return 1;
        if (t)return t.length
      }
      return 0
    }, r.listenerCount = function (e, t) {
      return e.listenerCount(t)
    }
  }, function (e, t, r) {
    var i = t;
    i.utils = r(7), i.common = r(18), i.sha = r(131), i.ripemd = r(130), i.hmac = r(129), i.sha1 = i.sha.sha1, i.sha256 = i.sha.sha256, i.sha224 = i.sha.sha224, i.sha384 = i.sha.sha384, i.sha512 = i.sha.sha512, i.ripemd160 = i.ripemd.ripemd160
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      function i() {
        h.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
      }

      function n(e, t) {
        return e << t | e >>> 32 - t
      }

      function o(e, t, r, i, o, s, a) {
        return n(e + (t & r | ~t & i) + o + s | 0, a) + t | 0
      }

      function s(e, t, r, i, o, s, a) {
        return n(e + (t & i | r & ~i) + o + s | 0, a) + t | 0
      }

      function a(e, t, r, i, o, s, a) {
        return n(e + (t ^ r ^ i) + o + s | 0, a) + t | 0
      }

      function f(e, t, r, i, o, s, a) {
        return n(e + (r ^ (t | ~i)) + o + s | 0, a) + t | 0
      }

      var c = r(0), h = r(52), u = new Array(16);
      c(i, h), i.prototype._update = function () {
        for (var e = u, t = 0; t < 16; ++t)e[t] = this._block.readInt32LE(4 * t);
        var r = this._a, i = this._b, n = this._c, c = this._d;
        r = o(r, i, n, c, e[0], 3614090360, 7), c = o(c, r, i, n, e[1], 3905402710, 12), n = o(n, c, r, i, e[2], 606105819, 17), i = o(i, n, c, r, e[3], 3250441966, 22), r = o(r, i, n, c, e[4], 4118548399, 7), c = o(c, r, i, n, e[5], 1200080426, 12), n = o(n, c, r, i, e[6], 2821735955, 17), i = o(i, n, c, r, e[7], 4249261313, 22), r = o(r, i, n, c, e[8], 1770035416, 7), c = o(c, r, i, n, e[9], 2336552879, 12), n = o(n, c, r, i, e[10], 4294925233, 17), i = o(i, n, c, r, e[11], 2304563134, 22), r = o(r, i, n, c, e[12], 1804603682, 7), c = o(c, r, i, n, e[13], 4254626195, 12), n = o(n, c, r, i, e[14], 2792965006, 17), i = o(i, n, c, r, e[15], 1236535329, 22), r = s(r, i, n, c, e[1], 4129170786, 5), c = s(c, r, i, n, e[6], 3225465664, 9), n = s(n, c, r, i, e[11], 643717713, 14), i = s(i, n, c, r, e[0], 3921069994, 20), r = s(r, i, n, c, e[5], 3593408605, 5), c = s(c, r, i, n, e[10], 38016083, 9), n = s(n, c, r, i, e[15], 3634488961, 14), i = s(i, n, c, r, e[4], 3889429448, 20), r = s(r, i, n, c, e[9], 568446438, 5), c = s(c, r, i, n, e[14], 3275163606, 9), n = s(n, c, r, i, e[3], 4107603335, 14), i = s(i, n, c, r, e[8], 1163531501, 20), r = s(r, i, n, c, e[13], 2850285829, 5), c = s(c, r, i, n, e[2], 4243563512, 9), n = s(n, c, r, i, e[7], 1735328473, 14), i = s(i, n, c, r, e[12], 2368359562, 20), r = a(r, i, n, c, e[5], 4294588738, 4), c = a(c, r, i, n, e[8], 2272392833, 11), n = a(n, c, r, i, e[11], 1839030562, 16), i = a(i, n, c, r, e[14], 4259657740, 23), r = a(r, i, n, c, e[1], 2763975236, 4), c = a(c, r, i, n, e[4], 1272893353, 11), n = a(n, c, r, i, e[7], 4139469664, 16), i = a(i, n, c, r, e[10], 3200236656, 23), r = a(r, i, n, c, e[13], 681279174, 4), c = a(c, r, i, n, e[0], 3936430074, 11), n = a(n, c, r, i, e[3], 3572445317, 16), i = a(i, n, c, r, e[6], 76029189, 23), r = a(r, i, n, c, e[9], 3654602809, 4), c = a(c, r, i, n, e[12], 3873151461, 11), n = a(n, c, r, i, e[15], 530742520, 16), i = a(i, n, c, r, e[2], 3299628645, 23), r = f(r, i, n, c, e[0], 4096336452, 6), c = f(c, r, i, n, e[7], 1126891415, 10), n = f(n, c, r, i, e[14], 2878612391, 15), i = f(i, n, c, r, e[5], 4237533241, 21), r = f(r, i, n, c, e[12], 1700485571, 6), c = f(c, r, i, n, e[3], 2399980690, 10), n = f(n, c, r, i, e[10], 4293915773, 15), i = f(i, n, c, r, e[1], 2240044497, 21), r = f(r, i, n, c, e[8], 1873313359, 6), c = f(c, r, i, n, e[15], 4264355552, 10), n = f(n, c, r, i, e[6], 2734768916, 15), i = f(i, n, c, r, e[13], 1309151649, 21), r = f(r, i, n, c, e[4], 4149444226, 6), c = f(c, r, i, n, e[11], 3174756917, 10), n = f(n, c, r, i, e[2], 718787259, 15), i = f(i, n, c, r, e[9], 3951481745, 21), this._a = this._a + r | 0, this._b = this._b + i | 0, this._c = this._c + n | 0, this._d = this._d + c | 0
      }, i.prototype._digest = function () {
        this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
        var e = new t(16);
        return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e
      }, e.exports = i
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    (function (t, i, n) {
      function o(e) {
        var t = this;
        this.next = null, this.entry = null, this.finish = function () {
          T(t, e)
        }
      }

      function s(e) {
        return j.from(e)
      }

      function a(e) {
        return j.isBuffer(e) || e instanceof D
      }

      function f() {
      }

      function c(e, t) {
        I = I || r(10), e = e || {};
        var i = t instanceof I;
        this.objectMode = !!e.objectMode, i && (this.objectMode = this.objectMode || !!e.writableObjectMode);
        var n = e.highWaterMark, s = e.writableHighWaterMark, a = this.objectMode ? 16 : 16384;
        this.highWaterMark = n || 0 === n ? n : i && (s || 0 === s) ? s : a, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
        var f = !1 === e.decodeStrings;
        this.decodeStrings = !f, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
          g(t, e)
        }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
      }

      function h(e) {
        if (I = I || r(10), !(q.call(h, this) || this instanceof I))return new h(e);
        this._writableState = new c(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), R.call(this)
      }

      function u(e, t) {
        var r = new Error("write after end");
        e.emit("error", r), x.nextTick(t, r)
      }

      function d(e, t, r, i) {
        var n = !0, o = !1;
        return null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), x.nextTick(i, o), n = !1), n
      }

      function l(e, t, r) {
        return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = j.from(t, r)), t
      }

      function p(e, t, r, i, n, o) {
        if (!r) {
          var s = l(t, i, n);
          i !== s && (r = !0, n = "buffer", i = s)
        }
        var a = t.objectMode ? 1 : i.length;
        t.length += a;
        var f = t.length < t.highWaterMark;
        if (f || (t.needDrain = !0), t.writing || t.corked) {
          var c = t.lastBufferedRequest;
          t.lastBufferedRequest = {
            chunk: i,
            encoding: n,
            isBuf: r,
            callback: o,
            next: null
          }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
        } else b(e, t, !1, a, i, n, o);
        return f
      }

      function b(e, t, r, i, n, o, s) {
        t.writelen = i, t.writecb = s, t.writing = !0, t.sync = !0, r ? e._writev(n, t.onwrite) : e._write(n, o, t.onwrite), t.sync = !1
      }

      function y(e, t, r, i, n) {
        --t.pendingcb, r ? (x.nextTick(n, i), x.nextTick(M, e, t), e._writableState.errorEmitted = !0, e.emit("error", i)) : (n(i), e._writableState.errorEmitted = !0, e.emit("error", i), M(e, t))
      }

      function m(e) {
        e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
      }

      function g(e, t) {
        var r = e._writableState, i = r.sync, n = r.writecb;
        if (m(r), t)y(e, r, i, t, n); else {
          var o = S(r);
          o || r.corked || r.bufferProcessing || !r.bufferedRequest || _(e, r), i ? O(v, e, r, o, n) : v(e, r, o, n)
        }
      }

      function v(e, t, r, i) {
        r || w(e, t), t.pendingcb--, i(), M(e, t)
      }

      function w(e, t) {
        0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
      }

      function _(e, t) {
        t.bufferProcessing = !0;
        var r = t.bufferedRequest;
        if (e._writev && r && r.next) {
          var i = t.bufferedRequestCount, n = new Array(i), s = t.corkedRequestsFree;
          s.entry = r;
          for (var a = 0, f = !0; r;)n[a] = r, r.isBuf || (f = !1), r = r.next, a += 1;
          n.allBuffers = f, b(e, t, !0, t.length, n, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0
        } else {
          for (; r;) {
            var c = r.chunk, h = r.encoding, u = r.callback;
            if (b(e, t, !1, t.objectMode ? 1 : c.length, c, h, u), r = r.next, t.bufferedRequestCount--, t.writing)break
          }
          null === r && (t.lastBufferedRequest = null)
        }
        t.bufferedRequest = r, t.bufferProcessing = !1
      }

      function S(e) {
        return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
      }

      function k(e, t) {
        e._final(function (r) {
          t.pendingcb--, r && e.emit("error", r), t.prefinished = !0, e.emit("prefinish"), M(e, t)
        })
      }

      function E(e, t) {
        t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, x.nextTick(k, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
      }

      function M(e, t) {
        var r = S(t);
        return r && (E(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), r
      }

      function A(e, t, r) {
        t.ending = !0, M(e, t), r && (t.finished ? x.nextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1
      }

      function T(e, t, r) {
        var i = e.entry;
        for (e.entry = null; i;) {
          var n = i.callback;
          t.pendingcb--, n(r), i = i.next
        }
        t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
      }

      var x = r(23);
      e.exports = h;
      var I, O = !t.browser && ["v0.10", "v0.9."].indexOf(t.version.slice(0, 5)) > -1 ? i : x.nextTick;
      h.WritableState = c;
      var B = r(16);
      B.inherits = r(0);
      var C = {deprecate: r(161)}, R = r(69), j = r(1).Buffer, D = n.Uint8Array || function () {
        }, P = r(68);
      B.inherits(h, R), c.prototype.getBuffer = function () {
        for (var e = this.bufferedRequest, t = []; e;)t.push(e), e = e.next;
        return t
      }, function () {
        try {
          Object.defineProperty(c.prototype, "buffer", {
            get: C.deprecate(function () {
              return this.getBuffer()
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          })
        } catch (e) {
        }
      }();
      var q;
      "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (q = Function.prototype[Symbol.hasInstance], Object.defineProperty(h, Symbol.hasInstance, {
        value: function (e) {
          return !!q.call(this, e) || this === h && (e && e._writableState instanceof c)
        }
      })) : q = function (e) {
        return e instanceof this
      }, h.prototype.pipe = function () {
        this.emit("error", new Error("Cannot pipe, not readable"))
      }, h.prototype.write = function (e, t, r) {
        var i = this._writableState, n = !1, o = !i.objectMode && a(e);
        return o && !j.isBuffer(e) && (e = s(e)), "function" == typeof t && (r = t, t = null), o ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = f), i.ended ? u(this, r) : (o || d(this, i, e, r)) && (i.pendingcb++, n = p(this, i, o, e, t, r)), n
      }, h.prototype.cork = function () {
        this._writableState.corked++
      }, h.prototype.uncork = function () {
        var e = this._writableState;
        e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || _(this, e))
      }, h.prototype.setDefaultEncoding = function (e) {
        if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))throw new TypeError("Unknown encoding: " + e);
        return this._writableState.defaultEncoding = e, this
      }, Object.defineProperty(h.prototype, "writableHighWaterMark", {
        enumerable: !1, get: function () {
          return this._writableState.highWaterMark
        }
      }), h.prototype._write = function (e, t, r) {
        r(new Error("_write() is not implemented"))
      }, h.prototype._writev = null, h.prototype.end = function (e, t, r) {
        var i = this._writableState;
        "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null !== e && void 0 !== e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || i.finished || A(this, i, r)
      }, Object.defineProperty(h.prototype, "destroyed", {
        get: function () {
          return void 0 !== this._writableState && this._writableState.destroyed
        }, set: function (e) {
          this._writableState && (this._writableState.destroyed = e)
        }
      }), h.prototype.destroy = P.destroy, h.prototype._undestroy = P.undestroy, h.prototype._destroy = function (e, t) {
        this.end(), t(e)
      }
    }).call(t, r(9), r(160).setImmediate, r(6))
  }, function (e, t, r) {
    t = e.exports = r(66), t.Stream = t, t.Readable = t, t.Writable = r(31), t.Duplex = r(10), t.Transform = r(67), t.PassThrough = r(149)
  }, function (e, t, r) {
    "use strict";
    function i() {
      d.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
    }

    function n(e, t) {
      return e << t | e >>> 32 - t
    }

    function o(e, t, r, i, o, s, a, f) {
      return n(e + (t ^ r ^ i) + s + a | 0, f) + o | 0
    }

    function s(e, t, r, i, o, s, a, f) {
      return n(e + (t & r | ~t & i) + s + a | 0, f) + o | 0
    }

    function a(e, t, r, i, o, s, a, f) {
      return n(e + ((t | ~r) ^ i) + s + a | 0, f) + o | 0
    }

    function f(e, t, r, i, o, s, a, f) {
      return n(e + (t & i | r & ~i) + s + a | 0, f) + o | 0
    }

    function c(e, t, r, i, o, s, a, f) {
      return n(e + (t ^ (r | ~i)) + s + a | 0, f) + o | 0
    }

    var h = r(2).Buffer, u = r(0), d = r(52), l = new Array(16), p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], b = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11], g = [0, 1518500249, 1859775393, 2400959708, 2840853838], v = [1352829926, 1548603684, 1836072691, 2053994217, 0];
    u(i, d), i.prototype._update = function () {
      for (var e = l, t = 0; t < 16; ++t)e[t] = this._block.readInt32LE(4 * t);
      for (var r = 0 | this._a, i = 0 | this._b, h = 0 | this._c, u = 0 | this._d, d = 0 | this._e, w = 0 | this._a, _ = 0 | this._b, S = 0 | this._c, k = 0 | this._d, E = 0 | this._e, M = 0; M < 80; M += 1) {
        var A, T;
        M < 16 ? (A = o(r, i, h, u, d, e[p[M]], g[0], y[M]), T = c(w, _, S, k, E, e[b[M]], v[0], m[M])) : M < 32 ? (A = s(r, i, h, u, d, e[p[M]], g[1], y[M]), T = f(w, _, S, k, E, e[b[M]], v[1], m[M])) : M < 48 ? (A = a(r, i, h, u, d, e[p[M]], g[2], y[M]), T = a(w, _, S, k, E, e[b[M]], v[2], m[M])) : M < 64 ? (A = f(r, i, h, u, d, e[p[M]], g[3], y[M]), T = s(w, _, S, k, E, e[b[M]], v[3], m[M])) : (A = c(r, i, h, u, d, e[p[M]], g[4], y[M]), T = o(w, _, S, k, E, e[b[M]], v[4], m[M])), r = d, d = u, u = n(h, 10), h = i, i = A, w = E, E = k, k = n(S, 10), S = _, _ = T
      }
      var x = this._b + h + k | 0;
      this._b = this._c + u + E | 0, this._c = this._d + d + w | 0, this._d = this._e + r + _ | 0, this._e = this._a + i + S | 0, this._a = x
    }, i.prototype._digest = function () {
      this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
      var e = h.alloc ? h.alloc(20) : new h(20);
      return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e.writeInt32LE(this._e, 16), e
    }, e.exports = i
  }, function (e, t, r) {
    var t = e.exports = function (e) {
      e = e.toLowerCase();
      var r = t[e];
      if (!r)throw new Error(e + " is not supported (we accept pull requests)");
      return new r
    };
    t.sha = r(156), t.sha1 = r(157), t.sha224 = r(158), t.sha256 = r(70), t.sha384 = r(159), t.sha512 = r(71)
  }, function (e, t, r) {
    function i() {
      n.call(this)
    }

    e.exports = i;
    var n = r(28).EventEmitter;
    r(0)(i, n), i.Readable = r(32), i.Writable = r(153), i.Duplex = r(148), i.Transform = r(152), i.PassThrough = r(151), i.Stream = i, i.prototype.pipe = function (e, t) {
      function r(t) {
        e.writable && !1 === e.write(t) && c.pause && c.pause()
      }

      function i() {
        c.readable && c.resume && c.resume()
      }

      function o() {
        h || (h = !0, e.end())
      }

      function s() {
        h || (h = !0, "function" == typeof e.destroy && e.destroy())
      }

      function a(e) {
        if (f(), 0 === n.listenerCount(this, "error"))throw e
      }

      function f() {
        c.removeListener("data", r), e.removeListener("drain", i), c.removeListener("end", o), c.removeListener("close", s), c.removeListener("error", a), e.removeListener("error", a), c.removeListener("end", f), c.removeListener("close", f), e.removeListener("close", f)
      }

      var c = this;
      c.on("data", r), e.on("drain", i), e._isStdio || t && !1 === t.end || (c.on("end", o), c.on("close", s));
      var h = !1;
      return c.on("error", a), e.on("error", a), c.on("end", f), c.on("close", f), e.on("close", f), e.emit("pipe", c), e
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (!e)return "utf8";
      for (var t; ;)switch (e) {
        case"utf8":
        case"utf-8":
          return "utf8";
        case"ucs2":
        case"ucs-2":
        case"utf16le":
        case"utf-16le":
          return "utf16le";
        case"latin1":
        case"binary":
          return "latin1";
        case"base64":
        case"ascii":
        case"hex":
          return e;
        default:
          if (t)return;
          e = ("" + e).toLowerCase(), t = !0
      }
    }

    function n(e) {
      var t = i(e);
      if ("string" != typeof t && (g.isEncoding === v || !v(e)))throw new Error("Unknown encoding: " + e);
      return t || e
    }

    function o(e) {
      this.encoding = n(e);
      var t;
      switch (this.encoding) {
        case"utf16le":
          this.text = d, this.end = l, t = 4;
          break;
        case"utf8":
          this.fillLast = c, t = 4;
          break;
        case"base64":
          this.text = p, this.end = b, t = 3;
          break;
        default:
          return this.write = y, void(this.end = m)
      }
      this.lastNeed = 0, this.lastTotal = 0, this.lastChar = g.allocUnsafe(t)
    }

    function s(e) {
      return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
    }

    function a(e, t, r) {
      var i = t.length - 1;
      if (i < r)return 0;
      var n = s(t[i]);
      return n >= 0 ? (n > 0 && (e.lastNeed = n - 1), n) : --i < r || -2 === n ? 0 : (n = s(t[i])) >= 0 ? (n > 0 && (e.lastNeed = n - 2), n) : --i < r || -2 === n ? 0 : (n = s(t[i]), n >= 0 ? (n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3), n) : 0)
    }

    function f(e, t, r) {
      if (128 != (192 & t[0]))return e.lastNeed = 0, "�";
      if (e.lastNeed > 1 && t.length > 1) {
        if (128 != (192 & t[1]))return e.lastNeed = 1, "�";
        if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2]))return e.lastNeed = 2, "�"
      }
    }

    function c(e) {
      var t = this.lastTotal - this.lastNeed, r = f(this, e, t);
      return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void(this.lastNeed -= e.length))
    }

    function h(e, t) {
      var r = a(this, e, t);
      if (!this.lastNeed)return e.toString("utf8", t);
      this.lastTotal = r;
      var i = e.length - (r - this.lastNeed);
      return e.copy(this.lastChar, 0, i), e.toString("utf8", t, i)
    }

    function u(e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed ? t + "�" : t
    }

    function d(e, t) {
      if ((e.length - t) % 2 == 0) {
        var r = e.toString("utf16le", t);
        if (r) {
          var i = r.charCodeAt(r.length - 1);
          if (i >= 55296 && i <= 56319)return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1)
        }
        return r
      }
      return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
    }

    function l(e) {
      var t = e && e.length ? this.write(e) : "";
      if (this.lastNeed) {
        var r = this.lastTotal - this.lastNeed;
        return t + this.lastChar.toString("utf16le", 0, r)
      }
      return t
    }

    function p(e, t) {
      var r = (e.length - t) % 3;
      return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
    }

    function b(e) {
      var t = e && e.length ? this.write(e) : "";
      return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
    }

    function y(e) {
      return e.toString(this.encoding)
    }

    function m(e) {
      return e && e.length ? this.write(e) : ""
    }

    var g = r(1).Buffer, v = g.isEncoding || function (e) {
        switch ((e = "" + e) && e.toLowerCase()) {
          case"hex":
          case"utf8":
          case"utf-8":
          case"ascii":
          case"binary":
          case"base64":
          case"ucs2":
          case"ucs-2":
          case"utf16le":
          case"utf-16le":
          case"raw":
            return !0;
          default:
            return !1
        }
      };
    t.StringDecoder = o, o.prototype.write = function (e) {
      if (0 === e.length)return "";
      var t, r;
      if (this.lastNeed) {
        if (void 0 === (t = this.fillLast(e)))return "";
        r = this.lastNeed, this.lastNeed = 0
      } else r = 0;
      return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
    }, o.prototype.end = u, o.prototype.text = h, o.prototype.fillLast = function (e) {
      if (this.lastNeed <= e.length)return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
      e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
    }
  }, function (e, t, r) {
    function i(e, t) {
      if (s.call(this, t), !a.isBuffer(e))return void this.error("Input not Buffer");
      this.base = e, this.offset = 0, this.length = e.length
    }

    function n(e, t) {
      if (Array.isArray(e))this.length = 0, this.value = e.map(function (e) {
        return e instanceof n || (e = new n(e, t)), this.length += e.length, e
      }, this); else if ("number" == typeof e) {
        if (!(0 <= e && e <= 255))return t.error("non-byte EncoderBuffer value");
        this.value = e, this.length = 1
      } else if ("string" == typeof e)this.value = e, this.length = a.byteLength(e); else {
        if (!a.isBuffer(e))return t.error("Unsupported type: " + typeof e);
        this.value = e, this.length = e.length
      }
    }

    var o = r(0), s = r(14).Reporter, a = r(2).Buffer;
    o(i, s), t.DecoderBuffer = i, i.prototype.save = function () {
      return {offset: this.offset, reporter: s.prototype.save.call(this)}
    }, i.prototype.restore = function (e) {
      var t = new i(this.base);
      return t.offset = e.offset, t.length = this.offset, this.offset = e.offset, s.prototype.restore.call(this, e.reporter), t
    }, i.prototype.isEmpty = function () {
      return this.offset === this.length
    }, i.prototype.readUInt8 = function (e) {
      return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(e || "DecoderBuffer overrun")
    }, i.prototype.skip = function (e, t) {
      if (!(this.offset + e <= this.length))return this.error(t || "DecoderBuffer overrun");
      var r = new i(this.base);
      return r._reporterState = this._reporterState, r.offset = this.offset, r.length = this.offset + e, this.offset += e, r
    }, i.prototype.raw = function (e) {
      return this.base.slice(e ? e.offset : this.offset, this.length)
    }, t.EncoderBuffer = n, n.prototype.join = function (e, t) {
      return e || (e = new a(this.length)), t || (t = 0), 0 === this.length ? e : (Array.isArray(this.value) ? this.value.forEach(function (r) {
        r.join(e, t), t += r.length
      }) : ("number" == typeof this.value ? e[t] = this.value : "string" == typeof this.value ? e.write(this.value, t) : a.isBuffer(this.value) && this.value.copy(e, t), t += this.length), e)
    }
  }, function (e, t, r) {
    var i = t;
    i._reverse = function (e) {
      var t = {};
      return Object.keys(e).forEach(function (r) {
        (0 | r) == r && (r |= 0);
        var i = e[r];
        t[i] = r
      }), t
    }, i.der = r(82)
  }, function (e, t, r) {
    function i(e) {
      this.enc = "der", this.name = e.name, this.entity = e, this.tree = new n, this.tree._init(e.body)
    }

    function n(e) {
      c.Node.call(this, "der", e)
    }

    function o(e, t) {
      var r = e.readUInt8(t);
      if (e.isError(r))return r;
      var i = u.tagClass[r >> 6], n = 0 == (32 & r);
      if (31 == (31 & r)) {
        var o = r;
        for (r = 0; 128 == (128 & o);) {
          if (o = e.readUInt8(t), e.isError(o))return o;
          r <<= 7, r |= 127 & o
        }
      } else r &= 31;
      return {cls: i, primitive: n, tag: r, tagStr: u.tag[r]}
    }

    function s(e, t, r) {
      var i = e.readUInt8(r);
      if (e.isError(i))return i;
      if (!t && 128 === i)return null;
      if (0 == (128 & i))return i;
      var n = 127 & i;
      if (n > 4)return e.error("length octect is too long");
      i = 0;
      for (var o = 0; o < n; o++) {
        i <<= 8;
        var s = e.readUInt8(r);
        if (e.isError(s))return s;
        i |= s
      }
      return i
    }

    var a = r(0), f = r(13), c = f.base, h = f.bignum, u = f.constants.der;
    e.exports = i, i.prototype.decode = function (e, t) {
      return e instanceof c.DecoderBuffer || (e = new c.DecoderBuffer(e, t)), this.tree._decode(e, t)
    }, a(n, c.Node), n.prototype._peekTag = function (e, t, r) {
      if (e.isEmpty())return !1;
      var i = e.save(), n = o(e, 'Failed to peek tag: "' + t + '"');
      return e.isError(n) ? n : (e.restore(i), n.tag === t || n.tagStr === t || n.tagStr + "of" === t || r)
    }, n.prototype._decodeTag = function (e, t, r) {
      var i = o(e, 'Failed to decode tag of "' + t + '"');
      if (e.isError(i))return i;
      var n = s(e, i.primitive, 'Failed to get length of "' + t + '"');
      if (e.isError(n))return n;
      if (!r && i.tag !== t && i.tagStr !== t && i.tagStr + "of" !== t)return e.error('Failed to match tag: "' + t + '"');
      if (i.primitive || null !== n)return e.skip(n, 'Failed to match body of: "' + t + '"');
      var a = e.save(), f = this._skipUntilEnd(e, 'Failed to skip indefinite length body: "' + this.tag + '"');
      return e.isError(f) ? f : (n = e.offset - a.offset, e.restore(a), e.skip(n, 'Failed to match body of: "' + t + '"'))
    }, n.prototype._skipUntilEnd = function (e, t) {
      for (; ;) {
        var r = o(e, t);
        if (e.isError(r))return r;
        var i = s(e, r.primitive, t);
        if (e.isError(i))return i;
        var n;
        if (n = r.primitive || null !== i ? e.skip(i) : this._skipUntilEnd(e, t), e.isError(n))return n;
        if ("end" === r.tagStr)break
      }
    }, n.prototype._decodeList = function (e, t, r, i) {
      for (var n = []; !e.isEmpty();) {
        var o = this._peekTag(e, "end");
        if (e.isError(o))return o;
        var s = r.decode(e, "der", i);
        if (e.isError(s) && o)break;
        n.push(s)
      }
      return n
    }, n.prototype._decodeStr = function (e, t) {
      if ("bitstr" === t) {
        var r = e.readUInt8();
        return e.isError(r) ? r : {unused: r, data: e.raw()}
      }
      if ("bmpstr" === t) {
        var i = e.raw();
        if (i.length % 2 == 1)return e.error("Decoding of string type: bmpstr length mismatch");
        for (var n = "", o = 0; o < i.length / 2; o++)n += String.fromCharCode(i.readUInt16BE(2 * o));
        return n
      }
      if ("numstr" === t) {
        var s = e.raw().toString("ascii");
        return this._isNumstr(s) ? s : e.error("Decoding of string type: numstr unsupported characters")
      }
      if ("octstr" === t)return e.raw();
      if ("objDesc" === t)return e.raw();
      if ("printstr" === t) {
        var a = e.raw().toString("ascii");
        return this._isPrintstr(a) ? a : e.error("Decoding of string type: printstr unsupported characters")
      }
      return /str$/.test(t) ? e.raw().toString() : e.error("Decoding of string type: " + t + " unsupported")
    }, n.prototype._decodeObjid = function (e, t, r) {
      for (var i, n = [], o = 0; !e.isEmpty();) {
        var s = e.readUInt8();
        o <<= 7, o |= 127 & s, 0 == (128 & s) && (n.push(o), o = 0)
      }
      128 & s && n.push(o);
      var a = n[0] / 40 | 0, f = n[0] % 40;
      if (i = r ? n : [a, f].concat(n.slice(1)), t) {
        var c = t[i.join(" ")];
        void 0 === c && (c = t[i.join(".")]), void 0 !== c && (i = c)
      }
      return i
    }, n.prototype._decodeTime = function (e, t) {
      var r = e.raw().toString();
      if ("gentime" === t)var i = 0 | r.slice(0, 4), n = 0 | r.slice(4, 6), o = 0 | r.slice(6, 8), s = 0 | r.slice(8, 10), a = 0 | r.slice(10, 12), f = 0 | r.slice(12, 14); else {
        if ("utctime" !== t)return e.error("Decoding " + t + " time is not supported yet");
        var i = 0 | r.slice(0, 2), n = 0 | r.slice(2, 4), o = 0 | r.slice(4, 6), s = 0 | r.slice(6, 8), a = 0 | r.slice(8, 10), f = 0 | r.slice(10, 12);
        i = i < 70 ? 2e3 + i : 1900 + i
      }
      return Date.UTC(i, n - 1, o, s, a, f, 0)
    }, n.prototype._decodeNull = function (e) {
      return null
    }, n.prototype._decodeBool = function (e) {
      var t = e.readUInt8();
      return e.isError(t) ? t : 0 !== t
    }, n.prototype._decodeInt = function (e, t) {
      var r = e.raw(), i = new h(r);
      return t && (i = t[i.toString(10)] || i), i
    }, n.prototype._use = function (e, t) {
      return "function" == typeof e && (e = e(t)), e._getDecoder("der").tree
    }
  }, function (e, t, r) {
    function i(e) {
      this.enc = "der", this.name = e.name, this.entity = e, this.tree = new n, this.tree._init(e.body)
    }

    function n(e) {
      h.Node.call(this, "der", e)
    }

    function o(e) {
      return e < 10 ? "0" + e : e
    }

    function s(e, t, r, i) {
      var n;
      if ("seqof" === e ? e = "seq" : "setof" === e && (e = "set"), u.tagByName.hasOwnProperty(e))n = u.tagByName[e]; else {
        if ("number" != typeof e || (0 | e) !== e)return i.error("Unknown tag: " + e);
        n = e
      }
      return n >= 31 ? i.error("Multi-octet tag encoding unsupported") : (t || (n |= 32), n |= u.tagClassByName[r || "universal"] << 6)
    }

    var a = r(0), f = r(2).Buffer, c = r(13), h = c.base, u = c.constants.der;
    e.exports = i, i.prototype.encode = function (e, t) {
      return this.tree._encode(e, t).join()
    }, a(n, h.Node), n.prototype._encodeComposite = function (e, t, r, i) {
      var n = s(e, t, r, this.reporter);
      if (i.length < 128) {
        var o = new f(2);
        return o[0] = n, o[1] = i.length, this._createEncoderBuffer([o, i])
      }
      for (var a = 1, c = i.length; c >= 256; c >>= 8)a++;
      var o = new f(2 + a);
      o[0] = n, o[1] = 128 | a;
      for (var c = 1 + a, h = i.length; h > 0; c--, h >>= 8)o[c] = 255 & h;
      return this._createEncoderBuffer([o, i])
    }, n.prototype._encodeStr = function (e, t) {
      if ("bitstr" === t)return this._createEncoderBuffer([0 | e.unused, e.data]);
      if ("bmpstr" === t) {
        for (var r = new f(2 * e.length), i = 0; i < e.length; i++)r.writeUInt16BE(e.charCodeAt(i), 2 * i);
        return this._createEncoderBuffer(r)
      }
      return "numstr" === t ? this._isNumstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === t ? this._isPrintstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(t) ? this._createEncoderBuffer(e) : "objDesc" === t ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: " + t + " unsupported")
    }, n.prototype._encodeObjid = function (e, t, r) {
      if ("string" == typeof e) {
        if (!t)return this.reporter.error("string objid given, but no values map found");
        if (!t.hasOwnProperty(e))return this.reporter.error("objid not found in values map");
        e = t[e].split(/[\s\.]+/g);
        for (var i = 0; i < e.length; i++)e[i] |= 0
      } else if (Array.isArray(e)) {
        e = e.slice();
        for (var i = 0; i < e.length; i++)e[i] |= 0
      }
      if (!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(e));
      if (!r) {
        if (e[1] >= 40)return this.reporter.error("Second objid identifier OOB");
        e.splice(0, 2, 40 * e[0] + e[1])
      }
      for (var n = 0, i = 0; i < e.length; i++) {
        var o = e[i];
        for (n++; o >= 128; o >>= 7)n++
      }
      for (var s = new f(n), a = s.length - 1, i = e.length - 1; i >= 0; i--) {
        var o = e[i];
        for (s[a--] = 127 & o; (o >>= 7) > 0;)s[a--] = 128 | 127 & o
      }
      return this._createEncoderBuffer(s)
    }, n.prototype._encodeTime = function (e, t) {
      var r, i = new Date(e);
      return "gentime" === t ? r = [o(i.getFullYear()), o(i.getUTCMonth() + 1), o(i.getUTCDate()), o(i.getUTCHours()), o(i.getUTCMinutes()), o(i.getUTCSeconds()), "Z"].join("") : "utctime" === t ? r = [o(i.getFullYear() % 100), o(i.getUTCMonth() + 1), o(i.getUTCDate()), o(i.getUTCHours()), o(i.getUTCMinutes()), o(i.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + t + " time is not supported yet"), this._encodeStr(r, "octstr")
    }, n.prototype._encodeNull = function () {
      return this._createEncoderBuffer("")
    }, n.prototype._encodeInt = function (e, t) {
      if ("string" == typeof e) {
        if (!t)return this.reporter.error("String int or enum given, but no values map");
        if (!t.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: " + JSON.stringify(e));
        e = t[e]
      }
      if ("number" != typeof e && !f.isBuffer(e)) {
        var r = e.toArray();
        !e.sign && 128 & r[0] && r.unshift(0), e = new f(r)
      }
      if (f.isBuffer(e)) {
        var i = e.length;
        0 === e.length && i++;
        var n = new f(i);
        return e.copy(n), 0 === e.length && (n[0] = 0), this._createEncoderBuffer(n)
      }
      if (e < 128)return this._createEncoderBuffer(e);
      if (e < 256)return this._createEncoderBuffer([0, e]);
      for (var i = 1, o = e; o >= 256; o >>= 8)i++;
      for (var n = new Array(i), o = n.length - 1; o >= 0; o--)n[o] = 255 & e, e >>= 8;
      return 128 & n[0] && n.unshift(0), this._createEncoderBuffer(new f(n))
    }, n.prototype._encodeBool = function (e) {
      return this._createEncoderBuffer(e ? 255 : 0)
    }, n.prototype._use = function (e, t) {
      return "function" == typeof e && (e = e(t)), e._getEncoder("der").tree
    }, n.prototype._skipDefault = function (e, t, r) {
      var i, n = this._baseState;
      if (null === n.default)return !1;
      var o = e.join();
      if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, t, r).join()), o.length !== n.defaultBuffer.length)return !1;
      for (i = 0; i < o.length; i++)if (o[i] !== n.defaultBuffer[i])return !1;
      return !0
    }
  }, function (e, t, r) {
    function i(e) {
      this.rand = e
    }

    var n;
    if (e.exports = function (e) {
        return n || (n = new i(null)), n.generate(e)
      }, e.exports.Rand = i, i.prototype.generate = function (e) {
        return this._rand(e)
      }, i.prototype._rand = function (e) {
        if (this.rand.getBytes)return this.rand.getBytes(e);
        for (var t = new Uint8Array(e), r = 0; r < t.length; r++)t[r] = this.rand.getByte();
        return t
      }, "object" == typeof self)self.crypto && self.crypto.getRandomValues ? i.prototype._rand = function (e) {
      var t = new Uint8Array(e);
      return self.crypto.getRandomValues(t), t
    } : self.msCrypto && self.msCrypto.getRandomValues ? i.prototype._rand = function (e) {
      var t = new Uint8Array(e);
      return self.msCrypto.getRandomValues(t), t
    } : "object" == typeof window && (i.prototype._rand = function () {
      throw new Error("Not implemented yet")
    }); else try {
      var o = r(168);
      if ("function" != typeof o.randomBytes)throw new Error("Not supported");
      i.prototype._rand = function (e) {
        return o.randomBytes(e)
      }
    } catch (e) {
    }
  }, function (e, t, r) {
    function i(e, t) {
      var r = 0;
      e.length !== t.length && r++;
      for (var i = Math.min(e.length, t.length), n = 0; n < i; ++n)r += e[n] ^ t[n];
      return r
    }

    function n(e, t, r) {
      if (12 === t.length)return e._finID = a.concat([t, a.from([0, 0, 0, 1])]), a.concat([t, a.from([0, 0, 0, 2])]);
      var i = new h(r), n = t.length, o = n % 16;
      i.update(t), o && (o = 16 - o, i.update(a.alloc(o, 0))), i.update(a.alloc(8, 0));
      var s = 8 * n, f = a.alloc(8);
      f.writeUIntBE(s, 0, 8), i.update(f), e._finID = i.state;
      var c = a.from(e._finID);
      return d(c), c
    }

    function o(e, t, r, i) {
      f.call(this);
      var o = a.alloc(4, 0);
      this._cipher = new s.AES(t);
      var c = this._cipher.encryptBlock(o);
      this._ghash = new h(c), r = n(this, r, c), this._prev = a.from(r), this._cache = a.allocUnsafe(0), this._secCache = a.allocUnsafe(0), this._decrypt = i, this._alen = 0, this._len = 0, this._mode = e, this._authTag = null, this._called = !1
    }

    var s = r(19), a = r(1).Buffer, f = r(8), c = r(0), h = r(90), u = r(15), d = r(43);
    c(o, f), o.prototype._update = function (e) {
      if (!this._called && this._alen) {
        var t = 16 - this._alen % 16;
        t < 16 && (t = a.alloc(t, 0), this._ghash.update(t))
      }
      this._called = !0;
      var r = this._mode.encrypt(this, e);
      return this._decrypt ? this._ghash.update(e) : this._ghash.update(r), this._len += e.length, r
    }, o.prototype._final = function () {
      if (this._decrypt && !this._authTag)throw new Error("Unsupported state or unable to authenticate data");
      var e = u(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
      if (this._decrypt && i(e, this._authTag))throw new Error("Unsupported state or unable to authenticate data");
      this._authTag = e, this._cipher.scrub()
    }, o.prototype.getAuthTag = function () {
      if (this._decrypt || !a.isBuffer(this._authTag))throw new Error("Attempting to get auth tag in unsupported state");
      return this._authTag
    }, o.prototype.setAuthTag = function (e) {
      if (!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");
      this._authTag = e
    }, o.prototype.setAAD = function (e) {
      if (this._called)throw new Error("Attempting to set AAD in unsupported state");
      this._ghash.update(e), this._alen += e.length
    }, e.exports = o
  }, function (e, t) {
    function r(e) {
      for (var t, r = e.length; r--;) {
        if (255 !== (t = e.readUInt8(r))) {
          t++, e.writeUInt8(t, r);
          break
        }
        e.writeUInt8(0, r)
      }
    }

    e.exports = r
  }, function (e, t, r) {
    function i(e) {
      var t = e._cipher.encryptBlockRaw(e._prev);
      return s(e._prev), t
    }

    var n = r(15), o = r(1).Buffer, s = r(43);
    t.encrypt = function (e, t) {
      var r = Math.ceil(t.length / 16), s = e._cache.length;
      e._cache = o.concat([e._cache, o.allocUnsafe(16 * r)]);
      for (var a = 0; a < r; a++) {
        var f = i(e), c = s + 16 * a;
        e._cache.writeUInt32BE(f[0], c + 0), e._cache.writeUInt32BE(f[1], c + 4), e._cache.writeUInt32BE(f[2], c + 8), e._cache.writeUInt32BE(f[3], c + 12)
      }
      var h = e._cache.slice(0, t.length);
      return e._cache = e._cache.slice(t.length), n(t, h)
    }
  }, function (e, t) {
    e.exports = {
      "aes-128-ecb": {cipher: "AES", key: 128, iv: 0, mode: "ECB", type: "block"},
      "aes-192-ecb": {cipher: "AES", key: 192, iv: 0, mode: "ECB", type: "block"},
      "aes-256-ecb": {cipher: "AES", key: 256, iv: 0, mode: "ECB", type: "block"},
      "aes-128-cbc": {cipher: "AES", key: 128, iv: 16, mode: "CBC", type: "block"},
      "aes-192-cbc": {cipher: "AES", key: 192, iv: 16, mode: "CBC", type: "block"},
      "aes-256-cbc": {cipher: "AES", key: 256, iv: 16, mode: "CBC", type: "block"},
      aes128: {cipher: "AES", key: 128, iv: 16, mode: "CBC", type: "block"},
      aes192: {cipher: "AES", key: 192, iv: 16, mode: "CBC", type: "block"},
      aes256: {cipher: "AES", key: 256, iv: 16, mode: "CBC", type: "block"},
      "aes-128-cfb": {cipher: "AES", key: 128, iv: 16, mode: "CFB", type: "stream"},
      "aes-192-cfb": {cipher: "AES", key: 192, iv: 16, mode: "CFB", type: "stream"},
      "aes-256-cfb": {cipher: "AES", key: 256, iv: 16, mode: "CFB", type: "stream"},
      "aes-128-cfb8": {cipher: "AES", key: 128, iv: 16, mode: "CFB8", type: "stream"},
      "aes-192-cfb8": {cipher: "AES", key: 192, iv: 16, mode: "CFB8", type: "stream"},
      "aes-256-cfb8": {cipher: "AES", key: 256, iv: 16, mode: "CFB8", type: "stream"},
      "aes-128-cfb1": {cipher: "AES", key: 128, iv: 16, mode: "CFB1", type: "stream"},
      "aes-192-cfb1": {cipher: "AES", key: 192, iv: 16, mode: "CFB1", type: "stream"},
      "aes-256-cfb1": {cipher: "AES", key: 256, iv: 16, mode: "CFB1", type: "stream"},
      "aes-128-ofb": {cipher: "AES", key: 128, iv: 16, mode: "OFB", type: "stream"},
      "aes-192-ofb": {cipher: "AES", key: 192, iv: 16, mode: "OFB", type: "stream"},
      "aes-256-ofb": {cipher: "AES", key: 256, iv: 16, mode: "OFB", type: "stream"},
      "aes-128-ctr": {cipher: "AES", key: 128, iv: 16, mode: "CTR", type: "stream"},
      "aes-192-ctr": {cipher: "AES", key: 192, iv: 16, mode: "CTR", type: "stream"},
      "aes-256-ctr": {cipher: "AES", key: 256, iv: 16, mode: "CTR", type: "stream"},
      "aes-128-gcm": {cipher: "AES", key: 128, iv: 12, mode: "GCM", type: "auth"},
      "aes-192-gcm": {cipher: "AES", key: 192, iv: 12, mode: "GCM", type: "auth"},
      "aes-256-gcm": {cipher: "AES", key: 256, iv: 12, mode: "GCM", type: "auth"}
    }
  }, function (e, t, r) {
    function i(e, t, r, i) {
      s.call(this), this._cipher = new n.AES(t), this._prev = o.from(r), this._cache = o.allocUnsafe(0), this._secCache = o.allocUnsafe(0), this._decrypt = i, this._mode = e
    }

    var n = r(19), o = r(1).Buffer, s = r(8);
    r(0)(i, s), i.prototype._update = function (e) {
      return this._mode.encrypt(this, e, this._decrypt)
    }, i.prototype._final = function () {
      this._cipher.scrub()
    }, e.exports = i
  }, function (e, t) {
    e.exports = {
      sha224WithRSAEncryption: {sign: "rsa", hash: "sha224", id: "302d300d06096086480165030402040500041c"},
      "RSA-SHA224": {sign: "ecdsa/rsa", hash: "sha224", id: "302d300d06096086480165030402040500041c"},
      sha256WithRSAEncryption: {sign: "rsa", hash: "sha256", id: "3031300d060960864801650304020105000420"},
      "RSA-SHA256": {sign: "ecdsa/rsa", hash: "sha256", id: "3031300d060960864801650304020105000420"},
      sha384WithRSAEncryption: {sign: "rsa", hash: "sha384", id: "3041300d060960864801650304020205000430"},
      "RSA-SHA384": {sign: "ecdsa/rsa", hash: "sha384", id: "3041300d060960864801650304020205000430"},
      sha512WithRSAEncryption: {sign: "rsa", hash: "sha512", id: "3051300d060960864801650304020305000440"},
      "RSA-SHA512": {sign: "ecdsa/rsa", hash: "sha512", id: "3051300d060960864801650304020305000440"},
      "RSA-SHA1": {sign: "rsa", hash: "sha1", id: "3021300906052b0e03021a05000414"},
      "ecdsa-with-SHA1": {sign: "ecdsa", hash: "sha1", id: ""},
      sha256: {sign: "ecdsa", hash: "sha256", id: ""},
      sha224: {sign: "ecdsa", hash: "sha224", id: ""},
      sha384: {sign: "ecdsa", hash: "sha384", id: ""},
      sha512: {sign: "ecdsa", hash: "sha512", id: ""},
      "DSA-SHA": {sign: "dsa", hash: "sha1", id: ""},
      "DSA-SHA1": {sign: "dsa", hash: "sha1", id: ""},
      DSA: {sign: "dsa", hash: "sha1", id: ""},
      "DSA-WITH-SHA224": {sign: "dsa", hash: "sha224", id: ""},
      "DSA-SHA224": {sign: "dsa", hash: "sha224", id: ""},
      "DSA-WITH-SHA256": {sign: "dsa", hash: "sha256", id: ""},
      "DSA-SHA256": {sign: "dsa", hash: "sha256", id: ""},
      "DSA-WITH-SHA384": {sign: "dsa", hash: "sha384", id: ""},
      "DSA-SHA384": {sign: "dsa", hash: "sha384", id: ""},
      "DSA-WITH-SHA512": {sign: "dsa", hash: "sha512", id: ""},
      "DSA-SHA512": {sign: "dsa", hash: "sha512", id: ""},
      "DSA-RIPEMD160": {sign: "dsa", hash: "rmd160", id: ""},
      ripemd160WithRSA: {sign: "rsa", hash: "rmd160", id: "3021300906052b2403020105000414"},
      "RSA-RIPEMD160": {sign: "rsa", hash: "rmd160", id: "3021300906052b2403020105000414"},
      md5WithRSAEncryption: {sign: "rsa", hash: "md5", id: "3020300c06082a864886f70d020505000410"},
      "RSA-MD5": {sign: "rsa", hash: "md5", id: "3020300c06082a864886f70d020505000410"}
    }
  }, function (e, t) {
    e.exports = {
      "1.3.132.0.10": "secp256k1",
      "1.3.132.0.33": "p224",
      "1.2.840.10045.3.1.1": "p192",
      "1.2.840.10045.3.1.7": "p256",
      "1.3.132.0.34": "p384",
      "1.3.132.0.35": "p521"
    }
  }, function (e, t, r) {
    var i = r(30);
    e.exports = function (e) {
      return (new i).update(e).digest()
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      s.call(this, "digest"), "string" == typeof t && (t = a.from(t));
      var r = "sha512" === e || "sha384" === e ? 128 : 64;
      if (this._alg = e, this._key = t, t.length > r) {
        t = ("rmd160" === e ? new c : h(e)).update(t).digest()
      } else t.length < r && (t = a.concat([t, u], r));
      for (var i = this._ipad = a.allocUnsafe(r), n = this._opad = a.allocUnsafe(r), o = 0; o < r; o++)i[o] = 54 ^ t[o], n[o] = 92 ^ t[o];
      this._hash = "rmd160" === e ? new c : h(e), this._hash.update(i)
    }

    var n = r(0), o = r(105), s = r(8), a = r(1).Buffer, f = r(49), c = r(33), h = r(34), u = a.alloc(128);
    n(i, s), i.prototype._update = function (e) {
      this._hash.update(e)
    }, i.prototype._final = function () {
      var e = this._hash.digest();
      return ("rmd160" === this._alg ? new c : h(this._alg)).update(this._opad).update(e).digest()
    }, e.exports = function (e, t) {
      return e = e.toLowerCase(), "rmd160" === e || "ripemd160" === e ? new i("rmd160", t) : "md5" === e ? new o(f, t) : new i(e, t)
    }
  }, function (e, t, r) {
    function i() {
      if (null !== v)return v;
      var e = [];
      e[0] = 2;
      for (var t = 1, r = 3; r < 1048576; r += 2) {
        for (var i = Math.ceil(Math.sqrt(r)), n = 0; n < t && e[n] <= i && r % e[n] != 0; n++);
        t !== n && e[n] <= i || (e[t++] = r)
      }
      return v = e, e
    }

    function n(e) {
      for (var t = i(), r = 0; r < t.length; r++)if (0 === e.modn(t[r]))return 0 === e.cmpn(t[r]);
      return !0
    }

    function o(e) {
      var t = f.mont(e);
      return 0 === l.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1)
    }

    function s(e, t) {
      if (e < 16)return new f(2 === t || 5 === t ? [140, 123] : [140, 39]);
      t = new f(t);
      for (var r, i; ;) {
        for (r = new f(a(Math.ceil(e / 8))); r.bitLength() > e;)r.ishrn(1);
        if (r.isEven() && r.iadd(d), r.testn(1) || r.iadd(l), t.cmp(l)) {
          if (!t.cmp(p))for (; r.mod(b).cmp(y);)r.iadd(g)
        } else for (; r.mod(c).cmp(m);)r.iadd(g);
        if (i = r.shrn(1), n(i) && n(r) && o(i) && o(r) && u.test(i) && u.test(r))return r
      }
    }

    var a = r(11);
    e.exports = s, s.simpleSieve = n, s.fermatTest = o;
    var f = r(3), c = new f(24), h = r(57), u = new h, d = new f(1), l = new f(2), p = new f(5), b = (new f(16), new f(8), new f(10)), y = new f(3), m = (new f(7), new f(11)), g = new f(4), v = (new f(12), null)
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      if (!o.isBuffer(e) && "string" != typeof e)throw new TypeError(t + " must be a string or a buffer")
    }

    function n(e) {
      s.call(this), this._block = o.allocUnsafe(e), this._blockSize = e, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
    }

    var o = r(1).Buffer, s = r(35).Transform;
    r(0)(n, s), n.prototype._transform = function (e, t, r) {
      var i = null;
      try {
        this.update(e, t)
      } catch (e) {
        i = e
      }
      r(i)
    }, n.prototype._flush = function (e) {
      var t = null;
      try {
        this.push(this.digest())
      } catch (e) {
        t = e
      }
      e(t)
    }, n.prototype.update = function (e, t) {
      if (i(e, "Data"), this._finalized)throw new Error("Digest already called");
      o.isBuffer(e) || (e = o.from(e, t));
      for (var r = this._block, n = 0; this._blockOffset + e.length - n >= this._blockSize;) {
        for (var s = this._blockOffset; s < this._blockSize;)r[s++] = e[n++];
        this._update(), this._blockOffset = 0
      }
      for (; n < e.length;)r[this._blockOffset++] = e[n++];
      for (var a = 0, f = 8 * e.length; f > 0; ++a)this._length[a] += f, (f = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * f);
      return this
    }, n.prototype._update = function () {
      throw new Error("_update is not implemented")
    }, n.prototype.digest = function (e) {
      if (this._finalized)throw new Error("Digest already called");
      this._finalized = !0;
      var t = this._digest();
      void 0 !== e && (t = t.toString(e)), this._block.fill(0), this._blockOffset = 0;
      for (var r = 0; r < 4; ++r)this._length[r] = 0;
      return t
    }, n.prototype._digest = function () {
      throw new Error("_digest is not implemented")
    }, e.exports = n
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = g, this.W = new Array(64)
    }

    var n = r(7), o = r(18), s = r(55), a = r(5), f = n.sum32, c = n.sum32_4, h = n.sum32_5, u = s.ch32, d = s.maj32, l = s.s0_256, p = s.s1_256, b = s.g0_256, y = s.g1_256, m = o.BlockHash, g = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    n.inherits(i, m), e.exports = i, i.blockSize = 512, i.outSize = 256, i.hmacStrength = 192, i.padLength = 64, i.prototype._update = function (e, t) {
      for (var r = this.W, i = 0; i < 16; i++)r[i] = e[t + i];
      for (; i < r.length; i++)r[i] = c(y(r[i - 2]), r[i - 7], b(r[i - 15]), r[i - 16]);
      var n = this.h[0], o = this.h[1], s = this.h[2], m = this.h[3], g = this.h[4], v = this.h[5], w = this.h[6], _ = this.h[7];
      for (a(this.k.length === r.length), i = 0; i < r.length; i++) {
        var S = h(_, p(g), u(g, v, w), this.k[i], r[i]), k = f(l(n), d(n, o, s));
        _ = w, w = v, v = g, g = f(m, S), m = s, s = o, o = n, n = f(S, k)
      }
      this.h[0] = f(this.h[0], n), this.h[1] = f(this.h[1], o), this.h[2] = f(this.h[2], s), this.h[3] = f(this.h[3], m), this.h[4] = f(this.h[4], g), this.h[5] = f(this.h[5], v), this.h[6] = f(this.h[6], w), this.h[7] = f(this.h[7], _)
    }, i.prototype._digest = function (e) {
      return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      O.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = B, this.W = new Array(160)
    }

    function n(e, t, r, i, n) {
      var o = e & r ^ ~e & n;
      return o < 0 && (o += 4294967296), o
    }

    function o(e, t, r, i, n, o) {
      var s = t & i ^ ~t & o;
      return s < 0 && (s += 4294967296), s
    }

    function s(e, t, r, i, n) {
      var o = e & r ^ e & n ^ r & n;
      return o < 0 && (o += 4294967296), o
    }

    function a(e, t, r, i, n, o) {
      var s = t & i ^ t & o ^ i & o;
      return s < 0 && (s += 4294967296), s
    }

    function f(e, t) {
      var r = v(e, t, 28), i = v(t, e, 2), n = v(t, e, 7), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function c(e, t) {
      var r = w(e, t, 28), i = w(t, e, 2), n = w(t, e, 7), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function h(e, t) {
      var r = v(e, t, 14), i = v(e, t, 18), n = v(t, e, 9), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function u(e, t) {
      var r = w(e, t, 14), i = w(e, t, 18), n = w(t, e, 9), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function d(e, t) {
      var r = v(e, t, 1), i = v(e, t, 8), n = _(e, t, 7), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function l(e, t) {
      var r = w(e, t, 1), i = w(e, t, 8), n = S(e, t, 7), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function p(e, t) {
      var r = v(e, t, 19), i = v(t, e, 29), n = _(e, t, 6), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    function b(e, t) {
      var r = w(e, t, 19), i = w(t, e, 29), n = S(e, t, 6), o = r ^ i ^ n;
      return o < 0 && (o += 4294967296), o
    }

    var y = r(7), m = r(18), g = r(5), v = y.rotr64_hi, w = y.rotr64_lo, _ = y.shr64_hi, S = y.shr64_lo, k = y.sum64, E = y.sum64_hi, M = y.sum64_lo, A = y.sum64_4_hi, T = y.sum64_4_lo, x = y.sum64_5_hi, I = y.sum64_5_lo, O = m.BlockHash, B = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    y.inherits(i, O), e.exports = i, i.blockSize = 1024, i.outSize = 512, i.hmacStrength = 192, i.padLength = 128, i.prototype._prepareBlock = function (e, t) {
      for (var r = this.W, i = 0; i < 32; i++)r[i] = e[t + i];
      for (; i < r.length; i += 2) {
        var n = p(r[i - 4], r[i - 3]), o = b(r[i - 4], r[i - 3]), s = r[i - 14], a = r[i - 13], f = d(r[i - 30], r[i - 29]), c = l(r[i - 30], r[i - 29]), h = r[i - 32], u = r[i - 31];
        r[i] = A(n, o, s, a, f, c, h, u), r[i + 1] = T(n, o, s, a, f, c, h, u)
      }
    }, i.prototype._update = function (e, t) {
      this._prepareBlock(e, t);
      var r = this.W, i = this.h[0], d = this.h[1], l = this.h[2], p = this.h[3], b = this.h[4], y = this.h[5], m = this.h[6], v = this.h[7], w = this.h[8], _ = this.h[9], S = this.h[10], A = this.h[11], T = this.h[12], O = this.h[13], B = this.h[14], C = this.h[15];
      g(this.k.length === r.length);
      for (var R = 0; R < r.length; R += 2) {
        var j = B, D = C, P = h(w, _), q = u(w, _), U = n(w, _, S, A, T), L = o(w, _, S, A, T, O), N = this.k[R], z = this.k[R + 1], H = r[R], F = r[R + 1], K = x(j, D, P, q, U, L, N, z, H, F), V = I(j, D, P, q, U, L, N, z, H, F);
        j = f(i, d), D = c(i, d), P = s(i, d, l, p, b), q = a(i, d, l, p, b, y);
        var W = E(j, D, P, q), Y = M(j, D, P, q);
        B = T, C = O, T = S, O = A, S = w, A = _, w = E(m, v, K, V), _ = M(v, v, K, V), m = b, v = y, b = l, y = p, l = i, p = d, i = E(K, V, W, Y), d = M(K, V, W, Y)
      }
      k(this.h, 0, i, d), k(this.h, 2, l, p), k(this.h, 4, b, y), k(this.h, 6, m, v), k(this.h, 8, w, _), k(this.h, 10, S, A), k(this.h, 12, T, O), k(this.h, 14, B, C)
    }, i.prototype._digest = function (e) {
      return "hex" === e ? y.toHex32(this.h, "big") : y.split32(this.h, "big")
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t, r, i) {
      return 0 === e ? n(t, r, i) : 1 === e || 3 === e ? s(t, r, i) : 2 === e ? o(t, r, i) : void 0
    }

    function n(e, t, r) {
      return e & t ^ ~e & r
    }

    function o(e, t, r) {
      return e & t ^ e & r ^ t & r
    }

    function s(e, t, r) {
      return e ^ t ^ r
    }

    function a(e) {
      return d(e, 2) ^ d(e, 13) ^ d(e, 22)
    }

    function f(e) {
      return d(e, 6) ^ d(e, 11) ^ d(e, 25)
    }

    function c(e) {
      return d(e, 7) ^ d(e, 18) ^ e >>> 3
    }

    function h(e) {
      return d(e, 17) ^ d(e, 19) ^ e >>> 10
    }

    var u = r(7), d = u.rotr32;
    t.ft_1 = i, t.ch32 = n, t.maj32 = o, t.p32 = s, t.s0_256 = a, t.s1_256 = f, t.g0_256 = c, t.g1_256 = h
  }, function (e, t) {
    var r = {}.toString;
    e.exports = Array.isArray || function (e) {
        return "[object Array]" == r.call(e)
      }
  }, function (e, t, r) {
    function i(e) {
      this.rand = e || new o.Rand
    }

    var n = r(3), o = r(41);
    e.exports = i, i.create = function (e) {
      return new i(e)
    }, i.prototype._randbelow = function (e) {
      var t = e.bitLength(), r = Math.ceil(t / 8);
      do {
        var i = new n(this.rand.generate(r))
      } while (i.cmp(e) >= 0);
      return i
    }, i.prototype._randrange = function (e, t) {
      var r = t.sub(e);
      return e.add(this._randbelow(r))
    }, i.prototype.test = function (e, t, r) {
      var i = e.bitLength(), o = n.mont(e), s = new n(1).toRed(o);
      t || (t = Math.max(1, i / 48 | 0));
      for (var a = e.subn(1), f = 0; !a.testn(f); f++);
      for (var c = e.shrn(f), h = a.toRed(o); t > 0; t--) {
        var u = this._randrange(new n(2), a);
        r && r(u);
        var d = u.toRed(o).redPow(c);
        if (0 !== d.cmp(s) && 0 !== d.cmp(h)) {
          for (var l = 1; l < f; l++) {
            if (d = d.redSqr(), 0 === d.cmp(s))return !1;
            if (0 === d.cmp(h))break
          }
          if (l === f)return !1
        }
      }
      return !0
    }, i.prototype.getDivisor = function (e, t) {
      var r = e.bitLength(), i = n.mont(e), o = new n(1).toRed(i);
      t || (t = Math.max(1, r / 48 | 0));
      for (var s = e.subn(1), a = 0; !s.testn(a); a++);
      for (var f = e.shrn(a), c = s.toRed(i); t > 0; t--) {
        var h = this._randrange(new n(2), s), u = e.gcd(h);
        if (0 !== u.cmpn(1))return u;
        var d = h.toRed(i).redPow(f);
        if (0 !== d.cmp(o) && 0 !== d.cmp(c)) {
          for (var l = 1; l < a; l++) {
            if (d = d.redSqr(), 0 === d.cmp(o))return d.fromRed().subn(1).gcd(e);
            if (0 === d.cmp(c))break
          }
          if (l === a)return d = d.redSqr(), d.fromRed().subn(1).gcd(e)
        }
      }
      return !1
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      if (Array.isArray(e))return e.slice();
      if (!e)return [];
      var r = [];
      if ("string" != typeof e) {
        for (var i = 0; i < e.length; i++)r[i] = 0 | e[i];
        return r
      }
      if ("hex" === t) {
        e = e.replace(/[^a-z0-9]+/gi, ""), e.length % 2 != 0 && (e = "0" + e);
        for (var i = 0; i < e.length; i += 2)r.push(parseInt(e[i] + e[i + 1], 16))
      } else for (var i = 0; i < e.length; i++) {
        var n = e.charCodeAt(i), o = n >> 8, s = 255 & n;
        o ? r.push(o, s) : r.push(s)
      }
      return r
    }

    function n(e) {
      return 1 === e.length ? "0" + e : e
    }

    function o(e) {
      for (var t = "", r = 0; r < e.length; r++)t += n(e[r].toString(16));
      return t
    }

    var s = t;
    s.toArray = i, s.zero2 = n, s.toHex = o, s.encode = function (e, t) {
      return "hex" === t ? o(e) : e
    }
  }, function (e, t, r) {
    t.pbkdf2 = r(142), t.pbkdf2Sync = r(62)
  }, function (e, t, r) {
    (function (t) {
      var r;
      if (t.browser)r = "utf-8"; else {
        r = parseInt(t.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary"
      }
      e.exports = r
    }).call(t, r(9))
  }, function (e, t, r) {
    (function (t) {
      function r(e, r) {
        if ("string" != typeof e && !t.isBuffer(e))throw new TypeError(r + " must be a buffer or string")
      }

      var i = Math.pow(2, 30) - 1;
      e.exports = function (e, t, n, o) {
        if (r(e, "Password"), r(t, "Salt"), "number" != typeof n)throw new TypeError("Iterations not a number");
        if (n < 0)throw new TypeError("Bad iterations");
        if ("number" != typeof o)throw new TypeError("Key length not a number");
        if (o < 0 || o > i || o !== o)throw new TypeError("Bad key length")
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    function i(e, t, r) {
      var i = n(e), o = "sha512" === e || "sha384" === e ? 128 : 64;
      t.length > o ? t = i(t) : t.length < o && (t = u.concat([t, d], o));
      for (var s = u.allocUnsafe(o + l[e]), a = u.allocUnsafe(o + l[e]), f = 0; f < o; f++)s[f] = 54 ^ t[f], a[f] = 92 ^ t[f];
      var c = u.allocUnsafe(o + r + 4);
      s.copy(c, 0, 0, o), this.ipad1 = c, this.ipad2 = s, this.opad = a, this.alg = e, this.blocksize = o, this.hash = i, this.size = l[e]
    }

    function n(e) {
      function t(t) {
        return f(e).update(t).digest()
      }

      return "rmd160" === e || "ripemd160" === e ? a : "md5" === e ? s : t
    }

    function o(e, t, r, n, o) {
      c(e, t, r, n), u.isBuffer(e) || (e = u.from(e, h)), u.isBuffer(t) || (t = u.from(t, h)), o = o || "sha1";
      var s = new i(o, e, t.length), a = u.allocUnsafe(n), f = u.allocUnsafe(t.length + 4);
      t.copy(f, 0, 0, t.length);
      for (var d = 0, p = l[o], b = Math.ceil(n / p), y = 1; y <= b; y++) {
        f.writeUInt32BE(y, t.length);
        for (var m = s.run(f, s.ipad1), g = m, v = 1; v < r; v++) {
          g = s.run(g, s.ipad2);
          for (var w = 0; w < p; w++)m[w] ^= g[w]
        }
        m.copy(a, d), d += p
      }
      return a
    }

    var s = r(49), a = r(33), f = r(34), c = r(61), h = r(60), u = r(1).Buffer, d = u.alloc(128), l = {
      md5: 16,
      sha1: 20,
      sha224: 28,
      sha256: 32,
      sha384: 48,
      sha512: 64,
      rmd160: 20,
      ripemd160: 20
    };
    i.prototype.run = function (e, t) {
      return e.copy(t, this.blocksize), this.hash(t).copy(this.opad, this.blocksize), this.hash(this.opad)
    }, e.exports = o
  }, function (e, t, r) {
    (function (t) {
      function i(e) {
        var r = new t(4);
        return r.writeUInt32BE(e, 0), r
      }

      var n = r(17);
      e.exports = function (e, r) {
        for (var o, s = new t(""), a = 0; s.length < r;)o = i(a++), s = t.concat([s, n("sha1").update(e).update(o).digest()]);
        return s.slice(0, r)
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e, r) {
        return new t(e.toRed(n.mont(r.modulus)).redPow(new n(r.publicExponent)).fromRed().toArray())
      }

      var n = r(3);
      e.exports = i
    }).call(t, r(2).Buffer)
  }, function (e, t) {
    e.exports = function (e, t) {
      for (var r = e.length, i = -1; ++i < r;)e[i] ^= t[i];
      return e
    }
  }, function (e, t, r) {
    "use strict";
    (function (t, i) {
      function n(e) {
        return q.from(e)
      }

      function o(e) {
        return q.isBuffer(e) || e instanceof U
      }

      function s(e, t, r) {
        if ("function" == typeof e.prependListener)return e.prependListener(t, r);
        e._events && e._events[t] ? j(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
      }

      function a(e, t) {
        R = R || r(10), e = e || {};
        var i = t instanceof R;
        this.objectMode = !!e.objectMode, i && (this.objectMode = this.objectMode || !!e.readableObjectMode);
        var n = e.highWaterMark, o = e.readableHighWaterMark, s = this.objectMode ? 16 : 16384;
        this.highWaterMark = n || 0 === n ? n : i && (o || 0 === o) ? o : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new F, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (H || (H = r(36).StringDecoder), this.decoder = new H(e.encoding), this.encoding = e.encoding)
      }

      function f(e) {
        if (R = R || r(10), !(this instanceof f))return new f(e);
        this._readableState = new a(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), P.call(this)
      }

      function c(e, t, r, i, o) {
        var s = e._readableState;
        if (null === t)s.reading = !1, b(e, s); else {
          var a;
          o || (a = u(s, t)), a ? e.emit("error", a) : s.objectMode || t && t.length > 0 ? ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === q.prototype || (t = n(t)), i ? s.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : h(e, s, t, !0) : s.ended ? e.emit("error", new Error("stream.push() after EOF")) : (s.reading = !1, s.decoder && !r ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? h(e, s, t, !1) : g(e, s)) : h(e, s, t, !1))) : i || (s.reading = !1)
        }
        return d(s)
      }

      function h(e, t, r, i) {
        t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r), e.read(0)) : (t.length += t.objectMode ? 1 : r.length, i ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && y(e)), g(e, t)
      }

      function u(e, t) {
        var r;
        return o(t) || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk")), r
      }

      function d(e) {
        return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
      }

      function l(e) {
        return e >= W ? e = W : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
      }

      function p(e, t) {
        return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e !== e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = l(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
      }

      function b(e, t) {
        if (!t.ended) {
          if (t.decoder) {
            var r = t.decoder.end();
            r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
          }
          t.ended = !0, y(e)
        }
      }

      function y(e) {
        var t = e._readableState;
        t.needReadable = !1, t.emittedReadable || (z("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? C.nextTick(m, e) : m(e))
      }

      function m(e) {
        z("emit readable"), e.emit("readable"), E(e)
      }

      function g(e, t) {
        t.readingMore || (t.readingMore = !0, C.nextTick(v, e, t))
      }

      function v(e, t) {
        for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (z("maybeReadMore read 0"), e.read(0), r !== t.length);)r = t.length;
        t.readingMore = !1
      }

      function w(e) {
        return function () {
          var t = e._readableState;
          z("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && D(e, "data") && (t.flowing = !0, E(e))
        }
      }

      function _(e) {
        z("readable nexttick read 0"), e.read(0)
      }

      function S(e, t) {
        t.resumeScheduled || (t.resumeScheduled = !0, C.nextTick(k, e, t))
      }

      function k(e, t) {
        t.reading || (z("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), E(e), t.flowing && !t.reading && e.read(0)
      }

      function E(e) {
        var t = e._readableState;
        for (z("flow", t.flowing); t.flowing && null !== e.read(););
      }

      function M(e, t) {
        if (0 === t.length)return null;
        var r;
        return t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : r = A(e, t.buffer, t.decoder), r
      }

      function A(e, t, r) {
        var i;
        return e < t.head.data.length ? (i = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : i = e === t.head.data.length ? t.shift() : r ? T(e, t) : x(e, t), i
      }

      function T(e, t) {
        var r = t.head, i = 1, n = r.data;
        for (e -= n.length; r = r.next;) {
          var o = r.data, s = e > o.length ? o.length : e;
          if (s === o.length ? n += o : n += o.slice(0, e), 0 === (e -= s)) {
            s === o.length ? (++i, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = o.slice(s));
            break
          }
          ++i
        }
        return t.length -= i, n
      }

      function x(e, t) {
        var r = q.allocUnsafe(e), i = t.head, n = 1;
        for (i.data.copy(r), e -= i.data.length; i = i.next;) {
          var o = i.data, s = e > o.length ? o.length : e;
          if (o.copy(r, r.length - e, 0, s), 0 === (e -= s)) {
            s === o.length ? (++n, i.next ? t.head = i.next : t.head = t.tail = null) : (t.head = i, i.data = o.slice(s));
            break
          }
          ++n
        }
        return t.length -= n, r
      }

      function I(e) {
        var t = e._readableState;
        if (t.length > 0)throw new Error('"endReadable()" called on non-empty stream');
        t.endEmitted || (t.ended = !0, C.nextTick(O, t, e))
      }

      function O(e, t) {
        e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
      }

      function B(e, t) {
        for (var r = 0, i = e.length; r < i; r++)if (e[r] === t)return r;
        return -1
      }

      var C = r(23);
      e.exports = f;
      var R, j = r(56);
      f.ReadableState = a;
      var D = (r(28).EventEmitter, function (e, t) {
        return e.listeners(t).length
      }), P = r(69), q = r(1).Buffer, U = t.Uint8Array || function () {
        }, L = r(16);
      L.inherits = r(0);
      var N = r(169), z = void 0;
      z = N && N.debuglog ? N.debuglog("stream") : function () {
      };
      var H, F = r(150), K = r(68);
      L.inherits(f, P);
      var V = ["error", "close", "destroy", "pause", "resume"];
      Object.defineProperty(f.prototype, "destroyed", {
        get: function () {
          return void 0 !== this._readableState && this._readableState.destroyed
        }, set: function (e) {
          this._readableState && (this._readableState.destroyed = e)
        }
      }), f.prototype.destroy = K.destroy, f.prototype._undestroy = K.undestroy, f.prototype._destroy = function (e, t) {
        this.push(null), t(e)
      }, f.prototype.push = function (e, t) {
        var r, i = this._readableState;
        return i.objectMode ? r = !0 : "string" == typeof e && (t = t || i.defaultEncoding, t !== i.encoding && (e = q.from(e, t), t = ""), r = !0), c(this, e, t, !1, r)
      }, f.prototype.unshift = function (e) {
        return c(this, e, null, !0, !1)
      }, f.prototype.isPaused = function () {
        return !1 === this._readableState.flowing
      }, f.prototype.setEncoding = function (e) {
        return H || (H = r(36).StringDecoder), this._readableState.decoder = new H(e), this._readableState.encoding = e, this
      };
      var W = 8388608;
      f.prototype.read = function (e) {
        z("read", e), e = parseInt(e, 10);
        var t = this._readableState, r = e;
        if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))return z("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? I(this) : y(this), null;
        if (0 === (e = p(e, t)) && t.ended)return 0 === t.length && I(this), null;
        var i = t.needReadable;
        z("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && (i = !0, z("length less than watermark", i)), t.ended || t.reading ? (i = !1, z("reading or ended", i)) : i && (z("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = p(r, t)));
        var n;
        return n = e > 0 ? M(e, t) : null, null === n ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && I(this)), null !== n && this.emit("data", n), n
      }, f.prototype._read = function (e) {
        this.emit("error", new Error("_read() is not implemented"))
      }, f.prototype.pipe = function (e, t) {
        function r(e, t) {
          z("onunpipe"), e === d && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, o())
        }

        function n() {
          z("onend"), e.end()
        }

        function o() {
          z("cleanup"), e.removeListener("close", c), e.removeListener("finish", h), e.removeListener("drain", y), e.removeListener("error", f), e.removeListener("unpipe", r), d.removeListener("end", n), d.removeListener("end", u), d.removeListener("data", a), m = !0, !l.awaitDrain || e._writableState && !e._writableState.needDrain || y()
        }

        function a(t) {
          z("ondata"), g = !1, !1 !== e.write(t) || g || ((1 === l.pipesCount && l.pipes === e || l.pipesCount > 1 && -1 !== B(l.pipes, e)) && !m && (z("false write response, pause", d._readableState.awaitDrain), d._readableState.awaitDrain++, g = !0), d.pause())
        }

        function f(t) {
          z("onerror", t), u(), e.removeListener("error", f), 0 === D(e, "error") && e.emit("error", t)
        }

        function c() {
          e.removeListener("finish", h), u()
        }

        function h() {
          z("onfinish"), e.removeListener("close", c), u()
        }

        function u() {
          z("unpipe"), d.unpipe(e)
        }

        var d = this, l = this._readableState;
        switch (l.pipesCount) {
          case 0:
            l.pipes = e;
            break;
          case 1:
            l.pipes = [l.pipes, e];
            break;
          default:
            l.pipes.push(e)
        }
        l.pipesCount += 1, z("pipe count=%d opts=%j", l.pipesCount, t);
        var p = (!t || !1 !== t.end) && e !== i.stdout && e !== i.stderr, b = p ? n : u;
        l.endEmitted ? C.nextTick(b) : d.once("end", b), e.on("unpipe", r);
        var y = w(d);
        e.on("drain", y);
        var m = !1, g = !1;
        return d.on("data", a), s(e, "error", f), e.once("close", c), e.once("finish", h), e.emit("pipe", d), l.flowing || (z("pipe resume"), d.resume()), e
      }, f.prototype.unpipe = function (e) {
        var t = this._readableState, r = {hasUnpiped: !1};
        if (0 === t.pipesCount)return this;
        if (1 === t.pipesCount)return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);
        if (!e) {
          var i = t.pipes, n = t.pipesCount;
          t.pipes = null, t.pipesCount = 0, t.flowing = !1;
          for (var o = 0; o < n; o++)i[o].emit("unpipe", this, r);
          return this
        }
        var s = B(t.pipes, e);
        return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this)
      }, f.prototype.on = function (e, t) {
        var r = P.prototype.on.call(this, e, t);
        if ("data" === e)!1 !== this._readableState.flowing && this.resume(); else if ("readable" === e) {
          var i = this._readableState;
          i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.emittedReadable = !1, i.reading ? i.length && y(this) : C.nextTick(_, this))
        }
        return r
      }, f.prototype.addListener = f.prototype.on, f.prototype.resume = function () {
        var e = this._readableState;
        return e.flowing || (z("resume"), e.flowing = !0, S(this, e)), this
      }, f.prototype.pause = function () {
        return z("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (z("pause"), this._readableState.flowing = !1, this.emit("pause")), this
      }, f.prototype.wrap = function (e) {
        var t = this, r = this._readableState, i = !1;
        e.on("end", function () {
          if (z("wrapped end"), r.decoder && !r.ended) {
            var e = r.decoder.end();
            e && e.length && t.push(e)
          }
          t.push(null)
        }), e.on("data", function (n) {
          if (z("wrapped data"), r.decoder && (n = r.decoder.write(n)), (!r.objectMode || null !== n && void 0 !== n) && (r.objectMode || n && n.length)) {
            t.push(n) || (i = !0, e.pause())
          }
        });
        for (var n in e)void 0 === this[n] && "function" == typeof e[n] && (this[n] = function (t) {
          return function () {
            return e[t].apply(e, arguments)
          }
        }(n));
        for (var o = 0; o < V.length; o++)e.on(V[o], this.emit.bind(this, V[o]));
        return this._read = function (t) {
          z("wrapped _read", t), i && (i = !1, e.resume())
        }, this
      }, Object.defineProperty(f.prototype, "readableHighWaterMark", {
        enumerable: !1, get: function () {
          return this._readableState.highWaterMark
        }
      }), f._fromList = M
    }).call(t, r(6), r(9))
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      var r = this._transformState;
      r.transforming = !1;
      var i = r.writecb;
      if (!i)return this.emit("error", new Error("write callback called multiple times"));
      r.writechunk = null, r.writecb = null, null != t && this.push(t), i(e);
      var n = this._readableState;
      n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
    }

    function n(e) {
      if (!(this instanceof n))return new n(e);
      a.call(this, e), this._transformState = {
        afterTransform: i.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null
      }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", o)
    }

    function o() {
      var e = this;
      "function" == typeof this._flush ? this._flush(function (t, r) {
        s(e, t, r)
      }) : s(this, null, null)
    }

    function s(e, t, r) {
      if (t)return e.emit("error", t);
      if (null != r && e.push(r), e._writableState.length)throw new Error("Calling transform done when ws.length != 0");
      if (e._transformState.transforming)throw new Error("Calling transform done when still transforming");
      return e.push(null)
    }

    e.exports = n;
    var a = r(10), f = r(16);
    f.inherits = r(0), f.inherits(n, a), n.prototype.push = function (e, t) {
      return this._transformState.needTransform = !1, a.prototype.push.call(this, e, t)
    }, n.prototype._transform = function (e, t, r) {
      throw new Error("_transform() is not implemented")
    }, n.prototype._write = function (e, t, r) {
      var i = this._transformState;
      if (i.writecb = r, i.writechunk = e, i.writeencoding = t, !i.transforming) {
        var n = this._readableState;
        (i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
      }
    }, n.prototype._read = function (e) {
      var t = this._transformState;
      null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
    }, n.prototype._destroy = function (e, t) {
      var r = this;
      a.prototype._destroy.call(this, e, function (e) {
        t(e), r.emit("close")
      })
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      var r = this, i = this._readableState && this._readableState.destroyed, n = this._writableState && this._writableState.destroyed;
      return i || n ? (t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || s.nextTick(o, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function (e) {
        !t && e ? (s.nextTick(o, r, e), r._writableState && (r._writableState.errorEmitted = !0)) : t && t(e)
      }), this)
    }

    function n() {
      this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
    }

    function o(e, t) {
      e.emit("error", t)
    }

    var s = r(23);
    e.exports = {destroy: i, undestroy: n}
  }, function (e, t, r) {
    e.exports = r(28).EventEmitter
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = p, u.call(this, 64, 56)
    }

    function n(e, t, r) {
      return r ^ e & (t ^ r)
    }

    function o(e, t, r) {
      return e & t | r & (e | t)
    }

    function s(e) {
      return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10)
    }

    function a(e) {
      return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)
    }

    function f(e) {
      return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3
    }

    function c(e) {
      return (e >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10
    }

    var h = r(0), u = r(12), d = r(1).Buffer, l = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], p = new Array(64);
    h(i, u), i.prototype.init = function () {
      return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
    }, i.prototype._update = function (e) {
      for (var t = this._w, r = 0 | this._a, i = 0 | this._b, h = 0 | this._c, u = 0 | this._d, d = 0 | this._e, p = 0 | this._f, b = 0 | this._g, y = 0 | this._h, m = 0; m < 16; ++m)t[m] = e.readInt32BE(4 * m);
      for (; m < 64; ++m)t[m] = c(t[m - 2]) + t[m - 7] + f(t[m - 15]) + t[m - 16] | 0;
      for (var g = 0; g < 64; ++g) {
        var v = y + a(d) + n(d, p, b) + l[g] + t[g] | 0, w = s(r) + o(r, i, h) | 0;
        y = b, b = p, p = d, d = u + v | 0, u = h, h = i, i = r, r = v + w | 0
      }
      this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = h + this._c | 0, this._d = u + this._d | 0, this._e = d + this._e | 0, this._f = p + this._f | 0, this._g = b + this._g | 0, this._h = y + this._h | 0
    }, i.prototype._hash = function () {
      var e = d.allocUnsafe(32);
      return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e.writeInt32BE(this._h, 28), e
    }, e.exports = i
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = m, p.call(this, 128, 112)
    }

    function n(e, t, r) {
      return r ^ e & (t ^ r)
    }

    function o(e, t, r) {
      return e & t | r & (e | t)
    }

    function s(e, t) {
      return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25)
    }

    function a(e, t) {
      return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23)
    }

    function f(e, t) {
      return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7
    }

    function c(e, t) {
      return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25)
    }

    function h(e, t) {
      return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6
    }

    function u(e, t) {
      return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26)
    }

    function d(e, t) {
      return e >>> 0 < t >>> 0 ? 1 : 0
    }

    var l = r(0), p = r(12), b = r(1).Buffer, y = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591], m = new Array(160);
    l(i, p), i.prototype.init = function () {
      return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
    }, i.prototype._update = function (e) {
      for (var t = this._w, r = 0 | this._ah, i = 0 | this._bh, l = 0 | this._ch, p = 0 | this._dh, b = 0 | this._eh, m = 0 | this._fh, g = 0 | this._gh, v = 0 | this._hh, w = 0 | this._al, _ = 0 | this._bl, S = 0 | this._cl, k = 0 | this._dl, E = 0 | this._el, M = 0 | this._fl, A = 0 | this._gl, T = 0 | this._hl, x = 0; x < 32; x += 2)t[x] = e.readInt32BE(4 * x), t[x + 1] = e.readInt32BE(4 * x + 4);
      for (; x < 160; x += 2) {
        var I = t[x - 30], O = t[x - 30 + 1], B = f(I, O), C = c(O, I);
        I = t[x - 4], O = t[x - 4 + 1];
        var R = h(I, O), j = u(O, I), D = t[x - 14], P = t[x - 14 + 1], q = t[x - 32], U = t[x - 32 + 1], L = C + P | 0, N = B + D + d(L, C) | 0;
        L = L + j | 0, N = N + R + d(L, j) | 0, L = L + U | 0, N = N + q + d(L, U) | 0, t[x] = N, t[x + 1] = L
      }
      for (var z = 0; z < 160; z += 2) {
        N = t[z], L = t[z + 1];
        var H = o(r, i, l), F = o(w, _, S), K = s(r, w), V = s(w, r), W = a(b, E), Y = a(E, b), X = y[z], J = y[z + 1], Z = n(b, m, g), G = n(E, M, A), $ = T + Y | 0, Q = v + W + d($, T) | 0;
        $ = $ + G | 0, Q = Q + Z + d($, G) | 0, $ = $ + J | 0, Q = Q + X + d($, J) | 0, $ = $ + L | 0, Q = Q + N + d($, L) | 0;
        var ee = V + F | 0, te = K + H + d(ee, V) | 0;
        v = g, T = A, g = m, A = M, m = b, M = E, E = k + $ | 0, b = p + Q + d(E, k) | 0, p = l, k = S, l = i, S = _, i = r, _ = w, w = $ + ee | 0, r = Q + te + d(w, $) | 0
      }
      this._al = this._al + w | 0, this._bl = this._bl + _ | 0, this._cl = this._cl + S | 0, this._dl = this._dl + k | 0, this._el = this._el + E | 0, this._fl = this._fl + M | 0, this._gl = this._gl + A | 0, this._hl = this._hl + T | 0, this._ah = this._ah + r + d(this._al, w) | 0, this._bh = this._bh + i + d(this._bl, _) | 0, this._ch = this._ch + l + d(this._cl, S) | 0, this._dh = this._dh + p + d(this._dl, k) | 0, this._eh = this._eh + b + d(this._el, E) | 0, this._fh = this._fh + m + d(this._fl, M) | 0, this._gh = this._gh + g + d(this._gl, A) | 0, this._hh = this._hh + v + d(this._hl, T) | 0
    }, i.prototype._hash = function () {
      function e(e, r, i) {
        t.writeInt32BE(e, i), t.writeInt32BE(r, i + 4)
      }

      var t = b.allocUnsafe(64);
      return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl, 48), e(this._hh, this._hl, 56), t
    }, e.exports = i
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
      function i(e, t) {
        return e(t = {exports: {}}, t.exports), t.exports
      }

      function n(e) {
        return null !== e && "object" == typeof e
      }

      function o(e) {
        if (e)return s(e)
      }

      function s(e) {
        for (var t in o.prototype)e[t] = o.prototype[t];
        return e
      }

      function a(e) {
        if (e)return f(e)
      }

      function f(e) {
        for (var t in a.prototype)e[t] = a.prototype[t];
        return e
      }

      function c() {
        this._defaults = []
      }

      function h(e) {
        var t = e.length;
        if (t % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
      }

      function u(e) {
        return 3 * e.length / 4 - h(e)
      }

      function d(e) {
        var t, r, i, n, o, s, a = e.length;
        o = h(e), s = new kt(3 * a / 4 - o), i = o > 0 ? a - 4 : a;
        var f = 0;
        for (t = 0, r = 0; t < i; t += 4, r += 3)n = St[e.charCodeAt(t)] << 18 | St[e.charCodeAt(t + 1)] << 12 | St[e.charCodeAt(t + 2)] << 6 | St[e.charCodeAt(t + 3)], s[f++] = n >> 16 & 255, s[f++] = n >> 8 & 255, s[f++] = 255 & n;
        return 2 === o ? (n = St[e.charCodeAt(t)] << 2 | St[e.charCodeAt(t + 1)] >> 4, s[f++] = 255 & n) : 1 === o && (n = St[e.charCodeAt(t)] << 10 | St[e.charCodeAt(t + 1)] << 4 | St[e.charCodeAt(t + 2)] >> 2, s[f++] = n >> 8 & 255, s[f++] = 255 & n), s
      }

      function l(e) {
        return _t[e >> 18 & 63] + _t[e >> 12 & 63] + _t[e >> 6 & 63] + _t[63 & e]
      }

      function p(e, t, r) {
        for (var i, n = [], o = t; o < r; o += 3)i = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2], n.push(l(i));
        return n.join("")
      }

      function b(e) {
        for (var t, r = e.length, i = r % 3, n = "", o = [], s = 0, a = r - i; s < a; s += 16383)o.push(p(e, s, s + 16383 > a ? a : s + 16383));
        return 1 === i ? (t = e[r - 1], n += _t[t >> 2], n += _t[t << 4 & 63], n += "==") : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], n += _t[t >> 10], n += _t[t >> 4 & 63], n += _t[t << 2 & 63], n += "="), o.push(n), o.join("")
      }

      function y(e) {
        var t = e.length % 4;
        return 0 === t ? e : e + new Array(4 - t + 1).join("=")
      }

      function m(e) {
        for (var t = new Array(e.length), r = 0; r < e.length; r++)t[r] = e.charCodeAt(r);
        return t
      }

      function g(e) {
        for (var t = "", r = 0; r < e.length; r++)t += String.fromCharCode(e[r]);
        return t
      }

      function v(e) {
        return Tt.fromByteArray(m(e)).replace(/\+/g, "-").replace(/\//g, "_")
      }

      function w(e) {
        return e = y(e).replace(/-/g, "+").replace(/_/g, "/"), g(Tt.toByteArray(e))
      }

      function _(e) {
        this.request = e, this.method = e.method, this.url = e.url, this.body = e._data, this.headers = e._header
      }

      function S(e) {
        this.request = e
      }

      function k(e) {
        this._sendTelemetry = !1 !== e._sendTelemetry || e._sendTelemetry, this._telemetryInfo = e._telemetryInfo || null, this._timesToRetryFailedRequests = e._timesToRetryFailedRequests, this.headers = e.headers || {}
      }

      function E(e, t, r, i) {
        if (r = "array" === r ? "object" : r, e && typeof e[t] !== r)throw new Error(i)
      }

      function M(e, t, r) {
        if (typeof e !== t)throw new Error(r)
      }

      function A(e, t, r) {
        if (-1 === t.indexOf(e))throw new Error(r)
      }

      function T(e, t, r) {
        if (t.optional && !e || M(e, t.type, t.message), "object" === t.type && r)for (var i = Object.keys(r), n = 0; n < i.length; n++) {
          var o = i[n];
          r[o].optional && !e[o] || r[o].condition && !r[o].condition(e) || (E(e, o, r[o].type, r[o].message), r[o].values && A(e[o], r[o].values, r[o].value_message))
        }
      }

      function x(e) {
        return this.supportsIsArray() ? Array.isArray(e) : "[object Array]" === Ot.call(e)
      }

      function I() {
        return null != Array.isArray
      }

      function O() {
        return Object.assign ? Object.assign : B
      }

      function B(e) {
        if (null == e)throw new TypeError("Cannot convert first argument to object");
        for (var t = Object(e), r = 1; r < arguments.length; r++) {
          var i = arguments[r];
          if (null != i)for (var n = Object.keys(Object(i)), o = 0, s = n.length; o < s; o++) {
            var a = n[o], f = Object.getOwnPropertyDescriptor(i, a);
            void 0 !== f && f.enumerable && (t[a] = i[a])
          }
        }
        return t
      }

      function C(e, t) {
        return t.reduce(function (t, r) {
          return e[r] && (t[r] = e[r]), t
        }, {})
      }

      function R(e, t) {
        var r = [];
        for (var i in e)-1 === t.indexOf(i) && r.push(i);
        return r
      }

      function j(e) {
        var t = [];
        for (var r in e)t.push(e[r]);
        return t
      }

      function D() {
        var e = j(arguments);
        return e.unshift({}), Ct.get().apply(void 0, e)
      }

      function P(e, t) {
        return {
          base: t ? C(e, t) : e, with: function (e, t) {
            return e = t ? C(e, t) : e, D(this.base, e)
          }
        }
      }

      function q(e, t) {
        return Object.keys(e).reduce(function (r, i) {
          return -1 === t.indexOf(i) && (r[i] = e[i]), r
        }, {})
      }

      function U(e) {
        for (var t, r = "", i = 0, n = !0, o = !0; i < e.length;)t = e.charCodeAt(i), !o && t >= 65 && t <= 90 || !n && t >= 48 && t <= 57 ? (r += "_", r += e[i].toLowerCase()) : r += e[i].toLowerCase(), n = t >= 48 && t <= 57, o = t >= 65 && t <= 90, i++;
        return r
      }

      function L(e) {
        var t = e.split("_");
        return t.reduce(function (e, t) {
          return e + t.charAt(0).toUpperCase() + t.slice(1)
        }, t.shift())
      }

      function N(e, t) {
        return "object" != typeof e || Bt.isArray(e) || null === e ? e : (t = t || [], Object.keys(e).reduce(function (r, i) {
          return r[-1 === t.indexOf(i) ? U(i) : i] = N(e[i]), r
        }, {}))
      }

      function z(e, t) {
        return "object" != typeof e || Bt.isArray(e) || null === e ? e : (t = t || [], Object.keys(e).reduce(function (r, i) {
          return r[-1 === t.indexOf(i) ? L(i) : i] = z(e[i]), r
        }, {}))
      }

      function H(e) {
        var t = e.match(/^(https?:)\/\/(([^:\/?#]*)(?::([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        return t && {
            href: e,
            protocol: t[1],
            host: t[2],
            hostname: t[3],
            port: t[4],
            pathname: t[5],
            search: t[6],
            hash: t[7]
          }
      }

      function F(e) {
        if (e) {
          var t = H(e), r = t.protocol + "//" + t.hostname;
          return t.port && (r += ":" + t.port), r
        }
      }

      function K(e) {
        W().location = e
      }

      function V() {
        return W().document
      }

      function W() {
        return window
      }

      function Y() {
        var e = W().location, t = e.origin;
        return t || (t = Rt.getOriginFromUrl(e.href)), t
      }

      function X() {
      }

      function J() {
      }

      function Z(e) {
        this.disableWarnings = e.disableWarnings
      }

      function G() {
        this.warn = new Z({}), this.storage = new J;
        try {
          var e = jt.getWindow().localStorage;
          e && (this.storage = e)
        } catch (e) {
          this.warn.warning(e), this.warn.warning("Can't use localStorage. Using CookieStorage instead.")
        }
      }

      function $(e, t) {
        return {error: e, errorDescription: t}
      }

      function Q(e) {
        return $("invalid_token", e)
      }

      function ee(e, t) {
        return (t = t || {}).ignoreCasing = !!t.ignoreCasing && t.ignoreCasing, function (r, i) {
          var n;
          return r || i ? (!r && i.err && (r = i.err, i = null), !r && i.error && (r = i, i = null), r ? (n = {original: r}, r.response && r.response.statusCode && (n.statusCode = r.response.statusCode), r.response && r.response.statusText && (n.statusText = r.response.statusText), r.response && r.response.body && (r = r.response.body), r.err && (r = r.err), n.code = r.error || r.code || r.error_code || r.status || null, n.description = r.errorDescription || r.error_description || r.description || r.error || r.details || r.err || null, t.forceLegacyError && (n.error = n.code, n.error_description = n.description), r.name && (n.name = r.name), r.policy && (n.policy = r.policy), e(n)) : !i.type || "text/html" !== i.type && "text/plain" !== i.type ? t.ignoreCasing ? e(null, i.body || i) : e(null, Rt.toCamelCase(i.body || i)) : e(null, i.text)) : e(Nt.buildResponse("generic_error", "Something went wrong"))
        }
      }

      function te(e, t) {
        var r = Rt.getKeysNotIn(t, Ht);
        return r.length > 0 && e.warning("Following parameters are not allowed on the `/authorize` endpoint: [" + r.join(",") + "]"), t
      }

      function re(e, t) {
        return Rt.pick(t, zt)
      }

      function ie(e, t) {
        if (this.n = null, this.e = 0, !(null != e && null != t && e.length > 0 && t.length > 0))throw new Error("Invalid key data");
        this.n = new Jt(e, 16), this.e = parseInt(t, 16)
      }

      function ne(e) {
        for (var t in Zt) {
          var r = Zt[t], i = r.length;
          if (e.substring(0, i) === r)return {alg: t, hash: e.substring(i)}
        }
        return []
      }

      function oe(e) {
        var t = e.length % 4;
        return 0 === t ? e : e + new Array(4 - t + 1).join("=")
      }

      function se(e) {
        for (var t = "", r = 0; r < e.length; r++)t += String.fromCharCode(e[r]);
        return t
      }

      function ae(e) {
        for (var t = new Array(e.length), r = 0; r < e.length; r++)t[r] = e.charCodeAt(r);
        return t
      }

      function fe(e) {
        for (var t = "", r = 0; r < e.length; r++) {
          var i = e[r].toString(16);
          t += 2 === i.length ? i : "0" + i
        }
        return t
      }

      function ce(e) {
        return Tt.fromByteArray(ae(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
          return String.fromCharCode("0x" + t)
        }))).replace(/\+/g, "-").replace(/\//g, "_")
      }

      function he(e) {
        return e = oe(e).replace(/\-/g, "+").replace(/_/g, "/"), decodeURIComponent(se(Tt.toByteArray(e)).split("").map(function (e) {
          return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
      }

      function ue(e) {
        return fe(Tt.toByteArray(oe(e)))
      }

      function de(e) {
        var t = {"+": "-", "/": "_", "=": ""};
        return e.replace(/[+\/=]/g, function (e) {
          return t[e]
        })
      }

      function le(e) {
        return {modulus: Qt.decodeToHEX(e.n), exp: Qt.decodeToHEX(e.e)}
      }

      function pe(e, t) {
        var r = e.jwksURI || Fe(e.iss, ".well-known", "jwks.json");
        return mt.get(r).end(function (r, i) {
          var n, o, s = null;
          if (r)return t(r);
          for (n = 0; n < i.body.keys.length && null === s; n++)(o = i.body.keys[n]).kid === e.kid && (s = o);
          return t(null, le(s))
        })
      }

      function be(e) {
        this.name = "ConfigurationError", this.message = e || ""
      }

      function ye(e) {
        this.name = "TokenValidationError", this.message = e || ""
      }

      function me() {
      }

      function ge(e) {
        var t = e || {};
        if (this.jwksCache = t.jwksCache || new rr, this.expectedAlg = t.expectedAlg || "RS256", this.issuer = t.issuer, this.audience = t.audience, this.leeway = t.leeway || 0, this.__disableExpirationCheck = t.__disableExpirationCheck || !1, this.jwksURI = t.jwksURI, this.leeway < 0 || this.leeway > 60)throw new tr.ConfigurationError("The leeway should be positive and lower than a minute.");
        if (-1 === ir.indexOf(this.expectedAlg))throw new tr.ConfigurationError("Algorithm " + this.expectedAlg + " is not supported. (Expected algs: [" + ir.join(",") + "])")
      }

      function ve(e, t) {
        this.plugins = t;
        for (var r = 0; r < this.plugins.length; r++) {
          if (this.plugins[r].version !== It.raw) {
            var i = "";
            throw this.plugins[r].constructor && this.plugins[r].constructor.name && (i = this.plugins[r].constructor.name), new Error("Plugin " + i + " version (" + this.plugins[r].version + ") is not compatible with the SDK version (" + It.raw + ")")
          }
          this.plugins[r].setWebAuth(e)
        }
      }

      function we(e) {
        var t = new Uint8Array(e), r = [], i = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~", n = jt.getWindow().crypto || jt.getWindow().msCrypto;
        if (!n)return null;
        for (var o = n.getRandomValues(t), s = 0; s < o.length; s++)r.push(i[o[s] % i.length]);
        return r.join("")
      }

      function _e(e) {
        e = e || {}, this.namespace = e.namespace || sr, this.keyLength = e.keyLength || 32
      }

      function Se(e) {
        if (this.url = e.url, this.callback = e.callback, this.timeout = e.timeout || 6e4, this.timeoutCallback = e.timeoutCallback || null, this.eventListenerType = e.eventListenerType || "message", this.iframe = null, this.timeoutHandle = null, this._destroyTimeout = null, this.transientMessageEventListener = null, this.proxyEventListener = null, this.eventValidator = e.eventValidator || {
              isValid: function () {
                return !0
              }
            }, "function" != typeof this.callback)throw new Error("options.callback must be a function")
      }

      function ke(e, t, r) {
        new Se({
          url: e, eventListenerType: "message", callback: function (e) {
            r(null, e)
          }, timeout: t.timeout, eventValidator: {
            isValid: function (e) {
              return "authorization_response" === e.event.data.type && t.state === e.event.data.response.state
            }
          }, timeoutCallback: function () {
            r({
              error: "timeout",
              error_description: "Timeout during executing web_message communication",
              state: t.state
            })
          }
        }).init()
      }

      function Ee(e) {
        this.webAuth = e, this.warn = new Z(e.baseOptions)
      }

      function Me(e, t) {
        this.webAuth = e, this.baseOptions = t, this.request = new k(t), this.webMessageHandler = new Ee(e)
      }

      function Ae(e) {
        var t = ("&" + jt.getWindow().location.hash.substring(1)).split("&" + e + "=");
        if (2 === t.length)return t.pop().split("&").shift()
      }

      function Te(e, t) {
        return ["co/verifier", encodeURIComponent(e), encodeURIComponent(t)].join("/")
      }

      function xe(e, t) {
        try {
          var r = Ut.getItem(t);
          return Ut.removeItem(t), r || ""
        } catch (e) {
          return ""
        }
      }

      function Ie(e, t) {
        this.webAuth = e, this.baseOptions = t, this.crossOriginAuthentication = new Me(e, this.baseOptions), this.warn = new Z({disableWarnings: !!t._disableDeprecationWarnings})
      }

      function Oe(e) {
        /^https?:\/\//.test(e) || (e = window.location.href);
        var t = /^(https?:\/\/[-_a-zA-Z.0-9:]+)/.exec(e);
        return t ? t[1] : e
      }

      function Be() {
        this._current_popup = null
      }

      function Ce(e, t) {
        this.baseOptions = t, this.baseOptions.popupOrigin = t.popupOrigin, this.client = e.client, this.webAuth = e, this.transactionManager = new _e(this.baseOptions.transaction), this.crossOriginAuthentication = new Me(e, this.baseOptions), this.warn = new Z({disableWarnings: !!t._disableDeprecationWarnings})
      }

      function Re(e) {
        this.authenticationUrl = e.authenticationUrl, this.timeout = e.timeout || 6e4, this.handler = null, this.postMessageDataType = e.postMessageDataType || !1, this.postMessageOrigin = e.postMessageOrigin || jt.getWindow().location.origin || jt.getWindow().location.protocol + "//" + jt.getWindow().location.hostname + (jt.getWindow().location.port ? ":" + jt.getWindow().location.port : "")
      }

      function je(e) {
        this.baseOptions = e, this.request = new k(e), this.transactionManager = new _e(this.baseOptions.transaction)
      }

      function De(e, t) {
        this.baseOptions = t, this.client = e, this.request = new k(this.baseOptions), this.warn = new Z({disableWarnings: !!t._disableDeprecationWarnings})
      }

      function Pe(e) {
        Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          domain: {
            type: "string",
            message: "domain option is required"
          },
          clientID: {type: "string", message: "clientID option is required"},
          responseType: {optional: !0, type: "string", message: "responseType is not valid"},
          responseMode: {optional: !0, type: "string", message: "responseMode is not valid"},
          redirectUri: {optional: !0, type: "string", message: "redirectUri is not valid"},
          scope: {optional: !0, type: "string", message: "scope is not valid"},
          audience: {optional: !0, type: "string", message: "audience is not valid"},
          popupOrigin: {optional: !0, type: "string", message: "popupOrigin is not valid"},
          leeway: {optional: !0, type: "number", message: "leeway is not valid"},
          plugins: {optional: !0, type: "array", message: "plugins is not valid"},
          _disableDeprecationWarnings: {
            optional: !0,
            type: "boolean",
            message: "_disableDeprecationWarnings option is not valid"
          },
          _sendTelemetry: {optional: !0, type: "boolean", message: "_sendTelemetry option is not valid"},
          _telemetryInfo: {optional: !0, type: "object", message: "_telemetryInfo option is not valid"},
          _timesToRetryFailedRequests: {
            optional: !0,
            type: "number",
            message: "_timesToRetryFailedRequests option is not valid"
          }
        }), e.overrides && Bt.check(e.overrides, {
          type: "object",
          message: "overrides option is not valid"
        }, {
          __tenant: {optional: !0, type: "string", message: "__tenant option is required"},
          __token_issuer: {optional: !0, type: "string", message: "__token_issuer option is required"},
          __jwks_uri: {optional: !0, type: "string", message: "__jwks_uri is required"}
        }), this.baseOptions = e, this.baseOptions.plugins = new ve(this, this.baseOptions.plugins || []), this.baseOptions._sendTelemetry = !1 !== this.baseOptions._sendTelemetry || this.baseOptions._sendTelemetry, this.baseOptions._timesToRetryFailedRequests = e._timesToRetryFailedRequests ? parseInt(e._timesToRetryFailedRequests, 0) : 0, this.baseOptions.tenant = this.baseOptions.overrides && this.baseOptions.overrides.__tenant || this.baseOptions.domain.split(".")[0], this.baseOptions.token_issuer = this.baseOptions.overrides && this.baseOptions.overrides.__token_issuer || "https://" + this.baseOptions.domain + "/", this.baseOptions.jwksURI = this.baseOptions.overrides && this.baseOptions.overrides.__jwks_uri, this.transactionManager = new _e(this.baseOptions.transaction), this.client = new Ne(this.baseOptions), this.redirect = new Ie(this, this.baseOptions), this.popup = new Ce(this, this.baseOptions), this.crossOriginAuthentication = new Me(this, this.baseOptions), this.webMessageHandler = new Ee(this), this._universalLogin = new De(this, this.baseOptions)
      }

      function qe(e, t, r) {
        return {
          accessToken: e.access_token || null,
          idToken: e.id_token || null,
          idTokenPayload: r || null,
          appState: t || null,
          refreshToken: e.refresh_token || null,
          state: e.state || null,
          expiresIn: e.expires_in ? parseInt(e.expires_in, 10) : null,
          tokenType: e.token_type || null,
          scope: e.scope || null
        }
      }

      function Ue(e, t) {
        this.baseOptions = t, this.request = e
      }

      function Le(e, t) {
        this.baseOptions = t, this.request = e
      }

      function Ne(e, t) {
        2 === arguments.length ? this.auth0 = e : t = e, Bt.check(t, {
          type: "object",
          message: "options parameter is not valid"
        }, {
          domain: {type: "string", message: "domain option is required"},
          clientID: {type: "string", message: "clientID option is required"},
          responseType: {optional: !0, type: "string", message: "responseType is not valid"},
          responseMode: {optional: !0, type: "string", message: "responseMode is not valid"},
          redirectUri: {optional: !0, type: "string", message: "redirectUri is not valid"},
          scope: {optional: !0, type: "string", message: "scope is not valid"},
          audience: {optional: !0, type: "string", message: "audience is not valid"},
          _disableDeprecationWarnings: {
            optional: !0,
            type: "boolean",
            message: "_disableDeprecationWarnings option is not valid"
          },
          _sendTelemetry: {optional: !0, type: "boolean", message: "_sendTelemetry option is not valid"},
          _telemetryInfo: {optional: !0, type: "object", message: "_telemetryInfo option is not valid"}
        }), this.baseOptions = t, this.baseOptions._sendTelemetry = !1 !== this.baseOptions._sendTelemetry || this.baseOptions._sendTelemetry, this.baseOptions.rootUrl = "https://" + this.baseOptions.domain, this.request = new k(this.baseOptions), this.passwordless = new Ue(this.request, this.baseOptions), this.dbConnection = new Le(this.request, this.baseOptions), this.warn = new Z({disableWarnings: !!t._disableDeprecationWarnings})
      }

      function ze(e) {
        Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          domain: {
            type: "string",
            message: "domain option is required"
          },
          token: {type: "string", message: "token option is required"},
          _sendTelemetry: {optional: !0, type: "boolean", message: "_sendTelemetry option is not valid"},
          _telemetryInfo: {optional: !0, type: "object", message: "_telemetryInfo option is not valid"}
        }), this.baseOptions = e, this.baseOptions.headers = {Authorization: "Bearer " + this.baseOptions.token}, this.request = new k(this.baseOptions), this.baseOptions.rootUrl = Fe("https://" + this.baseOptions.domain, "api", "v2")
      }

      r.d(t, "Authentication", function () {
        return Ne
      }), r.d(t, "Management", function () {
        return ze
      }), r.d(t, "WebAuth", function () {
        return Pe
      }), r.d(t, "version", function () {
        return It
      });
      var He = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}, Fe = i(function (e) {
        var t, r;
        t = He, r = function () {
          return function () {
            var e = arguments;
            return "object" == typeof arguments[0] && (e = arguments[0], arguments[1]), [].slice.call(e, 0).join("/").replace(/:\//g, "://").replace(/([^:\s])\/+/g, "$1/").replace(/\/(\?|&|#[^!])/g, "$1").replace(/(\?.+)\?/g, "$1&")
          }
        }, e.exports ? e.exports = r() : t.urljoin = r()
      }), Ke = i(function (e, t) {
        var r = Object.prototype.hasOwnProperty, i = function () {
          for (var e = [], t = 0; t < 256; ++t)e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
          return e
        }();
        t.arrayToObject = function (e, t) {
          for (var r = t && t.plainObjects ? Object.create(null) : {}, i = 0; i < e.length; ++i)void 0 !== e[i] && (r[i] = e[i]);
          return r
        }, t.merge = function (e, i, n) {
          if (!i)return e;
          if ("object" != typeof i) {
            if (Array.isArray(e))e.push(i); else {
              if ("object" != typeof e)return [e, i];
              (n.plainObjects || n.allowPrototypes || !r.call(Object.prototype, i)) && (e[i] = !0)
            }
            return e
          }
          if ("object" != typeof e)return [e].concat(i);
          var o = e;
          return Array.isArray(e) && !Array.isArray(i) && (o = t.arrayToObject(e, n)), Array.isArray(e) && Array.isArray(i) ? (i.forEach(function (i, o) {
            r.call(e, o) ? e[o] && "object" == typeof e[o] ? e[o] = t.merge(e[o], i, n) : e.push(i) : e[o] = i
          }), e) : Object.keys(i).reduce(function (e, r) {
            var o = i[r];
            return Object.prototype.hasOwnProperty.call(e, r) ? e[r] = t.merge(e[r], o, n) : e[r] = o, e
          }, o)
        }, t.decode = function (e) {
          try {
            return decodeURIComponent(e.replace(/\+/g, " "))
          } catch (t) {
            return e
          }
        }, t.encode = function (e) {
          if (0 === e.length)return e;
          for (var t = "string" == typeof e ? e : String(e), r = "", n = 0; n < t.length; ++n) {
            var o = t.charCodeAt(n);
            45 === o || 46 === o || 95 === o || 126 === o || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 ? r += t.charAt(n) : o < 128 ? r += i[o] : o < 2048 ? r += i[192 | o >> 6] + i[128 | 63 & o] : o < 55296 || o >= 57344 ? r += i[224 | o >> 12] + i[128 | o >> 6 & 63] + i[128 | 63 & o] : (n += 1, o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(n)), r += i[240 | o >> 18] + i[128 | o >> 12 & 63] + i[128 | o >> 6 & 63] + i[128 | 63 & o])
          }
          return r
        }, t.compact = function (e, r) {
          if ("object" != typeof e || null === e)return e;
          var i = r || [], n = i.indexOf(e);
          if (-1 !== n)return i[n];
          if (i.push(e), Array.isArray(e)) {
            for (var o = [], s = 0; s < e.length; ++s)e[s] && "object" == typeof e[s] ? o.push(t.compact(e[s], i)) : void 0 !== e[s] && o.push(e[s]);
            return o
          }
          return Object.keys(e).forEach(function (r) {
            e[r] = t.compact(e[r], i)
          }), e
        }, t.isRegExp = function (e) {
          return "[object RegExp]" === Object.prototype.toString.call(e)
        }, t.isBuffer = function (e) {
          return null != e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
        }
      }), Ve = (Ke.arrayToObject, Ke.merge, Ke.decode, Ke.encode, Ke.compact, Ke.isRegExp, Ke.isBuffer, String.prototype.replace), We = /%20/g, Ye = {
        default: "RFC3986",
        formatters: {
          RFC1738: function (e) {
            return Ve.call(e, We, "+")
          }, RFC3986: function (e) {
            return e
          }
        },
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      }, Xe = {
        brackets: function (e) {
          return e + "[]"
        }, indices: function (e, t) {
          return e + "[" + t + "]"
        }, repeat: function (e) {
          return e
        }
      }, Je = Date.prototype.toISOString, Ze = {
        delimiter: "&",
        encode: !0,
        encoder: Ke.encode,
        encodeValuesOnly: !1,
        serializeDate: function (e) {
          return Je.call(e)
        },
        skipNulls: !1,
        strictNullHandling: !1
      }, Ge = function e(t, r, i, n, o, s, a, f, c, h, u, d) {
        var l = t;
        if ("function" == typeof a)l = a(r, l); else if (l instanceof Date)l = h(l); else if (null === l) {
          if (n)return s && !d ? s(r) : r;
          l = ""
        }
        if ("string" == typeof l || "number" == typeof l || "boolean" == typeof l || Ke.isBuffer(l))return s ? [u(d ? r : s(r)) + "=" + u(s(l))] : [u(r) + "=" + u(String(l))];
        var p, b = [];
        if (void 0 === l)return b;
        if (Array.isArray(a))p = a; else {
          var y = Object.keys(l);
          p = f ? y.sort(f) : y
        }
        for (var m = 0; m < p.length; ++m) {
          var g = p[m];
          o && null === l[g] || (b = Array.isArray(l) ? b.concat(e(l[g], i(r, g), i, n, o, s, a, f, c, h, u, d)) : b.concat(e(l[g], r + (c ? "." + g : "[" + g + "]"), i, n, o, s, a, f, c, h, u, d)))
        }
        return b
      }, $e = function (e, t) {
        var r = e, i = t || {};
        if (null !== i.encoder && void 0 !== i.encoder && "function" != typeof i.encoder)throw new TypeError("Encoder has to be a function.");
        var n = void 0 === i.delimiter ? Ze.delimiter : i.delimiter, o = "boolean" == typeof i.strictNullHandling ? i.strictNullHandling : Ze.strictNullHandling, s = "boolean" == typeof i.skipNulls ? i.skipNulls : Ze.skipNulls, a = "boolean" == typeof i.encode ? i.encode : Ze.encode, f = "function" == typeof i.encoder ? i.encoder : Ze.encoder, c = "function" == typeof i.sort ? i.sort : null, h = void 0 !== i.allowDots && i.allowDots, u = "function" == typeof i.serializeDate ? i.serializeDate : Ze.serializeDate, d = "boolean" == typeof i.encodeValuesOnly ? i.encodeValuesOnly : Ze.encodeValuesOnly;
        if (void 0 === i.format)i.format = Ye.default; else if (!Object.prototype.hasOwnProperty.call(Ye.formatters, i.format))throw new TypeError("Unknown format option provided.");
        var l, p, b = Ye.formatters[i.format];
        "function" == typeof i.filter ? r = (p = i.filter)("", r) : Array.isArray(i.filter) && (l = p = i.filter);
        var y, m = [];
        if ("object" != typeof r || null === r)return "";
        y = i.arrayFormat in Xe ? i.arrayFormat : "indices" in i ? i.indices ? "indices" : "repeat" : "indices";
        var g = Xe[y];
        l || (l = Object.keys(r)), c && l.sort(c);
        for (var v = 0; v < l.length; ++v) {
          var w = l[v];
          s && null === r[w] || (m = m.concat(Ge(r[w], w, g, o, s, a ? f : null, p, c, h, u, b, d)))
        }
        return m.join(n)
      }, Qe = Object.prototype.hasOwnProperty, et = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        decoder: Ke.decode,
        delimiter: "&",
        depth: 5,
        parameterLimit: 1e3,
        plainObjects: !1,
        strictNullHandling: !1
      }, tt = function (e, t) {
        for (var r = {}, i = e.split(t.delimiter, t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit), n = 0; n < i.length; ++n) {
          var o, s, a = i[n], f = -1 === a.indexOf("]=") ? a.indexOf("=") : a.indexOf("]=") + 1;
          -1 === f ? (o = t.decoder(a), s = t.strictNullHandling ? null : "") : (o = t.decoder(a.slice(0, f)), s = t.decoder(a.slice(f + 1))), Qe.call(r, o) ? r[o] = [].concat(r[o]).concat(s) : r[o] = s
        }
        return r
      }, rt = function (e, t, r) {
        if (!e.length)return t;
        var i, n = e.shift();
        if ("[]" === n)i = (i = []).concat(rt(e, t, r)); else {
          i = r.plainObjects ? Object.create(null) : {};
          var o = "[" === n.charAt(0) && "]" === n.charAt(n.length - 1) ? n.slice(1, -1) : n, s = parseInt(o, 10);
          !isNaN(s) && n !== o && String(s) === o && s >= 0 && r.parseArrays && s <= r.arrayLimit ? (i = [])[s] = rt(e, t, r) : i[o] = rt(e, t, r)
        }
        return i
      }, it = function (e, t, r) {
        if (e) {
          var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, n = /(\[[^[\]]*])/g, o = /(\[[^[\]]*])/.exec(i), s = o ? i.slice(0, o.index) : i, a = [];
          if (s) {
            if (!r.plainObjects && Qe.call(Object.prototype, s) && !r.allowPrototypes)return;
            a.push(s)
          }
          for (var f = 0; null !== (o = n.exec(i)) && f < r.depth;) {
            if (f += 1, !r.plainObjects && Qe.call(Object.prototype, o[1].slice(1, -1)) && !r.allowPrototypes)return;
            a.push(o[1])
          }
          return o && a.push("[" + i.slice(o.index) + "]"), rt(a, t, r)
        }
      }, nt = function (e, t) {
        var r = t || {};
        if (null !== r.decoder && void 0 !== r.decoder && "function" != typeof r.decoder)throw new TypeError("Decoder has to be a function.");
        if (r.delimiter = "string" == typeof r.delimiter || Ke.isRegExp(r.delimiter) ? r.delimiter : et.delimiter, r.depth = "number" == typeof r.depth ? r.depth : et.depth, r.arrayLimit = "number" == typeof r.arrayLimit ? r.arrayLimit : et.arrayLimit, r.parseArrays = !1 !== r.parseArrays, r.decoder = "function" == typeof r.decoder ? r.decoder : et.decoder, r.allowDots = "boolean" == typeof r.allowDots ? r.allowDots : et.allowDots, r.plainObjects = "boolean" == typeof r.plainObjects ? r.plainObjects : et.plainObjects, r.allowPrototypes = "boolean" == typeof r.allowPrototypes ? r.allowPrototypes : et.allowPrototypes, r.parameterLimit = "number" == typeof r.parameterLimit ? r.parameterLimit : et.parameterLimit, r.strictNullHandling = "boolean" == typeof r.strictNullHandling ? r.strictNullHandling : et.strictNullHandling, "" === e || null == e)return r.plainObjects ? Object.create(null) : {};
        for (var i = "string" == typeof e ? tt(e, r) : e, n = r.plainObjects ? Object.create(null) : {}, o = Object.keys(i), s = 0; s < o.length; ++s) {
          var a = o[s], f = it(a, i[a], r);
          n = Ke.merge(n, f, r)
        }
        return Ke.compact(n)
      }, ot = {formats: Ye, parse: nt, stringify: $e}, st = i(function (e) {
        function t(e) {
          if (e)return function (e) {
            for (var r in t.prototype)e[r] = t.prototype[r];
            return e
          }(e)
        }

        e.exports = t, t.prototype.on = t.prototype.addEventListener = function (e, t) {
          return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
        }, t.prototype.once = function (e, t) {
          function r() {
            this.off(e, r), t.apply(this, arguments)
          }

          return r.fn = t, this.on(e, r), this
        }, t.prototype.off = t.prototype.removeListener = t.prototype.removeAllListeners = t.prototype.removeEventListener = function (e, t) {
          if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
          var r, i = this._callbacks["$" + e];
          if (!i)return this;
          if (1 == arguments.length)return delete this._callbacks["$" + e], this;
          for (var n = 0; n < i.length; n++)if ((r = i[n]) === t || r.fn === t) {
            i.splice(n, 1);
            break
          }
          return this
        }, t.prototype.emit = function (e) {
          this._callbacks = this._callbacks || {};
          var t = [].slice.call(arguments, 1), r = this._callbacks["$" + e];
          if (r)for (var i = 0, n = (r = r.slice(0)).length; i < n; ++i)r[i].apply(this, t);
          return this
        }, t.prototype.listeners = function (e) {
          return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
        }, t.prototype.hasListeners = function (e) {
          return !!this.listeners(e).length
        }
      }), at = n, ft = o;
      o.prototype.clearTimeout = function () {
        return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this
      }, o.prototype.parse = function (e) {
        return this._parser = e, this
      }, o.prototype.responseType = function (e) {
        return this._responseType = e, this
      }, o.prototype.serialize = function (e) {
        return this._serializer = e, this
      }, o.prototype.timeout = function (e) {
        if (!e || "object" != typeof e)return this._timeout = e, this._responseTimeout = 0, this;
        for (var t in e)switch (t) {
          case"deadline":
            this._timeout = e.deadline;
            break;
          case"response":
            this._responseTimeout = e.response;
            break;
          default:
            console.warn("Unknown timeout option", t)
        }
        return this
      }, o.prototype.retry = function (e, t) {
        return 0 !== arguments.length && !0 !== e || (e = 1), e <= 0 && (e = 0), this._maxRetries = e, this._retries = 0, this._retryCallback = t, this
      };
      var ct = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
      o.prototype._shouldRetry = function (e, t) {
        if (!this._maxRetries || this._retries++ >= this._maxRetries)return !1;
        if (this._retryCallback)try {
          var r = this._retryCallback(e, t);
          if (!0 === r)return !0;
          if (!1 === r)return !1
        } catch (e) {
          console.error(e)
        }
        if (t && t.status && t.status >= 500 && 501 != t.status)return !0;
        if (e) {
          if (e.code && ~ct.indexOf(e.code))return !0;
          if (e.timeout && "ECONNABORTED" == e.code)return !0;
          if (e.crossDomain)return !0
        }
        return !1
      }, o.prototype._retry = function () {
        return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end()
      }, o.prototype.then = function (e, t) {
        if (!this._fullfilledPromise) {
          var r = this;
          this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function (e, t) {
            r.end(function (r, i) {
              r ? t(r) : e(i)
            })
          })
        }
        return this._fullfilledPromise.then(e, t)
      }, o.prototype.catch = function (e) {
        return this.then(void 0, e)
      }, o.prototype.use = function (e) {
        return e(this), this
      }, o.prototype.ok = function (e) {
        if ("function" != typeof e)throw Error("Callback required");
        return this._okCallback = e, this
      }, o.prototype._isResponseOK = function (e) {
        return !!e && (this._okCallback ? this._okCallback(e) : e.status >= 200 && e.status < 300)
      }, o.prototype.get = function (e) {
        return this._header[e.toLowerCase()]
      }, o.prototype.getHeader = o.prototype.get, o.prototype.set = function (e, t) {
        if (at(e)) {
          for (var r in e)this.set(r, e[r]);
          return this
        }
        return this._header[e.toLowerCase()] = t, this.header[e] = t, this
      }, o.prototype.unset = function (e) {
        return delete this._header[e.toLowerCase()], delete this.header[e], this
      }, o.prototype.field = function (e, t) {
        if (null == e)throw new Error(".field(name, val) name can not be empty");
        if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), at(e)) {
          for (var r in e)this.field(r, e[r]);
          return this
        }
        if (Array.isArray(t)) {
          for (var i in t)this.field(e, t[i]);
          return this
        }
        if (null == t)throw new Error(".field(name, val) val can not be empty");
        return "boolean" == typeof t && (t = "" + t), this._getFormData().append(e, t), this
      }, o.prototype.abort = function () {
        return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this)
      }, o.prototype._auth = function (e, t, r, i) {
        switch (r.type) {
          case"basic":
            this.set("Authorization", "Basic " + i(e + ":" + t));
            break;
          case"auto":
            this.username = e, this.password = t;
            break;
          case"bearer":
            this.set("Authorization", "Bearer " + e)
        }
        return this
      }, o.prototype.withCredentials = function (e) {
        return null == e && (e = !0), this._withCredentials = e, this
      }, o.prototype.redirects = function (e) {
        return this._maxRedirects = e, this
      }, o.prototype.maxResponseSize = function (e) {
        if ("number" != typeof e)throw TypeError("Invalid argument");
        return this._maxResponseSize = e, this
      }, o.prototype.toJSON = function () {
        return {method: this.method, url: this.url, data: this._data, headers: this._header}
      }, o.prototype.send = function (e) {
        var t = at(e), r = this._header["content-type"];
        if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), t && !this._data)Array.isArray(e) ? this._data = [] : this._isHost(e) || (this._data = {}); else if (e && this._data && this._isHost(this._data))throw Error("Can't merge these send calls");
        if (t && at(this._data))for (var i in e)this._data[i] = e[i]; else"string" == typeof e ? (r || this.type("form"), r = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == r ? this._data ? this._data + "&" + e : e : (this._data || "") + e) : this._data = e;
        return !t || this._isHost(e) ? this : (r || this.type("json"), this)
      }, o.prototype.sortQuery = function (e) {
        return this._sort = void 0 === e || e, this
      }, o.prototype._finalizeQueryString = function () {
        var e = this._query.join("&");
        if (e && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + e), this._query.length = 0, this._sort) {
          var t = this.url.indexOf("?");
          if (t >= 0) {
            var r = this.url.substring(t + 1).split("&");
            "function" == typeof this._sort ? r.sort(this._sort) : r.sort(), this.url = this.url.substring(0, t) + "?" + r.join("&")
          }
        }
      }, o.prototype._appendQueryString = function () {
        console.trace("Unsupported")
      }, o.prototype._timeoutError = function (e, t, r) {
        if (!this._aborted) {
          var i = new Error(e + t + "ms exceeded");
          i.timeout = t, i.code = "ECONNABORTED", i.errno = r, this.timedout = !0, this.abort(), this.callback(i)
        }
      }, o.prototype._setTimeouts = function () {
        var e = this;
        this._timeout && !this._timer && (this._timer = setTimeout(function () {
          e._timeoutError("Timeout of ", e._timeout, "ETIME")
        }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function () {
          e._timeoutError("Response timeout of ", e._responseTimeout, "ETIMEDOUT")
        }, this._responseTimeout))
      };
      var ht = function (e) {
        return e.split(/ *; */).shift()
      }, ut = function (e) {
        return e.split(/ *; */).reduce(function (e, t) {
          var r = t.split(/ *= */), i = r.shift(), n = r.shift();
          return i && n && (e[i] = n), e
        }, {})
      }, dt = function (e) {
        return e.split(/ *, */).reduce(function (e, t) {
          var r = t.split(/ *; */), i = r[0].slice(1, -1);
          return e[r[1].split(/ *= */)[1].slice(1, -1)] = i, e
        }, {})
      }, lt = function (e, t) {
        return delete e["content-type"], delete e["content-length"], delete e["transfer-encoding"], delete e.host, t && (delete e.authorization, delete e.cookie), e
      }, pt = {type: ht, params: ut, parseLinks: dt, cleanHeader: lt}, bt = a;
      a.prototype.get = function (e) {
        return this.header[e.toLowerCase()]
      }, a.prototype._setHeaderProperties = function (e) {
        var t = e["content-type"] || "";
        this.type = pt.type(t);
        var r = pt.params(t);
        for (var i in r)this[i] = r[i];
        this.links = {};
        try {
          e.link && (this.links = pt.parseLinks(e.link))
        } catch (e) {
        }
      }, a.prototype._setStatusProperties = function (e) {
        var t = e / 100 | 0;
        this.status = this.statusCode = e, this.statusType = t, this.info = 1 == t, this.ok = 2 == t, this.redirect = 3 == t, this.clientError = 4 == t, this.serverError = 5 == t, this.error = (4 == t || 5 == t) && this.toError(), this.accepted = 202 == e, this.noContent = 204 == e, this.badRequest = 400 == e, this.unauthorized = 401 == e, this.notAcceptable = 406 == e, this.forbidden = 403 == e, this.notFound = 404 == e
      }, ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function (e) {
        c.prototype[e] = function () {
          return this._defaults.push({fn: e, arguments: arguments}), this
        }
      }), c.prototype._setDefaults = function (e) {
        this._defaults.forEach(function (t) {
          e[t.fn].apply(e, t.arguments)
        })
      };
      for (var yt = c, mt = i(function (e, t) {
        function r() {
        }

        function i(e) {
          if (!at(e))return e;
          var t = [];
          for (var r in e)n(t, r, e[r]);
          return t.join("&")
        }

        function n(e, t, r) {
          if (null != r)if (Array.isArray(r))r.forEach(function (r) {
            n(e, t, r)
          }); else if (at(r))for (var i in r)n(e, t + "[" + i + "]", r[i]); else e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r)); else null === r && e.push(encodeURIComponent(t))
        }

        function o(e) {
          for (var t, r, i = {}, n = e.split("&"), o = 0, s = n.length; o < s; ++o)-1 == (r = (t = n[o]).indexOf("=")) ? i[decodeURIComponent(t)] = "" : i[decodeURIComponent(t.slice(0, r))] = decodeURIComponent(t.slice(r + 1));
          return i
        }

        function s(e) {
          return /[\/+]json($|[^-\w])/.test(e)
        }

        function a(e) {
          this.req = e, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
          var t = this.xhr.status;
          1223 === t && (t = 204), this._setStatusProperties(t), this.header = this.headers = function (e) {
            for (var t, r, i, n, o = e.split(/\r?\n/), s = {}, a = 0, f = o.length; a < f; ++a)-1 !== (t = (r = o[a]).indexOf(":")) && (i = r.slice(0, t).toLowerCase(), n = d(r.slice(t + 1)), s[i] = n);
            return s
          }(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && e._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null
        }

        function f(e, t) {
          var r = this;
          this._query = this._query || [], this.method = e, this.url = t, this.header = {}, this._header = {}, this.on("end", function () {
            var e, t = null, i = null;
            try {
              i = new a(r)
            } catch (e) {
              return (t = new Error("Parser is unable to parse the response")).parse = !0, t.original = e, r.xhr ? (t.rawResponse = void 0 === r.xhr.responseType ? r.xhr.responseText : r.xhr.response, t.status = r.xhr.status ? r.xhr.status : null, t.statusCode = t.status) : (t.rawResponse = null, t.status = null), r.callback(t)
            }
            r.emit("response", i);
            try {
              r._isResponseOK(i) || (e = new Error(i.statusText || "Unsuccessful HTTP response"))
            } catch (t) {
              e = t
            }
            e ? (e.original = t, e.response = i, e.status = i.status, r.callback(e, i)) : r.callback(null, i)
          })
        }

        function c(e, t, r) {
          var i = u("DELETE", e);
          return "function" == typeof t && (r = t, t = null), t && i.send(t), r && i.end(r), i
        }

        var h;
        "undefined" != typeof window ? h = window : "undefined" != typeof self ? h = self : (console.warn("Using browser-only version of superagent in non-browser environment"), h = He);
        var u = t = e.exports = function (e, r) {
          return "function" == typeof r ? new t.Request("GET", e).end(r) : 1 == arguments.length ? new t.Request("GET", e) : new t.Request(e, r)
        };
        t.Request = f, u.getXHR = function () {
          if (!(!h.XMLHttpRequest || h.location && "file:" == h.location.protocol && h.ActiveXObject))return new XMLHttpRequest;
          try {
            return new ActiveXObject("Microsoft.XMLHTTP")
          } catch (e) {
          }
          try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
          } catch (e) {
          }
          try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
          } catch (e) {
          }
          try {
            return new ActiveXObject("Msxml2.XMLHTTP")
          } catch (e) {
          }
          throw Error("Browser-only version of superagent could not find XHR")
        };
        var d = "".trim ? function (e) {
          return e.trim()
        } : function (e) {
          return e.replace(/(^\s*|\s*$)/g, "")
        };
        u.serializeObject = i, u.parseString = o, u.types = {
          html: "text/html",
          json: "application/json",
          xml: "text/xml",
          urlencoded: "application/x-www-form-urlencoded",
          form: "application/x-www-form-urlencoded",
          "form-data": "application/x-www-form-urlencoded"
        }, u.serialize = {
          "application/x-www-form-urlencoded": i,
          "application/json": JSON.stringify
        }, u.parse = {
          "application/x-www-form-urlencoded": o,
          "application/json": JSON.parse
        }, bt(a.prototype), a.prototype._parseBody = function (e) {
          var t = u.parse[this.type];
          return this.req._parser ? this.req._parser(this, e) : (!t && s(this.type) && (t = u.parse["application/json"]), t && e && (e.length || e instanceof Object) ? t(e) : null)
        }, a.prototype.toError = function () {
          var e = this.req, t = e.method, r = e.url, i = "cannot " + t + " " + r + " (" + this.status + ")", n = new Error(i);
          return n.status = this.status, n.method = t, n.url = r, n
        }, u.Response = a, st(f.prototype), ft(f.prototype), f.prototype.type = function (e) {
          return this.set("Content-Type", u.types[e] || e), this
        }, f.prototype.accept = function (e) {
          return this.set("Accept", u.types[e] || e), this
        }, f.prototype.auth = function (e, t, r) {
          return 1 === arguments.length && (t = ""), "object" == typeof t && null !== t && (r = t, t = ""), r || (r = {type: "function" == typeof btoa ? "basic" : "auto"}), this._auth(e, t, r, function (e) {
            if ("function" == typeof btoa)return btoa(e);
            throw new Error("Cannot use basic auth, btoa is not a function")
          })
        }, f.prototype.query = function (e) {
          return "string" != typeof e && (e = i(e)), e && this._query.push(e), this
        }, f.prototype.attach = function (e, t, r) {
          if (t) {
            if (this._data)throw Error("superagent can't mix .send() and .attach()");
            this._getFormData().append(e, t, r || t.name)
          }
          return this
        }, f.prototype._getFormData = function () {
          return this._formData || (this._formData = new h.FormData), this._formData
        }, f.prototype.callback = function (e, t) {
          if (this._shouldRetry(e, t))return this._retry();
          var r = this._callback;
          this.clearTimeout(), e && (this._maxRetries && (e.retries = this._retries - 1), this.emit("error", e)), r(e, t)
        }, f.prototype.crossDomainError = function () {
          var e = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
          e.crossDomain = !0, e.status = this.status, e.method = this.method, e.url = this.url, this.callback(e)
        }, f.prototype.buffer = f.prototype.ca = f.prototype.agent = function () {
          return console.warn("This is not supported in browser version of superagent"), this
        }, f.prototype.pipe = f.prototype.write = function () {
          throw Error("Streaming is not supported in browser version of superagent")
        }, f.prototype._isHost = function (e) {
          return e && "object" == typeof e && !Array.isArray(e) && "[object Object]" !== Object.prototype.toString.call(e)
        }, f.prototype.end = function (e) {
          return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = e || r, this._finalizeQueryString(), this._end()
        }, f.prototype._end = function () {
          var e = this, t = this.xhr = u.getXHR(), r = this._formData || this._data;
          this._setTimeouts(), t.onreadystatechange = function () {
            var r = t.readyState;
            if (r >= 2 && e._responseTimeoutTimer && clearTimeout(e._responseTimeoutTimer), 4 == r) {
              var i;
              try {
                i = t.status
              } catch (e) {
                i = 0
              }
              if (!i) {
                if (e.timedout || e._aborted)return;
                return e.crossDomainError()
              }
              e.emit("end")
            }
          };
          var i = function (t, r) {
            r.total > 0 && (r.percent = r.loaded / r.total * 100), r.direction = t, e.emit("progress", r)
          };
          if (this.hasListeners("progress"))try {
            t.onprogress = i.bind(null, "download"), t.upload && (t.upload.onprogress = i.bind(null, "upload"))
          } catch (e) {
          }
          try {
            this.username && this.password ? t.open(this.method, this.url, !0, this.username, this.password) : t.open(this.method, this.url, !0)
          } catch (e) {
            return this.callback(e)
          }
          if (this._withCredentials && (t.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof r && !this._isHost(r)) {
            var n = this._header["content-type"], o = this._serializer || u.serialize[n ? n.split(";")[0] : ""];
            !o && s(n) && (o = u.serialize["application/json"]), o && (r = o(r))
          }
          for (var a in this.header)null != this.header[a] && this.header.hasOwnProperty(a) && t.setRequestHeader(a, this.header[a]);
          return this._responseType && (t.responseType = this._responseType), this.emit("request", this), t.send(void 0 !== r ? r : null), this
        }, u.agent = function () {
          return new yt
        }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function (e) {
          yt.prototype[e.toLowerCase()] = function (t, r) {
            var i = new u.Request(e, t);
            return this._setDefaults(i), r && i.end(r), i
          }
        }), yt.prototype.del = yt.prototype.delete, u.get = function (e, t, r) {
          var i = u("GET", e);
          return "function" == typeof t && (r = t, t = null), t && i.query(t), r && i.end(r), i
        }, u.head = function (e, t, r) {
          var i = u("HEAD", e);
          return "function" == typeof t && (r = t, t = null), t && i.query(t), r && i.end(r), i
        }, u.options = function (e, t, r) {
          var i = u("OPTIONS", e);
          return "function" == typeof t && (r = t, t = null), t && i.send(t), r && i.end(r), i
        }, u.del = c, u.delete = c, u.patch = function (e, t, r) {
          var i = u("PATCH", e);
          return "function" == typeof t && (r = t, t = null), t && i.send(t), r && i.end(r), i
        }, u.post = function (e, t, r) {
          var i = u("POST", e);
          return "function" == typeof t && (r = t, t = null), t && i.send(t), r && i.end(r), i
        }, u.put = function (e, t, r) {
          var i = u("PUT", e);
          return "function" == typeof t && (r = t, t = null), t && i.send(t), r && i.end(r), i
        }
      }), gt = (mt.Request, u), vt = d, wt = b, _t = [], St = [], kt = "undefined" != typeof Uint8Array ? Uint8Array : Array, Et = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Mt = 0, At = Et.length; Mt < At; ++Mt)_t[Mt] = Et[Mt], St[Et.charCodeAt(Mt)] = Mt;
      St["-".charCodeAt(0)] = 62, St["_".charCodeAt(0)] = 63;
      var Tt = {byteLength: gt, toByteArray: vt, fromByteArray: wt}, xt = {encode: v, decode: w}, It = {raw: "9.7.3"};
      _.prototype.abort = function () {
        this.request.abort()
      }, _.prototype.getMethod = function () {
        return this.method
      }, _.prototype.getBody = function () {
        return this.body
      }, _.prototype.getUrl = function () {
        return this.url
      }, _.prototype.getHeaders = function () {
        return this.headers
      }, S.prototype.set = function (e, t) {
        return this.request = this.request.set(e, t), this
      }, S.prototype.send = function (e) {
        return this.request = this.request.send(e), this
      }, S.prototype.withCredentials = function () {
        return this.request = this.request.withCredentials(), this
      }, S.prototype.end = function (e) {
        return this.request = this.request.end(e), new _(this.request)
      }, k.prototype.setCommonConfiguration = function (e, t) {
        if (t = t || {}, this._timesToRetryFailedRequests > 0 && (e = e.retry(this._timesToRetryFailedRequests)), t.noHeaders)return e;
        var r = this.headers;
        e = e.set("Content-Type", "application/json");
        for (var i = Object.keys(this.headers), n = 0; n < i.length; n++)e = e.set(i[n], r[i[n]]);
        return this._sendTelemetry && (e = e.set("Auth0-Client", this.getTelemetryData())), e
      }, k.prototype.getTelemetryData = function () {
        var e = this._telemetryInfo || {name: "auth0.js", version: It.raw}, t = JSON.stringify(e);
        return xt.encode(t)
      }, k.prototype.get = function (e, t) {
        return new S(this.setCommonConfiguration(mt.get(e), t))
      }, k.prototype.post = function (e, t) {
        return new S(this.setCommonConfiguration(mt.post(e), t))
      }, k.prototype.patch = function (e, t) {
        return new S(this.setCommonConfiguration(mt.patch(e), t))
      };
      var Ot = Object.prototype.toString, Bt = {
        check: T,
        attribute: E,
        variable: M,
        value: A,
        isArray: x,
        supportsIsArray: I
      }, Ct = {get: O, objectAssignPolyfill: B}, Rt = {
        toSnakeCase: N,
        toCamelCase: z,
        blacklist: q,
        merge: P,
        pick: C,
        getKeysNotIn: R,
        extend: D,
        getOriginFromUrl: F,
        getLocationFromUrl: H
      }, jt = {redirect: K, getDocument: V, getWindow: W, getOrigin: Y};
      X.prototype.getItem = function () {
        return null
      }, X.prototype.removeItem = function () {
      }, X.prototype.setItem = function () {
      };
      var Dt, Pt = i(function (e, t) {
        !function (t) {
          if (e.exports = t(), !1) {
            var r = window.Cookies, i = window.Cookies = t();
            i.noConflict = function () {
              return window.Cookies = r, i
            }
          }
        }(function () {
          function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
              var r = arguments[e];
              for (var i in r)t[i] = r[i]
            }
            return t
          }

          return function t(r) {
            function i(t, n, o) {
              var s;
              if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                  if ("number" == typeof(o = e({path: "/"}, i.defaults, o)).expires) {
                    var a = new Date;
                    a.setMilliseconds(a.getMilliseconds() + 864e5 * o.expires), o.expires = a
                  }
                  o.expires = o.expires ? o.expires.toUTCString() : "";
                  try {
                    s = JSON.stringify(n), /^[\{\[]/.test(s) && (n = s)
                  } catch (e) {
                  }
                  n = r.write ? r.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                  var f = "";
                  for (var c in o)o[c] && (f += "; " + c, !0 !== o[c] && (f += "=" + o[c]));
                  return document.cookie = t + "=" + n + f
                }
                t || (s = {});
                for (var h = document.cookie ? document.cookie.split("; ") : [], u = /(%[0-9A-Z]{2})+/g, d = 0; d < h.length; d++) {
                  var l = h[d].split("="), p = l.slice(1).join("=");
                  this.json || '"' !== p.charAt(0) || (p = p.slice(1, -1));
                  try {
                    var b = l[0].replace(u, decodeURIComponent);
                    if (p = r.read ? r.read(p, b) : r(p, b) || p.replace(u, decodeURIComponent), this.json)try {
                      p = JSON.parse(p)
                    } catch (e) {
                    }
                    if (t === b) {
                      s = p;
                      break
                    }
                    t || (s[b] = p)
                  } catch (e) {
                  }
                }
                return s
              }
            }

            return i.set = i, i.get = function (e) {
              return i.call(i, e)
            }, i.getJSON = function () {
              return i.apply({json: !0}, [].slice.call(arguments))
            }, i.defaults = {}, i.remove = function (t, r) {
              i(t, "", e(r, {expires: -1}))
            }, i.withConverter = t, i
          }(function () {
          })
        })
      });
      J.prototype.getItem = function (e) {
        return Pt.get(e)
      }, J.prototype.removeItem = function (e) {
        Pt.remove(e)
      }, J.prototype.setItem = function (e, t, r) {
        var i = Rt.extend({expires: 1}, r);
        Pt.set(e, t, i)
      }, Z.prototype.warning = function (e) {
        this.disableWarnings || console.warn(e)
      }, G.prototype.failover = function () {
        this.storage instanceof X ? this.warn.warning("DummyStorage: ignore failover") : this.storage instanceof J ? (this.warn.warning("CookieStorage: failing over DummyStorage"), this.storage = new X) : (this.warn.warning("LocalStorage: failing over CookieStorage"), this.storage = new J)
      }, G.prototype.getItem = function (e) {
        try {
          return this.storage.getItem(e)
        } catch (t) {
          return this.warn.warning(t), this.failover(), this.getItem(e)
        }
      }, G.prototype.removeItem = function (e) {
        try {
          return this.storage.removeItem(e)
        } catch (t) {
          return this.warn.warning(t), this.failover(), this.removeItem(e)
        }
      }, G.prototype.setItem = function (e, t, r) {
        try {
          return this.storage.setItem(e, t, r)
        } catch (i) {
          return this.warn.warning(i), this.failover(), this.setItem(e, t, r)
        }
      };
      var qt = function () {
        return Dt || (Dt = new G), Dt
      }, Ut = {
        getItem: function (e) {
          var t = qt().getItem(e);
          try {
            return JSON.parse(t)
          } catch (e) {
            return t
          }
        }, removeItem: function (e) {
          return qt().removeItem(e)
        }, setItem: function (e, t, r) {
          var i = JSON.stringify(t);
          return qt().setItem(e, i, r)
        }
      }, Lt = {
        set: function (e, t) {
          var r = {lastUsedConnection: e, lastUsedSub: t};
          Ut.setItem("auth0.ssodata", JSON.stringify(r))
        }, get: function () {
          var e = Ut.getItem("auth0.ssodata");
          if (e)return JSON.parse(e)
        }
      }, Nt = {
        buildResponse: $,
        invalidToken: Q
      }, zt = ["realm", "audience", "client_id", "client_secret", "redirect_uri", "scope", "code", "grant_type", "username", "password", "refresh_token", "assertion", "client_assertion", "client_assertion_type", "code_verifier"], Ht = ["connection", "connection_scope", "auth0Client", "owp", "device", "realm", "protocol", "_csrf", "_intstate", "login_ticket", "client_id", "response_type", "response_mode", "redirect_uri", "audience", "scope", "state", "nonce", "display", "prompt", "max_age", "ui_locales", "claims_locales", "id_token_hint", "login_hint", "acr_values", "claims", "registration", "request", "request_uri", "code_challenge", "code_challenge_method", "access_type", "display"], Ft = {
        oauthTokenParams: re,
        oauthAuthorizeParams: te
      }, Kt = i(function (e, t) {
        var r;
        e.exports = r = r || function (e, t) {
            var r = Object.create || function () {
                function e() {
                }

                return function (t) {
                  var r;
                  return e.prototype = t, r = new e, e.prototype = null, r
                }
              }(), i = {}, n = i.lib = {}, o = n.Base = {
              extend: function (e) {
                var t = r(this);
                return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                  t.$super.init.apply(this, arguments)
                }), t.init.prototype = t, t.$super = this, t
              }, create: function () {
                var e = this.extend();
                return e.init.apply(e, arguments), e
              }, init: function () {
              }, mixIn: function (e) {
                for (var t in e)e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
              }, clone: function () {
                return this.init.prototype.extend(this)
              }
            }, s = n.WordArray = o.extend({
              init: function (e, t) {
                e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
              }, toString: function (e) {
                return (e || f).stringify(this)
              }, concat: function (e) {
                var t = this.words, r = e.words, i = this.sigBytes, n = e.sigBytes;
                if (this.clamp(), i % 4)for (var o = 0; o < n; o++) {
                  var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                  t[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                } else for (var o = 0; o < n; o += 4)t[i + o >>> 2] = r[o >>> 2];
                return this.sigBytes += n, this
              }, clamp: function () {
                var t = this.words, r = this.sigBytes;
                t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = e.ceil(r / 4)
              }, clone: function () {
                var e = o.clone.call(this);
                return e.words = this.words.slice(0), e
              }, random: function (t) {
                for (var r, i = [], n = 0; n < t; n += 4) {
                  var o = function (t) {
                    var t = t, r = 987654321, i = 4294967295;
                    return function () {
                      var n = ((r = 36969 * (65535 & r) + (r >> 16) & i) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & i) & i;
                      return n /= 4294967296, (n += .5) * (e.random() > .5 ? 1 : -1)
                    }
                  }(4294967296 * (r || e.random()));
                  r = 987654071 * o(), i.push(4294967296 * o() | 0)
                }
                return new s.init(i, t)
              }
            }), a = i.enc = {}, f = a.Hex = {
              stringify: function (e) {
                for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                  var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                  i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16))
                }
                return i.join("")
              }, parse: function (e) {
                for (var t = e.length, r = [], i = 0; i < t; i += 2)r[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new s.init(r, t / 2)
              }
            }, c = a.Latin1 = {
              stringify: function (e) {
                for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                  var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                  i.push(String.fromCharCode(o))
                }
                return i.join("")
              }, parse: function (e) {
                for (var t = e.length, r = [], i = 0; i < t; i++)r[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                return new s.init(r, t)
              }
            }, h = a.Utf8 = {
              stringify: function (e) {
                try {
                  return decodeURIComponent(escape(c.stringify(e)))
                } catch (e) {
                  throw new Error("Malformed UTF-8 data")
                }
              }, parse: function (e) {
                return c.parse(unescape(encodeURIComponent(e)))
              }
            }, u = n.BufferedBlockAlgorithm = o.extend({
              reset: function () {
                this._data = new s.init, this._nDataBytes = 0
              }, _append: function (e) {
                "string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
              }, _process: function (t) {
                var r = this._data, i = r.words, n = r.sigBytes, o = this.blockSize, a = 4 * o, f = n / a, c = (f = t ? e.ceil(f) : e.max((0 | f) - this._minBufferSize, 0)) * o, h = e.min(4 * c, n);
                if (c) {
                  for (var u = 0; u < c; u += o)this._doProcessBlock(i, u);
                  var d = i.splice(0, c);
                  r.sigBytes -= h
                }
                return new s.init(d, h)
              }, clone: function () {
                var e = o.clone.call(this);
                return e._data = this._data.clone(), e
              }, _minBufferSize: 0
            }), d = (n.Hasher = u.extend({
              cfg: o.extend(), init: function (e) {
                this.cfg = this.cfg.extend(e), this.reset()
              }, reset: function () {
                u.reset.call(this), this._doReset()
              }, update: function (e) {
                return this._append(e), this._process(), this
              }, finalize: function (e) {
                return e && this._append(e), this._doFinalize()
              }, blockSize: 16, _createHelper: function (e) {
                return function (t, r) {
                  return new e.init(r).finalize(t)
                }
              }, _createHmacHelper: function (e) {
                return function (t, r) {
                  return new d.HMAC.init(e, r).finalize(t)
                }
              }
            }), i.algo = {});
            return i
          }(Math)
      }), Vt = i(function (e, t) {
        var r;
        e.exports = (r = Kt, function (e) {
          var t = r, i = t.lib, n = i.WordArray, o = i.Hasher, s = t.algo, a = [], f = [];
          !function () {
            function t(e) {
              return 4294967296 * (e - (0 | e)) | 0
            }

            for (var r = 2, i = 0; i < 64;)(function (t) {
              for (var r = e.sqrt(t), i = 2; i <= r; i++)if (!(t % i))return !1;
              return !0
            })(r) && (i < 8 && (a[i] = t(e.pow(r, .5))), f[i] = t(e.pow(r, 1 / 3)), i++), r++
          }();
          var c = [], h = s.SHA256 = o.extend({
            _doReset: function () {
              this._hash = new n.init(a.slice(0))
            }, _doProcessBlock: function (e, t) {
              for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], h = r[5], u = r[6], d = r[7], l = 0; l < 64; l++) {
                if (l < 16)c[l] = 0 | e[t + l]; else {
                  var p = c[l - 15], b = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, y = c[l - 2], m = (y << 15 | y >>> 17) ^ (y << 13 | y >>> 19) ^ y >>> 10;
                  c[l] = b + c[l - 7] + m + c[l - 16]
                }
                var g = i & n ^ i & o ^ n & o, v = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), w = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & u) + f[l] + c[l];
                d = u, u = h, h = a, a = s + w | 0, s = o, o = n, n = i, i = w + (v + g) | 0
              }
              r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + a | 0, r[5] = r[5] + h | 0, r[6] = r[6] + u | 0, r[7] = r[7] + d | 0
            }, _doFinalize: function () {
              var t = this._data, r = t.words, i = 8 * this._nDataBytes, n = 8 * t.sigBytes;
              return r[n >>> 5] |= 128 << 24 - n % 32, r[14 + (n + 64 >>> 9 << 4)] = e.floor(i / 4294967296), r[15 + (n + 64 >>> 9 << 4)] = i, t.sigBytes = 4 * r.length, this._process(), this._hash
            }, clone: function () {
              var e = o.clone.call(this);
              return e._hash = this._hash.clone(), e
            }
          });
          t.SHA256 = o._createHelper(h), t.HmacSHA256 = o._createHmacHelper(h)
        }(Math), r.SHA256)
      }), Wt = i(function (e, t) {
        var r, i, n;
        e.exports = (n = (i = r = Kt).lib.WordArray, i.enc.Base64 = {
          stringify: function (e) {
            var t = e.words, r = e.sigBytes, i = this._map;
            e.clamp();
            for (var n = [], o = 0; o < r; o += 3)for (var s = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < r; a++)n.push(i.charAt(s >>> 6 * (3 - a) & 63));
            var f = i.charAt(64);
            if (f)for (; n.length % 4;)n.push(f);
            return n.join("")
          }, parse: function (e) {
            var t = e.length, r = this._map, i = this._reverseMap;
            if (!i) {
              i = this._reverseMap = [];
              for (var o = 0; o < r.length; o++)i[r.charCodeAt(o)] = o
            }
            var s = r.charAt(64);
            if (s) {
              var a = e.indexOf(s);
              -1 !== a && (t = a)
            }
            return function (e, t, r) {
              for (var i = [], o = 0, s = 0; s < t; s++)if (s % 4) {
                var a = r[e.charCodeAt(s - 1)] << s % 4 * 2, f = r[e.charCodeAt(s)] >>> 6 - s % 4 * 2;
                i[o >>> 2] |= (a | f) << 24 - o % 4 * 8, o++
              }
              return n.create(i, o)
            }(e, t, i)
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }, r.enc.Base64)
      }), Yt = i(function (e, t) {
        e.exports = Kt.enc.Hex
      }), Xt = i(function (e, t) {
        (function () {
          function t(e, t, r) {
            null != e && ("number" == typeof e ? this.fromNumber(e, t, r) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
          }

          function r() {
            return new t(null)
          }

          function i(e) {
            return A.charAt(e)
          }

          function n(e, t) {
            var r = T[e.charCodeAt(t)];
            return null == r ? -1 : r
          }

          function o(e) {
            var t = r();
            return t.fromInt(e), t
          }

          function s(e) {
            var t, r = 1;
            return 0 != (t = e >>> 16) && (e = t, r += 16), 0 != (t = e >> 8) && (e = t, r += 8), 0 != (t = e >> 4) && (e = t, r += 4), 0 != (t = e >> 2) && (e = t, r += 2), 0 != (t = e >> 1) && (e = t, r += 1), r
          }

          function a(e) {
            this.m = e
          }

          function f(e) {
            this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
          }

          function c(e, t) {
            return e & t
          }

          function h(e, t) {
            return e | t
          }

          function u(e, t) {
            return e ^ t
          }

          function d(e, t) {
            return e & ~t
          }

          function l(e) {
            if (0 == e)return -1;
            var t = 0;
            return 0 == (65535 & e) && (e >>= 16, t += 16), 0 == (255 & e) && (e >>= 8, t += 8), 0 == (15 & e) && (e >>= 4, t += 4), 0 == (3 & e) && (e >>= 2, t += 2), 0 == (1 & e) && ++t, t
          }

          function p(e) {
            for (var t = 0; 0 != e;)e &= e - 1, ++t;
            return t
          }

          function b() {
          }

          function y(e) {
            return e
          }

          function m(e) {
            this.r2 = r(), this.q3 = r(), t.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e), this.m = e
          }

          function g() {
            var e;
            e = (new Date).getTime(), I[O++] ^= 255 & e, I[O++] ^= e >> 8 & 255, I[O++] ^= e >> 16 & 255, I[O++] ^= e >> 24 & 255, O >= P && (O -= P)
          }

          function v() {
            if (null == x) {
              for (g(), (x = new _).init(I), O = 0; O < I.length; ++O)I[O] = 0;
              O = 0
            }
            return x.next()
          }

          function w() {
          }

          function _() {
            this.i = 0, this.j = 0, this.S = new Array
          }

          var S, k = "undefined" != typeof navigator;
          k && "Microsoft Internet Explorer" == navigator.appName ? (t.prototype.am = function (e, t, r, i, n, o) {
            for (var s = 32767 & t, a = t >> 15; --o >= 0;) {
              var f = 32767 & this[e], c = this[e++] >> 15, h = a * f + c * s;
              n = ((f = s * f + ((32767 & h) << 15) + r[i] + (1073741823 & n)) >>> 30) + (h >>> 15) + a * c + (n >>> 30), r[i++] = 1073741823 & f
            }
            return n
          }, S = 30) : k && "Netscape" != navigator.appName ? (t.prototype.am = function (e, t, r, i, n, o) {
            for (; --o >= 0;) {
              var s = t * this[e++] + r[i] + n;
              n = Math.floor(s / 67108864), r[i++] = 67108863 & s
            }
            return n
          }, S = 26) : (t.prototype.am = function (e, t, r, i, n, o) {
            for (var s = 16383 & t, a = t >> 14; --o >= 0;) {
              var f = 16383 & this[e], c = this[e++] >> 14, h = a * f + c * s;
              n = ((f = s * f + ((16383 & h) << 14) + r[i] + n) >> 28) + (h >> 14) + a * c, r[i++] = 268435455 & f
            }
            return n
          }, S = 28), t.prototype.DB = S, t.prototype.DM = (1 << S) - 1, t.prototype.DV = 1 << S, t.prototype.FV = Math.pow(2, 52), t.prototype.F1 = 52 - S, t.prototype.F2 = 2 * S - 52;
          var E, M, A = "0123456789abcdefghijklmnopqrstuvwxyz", T = new Array;
          for (E = "0".charCodeAt(0), M = 0; M <= 9; ++M)T[E++] = M;
          for (E = "a".charCodeAt(0), M = 10; M < 36; ++M)T[E++] = M;
          for (E = "A".charCodeAt(0), M = 10; M < 36; ++M)T[E++] = M;
          a.prototype.convert = function (e) {
            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
          }, a.prototype.revert = function (e) {
            return e
          }, a.prototype.reduce = function (e) {
            e.divRemTo(this.m, null, e)
          }, a.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
          }, a.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
          }, f.prototype.convert = function (e) {
            var i = r();
            return e.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), e.s < 0 && i.compareTo(t.ZERO) > 0 && this.m.subTo(i, i), i
          }, f.prototype.revert = function (e) {
            var t = r();
            return e.copyTo(t), this.reduce(t), t
          }, f.prototype.reduce = function (e) {
            for (; e.t <= this.mt2;)e[e.t++] = 0;
            for (var t = 0; t < this.m.t; ++t) {
              var r = 32767 & e[t], i = r * this.mpl + ((r * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
              for (e[r = t + this.m.t] += this.m.am(0, i, e, t, 0, this.m.t); e[r] >= e.DV;)e[r] -= e.DV, e[++r]++
            }
            e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
          }, f.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
          }, f.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
          }, t.prototype.copyTo = function (e) {
            for (var t = this.t - 1; t >= 0; --t)e[t] = this[t];
            e.t = this.t, e.s = this.s
          }, t.prototype.fromInt = function (e) {
            this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
          }, t.prototype.fromString = function (e, r) {
            var i;
            if (16 == r)i = 4; else if (8 == r)i = 3; else if (256 == r)i = 8; else if (2 == r)i = 1; else if (32 == r)i = 5; else {
              if (4 != r)return void this.fromRadix(e, r);
              i = 2
            }
            this.t = 0, this.s = 0;
            for (var o = e.length, s = !1, a = 0; --o >= 0;) {
              var f = 8 == i ? 255 & e[o] : n(e, o);
              f < 0 ? "-" == e.charAt(o) && (s = !0) : (s = !1, 0 == a ? this[this.t++] = f : a + i > this.DB ? (this[this.t - 1] |= (f & (1 << this.DB - a) - 1) << a, this[this.t++] = f >> this.DB - a) : this[this.t - 1] |= f << a, (a += i) >= this.DB && (a -= this.DB))
            }
            8 == i && 0 != (128 & e[0]) && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && t.ZERO.subTo(this, this)
          }, t.prototype.clamp = function () {
            for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;)--this.t
          }, t.prototype.dlShiftTo = function (e, t) {
            var r;
            for (r = this.t - 1; r >= 0; --r)t[r + e] = this[r];
            for (r = e - 1; r >= 0; --r)t[r] = 0;
            t.t = this.t + e, t.s = this.s
          }, t.prototype.drShiftTo = function (e, t) {
            for (var r = e; r < this.t; ++r)t[r - e] = this[r];
            t.t = Math.max(this.t - e, 0), t.s = this.s
          }, t.prototype.lShiftTo = function (e, t) {
            var r, i = e % this.DB, n = this.DB - i, o = (1 << n) - 1, s = Math.floor(e / this.DB), a = this.s << i & this.DM;
            for (r = this.t - 1; r >= 0; --r)t[r + s + 1] = this[r] >> n | a, a = (this[r] & o) << i;
            for (r = s - 1; r >= 0; --r)t[r] = 0;
            t[s] = a, t.t = this.t + s + 1, t.s = this.s, t.clamp()
          }, t.prototype.rShiftTo = function (e, t) {
            t.s = this.s;
            var r = Math.floor(e / this.DB);
            if (r >= this.t)t.t = 0; else {
              var i = e % this.DB, n = this.DB - i, o = (1 << i) - 1;
              t[0] = this[r] >> i;
              for (var s = r + 1; s < this.t; ++s)t[s - r - 1] |= (this[s] & o) << n, t[s - r] = this[s] >> i;
              i > 0 && (t[this.t - r - 1] |= (this.s & o) << n), t.t = this.t - r, t.clamp()
            }
          }, t.prototype.subTo = function (e, t) {
            for (var r = 0, i = 0, n = Math.min(e.t, this.t); r < n;)i += this[r] - e[r], t[r++] = i & this.DM, i >>= this.DB;
            if (e.t < this.t) {
              for (i -= e.s; r < this.t;)i += this[r], t[r++] = i & this.DM, i >>= this.DB;
              i += this.s
            } else {
              for (i += this.s; r < e.t;)i -= e[r], t[r++] = i & this.DM, i >>= this.DB;
              i -= e.s
            }
            t.s = i < 0 ? -1 : 0, i < -1 ? t[r++] = this.DV + i : i > 0 && (t[r++] = i), t.t = r, t.clamp()
          }, t.prototype.multiplyTo = function (e, r) {
            var i = this.abs(), n = e.abs(), o = i.t;
            for (r.t = o + n.t; --o >= 0;)r[o] = 0;
            for (o = 0; o < n.t; ++o)r[o + i.t] = i.am(0, n[o], r, o, 0, i.t);
            r.s = 0, r.clamp(), this.s != e.s && t.ZERO.subTo(r, r)
          }, t.prototype.squareTo = function (e) {
            for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0;)e[r] = 0;
            for (r = 0; r < t.t - 1; ++r) {
              var i = t.am(r, t[r], e, 2 * r, 0, 1);
              (e[r + t.t] += t.am(r + 1, 2 * t[r], e, 2 * r + 1, i, t.t - r - 1)) >= t.DV && (e[r + t.t] -= t.DV, e[r + t.t + 1] = 1)
            }
            e.t > 0 && (e[e.t - 1] += t.am(r, t[r], e, 2 * r, 0, 1)), e.s = 0, e.clamp()
          }, t.prototype.divRemTo = function (e, i, n) {
            var o = e.abs();
            if (!(o.t <= 0)) {
              var a = this.abs();
              if (a.t < o.t)return null != i && i.fromInt(0), void(null != n && this.copyTo(n));
              null == n && (n = r());
              var f = r(), c = this.s, h = e.s, u = this.DB - s(o[o.t - 1]);
              u > 0 ? (o.lShiftTo(u, f), a.lShiftTo(u, n)) : (o.copyTo(f), a.copyTo(n));
              var d = f.t, l = f[d - 1];
              if (0 != l) {
                var p = l * (1 << this.F1) + (d > 1 ? f[d - 2] >> this.F2 : 0), b = this.FV / p, y = (1 << this.F1) / p, m = 1 << this.F2, g = n.t, v = g - d, w = null == i ? r() : i;
                for (f.dlShiftTo(v, w), n.compareTo(w) >= 0 && (n[n.t++] = 1, n.subTo(w, n)), t.ONE.dlShiftTo(d, w), w.subTo(f, f); f.t < d;)f[f.t++] = 0;
                for (; --v >= 0;) {
                  var _ = n[--g] == l ? this.DM : Math.floor(n[g] * b + (n[g - 1] + m) * y);
                  if ((n[g] += f.am(0, _, n, v, 0, d)) < _)for (f.dlShiftTo(v, w), n.subTo(w, n); n[g] < --_;)n.subTo(w, n)
                }
                null != i && (n.drShiftTo(d, i), c != h && t.ZERO.subTo(i, i)), n.t = d, n.clamp(), u > 0 && n.rShiftTo(u, n), c < 0 && t.ZERO.subTo(n, n)
              }
            }
          }, t.prototype.invDigit = function () {
            if (this.t < 1)return 0;
            var e = this[0];
            if (0 == (1 & e))return 0;
            var t = 3 & e;
            return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
          }, t.prototype.isEven = function () {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
          }, t.prototype.exp = function (e, i) {
            if (e > 4294967295 || e < 1)return t.ONE;
            var n = r(), o = r(), a = i.convert(this), f = s(e) - 1;
            for (a.copyTo(n); --f >= 0;)if (i.sqrTo(n, o), (e & 1 << f) > 0)i.mulTo(o, a, n); else {
              var c = n;
              n = o, o = c
            }
            return i.revert(n)
          }, t.prototype.toString = function (e) {
            if (this.s < 0)return "-" + this.negate().toString(e);
            var t;
            if (16 == e)t = 4; else if (8 == e)t = 3; else if (2 == e)t = 1; else if (32 == e)t = 5; else {
              if (4 != e)return this.toRadix(e);
              t = 2
            }
            var r, n = (1 << t) - 1, o = !1, s = "", a = this.t, f = this.DB - a * this.DB % t;
            if (a-- > 0)for (f < this.DB && (r = this[a] >> f) > 0 && (o = !0, s = i(r)); a >= 0;)f < t ? (r = (this[a] & (1 << f) - 1) << t - f, r |= this[--a] >> (f += this.DB - t)) : (r = this[a] >> (f -= t) & n, f <= 0 && (f += this.DB, --a)), r > 0 && (o = !0), o && (s += i(r));
            return o ? s : "0"
          }, t.prototype.negate = function () {
            var e = r();
            return t.ZERO.subTo(this, e), e
          }, t.prototype.abs = function () {
            return this.s < 0 ? this.negate() : this
          }, t.prototype.compareTo = function (e) {
            var t = this.s - e.s;
            if (0 != t)return t;
            var r = this.t;
            if (0 != (t = r - e.t))return this.s < 0 ? -t : t;
            for (; --r >= 0;)if (0 != (t = this[r] - e[r]))return t;
            return 0
          }, t.prototype.bitLength = function () {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + s(this[this.t - 1] ^ this.s & this.DM)
          }, t.prototype.mod = function (e) {
            var i = r();
            return this.abs().divRemTo(e, null, i), this.s < 0 && i.compareTo(t.ZERO) > 0 && e.subTo(i, i), i
          }, t.prototype.modPowInt = function (e, t) {
            var r;
            return r = e < 256 || t.isEven() ? new a(t) : new f(t), this.exp(e, r)
          }, t.ZERO = o(0), t.ONE = o(1), b.prototype.convert = y, b.prototype.revert = y, b.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r)
          }, b.prototype.sqrTo = function (e, t) {
            e.squareTo(t)
          }, m.prototype.convert = function (e) {
            if (e.s < 0 || e.t > 2 * this.m.t)return e.mod(this.m);
            if (e.compareTo(this.m) < 0)return e;
            var t = r();
            return e.copyTo(t), this.reduce(t), t
          }, m.prototype.revert = function (e) {
            return e
          }, m.prototype.reduce = function (e) {
            for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;)e.dAddOffset(1, this.m.t + 1);
            for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;)e.subTo(this.m, e)
          }, m.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
          }, m.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
          };
          var x, I, O, B = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], C = (1 << 26) / B[B.length - 1];
          if (t.prototype.chunkSize = function (e) {
              return Math.floor(Math.LN2 * this.DB / Math.log(e))
            }, t.prototype.toRadix = function (e) {
              if (null == e && (e = 10), 0 == this.signum() || e < 2 || e > 36)return "0";
              var t = this.chunkSize(e), i = Math.pow(e, t), n = o(i), s = r(), a = r(), f = "";
              for (this.divRemTo(n, s, a); s.signum() > 0;)f = (i + a.intValue()).toString(e).substr(1) + f, s.divRemTo(n, s, a);
              return a.intValue().toString(e) + f
            }, t.prototype.fromRadix = function (e, r) {
              this.fromInt(0), null == r && (r = 10);
              for (var i = this.chunkSize(r), o = Math.pow(r, i), s = !1, a = 0, f = 0, c = 0; c < e.length; ++c) {
                var h = n(e, c);
                h < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (s = !0) : (f = r * f + h, ++a >= i && (this.dMultiply(o), this.dAddOffset(f, 0), a = 0, f = 0))
              }
              a > 0 && (this.dMultiply(Math.pow(r, a)), this.dAddOffset(f, 0)), s && t.ZERO.subTo(this, this)
            }, t.prototype.fromNumber = function (e, r, i) {
              if ("number" == typeof r)if (e < 2)this.fromInt(1); else for (this.fromNumber(e, i), this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), h, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);)this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this); else {
                var n = new Array, o = 7 & e;
                n.length = 1 + (e >> 3), r.nextBytes(n), o > 0 ? n[0] &= (1 << o) - 1 : n[0] = 0, this.fromString(n, 256)
              }
            }, t.prototype.bitwiseTo = function (e, t, r) {
              var i, n, o = Math.min(e.t, this.t);
              for (i = 0; i < o; ++i)r[i] = t(this[i], e[i]);
              if (e.t < this.t) {
                for (n = e.s & this.DM, i = o; i < this.t; ++i)r[i] = t(this[i], n);
                r.t = this.t
              } else {
                for (n = this.s & this.DM, i = o; i < e.t; ++i)r[i] = t(n, e[i]);
                r.t = e.t
              }
              r.s = t(this.s, e.s), r.clamp()
            }, t.prototype.changeBit = function (e, r) {
              var i = t.ONE.shiftLeft(e);
              return this.bitwiseTo(i, r, i), i
            }, t.prototype.addTo = function (e, t) {
              for (var r = 0, i = 0, n = Math.min(e.t, this.t); r < n;)i += this[r] + e[r], t[r++] = i & this.DM, i >>= this.DB;
              if (e.t < this.t) {
                for (i += e.s; r < this.t;)i += this[r], t[r++] = i & this.DM, i >>= this.DB;
                i += this.s
              } else {
                for (i += this.s; r < e.t;)i += e[r], t[r++] = i & this.DM, i >>= this.DB;
                i += e.s
              }
              t.s = i < 0 ? -1 : 0, i > 0 ? t[r++] = i : i < -1 && (t[r++] = this.DV + i), t.t = r, t.clamp()
            }, t.prototype.dMultiply = function (e) {
              this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
            }, t.prototype.dAddOffset = function (e, t) {
              if (0 != e) {
                for (; this.t <= t;)this[this.t++] = 0;
                for (this[t] += e; this[t] >= this.DV;)this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t]
              }
            }, t.prototype.multiplyLowerTo = function (e, t, r) {
              var i, n = Math.min(this.t + e.t, t);
              for (r.s = 0, r.t = n; n > 0;)r[--n] = 0;
              for (i = r.t - this.t; n < i; ++n)r[n + this.t] = this.am(0, e[n], r, n, 0, this.t);
              for (i = Math.min(e.t, t); n < i; ++n)this.am(0, e[n], r, n, 0, t - n);
              r.clamp()
            }, t.prototype.multiplyUpperTo = function (e, t, r) {
              --t;
              var i = r.t = this.t + e.t - t;
              for (r.s = 0; --i >= 0;)r[i] = 0;
              for (i = Math.max(t - this.t, 0); i < e.t; ++i)r[this.t + i - t] = this.am(t - i, e[i], r, 0, 0, this.t + i - t);
              r.clamp(), r.drShiftTo(1, r)
            }, t.prototype.modInt = function (e) {
              if (e <= 0)return 0;
              var t = this.DV % e, r = this.s < 0 ? e - 1 : 0;
              if (this.t > 0)if (0 == t)r = this[0] % e; else for (var i = this.t - 1; i >= 0; --i)r = (t * r + this[i]) % e;
              return r
            }, t.prototype.millerRabin = function (e) {
              var i = this.subtract(t.ONE), n = i.getLowestSetBit();
              if (n <= 0)return !1;
              var o = i.shiftRight(n);
              (e = e + 1 >> 1) > B.length && (e = B.length);
              for (var s = r(), a = 0; a < e; ++a) {
                s.fromInt(B[Math.floor(Math.random() * B.length)]);
                var f = s.modPow(o, this);
                if (0 != f.compareTo(t.ONE) && 0 != f.compareTo(i)) {
                  for (var c = 1; c++ < n && 0 != f.compareTo(i);)if (0 == (f = f.modPowInt(2, this)).compareTo(t.ONE))return !1;
                  if (0 != f.compareTo(i))return !1
                }
              }
              return !0
            }, t.prototype.clone = function () {
              var e = r();
              return this.copyTo(e), e
            }, t.prototype.intValue = function () {
              if (this.s < 0) {
                if (1 == this.t)return this[0] - this.DV;
                if (0 == this.t)return -1
              } else {
                if (1 == this.t)return this[0];
                if (0 == this.t)return 0
              }
              return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }, t.prototype.byteValue = function () {
              return 0 == this.t ? this.s : this[0] << 24 >> 24
            }, t.prototype.shortValue = function () {
              return 0 == this.t ? this.s : this[0] << 16 >> 16
            }, t.prototype.signum = function () {
              return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }, t.prototype.toByteArray = function () {
              var e = this.t, t = new Array;
              t[0] = this.s;
              var r, i = this.DB - e * this.DB % 8, n = 0;
              if (e-- > 0)for (i < this.DB && (r = this[e] >> i) != (this.s & this.DM) >> i && (t[n++] = r | this.s << this.DB - i); e >= 0;)i < 8 ? (r = (this[e] & (1 << i) - 1) << 8 - i, r |= this[--e] >> (i += this.DB - 8)) : (r = this[e] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --e)), 0 != (128 & r) && (r |= -256), 0 == n && (128 & this.s) != (128 & r) && ++n, (n > 0 || r != this.s) && (t[n++] = r);
              return t
            }, t.prototype.equals = function (e) {
              return 0 == this.compareTo(e)
            }, t.prototype.min = function (e) {
              return this.compareTo(e) < 0 ? this : e
            }, t.prototype.max = function (e) {
              return this.compareTo(e) > 0 ? this : e
            }, t.prototype.and = function (e) {
              var t = r();
              return this.bitwiseTo(e, c, t), t
            }, t.prototype.or = function (e) {
              var t = r();
              return this.bitwiseTo(e, h, t), t
            }, t.prototype.xor = function (e) {
              var t = r();
              return this.bitwiseTo(e, u, t), t
            }, t.prototype.andNot = function (e) {
              var t = r();
              return this.bitwiseTo(e, d, t), t
            }, t.prototype.not = function () {
              for (var e = r(), t = 0; t < this.t; ++t)e[t] = this.DM & ~this[t];
              return e.t = this.t, e.s = ~this.s, e
            }, t.prototype.shiftLeft = function (e) {
              var t = r();
              return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
            }, t.prototype.shiftRight = function (e) {
              var t = r();
              return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
            }, t.prototype.getLowestSetBit = function () {
              for (var e = 0; e < this.t; ++e)if (0 != this[e])return e * this.DB + l(this[e]);
              return this.s < 0 ? this.t * this.DB : -1
            }, t.prototype.bitCount = function () {
              for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r)e += p(this[r] ^ t);
              return e
            }, t.prototype.testBit = function (e) {
              var t = Math.floor(e / this.DB);
              return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
            }, t.prototype.setBit = function (e) {
              return this.changeBit(e, h)
            }, t.prototype.clearBit = function (e) {
              return this.changeBit(e, d)
            }, t.prototype.flipBit = function (e) {
              return this.changeBit(e, u)
            }, t.prototype.add = function (e) {
              var t = r();
              return this.addTo(e, t), t
            }, t.prototype.subtract = function (e) {
              var t = r();
              return this.subTo(e, t), t
            }, t.prototype.multiply = function (e) {
              var t = r();
              return this.multiplyTo(e, t), t
            }, t.prototype.divide = function (e) {
              var t = r();
              return this.divRemTo(e, t, null), t
            }, t.prototype.remainder = function (e) {
              var t = r();
              return this.divRemTo(e, null, t), t
            }, t.prototype.divideAndRemainder = function (e) {
              var t = r(), i = r();
              return this.divRemTo(e, t, i), new Array(t, i)
            }, t.prototype.modPow = function (e, t) {
              var i, n, c = e.bitLength(), h = o(1);
              if (c <= 0)return h;
              i = c < 18 ? 1 : c < 48 ? 3 : c < 144 ? 4 : c < 768 ? 5 : 6, n = c < 8 ? new a(t) : t.isEven() ? new m(t) : new f(t);
              var u = new Array, d = 3, l = i - 1, p = (1 << i) - 1;
              if (u[1] = n.convert(this), i > 1) {
                var b = r();
                for (n.sqrTo(u[1], b); d <= p;)u[d] = r(), n.mulTo(b, u[d - 2], u[d]), d += 2
              }
              var y, g, v = e.t - 1, w = !0, _ = r();
              for (c = s(e[v]) - 1; v >= 0;) {
                for (c >= l ? y = e[v] >> c - l & p : (y = (e[v] & (1 << c + 1) - 1) << l - c, v > 0 && (y |= e[v - 1] >> this.DB + c - l)), d = i; 0 == (1 & y);)y >>= 1, --d;
                if ((c -= d) < 0 && (c += this.DB, --v), w)u[y].copyTo(h), w = !1; else {
                  for (; d > 1;)n.sqrTo(h, _), n.sqrTo(_, h), d -= 2;
                  d > 0 ? n.sqrTo(h, _) : (g = h, h = _, _ = g), n.mulTo(_, u[y], h)
                }
                for (; v >= 0 && 0 == (e[v] & 1 << c);)n.sqrTo(h, _), g = h, h = _, _ = g, --c < 0 && (c = this.DB - 1, --v)
              }
              return n.revert(h)
            }, t.prototype.modInverse = function (e) {
              var r = e.isEven();
              if (this.isEven() && r || 0 == e.signum())return t.ZERO;
              for (var i = e.clone(), n = this.clone(), s = o(1), a = o(0), f = o(0), c = o(1); 0 != i.signum();) {
                for (; i.isEven();)i.rShiftTo(1, i), r ? (s.isEven() && a.isEven() || (s.addTo(this, s), a.subTo(e, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(e, a), a.rShiftTo(1, a);
                for (; n.isEven();)n.rShiftTo(1, n), r ? (f.isEven() && c.isEven() || (f.addTo(this, f), c.subTo(e, c)), f.rShiftTo(1, f)) : c.isEven() || c.subTo(e, c), c.rShiftTo(1, c);
                i.compareTo(n) >= 0 ? (i.subTo(n, i), r && s.subTo(f, s), a.subTo(c, a)) : (n.subTo(i, n), r && f.subTo(s, f), c.subTo(a, c))
              }
              return 0 != n.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c), c.signum() < 0 ? c.add(e) : c) : c
            }, t.prototype.pow = function (e) {
              return this.exp(e, new b)
            }, t.prototype.gcd = function (e) {
              var t = this.s < 0 ? this.negate() : this.clone(), r = e.s < 0 ? e.negate() : e.clone();
              if (t.compareTo(r) < 0) {
                var i = t;
                t = r, r = i
              }
              var n = t.getLowestSetBit(), o = r.getLowestSetBit();
              if (o < 0)return t;
              for (n < o && (o = n), o > 0 && (t.rShiftTo(o, t), r.rShiftTo(o, r)); t.signum() > 0;)(n = t.getLowestSetBit()) > 0 && t.rShiftTo(n, t), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r), t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r));
              return o > 0 && r.lShiftTo(o, r), r
            }, t.prototype.isProbablePrime = function (e) {
              var t, r = this.abs();
              if (1 == r.t && r[0] <= B[B.length - 1]) {
                for (t = 0; t < B.length; ++t)if (r[0] == B[t])return !0;
                return !1
              }
              if (r.isEven())return !1;
              for (t = 1; t < B.length;) {
                for (var i = B[t], n = t + 1; n < B.length && i < C;)i *= B[n++];
                for (i = r.modInt(i); t < n;)if (i % B[t++] == 0)return !1
              }
              return r.millerRabin(e)
            }, t.prototype.square = function () {
              var e = r();
              return this.squareTo(e), e
            }, t.prototype.Barrett = m, null == I) {
            var R;
            if (I = new Array, O = 0, "undefined" != typeof window && window.crypto)if (window.crypto.getRandomValues) {
              var j = new Uint8Array(32);
              for (window.crypto.getRandomValues(j), R = 0; R < 32; ++R)I[O++] = j[R]
            } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
              var D = window.crypto.random(32);
              for (R = 0; R < D.length; ++R)I[O++] = 255 & D.charCodeAt(R)
            }
            for (; O < P;)R = Math.floor(65536 * Math.random()), I[O++] = R >>> 8, I[O++] = 255 & R;
            O = 0, g()
          }
          w.prototype.nextBytes = function (e) {
            var t;
            for (t = 0; t < e.length; ++t)e[t] = v()
          }, _.prototype.init = function (e) {
            var t, r, i;
            for (t = 0; t < 256; ++t)this.S[t] = t;
            for (r = 0, t = 0; t < 256; ++t)r = r + this.S[t] + e[t % e.length] & 255, i = this.S[t], this.S[t] = this.S[r], this.S[r] = i;
            this.i = 0, this.j = 0
          }, _.prototype.next = function () {
            var e;
            return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[e + this.S[this.i] & 255]
          };
          var P = 256;
          t.SecureRandom = w, t.BigInteger = t, e.exports = t
        }).call(He)
      }), Jt = Xt.BigInteger, Zt = {
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        ripemd160: "3021300906052b2403020105000414"
      }, Gt = {sha256: Vt};
      ie.prototype.verify = function (e, t) {
        t = t.replace(/[^0-9a-f]|[\s\n]]/gi, "");
        var r = new Jt(t, 16);
        if (r.bitLength() > this.n.bitLength())throw new Error("Signature does not match with the key modulus.");
        var i = ne(r.modPowInt(this.e, this.n).toString(16).replace(/^1f+00/, ""));
        if (0 === i.length)return !1;
        if (!Gt.hasOwnProperty(i.alg))throw new Error("Hashing algorithm is not supported.");
        var n = Gt[i.alg](e).toString();
        return i.hash === n
      };
      var $t = ie, Qt = {
        encodeString: ce,
        decodeToString: he,
        byteArrayToString: se,
        stringToByteArray: ae,
        padding: oe,
        byteArrayToHex: fe,
        decodeToHEX: ue,
        base64ToBase64Url: de
      }, er = {process: le, getJWKS: pe};
      be.prototype = Error.prototype, ye.prototype = Error.prototype;
      var tr = {ConfigurationError: be, TokenValidationError: ye};
      me.prototype.get = function () {
        return null
      }, me.prototype.has = function () {
        return !1
      }, me.prototype.set = function () {
      };
      var rr = me, ir = ["RS256"];
      ge.prototype.verify = function (e, t, r) {
        var i = this.decode(e);
        if (i instanceof Error)return r(i, !1);
        var n = i.encoded.header + "." + i.encoded.payload, o = Qt.decodeToHEX(i.encoded.signature), s = i.header.alg, a = i.header.kid, f = i.payload.aud, c = i.payload.iss, h = i.payload.exp, u = i.payload.nbf, d = i.payload.nonce || null;
        if (this.issuer !== c)return r(new tr.TokenValidationError("Issuer " + c + " is not valid."), !1);
        if (this.audience !== f)return r(new tr.TokenValidationError("Audience " + f + " is not valid."), !1);
        if (this.expectedAlg !== s)return r(new tr.TokenValidationError("Algorithm " + s + " is not supported. (Expected algs: [" + ir.join(",") + "])"), !1);
        if (d !== t)return r(new tr.TokenValidationError("Nonce does not match."), !1);
        var l = this.verifyExpAndNbf(h, u);
        return l ? r(l, !1) : this.getRsaVerifier(c, a, function (e, t) {
          return e ? r(e) : t.verify(n, o) ? r(null, i.payload) : r(new tr.TokenValidationError("Invalid signature."))
        })
      }, ge.prototype.verifyExpAndNbf = function (e, t) {
        var r = new Date, i = new Date(0), n = new Date(0);
        return this.__disableExpirationCheck ? null : (i.setUTCSeconds(e + this.leeway), r > i ? new tr.TokenValidationError("Expired token.") : void 0 === t ? null : (n.setUTCSeconds(t - this.leeway), r < n ? new tr.TokenValidationError("The token is not valid until later in the future. Please check your computed clock.") : null))
      }, ge.prototype.verifyExpAndIat = function (e, t) {
        var r = new Date, i = new Date(0), n = new Date(0);
        return this.__disableExpirationCheck ? null : (i.setUTCSeconds(e + this.leeway), r > i ? new tr.TokenValidationError("Expired token.") : (n.setUTCSeconds(t - this.leeway), r < n ? new tr.TokenValidationError("The token was issued in the future. Please check your computed clock.") : null))
      }, ge.prototype.getRsaVerifier = function (e, t, r) {
        var i = this, n = e + t;
        if (this.jwksCache.has(n)) {
          var o = this.jwksCache.get(n);
          r(null, new $t(o.modulus, o.exp))
        } else er.getJWKS({jwksURI: this.jwksURI, iss: e, kid: t}, function (e, t) {
          return e ? r(e) : (i.jwksCache.set(n, t), r(null, new $t(t.modulus, t.exp)))
        })
      }, ge.prototype.decode = function (e) {
        var t, r, i = e.split(".");
        if (3 !== i.length)return new tr.TokenValidationError("Cannot decode a malformed JWT");
        try {
          t = JSON.parse(Qt.decodeToString(i[0])), r = JSON.parse(Qt.decodeToString(i[1]))
        } catch (e) {
          return new tr.TokenValidationError("Token header or payload is not valid JSON")
        }
        return {header: t, payload: r, encoded: {header: i[0], payload: i[1], signature: i[2]}}
      }, ge.prototype.validateAccessToken = function (e, t, r, i) {
        if (this.expectedAlg !== t)return i(new tr.TokenValidationError("Algorithm " + t + " is not supported. (Expected alg: " + this.expectedAlg + ")"));
        var n = Vt(e), o = Yt.stringify(n), s = o.substring(0, o.length / 2), a = Yt.parse(s), f = Wt.stringify(a);
        return i(Qt.base64ToBase64Url(f) !== r ? new tr.TokenValidationError("Invalid access_token") : null)
      };
      var nr = ge;
      ve.prototype.get = function (e) {
        for (var t = 0; t < this.plugins.length; t++)if (this.plugins[t].supports(e))return this.plugins[t].init();
        return null
      };
      var or = {randomString: we}, sr = "com.auth0.auth.";
      _e.prototype.process = function (e) {
        if (!e.responseType)throw new Error("responseType is required");
        var t = e.realm || e.connection, r = -1 !== e.responseType.indexOf("id_token"), i = this.generateTransaction(e.appState, e.state, e.nonce, t, r);
        return e.state || (e.state = i.state), r && !e.nonce && (e.nonce = i.nonce), e
      }, _e.prototype.generateTransaction = function (e, t, r, i, n) {
        return t = t || or.randomString(this.keyLength), r = r || (n ? or.randomString(this.keyLength) : null), Ut.setItem(this.namespace + t, {
          nonce: r,
          appState: e,
          state: t,
          lastUsedConnection: i
        }, 1 / 48), {state: t, nonce: r}
      }, _e.prototype.getStoredTransaction = function (e) {
        var t;
        return t = Ut.getItem(this.namespace + e), this.clearTransaction(e), t
      }, _e.prototype.clearTransaction = function (e) {
        Ut.removeItem(this.namespace + e)
      }, Se.prototype.init = function () {
        var e = this, t = jt.getWindow();
        switch (this.iframe = t.document.createElement("iframe"), this.iframe.style.display = "none", this.proxyEventListener = function (t) {
          e.eventListener(t)
        }, this.eventListenerType) {
          case"message":
            this.eventSourceObject = t;
            break;
          case"load":
            this.eventSourceObject = this.iframe;
            break;
          default:
            throw new Error("Unsupported event listener type: " + this.eventListenerType)
        }
        this.eventSourceObject.addEventListener(this.eventListenerType, this.proxyEventListener, !1), t.document.body.appendChild(this.iframe), this.iframe.src = this.url, this.timeoutHandle = setTimeout(function () {
          e.timeoutHandler()
        }, this.timeout)
      }, Se.prototype.eventListener = function (e) {
        var t = {event: e, sourceObject: this.eventSourceObject};
        this.eventValidator.isValid(t) && (this.destroy(), this.callback(t))
      }, Se.prototype.timeoutHandler = function () {
        this.destroy(), this.timeoutCallback && this.timeoutCallback()
      }, Se.prototype.destroy = function () {
        var e = this;
        clearTimeout(this.timeoutHandle), this._destroyTimeout = setTimeout(function () {
          e.eventSourceObject.removeEventListener(e.eventListenerType, e.proxyEventListener, !1), e.iframe.parentNode && e.iframe.parentNode.removeChild(e.iframe)
        }, 0)
      }, Ee.prototype.run = function (e, t) {
        var r = this;
        e.responseMode = "web_message", e.prompt = "none";
        var i = jt.getOrigin(), n = Rt.getOriginFromUrl(e.redirectUri);
        if (n && i !== n)return t({
          error: "origin_mismatch",
          error_description: "The redirectUri's origin (" + n + ") should match the window's origin (" + i + ")."
        });
        ke(this.webAuth.client.buildAuthorizeUrl(e), e, function (i, n) {
          var o = i;
          if (!i && n.event.data.response.error && (o = n.event.data.response), !o) {
            var s = n.event.data.response;
            return r.webAuth.validateAuthenticationResponse(e, s, t)
          }
          return "consent_required" === o.error && "localhost" === jt.getWindow().location.hostname && r.warn.warning("Consent Required. Consent can't be skipped on localhost. Read more here: https://auth0.com/docs/api-auth/user-consent#skipping-consent-for-first-party-clients"), r.webAuth.transactionManager.clearTransaction(o.state), t(Rt.pick(o, ["error", "error_description"]))
        })
      }, Me.prototype.login = function (e, t) {
        var r = this, i = Fe(this.baseOptions.rootUrl, "/co/authenticate");
        e.username = e.username || e.email, delete e.email;
        var n = {client_id: e.clientID || this.baseOptions.clientID, username: e.username};
        e.password && (n.password = e.password), e.otp && (n.otp = e.otp);
        var o = e.realm || this.baseOptions.realm;
        if (o) {
          var s = e.credentialType || this.baseOptions.credentialType || "http://auth0.com/oauth/grant-type/password-realm";
          n.realm = o, n.credential_type = s
        } else n.credential_type = "password";
        this.request.post(i).withCredentials().send(n).end(function (i, n) {
          if (i) {
            var o = i.response && i.response.body || {error: "request_error", error_description: JSON.stringify(i)};
            return ee(t, {forceLegacyError: !0})(o)
          }
          var s = !0 === e.popup;
          e = Rt.blacklist(e, ["password", "credentialType", "otp", "popup"]);
          var a = Rt.merge(e).with({loginTicket: n.body.login_ticket}), f = Te(r.baseOptions.rootUrl, n.body.co_id);
          Ut.setItem(f, n.body.co_verifier, {expires: 1 / 96}), s ? r.webMessageHandler.run(a, ee(t, {forceLegacyError: !0})) : r.webAuth.authorize(a)
        })
      }, Me.prototype.callback = function () {
        var e = decodeURIComponent(Ae("origin")), t = jt.getWindow();
        t.addEventListener("message", function (e) {
          if ("co_verifier_request" === e.data.type) {
            var r = Te(e.origin, e.data.request.id), i = xe(t, r);
            e.source.postMessage({type: "co_verifier_response", response: {verifier: i}}, e.origin)
          }
        }), t.parent.postMessage({type: "ready"}, e)
      }, Ie.prototype.loginWithCredentials = function (e, t) {
        e.realm = e.realm || e.connection, delete e.connection, this.crossOriginAuthentication.login(e, t)
      }, Ie.prototype.signupAndLogin = function (e, t) {
        var r = this;
        return this.webAuth.client.dbConnection.signup(e, function (i) {
          return i ? t(i) : (e.realm = e.realm || e.connection, delete e.connection, r.webAuth.login(e, t))
        })
      };
      var ar = i(function (e) {
        var t = function () {
          function e(e, t, r) {
            e.attachEvent ? e.attachEvent("on" + t, r) : e.addEventListener && e.addEventListener(t, r, !1)
          }

          function t(e, t, r) {
            e.detachEvent ? e.detachEvent("on" + t, r) : e.removeEventListener && e.removeEventListener(t, r, !1)
          }

          function r(e) {
            /^https?:\/\//.test(e) || (e = window.location.href);
            var t = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(e);
            return t ? t[1] : e
          }

          var i = "die", n = function () {
            if ("undefined" == typeof navigator)return !1;
            var e = -1, t = navigator.userAgent;
            return "Microsoft Internet Explorer" === navigator.appName ? null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(t) && (e = parseFloat(RegExp.$1)) : t.indexOf("Trident") > -1 && null !== new RegExp("rv:([0-9]{2,2}[.0-9]{0,})").exec(t) && (e = parseFloat(RegExp.$1)), e >= 8
          }();
          return "undefined" != typeof window && window.JSON && window.JSON.stringify && window.JSON.parse && window.postMessage ? {
            open: function (o, s) {
              function a() {
                if (h && document.body.removeChild(h), h = void 0, p && (p = clearInterval(p)), t(window, "message", f), t(window, "unload", a), l)try {
                  l.close()
                } catch (e) {
                  u.postMessage(i, d)
                }
                l = u = void 0
              }

              function f(e) {
                if (e.origin === d) {
                  try {
                    var t = JSON.parse(e.data)
                  } catch (e) {
                    if (!s)throw e;
                    s(e)
                  }
                  "ready" === t.a ? u.postMessage(b, d) : "error" === t.a ? (a(), s && (s(t.d), s = null)) : "response" === t.a && (a(), s && (s(null, t.d), s = null))
                }
              }

              if (!s)throw"missing required callback argument";
              var c, h;
              o.url || (c = "missing required 'url' parameter"), o.relay_url || (c = "missing required 'relay_url' parameter"), c && setTimeout(function () {
                s(c)
              }, 0), o.window_name || (o.window_name = null), o.window_features && !function () {
                try {
                  var e = navigator.userAgent;
                  return -1 != e.indexOf("Fennec/") || -1 != e.indexOf("Firefox/") && -1 != e.indexOf("Android")
                } catch (e) {
                }
                return !1
              }() || (o.window_features = void 0);
              var u, d = o.origin || r(o.url);
              if (d !== r(o.relay_url))return setTimeout(function () {
                s("invalid arguments: origin of url and relay_url must match")
              }, 0);
              n && ((h = document.createElement("iframe")).setAttribute("src", o.relay_url), h.style.display = "none", h.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(h), u = h.contentWindow);
              var l = o.popup || window.open(o.url, o.window_name, o.window_features);
              o.popup && (l.location.href = o.url), u || (u = l);
              var p = setInterval(function () {
                l && l.closed && (a(), s && (s("User closed the popup window"), s = null))
              }, 500), b = JSON.stringify({a: "request", d: o.params});
              return e(window, "unload", a), e(window, "message", f), {
                close: a, focus: function () {
                  if (l)try {
                    l.focus()
                  } catch (e) {
                  }
                }
              }
            }, onOpen: function (r) {
              function o(e) {
                e = JSON.stringify(e), n ? f.doPost(e, a) : f.postMessage(e, a)
              }

              function s(e) {
                if (e.data === i)try {
                  window.close()
                } catch (e) {
                }
              }

              var a = "*", f = n ? function () {
                window.location;
                for (var e = window.opener.frames, t = e.length - 1; t >= 0; t--)try {
                  if (e[t].location.protocol === window.location.protocol && e[t].location.host === window.location.host && "__winchan_relay_frame" === e[t].name)return e[t]
                } catch (e) {
                }
              }() : window.opener;
              if (!f)throw"can't find relay frame";
              e(n ? f : window, "message", function e(i) {
                var n;
                try {
                  n = JSON.parse(i.data)
                } catch (e) {
                }
                n && "request" === n.a && (t(window, "message", e), a = i.origin, r && setTimeout(function () {
                  r(a, n.d, function (e) {
                    r = void 0, o({a: "response", d: e})
                  })
                }, 0))
              }), e(n ? f : window, "message", s);
              try {
                o({a: "ready"})
              } catch (t) {
                e(f, "load", function (e) {
                  o({a: "ready"})
                })
              }
              var c = function () {
                try {
                  t(n ? f : window, "message", s)
                } catch (e) {
                }
                r && o({a: "error", d: "client closed window"}), r = void 0;
                try {
                  window.close()
                } catch (e) {
                }
              };
              return e(window, "unload", c), {
                detach: function () {
                  t(window, "unload", c)
                }
              }
            }
          } : {
            open: function (e, t, r, i) {
              setTimeout(function () {
                i("unsupported browser")
              }, 0)
            }, onOpen: function (e) {
              setTimeout(function () {
                e("unsupported browser")
              }, 0)
            }
          }
        }();
        e.exports && (e.exports = t)
      }), fr = {extractOrigin: Oe};
      Be.prototype.calculatePosition = function (e) {
        var t = e.width || 500, r = e.height || 600, i = jt.getWindow(), n = void 0 !== i.screenX ? i.screenX : i.screenLeft, o = void 0 !== i.screenY ? i.screenY : i.screenTop;
        return {
          width: t,
          height: r,
          left: n + ((void 0 !== i.outerWidth ? i.outerWidth : i.document.body.clientWidth) - t) / 2,
          top: o + ((void 0 !== i.outerHeight ? i.outerHeight : i.document.body.clientHeight) - r) / 2
        }
      }, Be.prototype.preload = function (e) {
        var t = this, r = jt.getWindow(), i = this.calculatePosition(e.popupOptions || {}), n = Rt.merge(i).with(e.popupOptions), o = e.url || "about:blank", s = ot.stringify(n, {
          encode: !1,
          delimiter: ","
        });
        return this._current_popup && !this._current_popup.closed ? this._current_popup : (this._current_popup = r.open(o, "auth0_signup_popup", s), this._current_popup.kill = function () {
          this.close(), t._current_popup = null
        }, this._current_popup)
      }, Be.prototype.load = function (e, t, r, i) {
        var n = this, o = this.calculatePosition(r.popupOptions || {}), s = Rt.merge(o).with(r.popupOptions), a = Rt.merge({
          url: e,
          relay_url: t,
          window_features: ot.stringify(s, {delimiter: ",", encode: !1}),
          popup: this._current_popup
        }).with(r), f = ar.open(a, function (e, t) {
          return n._current_popup = null, i(e, t)
        });
        return f.focus(), f
      }, Ce.prototype.buildPopupHandler = function () {
        var e = this.baseOptions.plugins.get("popup.getPopupHandler");
        return e ? e.getPopupHandler() : new Be
      }, Ce.prototype.preload = function (e) {
        e = e || {};
        var t = this.buildPopupHandler();
        return t.preload(e), t
      }, Ce.prototype.getPopupHandler = function (e, t) {
        return e.popupHandler ? e.popupHandler : t ? this.preload(e) : this.buildPopupHandler()
      }, Ce.prototype.callback = function (e) {
        var t = this, r = jt.getWindow(), i = (e = e || {}).popupOrigin || this.baseOptions.popupOrigin || jt.getOrigin();
        r.opener ? ar.onOpen(function (r, n, o) {
          if (r !== i)return o({
            error: "origin_mismatch",
            error_description: "The popup's origin (" + r + ") should match the `popupOrigin` parameter (" + i + ")."
          });
          t.webAuth.parseHash(e || {}, function (e, t) {
            return o(e || t)
          })
        }) : r.doPost = function (e) {
          r.parent && r.parent.postMessage(e, i)
        }
      }, Ce.prototype.authorize = function (e, t) {
        var r, i, n = {}, o = this.baseOptions.plugins.get("popup.authorize"), s = Rt.merge(this.baseOptions, ["clientID", "scope", "domain", "audience", "tenant", "responseType", "redirectUri", "_csrf", "state", "_intstate", "nonce"]).with(Rt.blacklist(e, ["popupHandler"]));
        return Bt.check(s, {type: "object", message: "options parameter is not valid"}, {
          responseType: {
            type: "string",
            message: "responseType option is required"
          }
        }), i = Fe(this.baseOptions.rootUrl, "relay.html"), e.owp ? s.owp = !0 : (n.origin = fr.extractOrigin(s.redirectUri), i = s.redirectUri), e.popupOptions && (n.popupOptions = Rt.pick(e.popupOptions, ["width", "height"])), o && (s = o.processParams(s)), (s = this.transactionManager.process(s)).scope = s.scope || "openid profile email", delete s.domain, r = this.client.buildAuthorizeUrl(s), this.getPopupHandler(e).load(r, i, n, ee(t))
      }, Ce.prototype.loginWithCredentials = function (e, t) {
        e.realm = e.realm || e.connection, e.popup = !0, e = Rt.merge(this.baseOptions, ["redirectUri", "responseType", "state", "nonce"]).with(Rt.blacklist(e, ["popupHandler", "connection"])), e = this.transactionManager.process(e), this.crossOriginAuthentication.login(e, t)
      }, Ce.prototype.passwordlessVerify = function (e, t) {
        var r = this;
        return this.client.passwordless.verify(Rt.blacklist(e, ["popupHandler"]), function (i) {
          if (i)return t(i);
          e.username = e.phoneNumber || e.email, e.password = e.verificationCode, delete e.email, delete e.phoneNumber, delete e.verificationCode, delete e.type, r.client.loginWithResourceOwner(e, t)
        })
      }, Ce.prototype.signupAndLogin = function (e, t) {
        var r = this, i = this.getPopupHandler(e, !0);
        return e.popupHandler = i, this.client.dbConnection.signup(Rt.blacklist(e, ["popupHandler"]), function (n) {
          if (n)return i._current_popup && i._current_popup.kill(), t(n);
          r.loginWithCredentials(e, t)
        })
      }, Re.create = function (e) {
        return new Re(e)
      }, Re.prototype.login = function (e, t) {
        this.handler = new Se({
          auth0: this.auth0,
          url: this.authenticationUrl,
          eventListenerType: e ? "message" : "load",
          callback: this.getCallbackHandler(t, e),
          timeout: this.timeout,
          eventValidator: this.getEventValidator(),
          timeoutCallback: function () {
            t(null, "#error=timeout&error_description=Timeout+during+authentication+renew.")
          },
          usePostMessage: e || !1
        }), this.handler.init()
      }, Re.prototype.getEventValidator = function () {
        var e = this;
        return {
          isValid: function (t) {
            switch (t.event.type) {
              case"message":
                return t.event.origin === e.postMessageOrigin && t.event.source === e.handler.iframe.contentWindow && (!1 === e.postMessageDataType || t.event.data.type && t.event.data.type === e.postMessageDataType);
              case"load":
                if ("about:" === t.sourceObject.contentWindow.location.protocol)return !1;
              default:
                return !0
            }
          }
        }
      }, Re.prototype.getCallbackHandler = function (e, t) {
        return function (r) {
          var i;
          i = t ? "object" == typeof r.event.data && r.event.data.hash ? r.event.data.hash : r.event.data : r.sourceObject.contentWindow.location.hash, e(null, i)
        }
      }, je.prototype.login = function (e, t) {
        var r, i;
        return r = Fe(this.baseOptions.rootUrl, "usernamepassword", "login"), e.username = e.username || e.email, e = Rt.blacklist(e, ["email"]), i = Rt.merge(this.baseOptions, ["clientID", "redirectUri", "tenant", "responseType", "responseMode", "scope", "audience"]).with(e), i = this.transactionManager.process(i), i = Rt.toSnakeCase(i, ["auth0Client"]), this.request.post(r).send(i).end(ee(t))
      }, je.prototype.callback = function (e) {
        var t, r = jt.getDocument();
        (t = r.createElement("div")).innerHTML = e, r.body.appendChild(t).children[0].submit()
      }, De.prototype.login = function (e, t) {
        if (jt.getWindow().location.host !== this.baseOptions.domain)throw new Error("This method is meant to be used only inside the Universal Login Page.");
        var r, i = Rt.merge(this.baseOptions, ["clientID", "redirectUri", "tenant", "responseType", "responseMode", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        return Bt.check(i, {type: "object", message: "options parameter is not valid"}, {
          responseType: {
            type: "string",
            message: "responseType option is required"
          }
        }), (r = new je(this.baseOptions)).login(i, function (e, i) {
          return e ? t(e) : r.callback(i)
        })
      }, De.prototype.signupAndLogin = function (e, t) {
        var r = this;
        return r.client.client.dbConnection.signup(e, function (i) {
          return i ? t(i) : r.login(e, t)
        })
      }, De.prototype.getSSOData = function (e, t) {
        var r, i = "";
        return "function" == typeof e && (t = e, e = !1), Bt.check(e, {
          type: "boolean",
          message: "withActiveDirectories parameter is not valid"
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), e && (i = "?" + ot.stringify({
            ldaps: 1,
            client_id: this.baseOptions.clientID
          })), r = Fe(this.baseOptions.rootUrl, "user", "ssodata", i), this.request.get(r, {noHeaders: !0}).withCredentials().end(ee(t))
      }, Pe.prototype.parseHash = function (e, t) {
        var r, i;
        t || "function" != typeof e ? e = e || {} : (t = e, e = {});
        var n = jt.getWindow(), o = void 0 === e.hash ? n.location.hash : e.hash;
        if (o = o.replace(/^#?\/?/, ""), (r = ot.parse(o)).hasOwnProperty("error"))return i = Nt.buildResponse(r.error, r.error_description), r.state && (i.state = r.state), t(i);
        if (!r.hasOwnProperty("access_token") && !r.hasOwnProperty("id_token") && !r.hasOwnProperty("refresh_token"))return t(null, null);
        var s = (this.baseOptions.responseType || e.responseType || "").split(" ");
        return s.length > 0 && -1 !== s.indexOf("token") && !r.hasOwnProperty("access_token") ? t(Nt.buildResponse("invalid_hash", "response_type contains `token`, but the parsed hash does not contain an `access_token` property")) : s.length > 0 && -1 !== s.indexOf("id_token") && !r.hasOwnProperty("id_token") ? t(Nt.buildResponse("invalid_hash", "response_type contains `id_token`, but the parsed hash does not contain an `id_token` property")) : this.validateAuthenticationResponse(e, r, t)
      }, Pe.prototype.validateAuthenticationResponse = function (e, t, r) {
        var i = this;
        e.__enableIdPInitiatedLogin = e.__enableIdPInitiatedLogin || e.__enableImpersonation;
        var n = t.state, o = this.transactionManager.getStoredTransaction(n), s = e.state || o && o.state || null, a = s === n;
        if ((n || s || !e.__enableIdPInitiatedLogin) && !a)return r({
          error: "invalid_token",
          errorDescription: "`state` does not match."
        });
        var f = e.nonce || o && o.nonce || null, c = e.state || o && o.appState || null, h = function (e, i) {
          if (e)return r(e);
          var n;
          return o && o.lastUsedConnection && (i && (n = i.sub), Lt.set(o.lastUsedConnection, n)), r(null, qe(t, c, i))
        };
        return t.id_token ? this.validateToken(t.id_token, f, function (e, r) {
          return e ? "invalid_token" !== e.error ? h(e) : "HS256" !== (new nr).decode(t.id_token).header.alg ? h(e) : t.access_token ? i.client.userInfo(t.access_token, function (e, t) {
            return e ? h(e) : h(null, t)
          }) : h({
            error: "invalid_token",
            description: "The id_token cannot be validated because it was signed with the HS256 algorithm and public clients (like a browser) can’t store secrets. Please read the associated doc for possible ways to fix this. Read more: https://auth0.com/docs/errors/libraries/auth0-js/invalid-token#parsing-an-hs256-signed-id-token-without-an-access-token"
          }) : t.access_token && r.at_hash ? (new nr).validateAccessToken(t.access_token, "RS256", r.at_hash, function (e) {
            return e ? h(Nt.invalidToken(e.message)) : h(null, r)
          }) : h(null, r)
        }) : h(null, null)
      }, Pe.prototype.validateToken = function (e, t, r) {
        new nr({
          issuer: this.baseOptions.token_issuer,
          jwksURI: this.baseOptions.jwksURI,
          audience: this.baseOptions.clientID,
          leeway: this.baseOptions.leeway || 0,
          __disableExpirationCheck: this.baseOptions.__disableExpirationCheck
        }).verify(e, t, function (e, t) {
          if (e)return r(Nt.invalidToken(e.message));
          r(null, t)
        })
      }, Pe.prototype.renewAuth = function (e, t) {
        var r = !!e.usePostMessage, i = e.postMessageDataType || !1, n = e.postMessageOrigin || jt.getWindow().origin, o = e.timeout, s = this, a = Rt.merge(this.baseOptions, ["clientID", "redirectUri", "responseType", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        a.responseType = a.responseType || "token", a.responseMode = a.responseMode || "fragment", a = this.transactionManager.process(a), Bt.check(a, {
          type: "object",
          message: "options parameter is not valid"
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), a.prompt = "none", a = Rt.blacklist(a, ["usePostMessage", "tenant", "postMessageDataType", "postMessageOrigin"]), Re.create({
          authenticationUrl: this.client.buildAuthorizeUrl(a),
          postMessageDataType: i,
          postMessageOrigin: n,
          timeout: o
        }).login(r, function (e, r) {
          if ("object" == typeof r)return t(e, r);
          s.parseHash({hash: r}, t)
        })
      }, Pe.prototype.checkSession = function (e, t) {
        var r = Rt.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        if ("code" === r.responseType)return t({error: "error", error_description: "responseType can't be `code`"});
        e.nonce || (r = this.transactionManager.process(r)), Bt.check(r, {
          type: "object",
          message: "options parameter is not valid"
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Rt.blacklist(r, ["usePostMessage", "tenant", "postMessageDataType"]), this.webMessageHandler.run(r, t)
      }, Pe.prototype.changePassword = function (e, t) {
        return this.client.dbConnection.changePassword(e, t)
      }, Pe.prototype.passwordlessStart = function (e, t) {
        var r = Rt.merge(this.baseOptions, ["responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e.authParams);
        return e.authParams = this.transactionManager.process(r), this.client.passwordless.start(e, t)
      }, Pe.prototype.signup = function (e, t) {
        return this.client.dbConnection.signup(e, t)
      }, Pe.prototype.authorize = function (e) {
        var t = Rt.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        Bt.check(t, {type: "object", message: "options parameter is not valid"}, {
          responseType: {
            type: "string",
            message: "responseType option is required"
          }
        }), (t = this.transactionManager.process(t)).scope = t.scope || "openid profile email", jt.redirect(this.client.buildAuthorizeUrl(t))
      }, Pe.prototype.signupAndAuthorize = function (e, t) {
        var r = this;
        return this.client.dbConnection.signup(Rt.blacklist(e, ["popupHandler"]), function (i) {
          if (i)return t(i);
          e.realm = e.connection, e.username || (e.username = e.email), r.client.login(e, t)
        })
      }, Pe.prototype.login = function (e, t) {
        var r = Rt.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        r = this.transactionManager.process(r), jt.getWindow().location.host === this.baseOptions.domain ? (r.connection = r.realm, delete r.realm, this._universalLogin.login(r, t)) : this.crossOriginAuthentication.login(r, t)
      }, Pe.prototype.passwordlessLogin = function (e, t) {
        var r = Rt.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        if (r = this.transactionManager.process(r), jt.getWindow().location.host === this.baseOptions.domain)this.passwordlessVerify(r, t); else {
          var i = Rt.extend({
            credentialType: "http://auth0.com/oauth/grant-type/passwordless/otp",
            realm: r.connection,
            username: r.email || r.phoneNumber,
            otp: r.verificationCode
          }, Rt.blacklist(r, ["connection", "email", "phoneNumber", "verificationCode"]));
          this.crossOriginAuthentication.login(i, t)
        }
      }, Pe.prototype.crossOriginAuthenticationCallback = function () {
        this.crossOriginVerification()
      }, Pe.prototype.crossOriginVerification = function () {
        this.crossOriginAuthentication.callback()
      }, Pe.prototype.logout = function (e) {
        jt.redirect(this.client.buildLogoutUrl(e))
      }, Pe.prototype.passwordlessVerify = function (e, t) {
        var r = this, i = Rt.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(e);
        return Bt.check(i, {type: "object", message: "options parameter is not valid"}, {
          responseType: {
            type: "string",
            message: "responseType option is required"
          }
        }), i = this.transactionManager.process(i), this.client.passwordless.verify(i, function (e) {
          return e ? t(e) : jt.redirect(r.client.passwordless.buildVerifyUrl(i))
        })
      }, Ue.prototype.buildVerifyUrl = function (e) {
        var t, r;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          connection: {
            type: "string",
            message: "connection option is required"
          },
          verificationCode: {type: "string", message: "verificationCode option is required"},
          phoneNumber: {
            optional: !1,
            type: "string",
            message: "phoneNumber option is required",
            condition: function (e) {
              return !e.email
            }
          },
          email: {
            optional: !1, type: "string", message: "email option is required", condition: function (e) {
              return !e.phoneNumber
            }
          }
        }), t = Rt.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "protocol", "nonce"]).with(e), this.baseOptions._sendTelemetry && (t.auth0Client = this.request.getTelemetryData()), t = Rt.toSnakeCase(t, ["auth0Client"]), r = ot.stringify(t), Fe(this.baseOptions.rootUrl, "passwordless", "verify_redirect", "?" + r)
      }, Ue.prototype.start = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          connection: {
            type: "string",
            message: "connection option is required"
          },
          send: {
            type: "string",
            message: "send option is required",
            values: ["link", "code"],
            value_message: "send is not valid ([link, code])"
          },
          phoneNumber: {
            optional: !0,
            type: "string",
            message: "phoneNumber option is required",
            condition: function (e) {
              return "code" === e.send || !e.email
            }
          },
          email: {
            optional: !0, type: "string", message: "email option is required", condition: function (e) {
              return "link" === e.send || !e.phoneNumber
            }
          },
          authParams: {optional: !0, type: "object", message: "authParams option is required"}
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "passwordless", "start"), (i = Rt.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope"]).with(e)).scope && (i.authParams = i.authParams || {}, i.authParams.scope = i.scope), i.redirectUri && (i.authParams = i.authParams || {}, i.authParams.redirect_uri = i.redirectUri), i.responseType && (i.authParams = i.authParams || {}, i.authParams.response_type = i.responseType), delete i.redirectUri, delete i.responseType, delete i.scope, i = Rt.toSnakeCase(i, ["auth0Client", "authParams"]), this.request.post(r).send(i).end(ee(t))
      }, Ue.prototype.verify = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          connection: {
            type: "string",
            message: "connection option is required"
          },
          verificationCode: {type: "string", message: "verificationCode option is required"},
          phoneNumber: {
            optional: !1,
            type: "string",
            message: "phoneNumber option is required",
            condition: function (e) {
              return !e.email
            }
          },
          email: {
            optional: !1, type: "string", message: "email option is required", condition: function (e) {
              return !e.phoneNumber
            }
          }
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), i = Rt.pick(e, ["connection", "verificationCode", "phoneNumber", "email", "auth0Client"]), i = Rt.toSnakeCase(i, ["auth0Client"]), r = Fe(this.baseOptions.rootUrl, "passwordless", "verify"), this.request.post(r).send(i).end(ee(t))
      }, Le.prototype.signup = function (e, t) {
        var r, i, n;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          connection: {
            type: "string",
            message: "connection option is required"
          },
          email: {type: "string", message: "email option is required"},
          password: {type: "string", message: "password option is required"}
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "dbconnections", "signup"), n = (i = Rt.merge(this.baseOptions, ["clientID"]).with(e)).user_metadata || i.userMetadata, i = Rt.blacklist(i, ["scope", "userMetadata", "user_metadata"]), i = Rt.toSnakeCase(i, ["auth0Client"]), n && (i.user_metadata = n), this.request.post(r).send(i).end(ee(t))
      }, Le.prototype.changePassword = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          connection: {
            type: "string",
            message: "connection option is required"
          }, email: {type: "string", message: "email option is required"}
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "dbconnections", "change_password"), i = Rt.merge(this.baseOptions, ["clientID"]).with(e, ["email", "connection"]), i = Rt.toSnakeCase(i, ["auth0Client"]), this.request.post(r).send(i).end(ee(t))
      }, Ne.prototype.buildAuthorizeUrl = function (e) {
        var t, r;
        return Bt.check(e, {
          type: "object",
          message: "options parameter is not valid"
        }), t = Rt.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience"]).with(e), Bt.check(t, {
          type: "object",
          message: "options parameter is not valid"
        }, {
          clientID: {type: "string", message: "clientID option is required"},
          redirectUri: {optional: !0, type: "string", message: "redirectUri option is required"},
          responseType: {type: "string", message: "responseType option is required"},
          nonce: {
            type: "string", message: "nonce option is required", condition: function (e) {
              return -1 === e.responseType.indexOf("code") && -1 !== e.responseType.indexOf("id_token")
            }
          },
          scope: {optional: !0, type: "string", message: "scope option is required"},
          audience: {optional: !0, type: "string", message: "audience option is required"}
        }), this.baseOptions._sendTelemetry && (t.auth0Client = this.request.getTelemetryData()), t.connection_scope && Bt.isArray(t.connection_scope) && (t.connection_scope = t.connection_scope.join(",")), t = Rt.blacklist(t, ["username", "popupOptions", "domain", "tenant", "timeout"]), t = Rt.toSnakeCase(t, ["auth0Client"]), t = Ft.oauthAuthorizeParams(this.warn, t), r = ot.stringify(t), Fe(this.baseOptions.rootUrl, "authorize", "?" + r)
      }, Ne.prototype.buildLogoutUrl = function (e) {
        var t, r;
        return Bt.check(e, {
          optional: !0,
          type: "object",
          message: "options parameter is not valid"
        }), t = Rt.merge(this.baseOptions, ["clientID"]).with(e || {}), this.baseOptions._sendTelemetry && (t.auth0Client = this.request.getTelemetryData()), t = Rt.toSnakeCase(t, ["auth0Client", "returnTo"]), r = ot.stringify(Rt.blacklist(t, ["federated"])), e && void 0 !== e.federated && !1 !== e.federated && "false" !== e.federated && (r += "&federated"), Fe(this.baseOptions.rootUrl, "v2", "logout", "?" + r)
      }, Ne.prototype.loginWithDefaultDirectory = function (e, t) {
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          username: {
            type: "string",
            message: "username option is required"
          },
          password: {type: "string", message: "password option is required"},
          scope: {optional: !0, type: "string", message: "scope option is required"},
          audience: {optional: !0, type: "string", message: "audience option is required"}
        }), e.grantType = "password", this.oauthToken(e, t)
      }, Ne.prototype.login = function (e, t) {
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          username: {
            type: "string",
            message: "username option is required"
          },
          password: {type: "string", message: "password option is required"},
          realm: {type: "string", message: "realm option is required"},
          scope: {optional: !0, type: "string", message: "scope option is required"},
          audience: {optional: !0, type: "string", message: "audience option is required"}
        }), e.grantType = "http://auth0.com/oauth/grant-type/password-realm", this.oauthToken(e, t)
      }, Ne.prototype.oauthToken = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "oauth", "token"), i = Rt.merge(this.baseOptions, ["clientID", "scope", "audience"]).with(e), Bt.check(i, {
          type: "object",
          message: "options parameter is not valid"
        }, {
          clientID: {type: "string", message: "clientID option is required"},
          grantType: {type: "string", message: "grantType option is required"},
          scope: {optional: !0, type: "string", message: "scope option is required"},
          audience: {optional: !0, type: "string", message: "audience option is required"}
        }), i = Rt.toSnakeCase(i, ["auth0Client"]), i = Ft.oauthTokenParams(this.warn, i), this.request.post(r).send(i).end(ee(t))
      }, Ne.prototype.loginWithResourceOwner = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          username: {
            type: "string",
            message: "username option is required"
          },
          password: {type: "string", message: "password option is required"},
          connection: {type: "string", message: "connection option is required"},
          scope: {optional: !0, type: "string", message: "scope option is required"}
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "oauth", "ro"), i = Rt.merge(this.baseOptions, ["clientID", "scope"]).with(e, ["username", "password", "scope", "connection", "device"]), (i = Rt.toSnakeCase(i, ["auth0Client"])).grant_type = i.grant_type || "password", this.request.post(r).send(i).end(ee(t))
      }, Ne.prototype.getSSOData = function (e, t) {
        if (this.auth0 || (this.auth0 = new Pe(this.baseOptions)), jt.getWindow().location.host === this.baseOptions.domain)return this.auth0._universalLogin.getSSOData(e, t);
        "function" == typeof e && (t = e), Bt.check(t, {type: "function", message: "cb parameter is not valid"});
        var r = this.baseOptions.clientID, i = Lt.get() || {};
        this.auth0.checkSession({
          responseType: "token id_token",
          scope: "openid profile email",
          connection: i.lastUsedConnection,
          timeout: 5e3
        }, function (e, n) {
          return e ? "login_required" === e.error ? t(null, {sso: !1}) : ("consent_required" === e.error && (e.error_description = "Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`."), t(e, {sso: !1})) : i.lastUsedSub && i.lastUsedSub !== n.idTokenPayload.sub ? t(e, {sso: !1}) : t(null, {
            lastUsedConnection: {name: i.lastUsedConnection},
            lastUsedUserID: n.idTokenPayload.sub,
            lastUsedUsername: n.idTokenPayload.email || n.idTokenPayload.name,
            lastUsedClientID: r,
            sessionClients: [r],
            sso: !0
          })
        })
      }, Ne.prototype.userInfo = function (e, t) {
        var r;
        return Bt.check(e, {
          type: "string",
          message: "accessToken parameter is not valid"
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "userinfo"), this.request.get(r).set("Authorization", "Bearer " + e).end(ee(t, {ignoreCasing: !0}))
      }, Ne.prototype.delegation = function (e, t) {
        var r, i;
        return Bt.check(e, {type: "object", message: "options parameter is not valid"}, {
          grant_type: {
            type: "string",
            message: "grant_type option is required"
          }
        }), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "delegation"), i = Rt.merge(this.baseOptions, ["clientID"]).with(e), i = Rt.toSnakeCase(i, ["auth0Client"]), this.request.post(r).send(i).end(ee(t))
      }, Ne.prototype.getUserCountry = function (e) {
        var t;
        return Bt.check(e, {
          type: "function",
          message: "cb parameter is not valid"
        }), t = Fe(this.baseOptions.rootUrl, "user", "geoloc", "country"), this.request.get(t).end(ee(e))
      }, ze.prototype.getUser = function (e, t) {
        var r;
        return Bt.check(e, {type: "string", message: "userId parameter is not valid"}), Bt.check(t, {
          type: "function",
          message: "cb parameter is not valid"
        }), r = Fe(this.baseOptions.rootUrl, "users", e), this.request.get(r).end(ee(t, {ignoreCasing: !0}))
      }, ze.prototype.patchUserMetadata = function (e, t, r) {
        var i;
        return Bt.check(e, {type: "string", message: "userId parameter is not valid"}), Bt.check(t, {
          type: "object",
          message: "userMetadata parameter is not valid"
        }), Bt.check(r, {
          type: "function",
          message: "cb parameter is not valid"
        }), i = Fe(this.baseOptions.rootUrl, "users", e), this.request.patch(i).send({user_metadata: t}).end(ee(r, {ignoreCasing: !0}))
      }, ze.prototype.linkUser = function (e, t, r) {
        var i;
        return Bt.check(e, {type: "string", message: "userId parameter is not valid"}), Bt.check(t, {
          type: "string",
          message: "secondaryUserToken parameter is not valid"
        }), Bt.check(r, {
          type: "function",
          message: "cb parameter is not valid"
        }), i = Fe(this.baseOptions.rootUrl, "users", e, "identities"), this.request.post(i).send({link_with: t}).end(ee(r, {ignoreCasing: !0}))
      };
      var cr = {Authentication: Ne, Management: ze, WebAuth: Pe, version: It};
      t.default = cr
    }.call(t, r(6))
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      function i(e) {
        var r = t && t.location || {};
        e = e || r;
        var i, n = {}, o = typeof e;
        if ("blob:" === e.protocol)n = new s(unescape(e.pathname), {}); else if ("string" === o) {
          n = new s(e, {});
          for (i in p)delete n[i]
        } else if ("object" === o) {
          for (i in e)i in p || (n[i] = e[i]);
          void 0 === n.slashes && (n.slashes = d.test(e.href))
        }
        return n
      }

      function n(e) {
        var t = u.exec(e);
        return {protocol: t[1] ? t[1].toLowerCase() : "", slashes: !!t[2], rest: t[3]}
      }

      function o(e, t) {
        for (var r = (t || "/").split("/").slice(0, -1).concat(e.split("/")), i = r.length, n = r[i - 1], o = !1, s = 0; i--;)"." === r[i] ? r.splice(i, 1) : ".." === r[i] ? (r.splice(i, 1), s++) : s && (0 === i && (o = !0), r.splice(i, 1), s--);
        return o && r.unshift(""), "." !== n && ".." !== n || r.push(""), r.join("/")
      }

      function s(e, t, r) {
        if (!(this instanceof s))return new s(e, t, r);
        var a, f, u, d, p, b, y = l.slice(), m = typeof t, g = this, v = 0;
        for ("object" !== m && "string" !== m && (r = t, t = null), r && "function" != typeof r && (r = h.parse), t = i(t), f = n(e || ""), a = !f.protocol && !f.slashes, g.slashes = f.slashes || a && t.slashes, g.protocol = f.protocol || t.protocol || "", e = f.rest, f.slashes || (y[3] = [/(.*)/, "pathname"]); v < y.length; v++)d = y[v], "function" != typeof d ? (u = d[0], b = d[1], u !== u ? g[b] = e : "string" == typeof u ? ~(p = e.indexOf(u)) && ("number" == typeof d[2] ? (g[b] = e.slice(0, p), e = e.slice(p + d[2])) : (g[b] = e.slice(p), e = e.slice(0, p))) : (p = u.exec(e)) && (g[b] = p[1], e = e.slice(0, p.index)), g[b] = g[b] || (a && d[3] ? t[b] || "" : ""), d[4] && (g[b] = g[b].toLowerCase())) : e = d(e);
        r && (g.query = r(g.query)), a && t.slashes && "/" !== g.pathname.charAt(0) && ("" !== g.pathname || "" !== t.pathname) && (g.pathname = o(g.pathname, t.pathname)), c(g.port, g.protocol) || (g.host = g.hostname, g.port = ""), g.username = g.password = "", g.auth && (d = g.auth.split(":"), g.username = d[0] || "", g.password = d[1] || ""), g.origin = g.protocol && g.host && "file:" !== g.protocol ? g.protocol + "//" + g.host : "null", g.href = g.toString()
      }

      function a(e, t, r) {
        var i = this;
        switch (e) {
          case"query":
            "string" == typeof t && t.length && (t = (r || h.parse)(t)), i[e] = t;
            break;
          case"port":
            i[e] = t, c(t, i.protocol) ? t && (i.host = i.hostname + ":" + t) : (i.host = i.hostname, i[e] = "");
            break;
          case"hostname":
            i[e] = t, i.port && (t += ":" + i.port), i.host = t;
            break;
          case"host":
            i[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), i.port = t.pop(), i.hostname = t.join(":")) : (i.hostname = t, i.port = "");
            break;
          case"protocol":
            i.protocol = t.toLowerCase(), i.slashes = !r;
            break;
          case"pathname":
          case"hash":
            if (t) {
              var n = "pathname" === e ? "/" : "#";
              i[e] = t.charAt(0) !== n ? n + t : t
            } else i[e] = t;
            break;
          default:
            i[e] = t
        }
        for (var o = 0; o < l.length; o++) {
          var s = l[o];
          s[4] && (i[s[1]] = i[s[1]].toLowerCase())
        }
        return i.origin = i.protocol && i.host && "file:" !== i.protocol ? i.protocol + "//" + i.host : "null", i.href = i.toString(), i
      }

      function f(e) {
        e && "function" == typeof e || (e = h.stringify);
        var t, r = this, i = r.protocol;
        i && ":" !== i.charAt(i.length - 1) && (i += ":");
        var n = i + (r.slashes ? "//" : "");
        return r.username && (n += r.username, r.password && (n += ":" + r.password), n += "@"), n += r.host + r.pathname, t = "object" == typeof r.query ? e(r.query) : r.query, t && (n += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (n += r.hash), n
      }

      var c = r(154), h = r(146), u = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i, d = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, l = [["#", "hash"], ["?", "query"], function (e) {
        return e.replace("\\", "/")
      }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], p = {
        hash: 1,
        query: 1
      };
      s.prototype = {set: a, toString: f}, s.extractProtocol = n, s.location = i, s.qs = h, e.exports = s
    }).call(t, r(6))
  }, function (e, t, r) {
    var i = r(164), n = r(165);
    e.exports = function (e) {
      return i.isAvailable(function (t) {
        return t ? e(null, new i) : e(null, new n)
      })
    }
  }, function (e, t, r) {
    function i(e) {
      return e.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    function n(e) {
      return o.createHash("sha256").update(e).digest()
    }

    var o = r(106);
    t.generateProofKey = function () {
      var e = i(o.randomBytes(32));
      return {codeVerifier: e, codeChallenge: i(n(e))}
    }, t.generateState = function () {
      return i(o.randomBytes(32))
    }
  }, function (e, t) {
    function r() {
    }

    r.clean = function () {
      r.current = function () {
        return !1
      }, r.isClosing = !1
    }, r.closing = function () {
      r.isClosing = !0
    }, r.start = function (e) {
      r.current(new Error("Only one instance of auth can happen at a time")), r.current = e
    }, r.onRedirectUri = function (e) {
      r.current(null, e) && r.clean()
    }, e.exports = r
  }, function (e, t) {
    function r() {
      var e = navigator.userAgent;
      return /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) && !window.MSStream ? "ios" : void 0
    }

    e.exports = {getOS: r}
  }, function (e, t) {
    e.exports = {raw: "0.3.0"}
  }, function (e, t, r) {
    function i(e, t) {
      this.name = e, this.body = t, this.decoders = {}, this.encoders = {}
    }

    var n = r(13), o = r(0);
    t.define = function (e, t) {
      return new i(e, t)
    }, i.prototype._createNamed = function (e) {
      var t;
      try {
        t = r(162).runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
      } catch (e) {
        t = function (e) {
          this._initNamed(e)
        }
      }
      return o(t, e), t.prototype._initNamed = function (t) {
        e.call(this, t)
      }, new t(this)
    }, i.prototype._getDecoder = function (e) {
      return e = e || "der", this.decoders.hasOwnProperty(e) || (this.decoders[e] = this._createNamed(n.decoders[e])), this.decoders[e]
    }, i.prototype.decode = function (e, t, r) {
      return this._getDecoder(t).decode(e, r)
    }, i.prototype._getEncoder = function (e) {
      return e = e || "der", this.encoders.hasOwnProperty(e) || (this.encoders[e] = this._createNamed(n.encoders[e])), this.encoders[e]
    }, i.prototype.encode = function (e, t, r) {
      return this._getEncoder(t).encode(e, r)
    }
  }, function (e, t, r) {
    function i(e, t) {
      var r = {};
      this._baseState = r, r.enc = e, r.parent = t || null, r.children = null, r.tag = null, r.args = null, r.reverseArgs = null, r.choice = null, r.optional = !1, r.any = !1, r.obj = !1, r.use = null, r.useDecoder = null, r.key = null, r.default = null, r.explicit = null, r.implicit = null, r.contains = null, r.parent || (r.children = [], this._wrap())
    }

    var n = r(14).Reporter, o = r(14).EncoderBuffer, s = r(14).DecoderBuffer, a = r(5), f = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"], c = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(f), h = ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"];
    e.exports = i;
    var u = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
    i.prototype.clone = function () {
      var e = this._baseState, t = {};
      u.forEach(function (r) {
        t[r] = e[r]
      });
      var r = new this.constructor(t.parent);
      return r._baseState = t, r
    }, i.prototype._wrap = function () {
      var e = this._baseState;
      c.forEach(function (t) {
        this[t] = function () {
          var r = new this.constructor(this);
          return e.children.push(r), r[t].apply(r, arguments)
        }
      }, this)
    }, i.prototype._init = function (e) {
      var t = this._baseState;
      a(null === t.parent), e.call(this), t.children = t.children.filter(function (e) {
        return e._baseState.parent === this
      }, this), a.equal(t.children.length, 1, "Root node can have only one child")
    }, i.prototype._useArgs = function (e) {
      var t = this._baseState, r = e.filter(function (e) {
        return e instanceof this.constructor
      }, this);
      e = e.filter(function (e) {
        return !(e instanceof this.constructor)
      }, this), 0 !== r.length && (a(null === t.children), t.children = r, r.forEach(function (e) {
        e._baseState.parent = this
      }, this)), 0 !== e.length && (a(null === t.args), t.args = e, t.reverseArgs = e.map(function (e) {
        if ("object" != typeof e || e.constructor !== Object)return e;
        var t = {};
        return Object.keys(e).forEach(function (r) {
          r == (0 | r) && (r |= 0);
          var i = e[r];
          t[i] = r
        }), t
      }))
    }, h.forEach(function (e) {
      i.prototype[e] = function () {
        var t = this._baseState;
        throw new Error(e + " not implemented for encoding: " + t.enc)
      }
    }), f.forEach(function (e) {
      i.prototype[e] = function () {
        var t = this._baseState, r = Array.prototype.slice.call(arguments);
        return a(null === t.tag), t.tag = e, this._useArgs(r), this
      }
    }), i.prototype.use = function (e) {
      a(e);
      var t = this._baseState;
      return a(null === t.use), t.use = e, this
    }, i.prototype.optional = function () {
      return this._baseState.optional = !0, this
    }, i.prototype.def = function (e) {
      var t = this._baseState;
      return a(null === t.default), t.default = e, t.optional = !0, this
    }, i.prototype.explicit = function (e) {
      var t = this._baseState;
      return a(null === t.explicit && null === t.implicit), t.explicit = e, this
    }, i.prototype.implicit = function (e) {
      var t = this._baseState;
      return a(null === t.explicit && null === t.implicit), t.implicit = e, this
    }, i.prototype.obj = function () {
      var e = this._baseState, t = Array.prototype.slice.call(arguments);
      return e.obj = !0, 0 !== t.length && this._useArgs(t), this
    }, i.prototype.key = function (e) {
      var t = this._baseState;
      return a(null === t.key), t.key = e, this
    }, i.prototype.any = function () {
      return this._baseState.any = !0, this
    }, i.prototype.choice = function (e) {
      var t = this._baseState;
      return a(null === t.choice), t.choice = e, this._useArgs(Object.keys(e).map(function (t) {
        return e[t]
      })), this
    }, i.prototype.contains = function (e) {
      var t = this._baseState;
      return a(null === t.use), t.contains = e, this
    }, i.prototype._decode = function (e, t) {
      var r = this._baseState;
      if (null === r.parent)return e.wrapResult(r.children[0]._decode(e, t));
      var i = r.default, n = !0, o = null;
      if (null !== r.key && (o = e.enterKey(r.key)), r.optional) {
        var a = null;
        if (null !== r.explicit ? a = r.explicit : null !== r.implicit ? a = r.implicit : null !== r.tag && (a = r.tag), null !== a || r.any) {
          if (n = this._peekTag(e, a, r.any), e.isError(n))return n
        } else {
          var f = e.save();
          try {
            null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t), n = !0
          } catch (e) {
            n = !1
          }
          e.restore(f)
        }
      }
      var c;
      if (r.obj && n && (c = e.enterObject()), n) {
        if (null !== r.explicit) {
          var h = this._decodeTag(e, r.explicit);
          if (e.isError(h))return h;
          e = h
        }
        var u = e.offset;
        if (null === r.use && null === r.choice) {
          if (r.any)var f = e.save();
          var d = this._decodeTag(e, null !== r.implicit ? r.implicit : r.tag, r.any);
          if (e.isError(d))return d;
          r.any ? i = e.raw(f) : e = d
        }
        if (t && t.track && null !== r.tag && t.track(e.path(), u, e.length, "tagged"), t && t.track && null !== r.tag && t.track(e.path(), e.offset, e.length, "content"), i = r.any ? i : null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t), e.isError(i))return i;
        if (r.any || null !== r.choice || null === r.children || r.children.forEach(function (r) {
            r._decode(e, t)
          }), r.contains && ("octstr" === r.tag || "bitstr" === r.tag)) {
          var l = new s(i);
          i = this._getUse(r.contains, e._reporterState.obj)._decode(l, t)
        }
      }
      return r.obj && n && (i = e.leaveObject(c)), null === r.key || null === i && !0 !== n ? null !== o && e.exitKey(o) : e.leaveKey(o, r.key, i), i
    }, i.prototype._decodeGeneric = function (e, t, r) {
      var i = this._baseState;
      return "seq" === e || "set" === e ? null : "seqof" === e || "setof" === e ? this._decodeList(t, e, i.args[0], r) : /str$/.test(e) ? this._decodeStr(t, e, r) : "objid" === e && i.args ? this._decodeObjid(t, i.args[0], i.args[1], r) : "objid" === e ? this._decodeObjid(t, null, null, r) : "gentime" === e || "utctime" === e ? this._decodeTime(t, e, r) : "null_" === e ? this._decodeNull(t, r) : "bool" === e ? this._decodeBool(t, r) : "objDesc" === e ? this._decodeStr(t, e, r) : "int" === e || "enum" === e ? this._decodeInt(t, i.args && i.args[0], r) : null !== i.use ? this._getUse(i.use, t._reporterState.obj)._decode(t, r) : t.error("unknown tag: " + e)
    }, i.prototype._getUse = function (e, t) {
      var r = this._baseState;
      return r.useDecoder = this._use(e, t), a(null === r.useDecoder._baseState.parent), r.useDecoder = r.useDecoder._baseState.children[0], r.implicit !== r.useDecoder._baseState.implicit && (r.useDecoder = r.useDecoder.clone(), r.useDecoder._baseState.implicit = r.implicit), r.useDecoder
    }, i.prototype._decodeChoice = function (e, t) {
      var r = this._baseState, i = null, n = !1;
      return Object.keys(r.choice).some(function (o) {
        var s = e.save(), a = r.choice[o];
        try {
          var f = a._decode(e, t);
          if (e.isError(f))return !1;
          i = {type: o, value: f}, n = !0
        } catch (t) {
          return e.restore(s), !1
        }
        return !0
      }, this), n ? i : e.error("Choice not matched")
    }, i.prototype._createEncoderBuffer = function (e) {
      return new o(e, this.reporter)
    }, i.prototype._encode = function (e, t, r) {
      var i = this._baseState;
      if (null === i.default || i.default !== e) {
        var n = this._encodeValue(e, t, r);
        if (void 0 !== n && !this._skipDefault(n, t, r))return n
      }
    }, i.prototype._encodeValue = function (e, t, r) {
      var i = this._baseState;
      if (null === i.parent)return i.children[0]._encode(e, t || new n);
      var o = null;
      if (this.reporter = t, i.optional && void 0 === e) {
        if (null === i.default)return;
        e = i.default
      }
      var s = null, a = !1;
      if (i.any)o = this._createEncoderBuffer(e); else if (i.choice)o = this._encodeChoice(e, t); else if (i.contains)s = this._getUse(i.contains, r)._encode(e, t), a = !0; else if (i.children)s = i.children.map(function (r) {
        if ("null_" === r._baseState.tag)return r._encode(null, t, e);
        if (null === r._baseState.key)return t.error("Child should have a key");
        var i = t.enterKey(r._baseState.key);
        if ("object" != typeof e)return t.error("Child expected, but input is not object");
        var n = r._encode(e[r._baseState.key], t, e);
        return t.leaveKey(i), n
      }, this).filter(function (e) {
        return e
      }), s = this._createEncoderBuffer(s); else if ("seqof" === i.tag || "setof" === i.tag) {
        if (!i.args || 1 !== i.args.length)return t.error("Too many args for : " + i.tag);
        if (!Array.isArray(e))return t.error("seqof/setof, but data is not Array");
        var f = this.clone();
        f._baseState.implicit = null, s = this._createEncoderBuffer(e.map(function (r) {
          var i = this._baseState;
          return this._getUse(i.args[0], e)._encode(r, t)
        }, f))
      } else null !== i.use ? o = this._getUse(i.use, r)._encode(e, t) : (s = this._encodePrimitive(i.tag, e), a = !0);
      var o;
      if (!i.any && null === i.choice) {
        var c = null !== i.implicit ? i.implicit : i.tag, h = null === i.implicit ? "universal" : "context";
        null === c ? null === i.use && t.error("Tag could be omitted only for .use()") : null === i.use && (o = this._encodeComposite(c, a, h, s))
      }
      return null !== i.explicit && (o = this._encodeComposite(i.explicit, !1, "context", o)), o
    }, i.prototype._encodeChoice = function (e, t) {
      var r = this._baseState, i = r.choice[e.type];
      return i || a(!1, e.type + " not found in " + JSON.stringify(Object.keys(r.choice))), i._encode(e.value, t)
    }, i.prototype._encodePrimitive = function (e, t) {
      var r = this._baseState;
      if (/str$/.test(e))return this._encodeStr(t, e);
      if ("objid" === e && r.args)return this._encodeObjid(t, r.reverseArgs[0], r.args[1]);
      if ("objid" === e)return this._encodeObjid(t, null, null);
      if ("gentime" === e || "utctime" === e)return this._encodeTime(t, e);
      if ("null_" === e)return this._encodeNull();
      if ("int" === e || "enum" === e)return this._encodeInt(t, r.args && r.reverseArgs[0]);
      if ("bool" === e)return this._encodeBool(t);
      if ("objDesc" === e)return this._encodeStr(t, e);
      throw new Error("Unsupported tag: " + e)
    }, i.prototype._isNumstr = function (e) {
      return /^[0-9 ]*$/.test(e)
    }, i.prototype._isPrintstr = function (e) {
      return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e)
    }
  }, function (e, t, r) {
    function i(e) {
      this._reporterState = {obj: null, path: [], options: e || {}, errors: []}
    }

    function n(e, t) {
      this.path = e, this.rethrow(t)
    }

    var o = r(0);
    t.Reporter = i, i.prototype.isError = function (e) {
      return e instanceof n
    }, i.prototype.save = function () {
      var e = this._reporterState;
      return {obj: e.obj, pathLen: e.path.length}
    }, i.prototype.restore = function (e) {
      var t = this._reporterState;
      t.obj = e.obj, t.path = t.path.slice(0, e.pathLen)
    }, i.prototype.enterKey = function (e) {
      return this._reporterState.path.push(e)
    }, i.prototype.exitKey = function (e) {
      var t = this._reporterState;
      t.path = t.path.slice(0, e - 1)
    }, i.prototype.leaveKey = function (e, t, r) {
      var i = this._reporterState;
      this.exitKey(e), null !== i.obj && (i.obj[t] = r)
    }, i.prototype.path = function () {
      return this._reporterState.path.join("/")
    }, i.prototype.enterObject = function () {
      var e = this._reporterState, t = e.obj;
      return e.obj = {}, t
    }, i.prototype.leaveObject = function (e) {
      var t = this._reporterState, r = t.obj;
      return t.obj = e, r
    }, i.prototype.error = function (e) {
      var t, r = this._reporterState, i = e instanceof n;
      if (t = i ? e : new n(r.path.map(function (e) {
          return "[" + JSON.stringify(e) + "]"
        }).join(""), e.message || e, e.stack), !r.options.partial)throw t;
      return i || r.errors.push(t), t
    }, i.prototype.wrapResult = function (e) {
      var t = this._reporterState;
      return t.options.partial ? {result: this.isError(e) ? null : e, errors: t.errors} : e
    }, o(n, Error), n.prototype.rethrow = function (e) {
      if (this.message = e + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, n), !this.stack)try {
        throw new Error(this.message)
      } catch (e) {
        this.stack = e.stack
      }
      return this
    }
  }, function (e, t, r) {
    var i = r(38);
    t.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, t.tagClassByName = i._reverse(t.tagClass), t.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    }, t.tagByName = i._reverse(t.tag)
  }, function (e, t, r) {
    var i = t;
    i.der = r(39), i.pem = r(84)
  }, function (e, t, r) {
    function i(e) {
      s.call(this, e), this.enc = "pem"
    }

    var n = r(0), o = r(2).Buffer, s = r(39);
    n(i, s), e.exports = i, i.prototype.decode = function (e, t) {
      for (var r = e.toString().split(/[\r\n]+/g), i = t.label.toUpperCase(), n = /^-----(BEGIN|END) ([^-]+)-----$/, a = -1, f = -1, c = 0; c < r.length; c++) {
        var h = r[c].match(n);
        if (null !== h && h[2] === i) {
          if (-1 !== a) {
            if ("END" !== h[1])break;
            f = c;
            break
          }
          if ("BEGIN" !== h[1])break;
          a = c
        }
      }
      if (-1 === a || -1 === f)throw new Error("PEM section not found for: " + i);
      var u = r.slice(a + 1, f).join("");
      u.replace(/[^a-z0-9\+\/=]+/gi, "");
      var d = new o(u, "base64");
      return s.prototype.decode.call(this, d, t)
    }
  }, function (e, t, r) {
    var i = t;
    i.der = r(40), i.pem = r(86)
  }, function (e, t, r) {
    function i(e) {
      o.call(this, e), this.enc = "pem"
    }

    var n = r(0), o = r(40);
    n(i, o), e.exports = i, i.prototype.encode = function (e, t) {
      for (var r = o.prototype.encode.call(this, e), i = r.toString("base64"), n = ["-----BEGIN " + t.label + "-----"], s = 0; s < i.length; s += 64)n.push(i.slice(s, s + 64));
      return n.push("-----END " + t.label + "-----"), n.join("\n")
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      var t = e.length;
      if (t % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
      var r = e.indexOf("=");
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function n(e) {
      var t = i(e), r = t[0], n = t[1];
      return 3 * (r + n) / 4 - n
    }

    function o(e, t, r) {
      return 3 * (t + r) / 4 - r
    }

    function s(e) {
      for (var t, r = i(e), n = r[0], s = r[1], a = new d(o(e, n, s)), f = 0, c = s > 0 ? n - 4 : n, h = 0; h < c; h += 4)t = u[e.charCodeAt(h)] << 18 | u[e.charCodeAt(h + 1)] << 12 | u[e.charCodeAt(h + 2)] << 6 | u[e.charCodeAt(h + 3)], a[f++] = t >> 16 & 255, a[f++] = t >> 8 & 255, a[f++] = 255 & t;
      return 2 === s && (t = u[e.charCodeAt(h)] << 2 | u[e.charCodeAt(h + 1)] >> 4, a[f++] = 255 & t), 1 === s && (t = u[e.charCodeAt(h)] << 10 | u[e.charCodeAt(h + 1)] << 4 | u[e.charCodeAt(h + 2)] >> 2, a[f++] = t >> 8 & 255, a[f++] = 255 & t), a
    }

    function a(e) {
      return h[e >> 18 & 63] + h[e >> 12 & 63] + h[e >> 6 & 63] + h[63 & e]
    }

    function f(e, t, r) {
      for (var i, n = [], o = t; o < r; o += 3)i = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), n.push(a(i));
      return n.join("")
    }

    function c(e) {
      for (var t, r = e.length, i = r % 3, n = [], o = 0, s = r - i; o < s; o += 16383)n.push(f(e, o, o + 16383 > s ? s : o + 16383));
      return 1 === i ? (t = e[r - 1], n.push(h[t >> 2] + h[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], n.push(h[t >> 10] + h[t >> 4 & 63] + h[t << 2 & 63] + "=")), n.join("")
    }

    t.byteLength = n, t.toByteArray = s, t.fromByteArray = c;
    for (var h = [], u = [], d = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, b = l.length; p < b; ++p)h[p] = l[p], u[l.charCodeAt(p)] = p;
    u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
  }, function (e, t, r) {
    function i(e, t, r) {
      d.call(this), this._cache = new n, this._last = void 0, this._cipher = new l.AES(t), this._prev = c.from(r), this._mode = e, this._autopadding = !0
    }

    function n() {
      this.cache = c.allocUnsafe(0)
    }

    function o(e) {
      var t = e[15];
      if (t < 1 || t > 16)throw new Error("unable to decrypt data");
      for (var r = -1; ++r < t;)if (e[r + (16 - t)] !== t)throw new Error("unable to decrypt data");
      if (16 !== t)return e.slice(0, 16 - t)
    }

    function s(e, t, r) {
      var n = h[e.toLowerCase()];
      if (!n)throw new TypeError("invalid suite type");
      if ("string" == typeof r && (r = c.from(r)), "GCM" !== n.mode && r.length !== n.iv)throw new TypeError("invalid iv length " + r.length);
      if ("string" == typeof t && (t = c.from(t)), t.length !== n.key / 8)throw new TypeError("invalid key length " + t.length);
      return "stream" === n.type ? new u(n.module, t, r, !0) : "auth" === n.type ? new f(n.module, t, r, !0) : new i(n.module, t, r)
    }

    function a(e, t) {
      var r = h[e.toLowerCase()];
      if (!r)throw new TypeError("invalid suite type");
      var i = p(t, !1, r.key, r.iv);
      return s(e, i.key, i.iv)
    }

    var f = r(42), c = r(1).Buffer, h = r(25), u = r(46), d = r(8), l = r(19), p = r(21);
    r(0)(i, d), i.prototype._update = function (e) {
      this._cache.add(e);
      for (var t, r, i = []; t = this._cache.get(this._autopadding);)r = this._mode.decrypt(this, t), i.push(r);
      return c.concat(i)
    }, i.prototype._final = function () {
      var e = this._cache.flush();
      if (this._autopadding)return o(this._mode.decrypt(this, e));
      if (e)throw new Error("data not multiple of block length")
    }, i.prototype.setAutoPadding = function (e) {
      return this._autopadding = !!e, this
    }, n.prototype.add = function (e) {
      this.cache = c.concat([this.cache, e])
    }, n.prototype.get = function (e) {
      var t;
      if (e) {
        if (this.cache.length > 16)return t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), t
      } else if (this.cache.length >= 16)return t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), t;
      return null
    }, n.prototype.flush = function () {
      if (this.cache.length)return this.cache
    }, t.createDecipher = a, t.createDecipheriv = s
  }, function (e, t, r) {
    function i(e, t, r) {
      u.call(this), this._cache = new n, this._cipher = new d.AES(t), this._prev = c.from(r), this._mode = e, this._autopadding = !0
    }

    function n() {
      this.cache = c.allocUnsafe(0)
    }

    function o(e, t, r) {
      var n = a[e.toLowerCase()];
      if (!n)throw new TypeError("invalid suite type");
      if ("string" == typeof t && (t = c.from(t)), t.length !== n.key / 8)throw new TypeError("invalid key length " + t.length);
      if ("string" == typeof r && (r = c.from(r)), "GCM" !== n.mode && r.length !== n.iv)throw new TypeError("invalid iv length " + r.length);
      return "stream" === n.type ? new h(n.module, t, r) : "auth" === n.type ? new f(n.module, t, r) : new i(n.module, t, r)
    }

    function s(e, t) {
      var r = a[e.toLowerCase()];
      if (!r)throw new TypeError("invalid suite type");
      var i = l(t, !1, r.key, r.iv);
      return o(e, i.key, i.iv)
    }

    var a = r(25), f = r(42), c = r(1).Buffer, h = r(46), u = r(8), d = r(19), l = r(21);
    r(0)(i, u), i.prototype._update = function (e) {
      this._cache.add(e);
      for (var t, r, i = []; t = this._cache.get();)r = this._mode.encrypt(this, t), i.push(r);
      return c.concat(i)
    };
    var p = c.alloc(16, 16);
    i.prototype._final = function () {
      var e = this._cache.flush();
      if (this._autopadding)return e = this._mode.encrypt(this, e), this._cipher.scrub(), e;
      if (!e.equals(p))throw this._cipher.scrub(), new Error("data not multiple of block length")
    }, i.prototype.setAutoPadding = function (e) {
      return this._autopadding = !!e, this
    }, n.prototype.add = function (e) {
      this.cache = c.concat([this.cache, e])
    }, n.prototype.get = function () {
      if (this.cache.length > 15) {
        var e = this.cache.slice(0, 16);
        return this.cache = this.cache.slice(16), e
      }
      return null
    }, n.prototype.flush = function () {
      for (var e = 16 - this.cache.length, t = c.allocUnsafe(e), r = -1; ++r < e;)t.writeUInt8(e, r);
      return c.concat([this.cache, t])
    }, t.createCipheriv = o, t.createCipher = s
  }, function (e, t, r) {
    function i(e) {
      return [e.readUInt32BE(0), e.readUInt32BE(4), e.readUInt32BE(8), e.readUInt32BE(12)]
    }

    function n(e) {
      var t = s.allocUnsafe(16);
      return t.writeUInt32BE(e[0] >>> 0, 0), t.writeUInt32BE(e[1] >>> 0, 4), t.writeUInt32BE(e[2] >>> 0, 8), t.writeUInt32BE(e[3] >>> 0, 12), t
    }

    function o(e) {
      this.h = e, this.state = s.alloc(16, 0), this.cache = s.allocUnsafe(0)
    }

    var s = r(1).Buffer, a = s.alloc(16, 0);
    o.prototype.ghash = function (e) {
      for (var t = -1; ++t < e.length;)this.state[t] ^= e[t];
      this._multiply()
    }, o.prototype._multiply = function () {
      for (var e, t, r, o = i(this.h), s = [0, 0, 0, 0], a = -1; ++a < 128;) {
        for (t = 0 != (this.state[~~(a / 8)] & 1 << 7 - a % 8), t && (s[0] ^= o[0], s[1] ^= o[1], s[2] ^= o[2], s[3] ^= o[3]), r = 0 != (1 & o[3]), e = 3; e > 0; e--)o[e] = o[e] >>> 1 | (1 & o[e - 1]) << 31;
        o[0] = o[0] >>> 1, r && (o[0] = o[0] ^ 225 << 24)
      }
      this.state = n(s)
    }, o.prototype.update = function (e) {
      this.cache = s.concat([this.cache, e]);
      for (var t; this.cache.length >= 16;)t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(t)
    }, o.prototype.final = function (e, t) {
      return this.cache.length && this.ghash(s.concat([this.cache, a], 16)), this.ghash(n([0, e, 0, t])), this.state
    }, e.exports = o
  }, function (e, t, r) {
    var i = r(15);
    t.encrypt = function (e, t) {
      var r = i(t, e._prev);
      return e._prev = e._cipher.encryptBlock(r), e._prev
    }, t.decrypt = function (e, t) {
      var r = e._prev;
      e._prev = t;
      var n = e._cipher.decryptBlock(t);
      return i(n, r)
    }
  }, function (e, t, r) {
    function i(e, t, r) {
      var i = t.length, s = o(t, e._cache);
      return e._cache = e._cache.slice(i), e._prev = n.concat([e._prev, r ? t : s]), s
    }

    var n = r(1).Buffer, o = r(15);
    t.encrypt = function (e, t, r) {
      for (var o, s = n.allocUnsafe(0); t.length;) {
        if (0 === e._cache.length && (e._cache = e._cipher.encryptBlock(e._prev), e._prev = n.allocUnsafe(0)), !(e._cache.length <= t.length)) {
          s = n.concat([s, i(e, t, r)]);
          break
        }
        o = e._cache.length, s = n.concat([s, i(e, t.slice(0, o), r)]), t = t.slice(o)
      }
      return s
    }
  }, function (e, t, r) {
    function i(e, t, r) {
      for (var i, o, s, a = -1, f = 0; ++a < 8;)i = e._cipher.encryptBlock(e._prev), o = t & 1 << 7 - a ? 128 : 0, s = i[0] ^ o, f += (128 & s) >> a % 8, e._prev = n(e._prev, r ? o : s);
      return f
    }

    function n(e, t) {
      var r = e.length, i = -1, n = o.allocUnsafe(e.length);
      for (e = o.concat([e, o.from([t])]); ++i < r;)n[i] = e[i] << 1 | e[i + 1] >> 7;
      return n
    }

    var o = r(1).Buffer;
    t.encrypt = function (e, t, r) {
      for (var n = t.length, s = o.allocUnsafe(n), a = -1; ++a < n;)s[a] = i(e, t[a], r);
      return s
    }
  }, function (e, t, r) {
    function i(e, t, r) {
      var i = e._cipher.encryptBlock(e._prev), o = i[0] ^ t;
      return e._prev = n.concat([e._prev.slice(1), n.from([r ? t : o])]), o
    }

    var n = r(1).Buffer;
    t.encrypt = function (e, t, r) {
      for (var o = t.length, s = n.allocUnsafe(o), a = -1; ++a < o;)s[a] = i(e, t[a], r);
      return s
    }
  }, function (e, t) {
    t.encrypt = function (e, t) {
      return e._cipher.encryptBlock(t)
    }, t.decrypt = function (e, t) {
      return e._cipher.decryptBlock(t)
    }
  }, function (e, t, r) {
    (function (e) {
      function i(e) {
        return e._prev = e._cipher.encryptBlock(e._prev), e._prev
      }

      var n = r(15);
      t.encrypt = function (t, r) {
        for (; t._cache.length < r.length;)t._cache = e.concat([t._cache, i(t)]);
        var o = t._cache.slice(0, r.length);
        return t._cache = t._cache.slice(r.length), n(r, o)
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    function i(e, t) {
      e = e.toLowerCase();
      var r, i;
      if (h[e])r = h[e].key, i = h[e].iv; else {
        if (!u[e])throw new TypeError("invalid suite type");
        r = 8 * u[e].key, i = u[e].iv
      }
      var n = d(t, !1, r, i);
      return o(e, n.key, n.iv)
    }

    function n(e, t) {
      e = e.toLowerCase();
      var r, i;
      if (h[e])r = h[e].key, i = h[e].iv; else {
        if (!u[e])throw new TypeError("invalid suite type");
        r = 8 * u[e].key, i = u[e].iv
      }
      var n = d(t, !1, r, i);
      return s(e, n.key, n.iv)
    }

    function o(e, t, r) {
      if (e = e.toLowerCase(), h[e])return c.createCipheriv(e, t, r);
      if (u[e])return new f({key: t, iv: r, mode: e});
      throw new TypeError("invalid suite type")
    }

    function s(e, t, r) {
      if (e = e.toLowerCase(), h[e])return c.createDecipheriv(e, t, r);
      if (u[e])return new f({key: t, iv: r, mode: e, decrypt: !0});
      throw new TypeError("invalid suite type")
    }

    function a() {
      return Object.keys(u).concat(c.getCiphers())
    }

    var f = r(98), c = r(24), h = r(25), u = r(99), d = r(21);
    t.createCipher = t.Cipher = i, t.createCipheriv = t.Cipheriv = o, t.createDecipher = t.Decipher = n, t.createDecipheriv = t.Decipheriv = s, t.listCiphers = t.getCiphers = a
  }, function (e, t, r) {
    function i(e) {
      n.call(this);
      var t, r = e.mode.toLowerCase(), i = f[r];
      t = e.decrypt ? "decrypt" : "encrypt";
      var o = e.key;
      a.isBuffer(o) || (o = a.from(o)), "des-ede" !== r && "des-ede-cbc" !== r || (o = a.concat([o, o.slice(0, 8)]));
      var s = e.iv;
      a.isBuffer(s) || (s = a.from(s)), this._des = i.create({key: o, iv: s, type: t})
    }

    var n = r(8), o = r(27), s = r(0), a = r(1).Buffer, f = {
      "des-ede3-cbc": o.CBC.instantiate(o.EDE),
      "des-ede3": o.EDE,
      "des-ede-cbc": o.CBC.instantiate(o.EDE),
      "des-ede": o.EDE,
      "des-cbc": o.CBC.instantiate(o.DES),
      "des-ecb": o.DES
    };
    f.des = f["des-cbc"], f.des3 = f["des-ede3-cbc"], e.exports = i, s(i, n), i.prototype._update = function (e) {
      return a.from(this._des.update(e))
    }, i.prototype._final = function () {
      return a.from(this._des.final())
    }
  }, function (e, t) {
    t["des-ecb"] = {key: 8, iv: 0}, t["des-cbc"] = t.des = {key: 8, iv: 8}, t["des-ede3-cbc"] = t.des3 = {
      key: 24,
      iv: 8
    }, t["des-ede3"] = {key: 24, iv: 0}, t["des-ede-cbc"] = {key: 16, iv: 8}, t["des-ede"] = {key: 16, iv: 0}
  }, function (e, t, r) {
    e.exports = r(47)
  }, function (e, t, r) {
    (function (t) {
      function i(e) {
        f.Writable.call(this);
        var t = d[e];
        if (!t)throw new Error("Unknown message digest");
        this._hashType = t.hash, this._hash = a(t.hash), this._tag = t.id, this._signType = t.sign
      }

      function n(e) {
        f.Writable.call(this);
        var t = d[e];
        if (!t)throw new Error("Unknown message digest");
        this._hash = a(t.hash), this._tag = t.id, this._signType = t.sign
      }

      function o(e) {
        return new i(e)
      }

      function s(e) {
        return new n(e)
      }

      var a = r(17), f = r(35), c = r(0), h = r(102), u = r(103), d = r(47);
      Object.keys(d).forEach(function (e) {
        d[e].id = new t(d[e].id, "hex"), d[e.toLowerCase()] = d[e]
      }), c(i, f.Writable), i.prototype._write = function (e, t, r) {
        this._hash.update(e), r()
      }, i.prototype.update = function (e, r) {
        return "string" == typeof e && (e = new t(e, r)), this._hash.update(e), this
      }, i.prototype.sign = function (e, t) {
        this.end();
        var r = this._hash.digest(), i = h(r, e, this._hashType, this._signType, this._tag);
        return t ? i.toString(t) : i
      }, c(n, f.Writable), n.prototype._write = function (e, t, r) {
        this._hash.update(e), r()
      }, n.prototype.update = function (e, r) {
        return "string" == typeof e && (e = new t(e, r)), this._hash.update(e), this
      }, n.prototype.verify = function (e, r, i) {
        "string" == typeof r && (r = new t(r, i)), this.end();
        var n = this._hash.digest();
        return u(r, n, e, this._signType, this._tag)
      }, e.exports = {Sign: o, Verify: s, createSign: o, createVerify: s}
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e, r, i, s, a) {
        var f = y(r);
        if (f.curve) {
          if ("ecdsa" !== s && "ecdsa/rsa" !== s)throw new Error("wrong private key type");
          return n(e, f)
        }
        if ("dsa" === f.type) {
          if ("dsa" !== s)throw new Error("wrong private key type");
          return o(e, f, i)
        }
        if ("rsa" !== s && "ecdsa/rsa" !== s)throw new Error("wrong private key type");
        e = t.concat([a, e]);
        for (var c = f.modulus.byteLength(), h = [0, 1]; e.length + h.length + 1 < c;)h.push(255);
        h.push(0);
        for (var u = -1; ++u < e.length;)h.push(e[u]);
        return l(h, f)
      }

      function n(e, r) {
        var i = m[r.curve.join(".")];
        if (!i)throw new Error("unknown curve " + r.curve.join("."));
        var n = new p(i), o = n.keyFromPrivate(r.privateKey), s = o.sign(e);
        return new t(s.toDER())
      }

      function o(e, t, r) {
        for (var i, n = t.params.priv_key, o = t.params.p, c = t.params.q, d = t.params.g, l = new b(0), p = f(e, c).mod(c), y = !1, m = a(n, c, e, r); !1 === y;)i = h(c, m, r), l = u(d, i, o, c), y = i.invm(c).imul(p.add(n.mul(l))).mod(c), 0 === y.cmpn(0) && (y = !1, l = new b(0));
        return s(l, y)
      }

      function s(e, r) {
        e = e.toArray(), r = r.toArray(), 128 & e[0] && (e = [0].concat(e)), 128 & r[0] && (r = [0].concat(r));
        var i = e.length + r.length + 4, n = [48, i, 2, e.length];
        return n = n.concat(e, [2, r.length], r), new t(n)
      }

      function a(e, r, i, n) {
        if (e = new t(e.toArray()), e.length < r.byteLength()) {
          var o = new t(r.byteLength() - e.length);
          o.fill(0), e = t.concat([o, e])
        }
        var s = i.length, a = c(i, r), f = new t(s);
        f.fill(1);
        var h = new t(s);
        return h.fill(0), h = d(n, h).update(f).update(new t([0])).update(e).update(a).digest(), f = d(n, h).update(f).digest(), h = d(n, h).update(f).update(new t([1])).update(e).update(a).digest(), f = d(n, h).update(f).digest(), {
          k: h,
          v: f
        }
      }

      function f(e, t) {
        var r = new b(e), i = (e.length << 3) - t.bitLength();
        return i > 0 && r.ishrn(i), r
      }

      function c(e, r) {
        e = f(e, r), e = e.mod(r);
        var i = new t(e.toArray());
        if (i.length < r.byteLength()) {
          var n = new t(r.byteLength() - i.length);
          n.fill(0), i = t.concat([n, i])
        }
        return i
      }

      function h(e, r, i) {
        var n, o;
        do {
          for (n = new t(0); 8 * n.length < e.bitLength();)r.v = d(i, r.k).update(r.v).digest(), n = t.concat([n, r.v]);
          o = f(n, e), r.k = d(i, r.k).update(r.v).update(new t([0])).digest(), r.v = d(i, r.k).update(r.v).digest()
        } while (-1 !== o.cmp(e));
        return o
      }

      function u(e, t, r, i) {
        return e.toRed(b.mont(r)).redPow(t).fromRed().mod(i)
      }

      var d = r(50), l = r(26), p = r(4).ec, b = r(3), y = r(22), m = r(48);
      e.exports = i, e.exports.getKey = a, e.exports.makeKey = h
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e, r, i, s, f) {
        var h = c(i);
        if ("ec" === h.type) {
          if ("ecdsa" !== s && "ecdsa/rsa" !== s)throw new Error("wrong public key type");
          return n(e, r, h)
        }
        if ("dsa" === h.type) {
          if ("dsa" !== s)throw new Error("wrong public key type");
          return o(e, r, h)
        }
        if ("rsa" !== s && "ecdsa/rsa" !== s)throw new Error("wrong public key type");
        r = t.concat([f, r]);
        for (var u = h.modulus.byteLength(), d = [1], l = 0; r.length + d.length + 2 < u;)d.push(255), l++;
        d.push(0);
        for (var p = -1; ++p < r.length;)d.push(r[p]);
        d = new t(d);
        var b = a.mont(h.modulus);
        e = new a(e).toRed(b), e = e.redPow(new a(h.publicExponent)), e = new t(e.fromRed().toArray());
        var y = l < 8 ? 1 : 0;
        for (u = Math.min(e.length, d.length), e.length !== d.length && (y = 1), p = -1; ++p < u;)y |= e[p] ^ d[p];
        return 0 === y
      }

      function n(e, t, r) {
        var i = h[r.data.algorithm.curve.join(".")];
        if (!i)throw new Error("unknown curve " + r.data.algorithm.curve.join("."));
        var n = new f(i), o = r.data.subjectPrivateKey.data;
        return n.verify(t, e, o)
      }

      function o(e, t, r) {
        var i = r.data.p, n = r.data.q, o = r.data.g, f = r.data.pub_key, h = c.signature.decode(e, "der"), u = h.s, d = h.r;
        s(u, n), s(d, n);
        var l = a.mont(i), p = u.invm(n);
        return 0 === o.toRed(l).redPow(new a(t).mul(p).mod(n)).fromRed().mul(f.toRed(l).redPow(d.mul(p).mod(n)).fromRed()).mod(i).mod(n).cmp(d)
      }

      function s(e, t) {
        if (e.cmpn(0) <= 0)throw new Error("invalid sig");
        if (e.cmp(t) >= t)throw new Error("invalid sig")
      }

      var a = r(3), f = r(4).ec, c = r(22), h = r(48);
      e.exports = i
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e) {
        this.curveType = a[e], this.curveType || (this.curveType = {name: e}), this.curve = new o.ec(this.curveType.name), this.keys = void 0
      }

      function n(e, r, i) {
        Array.isArray(e) || (e = e.toArray());
        var n = new t(e);
        if (i && n.length < i) {
          var o = new t(i - n.length);
          o.fill(0), n = t.concat([o, n])
        }
        return r ? n.toString(r) : n
      }

      var o = r(4), s = r(3);
      e.exports = function (e) {
        return new i(e)
      };
      var a = {
        secp256k1: {name: "secp256k1", byteLength: 32},
        secp224r1: {name: "p224", byteLength: 28},
        prime256v1: {name: "p256", byteLength: 32},
        prime192v1: {name: "p192", byteLength: 24},
        ed25519: {name: "ed25519", byteLength: 32},
        secp384r1: {name: "p384", byteLength: 48},
        secp521r1: {name: "p521", byteLength: 66}
      };
      a.p224 = a.secp224r1, a.p256 = a.secp256r1 = a.prime256v1, a.p192 = a.secp192r1 = a.prime192v1, a.p384 = a.secp384r1, a.p521 = a.secp521r1, i.prototype.generateKeys = function (e, t) {
        return this.keys = this.curve.genKeyPair(), this.getPublicKey(e, t)
      }, i.prototype.computeSecret = function (e, r, i) {
        return r = r || "utf8", t.isBuffer(e) || (e = new t(e, r)), n(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(), i, this.curveType.byteLength)
      }, i.prototype.getPublicKey = function (e, t) {
        var r = this.keys.getPublic("compressed" === t, !0);
        return "hybrid" === t && (r[r.length - 1] % 2 ? r[0] = 7 : r[0] = 6), n(r, e)
      }, i.prototype.getPrivateKey = function (e) {
        return n(this.keys.getPrivate(), e)
      }, i.prototype.setPublicKey = function (e, r) {
        return r = r || "utf8", t.isBuffer(e) || (e = new t(e, r)), this.keys._importPublic(e), this
      }, i.prototype.setPrivateKey = function (e, r) {
        r = r || "utf8", t.isBuffer(e) || (e = new t(e, r));
        var i = new s(e);
        return i = i.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(i), this
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      s.call(this, "digest"), "string" == typeof t && (t = o.from(t)), this._alg = e, this._key = t, t.length > f ? t = e(t) : t.length < f && (t = o.concat([t, a], f));
      for (var r = this._ipad = o.allocUnsafe(f), i = this._opad = o.allocUnsafe(f), n = 0; n < f; n++)r[n] = 54 ^ t[n], i[n] = 92 ^ t[n];
      this._hash = [r]
    }

    var n = r(0), o = r(1).Buffer, s = r(8), a = o.alloc(128), f = 64;
    n(i, s), i.prototype._update = function (e) {
      this._hash.push(e)
    }, i.prototype._final = function () {
      var e = this._alg(o.concat(this._hash));
      return this._alg(o.concat([this._opad, e]))
    }, e.exports = i
  }, function (e, t, r) {
    "use strict";
    t.randomBytes = t.rng = t.pseudoRandomBytes = t.prng = r(11), t.createHash = t.Hash = r(17), t.createHmac = t.Hmac = r(50);
    var i = r(100), n = Object.keys(i), o = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(n);
    t.getHashes = function () {
      return o
    };
    var s = r(59);
    t.pbkdf2 = s.pbkdf2, t.pbkdf2Sync = s.pbkdf2Sync;
    var a = r(97);
    t.Cipher = a.Cipher, t.createCipher = a.createCipher, t.Cipheriv = a.Cipheriv, t.createCipheriv = a.createCipheriv, t.Decipher = a.Decipher, t.createDecipher = a.createDecipher, t.Decipheriv = a.Decipheriv, t.createDecipheriv = a.createDecipheriv, t.getCiphers = a.getCiphers, t.listCiphers = a.listCiphers;
    var f = r(112);
    t.DiffieHellmanGroup = f.DiffieHellmanGroup, t.createDiffieHellmanGroup = f.createDiffieHellmanGroup, t.getDiffieHellman = f.getDiffieHellman, t.createDiffieHellman = f.createDiffieHellman, t.DiffieHellman = f.DiffieHellman;
    var c = r(101);
    t.createSign = c.createSign, t.Sign = c.Sign, t.createVerify = c.createVerify, t.Verify = c.Verify, t.createECDH = r(104);
    var h = r(143);
    t.publicEncrypt = h.publicEncrypt, t.privateEncrypt = h.privateEncrypt, t.publicDecrypt = h.publicDecrypt, t.privateDecrypt = h.privateDecrypt;
    var u = r(147);
    t.randomFill = u.randomFill, t.randomFillSync = u.randomFillSync, t.createCredentials = function () {
      throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
    }, t.constants = {
      DH_CHECK_P_NOT_SAFE_PRIME: 2,
      DH_CHECK_P_NOT_PRIME: 1,
      DH_UNABLE_TO_CHECK_GENERATOR: 4,
      DH_NOT_SUITABLE_GENERATOR: 8,
      NPN_ENABLED: 1,
      ALPN_ENABLED: 1,
      RSA_PKCS1_PADDING: 1,
      RSA_SSLV23_PADDING: 2,
      RSA_NO_PADDING: 3,
      RSA_PKCS1_OAEP_PADDING: 4,
      RSA_X931_PADDING: 5,
      RSA_PKCS1_PSS_PADDING: 6,
      POINT_CONVERSION_COMPRESSED: 2,
      POINT_CONVERSION_UNCOMPRESSED: 4,
      POINT_CONVERSION_HYBRID: 6
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      o.equal(e.length, 8, "Invalid IV length"), this.iv = new Array(8);
      for (var t = 0; t < this.iv.length; t++)this.iv[t] = e[t]
    }

    function n(e) {
      function t(t) {
        e.call(this, t), this._cbcInit()
      }

      s(t, e);
      for (var r = Object.keys(a), i = 0; i < r.length; i++) {
        var n = r[i];
        t.prototype[n] = a[n]
      }
      return t.create = function (e) {
        return new t(e)
      }, t
    }

    var o = r(5), s = r(0), a = {};
    t.instantiate = n, a._cbcInit = function () {
      var e = new i(this.options.iv);
      this._cbcState = e
    }, a._update = function (e, t, r, i) {
      var n = this._cbcState, o = this.constructor.super_.prototype, s = n.iv;
      if ("encrypt" === this.type) {
        for (var a = 0; a < this.blockSize; a++)s[a] ^= e[t + a];
        o._update.call(this, s, 0, r, i);
        for (var a = 0; a < this.blockSize; a++)s[a] = r[i + a]
      } else {
        o._update.call(this, e, t, r, i);
        for (var a = 0; a < this.blockSize; a++)r[i + a] ^= s[a];
        for (var a = 0; a < this.blockSize; a++)s[a] = e[t + a]
      }
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      this.options = e, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
    }

    var n = r(5);
    e.exports = i, i.prototype._init = function () {
    }, i.prototype.update = function (e) {
      return 0 === e.length ? [] : "decrypt" === this.type ? this._updateDecrypt(e) : this._updateEncrypt(e)
    }, i.prototype._buffer = function (e, t) {
      for (var r = Math.min(this.buffer.length - this.bufferOff, e.length - t), i = 0; i < r; i++)this.buffer[this.bufferOff + i] = e[t + i];
      return this.bufferOff += r, r
    }, i.prototype._flushBuffer = function (e, t) {
      return this._update(this.buffer, 0, e, t), this.bufferOff = 0, this.blockSize
    }, i.prototype._updateEncrypt = function (e) {
      var t = 0, r = 0, i = (this.bufferOff + e.length) / this.blockSize | 0, n = new Array(i * this.blockSize);
      0 !== this.bufferOff && (t += this._buffer(e, t), this.bufferOff === this.buffer.length && (r += this._flushBuffer(n, r)));
      for (var o = e.length - (e.length - t) % this.blockSize; t < o; t += this.blockSize)this._update(e, t, n, r), r += this.blockSize;
      for (; t < e.length; t++, this.bufferOff++)this.buffer[this.bufferOff] = e[t];
      return n
    }, i.prototype._updateDecrypt = function (e) {
      for (var t = 0, r = 0, i = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1, n = new Array(i * this.blockSize); i > 0; i--)t += this._buffer(e, t), r += this._flushBuffer(n, r);
      return t += this._buffer(e, t), n
    }, i.prototype.final = function (e) {
      var t;
      e && (t = this.update(e));
      var r;
      return r = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), t ? t.concat(r) : r
    }, i.prototype._pad = function (e, t) {
      if (0 === t)return !1;
      for (; t < e.length;)e[t++] = 0;
      return !0
    }, i.prototype._finalEncrypt = function () {
      if (!this._pad(this.buffer, this.bufferOff))return [];
      var e = new Array(this.blockSize);
      return this._update(this.buffer, 0, e, 0), e
    }, i.prototype._unpad = function (e) {
      return e
    }, i.prototype._finalDecrypt = function () {
      n.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
      var e = new Array(this.blockSize);
      return this._flushBuffer(e, 0), this._unpad(e)
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      this.tmp = new Array(2), this.keys = null
    }

    function n(e) {
      c.call(this, e);
      var t = new i;
      this._desState = t, this.deriveKeys(t, e.key)
    }

    var o = r(5), s = r(0), a = r(27), f = a.utils, c = a.Cipher;
    s(n, c), e.exports = n, n.create = function (e) {
      return new n(e)
    };
    var h = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    n.prototype.deriveKeys = function (e, t) {
      e.keys = new Array(32), o.equal(t.length, this.blockSize, "Invalid key length");
      var r = f.readUInt32BE(t, 0), i = f.readUInt32BE(t, 4);
      f.pc1(r, i, e.tmp, 0), r = e.tmp[0], i = e.tmp[1];
      for (var n = 0; n < e.keys.length; n += 2) {
        var s = h[n >>> 1];
        r = f.r28shl(r, s), i = f.r28shl(i, s), f.pc2(r, i, e.keys, n)
      }
    }, n.prototype._update = function (e, t, r, i) {
      var n = this._desState, o = f.readUInt32BE(e, t), s = f.readUInt32BE(e, t + 4);
      f.ip(o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], "encrypt" === this.type ? this._encrypt(n, o, s, n.tmp, 0) : this._decrypt(n, o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], f.writeUInt32BE(r, o, i), f.writeUInt32BE(r, s, i + 4)
    }, n.prototype._pad = function (e, t) {
      for (var r = e.length - t, i = t; i < e.length; i++)e[i] = r;
      return !0
    }, n.prototype._unpad = function (e) {
      for (var t = e[e.length - 1], r = e.length - t; r < e.length; r++)o.equal(e[r], t);
      return e.slice(0, e.length - t)
    }, n.prototype._encrypt = function (e, t, r, i, n) {
      for (var o = t, s = r, a = 0; a < e.keys.length; a += 2) {
        var c = e.keys[a], h = e.keys[a + 1];
        f.expand(s, e.tmp, 0), c ^= e.tmp[0], h ^= e.tmp[1];
        var u = f.substitute(c, h), d = f.permute(u), l = s;
        s = (o ^ d) >>> 0, o = l
      }
      f.rip(s, o, i, n)
    }, n.prototype._decrypt = function (e, t, r, i, n) {
      for (var o = r, s = t, a = e.keys.length - 2; a >= 0; a -= 2) {
        var c = e.keys[a], h = e.keys[a + 1];
        f.expand(o, e.tmp, 0), c ^= e.tmp[0], h ^= e.tmp[1];
        var u = f.substitute(c, h), d = f.permute(u), l = o;
        o = (s ^ d) >>> 0, s = l
      }
      f.rip(o, s, i, n)
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      o.equal(t.length, 24, "Invalid key length");
      var r = t.slice(0, 8), i = t.slice(8, 16), n = t.slice(16, 24);
      this.ciphers = "encrypt" === e ? [c.create({type: "encrypt", key: r}), c.create({
        type: "decrypt",
        key: i
      }), c.create({type: "encrypt", key: n})] : [c.create({type: "decrypt", key: n}), c.create({
        type: "encrypt",
        key: i
      }), c.create({type: "decrypt", key: r})]
    }

    function n(e) {
      f.call(this, e);
      var t = new i(this.type, this.options.key);
      this._edeState = t
    }

    var o = r(5), s = r(0), a = r(27), f = a.Cipher, c = a.DES;
    s(n, f), e.exports = n, n.create = function (e) {
      return new n(e)
    }, n.prototype._update = function (e, t, r, i) {
      var n = this._edeState;
      n.ciphers[0]._update(e, t, r, i), n.ciphers[1]._update(r, i, r, i), n.ciphers[2]._update(r, i, r, i)
    }, n.prototype._pad = c.prototype._pad, n.prototype._unpad = c.prototype._unpad
  }, function (e, t, r) {
    "use strict";
    t.readUInt32BE = function (e, t) {
      return (e[0 + t] << 24 | e[1 + t] << 16 | e[2 + t] << 8 | e[3 + t]) >>> 0
    }, t.writeUInt32BE = function (e, t, r) {
      e[0 + r] = t >>> 24, e[1 + r] = t >>> 16 & 255, e[2 + r] = t >>> 8 & 255, e[3 + r] = 255 & t
    }, t.ip = function (e, t, r, i) {
      for (var n = 0, o = 0, s = 6; s >= 0; s -= 2) {
        for (var a = 0; a <= 24; a += 8)n <<= 1, n |= t >>> a + s & 1;
        for (var a = 0; a <= 24; a += 8)n <<= 1, n |= e >>> a + s & 1
      }
      for (var s = 6; s >= 0; s -= 2) {
        for (var a = 1; a <= 25; a += 8)o <<= 1, o |= t >>> a + s & 1;
        for (var a = 1; a <= 25; a += 8)o <<= 1, o |= e >>> a + s & 1
      }
      r[i + 0] = n >>> 0, r[i + 1] = o >>> 0
    }, t.rip = function (e, t, r, i) {
      for (var n = 0, o = 0, s = 0; s < 4; s++)for (var a = 24; a >= 0; a -= 8)n <<= 1, n |= t >>> a + s & 1, n <<= 1, n |= e >>> a + s & 1;
      for (var s = 4; s < 8; s++)for (var a = 24; a >= 0; a -= 8)o <<= 1, o |= t >>> a + s & 1, o <<= 1, o |= e >>> a + s & 1;
      r[i + 0] = n >>> 0, r[i + 1] = o >>> 0
    }, t.pc1 = function (e, t, r, i) {
      for (var n = 0, o = 0, s = 7; s >= 5; s--) {
        for (var a = 0; a <= 24; a += 8)n <<= 1, n |= t >> a + s & 1;
        for (var a = 0; a <= 24; a += 8)n <<= 1, n |= e >> a + s & 1
      }
      for (var a = 0; a <= 24; a += 8)n <<= 1, n |= t >> a + s & 1;
      for (var s = 1; s <= 3; s++) {
        for (var a = 0; a <= 24; a += 8)o <<= 1, o |= t >> a + s & 1;
        for (var a = 0; a <= 24; a += 8)o <<= 1, o |= e >> a + s & 1
      }
      for (var a = 0; a <= 24; a += 8)o <<= 1, o |= e >> a + s & 1;
      r[i + 0] = n >>> 0, r[i + 1] = o >>> 0
    }, t.r28shl = function (e, t) {
      return e << t & 268435455 | e >>> 28 - t
    };
    var i = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24];
    t.pc2 = function (e, t, r, n) {
      for (var o = 0, s = 0, a = i.length >>> 1, f = 0; f < a; f++)o <<= 1, o |= e >>> i[f] & 1;
      for (var f = a; f < i.length; f++)s <<= 1, s |= t >>> i[f] & 1;
      r[n + 0] = o >>> 0, r[n + 1] = s >>> 0
    }, t.expand = function (e, t, r) {
      var i = 0, n = 0;
      i = (1 & e) << 5 | e >>> 27;
      for (var o = 23; o >= 15; o -= 4)i <<= 6, i |= e >>> o & 63;
      for (var o = 11; o >= 3; o -= 4)n |= e >>> o & 63, n <<= 6;
      n |= (31 & e) << 1 | e >>> 31, t[r + 0] = i >>> 0, t[r + 1] = n >>> 0
    };
    var n = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11];
    t.substitute = function (e, t) {
      for (var r = 0, i = 0; i < 4; i++) {
        var o = e >>> 18 - 6 * i & 63, s = n[64 * i + o];
        r <<= 4, r |= s
      }
      for (var i = 0; i < 4; i++) {
        var o = t >>> 18 - 6 * i & 63, s = n[256 + 64 * i + o];
        r <<= 4, r |= s
      }
      return r >>> 0
    };
    var o = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
    t.permute = function (e) {
      for (var t = 0, r = 0; r < o.length; r++)t <<= 1, t |= e >>> o[r] & 1;
      return t >>> 0
    }, t.padSplit = function (e, t, r) {
      for (var i = e.toString(2); i.length < t;)i = "0" + i;
      for (var n = [], o = 0; o < t; o += r)n.push(i.slice(o, o + r));
      return n.join(" ")
    }
  }, function (e, t, r) {
    (function (e) {
      function i(t) {
        var r = new e(s[t].prime, "hex"), i = new e(s[t].gen, "hex");
        return new a(r, i)
      }

      function n(t, r, i, s) {
        return e.isBuffer(r) || void 0 === f[r] ? n(t, "binary", r, i) : (r = r || "binary", s = s || "binary", i = i || new e([2]), e.isBuffer(i) || (i = new e(i, s)), "number" == typeof t ? new a(o(t, i), i, !0) : (e.isBuffer(t) || (t = new e(t, r)), new a(t, i, !0)))
      }

      var o = r(51), s = r(114), a = r(113), f = {binary: !0, hex: !0, base64: !0};
      t.DiffieHellmanGroup = t.createDiffieHellmanGroup = t.getDiffieHellman = i, t.createDiffieHellman = t.DiffieHellman = n
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e, r) {
        return r = r || "utf8", t.isBuffer(e) || (e = new t(e, r)), this._pub = new f(e), this
      }

      function n(e, r) {
        return r = r || "utf8", t.isBuffer(e) || (e = new t(e, r)), this._priv = new f(e), this
      }

      function o(e, t) {
        var r = t.toString("hex"), i = [r, e.toString(16)].join("_");
        if (i in g)return g[i];
        var n = 0;
        if (e.isEven() || !y.simpleSieve || !y.fermatTest(e) || !h.test(e))return n += 1, n += "02" === r || "05" === r ? 8 : 4, g[i] = n, n;
        h.test(e.shrn(1)) || (n += 2);
        var o;
        switch (r) {
          case"02":
            e.mod(u).cmp(d) && (n += 8);
            break;
          case"05":
            o = e.mod(l), o.cmp(p) && o.cmp(b) && (n += 8);
            break;
          default:
            n += 4
        }
        return g[i] = n, n
      }

      function s(e, t, r) {
        this.setGenerator(t), this.__prime = new f(e), this._prime = f.mont(this.__prime), this._primeLen = e.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, r ? (this.setPublicKey = i, this.setPrivateKey = n) : this._primeCode = 8
      }

      function a(e, r) {
        var i = new t(e.toArray());
        return r ? i.toString(r) : i
      }

      var f = r(3), c = r(57), h = new c, u = new f(24), d = new f(11), l = new f(10), p = new f(3), b = new f(7), y = r(51), m = r(11);
      e.exports = s;
      var g = {};
      Object.defineProperty(s.prototype, "verifyError", {
        enumerable: !0, get: function () {
          return "number" != typeof this._primeCode && (this._primeCode = o(this.__prime, this.__gen)), this._primeCode
        }
      }), s.prototype.generateKeys = function () {
        return this._priv || (this._priv = new f(m(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
      }, s.prototype.computeSecret = function (e) {
        e = new f(e), e = e.toRed(this._prime);
        var r = e.redPow(this._priv).fromRed(), i = new t(r.toArray()), n = this.getPrime();
        if (i.length < n.length) {
          var o = new t(n.length - i.length);
          o.fill(0), i = t.concat([o, i])
        }
        return i
      }, s.prototype.getPublicKey = function (e) {
        return a(this._pub, e)
      }, s.prototype.getPrivateKey = function (e) {
        return a(this._priv, e)
      }, s.prototype.getPrime = function (e) {
        return a(this.__prime, e)
      }, s.prototype.getGenerator = function (e) {
        return a(this._gen, e)
      }, s.prototype.setGenerator = function (e, r) {
        return r = r || "utf8", t.isBuffer(e) || (e = new t(e, r)), this.__gen = e, this._gen = new f(e), this
      }
    }).call(t, r(2).Buffer)
  }, function (e, t) {
    e.exports = {
      modp1: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
      },
      modp2: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
      },
      modp5: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
      },
      modp14: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
      },
      modp15: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
      },
      modp16: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
      },
      modp17: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
      },
      modp18: {
        gen: "02",
        prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
      }
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      this.type = e, this.p = new o(t.p, 16), this.red = t.prime ? o.red(t.prime) : o.mont(this.p), this.zero = new o(0).toRed(this.red), this.one = new o(1).toRed(this.red), this.two = new o(2).toRed(this.red), this.n = t.n && new o(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
      var r = this.n && this.p.div(this.n);
      !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
    }

    function n(e, t) {
      this.curve = e, this.type = t, this.precomputed = null
    }

    var o = r(3), s = r(4), a = s.utils, f = a.getNAF, c = a.getJSF, h = a.assert;
    e.exports = i, i.prototype.point = function () {
      throw new Error("Not implemented")
    }, i.prototype.validate = function () {
      throw new Error("Not implemented")
    }, i.prototype._fixedNafMul = function (e, t) {
      h(e.precomputed);
      var r = e._getDoubles(), i = f(t, 1), n = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
      n /= 3;
      for (var o = [], s = 0; s < i.length; s += r.step) {
        for (var a = 0, t = s + r.step - 1; t >= s; t--)a = (a << 1) + i[t];
        o.push(a)
      }
      for (var c = this.jpoint(null, null, null), u = this.jpoint(null, null, null), d = n; d > 0; d--) {
        for (var s = 0; s < o.length; s++) {
          var a = o[s];
          a === d ? u = u.mixedAdd(r.points[s]) : a === -d && (u = u.mixedAdd(r.points[s].neg()))
        }
        c = c.add(u)
      }
      return c.toP()
    }, i.prototype._wnafMul = function (e, t) {
      var r = 4, i = e._getNAFPoints(r);
      r = i.wnd;
      for (var n = i.points, o = f(t, r), s = this.jpoint(null, null, null), a = o.length - 1; a >= 0; a--) {
        for (var t = 0; a >= 0 && 0 === o[a]; a--)t++;
        if (a >= 0 && t++, s = s.dblp(t), a < 0)break;
        var c = o[a];
        h(0 !== c), s = "affine" === e.type ? c > 0 ? s.mixedAdd(n[c - 1 >> 1]) : s.mixedAdd(n[-c - 1 >> 1].neg()) : c > 0 ? s.add(n[c - 1 >> 1]) : s.add(n[-c - 1 >> 1].neg())
      }
      return "affine" === e.type ? s.toP() : s
    }, i.prototype._wnafMulAdd = function (e, t, r, i, n) {
      for (var o = this._wnafT1, s = this._wnafT2, a = this._wnafT3, h = 0, u = 0; u < i; u++) {
        var d = t[u], l = d._getNAFPoints(e);
        o[u] = l.wnd, s[u] = l.points
      }
      for (var u = i - 1; u >= 1; u -= 2) {
        var p = u - 1, b = u;
        if (1 === o[p] && 1 === o[b]) {
          var y = [t[p], null, null, t[b]];
          0 === t[p].y.cmp(t[b].y) ? (y[1] = t[p].add(t[b]), y[2] = t[p].toJ().mixedAdd(t[b].neg())) : 0 === t[p].y.cmp(t[b].y.redNeg()) ? (y[1] = t[p].toJ().mixedAdd(t[b]), y[2] = t[p].add(t[b].neg())) : (y[1] = t[p].toJ().mixedAdd(t[b]), y[2] = t[p].toJ().mixedAdd(t[b].neg()));
          var m = [-3, -1, -5, -7, 0, 7, 5, 1, 3], g = c(r[p], r[b]);
          h = Math.max(g[0].length, h), a[p] = new Array(h), a[b] = new Array(h);
          for (var v = 0; v < h; v++) {
            var w = 0 | g[0][v], _ = 0 | g[1][v];
            a[p][v] = m[3 * (w + 1) + (_ + 1)], a[b][v] = 0, s[p] = y
          }
        } else a[p] = f(r[p], o[p]), a[b] = f(r[b], o[b]), h = Math.max(a[p].length, h), h = Math.max(a[b].length, h)
      }
      for (var S = this.jpoint(null, null, null), k = this._wnafT4, u = h; u >= 0; u--) {
        for (var E = 0; u >= 0;) {
          for (var M = !0, v = 0; v < i; v++)k[v] = 0 | a[v][u], 0 !== k[v] && (M = !1);
          if (!M)break;
          E++, u--
        }
        if (u >= 0 && E++, S = S.dblp(E), u < 0)break;
        for (var v = 0; v < i; v++) {
          var d, A = k[v];
          0 !== A && (A > 0 ? d = s[v][A - 1 >> 1] : A < 0 && (d = s[v][-A - 1 >> 1].neg()), S = "affine" === d.type ? S.mixedAdd(d) : S.add(d))
        }
      }
      for (var u = 0; u < i; u++)s[u] = null;
      return n ? S : S.toP()
    }, i.BasePoint = n, n.prototype.eq = function () {
      throw new Error("Not implemented")
    }, n.prototype.validate = function () {
      return this.curve.validate(this)
    }, i.prototype.decodePoint = function (e, t) {
      e = a.toArray(e, t);
      var r = this.p.byteLength();
      if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r) {
        6 === e[0] ? h(e[e.length - 1] % 2 == 0) : 7 === e[0] && h(e[e.length - 1] % 2 == 1);
        return this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r))
      }
      if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
      throw new Error("Unknown point format")
    }, n.prototype.encodeCompressed = function (e) {
      return this.encode(e, !0)
    }, n.prototype._encode = function (e) {
      var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t);
      return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t))
    }, n.prototype.encode = function (e, t) {
      return a.encode(this._encode(t), e)
    }, n.prototype.precompute = function (e) {
      if (this.precomputed)return this;
      var t = {doubles: null, naf: null, beta: null};
      return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this
    }, n.prototype._hasDoubles = function (e) {
      if (!this.precomputed)return !1;
      var t = this.precomputed.doubles;
      return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step)
    }, n.prototype._getDoubles = function (e, t) {
      if (this.precomputed && this.precomputed.doubles)return this.precomputed.doubles;
      for (var r = [this], i = this, n = 0; n < t; n += e) {
        for (var o = 0; o < e; o++)i = i.dbl();
        r.push(i)
      }
      return {step: e, points: r}
    }, n.prototype._getNAFPoints = function (e) {
      if (this.precomputed && this.precomputed.naf)return this.precomputed.naf;
      for (var t = [this], r = (1 << e) - 1, i = 1 === r ? null : this.dbl(), n = 1; n < r; n++)t[n] = t[n - 1].add(i);
      return {wnd: e, points: t}
    }, n.prototype._getBeta = function () {
      return null
    }, n.prototype.dblp = function (e) {
      for (var t = this, r = 0; r < e; r++)t = t.dbl();
      return t
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      this.twisted = 1 != (0 | e.a), this.mOneA = this.twisted && -1 == (0 | e.a), this.extended = this.mOneA, c.call(this, "edwards", e), this.a = new a(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new a(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new a(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), h(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | e.c)
    }

    function n(e, t, r, i, n) {
      c.BasePoint.call(this, e, "projective"), null === t && null === r && null === i ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new a(t, 16), this.y = new a(r, 16), this.z = i ? new a(i, 16) : this.curve.one, this.t = n && new a(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }

    var o = r(20), s = r(4), a = r(3), f = r(0), c = o.base, h = s.utils.assert;
    f(i, c), e.exports = i, i.prototype._mulA = function (e) {
      return this.mOneA ? e.redNeg() : this.a.redMul(e)
    }, i.prototype._mulC = function (e) {
      return this.oneC ? e : this.c.redMul(e)
    }, i.prototype.jpoint = function (e, t, r, i) {
      return this.point(e, t, r, i)
    }, i.prototype.pointFromX = function (e, t) {
      e = new a(e, 16), e.red || (e = e.toRed(this.red));
      var r = e.redSqr(), i = this.c2.redSub(this.a.redMul(r)), n = this.one.redSub(this.c2.redMul(this.d).redMul(r)), o = i.redMul(n.redInvm()), s = o.redSqrt();
      if (0 !== s.redSqr().redSub(o).cmp(this.zero))throw new Error("invalid point");
      var f = s.fromRed().isOdd();
      return (t && !f || !t && f) && (s = s.redNeg()), this.point(e, s)
    }, i.prototype.pointFromY = function (e, t) {
      e = new a(e, 16), e.red || (e = e.toRed(this.red));
      var r = e.redSqr(), i = r.redSub(this.one), n = r.redMul(this.d).redAdd(this.one), o = i.redMul(n.redInvm());
      if (0 === o.cmp(this.zero)) {
        if (t)throw new Error("invalid point");
        return this.point(this.zero, e)
      }
      var s = o.redSqrt();
      if (0 !== s.redSqr().redSub(o).cmp(this.zero))throw new Error("invalid point");
      return s.isOdd() !== t && (s = s.redNeg()), this.point(s, e)
    }, i.prototype.validate = function (e) {
      if (e.isInfinity())return !0;
      e.normalize();
      var t = e.x.redSqr(), r = e.y.redSqr(), i = t.redMul(this.a).redAdd(r), n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
      return 0 === i.cmp(n)
    }, f(n, c.BasePoint), i.prototype.pointFromJSON = function (e) {
      return n.fromJSON(this, e)
    }, i.prototype.point = function (e, t, r, i) {
      return new n(this, e, t, r, i)
    }, n.fromJSON = function (e, t) {
      return new n(e, t[0], t[1], t[2])
    }, n.prototype.inspect = function () {
      return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, n.prototype.isInfinity = function () {
      return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
    }, n.prototype._extDbl = function () {
      var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr();
      r = r.redIAdd(r);
      var i = this.curve._mulA(e), n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), o = i.redAdd(t), s = o.redSub(r), a = i.redSub(t), f = n.redMul(s), c = o.redMul(a), h = n.redMul(a), u = s.redMul(o);
      return this.curve.point(f, c, u, h)
    }, n.prototype._projDbl = function () {
      var e, t, r, i = this.x.redAdd(this.y).redSqr(), n = this.x.redSqr(), o = this.y.redSqr();
      if (this.curve.twisted) {
        var s = this.curve._mulA(n), a = s.redAdd(o);
        if (this.zOne)e = i.redSub(n).redSub(o).redMul(a.redSub(this.curve.two)), t = a.redMul(s.redSub(o)), r = a.redSqr().redSub(a).redSub(a); else {
          var f = this.z.redSqr(), c = a.redSub(f).redISub(f);
          e = i.redSub(n).redISub(o).redMul(c), t = a.redMul(s.redSub(o)), r = a.redMul(c)
        }
      } else {
        var s = n.redAdd(o), f = this.curve._mulC(this.c.redMul(this.z)).redSqr(), c = s.redSub(f).redSub(f);
        e = this.curve._mulC(i.redISub(s)).redMul(c), t = this.curve._mulC(s).redMul(n.redISub(o)), r = s.redMul(c)
      }
      return this.curve.point(e, t, r)
    }, n.prototype.dbl = function () {
      return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
    }, n.prototype._extAdd = function (e) {
      var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), i = this.t.redMul(this.curve.dd).redMul(e.t), n = this.z.redMul(e.z.redAdd(e.z)), o = r.redSub(t), s = n.redSub(i), a = n.redAdd(i), f = r.redAdd(t), c = o.redMul(s), h = a.redMul(f), u = o.redMul(f), d = s.redMul(a);
      return this.curve.point(c, h, d, u)
    }, n.prototype._projAdd = function (e) {
      var t, r, i = this.z.redMul(e.z), n = i.redSqr(), o = this.x.redMul(e.x), s = this.y.redMul(e.y), a = this.curve.d.redMul(o).redMul(s), f = n.redSub(a), c = n.redAdd(a), h = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(o).redISub(s), u = i.redMul(f).redMul(h);
      return this.curve.twisted ? (t = i.redMul(c).redMul(s.redSub(this.curve._mulA(o))), r = f.redMul(c)) : (t = i.redMul(c).redMul(s.redSub(o)), r = this.curve._mulC(f).redMul(c)), this.curve.point(u, t, r)
    }, n.prototype.add = function (e) {
      return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e)
    }, n.prototype.mul = function (e) {
      return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e)
    }, n.prototype.mulAdd = function (e, t, r) {
      return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1)
    }, n.prototype.jmulAdd = function (e, t, r) {
      return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0)
    }, n.prototype.normalize = function () {
      if (this.zOne)return this;
      var e = this.z.redInvm();
      return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this
    }, n.prototype.neg = function () {
      return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
    }, n.prototype.getX = function () {
      return this.normalize(), this.x.fromRed()
    }, n.prototype.getY = function () {
      return this.normalize(), this.y.fromRed()
    }, n.prototype.eq = function (e) {
      return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY())
    }, n.prototype.eqXToP = function (e) {
      var t = e.toRed(this.curve.red).redMul(this.z);
      if (0 === this.x.cmp(t))return !0;
      for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ;) {
        if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)return !1;
        if (t.redIAdd(i), 0 === this.x.cmp(t))return !0
      }
      return !1
    }, n.prototype.toP = n.prototype.normalize, n.prototype.mixedAdd = n.prototype.add
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      f.call(this, "mont", e), this.a = new s(e.a, 16).toRed(this.red), this.b = new s(e.b, 16).toRed(this.red), this.i4 = new s(4).toRed(this.red).redInvm(), this.two = new s(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
    }

    function n(e, t, r) {
      f.BasePoint.call(this, e, "projective"), null === t && null === r ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new s(t, 16), this.z = new s(r, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }

    var o = r(20), s = r(3), a = r(0), f = o.base, c = r(4), h = c.utils;
    a(i, f), e.exports = i, i.prototype.validate = function (e) {
      var t = e.normalize().x, r = t.redSqr(), i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
      return 0 === i.redSqrt().redSqr().cmp(i)
    }, a(n, f.BasePoint), i.prototype.decodePoint = function (e, t) {
      return this.point(h.toArray(e, t), 1)
    }, i.prototype.point = function (e, t) {
      return new n(this, e, t)
    }, i.prototype.pointFromJSON = function (e) {
      return n.fromJSON(this, e)
    }, n.prototype.precompute = function () {
    }, n.prototype._encode = function () {
      return this.getX().toArray("be", this.curve.p.byteLength())
    }, n.fromJSON = function (e, t) {
      return new n(e, t[0], t[1] || e.one)
    }, n.prototype.inspect = function () {
      return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, n.prototype.isInfinity = function () {
      return 0 === this.z.cmpn(0)
    }, n.prototype.dbl = function () {
      var e = this.x.redAdd(this.z), t = e.redSqr(), r = this.x.redSub(this.z), i = r.redSqr(), n = t.redSub(i), o = t.redMul(i), s = n.redMul(i.redAdd(this.curve.a24.redMul(n)));
      return this.curve.point(o, s)
    }, n.prototype.add = function () {
      throw new Error("Not supported on Montgomery curve")
    }, n.prototype.diffAdd = function (e, t) {
      var r = this.x.redAdd(this.z), i = this.x.redSub(this.z), n = e.x.redAdd(e.z), o = e.x.redSub(e.z), s = o.redMul(r), a = n.redMul(i), f = t.z.redMul(s.redAdd(a).redSqr()), c = t.x.redMul(s.redISub(a).redSqr());
      return this.curve.point(f, c)
    }, n.prototype.mul = function (e) {
      for (var t = e.clone(), r = this, i = this.curve.point(null, null), n = this, o = []; 0 !== t.cmpn(0); t.iushrn(1))o.push(t.andln(1));
      for (var s = o.length - 1; s >= 0; s--)0 === o[s] ? (r = r.diffAdd(i, n), i = i.dbl()) : (i = r.diffAdd(i, n), r = r.dbl());
      return i
    }, n.prototype.mulAdd = function () {
      throw new Error("Not supported on Montgomery curve")
    }, n.prototype.jumlAdd = function () {
      throw new Error("Not supported on Montgomery curve")
    }, n.prototype.eq = function (e) {
      return 0 === this.getX().cmp(e.getX())
    }, n.prototype.normalize = function () {
      return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
    }, n.prototype.getX = function () {
      return this.normalize(), this.x.fromRed()
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      h.call(this, "short", e), this.a = new f(e.a, 16).toRed(this.red), this.b = new f(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
    }

    function n(e, t, r, i) {
      h.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new f(t, 16), this.y = new f(r, 16), i && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
    }

    function o(e, t, r, i) {
      h.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === i ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new f(0)) : (this.x = new f(t, 16), this.y = new f(r, 16), this.z = new f(i, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
    }

    var s = r(20), a = r(4), f = r(3), c = r(0), h = s.base, u = a.utils.assert;
    c(i, h), e.exports = i, i.prototype._getEndomorphism = function (e) {
      if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
        var t, r;
        if (e.beta)t = new f(e.beta, 16).toRed(this.red); else {
          var i = this._getEndoRoots(this.p);
          t = i[0].cmp(i[1]) < 0 ? i[0] : i[1], t = t.toRed(this.red)
        }
        if (e.lambda)r = new f(e.lambda, 16); else {
          var n = this._getEndoRoots(this.n);
          0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(t)) ? r = n[0] : (r = n[1], u(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))))
        }
        var o;
        return o = e.basis ? e.basis.map(function (e) {
          return {a: new f(e.a, 16), b: new f(e.b, 16)}
        }) : this._getEndoBasis(r), {beta: t, lambda: r, basis: o}
      }
    }, i.prototype._getEndoRoots = function (e) {
      var t = e === this.p ? this.red : f.mont(e), r = new f(2).toRed(t).redInvm(), i = r.redNeg(), n = new f(3).toRed(t).redNeg().redSqrt().redMul(r);
      return [i.redAdd(n).fromRed(), i.redSub(n).fromRed()]
    }, i.prototype._getEndoBasis = function (e) {
      for (var t, r, i, n, o, s, a, c, h, u = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), d = e, l = this.n.clone(), p = new f(1), b = new f(0), y = new f(0), m = new f(1), g = 0; 0 !== d.cmpn(0);) {
        var v = l.div(d);
        c = l.sub(v.mul(d)), h = y.sub(v.mul(p));
        var w = m.sub(v.mul(b));
        if (!i && c.cmp(u) < 0)t = a.neg(), r = p, i = c.neg(), n = h; else if (i && 2 == ++g)break;
        a = c, l = d, d = c, y = p, p = h, m = b, b = w
      }
      o = c.neg(), s = h;
      var _ = i.sqr().add(n.sqr());
      return o.sqr().add(s.sqr()).cmp(_) >= 0 && (o = t, s = r), i.negative && (i = i.neg(), n = n.neg()), o.negative && (o = o.neg(), s = s.neg()), [{
        a: i,
        b: n
      }, {a: o, b: s}]
    }, i.prototype._endoSplit = function (e) {
      var t = this.endo.basis, r = t[0], i = t[1], n = i.b.mul(e).divRound(this.n), o = r.b.neg().mul(e).divRound(this.n), s = n.mul(r.a), a = o.mul(i.a), f = n.mul(r.b), c = o.mul(i.b);
      return {k1: e.sub(s).sub(a), k2: f.add(c).neg()}
    }, i.prototype.pointFromX = function (e, t) {
      e = new f(e, 16), e.red || (e = e.toRed(this.red));
      var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), i = r.redSqrt();
      if (0 !== i.redSqr().redSub(r).cmp(this.zero))throw new Error("invalid point");
      var n = i.fromRed().isOdd();
      return (t && !n || !t && n) && (i = i.redNeg()), this.point(e, i)
    }, i.prototype.validate = function (e) {
      if (e.inf)return !0;
      var t = e.x, r = e.y, i = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
      return 0 === r.redSqr().redISub(n).cmpn(0)
    }, i.prototype._endoWnafMulAdd = function (e, t, r) {
      for (var i = this._endoWnafT1, n = this._endoWnafT2, o = 0; o < e.length; o++) {
        var s = this._endoSplit(t[o]), a = e[o], f = a._getBeta();
        s.k1.negative && (s.k1.ineg(), a = a.neg(!0)), s.k2.negative && (s.k2.ineg(), f = f.neg(!0)), i[2 * o] = a, i[2 * o + 1] = f, n[2 * o] = s.k1, n[2 * o + 1] = s.k2
      }
      for (var c = this._wnafMulAdd(1, i, n, 2 * o, r), h = 0; h < 2 * o; h++)i[h] = null, n[h] = null;
      return c
    }, c(n, h.BasePoint), i.prototype.point = function (e, t, r) {
      return new n(this, e, t, r)
    }, i.prototype.pointFromJSON = function (e, t) {
      return n.fromJSON(this, e, t)
    }, n.prototype._getBeta = function () {
      if (this.curve.endo) {
        var e = this.precomputed;
        if (e && e.beta)return e.beta;
        var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
        if (e) {
          var r = this.curve, i = function (e) {
            return r.point(e.x.redMul(r.endo.beta), e.y)
          };
          e.beta = t, t.precomputed = {
            beta: null,
            naf: e.naf && {wnd: e.naf.wnd, points: e.naf.points.map(i)},
            doubles: e.doubles && {step: e.doubles.step, points: e.doubles.points.map(i)}
          }
        }
        return t
      }
    }, n.prototype.toJSON = function () {
      return this.precomputed ? [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        }, naf: this.precomputed.naf && {wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1)}
      }] : [this.x, this.y]
    }, n.fromJSON = function (e, t, r) {
      function i(t) {
        return e.point(t[0], t[1], r)
      }

      "string" == typeof t && (t = JSON.parse(t));
      var n = e.point(t[0], t[1], r);
      if (!t[2])return n;
      var o = t[2];
      return n.precomputed = {
        beta: null,
        doubles: o.doubles && {step: o.doubles.step, points: [n].concat(o.doubles.points.map(i))},
        naf: o.naf && {wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i))}
      }, n
    }, n.prototype.inspect = function () {
      return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
    }, n.prototype.isInfinity = function () {
      return this.inf
    }, n.prototype.add = function (e) {
      if (this.inf)return e;
      if (e.inf)return this;
      if (this.eq(e))return this.dbl();
      if (this.neg().eq(e))return this.curve.point(null, null);
      if (0 === this.x.cmp(e.x))return this.curve.point(null, null);
      var t = this.y.redSub(e.y);
      0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
      var r = t.redSqr().redISub(this.x).redISub(e.x), i = t.redMul(this.x.redSub(r)).redISub(this.y);
      return this.curve.point(r, i)
    }, n.prototype.dbl = function () {
      if (this.inf)return this;
      var e = this.y.redAdd(this.y);
      if (0 === e.cmpn(0))return this.curve.point(null, null);
      var t = this.curve.a, r = this.x.redSqr(), i = e.redInvm(), n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i), o = n.redSqr().redISub(this.x.redAdd(this.x)), s = n.redMul(this.x.redSub(o)).redISub(this.y);
      return this.curve.point(o, s)
    }, n.prototype.getX = function () {
      return this.x.fromRed()
    }, n.prototype.getY = function () {
      return this.y.fromRed()
    }, n.prototype.mul = function (e) {
      return e = new f(e, 16), this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e)
    }, n.prototype.mulAdd = function (e, t, r) {
      var i = [this, t], n = [e, r];
      return this.curve.endo ? this.curve._endoWnafMulAdd(i, n) : this.curve._wnafMulAdd(1, i, n, 2)
    }, n.prototype.jmulAdd = function (e, t, r) {
      var i = [this, t], n = [e, r];
      return this.curve.endo ? this.curve._endoWnafMulAdd(i, n, !0) : this.curve._wnafMulAdd(1, i, n, 2, !0)
    }, n.prototype.eq = function (e) {
      return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y))
    }, n.prototype.neg = function (e) {
      if (this.inf)return this;
      var t = this.curve.point(this.x, this.y.redNeg());
      if (e && this.precomputed) {
        var r = this.precomputed, i = function (e) {
          return e.neg()
        };
        t.precomputed = {
          naf: r.naf && {wnd: r.naf.wnd, points: r.naf.points.map(i)},
          doubles: r.doubles && {step: r.doubles.step, points: r.doubles.points.map(i)}
        }
      }
      return t
    }, n.prototype.toJ = function () {
      return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
    }, c(o, h.BasePoint), i.prototype.jpoint = function (e, t, r) {
      return new o(this, e, t, r)
    }, o.prototype.toP = function () {
      if (this.isInfinity())return this.curve.point(null, null);
      var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), i = this.y.redMul(t).redMul(e);
      return this.curve.point(r, i)
    }, o.prototype.neg = function () {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
    }, o.prototype.add = function (e) {
      if (this.isInfinity())return e;
      if (e.isInfinity())return this;
      var t = e.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(t), n = e.x.redMul(r), o = this.y.redMul(t.redMul(e.z)), s = e.y.redMul(r.redMul(this.z)), a = i.redSub(n), f = o.redSub(s);
      if (0 === a.cmpn(0))return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
      var c = a.redSqr(), h = c.redMul(a), u = i.redMul(c), d = f.redSqr().redIAdd(h).redISub(u).redISub(u), l = f.redMul(u.redISub(d)).redISub(o.redMul(h)), p = this.z.redMul(e.z).redMul(a);
      return this.curve.jpoint(d, l, p)
    }, o.prototype.mixedAdd = function (e) {
      if (this.isInfinity())return e.toJ();
      if (e.isInfinity())return this;
      var t = this.z.redSqr(), r = this.x, i = e.x.redMul(t), n = this.y, o = e.y.redMul(t).redMul(this.z), s = r.redSub(i), a = n.redSub(o);
      if (0 === s.cmpn(0))return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
      var f = s.redSqr(), c = f.redMul(s), h = r.redMul(f), u = a.redSqr().redIAdd(c).redISub(h).redISub(h), d = a.redMul(h.redISub(u)).redISub(n.redMul(c)), l = this.z.redMul(s);
      return this.curve.jpoint(u, d, l)
    }, o.prototype.dblp = function (e) {
      if (0 === e)return this;
      if (this.isInfinity())return this;
      if (!e)return this.dbl();
      if (this.curve.zeroA || this.curve.threeA) {
        for (var t = this, r = 0; r < e; r++)t = t.dbl();
        return t
      }
      for (var i = this.curve.a, n = this.curve.tinv, o = this.x, s = this.y, a = this.z, f = a.redSqr().redSqr(), c = s.redAdd(s), r = 0; r < e; r++) {
        var h = o.redSqr(), u = c.redSqr(), d = u.redSqr(), l = h.redAdd(h).redIAdd(h).redIAdd(i.redMul(f)), p = o.redMul(u), b = l.redSqr().redISub(p.redAdd(p)), y = p.redISub(b), m = l.redMul(y);
        m = m.redIAdd(m).redISub(d);
        var g = c.redMul(a);
        r + 1 < e && (f = f.redMul(d)), o = b, a = g, c = m
      }
      return this.curve.jpoint(o, c.redMul(n), a)
    }, o.prototype.dbl = function () {
      return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
    }, o.prototype._zeroDbl = function () {
      var e, t, r;
      if (this.zOne) {
        var i = this.x.redSqr(), n = this.y.redSqr(), o = n.redSqr(), s = this.x.redAdd(n).redSqr().redISub(i).redISub(o);
        s = s.redIAdd(s);
        var a = i.redAdd(i).redIAdd(i), f = a.redSqr().redISub(s).redISub(s), c = o.redIAdd(o);
        c = c.redIAdd(c), c = c.redIAdd(c), e = f, t = a.redMul(s.redISub(f)).redISub(c), r = this.y.redAdd(this.y)
      } else {
        var h = this.x.redSqr(), u = this.y.redSqr(), d = u.redSqr(), l = this.x.redAdd(u).redSqr().redISub(h).redISub(d);
        l = l.redIAdd(l);
        var p = h.redAdd(h).redIAdd(h), b = p.redSqr(), y = d.redIAdd(d);
        y = y.redIAdd(y), y = y.redIAdd(y), e = b.redISub(l).redISub(l), t = p.redMul(l.redISub(e)).redISub(y), r = this.y.redMul(this.z), r = r.redIAdd(r)
      }
      return this.curve.jpoint(e, t, r)
    }, o.prototype._threeDbl = function () {
      var e, t, r;
      if (this.zOne) {
        var i = this.x.redSqr(), n = this.y.redSqr(), o = n.redSqr(), s = this.x.redAdd(n).redSqr().redISub(i).redISub(o);
        s = s.redIAdd(s);
        var a = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a), f = a.redSqr().redISub(s).redISub(s);
        e = f;
        var c = o.redIAdd(o);
        c = c.redIAdd(c), c = c.redIAdd(c), t = a.redMul(s.redISub(f)).redISub(c), r = this.y.redAdd(this.y)
      } else {
        var h = this.z.redSqr(), u = this.y.redSqr(), d = this.x.redMul(u), l = this.x.redSub(h).redMul(this.x.redAdd(h));
        l = l.redAdd(l).redIAdd(l);
        var p = d.redIAdd(d);
        p = p.redIAdd(p);
        var b = p.redAdd(p);
        e = l.redSqr().redISub(b), r = this.y.redAdd(this.z).redSqr().redISub(u).redISub(h);
        var y = u.redSqr();
        y = y.redIAdd(y), y = y.redIAdd(y), y = y.redIAdd(y), t = l.redMul(p.redISub(e)).redISub(y)
      }
      return this.curve.jpoint(e, t, r)
    }, o.prototype._dbl = function () {
      var e = this.curve.a, t = this.x, r = this.y, i = this.z, n = i.redSqr().redSqr(), o = t.redSqr(), s = r.redSqr(), a = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(n)), f = t.redAdd(t);
      f = f.redIAdd(f);
      var c = f.redMul(s), h = a.redSqr().redISub(c.redAdd(c)), u = c.redISub(h), d = s.redSqr();
      d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
      var l = a.redMul(u).redISub(d), p = r.redAdd(r).redMul(i);
      return this.curve.jpoint(h, l, p)
    }, o.prototype.trpl = function () {
      if (!this.curve.zeroA)return this.dbl().add(this);
      var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), i = t.redSqr(), n = e.redAdd(e).redIAdd(e), o = n.redSqr(), s = this.x.redAdd(t).redSqr().redISub(e).redISub(i);
      s = s.redIAdd(s), s = s.redAdd(s).redIAdd(s), s = s.redISub(o);
      var a = s.redSqr(), f = i.redIAdd(i);
      f = f.redIAdd(f), f = f.redIAdd(f), f = f.redIAdd(f);
      var c = n.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(f), h = t.redMul(c);
      h = h.redIAdd(h), h = h.redIAdd(h);
      var u = this.x.redMul(a).redISub(h);
      u = u.redIAdd(u), u = u.redIAdd(u);
      var d = this.y.redMul(c.redMul(f.redISub(c)).redISub(s.redMul(a)));
      d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
      var l = this.z.redAdd(s).redSqr().redISub(r).redISub(a);
      return this.curve.jpoint(u, d, l)
    }, o.prototype.mul = function (e, t) {
      return e = new f(e, t), this.curve._wnafMul(this, e)
    }, o.prototype.eq = function (e) {
      if ("affine" === e.type)return this.eq(e.toJ());
      if (this === e)return !0;
      var t = this.z.redSqr(), r = e.z.redSqr();
      if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))return !1;
      var i = t.redMul(this.z), n = r.redMul(e.z);
      return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0)
    }, o.prototype.eqXToP = function (e) {
      var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t);
      if (0 === this.x.cmp(r))return !0;
      for (var i = e.clone(), n = this.curve.redN.redMul(t); ;) {
        if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)return !1;
        if (r.redIAdd(n), 0 === this.x.cmp(r))return !0
      }
      return !1
    }, o.prototype.inspect = function () {
      return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
    }, o.prototype.isInfinity = function () {
      return 0 === this.z.cmpn(0)
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      "short" === e.type ? this.curve = new a.curve.short(e) : "edwards" === e.type ? this.curve = new a.curve.edwards(e) : this.curve = new a.curve.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, f(this.g.validate(), "Invalid curve"), f(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
    }

    function n(e, t) {
      Object.defineProperty(o, e, {
        configurable: !0, enumerable: !0, get: function () {
          var r = new i(t);
          return Object.defineProperty(o, e, {configurable: !0, enumerable: !0, value: r}), r
        }
      })
    }

    var o = t, s = r(29), a = r(4), f = a.utils.assert;
    o.PresetCurve = i, n("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: s.sha256,
      gRed: !1,
      g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
    }), n("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: s.sha256,
      gRed: !1,
      g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
    }), n("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: s.sha256,
      gRed: !1,
      g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
    }), n("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: s.sha384,
      gRed: !1,
      g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
    }), n("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: s.sha512,
      gRed: !1,
      g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
    }), n("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: s.sha256,
      gRed: !1,
      g: ["9"]
    }), n("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: s.sha256,
      gRed: !1,
      g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
    });
    var c;
    try {
      c = r(126)
    } catch (e) {
      c = void 0
    }
    n("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: s.sha256,
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [{
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      }, {a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15"}],
      gRed: !1,
      g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", c]
    })
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (!(this instanceof i))return new i(e);
      "string" == typeof e && (f(s.curves.hasOwnProperty(e), "Unknown curve " + e), e = s.curves[e]), e instanceof s.curves.PresetCurve && (e = {curve: e}), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash
    }

    var n = r(3), o = r(135), s = r(4), a = s.utils, f = a.assert, c = r(121), h = r(122);
    e.exports = i, i.prototype.keyPair = function (e) {
      return new c(this, e)
    }, i.prototype.keyFromPrivate = function (e, t) {
      return c.fromPrivate(this, e, t)
    }, i.prototype.keyFromPublic = function (e, t) {
      return c.fromPublic(this, e, t)
    }, i.prototype.genKeyPair = function (e) {
      e || (e = {});
      for (var t = new o({
        hash: this.hash,
        pers: e.pers,
        persEnc: e.persEnc || "utf8",
        entropy: e.entropy || s.rand(this.hash.hmacStrength),
        entropyEnc: e.entropy && e.entropyEnc || "utf8",
        nonce: this.n.toArray()
      }), r = this.n.byteLength(), i = this.n.sub(new n(2)); ;) {
        var a = new n(t.generate(r));
        if (!(a.cmp(i) > 0))return a.iaddn(1), this.keyFromPrivate(a)
      }
    }, i.prototype._truncateToN = function (e, t) {
      var r = 8 * e.byteLength() - this.n.bitLength();
      return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
    }, i.prototype.sign = function (e, t, r, i) {
      "object" == typeof r && (i = r, r = null), i || (i = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new n(e, 16));
      for (var s = this.n.byteLength(), a = t.getPrivate().toArray("be", s), f = e.toArray("be", s), c = new o({
        hash: this.hash,
        entropy: a,
        nonce: f,
        pers: i.pers,
        persEnc: i.persEnc || "utf8"
      }), u = this.n.sub(new n(1)), d = 0; !0; d++) {
        var l = i.k ? i.k(d) : new n(c.generate(this.n.byteLength()));
        if (l = this._truncateToN(l, !0), !(l.cmpn(1) <= 0 || l.cmp(u) >= 0)) {
          var p = this.g.mul(l);
          if (!p.isInfinity()) {
            var b = p.getX(), y = b.umod(this.n);
            if (0 !== y.cmpn(0)) {
              var m = l.invm(this.n).mul(y.mul(t.getPrivate()).iadd(e));
              if (m = m.umod(this.n), 0 !== m.cmpn(0)) {
                var g = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(y) ? 2 : 0);
                return i.canonical && m.cmp(this.nh) > 0 && (m = this.n.sub(m), g ^= 1), new h({
                  r: y,
                  s: m,
                  recoveryParam: g
                })
              }
            }
          }
        }
      }
    }, i.prototype.verify = function (e, t, r, i) {
      e = this._truncateToN(new n(e, 16)), r = this.keyFromPublic(r, i), t = new h(t, "hex");
      var o = t.r, s = t.s;
      if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)return !1;
      if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)return !1;
      var a = s.invm(this.n), f = a.mul(e).umod(this.n), c = a.mul(o).umod(this.n);
      if (!this.curve._maxwellTrick) {
        var u = this.g.mulAdd(f, r.getPublic(), c);
        return !u.isInfinity() && 0 === u.getX().umod(this.n).cmp(o)
      }
      var u = this.g.jmulAdd(f, r.getPublic(), c);
      return !u.isInfinity() && u.eqXToP(o)
    }, i.prototype.recoverPubKey = function (e, t, r, i) {
      f((3 & r) === r, "The recovery param is more than two bits"), t = new h(t, i);
      var o = this.n, s = new n(e), a = t.r, c = t.s, u = 1 & r, d = r >> 1;
      if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)throw new Error("Unable to find sencond key candinate");
      a = d ? this.curve.pointFromX(a.add(this.curve.n), u) : this.curve.pointFromX(a, u);
      var l = t.r.invm(o), p = o.sub(s).mul(l).umod(o), b = c.mul(l).umod(o);
      return this.g.mulAdd(p, a, b)
    }, i.prototype.getKeyRecoveryParam = function (e, t, r, i) {
      if (t = new h(t, i), null !== t.recoveryParam)return t.recoveryParam;
      for (var n = 0; n < 4; n++) {
        var o;
        try {
          o = this.recoverPubKey(e, t, n)
        } catch (e) {
          continue
        }
        if (o.eq(r))return n
      }
      throw new Error("Unable to find valid recovery factor")
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc)
    }

    var n = r(3), o = r(4), s = o.utils, a = s.assert;
    e.exports = i, i.fromPublic = function (e, t, r) {
      return t instanceof i ? t : new i(e, {pub: t, pubEnc: r})
    }, i.fromPrivate = function (e, t, r) {
      return t instanceof i ? t : new i(e, {priv: t, privEnc: r})
    }, i.prototype.validate = function () {
      var e = this.getPublic();
      return e.isInfinity() ? {
        result: !1,
        reason: "Invalid public key"
      } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {result: !0, reason: null} : {
        result: !1,
        reason: "Public key * N != O"
      } : {result: !1, reason: "Public key is not a point"}
    }, i.prototype.getPublic = function (e, t) {
      return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub
    }, i.prototype.getPrivate = function (e) {
      return "hex" === e ? this.priv.toString(16, 2) : this.priv
    }, i.prototype._importPrivate = function (e, t) {
      this.priv = new n(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n)
    }, i.prototype._importPublic = function (e, t) {
      if (e.x || e.y)return "mont" === this.ec.curve.type ? a(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || a(e.x && e.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(e.x, e.y));
      this.pub = this.ec.curve.decodePoint(e, t)
    }, i.prototype.derive = function (e) {
      return e.mul(this.priv).getX()
    }, i.prototype.sign = function (e, t, r) {
      return this.ec.sign(e, this, t, r)
    }, i.prototype.verify = function (e, t) {
      return this.ec.verify(e, t, this)
    }, i.prototype.inspect = function () {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      if (e instanceof i)return e;
      this._importDER(e, t) || (u(e.r && e.s, "Signature without r or s"), this.r = new f(e.r, 16), this.s = new f(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam)
    }

    function n() {
      this.place = 0
    }

    function o(e, t) {
      var r = e[t.place++];
      if (!(128 & r))return r;
      for (var i = 15 & r, n = 0, o = 0, s = t.place; o < i; o++, s++)n <<= 8, n |= e[s];
      return t.place = s, n
    }

    function s(e) {
      for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;)t++;
      return 0 === t ? e : e.slice(t)
    }

    function a(e, t) {
      if (t < 128)return void e.push(t);
      var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
      for (e.push(128 | r); --r;)e.push(t >>> (r << 3) & 255);
      e.push(t)
    }

    var f = r(3), c = r(4), h = c.utils, u = h.assert;
    e.exports = i, i.prototype._importDER = function (e, t) {
      e = h.toArray(e, t);
      var r = new n;
      if (48 !== e[r.place++])return !1;
      if (o(e, r) + r.place !== e.length)return !1;
      if (2 !== e[r.place++])return !1;
      var i = o(e, r), s = e.slice(r.place, i + r.place);
      if (r.place += i, 2 !== e[r.place++])return !1;
      var a = o(e, r);
      if (e.length !== a + r.place)return !1;
      var c = e.slice(r.place, a + r.place);
      return 0 === s[0] && 128 & s[1] && (s = s.slice(1)), 0 === c[0] && 128 & c[1] && (c = c.slice(1)), this.r = new f(s), this.s = new f(c), this.recoveryParam = null, !0
    }, i.prototype.toDER = function (e) {
      var t = this.r.toArray(), r = this.s.toArray();
      for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = s(t), r = s(r); !(r[0] || 128 & r[1]);)r = r.slice(1);
      var i = [2];
      a(i, t.length), i = i.concat(t), i.push(2), a(i, r.length);
      var n = i.concat(r), o = [48];
      return a(o, n.length), o = o.concat(n), h.encode(o, e)
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (a("ed25519" === e, "only tested with ed25519 so far"), !(this instanceof i))return new i(e);
      var e = o.curves[e].curve;
      this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = n.sha512
    }

    var n = r(29), o = r(4), s = o.utils, a = s.assert, f = s.parseBytes, c = r(124), h = r(125);
    e.exports = i, i.prototype.sign = function (e, t) {
      e = f(e);
      var r = this.keyFromSecret(t), i = this.hashInt(r.messagePrefix(), e), n = this.g.mul(i), o = this.encodePoint(n), s = this.hashInt(o, r.pubBytes(), e).mul(r.priv()), a = i.add(s).umod(this.curve.n);
      return this.makeSignature({R: n, S: a, Rencoded: o})
    }, i.prototype.verify = function (e, t, r) {
      e = f(e), t = this.makeSignature(t);
      var i = this.keyFromPublic(r), n = this.hashInt(t.Rencoded(), i.pubBytes(), e), o = this.g.mul(t.S());
      return t.R().add(i.pub().mul(n)).eq(o)
    }, i.prototype.hashInt = function () {
      for (var e = this.hash(), t = 0; t < arguments.length; t++)e.update(arguments[t]);
      return s.intFromLE(e.digest()).umod(this.curve.n)
    }, i.prototype.keyFromPublic = function (e) {
      return c.fromPublic(this, e)
    }, i.prototype.keyFromSecret = function (e) {
      return c.fromSecret(this, e)
    }, i.prototype.makeSignature = function (e) {
      return e instanceof h ? e : new h(this, e)
    }, i.prototype.encodePoint = function (e) {
      var t = e.getY().toArray("le", this.encodingLength);
      return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t
    }, i.prototype.decodePoint = function (e) {
      e = s.parseBytes(e);
      var t = e.length - 1, r = e.slice(0, t).concat(-129 & e[t]), i = 0 != (128 & e[t]), n = s.intFromLE(r);
      return this.curve.pointFromY(n, i)
    }, i.prototype.encodeInt = function (e) {
      return e.toArray("le", this.encodingLength)
    }, i.prototype.decodeInt = function (e) {
      return s.intFromLE(e)
    }, i.prototype.isPoint = function (e) {
      return e instanceof this.pointClass
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      this.eddsa = e, this._secret = a(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = a(t.pub)
    }

    var n = r(4), o = n.utils, s = o.assert, a = o.parseBytes, f = o.cachedProperty;
    i.fromPublic = function (e, t) {
      return t instanceof i ? t : new i(e, {pub: t})
    }, i.fromSecret = function (e, t) {
      return t instanceof i ? t : new i(e, {secret: t})
    }, i.prototype.secret = function () {
      return this._secret
    }, f(i, "pubBytes", function () {
      return this.eddsa.encodePoint(this.pub())
    }), f(i, "pub", function () {
      return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
    }), f(i, "privBytes", function () {
      var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, i = t.slice(0, e.encodingLength);
      return i[0] &= 248, i[r] &= 127, i[r] |= 64, i
    }), f(i, "priv", function () {
      return this.eddsa.decodeInt(this.privBytes())
    }), f(i, "hash", function () {
      return this.eddsa.hash().update(this.secret()).digest()
    }), f(i, "messagePrefix", function () {
      return this.hash().slice(this.eddsa.encodingLength)
    }), i.prototype.sign = function (e) {
      return s(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this)
    }, i.prototype.verify = function (e, t) {
      return this.eddsa.verify(e, t, this)
    }, i.prototype.getSecret = function (e) {
      return s(this._secret, "KeyPair is public only"), o.encode(this.secret(), e)
    }, i.prototype.getPublic = function (e) {
      return o.encode(this.pubBytes(), e)
    }, e.exports = i
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      this.eddsa = e, "object" != typeof t && (t = c(t)), Array.isArray(t) && (t = {
        R: t.slice(0, e.encodingLength),
        S: t.slice(e.encodingLength)
      }), a(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof n && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded
    }

    var n = r(3), o = r(4), s = o.utils, a = s.assert, f = s.cachedProperty, c = s.parseBytes;
    f(i, "S", function () {
      return this.eddsa.decodeInt(this.Sencoded())
    }), f(i, "R", function () {
      return this.eddsa.decodePoint(this.Rencoded())
    }), f(i, "Rencoded", function () {
      return this.eddsa.encodePoint(this.R())
    }), f(i, "Sencoded", function () {
      return this.eddsa.encodeInt(this.S())
    }), i.prototype.toBytes = function () {
      return this.Rencoded().concat(this.Sencoded())
    }, i.prototype.toHex = function () {
      return s.encode(this.toBytes(), "hex").toUpperCase()
    }, e.exports = i
  }, function (e, t) {
    e.exports = {
      doubles: {
        step: 4,
        points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
      },
      naf: {
        wnd: 7,
        points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
      }
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      for (var r = [], i = 1 << t + 1, n = e.clone(); n.cmpn(1) >= 0;) {
        var o;
        if (n.isOdd()) {
          var s = n.andln(i - 1);
          o = s > (i >> 1) - 1 ? (i >> 1) - s : s, n.isubn(o)
        } else o = 0;
        r.push(o);
        for (var a = 0 !== n.cmpn(0) && 0 === n.andln(i - 1) ? t + 1 : 1, f = 1; f < a; f++)r.push(0);
        n.iushrn(a)
      }
      return r
    }

    function n(e, t) {
      var r = [[], []];
      e = e.clone(), t = t.clone();
      for (var i = 0, n = 0; e.cmpn(-i) > 0 || t.cmpn(-n) > 0;) {
        var o = e.andln(3) + i & 3, s = t.andln(3) + n & 3;
        3 === o && (o = -1), 3 === s && (s = -1);
        var a;
        if (0 == (1 & o))a = 0; else {
          var f = e.andln(7) + i & 7;
          a = 3 !== f && 5 !== f || 2 !== s ? o : -o
        }
        r[0].push(a);
        var c;
        if (0 == (1 & s))c = 0; else {
          var f = t.andln(7) + n & 7;
          c = 3 !== f && 5 !== f || 2 !== o ? s : -s
        }
        r[1].push(c), 2 * i === a + 1 && (i = 1 - i), 2 * n === c + 1 && (n = 1 - n), e.iushrn(1), t.iushrn(1)
      }
      return r
    }

    function o(e, t, r) {
      var i = "_" + t;
      e.prototype[t] = function () {
        return void 0 !== this[i] ? this[i] : this[i] = r.call(this)
      }
    }

    function s(e) {
      return "string" == typeof e ? f.toArray(e, "hex") : e
    }

    function a(e) {
      return new c(e, "hex", "le")
    }

    var f = t, c = r(3), h = r(5), u = r(58);
    f.assert = h, f.toArray = u.toArray, f.zero2 = u.zero2, f.toHex = u.toHex, f.encode = u.encode, f.getNAF = i, f.getJSF = n, f.cachedProperty = o, f.parseBytes = s, f.intFromLE = a
  }, function (e, t) {
    e.exports = {
      _from: "elliptic@^6.0.0",
      _id: "elliptic@6.4.0",
      _inBundle: !1,
      _integrity: "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
      _location: "/elliptic",
      _phantomChildren: {},
      _requested: {
        type: "range",
        registry: !0,
        raw: "elliptic@^6.0.0",
        name: "elliptic",
        escapedName: "elliptic",
        rawSpec: "^6.0.0",
        saveSpec: null,
        fetchSpec: "^6.0.0"
      },
      _requiredBy: ["/browserify-sign", "/create-ecdh"],
      _resolved: "https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",
      _shasum: "cac9af8762c85836187003c8dfe193e5e2eae5df",
      _spec: "elliptic@^6.0.0",
      _where: "/Users/luraymond/Documents/fdmk2/node_modules/@auth0/cordova/node_modules/browserify-sign",
      author: {name: "Fedor Indutny", email: "fedor@indutny.com"},
      bugs: {url: "https://github.com/indutny/elliptic/issues"},
      bundleDependencies: !1,
      dependencies: {
        "bn.js": "^4.4.0",
        brorand: "^1.0.1",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.0",
        inherits: "^2.0.1",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.0"
      },
      deprecated: !1,
      description: "EC cryptography",
      devDependencies: {
        brfs: "^1.4.3",
        coveralls: "^2.11.3",
        grunt: "^0.4.5",
        "grunt-browserify": "^5.0.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-connect": "^1.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^1.0.1",
        "grunt-mocha-istanbul": "^3.0.1",
        "grunt-saucelabs": "^8.6.2",
        istanbul: "^0.4.2",
        jscs: "^2.9.0",
        jshint: "^2.6.0",
        mocha: "^2.1.0"
      },
      files: ["lib"],
      homepage: "https://github.com/indutny/elliptic",
      keywords: ["EC", "Elliptic", "curve", "Cryptography"],
      license: "MIT",
      main: "lib/elliptic.js",
      name: "elliptic",
      repository: {type: "git", url: "git+ssh://git@github.com/indutny/elliptic.git"},
      scripts: {
        jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
        jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
        lint: "npm run jscs && npm run jshint",
        test: "npm run lint && npm run unit",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        version: "grunt dist && git add dist/"
      },
      version: "6.4.0"
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t, r) {
      if (!(this instanceof i))return new i(e, t, r);
      this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(n.toArray(t, r))
    }

    var n = r(7), o = r(5);
    e.exports = i, i.prototype._init = function (e) {
      e.length > this.blockSize && (e = (new this.Hash).update(e).digest()), o(e.length <= this.blockSize);
      for (var t = e.length; t < this.blockSize; t++)e.push(0);
      for (t = 0; t < e.length; t++)e[t] ^= 54;
      for (this.inner = (new this.Hash).update(e), t = 0; t < e.length; t++)e[t] ^= 106;
      this.outer = (new this.Hash).update(e)
    }, i.prototype.update = function (e, t) {
      return this.inner.update(e, t), this
    }, i.prototype.digest = function (e) {
      return this.outer.update(this.inner.digest()), this.outer.digest(e)
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      l.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
    }

    function n(e, t, r, i) {
      return e <= 15 ? t ^ r ^ i : e <= 31 ? t & r | ~t & i : e <= 47 ? (t | ~r) ^ i : e <= 63 ? t & i | r & ~i : t ^ (r | ~i)
    }

    function o(e) {
      return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838
    }

    function s(e) {
      return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0
    }

    var a = r(7), f = r(18), c = a.rotl32, h = a.sum32, u = a.sum32_3, d = a.sum32_4, l = f.BlockHash;
    a.inherits(i, l), t.ripemd160 = i, i.blockSize = 512, i.outSize = 160, i.hmacStrength = 192, i.padLength = 64, i.prototype._update = function (e, t) {
      for (var r = this.h[0], i = this.h[1], a = this.h[2], f = this.h[3], l = this.h[4], g = r, v = i, w = a, _ = f, S = l, k = 0; k < 80; k++) {
        var E = h(c(d(r, n(k, i, a, f), e[p[k] + t], o(k)), y[k]), l);
        r = l, l = f, f = c(a, 10), a = i, i = E, E = h(c(d(g, n(79 - k, v, w, _), e[b[k] + t], s(k)), m[k]), S), g = S, S = _, _ = c(w, 10), w = v, v = E
      }
      E = u(this.h[1], a, _), this.h[1] = u(this.h[2], f, S), this.h[2] = u(this.h[3], l, g), this.h[3] = u(this.h[4], r, v), this.h[4] = u(this.h[0], i, w), this.h[0] = E
    }, i.prototype._digest = function (e) {
      return "hex" === e ? a.toHex32(this.h, "little") : a.split32(this.h, "little")
    };
    var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], b = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
  }, function (e, t, r) {
    "use strict";
    t.sha1 = r(132), t.sha224 = r(133), t.sha256 = r(53), t.sha384 = r(134), t.sha512 = r(54)
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }

    var n = r(7), o = r(18), s = r(55), a = n.rotl32, f = n.sum32, c = n.sum32_5, h = s.ft_1, u = o.BlockHash, d = [1518500249, 1859775393, 2400959708, 3395469782];
    n.inherits(i, u), e.exports = i, i.blockSize = 512, i.outSize = 160, i.hmacStrength = 80, i.padLength = 64, i.prototype._update = function (e, t) {
      for (var r = this.W, i = 0; i < 16; i++)r[i] = e[t + i];
      for (; i < r.length; i++)r[i] = a(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
      var n = this.h[0], o = this.h[1], s = this.h[2], u = this.h[3], l = this.h[4];
      for (i = 0; i < r.length; i++) {
        var p = ~~(i / 20), b = c(a(n, 5), h(p, o, s, u), l, r[i], d[p]);
        l = u, u = s, s = a(o, 30), o = n, n = b
      }
      this.h[0] = f(this.h[0], n), this.h[1] = f(this.h[1], o), this.h[2] = f(this.h[2], s), this.h[3] = f(this.h[3], u), this.h[4] = f(this.h[4], l)
    }, i.prototype._digest = function (e) {
      return "hex" === e ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      o.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
    }

    var n = r(7), o = r(53);
    n.inherits(i, o), e.exports = i, i.blockSize = 512, i.outSize = 224, i.hmacStrength = 192, i.padLength = 64, i.prototype._digest = function (e) {
      return "hex" === e ? n.toHex32(this.h.slice(0, 7), "big") : n.split32(this.h.slice(0, 7), "big")
    }
  }, function (e, t, r) {
    "use strict";
    function i() {
      if (!(this instanceof i))return new i;
      o.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
    }

    var n = r(7), o = r(54);
    n.inherits(i, o), e.exports = i, i.blockSize = 1024, i.outSize = 384, i.hmacStrength = 192, i.padLength = 128, i.prototype._digest = function (e) {
      return "hex" === e ? n.toHex32(this.h.slice(0, 12), "big") : n.split32(this.h.slice(0, 12), "big")
    }
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (!(this instanceof i))return new i(e);
      this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
      var t = o.toArray(e.entropy, e.entropyEnc || "hex"), r = o.toArray(e.nonce, e.nonceEnc || "hex"), n = o.toArray(e.pers, e.persEnc || "hex");
      s(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r, n)
    }

    var n = r(29), o = r(58), s = r(5);
    e.exports = i, i.prototype._init = function (e, t, r) {
      var i = e.concat(t).concat(r);
      this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
      for (var n = 0; n < this.V.length; n++)this.K[n] = 0, this.V[n] = 1;
      this._update(i), this._reseed = 1, this.reseedInterval = 281474976710656
    }, i.prototype._hmac = function () {
      return new n.hmac(this.hash, this.K)
    }, i.prototype._update = function (e) {
      var t = this._hmac().update(this.V).update([0]);
      e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest())
    }, i.prototype.reseed = function (e, t, r, i) {
      "string" != typeof t && (i = r, r = t, t = null), e = o.toArray(e, t), r = o.toArray(r, i), s(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(r || [])), this._reseed = 1
    }, i.prototype.generate = function (e, t, r, i) {
      if (this._reseed > this.reseedInterval)throw new Error("Reseed is required");
      "string" != typeof t && (i = r, r = t, t = null), r && (r = o.toArray(r, i || "hex"), this._update(r));
      for (var n = []; n.length < e;)this.V = this._hmac().update(this.V).digest(), n = n.concat(this.V);
      var s = n.slice(0, e);
      return this._update(r), this._reseed++, o.encode(s, t)
    }
  }, function (e, t) {
    t.read = function (e, t, r, i, n) {
      var o, s, a = 8 * n - i - 1, f = (1 << a) - 1, c = f >> 1, h = -7, u = r ? n - 1 : 0, d = r ? -1 : 1, l = e[t + u];
      for (u += d, o = l & (1 << -h) - 1, l >>= -h, h += a; h > 0; o = 256 * o + e[t + u], u += d, h -= 8);
      for (s = o & (1 << -h) - 1, o >>= -h, h += i; h > 0; s = 256 * s + e[t + u], u += d, h -= 8);
      if (0 === o)o = 1 - c; else {
        if (o === f)return s ? NaN : 1 / 0 * (l ? -1 : 1);
        s += Math.pow(2, i), o -= c
      }
      return (l ? -1 : 1) * s * Math.pow(2, o - i)
    }, t.write = function (e, t, r, i, n, o) {
      var s, a, f, c = 8 * o - n - 1, h = (1 << c) - 1, u = h >> 1, d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = i ? 0 : o - 1, p = i ? 1 : -1, b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
      for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (f = Math.pow(2, -s)) < 1 && (s--, f *= 2), t += s + u >= 1 ? d / f : d * Math.pow(2, 1 - u), t * f >= 2 && (s++, f /= 2), s + u >= h ? (a = 0, s = h) : s + u >= 1 ? (a = (t * f - 1) * Math.pow(2, n), s += u) : (a = t * Math.pow(2, u - 1) * Math.pow(2, n), s = 0)); n >= 8; e[r + l] = 255 & a, l += p, a /= 256, n -= 8);
      for (s = s << n | a, c += n; c > 0; e[r + l] = 255 & s, l += p, s /= 256, c -= 8);
      e[r + l - p] |= 128 * b
    }
  }, function (e, t) {
    var r = [].indexOf;
    e.exports = function (e, t) {
      if (r)return e.indexOf(t);
      for (var i = 0; i < e.length; ++i)if (e[i] === t)return i;
      return -1
    }
  }, function (e, t) {
    e.exports = {
      "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
      "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
      "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
      "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
      "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
      "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
      "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
      "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
      "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
      "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
      "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
      "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
    }
  }, function (e, t, r) {
    "use strict";
    var i = r(13);
    t.certificate = r(140);
    var n = i.define("RSAPrivateKey", function () {
      this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int())
    });
    t.RSAPrivateKey = n;
    var o = i.define("RSAPublicKey", function () {
      this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
    });
    t.RSAPublicKey = o;
    var s = i.define("SubjectPublicKeyInfo", function () {
      this.seq().obj(this.key("algorithm").use(a), this.key("subjectPublicKey").bitstr())
    });
    t.PublicKey = s;
    var a = i.define("AlgorithmIdentifier", function () {
      this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional())
    }), f = i.define("PrivateKeyInfo", function () {
      this.seq().obj(this.key("version").int(), this.key("algorithm").use(a), this.key("subjectPrivateKey").octstr())
    });
    t.PrivateKey = f;
    var c = i.define("EncryptedPrivateKeyInfo", function () {
      this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
    });
    t.EncryptedPrivateKey = c;
    var h = i.define("DSAPrivateKey", function () {
      this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
    });
    t.DSAPrivateKey = h, t.DSAparam = i.define("DSAparam", function () {
      this.int()
    });
    var u = i.define("ECPrivateKey", function () {
      this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(d), this.key("publicKey").optional().explicit(1).bitstr())
    });
    t.ECPrivateKey = u;
    var d = i.define("ECParameters", function () {
      this.choice({namedCurve: this.objid()})
    });
    t.signature = i.define("signature", function () {
      this.seq().obj(this.key("r").int(), this.key("s").int())
    })
  }, function (e, t, r) {
    "use strict";
    var i = r(13), n = i.define("Time", function () {
      this.choice({utcTime: this.utctime(), generalTime: this.gentime()})
    }), o = i.define("AttributeTypeValue", function () {
      this.seq().obj(this.key("type").objid(), this.key("value").any())
    }), s = i.define("AlgorithmIdentifier", function () {
      this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional())
    }), a = i.define("SubjectPublicKeyInfo", function () {
      this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr())
    }), f = i.define("RelativeDistinguishedName", function () {
      this.setof(o)
    }), c = i.define("RDNSequence", function () {
      this.seqof(f)
    }), h = i.define("Name", function () {
      this.choice({rdnSequence: this.use(c)})
    }), u = i.define("Validity", function () {
      this.seq().obj(this.key("notBefore").use(n), this.key("notAfter").use(n))
    }), d = i.define("Extension", function () {
      this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
    }), l = i.define("TBSCertificate", function () {
      this.seq().obj(this.key("version").explicit(0).int(), this.key("serialNumber").int(), this.key("signature").use(s), this.key("issuer").use(h), this.key("validity").use(u), this.key("subject").use(h), this.key("subjectPublicKeyInfo").use(a), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(d).optional())
    }), p = i.define("X509Certificate", function () {
      this.seq().obj(this.key("tbsCertificate").use(l), this.key("signatureAlgorithm").use(s), this.key("signatureValue").bitstr())
    });
    e.exports = p
  }, function (e, t, r) {
    (function (t) {
      var i = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m, n = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----/m, o = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m, s = r(21), a = r(24);
      e.exports = function (e, r) {
        var f, c = e.toString(), h = c.match(i);
        if (h) {
          var u = "aes" + h[1], d = new t(h[2], "hex"), l = new t(h[3].replace(/[\r\n]/g, ""), "base64"), p = s(r, d.slice(0, 8), parseInt(h[1], 10)).key, b = [], y = a.createDecipheriv(u, p, d);
          b.push(y.update(l)), b.push(y.final()), f = t.concat(b)
        } else {
          var m = c.match(o);
          f = new t(m[2].replace(/[\r\n]/g, ""), "base64")
        }
        return {tag: c.match(n)[1], data: f}
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t, i) {
      function n(e) {
        if (t.process && !t.process.browser)return Promise.resolve(!1);
        if (!d || !d.importKey || !d.deriveBits)return Promise.resolve(!1);
        if (void 0 !== p[e])return p[e];
        a = a || u.alloc(8);
        var r = o(a, a, 10, 128, e).then(function () {
          return !0
        }).catch(function () {
          return !1
        });
        return p[e] = r, r
      }

      function o(e, t, r, i, n) {
        return d.importKey("raw", e, {name: "PBKDF2"}, !1, ["deriveBits"]).then(function (e) {
          return d.deriveBits({name: "PBKDF2", salt: t, iterations: r, hash: {name: n}}, e, i << 3)
        }).then(function (e) {
          return u.from(e)
        })
      }

      function s(e, t) {
        e.then(function (e) {
          i.nextTick(function () {
            t(null, e)
          })
        }, function (e) {
          i.nextTick(function () {
            t(e)
          })
        })
      }

      var a, f = r(61), c = r(60), h = r(62), u = r(1).Buffer, d = t.crypto && t.crypto.subtle, l = {
        sha: "SHA-1",
        "sha-1": "SHA-1",
        sha1: "SHA-1",
        sha256: "SHA-256",
        "sha-256": "SHA-256",
        sha384: "SHA-384",
        "sha-384": "SHA-384",
        "sha-512": "SHA-512",
        sha512: "SHA-512"
      }, p = [];
      e.exports = function (e, r, a, d, p, b) {
        "function" == typeof p && (b = p, p = void 0), p = p || "sha1";
        var y = l[p.toLowerCase()];
        if (!y || "function" != typeof t.Promise)return i.nextTick(function () {
          var t;
          try {
            t = h(e, r, a, d, p)
          } catch (e) {
            return b(e)
          }
          b(null, t)
        });
        if (f(e, r, a, d), "function" != typeof b)throw new Error("No callback provided to pbkdf2");
        u.isBuffer(e) || (e = u.from(e, c)), u.isBuffer(r) || (r = u.from(r, c)), s(n(y).then(function (t) {
          return t ? o(e, r, a, d, y) : h(e, r, a, d, p)
        }), b)
      }
    }).call(t, r(6), r(9))
  }, function (e, t, r) {
    t.publicEncrypt = r(145), t.privateDecrypt = r(144), t.privateEncrypt = function (e, r) {
      return t.publicEncrypt(e, r, !0)
    }, t.publicDecrypt = function (e, r) {
      return t.privateDecrypt(e, r, !0)
    }
  }, function (e, t, r) {
    (function (t) {
      function i(e, r) {
        var i = (e.modulus, e.modulus.byteLength()), n = (r.length, u("sha1").update(new t("")).digest()), s = n.length;
        if (0 !== r[0])throw new Error("decryption error");
        var c = r.slice(1, s + 1), h = r.slice(s + 1), d = f(c, a(h, s)), l = f(h, a(d, i - s - 1));
        if (o(n, l.slice(0, s)))throw new Error("decryption error");
        for (var p = s; 0 === l[p];)p++;
        if (1 !== l[p++])throw new Error("decryption error");
        return l.slice(p)
      }

      function n(e, t, r) {
        for (var i = t.slice(0, 2), n = 2, o = 0; 0 !== t[n++];)if (n >= t.length) {
          o++;
          break
        }
        var s = t.slice(2, n - 1);
        t.slice(n - 1, n);
        if (("0002" !== i.toString("hex") && !r || "0001" !== i.toString("hex") && r) && o++, s.length < 8 && o++, o)throw new Error("decryption error");
        return t.slice(n)
      }

      function o(e, r) {
        e = new t(e), r = new t(r);
        var i = 0, n = e.length;
        e.length !== r.length && (i++, n = Math.min(e.length, r.length));
        for (var o = -1; ++o < n;)i += e[o] ^ r[o];
        return i
      }

      var s = r(22), a = r(63), f = r(65), c = r(3), h = r(26), u = r(17), d = r(64);
      e.exports = function (e, r, o) {
        var a;
        a = e.padding ? e.padding : o ? 1 : 4;
        var f = s(e), u = f.modulus.byteLength();
        if (r.length > u || new c(r).cmp(f.modulus) >= 0)throw new Error("decryption error");
        var l;
        l = o ? d(new c(r), f) : h(r, f);
        var p = new t(u - l.length);
        if (p.fill(0), l = t.concat([p, l], u), 4 === a)return i(f, l);
        if (1 === a)return n(f, l, o);
        if (3 === a)return l;
        throw new Error("unknown padding")
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    (function (t) {
      function i(e, r) {
        var i = e.modulus.byteLength(), n = r.length, o = f("sha1").update(new t("")).digest(), s = o.length, d = 2 * s;
        if (n > i - d - 2)throw new Error("message too long");
        var l = new t(i - n - d - 2);
        l.fill(0);
        var p = i - s - 1, b = a(s), y = h(t.concat([o, l, new t([1]), r], p), c(b, p)), m = h(b, c(y, s));
        return new u(t.concat([new t([0]), m, y], i))
      }

      function n(e, r, i) {
        var n = r.length, s = e.modulus.byteLength();
        if (n > s - 11)throw new Error("message too long");
        var a;
        return i ? (a = new t(s - n - 3), a.fill(255)) : a = o(s - n - 3), new u(t.concat([new t([0, i ? 1 : 2]), a, new t([0]), r], s))
      }

      function o(e, r) {
        for (var i, n = new t(e), o = 0, s = a(2 * e), f = 0; o < e;)f === s.length && (s = a(2 * e), f = 0), (i = s[f++]) && (n[o++] = i);
        return n
      }

      var s = r(22), a = r(11), f = r(17), c = r(63), h = r(65), u = r(3), d = r(64), l = r(26);
      e.exports = function (e, t, r) {
        var o;
        o = e.padding ? e.padding : r ? 1 : 4;
        var a, f = s(e);
        if (4 === o)a = i(f, t); else if (1 === o)a = n(f, t, r); else {
          if (3 !== o)throw new Error("unknown padding");
          if (a = new u(t), a.cmp(f.modulus) >= 0)throw new Error("data too long for modulus")
        }
        return r ? l(a, f) : d(a, f)
      }
    }).call(t, r(2).Buffer)
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      return decodeURIComponent(e.replace(/\+/g, " "))
    }

    function n(e) {
      for (var t, r = /([^=?&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
        var o = i(t[1]), s = i(t[2]);
        o in n || (n[o] = s)
      }
      return n
    }

    function o(e, t) {
      t = t || "";
      var r = [];
      "string" != typeof t && (t = "?");
      for (var i in e)s.call(e, i) && r.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
      return r.length ? t + r.join("&") : ""
    }

    var s = Object.prototype.hasOwnProperty;
    t.stringify = o, t.parse = n
  }, function (e, t, r) {
    "use strict";
    (function (e, i) {
      function n() {
        throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
      }

      function o(e, t) {
        if ("number" != typeof e || e !== e)throw new TypeError("offset must be a number");
        if (e > b || e < 0)throw new TypeError("offset must be a uint32");
        if (e > l || e > t)throw new RangeError("offset out of range")
      }

      function s(e, t, r) {
        if ("number" != typeof e || e !== e)throw new TypeError("size must be a number");
        if (e > b || e < 0)throw new TypeError("size must be a uint32");
        if (e + t > r || e > l)throw new RangeError("buffer too small")
      }

      function a(t, r, i, n) {
        if (!(d.isBuffer(t) || t instanceof e.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
        if ("function" == typeof r)n = r, r = 0, i = t.length; else if ("function" == typeof i)n = i, i = t.length - r; else if ("function" != typeof n)throw new TypeError('"cb" argument must be a function');
        return o(r, t.length), s(i, r, t.length), f(t, r, i, n)
      }

      function f(e, t, r, n) {
        if (i.browser) {
          var o = e.buffer, s = new Uint8Array(o, t, r);
          return p.getRandomValues(s), n ? void i.nextTick(function () {
            n(null, e)
          }) : e
        }
        return n ? void u(r, function (r, i) {
          if (r)return n(r);
          i.copy(e, t), n(null, e)
        }) : (u(r).copy(e, t), e)
      }

      function c(t, r, i) {
        if (void 0 === r && (r = 0), !(d.isBuffer(t) || t instanceof e.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
        return o(r, t.length), void 0 === i && (i = t.length - r), s(i, r, t.length), f(t, r, i)
      }

      var h = r(1), u = r(11), d = h.Buffer, l = h.kMaxLength, p = e.crypto || e.msCrypto, b = Math.pow(2, 32) - 1;
      p && p.getRandomValues || !i.browser ? (t.randomFill = a, t.randomFillSync = c) : (t.randomFill = n, t.randomFillSync = n)
    }).call(t, r(6), r(9))
  }, function (e, t, r) {
    e.exports = r(10)
  }, function (e, t, r) {
    "use strict";
    function i(e) {
      if (!(this instanceof i))return new i(e);
      n.call(this, e)
    }

    e.exports = i;
    var n = r(67), o = r(16);
    o.inherits = r(0), o.inherits(i, n), i.prototype._transform = function (e, t, r) {
      r(null, e)
    }
  }, function (e, t, r) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    function n(e, t, r) {
      e.copy(t, r)
    }

    var o = r(1).Buffer, s = r(170);
    e.exports = function () {
      function e() {
        i(this, e), this.head = null, this.tail = null, this.length = 0
      }

      return e.prototype.push = function (e) {
        var t = {data: e, next: null};
        this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
      }, e.prototype.unshift = function (e) {
        var t = {data: e, next: this.head};
        0 === this.length && (this.tail = t), this.head = t, ++this.length
      }, e.prototype.shift = function () {
        if (0 !== this.length) {
          var e = this.head.data;
          return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
        }
      }, e.prototype.clear = function () {
        this.head = this.tail = null, this.length = 0
      }, e.prototype.join = function (e) {
        if (0 === this.length)return "";
        for (var t = this.head, r = "" + t.data; t = t.next;)r += e + t.data;
        return r
      }, e.prototype.concat = function (e) {
        if (0 === this.length)return o.alloc(0);
        if (1 === this.length)return this.head.data;
        for (var t = o.allocUnsafe(e >>> 0), r = this.head, i = 0; r;)n(r.data, t, i), i += r.data.length, r = r.next;
        return t
      }, e
    }(), s && s.inspect && s.inspect.custom && (e.exports.prototype[s.inspect.custom] = function () {
      var e = s.inspect({length: this.length});
      return this.constructor.name + " " + e
    })
  }, function (e, t, r) {
    e.exports = r(32).PassThrough
  }, function (e, t, r) {
    e.exports = r(32).Transform
  }, function (e, t, r) {
    e.exports = r(31)
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
      if (t = t.split(":")[0], !(e = +e))return !1;
      switch (t) {
        case"http":
        case"ws":
          return 80 !== e;
        case"https":
        case"wss":
          return 443 !== e;
        case"ftp":
          return 21 !== e;
        case"gopher":
          return 70 !== e;
        case"file":
          return !1
      }
      return 0 !== e
    }
  }, function (e, t, r) {
    (function (e, t) {
      !function (e, r) {
        "use strict";
        function i(e) {
          "function" != typeof e && (e = new Function("" + e));
          for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++)t[r] = arguments[r + 1];
          var i = {callback: e, args: t};
          return c[f] = i, a(f), f++
        }

        function n(e) {
          delete c[e]
        }

        function o(e) {
          var t = e.callback, i = e.args;
          switch (i.length) {
            case 0:
              t();
              break;
            case 1:
              t(i[0]);
              break;
            case 2:
              t(i[0], i[1]);
              break;
            case 3:
              t(i[0], i[1], i[2]);
              break;
            default:
              t.apply(r, i)
          }
        }

        function s(e) {
          if (h)setTimeout(s, 0, e); else {
            var t = c[e];
            if (t) {
              h = !0;
              try {
                o(t)
              } finally {
                n(e), h = !1
              }
            }
          }
        }

        if (!e.setImmediate) {
          var a, f = 1, c = {}, h = !1, u = e.document, d = Object.getPrototypeOf && Object.getPrototypeOf(e);
          d = d && d.setTimeout ? d : e, "[object process]" === {}.toString.call(e.process) ? function () {
            a = function (e) {
              t.nextTick(function () {
                s(e)
              })
            }
          }() : function () {
            if (e.postMessage && !e.importScripts) {
              var t = !0, r = e.onmessage;
              return e.onmessage = function () {
                t = !1
              }, e.postMessage("", "*"), e.onmessage = r, t
            }
          }() ? function () {
            var t = "setImmediate$" + Math.random() + "$", r = function (r) {
              r.source === e && "string" == typeof r.data && 0 === r.data.indexOf(t) && s(+r.data.slice(t.length))
            };
            e.addEventListener ? e.addEventListener("message", r, !1) : e.attachEvent("onmessage", r), a = function (r) {
              e.postMessage(t + r, "*")
            }
          }() : e.MessageChannel ? function () {
            var e = new MessageChannel;
            e.port1.onmessage = function (e) {
              s(e.data)
            }, a = function (t) {
              e.port2.postMessage(t)
            }
          }() : u && "onreadystatechange" in u.createElement("script") ? function () {
            var e = u.documentElement;
            a = function (t) {
              var r = u.createElement("script");
              r.onreadystatechange = function () {
                s(t), r.onreadystatechange = null, e.removeChild(r), r = null
              }, e.appendChild(r)
            }
          }() : function () {
            a = function (e) {
              setTimeout(s, 0, e)
            }
          }(), d.setImmediate = i, d.clearImmediate = n
        }
      }("undefined" == typeof self ? void 0 === e ? this : e : self)
    }).call(t, r(6), r(9))
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = u, f.call(this, 64, 56)
    }

    function n(e) {
      return e << 5 | e >>> 27
    }

    function o(e) {
      return e << 30 | e >>> 2
    }

    function s(e, t, r, i) {
      return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i
    }

    var a = r(0), f = r(12), c = r(1).Buffer, h = [1518500249, 1859775393, -1894007588, -899497514], u = new Array(80);
    a(i, f), i.prototype.init = function () {
      return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, i.prototype._update = function (e) {
      for (var t = this._w, r = 0 | this._a, i = 0 | this._b, a = 0 | this._c, f = 0 | this._d, c = 0 | this._e, u = 0; u < 16; ++u)t[u] = e.readInt32BE(4 * u);
      for (; u < 80; ++u)t[u] = t[u - 3] ^ t[u - 8] ^ t[u - 14] ^ t[u - 16];
      for (var d = 0; d < 80; ++d) {
        var l = ~~(d / 20), p = n(r) + s(l, i, a, f) + c + t[d] + h[l] | 0;
        c = f, f = a, a = o(i), i = r, r = p
      }
      this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = a + this._c | 0, this._d = f + this._d | 0, this._e = c + this._e | 0
    }, i.prototype._hash = function () {
      var e = c.allocUnsafe(20);
      return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
    }, e.exports = i
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = d, c.call(this, 64, 56)
    }

    function n(e) {
      return e << 1 | e >>> 31
    }

    function o(e) {
      return e << 5 | e >>> 27
    }

    function s(e) {
      return e << 30 | e >>> 2
    }

    function a(e, t, r, i) {
      return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i
    }

    var f = r(0), c = r(12), h = r(1).Buffer, u = [1518500249, 1859775393, -1894007588, -899497514], d = new Array(80);
    f(i, c), i.prototype.init = function () {
      return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, i.prototype._update = function (e) {
      for (var t = this._w, r = 0 | this._a, i = 0 | this._b, f = 0 | this._c, c = 0 | this._d, h = 0 | this._e, d = 0; d < 16; ++d)t[d] = e.readInt32BE(4 * d);
      for (; d < 80; ++d)t[d] = n(t[d - 3] ^ t[d - 8] ^ t[d - 14] ^ t[d - 16]);
      for (var l = 0; l < 80; ++l) {
        var p = ~~(l / 20), b = o(r) + a(p, i, f, c) + h + t[l] + u[p] | 0;
        h = c, c = f, f = s(i), i = r, r = b
      }
      this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = f + this._c | 0, this._d = c + this._d | 0, this._e = h + this._e | 0
    }, i.prototype._hash = function () {
      var e = h.allocUnsafe(20);
      return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
    }, e.exports = i
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = f, s.call(this, 64, 56)
    }

    var n = r(0), o = r(70), s = r(12), a = r(1).Buffer, f = new Array(64);
    n(i, o), i.prototype.init = function () {
      return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
    }, i.prototype._hash = function () {
      var e = a.allocUnsafe(28);
      return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e
    }, e.exports = i
  }, function (e, t, r) {
    function i() {
      this.init(), this._w = f, s.call(this, 128, 112)
    }

    var n = r(0), o = r(71), s = r(12), a = r(1).Buffer, f = new Array(160);
    n(i, o), i.prototype.init = function () {
      return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
    }, i.prototype._hash = function () {
      function e(e, r, i) {
        t.writeInt32BE(e, i), t.writeInt32BE(r, i + 4)
      }

      var t = a.allocUnsafe(48);
      return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t
    }, e.exports = i
  }, function (e, t, r) {
    (function (e) {
      function i(e, t) {
        this._id = e, this._clearFn = t
      }

      var n = void 0 !== e && e || "undefined" != typeof self && self || window, o = Function.prototype.apply;
      t.setTimeout = function () {
        return new i(o.call(setTimeout, n, arguments), clearTimeout)
      }, t.setInterval = function () {
        return new i(o.call(setInterval, n, arguments), clearInterval)
      }, t.clearTimeout = t.clearInterval = function (e) {
        e && e.close()
      }, i.prototype.unref = i.prototype.ref = function () {
      }, i.prototype.close = function () {
        this._clearFn.call(n, this._id)
      }, t.enroll = function (e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t
      }, t.unenroll = function (e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
      }, t._unrefActive = t.active = function (e) {
        clearTimeout(e._idleTimeoutId);
        var t = e._idleTimeout;
        t >= 0 && (e._idleTimeoutId = setTimeout(function () {
          e._onTimeout && e._onTimeout()
        }, t))
      }, r(155), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
    }).call(t, r(6))
  }, function (e, t, r) {
    (function (t) {
      function r(e, t) {
        function r() {
          if (!n) {
            if (i("throwDeprecation"))throw new Error(t);
            i("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0
          }
          return e.apply(this, arguments)
        }

        if (i("noDeprecation"))return e;
        var n = !1;
        return r
      }

      function i(e) {
        try {
          if (!t.localStorage)return !1
        } catch (e) {
          return !1
        }
        var r = t.localStorage[e];
        return null != r && "true" === String(r).toLowerCase()
      }

      e.exports = r
    }).call(t, r(6))
  }, function (module, exports, __webpack_require__) {
    function Context() {
    }

    var indexOf = __webpack_require__(137), Object_keys = function (e) {
      if (Object.keys)return Object.keys(e);
      var t = [];
      for (var r in e)t.push(r);
      return t
    }, forEach = function (e, t) {
      if (e.forEach)return e.forEach(t);
      for (var r = 0; r < e.length; r++)t(e[r], r, e)
    }, defineProp = function () {
      try {
        return Object.defineProperty({}, "_", {}), function (e, t, r) {
          Object.defineProperty(e, t, {writable: !0, enumerable: !1, configurable: !0, value: r})
        }
      } catch (e) {
        return function (e, t, r) {
          e[t] = r
        }
      }
    }(), globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];
    Context.prototype = {};
    var Script = exports.Script = function (e) {
      if (!(this instanceof Script))return new Script(e);
      this.code = e
    };
    Script.prototype.runInContext = function (e) {
      if (!(e instanceof Context))throw new TypeError("needs a 'context' argument.");
      var t = document.createElement("iframe");
      t.style || (t.style = {}), t.style.display = "none", document.body.appendChild(t);
      var r = t.contentWindow, i = r.eval, n = r.execScript;
      !i && n && (n.call(r, "null"), i = r.eval), forEach(Object_keys(e), function (t) {
        r[t] = e[t]
      }), forEach(globals, function (t) {
        e[t] && (r[t] = e[t])
      });
      var o = Object_keys(r), s = i.call(r, this.code);
      return forEach(Object_keys(r), function (t) {
        (t in e || -1 === indexOf(o, t)) && (e[t] = r[t])
      }), forEach(globals, function (t) {
        t in e || defineProp(e, t, r[t])
      }), document.body.removeChild(t), s
    }, Script.prototype.runInThisContext = function () {
      return eval(this.code)
    }, Script.prototype.runInNewContext = function (e) {
      var t = Script.createContext(e), r = this.runInContext(t);
      return forEach(Object_keys(t), function (r) {
        e[r] = t[r]
      }), r
    }, forEach(Object_keys(Script.prototype), function (e) {
      exports[e] = Script[e] = function (t) {
        var r = Script(t);
        return r[e].apply(r, [].slice.call(arguments, 1))
      }
    }), exports.createScript = function (e) {
      return exports.Script(e)
    }, exports.createContext = Script.createContext = function (e) {
      var t = new Context;
      return "object" == typeof e && forEach(Object_keys(e), function (r) {
        t[r] = e[r]
      }), t
    }
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {
      }, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
        enumerable: !0,
        get: function () {
          return e.l
        }
      }), Object.defineProperty(e, "id", {
        enumerable: !0, get: function () {
          return e.i
        }
      }), e.webpackPolyfill = 1), e
    }
  }, function (e, t) {
    function r() {
      this.browser = window.SafariViewController, this.open = this.open.bind(this), this.close = this.close.bind(this)
    }

    r.isAvailable = function (e) {
      window.SafariViewController.isAvailable(e)
    }, r.prototype.open = function (e, t) {
      var r = {hidden: !1, url: e};
      this.browser.show(r, function (e) {
        t(null, e)
      }, function (e) {
        t(new Error(e))
      })
    }, r.prototype.close = function () {
      this.browser.hide()
    }, e.exports = r
  }, function (e, t) {
    function r() {
      this.tab = null, this.handler = null, this.open = this.open.bind(this), this.handleFirstLoadEnd = this.handleFirstLoadEnd.bind(this), this.handleLoadError = this.handleLoadError.bind(this), this.handleExit = this.handleExit.bind(this), this.clearEvents = this.clearEvents.bind(this), this.close = this.close.bind(this)
    }

    r.prototype.open = function (e, t) {
      var r = window.cordova.InAppBrowser, i = r.open(e, "_blank");
      i.addEventListener("loadstop", this.handleFirstLoadEnd), i.addEventListener("loaderror", this.handleLoadError), i.addEventListener("exit", this.handleExit), this.tab = i, this.handler = t
    }, r.prototype.handleFirstLoadEnd = function () {
      this.handler(null, {event: "loaded"})
    }, r.prototype.handleLoadError = function (e) {
      this.clearEvents(), this.handler(e, null)
    }, r.prototype.handleExit = function () {
      this.clearEvents(), this.handler(null, {event: "closed"})
    }, r.prototype.clearEvents = function () {
      this.tab.null || (this.tab.removeEventListener("loaderror", this.handleLoadError), this.tab.removeEventListener("loadstop", this.handleFirstLoadEnd), this.tab.removeEventListener("exit", this.handleExit))
    }, r.prototype.close = function () {
      null != this.tab && this.tab.close(), this.clearEvents(), this.tab = null, this.handler = null
    }, e.exports = r
  }, function (e, t, r) {
    function i(e) {
      this.clientId = e.clientId, this.domain = e.domain, this.redirectUri = e.packageIdentifier + "://" + e.domain + "/cordova/" + e.packageIdentifier + "/callback", this.auth0 = new o.WebAuth({
        clientID: this.clientId,
        domain: this.domain
      }), this.client = new o.Authentication(this.auth0, {
        clientID: this.clientId,
        domain: this.domain,
        _telemetryInfo: l
      })
    }

    var n = r(73), o = r(72), s = r(74), a = r(75), f = r(76), c = r(77).getOS, h = r(78).raw, u = a.generateProofKey, d = a.generateState;
    f.clean();
    var l = {version: h, name: "auth0-cordova", lib_version: o.version};
    i.prototype.authorize = function (e, t) {
      if (!t || "function" != typeof t)throw new Error("callback not specified or is not a function");
      var r = this;
      s(function (i, o) {
        if (i)return t(i);
        var s = u(), a = r.client, h = r.redirectUri, l = e.state || d();
        e.state = l;
        var p = Object.assign({}, e, {
          code_challenge_method: "S256",
          responseType: "code",
          redirectUri: h,
          code_challenge: s.codeChallenge
        }), b = a.buildAuthorizeUrl(p);
        o.open(b, function (e, r) {
          if (null != e)return f.clean(), t(e);
          if ("closed" === r.event) {
            var i = function () {
              if (f.isClosing)return f.clean(), t(new Error("user canceled"))
            };
            if (f.closing(), "ios" !== c())return void setTimeout(i, 1e3);
            i()
          }
          "loaded" === r.event && f.start(function (e, r) {
            if (null != e)return t(e), !0;
            if (-1 === r.indexOf(h))return !1;
            if (!r || "string" != typeof r)return t(new Error("url must be a string")), !0;
            var i = n(r, !0).query;
            if (i.error)return t(new Error(i.error_description || i.error)), !0;
            if (i.state !== l)return t(new Error("Response state does not match expected state")), !0;
            var f = i.code, c = s.codeVerifier;
            return o.close(), a.oauthToken({
              code_verifier: c,
              grantType: "authorization_code",
              redirectUri: h,
              code: f
            }, function (e, r) {
              return e ? t(e) : t(null, r)
            }), !0
          })
        })
      })
    }, i.onRedirectUri = function (e) {
      return window.webkit && window.webkit.messageHandlers ? f.onRedirectUri(e) : setTimeout(function () {
        f.onRedirectUri(e)
      }, 4)
    }, i.version = h, e.exports = i
  }, function (e, t) {
  }, function (e, t) {
  }, function (e, t) {
  }, function (e, t) {
  }])
});
//# sourceMappingURL=index.js.map