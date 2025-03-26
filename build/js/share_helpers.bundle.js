/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeElement", function() { return activeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setActiveElement", function() { return setActiveElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeElementOnIframe", function() { return activeElementOnIframe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHiddenElement", function() { return isHiddenElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShowOnViewPort", function() { return isShowOnViewPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDescendant", function() { return isDescendant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAllowSpellcheck", function() { return isAllowSpellcheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEditorElement", function() { return isEditorElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "suggestionClass", function() { return suggestionClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSpellingError", function() { return isSpellingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSuggestion", function() { return isSuggestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShortCode", function() { return getShortCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameObject", function() { return isSameObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMetaData", function() { return getMetaData; });
/* LanguageTool WebExtension
 * Copyright (C) 2016 Daniel Naber (http://www.danielnaber.de)
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */
let activeTextarea;
let iframeActiveElement;
function activeElement() {
  return activeTextarea;
}
function setActiveElement(el) {
  activeTextarea = el;
  if (el.tagName === "IFRAME" && isEditorElement(el.contentWindow.document.activeElement)) {
    iframeActiveElement = el.contentWindow.document.activeElement;
  }
}
function activeElementOnIframe() {
  return iframeActiveElement;
}

/**
 * Check the element is display or hidden
 * @param {DOMElement} el
 * @return {bool}
 */
function isHiddenElement(el) {
  const style = window.getComputedStyle(el);
  return el.offsetParent === null || style.display === "none";
}

/**
 * check element is on viewport or not
 * @param {DOMElement} el
 */
function isShowOnViewPort(el) {
  const bounds = el.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}

/**
 * Check the element is parent node
 * @param {DOMElement} parent
 * @param {DOMElement} child
 * @return boolean
 */
function isDescendant(parent, child) {
  if (child && parent) {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
  }
  return false;
}

/**
 * Find the position of element base on window
 * @param {DOMElement} el
 * @return {object} position { top, left }
 */
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

/**
 * Check textarea or editor is allow spellcheck
 * @param {DOMElement} element
 */
function isAllowSpellcheck(element) {
  return element.getAttribute("spellcheck") === null || element.getAttribute("spellcheck") === "true";
}

/**
 * True if that is textarea or html5 contentEditable element
 * @param {DOMElement} el
 * @return {bool}
 */
function isEditorElement(el) {
  return el && isAllowSpellcheck(el) && (el.tagName === "TEXTAREA" || el.contentEditable !== "inherit" || el.tagName === "IFRAME" && (el.className.indexOf("cke_wysiwyg_frame") !== -1 || el.name.indexOf("editor") !== -1 || el.id.indexOf("editor") !== -1 || el.id.indexOf("tinymce") !== -1 || el.id.indexOf("content_ifr") !== -1 || el.title && el.title.indexOf("Rich Text Area") !== -1));
}
function suggestionClass(match) {
  if (isSpellingError(match)) {
    return 'hiddenSpellError';
  } else if (isSuggestion(match)) {
    return 'hiddenSuggestion';
  } else {
    return 'hiddenGrammarError';
  }
}
function isSpellingError(match) {
  const ruleId = match.rule.id;
  return ruleId.indexOf("SPELLER_RULE") >= 0 || ruleId.indexOf("MORFOLOGIK_RULE") >= 0 || ruleId.indexOf("HUNSPELL") >= 0;
}
function isSuggestion(match) {
  const issueType = match.rule.issueType;
  return issueType === 'style' || issueType === 'locale-violation' || issueType === 'register';
}
function getShortCode(languageCode) {
  return languageCode.replace(/-.*/, "");
}
function isSameObject(prevObject, nextObject) {
  return JSON.stringify(nextObject) === JSON.stringify(prevObject);
}
function getMetaData(pageUrl) {
  const metaData = {};
  if (document.getElementById("_to") && document.getElementById("compose-subject")) {
    // Roundcube (tested only with 1.0.1)
    metaData['EmailToAddress'] = cleanEMail(document.getElementById("_to").value);
  }
  if (pageUrl.indexOf("://mail.google.com")) {
    // GMail
    const elems = document.getElementsByName("to");
    for (let obj of elems) {
      if (obj.nodeName === 'INPUT') {
        metaData['EmailToAddress'] = cleanEMail(obj.value);
        break;
      }
    }
  }
  return metaData;
}

/***/ })

/******/ });