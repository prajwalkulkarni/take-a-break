/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./scripts/content.ts ***!
  \****************************/

if (window.location.href.startsWith("http") ||
    window.location.href.startsWith("https")) {
    // const body = document.querySelector('body');
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    div.style.zIndex = "9999";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    var h1 = document.createElement("h1");
    h1.style.color = "#fff";
    h1.style.fontSize = "5rem";
    h1.style.textAlign = "center";
    h1.textContent = "Take a break!";
    div.appendChild(h1);
    document.body.appendChild(div);
}

/******/ })()
;
//# sourceMappingURL=content.js.map