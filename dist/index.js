!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],e):"object"==typeof exports?exports["react-alert-confirm"]=e(require("react"),require("react-dom")):t["react-alert-confirm"]=e(t.react,t["react-dom"])}(window,function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.type,n=t.children,r=t.onClick,o=t.style;return i.createElement("button",{style:o,onClick:r,className:"alert-confirm-button "+(e||"default")},n)},e}(i.Component);e.default=a},function(t,e,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),n(3);var o=n(8),i=n(1);e.Button=i.default,e.alert=function(t){return o.default(r({type:"alert"},t))},e.default=o.default},function(t,e,n){var r=n(4);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(5)(!1)).push([t.i,".alert-confirm-container {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999; }\n  .alert-confirm-container * {\n    box-sizing: border-box; }\n\n.alert-confirm-shadow {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  transition: background-color 0.2s; }\n\n.alert-confirm-main {\n  width: 380px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  top: 26vh;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }\n\n.alert-confirm-header {\n  padding: 12px 12px 0;\n  display: flex;\n  justify-content: space-between; }\n\n.alert-confirm-header-title {\n  font-size: 18px;\n  color: #000; }\n\n.alert-confirm-header-close {\n  color: #aaa;\n  cursor: pointer;\n  line-height: 1; }\n  .alert-confirm-header-close .icon {\n    display: block;\n    transition: color 0.3s; }\n    .alert-confirm-header-close .icon:hover {\n      color: #CCC; }\n\n.alert-confirm-content {\n  padding: 20px 12px;\n  color: #333;\n  font-size: 14px; }\n\n.alert-confirm-footer {\n  position: relative;\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 12px 12px; }\n  .alert-confirm-footer > * {\n    margin-left: 10px; }\n\n.alert-confirm-button {\n  border: 0;\n  padding: 0 16px;\n  line-height: 32px;\n  cursor: pointer;\n  color: #5c5c5c;\n  border-radius: 3px;\n  outline: none;\n  background-color: #fff;\n  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s;\n  box-shadow: 0 -2px 5px 0 rgba(223, 200, 241, 0.3), 0 1px 0 0 rgba(223, 224, 241, 0.3), 0 1px 1px 0 rgba(162, 166, 191, 0.5), 0 2px 4px 0 rgba(228, 229, 242, 0.6); }\n  .alert-confirm-button:hover {\n    box-shadow: 0 -1px 10px 0 rgba(162, 166, 191, 0.2), 0 2px 4px 0 rgba(162, 166, 191, 0.2), 0 4px 5px 0 rgba(162, 166, 191, 0.3);\n    color: #3ba4f9; }\n  .alert-confirm-button.primary {\n    color: #fff;\n    background: linear-gradient(135deg, #00adff, #0167ff); }\n    .alert-confirm-button.primary:hover {\n      box-shadow: 0 1px 10px 0 rgba(21, 56, 195, 0.2), 0 2px 4px 0 rgba(21, 56, 195, 0.2), 0 4px 5px 0 rgba(21, 56, 195, 0.3); }\n\n.fadeIn {\n  animation: fadeIn 150ms; }\n\n.fadeOut {\n  animation: fadeOut 150ms; }\n\n.zoomIn {\n  animation: zoomIn 150ms; }\n\n.zoomOut {\n  animation: zoomOut 150ms; }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes zoomIn {\n  0% {\n    transform: scale(0.6) translateY(-100px); }\n  100% {\n    transform: scale(1) translateY(0); } }\n\n@keyframes zoomOut {\n  0% {\n    transform: scale(1) translateY(0); }\n  100% {\n    transform: scale(0.6) translateY(-100px); } }\n",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),c=null,l=0,u=[],f=n(7);function p(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(v(r.parts[a],e))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(v(r.parts[a],e));i[r.id]={id:r.id,refs:1,parts:s}}}}function d(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function m(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertAt.before,n);n.insertBefore(e,o)}}function h(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function b(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return y(e,t.attrs),m(t,e),e}function y(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function v(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=i}if(e.singleton){var a=l++;n=c||(c=b(e)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),m(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,e),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=d(t,e);return p(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}t&&p(d(t,e),e);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var x,g=(x=[],function(t,e){return x[t]=e,x.filter(Boolean).join("\n")});function w(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(9),i=n(10),a=function(){function t(t){var e=t.title,n=t.content,r=t.footer,o=t.closeBefore,i=t.type,a=void 0===i?"confirm":i,s=t.onOk,c=t.onCancel;this.title=null,this.content=null,this.footer=null,this.type="confirm",this.status="mount",this.container=null,this.closeBefore=null,this.onOk=null,this.onCancel=null;var l=document.createElement("div");l.className="alert-confirm-container",document.body.appendChild(l),this.container=l,this.type=a,this.title=e,this.content=n,this.footer=r,this.onOk=s,this.onCancel=c,o&&(this.closeBefore=o),this.render()}return t.prototype.dispatch=function(t){var e=this.closeBefore,n=this.onOk,r=this.onCancel;e?e(t,this.closePopup.bind(this)):("ok"===t&&n&&n(),"cancel"!==t&&"close"!==t||r&&r(),this.closePopup())},t.prototype.closePopup=function(){this.status="unmount",this.render()},t.prototype.render=function(){var t=this,e=this,n=e.container,a=e.title,s=e.content,c=e.footer,l=e.type,u=e.status;o.unmountComponentAtNode(n),o.render(r.createElement(i.default,{type:l,title:a,content:s,footer:c,dispatch:function(e){return t.dispatch(e)},status:u,onClosePopup:function(){o.unmountComponentAtNode(t.container),document.body.removeChild(t.container)}}),n)},t}();e.default=function(t){return new a(t)}},function(t,n){t.exports=e},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=n(1),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.state={shadowClassName:"",mainClassName:""},e.animationEnd=function(){e.setState({shadowClassName:"",mainClassName:""});var t=e.props,n=t.status,r=t.onClosePopup;"unmount"===n&&r&&r()},e}return o(e,t),e.prototype.componentDidMount=function(){"mount"===this.props.status?this.setState({shadowClassName:"fadeIn",mainClassName:"zoomIn"}):this.setState({shadowClassName:"fadeOut",mainClassName:"zoomOut"})},e.prototype.render=function(){var t=this.state,e=t.shadowClassName,n=t.mainClassName,r=this.props,o=r.title,s=r.content,c=r.footer,l=r.dispatch,u=r.type;return i.createElement("div",{className:"alert-confirm-shadow "+e},i.createElement("div",{className:"alert-confirm-main "+n,onAnimationEnd:this.animationEnd},i.createElement("div",{className:"alert-confirm-header"},i.createElement("div",{className:"alert-confirm-header-title"},o),"alert"!==u&&i.createElement("div",{className:"alert-confirm-header-close"},i.createElement("span",{className:"icon",onClick:function(){return l("close")}},"✕"))),i.createElement("div",{className:"alert-confirm-content"},s),i.createElement("div",{className:"alert-confirm-footer"},c||i.createElement(i.Fragment,null,"alert"!==u&&i.createElement(a.default,{onClick:function(){return l("cancel")}},i.createElement("span",null,"取 消")),i.createElement(a.default,{type:"primary",style:{marginLeft:10},onClick:function(){return l("ok")}},"确 认")))))},e}(i.Component);e.default=s}])});