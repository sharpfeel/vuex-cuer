(function(t, n) {
  if ("object" === typeof exports && "object" === typeof module)
    module.exports = n(require("Vuex"), require("Vue"));
  else if ("function" === typeof define && define.amd)
    define(["Vuex", "Vue"], n);
  else {
    const r =
      "object" === typeof exports
        ? n(require("Vuex"), require("Vue"))
        : n(t["Vuex"], t["Vue"]);
    for (const e in r) ("object" === typeof exports ? exports : t)[e] = r[e];
  }
})(window, function(t, n) {
  return (function(t) {
    const n = {};
    function r(e) {
      if (n[e]) return n[e].exports;
      const o = (n[e] = { i: e, l: !1, exports: {} });
      return t[e].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = t),
      (r.c = n),
      (r.d = function(t, n, e) {
        r.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e });
      }),
      (r.r = function(t) {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function(t, n) {
        if ((1 & n && (t = r(t)), 8 & n)) return t;
        if (4 & n && "object" === typeof t && t && t.__esModule) return t;
        const e = Object.create(null);
        if (
          (r.r(e),
          Object.defineProperty(e, "default", { enumerable: !0, value: t }),
          2 & n && "string" != typeof t)
        )
          for (const o in t)
            r.d(
              e,
              o,
              function(n) {
                return t[n];
              }.bind(null, o)
            );
        return e;
      }),
      (r.n = function(t) {
        const n =
          t && t.__esModule
            ? function() {
                return t["default"];
              }
            : function() {
                return t;
              };
        return r.d(n, "a", n), n;
      }),
      (r.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (r.p = "/"),
      r((r.s = 2))
    );
  })([
    function(n, r) {
      n.exports = t;
    },
    function(t, r) {
      t.exports = n;
    },
    function(t, n, r) {
      "use strict";
      r.r(n),
        r.d(n, "ICuer", function() {
          return s;
        }),
        r.d(n, "Mutations", function() {
          return a;
        }),
        r.d(n, "Actions", function() {
          return l;
        }),
        r.d(n, "Getters", function() {
          return p;
        }),
        r.d(n, "StoreCuer", function() {
          return m;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var e = function(t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, n) {
                t.__proto__ = n;
              }) ||
            function(t, n) {
              for (const r in n) n.hasOwnProperty(r) && (t[r] = n[r]);
            }),
          e(t, n)
        );
      };
      function o(t, n) {
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      }
      const u = r(0),
        i = r.n(u),
        c = r(1),
        f = r.n(c);
      f.a.use(i.a);
      var s = (function() {
          function t() {}
          return t;
        })(),
        a = (function(t) {
          function n() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return o(n, t), n;
        })(s),
        l = (function(t) {
          function n() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return o(n, t), n;
        })(s),
        p = (function(t) {
          function n() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return o(n, t), n;
        })(s);
      function d(t) {
        return null != t
          ? Object.getOwnPropertyNames(Object.getPrototypeOf(t)).filter(
              function(t) {
                return "constructor" != t;
              }
            )
          : [];
      }
      function y(t, n, r) {
        if (null != t) {
          const e = {};
          n.forEach(function(n) {
            (e[n] = t[n]), e[n] && r(n, e[n]);
          });
        }
      }
      function v(t, n) {
        return Object.assign(n, { store: t }), n;
      }
      function b(t, n, r) {
        null != t &&
          n.forEach(function(n) {
            t[n] = r(n);
          });
      }
      function h(t, n) {
        const r = {};
        return (
          t.forEach(function(t) {
            r[t] = n(t);
          }),
          r
        );
      }
      var m = (function(t) {
        function n(n, r) {
          let e,
            o,
            u,
            i,
            c,
            f = this,
            s = {},
            a = null === (e = r) || void 0 === e ? void 0 : e.mutations,
            l = d(a);
          y(a, l, function(t, n) {
            s[t] = function(t, r) {
              n.call(Object.assign(f.commits, { state: t }), r);
            };
          });
          const p = {},
            h = null === (o = r) || void 0 === o ? void 0 : o.actions,
            m = d(h);
          y(h, m, function(t, n) {
            p[t] = function(t, r) {
              return n.call(Object.assign(f.dispatchs, { state: t.state }), r);
            };
          }),
            (f =
              t.call(this, {
                state: n,
                mutations: s,
                actions: p,
                plugins: null === (u = r) || void 0 === u ? void 0 : u.plugins,
                strict: null === (i = r) || void 0 === i ? void 0 : i.strict
              }) || this),
            console.log("[vuex-cuer]", { state: n, mutations: l, actions: m }),
            b(a, l, function(t) {
              return function(n) {
                return f.commit(t, n);
              };
            }),
            a && (f.commits = v(f, a)),
            b(h, m, function(t) {
              return function(n) {
                return f.dispatch(t, n);
              };
            }),
            h && (f.dispatchs = v(f, h));
          const g = null === (c = r) || void 0 === c ? void 0 : c.getters;
          return g && (f.getters = v(f, g)), f;
        }
        return (
          o(n, t),
          (n.prototype.subscribe = function(n) {
            return t.prototype.subscribe.call(this, n);
          }),
          (n.prototype.subscribeAction = function(n) {
            return t.prototype.subscribeAction.call(this, n);
          }),
          (n.prototype.mapState = function() {
            for (var t = this, n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return h(n, function(n) {
              return function() {
                return t.state[n];
              };
            });
          }),
          (n.prototype.mapGetters = function() {
            for (var t = this, n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return h(n, function(n) {
              return function() {
                return t.getters[n];
              };
            });
          }),
          (n.prototype.mapActions = function() {
            for (var t = this, n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return h(n, function(n) {
              return t.dispatchs[n];
            });
          }),
          (n.prototype.mapMutations = function() {
            for (var t = this, n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return h(n, function(n) {
              return t.commits[n];
            });
          }),
          n
        );
      })(u["Store"]);
    }
  ]);
});
//# sourceMappingURL=index.js.map
