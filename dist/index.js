import i1, { Children as S, useState as o1, forwardRef as l1, useRef as c1, useEffect as a1, useImperativeHandle as d1 } from "react";
var T = { exports: {} }, v = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var F;
function u1() {
  if (F) return v;
  F = 1;
  var t = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function c(o, a, i) {
    var h = null;
    if (i !== void 0 && (h = "" + i), a.key !== void 0 && (h = "" + a.key), "key" in a) {
      i = {};
      for (var x in a)
        x !== "key" && (i[x] = a[x]);
    } else i = a;
    return a = i.ref, {
      $$typeof: t,
      type: o,
      key: h,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return v.Fragment = s, v.jsx = c, v.jsxs = c, v;
}
var b = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var W;
function h1() {
  return W || (W = 1, process.env.NODE_ENV !== "production" && function() {
    function t(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === t1 ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case k:
          return "Fragment";
        case G:
          return "Profiler";
        case z:
          return "StrictMode";
        case Q:
          return "Suspense";
        case K:
          return "SuspenseList";
        case r1:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case U:
            return "Portal";
          case J:
            return (r.displayName || "Context") + ".Provider";
          case q:
            return (r._context.displayName || "Context") + ".Consumer";
          case X:
            var n = r.render;
            return r = r.displayName, r || (r = n.displayName || n.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case e1:
            return n = r.displayName || null, n !== null ? n : t(r.type) || "Memo";
          case O:
            n = r._payload, r = r._init;
            try {
              return t(r(n));
            } catch {
            }
        }
      return null;
    }
    function s(r) {
      return "" + r;
    }
    function c(r) {
      try {
        s(r);
        var n = !1;
      } catch {
        n = !0;
      }
      if (n) {
        n = console;
        var l = n.error, d = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return l.call(
          n,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          d
        ), s(r);
      }
    }
    function o(r) {
      if (r === k) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === O)
        return "<...>";
      try {
        var n = t(r);
        return n ? "<" + n + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var r = L.A;
      return r === null ? null : r.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function h(r) {
      if (P.call(r, "key")) {
        var n = Object.getOwnPropertyDescriptor(r, "key").get;
        if (n && n.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function x(r, n) {
      function l() {
        Z || (Z = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          n
        ));
      }
      l.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: l,
        configurable: !0
      });
    }
    function g() {
      var r = t(this.type);
      return I[r] || (I[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function m(r, n, l, d, C, f, _, M) {
      return l = f.ref, r = {
        $$typeof: N,
        type: r,
        key: n,
        props: f,
        _owner: C
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: g
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: _
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function E(r, n, l, d, C, f, _, M) {
      var u = n.children;
      if (u !== void 0)
        if (d)
          if (n1(u)) {
            for (d = 0; d < u.length; d++)
              V(u[d]);
            Object.freeze && Object.freeze(u);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else V(u);
      if (P.call(n, "key")) {
        u = t(r);
        var w = Object.keys(n).filter(function(s1) {
          return s1 !== "key";
        });
        d = 0 < w.length ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}", D[u + d] || (w = 0 < w.length ? "{" + w.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          d,
          u,
          w,
          u
        ), D[u + d] = !0);
      }
      if (u = null, l !== void 0 && (c(l), u = "" + l), h(n) && (c(n.key), u = "" + n.key), "key" in n) {
        l = {};
        for (var H in n)
          H !== "key" && (l[H] = n[H]);
      } else l = n;
      return u && x(
        l,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), m(
        r,
        u,
        f,
        C,
        a(),
        l,
        _,
        M
      );
    }
    function V(r) {
      typeof r == "object" && r !== null && r.$$typeof === N && r._store && (r._store.validated = 1);
    }
    var R = i1, N = Symbol.for("react.transitional.element"), U = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), G = Symbol.for("react.profiler"), q = Symbol.for("react.consumer"), J = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), e1 = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), r1 = Symbol.for("react.activity"), t1 = Symbol.for("react.client.reference"), L = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = Object.prototype.hasOwnProperty, n1 = Array.isArray, y = console.createTask ? console.createTask : function() {
      return null;
    };
    R = {
      "react-stack-bottom-frame": function(r) {
        return r();
      }
    };
    var Z, I = {}, B = R["react-stack-bottom-frame"].bind(
      R,
      i
    )(), Y = y(o(i)), D = {};
    b.Fragment = k, b.jsx = function(r, n, l, d, C) {
      var f = 1e4 > L.recentlyCreatedOwnerStacks++;
      return E(
        r,
        n,
        l,
        !1,
        d,
        C,
        f ? Error("react-stack-top-frame") : B,
        f ? y(o(r)) : Y
      );
    }, b.jsxs = function(r, n, l, d, C) {
      var f = 1e4 > L.recentlyCreatedOwnerStacks++;
      return E(
        r,
        n,
        l,
        !0,
        d,
        C,
        f ? Error("react-stack-top-frame") : B,
        f ? y(o(r)) : Y
      );
    };
  }()), b;
}
var $;
function x1() {
  return $ || ($ = 1, process.env.NODE_ENV === "production" ? T.exports = u1() : T.exports = h1()), T.exports;
}
var e = x1();
function f1(t) {
  const s = window.getSelection();
  if (!s.rangeCount) return;
  const c = s.getRangeAt(0), o = c.commonAncestorContainer.parentElement;
  if (o.tagName === "LI" && o.parentElement.tagName === t.toUpperCase()) {
    const i = o.parentElement;
    for (; i.firstChild; )
      i.parentElement.insertBefore(i.firstChild, i);
    i.parentElement.removeChild(i);
  } else {
    const i = document.createElement(t), h = document.createElement("li");
    h.textContent = c.toString(), i.appendChild(h), c.deleteContents(), c.insertNode(i), s.removeAllRanges();
    const x = document.createRange();
    x.setStartAfter(i), s.addRange(x);
  }
}
function g1(t, s, c = !1) {
  const o = window.getSelection();
  if (!o.rangeCount) return;
  const a = o.getRangeAt(0), i = a.toString();
  if (i.length === 0) return;
  const h = a.commonAncestorContainer.parentElement;
  if (h.style[t] === s)
    h.style[t] = "";
  else {
    const g = document.createElement(c ? "div" : "span");
    g.style[t] = s, g.textContent = i, a.deleteContents(), a.insertNode(g), o.removeAllRanges();
    const m = document.createRange();
    m.setStartAfter(g), o.addRange(m);
  }
}
function j(t) {
  switch (t) {
    case "list":
      return f1;
    default:
      return g1;
  }
}
function p({ cb: t, children: s }) {
  function c(o) {
    o.preventDefault(), t();
  }
  return /* @__PURE__ */ e.jsx("button", { onClick: c, className: "richTextButton", children: S.map(s, (o) => o) });
}
function j1() {
  const t = j();
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("textDecoration", "underline"), children: /* @__PURE__ */ e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e.jsx(
    "path",
    {
      d: "M4 21H20M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 3H8M16 3H20",
      stroke: "#000000",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function p1() {
  const t = j();
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("fontWeight", "bold"), children: /* @__PURE__ */ e.jsx(
    "svg",
    {
      fill: "#000000",
      viewBox: "-6.5 0 32 32",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ e.jsx("path", { d: "M0 25.531v1.344c1.063-0.031 1.938-0.063 2.563-0.094 0.625 0 1.094-0.031 1.313-0.031 1.656-0.125 3.063-0.219 4.281-0.188l2.813 0.063c2.438 0 4.25-0.313 5.75-1 0.719-0.344 1.344-0.844 1.969-1.531 0.469-0.469 0.813-1.031 1.031-1.656 0.25-0.844 0.375-1.594 0.375-2.281 0-2.5-1.719-4.625-5.094-5.406 0.531-0.25 1.031-0.5 1.375-0.688s0.625-0.313 0.781-0.438c1.188-0.875 1.781-1.906 1.781-3.281 0-0.594-0.094-1.188-0.281-1.719-0.375-1.094-1.219-2-2.406-2.563-0.531-0.313-1.031-0.469-1.375-0.531-0.938-0.25-1.844-0.375-2.719-0.375h-1.094c-0.219 0-0.406 0-0.531-0.031h-0.5c-0.063 0-0.156 0-0.25 0.031h-0.625l-5.406 0.156-3.719 0.094 0.063 1.188c0.875 0.125 1.406 0.188 1.625 0.188 0.438 0 0.781 0.094 0.969 0.219 0.094 0 0.156 0.063 0.188 0.125 0.063 0.219 0.125 0.688 0.156 1.563 0.063 1.563 0.063 2.813 0.063 3.75 0.031 0.969 0.031 1.625 0.094 2v7.031c0 1.219-0.031 2.125-0.156 2.75-0.031 0.219-0.125 0.438-0.281 0.688-0.438 0.188-1 0.375-1.75 0.469-0.375 0.063-0.719 0.125-1 0.156zM7.719 14.281v-2.469c0.063-1.719 0-2.969-0.031-3.969-0.063-0.438-0.063-0.844-0.063-1.063 0.75-0.156 1.344-0.219 1.844-0.219 1.625 0 2.844 0.344 3.656 1.094 0.813 0.688 1.219 1.563 1.219 2.656 0 2.969-1.75 4.094-5.063 4.094-0.563 0-1.094-0.031-1.563-0.125zM7.719 20.406v-4.5c0.313-0.063 0.75-0.125 1.438-0.125 1.594-0.031 2.813 0.125 3.563 0.438 1.531 0.563 2.594 2.188 2.594 4.344 0 1.031-0.219 1.844-0.563 2.563-0.375 0.719-0.906 1.219-1.719 1.594-1.656 0.781-3.719 0.719-5.125 0.125-0.094-0.25-0.125-0.438-0.125-0.594z" })
    }
  ) });
}
function C1() {
  const t = j();
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("fontStyle", "italic"), children: /* @__PURE__ */ e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e.jsx(
    "path",
    {
      d: "M10 3H20M4 21H14M15 3L9 21",
      stroke: "#000000",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function m1() {
  const t = j(), [s, c] = o1("#000000");
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      "input",
      {
        type: "color",
        value: s,
        onChange: (o) => {
          o.preventDefault(), c(o.target.value);
        },
        className: "inputRichInput"
      }
    ),
    /* @__PURE__ */ e.jsx(p, { cb: () => t("color", s), children: /* @__PURE__ */ e.jsx(
      "svg",
      {
        viewBox: "0 -2 32 32",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ e.jsx("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ e.jsx("g", { transform: "translate(-99.000000, -154.000000)", fill: "#000000", children: /* @__PURE__ */ e.jsx("path", { d: "M128.735,157.585 L116.047,170.112 L114.65,168.733 L127.339,156.206 C127.725,155.825 128.35,155.825 128.735,156.206 C129.121,156.587 129.121,157.204 128.735,157.585 L128.735,157.585 Z M112.556,173.56 C112.427,173.433 111.159,172.181 111.159,172.181 L113.254,170.112 L114.65,171.491 L112.556,173.56 L112.556,173.56 Z M110.461,178.385 C109.477,179.298 105.08,181.333 102.491,179.36 C102.491,179.36 103.392,178.657 104.074,177.246 C105.703,172.919 109.763,173.56 109.763,173.56 L111.159,174.938 C111.173,174.952 112.202,176.771 110.461,178.385 L110.461,178.385 Z M130.132,154.827 C128.975,153.685 127.099,153.685 125.942,154.827 L108.764,171.788 C106.661,171.74 103.748,172.485 102.491,176.603 C101.53,178.781 99,178.671 99,178.671 C104.253,184.498 110.444,181.196 111.857,179.764 C113.1,178.506 113.279,176.966 113.146,175.734 L130.132,158.964 C131.289,157.821 131.289,155.969 130.132,154.827 L130.132,154.827 Z" }) }) })
      }
    ) })
  ] });
}
const w1 = ["left", "center", "right", "justify"], v1 = {
  left: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      fill: "#000000",
      viewBox: "0 0 512 512",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "38.957", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "139.13", width: "400.696", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "239.304", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "439.652", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "339.478", width: "400.696", height: "33.391" }) }) })
      ]
    }
  ),
  center: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      fill: "#000000",
      viewBox: "0 0 512 512",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "38.957", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { x: "55.652", y: "139.13", width: "400.696", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "239.304", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "439.652", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { x: "55.652", y: "339.478", width: "400.696", height: "33.391" }) }) })
      ]
    }
  ),
  right: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      fill: "#000000",
      viewBox: "0 0 512 512",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "38.957", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { x: "111.304", y: "139.13", width: "400.696", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "239.304", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "439.652", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { x: "111.304", y: "339.478", width: "400.696", height: "33.391" }) }) })
      ]
    }
  ),
  justify: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      fill: "#000000",
      viewBox: "0 0 512 512",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "38.957", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "139.13", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "239.304", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "439.652", width: "512", height: "33.391" }) }) }),
        /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("g", { children: /* @__PURE__ */ e.jsx("rect", { y: "339.478", width: "512", height: "33.391" }) }) })
      ]
    }
  )
};
function b1() {
  const t = j();
  return w1.map((s) => /* @__PURE__ */ e.jsx(
    p,
    {
      cb: () => t("textAlign", s, !0),
      children: v1[s]
    },
    s
  ));
}
function E1() {
  const t = j();
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("textTransform", "uppercase"), children: /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M9 9L9 4M9 9L6.5 7M9 9L11.5 7",
        stroke: "#000000",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M10.5861 19.1946C10.5203 18.9868 10.3274 18.8455 10.1094 18.8455H7.55474C7.33675 18.8455 7.14388 18.9868 7.07807 19.1946L6.65978 20.5154C6.59397 20.7233 6.4011 20.8645 6.18311 20.8645H4.72359C4.37391 20.8645 4.13223 20.5148 4.2559 20.1877L7.60741 11.3232C7.68095 11.1287 7.86717 11 8.0751 11H9.58987C9.7974 11 9.98336 11.1282 10.0572 11.3222L13.4308 20.1867C13.5553 20.5139 13.3136 20.8645 12.9635 20.8645H11.4811C11.2631 20.8645 11.0702 20.7233 11.0044 20.5154L10.5861 19.1946ZM7.79577 16.9252C7.75489 17.0541 7.85115 17.1856 7.98642 17.1856H9.66955C9.80482 17.1856 9.90108 17.0541 9.8602 16.9252L9.01863 14.2707C8.95964 14.0846 8.69633 14.0846 8.63734 14.2707L7.79577 16.9252Z",
        fill: "#000000"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M18.1268 20.8645C18.0402 20.8645 17.9763 20.8529 17.9413 20.7736C17.8621 20.5943 17.6066 20.4922 17.4472 20.6064C17.0811 20.8688 16.6326 21 16.1016 21C15.3584 21 14.7409 20.7967 14.2491 20.3902C13.7628 19.9837 13.5196 19.4575 13.5196 18.8117C13.5196 18.0438 13.8147 17.4499 14.4048 17.0298C15.0005 16.6098 15.8557 16.3952 16.9705 16.3862H17.1754C17.4516 16.3862 17.6754 16.1623 17.6754 15.8862V15.7967C17.6754 15.467 17.6071 15.2344 17.4705 15.0989C17.3339 14.9634 17.1344 14.8957 16.8721 14.8957C16.4947 14.8957 16.2402 15.0146 16.1087 15.2523C15.9751 15.494 15.7794 15.7358 15.5032 15.7358H14.1835C13.9074 15.7358 13.6755 15.5083 13.7433 15.2406C13.8596 14.7814 14.1457 14.3887 14.6016 14.0623C15.2191 13.6197 15.9978 13.3984 16.9377 13.3984C17.9104 13.3984 18.6618 13.6084 19.1918 14.0285C19.7274 14.444 19.9951 15.0402 19.9951 15.8171V19.2656C20.0061 19.8979 19.9951 20.3651 19.9951 20.7493C19.9951 20.8129 19.9436 20.8645 19.88 20.8645H18.1268ZM16.618 19.4959C16.8748 19.4959 17.0934 19.453 17.2738 19.3672C17.389 19.3124 17.4853 19.251 17.5626 19.1833C17.6435 19.1124 17.6754 19.0042 17.6754 18.8966V18.0379C17.6754 17.7618 17.4516 17.5379 17.1754 17.5379H17.118C16.7246 17.5379 16.4131 17.6418 16.1836 17.8496C15.9595 18.0574 15.8475 18.3351 15.8475 18.6829C15.8475 19.2249 16.1043 19.4959 16.618 19.4959Z",
        fill: "#000000"
      }
    )
  ] }) });
}
function R1() {
  const t = j();
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("textTransform", "lowercase"), children: /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M17 9L17 4M17 9L14.5 7M17 9L19.5 7",
        stroke: "#000000",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M10.5861 19.1946C10.5203 18.9868 10.3274 18.8455 10.1094 18.8455H7.55474C7.33675 18.8455 7.14388 18.9868 7.07807 19.1946L6.65978 20.5154C6.59397 20.7233 6.4011 20.8645 6.18311 20.8645H4.72359C4.37391 20.8645 4.13223 20.5148 4.2559 20.1877L7.60741 11.3232C7.68095 11.1287 7.86717 11 8.0751 11H9.58987C9.7974 11 9.98336 11.1282 10.0572 11.3222L13.4308 20.1867C13.5553 20.5139 13.3136 20.8645 12.9635 20.8645H11.4811C11.2631 20.8645 11.0702 20.7233 11.0044 20.5154L10.5861 19.1946ZM7.79577 16.9252C7.75489 17.0541 7.85115 17.1856 7.98642 17.1856H9.66955C9.80482 17.1856 9.90108 17.0541 9.8602 16.9252L9.01863 14.2707C8.95964 14.0846 8.69633 14.0846 8.63734 14.2707L7.79577 16.9252Z",
        fill: "#000000"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: "M18.1268 20.8645C18.0402 20.8645 17.9763 20.8529 17.9413 20.7736C17.8621 20.5943 17.6066 20.4922 17.4472 20.6064C17.0811 20.8688 16.6326 21 16.1016 21C15.3584 21 14.7409 20.7967 14.2491 20.3902C13.7628 19.9837 13.5196 19.4575 13.5196 18.8117C13.5196 18.0438 13.8147 17.4499 14.4048 17.0298C15.0005 16.6098 15.8557 16.3952 16.9705 16.3862H17.1754C17.4516 16.3862 17.6754 16.1623 17.6754 15.8862V15.7967C17.6754 15.467 17.6071 15.2344 17.4705 15.0989C17.3339 14.9634 17.1344 14.8957 16.8721 14.8957C16.4947 14.8957 16.2402 15.0146 16.1087 15.2523C15.9751 15.494 15.7794 15.7358 15.5032 15.7358H14.1835C13.9074 15.7358 13.6755 15.5083 13.7433 15.2406C13.8596 14.7814 14.1457 14.3887 14.6016 14.0623C15.2191 13.6197 15.9978 13.3984 16.9377 13.3984C17.9104 13.3984 18.6618 13.6084 19.1918 14.0285C19.7274 14.444 19.9951 15.0402 19.9951 15.8171V19.2656C20.0061 19.8979 19.9951 20.3651 19.9951 20.7493C19.9951 20.8129 19.9436 20.8645 19.88 20.8645H18.1268ZM16.618 19.4959C16.8748 19.4959 17.0934 19.453 17.2738 19.3672C17.389 19.3124 17.4853 19.251 17.5626 19.1833C17.6435 19.1124 17.6754 19.0042 17.6754 18.8966V18.0379C17.6754 17.7618 17.4516 17.5379 17.1754 17.5379H17.118C16.7246 17.5379 16.4131 17.6418 16.1836 17.8496C15.9595 18.0574 15.8475 18.3351 15.8475 18.6829C15.8475 19.2249 16.1043 19.4959 16.618 19.4959Z",
        fill: "#000000"
      }
    )
  ] }) });
}
function T1() {
  const t = j("list");
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("ol"), children: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("path", { d: "M6.99999 1H15V3H6.99999V1Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M6.99999 5H15V7H6.99999V5Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M15 9H6.99999V11H15V9Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M6.99999 13H15V15H6.99999V13Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M3.28854 10.75H0.999993V9H3.28854C4.30279 9 5.12499 9.82221 5.12499 10.8364C5.12499 11.3407 4.91763 11.8228 4.55155 12.1696L3.41116 13.25H4.99999V15H0.999993V13.1236L3.348 10.8992C3.36523 10.8829 3.37499 10.8602 3.37499 10.8364C3.37499 10.7887 3.33629 10.75 3.28854 10.75Z",
            fill: "#000000"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M2.358 1.125L0.723297 1.6699L1.2767 3.3301L2.125 3.04733V7H3.875V1.125H2.358Z",
            fill: "#000000"
          }
        )
      ]
    }
  ) });
}
function k1() {
  const t = j("list");
  return /* @__PURE__ */ e.jsx(p, { cb: () => t("ul"), children: /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ e.jsx("path", { d: "M3 1H1V3H3V1Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M3 5H1V7H3V5Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M1 9H3V11H1V9Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M3 13H1V15H3V13Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M15 1H5V3H15V1Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M15 5H5V7H15V5Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M5 9H15V11H5V9Z", fill: "#000000" }),
        /* @__PURE__ */ e.jsx("path", { d: "M15 13H5V15H15V13Z", fill: "#000000" })
      ]
    }
  ) });
}
function L1({ children: t }) {
  return /* @__PURE__ */ e.jsx("div", { className: "richTextRow", children: S.map(t, (s) => s) });
}
function A({ children: t, position: s }) {
  return /* @__PURE__ */ e.jsx("div", { className: "richTextDiv", style: { textAlign: s }, children: S.map(t, (c) => c) });
}
const y1 = `
.richTextMenu {
    border: 1px solid #ccc;
    background-color: whitesmoke;
}
.richTextRow {
    box-sizing: border-box;
    display: table;
    width: 100%;
}
.richTextDiv {
    display: table-cell;
    vertical-align: middle;
}
.inputRichInput {
    border: none;
    background-color: transparent;
}
.richTextButton {
    background-color: transparent;
    color: black;
    border: none;
    text-algin: enter;
}
.richTextButton svg {
    height: 25px;
    width: 25px;
}
.inputRichBorders {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: none;
    border-top: none;
    border-radius: 0px;
}
`, M1 = l1(function({
  label: s = "",
  name: c = "",
  initValue: o = "",
  required: a = !1,
  labelClasses: i = "ikBlock"
}, h) {
  const x = c1(null);
  a1(() => {
    g(o);
  }, [o]), d1(h, () => ({
    getValue: m,
    setValue: g
  }));
  const g = (E) => {
    x.current.innerHTML = E;
  }, m = () => x.current.innerHTML;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("style", { children: y1 }),
    /* @__PURE__ */ e.jsxs("label", { className: i, htmlFor: c.length > 0 ? c : s, children: [
      s,
      a && /* @__PURE__ */ e.jsx("span", { style: { marginLeft: "2px" }, children: /* @__PURE__ */ e.jsx("b", { children: /* @__PURE__ */ e.jsx("sup", { style: { color: "red" }, children: "*" }) }) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "richTextMenu", children: /* @__PURE__ */ e.jsxs(L1, { children: [
      /* @__PURE__ */ e.jsxs(A, { position: "left", children: [
        /* @__PURE__ */ e.jsx(p1, {}),
        /* @__PURE__ */ e.jsx(C1, {}),
        /* @__PURE__ */ e.jsx(j1, {}),
        /* @__PURE__ */ e.jsx(m1, {})
      ] }),
      /* @__PURE__ */ e.jsx(A, { position: "center", children: /* @__PURE__ */ e.jsx(b1, {}) }),
      /* @__PURE__ */ e.jsxs(A, { position: "right", children: [
        /* @__PURE__ */ e.jsx(T1, {}),
        /* @__PURE__ */ e.jsx(k1, {}),
        /* @__PURE__ */ e.jsx(E1, {}),
        /* @__PURE__ */ e.jsx(R1, {})
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        ref: x,
        contentEditable: !0,
        style: {
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          overflowY: "auto"
        }
      }
    )
  ] });
});
export {
  M1 as RichText,
  A as RichTextBlock,
  L1 as RichTextRow
};
