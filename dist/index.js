!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],t):"object"==typeof exports?exports["react-alert-confirm"]=t(require("react"),require("react-dom")):e["react-alert-confirm"]=t(e.react,e["react-dom"])}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(t,n){t.exports=e},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.type,n=e.children,r=e.onClick;return i.createElement("button",{onClick:r,className:"alert-confirm-button "+(t||"default")},n)},t}(i.Component);t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(3);var r=n(8),o=n(1);t.Button=o.default,t.default=r.default},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(5)(!1)).push([e.i,".alert-confirm-container {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999; }\n  .alert-confirm-container * {\n    box-sizing: border-box; }\n\n.alert-confirm-shadow {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  transition: background-color 0.2s; }\n\n.alert-confirm-main {\n  width: 340px;\n  position: absolute;\n  left: 50%;\n  top: 30%;\n  transform: translateX(-50%);\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }\n\n.alert-confirm-header {\n  padding: 10px;\n  display: flex;\n  justify-content: space-between; }\n\n.alert-confirm-header-title {\n  font-size: 18px;\n  color: #333; }\n\n.alert-confirm-header-close {\n  color: #aaa;\n  cursor: pointer;\n  line-height: 1; }\n  .alert-confirm-header-close .icon {\n    display: block;\n    transition: color 0.3s; }\n    .alert-confirm-header-close .icon:hover {\n      color: #CCC; }\n\n.alert-confirm-body {\n  padding: 8px 10px;\n  color: #666;\n  font-size: 14px; }\n\n.alert-confirm-footer {\n  position: relative;\n  display: flex;\n  justify-content: flex-end;\n  padding: 10px; }\n\n.alert-confirm-button {\n  border: 0;\n  padding: 0 16px;\n  line-height: 32px;\n  cursor: pointer;\n  color: #5c5c5c;\n  border-radius: 3px;\n  outline: none;\n  transition: box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 -1px 0 0 rgba(223, 224, 241, 0.5), 0 1px 0 0 rgba(223, 224, 241, 0.3), 0 1px 1px 0 rgba(162, 166, 191, 0.5), 0 2px 4px 0 rgba(228, 229, 242, 0.6); }\n  .alert-confirm-button:hover {\n    box-shadow: 0 1px 10px 0 rgba(162, 166, 191, 0.12), 0 2px 4px -1px rgba(162, 166, 191, 0.2), 0 4px 5px 0 rgba(162, 166, 191, 0.14);\n    color: #3ba4f9; }\n  .alert-confirm-button.primary {\n    color: #fff;\n    background: linear-gradient(135deg, #00adff, #0167ff); }\n    .alert-confirm-button.primary:hover {\n      box-shadow: 0 1px 10px 0 rgba(21, 56, 195, 0.12), 0 2px 4px -1px rgba(21, 56, 195, 0.2), 0 4px 5px 0 rgba(21, 56, 195, 0.2); }\n",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),c=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),s=null,f=0,u=[],l=n(7);function p(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(y(r.parts[a],t))}else{var c=[];for(a=0;a<r.parts.length;a++)c.push(y(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:c}}}}function d(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],c={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}function m(e,t){var n=c(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=c(e.insertAt.before,n);n.insertBefore(t,o)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function b(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return v(t,e.attrs),m(e,t),t}function v(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var a=f++;n=s||(s=b(t)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",v(t,e.attrs),m(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=l(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),c=e.href;e.href=URL.createObjectURL(a),c&&URL.revokeObjectURL(c)}.bind(null,n,t),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return p(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(c=i[a.id]).refs--,r.push(c)}e&&p(d(e,t),t);for(o=0;o<r.length;o++){var c;if(0===(c=r[o]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete i[c.id]}}}};var x,g=(x=[],function(e,t){return x[e]=t,x.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=g(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(9),i=n(10),a=function(){function e(e){var t=e.title,n=e.content,a=e.footer,c=e.closeBefore,s=e.zIndex,f=e.type,u=this;this.container=null;var l=document.createElement("div");l.className="alert-confirm-container",l.style.zIndex=s||99999,document.body.appendChild(l),o.render(r.createElement(i.default,{type:f,title:t,content:n,footer:a,dispatch:function(e){return u.dispatch(e)}}),l),this.closeBefore=c,this.container=l}return e.prototype.closeBefore=function(e,t){t()},e.prototype.dispatch=function(e){var t=this;this.closeBefore(e,function(){return t.closePopup()})},e.prototype.closePopup=function(){document.body.removeChild(this.container)},e}();t.default=function(e){return new a(e)}},function(e,n){e.exports=t},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),a=n(1),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.title,n=e.content,r=e.footer,o=e.dispatch,c="alert"!==e.type;return i.createElement(i.Fragment,null,i.createElement("div",{className:"alert-confirm-shadow"}),i.createElement("div",{className:"alert-confirm-main"},i.createElement("div",{className:"alert-confirm-header"},i.createElement("div",{className:"alert-confirm-header-title"},t||"提示"),c&&i.createElement("div",{className:"alert-confirm-header-close"},i.createElement("span",{className:"icon",onClick:function(){return o("close")}},"✕"))),i.createElement("div",{className:"alert-confirm-body"},n),i.createElement("div",{className:"alert-confirm-footer"},r||i.createElement(i.Fragment,null,c&&i.createElement(a.default,{onClick:function(){return o("cancel")}},i.createElement("span",null,"取 消")),i.createElement(a.default,{type:"primary",style:{marginLeft:10},onClick:function(){return o("confirm")}},"确 认")))))},t}(i.Component);t.default=c}])});