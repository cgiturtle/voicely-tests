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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

/* LanguageTool WebExtension
 * Copyright (C) 2017 Daniel Naber (http://www.danielnaber.de)
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

/* global activeElement, setActiveElement */

const Tools = __webpack_require__(4);
const {
  isEditorElement,
  isHiddenElement,
  isShowOnViewPort,
  setActiveElement,
  offset
} = __webpack_require__(15);
const REMIND_WRAPPER_CLASS = "lt-marker-container";
const POPUP_CONTENT_CLASS = "ltaddon-popup-content";
const BTN_CLASS = "lt-buttons";
const REMIND_BTN_CLASS = "lt-remind-btn";
const CHECK_DONE_BTN_CLASS = "lt-check-done-btn";
const LOADING_BTN_CLASS = "lt-check-loading-btn";
const VOICE_TYPING_BTN_CLASS = "vt-btn";
const ERROR_BTN_CLASS = "lt-error-btn";
const DISABLE_BTN_CLASS = "lt-disable-btn";
const AUTO_CHECK_BTN_CLASS = "lt-auto-check-btn";
const AUTO_CHECK_OFF_BTN_CLASS = "lt-auto-check-off-btn";
const AUTO_CHECK_MANUAL_BTN_CLASS = "lt-auto-check-manual-btn";
const MARGIN_TO_CORNER = 8;
const REMIND_BTN_SIZE = 16;
const CLEAN_TIMEOUT_MILLIS = 200;
const BG_CHECK_TIMEOUT_MILLIS = 1500;
const DOMAIN_SETTINGS = {
  "twitter.com": {
    left: -22
  }
};
let wrapperId = 0;
let disableOnDomain = false;
let autoCheckOnDomain = false;
let ignoreQuotedLines = true;
let autoCheck = false;
let ignoreCheckOnDomains = [];
let totalErrorOnCheckText = -1; // -1 = not checking yet
let lastCheckResult = {
  markupList: [],
  result: {},
  total: -1,
  isProcess: false,
  success: true
};
const activeElementHandler = ally.event.activeElement();
const port = chrome.runtime.connect({
  name: "LanguageTool"
});
function isGmail() {
  const currentUrl = window.location.href;
  const {
    hostname
  } = new URL(currentUrl);
  return hostname === "mail.google.com";
}
function cleanErrorMessage(msg) {
  const position = msg.lastIndexOf('Error:');
  if (position !== -1) {
    return msg.substr(position + 7);
  }
  return msg;
}
function isAutoCheckEnable() {
  const currentUrl = window.location.href;
  const {
    hostname
  } = new URL(currentUrl);
  return autoCheckOnDomain || autoCheck && !ignoreCheckOnDomains.includes(hostname);
}

/** event handlers */

function checkErrorMenu(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  const currentUrl = window.location.href;
  const textAreaElement = activeElement();
  if (textAreaElement) {
    if (textAreaElement.setActive) {
      textAreaElement.setActive();
    } else {
      textAreaElement.focus();
    }
  }
  const popupWidth = 450;
  const popupHeight = Math.min(window.innerHeight * 80 / 100, 600);
  $.featherlight.defaults.closeIcon = "&nbsp;";
  $.featherlight({
    iframe: `${chrome.runtime.getURL("popup.html")}?pageUrl=${currentUrl}`,
    iframeWidth: popupWidth,
    iframeHeight: popupHeight,
    namespace: "ltaddon-popup",
    beforeOpen: () => {
      const popupContainers = document.getElementsByClassName(POPUP_CONTENT_CLASS);
      for (let counter = 0; counter < popupContainers.length; counter++) {
        const popupContainer = popupContainers[counter];
        popupContainer.style.minWidth = `${popupWidth}px`;
        popupContainer.style.minHeight = `${popupHeight}px`;
      }
    },
    afterOpen: () => {
      const currentPopup = $.featherlight.current();
      currentPopup.$content.focus();
    }
  });
}
function removeAllButtons() {
  console.log('removeAllButtons');
  const btns = document.getElementsByClassName(REMIND_WRAPPER_CLASS);
  for (let counter = 0; counter < btns.length; counter++) {
    const btn = btns[counter];
    btn.parentNode.removeChild(btn);
  }
}
function disableMenu(evt) {
  evt.preventDefault();
  disableOnDomain = true;
  removeAllButtons();
  Tools.getStorage().get({
    disabledDomains: []
  }, items => {
    const currentUrl = window.location.href;
    const {
      hostname
    } = new URL(currentUrl);
    items.disabledDomains.push(hostname);
    Tools.getStorage().set({
      disabledDomains: Array.from(new Set(items.disabledDomains))
    });
    Tools.track(hostname, "reminder deactivated");
  });
}
function manualAutoCheck(evt) {
  evt.preventDefault();
  lastCheckResult = Object.assign({}, lastCheckResult, {
    markupList: [],
    result: {},
    total: -1,
    isProcess: false,
    success: true
  });
  const currentUrl = window.location.href;
  const {
    hostname
  } = new URL(currentUrl);
  Tools.getStorage().get({
    ignoreCheckOnDomains: ignoreCheckOnDomains
  }, items => {
    if (!items.ignoreCheckOnDomains.includes(hostname)) {
      items.ignoreCheckOnDomains.push(hostname);
      ignoreCheckOnDomains = Array.from(new Set(items.ignoreCheckOnDomains));
      Tools.getStorage().set({
        ignoreCheckOnDomains
      });
    } else {
      ignoreCheckOnDomains = items.ignoreCheckOnDomains.filter(item => item !== hostname);
      Tools.getStorage().set({
        ignoreCheckOnDomains
      });
    }
    const textAreaElement = activeElement();
    if (textAreaElement) {
      if (textAreaElement.setActive) {
        textAreaElement.setActive();
      } else {
        textAreaElement.focus();
      }
      positionMarkerOnChangeSize();
    }
  });
}
function autoCheckMenu(evt) {
  evt.preventDefault();
  autoCheckOnDomain = !autoCheckOnDomain;
  if (!autoCheckOnDomain) {
    lastCheckResult = Object.assign({}, lastCheckResult, {
      markupList: [],
      result: {},
      total: -1,
      isProcess: false,
      success: true
    });
  }
  const textAreaElement = activeElement();
  if (textAreaElement) {
    if (textAreaElement.setActive) {
      textAreaElement.setActive();
    } else {
      textAreaElement.focus();
    }
    if (autoCheckOnDomain) {
      const {
        markupList,
        metaData
      } = getMarkupListFromElement(textAreaElement);
      checkTextFromMarkup({
        markupList,
        metaData
      }).then(result => {
        if (result) {
          showMatchedResultOnMarker(result);
        }
      }).catch(error => {
        console.error(error);
        Tools.track(window.location.href, "auto-check error", error.message);
      });
    } else {
      positionMarkerOnChangeSize();
    }
  }
  Tools.getStorage().get({
    autoCheckOnDomains: []
  }, items => {
    const currentUrl = window.location.href;
    const {
      hostname
    } = new URL(currentUrl);
    if (autoCheckOnDomain) {
      items.autoCheckOnDomains.push(hostname);
      Tools.getStorage().set({
        autoCheckOnDomains: Array.from(new Set(items.autoCheckOnDomains))
      });
    } else {
      Tools.getStorage().set({
        autoCheckOnDomains: items.autoCheckOnDomains.filter(item => item !== hostname)
      });
    }
    if (autoCheckOnDomain) {
      Tools.track(hostname, "auto-check activated");
    } else {
      Tools.track(hostname, "auto-check deactivated");
    }
  });
}

/** DOM manipulate */

function styleRemindButton(btn, position, num) {
  const {
    top,
    left,
    offsetHeight,
    offsetWidth
  } = position;
  btn.style.position = "absolute";
  if (isGmail()) {
    const tables = document.querySelectorAll("table#undefined");
    const activeTable = Array.prototype.find.call(tables, table => isDescendant(table, document.activeElement));
    // find parent of active table
    const allTables = document.getElementsByTagName("table");
    const gmailComposeToolbarHeight = 155;
    for (let counter = allTables.length - 1; counter > 0; counter--) {
      const parentTable = allTables[counter];
      if (isDescendant(parentTable, activeTable)) {
        let topPosition = offset(parentTable).top;
        if (topPosition < gmailComposeToolbarHeight) {
          topPosition = gmailComposeToolbarHeight;
        }
        btn.style.top = `${topPosition}px`;
        break;
      }
    }
  } else {
    btn.style.top = `${top + offsetHeight - REMIND_BTN_SIZE - MARGIN_TO_CORNER}px`;
  }
  const {
    hostname
  } = new URL(window.location.href);
  const leftTmp = DOMAIN_SETTINGS[hostname] ? left + DOMAIN_SETTINGS[hostname].left : left;
  btn.style.left = `${leftTmp + offsetWidth - (REMIND_BTN_SIZE + MARGIN_TO_CORNER) * num}px`;
}
function remindLanguageToolButton(clickHandler, position, num) {
  // const btn = document.createElement(BTN_CLASS, { is: "a" });
  // btn.className = `${BTN_CLASS} ${VOICE_TYPING_BTN_CLASS}`;

  // if (isAutoCheckEnable()) {
  //    if (!lastCheckResult.isTyping && lastCheckResult.isProcess) { // show loading on calling check api
  //     btn.className = `${BTN_CLASS} ${LOADING_BTN_CLASS}`;
  //     btn.setAttribute("tooltip", chrome.i18n.getMessage("reminderIconTitle"));
  //     btn.innerHTML = `<div class="lt-sk-three-bounce"><div class="lt-sk-child lt-sk-bounce1"></div><div class="lt-sk-child lt-sk-bounce2"></div><div class="lt-sk-child lt-sk-bounce3"></div></div>`;
  //    } else {
  //     if (lastCheckResult.success) {
  //       if (totalErrorOnCheckText > 0) {
  //         btn.className = `${BTN_CLASS} ${ERROR_BTN_CLASS}`;
  //         const tooltip = totalErrorOnCheckText === 1 ? chrome.i18n.getMessage("foundAErrorOnCheckText",[totalErrorOnCheckText]) : chrome.i18n.getMessage("foundErrorsOnCheckText",[totalErrorOnCheckText]);
  //         btn.setAttribute("tooltip", tooltip);
  //         btn.innerText = totalErrorOnCheckText > 9 ? "9+" : totalErrorOnCheckText;
  //       } else if (totalErrorOnCheckText === 0) {
  //         btn.className = `${BTN_CLASS} ${CHECK_DONE_BTN_CLASS}`;
  //         btn.setAttribute("tooltip", chrome.i18n.getMessage("noErrorsFound"));
  //       } else {
  //         btn.className = `${BTN_CLASS} ${REMIND_BTN_CLASS}`;
  //         btn.className = `${BTN_CLASS} ${REMIND_BTN_CLASS}`;
  //         btn.setAttribute("tooltip", chrome.i18n.getMessage("reminderIconTitle"));
  //       }
  //     } else {
  //       assignErrorStyle(btn, cleanErrorMessage(lastCheckResult.errorMessage));
  //     }
  //    }
  // } else {
  //   btn.className = `${BTN_CLASS} ${REMIND_BTN_CLASS}`;
  //   btn.setAttribute("tooltip", chrome.i18n.getMessage("reminderIconTitle"));
  // }

  // btn.onclick = clickHandler;
  // btn.onmouseover = function () {
  //   if (chrome.i18n.getMessage("reminderIconTitle") === undefined) {
  //     // this happens after first installation and after add-on update
  //     assignErrorStyle(btn, "Page reload needed to make text checking work");
  //   }
  // };
  // styleRemindButton(btn, position, num);

  const btn = document.createElement('div');
  btn.id = 'voicely-group';
  if (document.activeElement.offsetHeight > 50) {
    btn.innerHTML = `
      <div class="voice-icon" />
      <div class="pill2">
        <div class="pill-child" id="pill2-child">
          <img class="flag-img flag-img2" id="selectedFlagIMG2" src="https://flagcdn.com/16x12/za.png" alt="m" />
          <img class="carret1" src="https://i.imgur.com/TXFCg1W.png" alt="carret" />
        </div>
        <div class="voiceIcon1" id="cbx" align="center" onclick="mic(this)">
          <img src="https://i.imgur.com/oOI5UsU.png"
              style='height: 80%; width: 100%; object-fit: contain; margin-top: 1.5px;' />
        </div>
      </div>
      <div class="dropdown-content2" id="dd2"></div>
    `;
  } else {
    btn.innerHTML = `
      <div class="empty-icon" id='dot' />
      <div class="pill1">
        <div class="pill-child" id="pill1-child"">
          <img class="flag-img flag-img1" id="selectedFlagIMG1" src="https://flagcdn.com/16x12/za.png">
          <img class="carret1" src="https://i.imgur.com/TXFCg1W.png" alt="carret" />
        </div>
        <div class="voiceIcon1" id="cbx1" align="center" onclick="mic(this)">
          <img src="https://i.imgur.com/oOI5UsU.png"
              style='height: 80%; width: 100%; object-fit: contain; margin-top: 1.5px;' />
        </div>
      </div>
      <div class="dropdown-content1" id="dd1"></div>
    `;
  }
  styleRemindButton(btn, position, num);

  // const scr = document.createElement('script');
  // scr.src = './voicely-icon.js';
  // btn.appendChild(scr);
  return btn;
}
function assignErrorStyle(btn, msg) {
  btn.className = `${BTN_CLASS} ${ERROR_BTN_CLASS}`;
  btn.setAttribute("tooltip", msg);
  btn.innerText = "E";
}
function disableLanguageToolButton(clickHandler, position, num) {
  const {
    top,
    left,
    offsetHeight,
    offsetWidth
  } = position;
  const btn = document.createElement(BTN_CLASS, {
    is: "a"
  });
  btn.onclick = clickHandler;
  btn.className = `${BTN_CLASS} ${DISABLE_BTN_CLASS}`;
  btn.setAttribute("tooltip", chrome.i18n.getMessage("disableForThisDomainTitle"));
  styleRemindButton(btn, position, num);
  return btn;
}
function autoCheckLanguageToolButton(clickHandler, position, num) {
  const {
    top,
    left,
    offsetHeight,
    offsetWidth
  } = position;
  const btn = document.createElement(BTN_CLASS, {
    is: "a"
  });
  btn.onclick = clickHandler;
  if (autoCheck) {
    const {
      hostname
    } = new URL(window.location.href);
    if (ignoreCheckOnDomains.includes(hostname)) {
      btn.className = `${BTN_CLASS} ${AUTO_CHECK_BTN_CLASS}`;
      btn.setAttribute("tooltip", chrome.i18n.getMessage("autoCheckOnDesc"));
    } else {
      btn.className = `${BTN_CLASS} ${AUTO_CHECK_MANUAL_BTN_CLASS}`;
      btn.setAttribute("tooltip", chrome.i18n.getMessage("autoCheckOffDesc"));
    }
  } else {
    if (!autoCheckOnDomain) {
      btn.className = `${BTN_CLASS} ${AUTO_CHECK_BTN_CLASS}`;
      btn.setAttribute("tooltip", chrome.i18n.getMessage("autoCheckForThisDomainTitle"));
    } else {
      btn.className = `${BTN_CLASS} ${AUTO_CHECK_OFF_BTN_CLASS}`;
      btn.setAttribute("tooltip", chrome.i18n.getMessage("autoCheckForOffThisDomainTitle"));
    }
  }
  styleRemindButton(btn, position, num);
  return btn;
}
function textAreaWrapper(textElement, btnElements) {
  console.log('in textAreaWrapper');
  const wrapper = document.createElement(REMIND_WRAPPER_CLASS, {
    is: 'div'
  });
  wrapper.className = REMIND_WRAPPER_CLASS;
  wrapper.id = wrapperId;
  wrapper.style.position = "absolute";
  wrapper.style.top = "0px";
  wrapper.style.left = "0px";
  wrapper.style.zIndex = "999999";
  btnElements.forEach(btnElement => {
    wrapper.appendChild(btnElement);
  });
  document.body.appendChild(wrapper);
}
function insertLanguageToolIcon(element) {
  console.log('log0');
  const {
    offsetHeight,
    offsetWidth
  } = element;
  const {
    top
  } = element.getBoundingClientRect();
  const offsetHeightForLongText = window.innerHeight - top - 10;
  const position = Object.assign({}, offset(element), {
    offsetHeight: offsetHeight > window.innerHeight && offsetHeightForLongText < offsetHeight ? offsetHeightForLongText : offsetHeight,
    offsetWidth
  });
  wrapperId = `textarea-wrapper-${Date.now()}`;
  const maxToolTipWidth = 200;
  injectTooltipStyle(Math.min(offsetWidth, maxToolTipWidth));
  const btns = [remindLanguageToolButton(checkErrorMenu, position, 1)];

  // if (autoCheck) {
  //   btns.push(autoCheckLanguageToolButton(manualAutoCheck, position, 2));
  // } else {
  //   btns.push(autoCheckLanguageToolButton(autoCheckMenu, position, 2));
  // }
  // btns.push(disableLanguageToolButton(disableMenu, position, 3));

  console.log('LT Icon -> ', element);
  console.log('element.offsetHeight', element.offsetHeight);
  textAreaWrapper(element, btns);
}

/**
 * show marker on element
 * @param DOMElement focusElement
 */
function showMarkerOnEditor(focusElement) {
  console.log('in showMarkerOnEditor', focusElement);
  console.log("isEditorElement(focusElement)", isEditorElement(focusElement));
  if (isEditorElement(focusElement)) {
    removeAllButtons();
    setActiveElement(focusElement);
    if (!isHiddenElement(focusElement) && !disableOnDomain) {
      insertLanguageToolIcon(focusElement);
    }
  }
}

// detect on window resize, scroll
let ticking = false;
let lastScrollPosition = 0;
function positionMarkerOnChangeSize(event) {
  // console.log("event.type", event && event.type);
  lastScrollPosition = window.scrollY;
  // if (!ticking) {
  //   window.requestAnimationFrame(() => {
  //     console.log('positionMarkerOnChangeSize');
  //     removeAllButtons();
  //     if (!disableOnDomain && isShowOnViewPort(document.activeElement)) {
  //       showMarkerOnEditor(document.activeElement);
  //     }
  //     ticking = false;
  //   });
  //   ticking = true;
  // }
}

function showMatchedResultOnMarker(result) {
  if (result && result.matches && result.matches.length > 0) {
    const language = DOMPurify.sanitize(result.language.name);
    const languageCode = DOMPurify.sanitize(result.language.code);
    const shortLanguageCode = getShortCode(languageCode);
    let matchesCount = 0;
    let matches = [];
    const uniquePositionMatches = [];
    let prevErrStart = -1;
    let prevErrLen = -1;
    for (let i = result.matches.length - 1; i >= 0; i--) {
      const m = result.matches[i];
      const errStart = parseInt(m.offset);
      const errLen = parseInt(m.length);
      if (errStart !== prevErrStart || errLen !== prevErrLen) {
        uniquePositionMatches.push(m);
        prevErrStart = errStart;
        prevErrLen = errLen;
      }
    }
    uniquePositionMatches.reverse();
    matches = uniquePositionMatches;
    const ignoredRuleCounts = {};
    const ruleIdToDesc = {};
    Tools.getUserSettingsForRender(items => {
      const {
        dictionary,
        ignoredRules,
        ignoreQuotedLines
      } = items;
      for (let m of matches) {
        // these values come from the server, make sure they are ints:
        const errStart = parseInt(m.context.offset);
        const errLen = parseInt(m.length);
        // these string values come from the server and need to be sanitized
        // as they will be inserted with innerHTML:
        const contextSanitized = DOMPurify.sanitize(m.context.text);
        const ruleIdSanitized = DOMPurify.sanitize(m.rule.id);
        const messageSanitized = DOMPurify.sanitize(m.message);
        ruleIdToDesc[ruleIdSanitized] = DOMPurify.sanitize(m.rule.description);
        const wordSanitized = contextSanitized.substr(errStart, errLen);
        let ignoreError = false;
        if (isSpellingError(m)) {
          // Also accept uppercase versions of lowercase words in personal dict:
          const knowToDict = dictionary.indexOf(wordSanitized) !== -1;
          if (knowToDict) {
            ignoreError = true;
          } else if (!knowToDict && Tools.startWithUppercase(wordSanitized)) {
            ignoreError = dictionary.indexOf(Tools.lowerCaseFirstChar(wordSanitized)) !== -1;
          }
        } else {
          ignoreError = ignoredRules.find(k => k.id === ruleIdSanitized && k.language === shortLanguageCode);
        }
        if (!ignoreError) {
          matchesCount++;
        }
      }
      totalErrorOnCheckText = matchesCount;
      lastCheckResult = Object.assign({}, lastCheckResult, {
        total: matchesCount
      });
      positionMarkerOnChangeSize();
    });
  } else {
    totalErrorOnCheckText = 0;
    lastCheckResult = Object.assign({}, lastCheckResult, {
      total: 0,
      result: {},
      markupList: []
    });
    positionMarkerOnChangeSize();
  }
}
function checkTextFromMarkup({
  markupList,
  metaData
}) {
  if (isSameObject(markupList, lastCheckResult.markupList)) {
    return Promise.resolve({
      result: lastCheckResult.result
    });
  }
  lastCheckResult = Object.assign({}, lastCheckResult, {
    markupList,
    isProcess: true,
    isTyping: false
  });
  positionMarkerOnChangeSize();
  if (!isAutoCheckEnable()) {
    return Promise.resolve({
      result: {}
    });
  }
  port.postMessage({
    action: "checkText",
    data: {
      markupList,
      metaData
    }
  });
  return new Promise(resolve => {
    port.onMessage.addListener(msg => {
      if (msg.success) {
        if (!isSameObject(markupList, lastCheckResult.markupList)) {
          totalErrorOnCheckText = -1;
          lastCheckResult = Object.assign({}, lastCheckResult, {
            result: {},
            total: -1,
            isProcess: false
          });
          return resolve({
            result: {},
            total: -1
          });
        }
        lastCheckResult = Object.assign({}, lastCheckResult, msg, {
          isProcess: false
        });
        return resolve(msg.result);
      } else {
        const {
          errorMessage
        } = msg;
        lastCheckResult = Object.assign({}, lastCheckResult, msg, {
          result: {},
          total: -1,
          isProcess: false
        });
        Tools.track(window.location.href, `error on checkTextFromMarkup: ${errorMessage}`);
        return resolve({});
      }
    });
  });
}
function getMarkupListFromElement(element) {
  const pageUrl = window.location.href;
  if (element.tagName === "IFRAME") {
    try {
      if (element && element.contentWindow && element.contentWindow.document.getSelection() && element.contentWindow.document.getSelection().toString() !== "") {
        const text = element.contentWindow.document.getSelection().toString();
        return {
          markupList: [{
            text
          }],
          isEditableText: false,
          metaData: getMetaData(pageUrl)
        };
      }
    } catch (err) {
      console.error(err);
      Tools.track(pageUrl, `error on getMarkupListFromElement for iframe: ${err.message}`);
    }
  }
  const markupList = getMarkupListOfActiveElement(element);
  return {
    markupList,
    isEditableText: true,
    metaData: getMetaData(pageUrl)
  };
}
function elementMarkup(evt) {
  totalErrorOnCheckText = -1;
  lastCheckResult = Object.assign({}, lastCheckResult, {
    result: {},
    markupList: [],
    total: -1,
    isProcess: false,
    isTyping: true
  });
  return getMarkupListFromElement(evt.target);
}
function observeEditorElement(element) {
  /* global most */
  const {
    fromEvent,
    fromPromise,
    merge
  } = most;
  // Logs the current value of the searchInput, only after the user stops typing
  let inputText;
  if (element.tagName === 'IFRAME') {
    inputText = fromEvent('input', element.contentWindow).map(elementMarkup).skipRepeatsWith(isSameObject).multicast();
  } else {
    inputText = fromEvent('input', element).map(elementMarkup).skipRepeatsWith(isSameObject).multicast();
  }
  // Empty results list if there is no text
  const emptyResults = inputText.filter(markup => markup.markupList && markup.markupList[0] && markup.markupList[0].text && markup.markupList[0].text.length < 1).constant([]);
  const results = inputText.filter(markup => markup.markupList && markup.markupList[0] && markup.markupList[0].text && markup.markupList[0].text.length > 1).debounce(BG_CHECK_TIMEOUT_MILLIS).map(checkTextFromMarkup).map(fromPromise).switchLatest();
  merge(results, emptyResults).observe(showMatchedResultOnMarker);
}
function bindCheckErrorEventOnElement(currentElement) {
  if (isAutoCheckEnable() && isEditorElement(currentElement)) {
    totalErrorOnCheckText = -1;
    if (!lastCheckResult.isProcess) {
      const {
        markupList,
        metaData
      } = getMarkupListFromElement(currentElement);
      if (!isSameObject(markupList, lastCheckResult.markupList)) {
        checkTextFromMarkup({
          markupList,
          metaData
        }).then(result => {
          if (result) {
            showMatchedResultOnMarker(result);
          }
        }).catch(error => {
          console.error(error);
          Tools.track(window.location.href, "auto-check error", error.message);
        });
      } else {
        showMatchedResultOnMarker(lastCheckResult.result);
      }
    }
    if (!currentElement.getAttribute("lt-auto-check")) {
      observeEditorElement(currentElement);
      currentElement.setAttribute("lt-auto-check", true);
    }

    // edge case for mail.google.com
    if (isGmail() && document.getElementById(":4")) {
      // scroll element
      const scrollContainerOnGmail = document.getElementById(":4");
      if (!scrollContainerOnGmail.getAttribute("lt-bind-scroll")) {
        scrollContainerOnGmail.addEventListener("scroll", positionMarkerOnChangeSize);
        scrollContainerOnGmail.setAttribute("lt-bind-scroll", true);
      }
    }
  }
}
function allowToShowMarker(callback) {
  const currentUrl = window.location.href;
  disableOnDomain = Tools.doNotShowMarkerOnUrl(currentUrl);
  if (!disableOnDomain) {
    Tools.getStorage().get({
      disabledDomains: [],
      autoCheckOnDomains: [],
      ignoreCheckOnDomains: [],
      ignoreQuotedLines: true,
      autoCheck: autoCheck
    }, items => {
      const {
        hostname
      } = new URL(currentUrl);
      autoCheckOnDomain = items.autoCheckOnDomains.includes(hostname);
      disableOnDomain = items.disabledDomains.includes(hostname);
      ignoreQuotedLines = items.ignoreQuotedLines;
      autoCheck = items.autoCheck;
      ignoreCheckOnDomains = items.ignoreCheckOnDomains;
      if (disableOnDomain) {
        removeAllButtons();
      } else {
        callback();
      }
    });
  } else {
    removeAllButtons();
    activeElementHandler.disengage();
  }
}
window.addEventListener("resize", positionMarkerOnChangeSize);
window.addEventListener("scroll", positionMarkerOnChangeSize);
function injectLoadingStyle() {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    /* loading */
    .lt-sk-three-bounce {
      margin: 2px auto;
      width: 100%;
      text-align: center; }
      .lt-sk-three-bounce .lt-sk-child {
        width: 5px;
        height: 5px;
        background-color: #333;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: lt-sk-three-bounce 1.4s ease-in-out 0s infinite both;
                animation: lt-sk-three-bounce 1.4s ease-in-out 0s infinite both; }
      .lt-sk-three-bounce .lt-sk-bounce1 {
        -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s; }
      .lt-sk-three-bounce .lt-sk-bounce2 {
        -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s; }

    @-webkit-keyframes lt-sk-three-bounce {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
                transform: scale(0); }
      40% {
        -webkit-transform: scale(1);
                transform: scale(1); } }

    @keyframes lt-sk-three-bounce {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
                transform: scale(0); }
      40% {
        -webkit-transform: scale(1);
                transform: scale(1); } }
  `;
  document.body.appendChild(style);
}
function injectTooltipStyle(width = 100) {
  const style = document.createElement('style');
  style.type = 'text/css';
  if (width < 100) {
    style.innerHTML = `
      #${wrapperId} .lt-buttons[tooltip]:before {
        min-width: ${width}px;
        bottom: 100%;
        left: 5%;
      }
    `;
  } else {
    style.innerHTML = `
      #${wrapperId} .lt-buttons[tooltip]:before {
        min-width: ${width}px;
      }
    `;
  }
  document.body.appendChild(style);
}
if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  allowToShowMarker(() => {
    injectLoadingStyle();
    setTimeout(() => {
      if (!disableOnDomain) {
        showMarkerOnEditor(document.activeElement);
        bindCheckErrorEventOnElement(document.activeElement);
      }
    }, 0);
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    allowToShowMarker(() => {
      injectLoadingStyle();
      setTimeout(() => {
        if (!disableOnDomain) {
          showMarkerOnEditor(document.activeElement);
          bindCheckErrorEventOnElement(document.activeElement);
        }
      }, 0);
    });
  });
}

// observe the active element to show the marker
let cleanUpTimeout;
document.addEventListener("active-element", event => {
  console.log('log-1', event);
  const {
    focus: focusElement,
    blur: blurElement
  } = event.detail;
  if (isHiddenElement(blurElement) && isEditorElement(blurElement)) {
    console.log('isHiddenElement(blurElement) && isEditorElement(blurElement)', isHiddenElement(blurElement) && isEditorElement(blurElement));
    removeAllButtons();
  }
  if (!disableOnDomain) {
    // use timeout for adjust html after rendering DOM
    // try to reposition for some site which is rendering from JS (e.g: Upwork)
    setTimeout(() => {
      showMarkerOnEditor(focusElement);
      bindCheckErrorEventOnElement(focusElement);
    }, 0);
    //setActiveElement(focusElement);  --> when commented in, I get: SecurityError: Blocked a frame with origin "http://localhost" from accessing a cross-origin frame.

    if (!cleanUpTimeout) {
      cleanUpTimeout = setTimeout(() => {
        if (isHiddenElement(document.activeElement) || !isEditorElement(document.activeElement)) {
          removeAllButtons();
        }
        cleanUpTimeout = null;
      }, CLEAN_TIMEOUT_MILLIS);
    }

    // show the marker on UI
    setTimeout(() => {
      positionMarkerOnChangeSize();
    }, 200);
  }
}, true);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* LanguageTool WebExtension
 * Copyright (C) 2015 Daniel Naber (http://www.danielnaber.de)
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


const trackingBaseUrl = "https://openthesaurus.stats.mysnip-hosting.de/piwik.php";
const trackingSiteId = "14";
const THROTTLE_REQUESTS = 5;
const MAX_TIME = 1 * 60 * 1000; // 1 minute
// chrome.google.com: see http://stackoverflow.com/questions/11613371/
// docs.google.com: Google Docs has a too complicated DOM (but its own add-on framework)
// addons.mozilla.org: see http://stackoverflow.com/questions/42147966/
const unsupportedSitesRegex = /^https?:\/\/(docs.google.com|chrome.google.com|addons.mozilla.org).*/;
const notSupportMarkerSitesRegex = /^https?:\/\/(www.facebook.com|facebook.com|docs.google.com|chrome.google.com|addons.mozilla.org|.*wikipedia.org.*&veaction=edit).*/;

// turn off some rules by default because they are not that useful in a typical web context:
const ruleIdsIgnoredByDefault = [
// English:
{
  id: 'EN_QUOTES',
  language: 'en'
}, {
  id: 'DASH_RULE',
  language: 'en'
},
// German:
{
  id: 'TYPOGRAFISCHE_ANFUEHRUNGSZEICHEN',
  language: 'de'
}, {
  id: 'FALSCHE_VERWENDUNG_DES_BINDESTRICHS',
  language: 'de'
}, {
  id: 'BISSTRICH',
  language: 'de'
}, {
  id: 'AUSLASSUNGSPUNKTE',
  language: 'de'
}];
const errorsText = ['error', 'exception', 'problem'];
const lastTrackingError = {};
class Tools {
  constructor() {}
  static getApiServerUrl(callback) {
    const storage = Tools.getStorage();
    storage.get({
      apiServerUrl: 'https://api.languagetool.org/v2',
      havePremiumAccount: false
    }, function (items) {
      let serverUrl = items.apiServerUrl;
      if (items.havePremiumAccount) {
        serverUrl = 'https://languagetoolplus.com/api/v2';
      }
      callback(serverUrl);
    });
  }
  static track(pageUrl, actionName, optionalTrackDetails) {
    if (!Tools.isChrome()) {
      // version with tracking not deployed yet for Firefox, so make it explicit that tracking on FF won't work:
      return;
    }
    try {
      // throttle request for error tracking
      const foundErrorTracking = errorsText.find(item => actionName.toLowerCase().indexOf(item) !== -1);
      if (foundErrorTracking) {
        if (!lastTrackingError[actionName]) {
          lastTrackingError[actionName] = [Date.now()];
        } else {
          if (lastTrackingError[actionName].length < THROTTLE_REQUESTS) {
            lastTrackingError[actionName].push(Date.now());
          } else {
            // compare the first item, make sure only max THROTTLE_REQUESTS per min
            const now = Date.now();
            const distanceRunTime = now - lastTrackingError[actionName][0];
            if (distanceRunTime >= MAX_TIME) {
              lastTrackingError[actionName].push(now);
              lastTrackingError[actionName].splice(0, 1);
            } else {
              // console.warn(`LT add-on ignore tracking for ${actionName} - ${new Date(now)}`, lastTrackingError);
              return null; // break, ignore this action name
            }
          }
        }
      }

      const storage = Tools.getStorage();
      storage.get({
        uid: null
      }, function (items) {
        // needed to tell visits from  unique visitors:
        let uid;
        if (items.uid) {
          uid = items.uid;
        } else {
          uid = Tools.getRandomToken();
          storage.set({
            uid: uid
          }, function () {});
        }
        let shortenedUrl = pageUrl ? pageUrl.replace(/^(.*?:\/\/.+?)[?\/].*/, "$1") : ''; // for privacy reasons, only log host
        if (shortenedUrl.indexOf("http:") !== 0 && shortenedUrl.indexOf("https:") !== 0) {
          shortenedUrl = "http://" + shortenedUrl; // Piwik needs URL, it will not log otherwise
        }

        const url = encodeURIComponent(shortenedUrl);
        const manifest = chrome.runtime.getManifest();
        const version = manifest && manifest.version ? manifest.version : "unknown";
        const trackingUrl = trackingBaseUrl + "?idsite=" + trackingSiteId + "&_cvar={\"1\":[\"version\",\"" + encodeURIComponent(version) + "\"]}" + "&rec=1" + "&url=" + url + "&action_name=" + encodeURIComponent(actionName) + "&rand=" + Date.now() + "&apiv=1" + "&_id=" + uid + "&e_c=Action" + "&e_a=" + encodeURIComponent(actionName) + (optionalTrackDetails ? "&e_n=" + encodeURIComponent(optionalTrackDetails) : "");
        //console.log("trackingUrl: " + trackingUrl);
        // const trackReq = new XMLHttpRequest();
        // trackReq.open('POST', trackingUrl);
        // trackReq.onerror = function() {
        //     console.log("LT add-on tracking failed");
        // };
        // trackReq.ontimeout = function() {
        //     console.log("LT add-on tracking failed with timeout");
        // };
        // trackReq.send();
        console.log(`LanguageTool tracking: ${shortenedUrl}, ${actionName}, ${optionalTrackDetails}`);
      });
    } catch (e) {
      console.log(`LanguageTool add-on tracking failed: ${e.message}`);
    }
  }
  static getStorage() {
    // special case for Firefox as long as chrome.storage.sync is defined, but
    // not yet activated by default: https://github.com/languagetool-org/languagetool-browser-addon/issues/97
    return chrome.storage.sync && !Tools.isFirefox() ? chrome.storage.sync : chrome.storage.local;
  }
  static doNotSupportOnUrl(url) {
    return url.match(unsupportedSitesRegex);
  }
  static doNotShowMarkerOnUrl(url) {
    return url.match(notSupportMarkerSitesRegex);
  }
  static getRandomToken() {
    const randomPool = new Uint8Array(8);
    crypto.getRandomValues(randomPool);
    let hex = '';
    for (let i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    return hex;
  }

  // NOTE: the number of logs that can be sent is limited by the same limit
  // that limits the check requests per minute, so prefer Tools.track()
  static logOnServer(message, serverUrl = 'https://api.languagetool.org/v2') {
    // if (serverUrl.indexOf("https://languagetool.org") === -1 && serverUrl.indexOf("https://api.languagetool.org") === -1) {
    //     // these logging messages are only useful for the LT dev team
    //     // to improve the add-on, so don't send anywhere else:
    //     return;
    // }
    // const req = new XMLHttpRequest();
    // req.timeout = 60 * 1000; // milliseconds
    // const url = serverUrl + (serverUrl.endsWith("/") ? "log" : "/log");
    // req.open('POST', url);
    // req.onload = function() {
    //     // do nothing (also ignore timeout and errors)
    // };
    // //console.log("Posting to " + url + ": " + message);
    // req.send("message=" + encodeURIComponent(message));
  }
  static isFirefox() {
    return navigator.userAgent.indexOf("Firefox/") !== -1;
  }
  static isChrome() {
    return navigator.userAgent.indexOf("Chrome/") !== -1 || navigator.userAgent.indexOf("Chromium/") !== -1;
  }
  static escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }
  static startWithLowercase(str) {
    const firstCh = str.charAt(0);
    return firstCh == firstCh.toLowerCase() && firstCh != firstCh.toUpperCase();
  }
  static startWithUppercase(str) {
    const firstCh = str.charAt(0);
    return firstCh == firstCh.toUpperCase() && firstCh != firstCh.toLowerCase();
  }
  static lowerCaseFirstChar(str) {
    const firstCh = str.charAt(0);
    return firstCh.toLowerCase() + str.substr(1);
  }
  static setIgnoreRules(callback) {
    const storage = Tools.getStorage();
    storage.get({
      ignoredRules: ruleIdsIgnoredByDefault
    }, callback);
  }
  static getUserSettingsForRender(callback) {
    const storage = Tools.getStorage();
    storage.get({
      dictionary: [],
      disabledDomains: [],
      autoCheckOnDomains: [],
      ignoreCheckOnDomains: [],
      ignoredRules: ruleIdsIgnoredByDefault,
      havePremiumAccount: false,
      autoCheck: false,
      usageCounter: 0
    }, callback);
  }

  // Due to Transifex limited support for Android i18n files, we already have
  // a very complicated i18n setup (see injectTranslations.py) and it seems
  // we're better off just hard-coding the English language names here instead of
  // making the process even more complicated:
  static getLangName(langCode) {
    switch (langCode) {
      case "ast-ES":
        return "Asturian";
      case "be-BY":
        return "Belarusian";
      case "br-FR":
        return "Breton";
      case "ca-ES":
        return "Catalan";
      case "ca-ES-valencia":
        return "Catalan (Valencian)";
      case "zh-CN":
        return "Chinese";
      case "da-DK":
        return "Danish";
      case "nl":
        return "Dutch";
      case "en-US":
        return "English (American)";
      case "en-GB":
        return "English (British)";
      case "en-AU":
        return "English (Australia)";
      case "en-CA":
        return "English (Canada)";
      case "en-NZ":
        return "English (New Zealand)";
      case "en-ZA":
        return "English (South Africa)";
      case "eo":
        return "Esperanto";
      case "fr":
        return "French";
      case "gl-ES":
        return "Galician";
      case "de-DE":
        return "German (German)";
      case "de-AT":
        return "German (Austria)";
      case "de-CH":
        return "German (Switzerland)";
      case "el-GR":
        return "Greek";
      case "is-IS":
        return "Icelandic";
      case "it":
        return "Italian";
      case "ja-JP":
        return "Japanese";
      case "km-KH":
        return "Khmer";
      case "lt-LT":
        return "Lithuanian";
      case "ml-IN":
        return "Malayalam";
      case "fa":
        return "Persian";
      case "pl-PL":
        return "Polish";
      case "pt-PT":
        return "Portuguese (Portugal)";
      case "pt-BR":
        return "Portuguese (Brazil)";
      case "ro-RO":
        return "Romanian";
      case "ru-RU":
        return "Russian";
      case "sk-SK":
        return "Slovak";
      case "sl-SI":
        return "Slovenian";
      case "es":
        return "Spanish";
      case "sv":
        return "Swedish";
      case "sr":
        return "Serbian";
      case "sr-RS":
        return "Serbian (Serbia)";
      case "tl-PH":
        return "Tagalog";
      case "ta-IN":
        return "Tamil";
      case "uk-UA":
        return "Ukrainian";
      default:
        return langCode;
    }
  }
}
if (true) {
  module.exports = Tools;
}

/***/ })

/******/ });