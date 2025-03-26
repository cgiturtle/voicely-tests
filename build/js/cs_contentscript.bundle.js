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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* LanguageTool WebExtension
 * Copyright (C) 2015-2017 Daniel Naber (http://www.danielnaber.de)
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


chrome.runtime.onMessage.addListener(handleRequest);
function embedFrame() {
  var iframe = document.createElement('iframe');
  iframe.id = 'voicely-iframe';
  iframe.src = chrome.runtime.getURL('views/frame.html');
  iframe.setAttribute('allow', 'microphone *');
  iframe.style = "position: absolute; width: 0; height: 0; border: 0;";
  document.body.appendChild(iframe);
}
embedFrame();

// TODO: Register onclick on hover icon/dot
var button = document.createElement('button');
button.id = 'voicely-test-button';
button.addEventListener('click', function (e) {
  console.log('buttonClicked');

  // if (e.pointerId !== 1) {
  //   return;
  // }
  e.stopPropagation();
  e.stopImmediatePropagation();
  e.preventDefault();
  //button.blur();

  // TODO: Add auth
  // // make sure user is logged in by sending a message to background.js
  chrome.runtime.sendMessage({
    action: "isUserLoggedIn"
  }, function (response) {
    console.log("response", response);
    // TODO: Make check so that won't be true for error
    if (response) {
      const msg = {
        type: 'START_TRANSCRIPTION'
      };
      document.getElementById('voicely-iframe').contentWindow.postMessage(msg, '*');
    } else {
      console.log("not logged in");
    }
  });
});
document.body.appendChild(button);
window.addEventListener('message', function (event) {
  if (event.data.type && event.data.type === 'FROMFRAME') {
    // console.log('event.data-content-script', event.data);
  }
});
let toolbarUI;
let lastUseDate = new Date().getTime(); // TODO: should actually be saved in prefs
let lastReminderDate = new Date().getTime(); // TODO: should actually be saved in prefs
let unusedMinutesShowReminder = 0.5;
let initLanguage = "";
let manuallySelectedLanguage = "";
function handleRequest(request, sender, callback) {
  if (request.action === "turnOffAutoCheck") {
    autoCheckOnDomain = false;
  } else if (request.action === "reactivateIcon") {
    disableOnDomain = false;
  } else if (request.action === "closePopup") {
    closePopup();
  } else if (request.action === "showErrorNumberOnMarker") {
    showMatchedResultOnMarker(request.data);
  } else if (request.action === 'checkText') {
    checkText(callback, request);
  } else if (request.action === 'getCurrentText') {
    callback(getCurrentText());
  } else if (request.action === 'applyCorrection') {
    applyCorrection(request, callback);
    return true;
  } else if (request.action === 'saveLanguagesSettings') {
    initLanguage = request.data.initLanguage;
    manuallySelectedLanguage = request.data.manuallySelectedLanguage;
  } else if (request.action === 'getLanguagesSettings') {
    callback({
      initLanguage: initLanguage,
      manuallySelectedLanguage: manuallySelectedLanguage
    });
  } else if (request === 'toggle-in-page-toolbar') {
    if (toolbarUI) {
      toggleToolbar(toolbarUI);
    } else {
      toolbarUI = initToolbar();
    }
    // TODO: Correct? Or chrome.runtime.onMessage.addListener different from parent.postMessage(msg, "*")?
    // } else if (request.action === 'receiveTranscription') {
    //     console.log('request.data', request.data);

    //     // TODO: XXX
  } else {
    try {
      consoleLog(request);
      handleMessages(request);
    } catch (e) {
      const minifiedURL = (pageURL || window.location.href || '').slice(0, 60);
      // gaLog('JSError-CSA', `${e.name}:${e.message}`, `${minifiedURL}`);
      console.error(e);
      alert(`Unknown action: ${request.action}`);
      Tools.track("internal", `Unknown action: ${request.action}`);
    }
  }
}
function closePopup() {
  $.featherlight.close();
}
function checkText(callback, request) {
  lastUseDate = new Date().getTime();
  const metaData = getMetaData(request.pageUrl);
  if (document.activeElement.tagName === "IFRAME") {
    // this case happens e.g. in roundcube when selecting text in an email one is reading:
    try {
      if (document.activeElement && document.activeElement.contentWindow && document.activeElement.contentWindow.document.getSelection() && document.activeElement.contentWindow.document.getSelection().toString() !== "") {
        // TODO: actually the text might be editable, e.g. on wordpress.com:
        const text = document.activeElement.contentWindow.document.getSelection().toString();
        callback({
          markupList: [{
            text: text
          }],
          metaData: metaData,
          isEditableText: false,
          url: request.pageUrl
        });
        return;
      }
    } catch (err) {
      Tools.track(request.pageUrl, `error on checkText for iframe: ${err.message}`);
    }
  }
  const selection = window.getSelection();
  if (selection && selection.toString() !== "") {
    // TODO: because of this, a selection in a textarea will not offer clickable suggestions:
    let text = selection.toString().replace(/\n/g, "\n\n"); // useful for lists
    callback({
      markupList: [{
        text: text
      }],
      metaData: metaData,
      isEditableText: false,
      url: request.pageUrl
    });
  } else {
    try {
      if (activeElement()) {
        callback({
          markupList: getMarkupListOfActiveElement(activeElement()),
          metaData: metaData,
          isEditableText: true,
          url: request.pageUrl
        });
      } else {
        const markupList = getMarkupListOfActiveElement(document.activeElement);
        callback({
          markupList: markupList,
          metaData: metaData,
          isEditableText: true,
          url: request.pageUrl
        });
      }
    } catch (e) {
      //console.log("LanguageTool extension got error (document.activeElement: " + document.activeElement + "), will try iframes:");
      //console.log(e);
      // Fallback e.g. for tinyMCE as used on languagetool.org - document.activeElement simply doesn't
      // seem to work if focus is inside the iframe.
      Tools.track(request.pageUrl, `error on checkText - get selection: ${e.message}`);
      const iframes = document.getElementsByTagName("iframe");
      let found = false;
      for (let i = 0; i < iframes.length; i++) {
        try {
          const markupList = getMarkupListOfActiveElement(iframes[i].contentWindow.document.activeElement);
          found = true;
          callback({
            markupList: markupList,
            metaData: metaData,
            isEditableText: true,
            url: request.pageUrl
          });
        } catch (e) {
          // ignore - what else could we do here? We just iterate the frames until
          // we find one with text in its activeElement
          //console.log("LanguageTool extension got error (iframes " + i + "):");
          //console.log(e);
        }
      }
      if (!found) {
        callback({
          message: e.toString()
        });
        Tools.track(request.pageUrl, "Exception and failing fallback in checkText: " + e.message);
      }
    }
  }
}
function cleanEMail(email) {
  // remove so we don't transfer data we don't need
  if (email) {
    return email.replace(/@[0-9a-zA-Z.-]+/, "@replaced.domain");
  } else {
    return email;
  }
}
function getCurrentText() {
  return getMarkupListOfActiveElement(document.activeElement);
}

// Note: document.activeElement sometimes seems to be wrong, e.g. on languagetool.org
// it sometimes points to the language selection drop down even when the cursor
// is inside the text field - probably related to the iframe...
function getMarkupListOfActiveElement(elem) {
  if (isSimpleInput(elem)) {
    return [{
      text: elem.value
    }];
  } else if (elem.hasAttribute("contenteditable")) {
    return Markup.html2markupList(elem.innerHTML, document);
  } else if (elem.tagName === "IFRAME") {
    const activeElem = elem.contentWindow.document.activeElement;
    if (activeElem.innerHTML) {
      return Markup.html2markupList(activeElem.innerHTML, document);
    } else if (activeElem.textContent) {
      // not sure if this case ever happens?
      return [{
        text: activeElem.textContent.toString()
      }];
    } else {
      throw chrome.i18n.getMessage("placeCursor1");
    }
  } else {
    if (elem) {
      throw chrome.i18n.getMessage("placeCursor2", elem.tagName);
    } else {
      throw chrome.i18n.getMessage("placeCursor3");
    }
  }
}
function applyCorrection(request, callback) {
  let found = false;
  let isReplacementAsync = false;

  // TODO: active element might have changed in between?!
  const activeElem = activeElement();
  if (activeElem.hasAttribute("contenteditable")) {
    const nodeReplacements = Markup.findNodeReplacements(request.markupList, request.errorOffset, request.errorText.length, request.replacement);
    found = replaceInContentEditable(activeElem, nodeReplacements, callback);
    isReplacementAsync = true;
  } else {
    let newMarkupList;
    try {
      newMarkupList = Markup.replace(request.markupList, request.errorOffset, request.errorText.length, request.replacement);
    } catch (e) {
      // e.g. when replacement fails because of complicated HTML
      alert(e.toString());
      Tools.track(request.pageUrl, "Exception in applyCorrection: " + e.message);
      return;
    }

    // Note: this duplicates the logic from getTextOfActiveElement():
    if (isSimpleInput(activeElem)) {
      found = replaceIn(activeElem, "value", newMarkupList);
      if (found) {
        simulateInput(activeElem);
      }
    } else if (activeElem.tagName === "IFRAME") {
      const activeElem2 = activeElem.contentWindow.document.activeElement;
      if (activeElem2 && activeElem2.innerHTML) {
        found = replaceIn(activeElem2, "innerHTML", newMarkupList); // e.g. on wordpress.com
      } else if (isSimpleInput(activeElem2)) {
        found = replaceIn(activeElem2, "value", newMarkupList); // e.g. sending messages on upwork.com (https://www.upwork.com/e/.../contracts/v2/.../)
      } else {
        found = replaceIn(activeElem2, "textContent", newMarkupList); // tinyMCE as used on languagetool.org
      }
    }
  }

  if (!found) {
    alert(chrome.i18n.getMessage("noReplacementPossible"));
    Tools.track(request.pageUrl, "Problem in applyCorrection: noReplacementPossible");
  }

  // in case if replacement is async(e.g. contenteditable element) we shouldn't invoke callback
  if (!(isReplacementAsync && found)) {
    callback();
  }
}
function isSimpleInput(elem) {
  //console.log("elem.tagName: " + elem.tagName + ", elem.type: " + elem.type);
  if (elem.tagName === "TEXTAREA") {
    return true;
  } else if (elem.tagName === "INPUT" && (elem.type === "text" || elem.type === "search")) {
    return true;
  }
  return false;
}
function replaceIn(elem, elemValue, markupList) {
  if (elem && elem[elemValue]) {
    // Note for reviewer: elemValue can be 'innerHTML', but markupList always comes from
    // Markup.replace() (see applyCorrection()), which makes sure the replacement coming
    // from the server is sanitized:
    elem[elemValue] = Markup.markupList2html(markupList);
    return true;
  }
  return false;
}

// replace text in contenteditable element
function replaceInContentEditable(activeElement, nodeReplacements, callback) {
  // try to find associated text nodes
  const replacementsInfo = [];
  for (const nodeReplacement of nodeReplacements) {
    let possibleParents = [activeElement];
    if (nodeReplacement.selector) {
      possibleParents = [].slice.call(activeElement.querySelectorAll(nodeReplacement.selector));
    }
    for (const possibleParent of possibleParents) {
      possibleParent.normalize();
      const node = possibleParent.childNodes[nodeReplacement.textNodeIndex];
      if (node && node.nodeType === document.TEXT_NODE && node.textContent === nodeReplacement.oldText) {
        replacementsInfo.push({
          textNode: node,
          newText: nodeReplacement.newText
        });
        break;
      }
    }
  }

  // check that we find all text nodes
  // if not then we don't make any changes
  if (replacementsInfo.length !== nodeReplacements.length) {
    return false;
  }

  // replace text in text nodes one by one (replacement is async process)
  replacementsInfo.reduce((promise, replacementInfo) => promise.then(_ => applyTextNodeReplacement(replacementInfo)), Promise.resolve()).then(_ => simulateInput(activeElement)).then(callback);
  return true;
}
function applyTextNodeReplacement(replacementInfo) {
  return new Promise((resolve, reject) => {
    simulateSelection(replacementInfo.textNode);
    setTimeout(_ => {
      replacementInfo.textNode.textContent = replacementInfo.newText;
      resolve();
    }, 25);
  });
}

// trigger different events on text node to simulate user selection
function simulateSelection(textNode) {
  const selection = window.getSelection();
  selection.empty();
  const range = new Range();
  range.setStart(textNode, 0);
  range.collapse();
  selection.addRange(range);
  const mouseDownEvent = new MouseEvent("mousedown", {
    "bubbles": true,
    "cancelable": false
  });
  textNode.dispatchEvent(mouseDownEvent);
  var mouseUpEvent = new MouseEvent("mouseup", {
    "bubbles": true,
    "cancelable": false
  });
  textNode.dispatchEvent(mouseUpEvent);
}

// trigger different events on element to simulate user input
function simulateInput(inputElement) {
  const inputEvent = new InputEvent("input", {
    "bubbles": true,
    "cancelable": false
  });
  var changeEvent = new Event("change", {
    "bubbles": true,
    "cancelable": false
  });
  inputElement.dispatchEvent(inputEvent);
  inputElement.dispatchEvent(changeEvent);
}
const DEBUG = true;

/* global chrome, console */
/* eslint-disable no-var, no-console, vars-on-top, no-param-reassign, no-shadow, block-scoped-var */
/* eslint-disable no-lonely-if */
function consoleLog(...args) {
  if (DEBUG) console.log(...args);
}
// var extensionId = chrome.runtime.id;

var target;
var followedByCapitalLetter = ['.', '?', '!', '\n'];
var pasteMode = false;

/* eslint-disable */
var plusEnabled = false;
/* eslint-enable */

var recognizing = false;
var capsOn = false;
var capsNext = false;
var pageURL = '';
var settingsLoaded = false;
var changeCase = false;

// const PASTEMODE_DOMAINS = ['www.facebook.com', 'm.facebook.com', 'discord.com',
//   'www.reddit.com', 'web.whatsapp.com', 'www.messenger.com', 'meet.google.com',
//   'www.linkedin.com', 'twitter.com', 'web.skype.com', 'outlook.live.com', 'mail.yahoo.com',
//   'keep.google.com', 'quizlet.com', 'www.instagram.com', 'www.teamwork.com',
//   'classroom.google.com', 'www.carousell.com.hk', 'hangouts.google.com', 'www.youtube.com',
//   'www.ebility.com', 'www.notion.so', 'docs.google.com',
//   'voice.google.com', 'twitch.tv', 'app.hubspot.com', 'provider.teladoc.com',
//   'messages.google.com'];

// Whitelist of sites where we let people use advancedMode for free.
const whitelist = ['classroom.google.com', 'twitter.com', 'www.google.com', 'outlook.live.com', 'docs.google.com', 'meet.google.com', 'translate.google.com', 'www.facebook.com', 'discord.com', 'm.facebook.com', 'www.reddit.com', 'www.messenger.com', 'www.linkedin.com', 'quizlet.com', 'www.teamwork.com', 'www.instagram.com', 'www.carousell.com.hk', 'outlook.office.com', 'outlook.office365.com', 'web.whatsapp.com', 'dictanote.co', 'localhost:8000', 'mail.yahoo.com', 'www.bing.com', 'twitch.tv', 'www.youtube.com'];

// Global - captures current language.
var lang = '';

// TODO: analytics
// function gaLog(category, action, label, interaction = true) {
//   consoleLog('VIGA', category, action, label);
//   chrome.runtime.sendMessage({
//     message_id: 'track',
//     category,
//     action,
//     label,
//     interaction,
//   });
// }

function getHost() {
  try {
    var url = new URL(pageURL);
    return url.host;
  } catch (error) {
    return 'unknown.com';
  }
}
function getPath() {
  try {
    var url = new URL(pageURL);
    return url.pathname;
  } catch (error) {
    return 'unknown.com';
  }
}

// If iframe - document.activeElement.contentWindow.document.activeElement
function getActiveElement() {
  var elem = document.activeElement;
  if (!elem || elem.tagName === 'IFRAME') {
    return null;
  }
  return elem;
}
function getActiveDocument() {
  var elem = document.activeElement;
  if (!elem || elem.tagName === 'IFRAME') {
    return null;
  }
  return document;
}
function getActiveWindow() {
  var elem = document.activeElement;
  if (!elem || elem.tagName === 'IFRAME') {
    return null;
  }
  return window;
}
function checkTargetable() {
  var tgt = getActiveElement();
  var targetable = false;
  if (tgt) {
    // hasFocus is important here.
    // When we have multiple frames, one of the iframes might have a contenteditable X
    // that is active. However when we click out of the iframe, it still returns X
    // as active. This can lead to double typing.
    if ((tgt.nodeName === 'INPUT' || tgt.nodeName === 'TEXTAREA' || tgt.isContentEditable) && document.hasFocus()) {
      targetable = true;
    }
  }
  return {
    targetable,
    target: tgt
  };
}
let prevText = '';
function insertText(textToInsert) {
  function capitalize(text) {
    return text.replace(/\S/, x => x.toUpperCase());
  }
  function needsCapitalization(prevText, followedByCapitalLetter) {
    for (var i = 0; i < followedByCapitalLetter.length; i += 1) {
      var c = followedByCapitalLetter[i];
      if (prevText.slice(prevText.length - c.length) === c) {
        return true;
      }
    }
    return false;
  }
  function getPrevText(target, lookback) {
    var res = '';
    switch (target.tagName) {
      case 'INPUT':
      case 'TEXTAREA':
        var val = target.value;
        var selEnd = target.selectionStart;
        var selStart = Math.max(0, selEnd - lookback);
        res = val.substring(selStart, selEnd);
        if (res.indexOf('\n') !== -1) {
          res = res.slice(res.lastIndexOf('\n') + 1);
        }
        break;
      case 'DIV':
      case 'P':
      default:
        var wndw = getActiveWindow();
        if (wndw && wndw.getSelection) {
          var range = wndw.getSelection().getRangeAt(0);
          if (!range.collapsed) {
            range.deleteContents();
          }

          // range.collapse
          // true collapses to start of range / false to end
          range.collapse(false);
          if (range.collapsed) {
            // We generate preview only for text node
            const inlineable = ['SPAN', 'FONT', 'B', 'I', 'U'];
            let leftSibling;
            let selStart;
            let selEnd;
            var container = range.startContainer;
            if (container.nodeType === 3) {
              selEnd = range.startOffset;
              if (selEnd - lookback > 0) {
                selStart = selEnd - lookback;
                res = container.textContent.substring(selStart, selEnd);
              } else {
                // If font styling has been used or grammer help setup,
                // then it is likely we may not get enough prev text
                // Hope to previous sibling to get complete lookback
                selStart = 0;
                res = container.textContent.substring(selStart, selEnd);
                if (container.previousSibling) {
                  leftSibling = container.previousSibling;
                  while (leftSibling.nodeType !== 3) {
                    if (leftSibling.nodeType === 1 && inlineable.indexOf(leftSibling.nodeName) !== -1) {
                      leftSibling = leftSibling.childNodes[leftSibling.childNodes.length - 1];
                    } else {
                      break;
                    }
                  }
                }
                if (leftSibling && leftSibling.nodeType === 3) {
                  var lookbackNeeded = lookback - selEnd;
                  selEnd = leftSibling.textContent.length;
                  selStart = Math.max(0, selEnd - lookbackNeeded);
                  res = leftSibling.textContent.substring(selStart, selEnd) + res;
                }
              }
            } else if ( /* container.nodeType != 3 && */range.startOffset > 0) {
              leftSibling = container.childNodes[range.startOffset - 1];
              while (leftSibling.nodeType !== 3) {
                if (leftSibling.nodeType === 1 && inlineable.indexOf(leftSibling.nodeName) !== -1) {
                  leftSibling = leftSibling.childNodes[leftSibling.childNodes.length - 1];
                } else {
                  break;
                }
              }
              if (leftSibling.nodeType === 3) {
                selEnd = leftSibling.textContent.length;
                selStart = Math.max(0, selEnd - lookback);
                res = leftSibling.textContent.substring(selStart, selEnd);
              }
            }
          }
        }
    }
    return res;
  }
  function deletePreviousWord() {
    const inlineable = ['SPAN', 'FONT', 'B', 'I', 'U'];

    // Traverses the tree to get previous text node.
    function getPreviousTextNode(curNode) {
      let leftSibling = curNode.previousSibling;
      if (!leftSibling) {
        const parentNode = curNode.parentNode;
        if (inlineable.indexOf(parentNode.nodeName) !== -1) {
          return getPreviousTextNode(parentNode);
        }
        return null;
      }
      while (leftSibling.nodeType !== 3) {
        if (leftSibling.nodeType === 1 && inlineable.indexOf(leftSibling.nodeName) !== -1) {
          leftSibling = leftSibling.childNodes[leftSibling.childNodes.length - 1];
        } else {
          break;
        }
      }
      if (leftSibling.nodeType === 3) {
        return leftSibling;
      }
      return null;
    }
    var wndw = getActiveWindow();
    if (wndw && wndw.getSelection) {
      var range = wndw.getSelection().getRangeAt(0);
      if (!range.collapsed) {
        range.deleteContents();
      }

      // range.collapse
      // true collapses to start of range / false to end
      range.collapse(false);
      if (range.collapsed) {
        var endContainer = range.startContainer;
        var endOffset = range.startOffset;
        var startContainer = endContainer;
        var startOffset = endOffset;
        var foundStart = false;
        if (startContainer.nodeType !== 3) {
          // Lets find a textNode to begin with.
          var firstTextNode;
          if (startOffset !== startContainer.childNodes.length) {
            firstTextNode = getPreviousTextNode(startContainer.childNodes[startOffset]);
          } else {
            // TODO: Is this correct ?
            firstTextNode = getPreviousTextNode(startContainer);
          }
          if (firstTextNode) {
            startContainer = firstTextNode;
            startOffset = firstTextNode.textContent.length;
          } else {
            foundStart = true;
          }
        }

        // The invariant in the below loop is that startContainer is always a textNode.
        while (!foundStart) {
          const val = startContainer.textContent;
          var selStart = val.lastIndexOf(' ', startOffset);
          if (selStart !== -1) {
            foundStart = true;
            startOffset = selStart;
            break;
          } else {
            var newContainer = getPreviousTextNode(startContainer);
            if (newContainer) {
              startContainer = newContainer;
              startOffset = newContainer.textContent.length;
            } else {
              startOffset = 0;
              foundStart = true;
              break;
            }
          }
        }
        const textRange = document.createRange();
        textRange.setStart(startContainer, startOffset);
        textRange.setEnd(endContainer, endOffset);
        textRange.deleteContents();

        // document.getSelection().removeAllRanges();
        // document.getSelection().addRange(textRange);
      }
    }
  }

  function adjustText(textToInsert, prevText) {
    var skipEdits = ['yue-Hant-HK', 'ja-JP', 'cmn-Hans-HK', 'cmn-Hans-CN'];
    if (skipEdits.indexOf(lang) === -1) {
      consoleLog(`prev text:"${prevText}"`);
      var endsWithSpace = prevText.length > 0 && ['\n', ' ', String.fromCharCode(160)].indexOf(prevText[prevText.length - 1]) !== -1;
      prevText = prevText.trim();
      if (changeCase === 'ce') {
        // ce => capitalize all words
        // capitalize first charecter of each word
        textToInsert = textToInsert.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
      } else {
        // Check if we want to capitalize
        // Lowercase doesn't have to be capitalized
        // Uppercase is already capitalized
        var disableCapitalization = changeCase === 'lc' || changeCase === 'uc';
        if (!disableCapitalization && (needsCapitalization(prevText, followedByCapitalLetter) || prevText.length === 0 || prevText === '' || prevText === undefined || prevText === 'null')) {
          textToInsert = capitalize(textToInsert);
        }

        // I is capitalized only in English
        if (!disableCapitalization && lang.startsWith('en-')) {
          textToInsert = textToInsert.replace(/\bi\b/g, () => 'I');
        }
      }

      // Check if we want to add space
      if (prevText.length > 0 && !endsWithSpace && ['(', '/', '‘', '“', '-', '–'].indexOf(prevText[prevText.length - 1]) === -1 && ['.', ',', ';', ':', '?', '!', ')', '’', '”', ' ', String.fromCharCode(160), '-', '–'].indexOf(textToInsert[0]) === -1) {
        textToInsert = ` ${textToInsert}`;
      }
    }
    consoleLog(`finalText "${textToInsert}"`);
    return textToInsert;
  }

  /**
    Make sure target is usable.
    **/
  function prepTarget() {
    const domain = getHost();
    const doc = getActiveDocument();
    const wndw = getActiveWindow();
    console.log('domain', domain);
    if (!doc.body.classList.contains('voicein_ready')) {
      // On all domains where we want to trap the paste.
      // Use this if site does space suppression.
      const enablePasteHandler = ['notion.so', 'www.youtube.com', 'classroom.google.com', 'www.linkedin.com'];
      const skipPasteHandler = ['writer.zoho.com'];

      // if (enablePasteHandler.indexOf(domain) !== -1 || pageURL.indexOf('wp-admin') !== -1) {
      // The default is to add the paste trap.
      if (whitelist.indexOf(domain) !== -1 && enablePasteHandler.indexOf(domain) === -1 || skipPasteHandler.indexOf(domain) !== -1) {
        consoleLog('[PrepTarget] Paste Trapper Not Enabled');
        doc.body.classList.add('voicein_ready');
      } else {
        consoleLog('[PrepTarget] Prepped Target', doc.body);
        wndw.addEventListener('paste', e => {
          if (recognizing && document.activeElement && document.activeElement.nodeName !== 'INPUT') {
            e.stopImmediatePropagation();
            consoleLog('Stopped Paste Propogation');
          }
        }, true);
        doc.body.classList.add('voicein_ready');
      }
    }
  }

  // Note that this function does in-place modifications.
  function trimParts(parts) {
    for (let i = 0; i < parts.length; i += 1) {
      let part = parts[i];
      if (part.length > 0 && part[0] === ' ') {
        part = part.slice(1);
        parts[i] = part;
      }
      if (part.length > 0 && part[part.length - 1] === ' ') {
        parts[i] = part.slice(0, part.length - 1);
      }
    }
  }
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const copyKeyCode = isMac ? 91 : 17;
  function copyPaste(text, callback) {
    // writeText is only available in https
    if (window === window.top && window.location.protocol === 'https:') {
      navigator.clipboard.writeText(text).then(() => {
        callback();
        if (document.activeElement && document.activeElement.nodeName === 'INPUT') {
          document.activeElement.dispatchEvent(new KeyboardEvent('keyup', {
            keyCode: copyKeyCode
          }));
        }
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    } else {
      // TODO: Bug where the hasn't copied to clipboard yet and we call paste.
      // As a result, it leads to bad output. Fix by waiting for copy to complete before pasting.
      chrome.runtime.sendMessage({
        message_id: 'copy_text',
        value: text
      }, response => {
        if (response) {
          callback();
        }
      });
    }
  }
  function pasteTextIntoTarget(target, text) {
    prepTarget(target);
    text = text.replaceAll('<newline>', '\n');
    text = text.replaceAll('<newparagraph>', '\n\n');
    const parts = text.split(/(<[a-z]+>)/g);
    var doc = getActiveDocument();
    var pasteFn = () => {
      doc.execCommand('paste', false);
    };
    if (parts.length > 1) {
      trimParts(parts);
    }
    for (let i = 0; i < parts.length; i += 1) {
      let part = parts[i];
      if (part) {
        switch (part) {
          case '<capitalize>':
            {
              capsNext = true;
              break;
            }
          case '<capson>':
            capsOn = true;
            break;
          case '<capsoff>':
            capsOn = false;
            break;
          case '<deleteword>':
            {
              deletePreviousWord();
              break;
            }
          case '<undo>':
            doc.execCommand('undo');
            break;
          case '<newparagraph>':
            {
              copyPaste('\n\n', pasteFn);
              prevText = '';
              break;
            }
          case '<insertspace>':
            {
              copyPaste(String.fromCharCode(160), pasteFn);
              prevText += String.fromCharCode(160);
              break;
            }
          case '<newline>':
            {
              copyPaste('\n', pasteFn);
              prevText = '';
              break;
            }
          default:
            {
              if (capsNext) {
                part = capitalize(part);
                capsNext = false;
              }
              if (capsOn) part = part.toLocaleUpperCase();
              const finalText = adjustText(part, prevText);
              copyPaste(finalText, pasteFn);
              prevText += finalText;
            }
        }
      }
    }
  }
  function pasteTextIntoTargetAlt(target, text) {
    function execInsertHTML(txt) {
      var doc = getActiveDocument();
      const html = txt.replace('\n', '<br>');
      consoleLog('insertHTML', html);
      doc.execCommand('insertHTML', false, html);
    }
    const parts = text.split(/(<[a-z]+>)/g);
    if (parts.length > 1) {
      trimParts(parts);
    }
    for (let i = 0; i < parts.length; i += 1) {
      let part = parts[i];
      if (part) {
        switch (part) {
          case '<capitalize>':
            {
              capsNext = true;
              break;
            }
          case '<capson>':
            capsOn = true;
            break;
          case '<capsoff>':
            capsOn = false;
            break;
          case '<deleteword>':
            {
              deletePreviousWord();
              break;
            }
          case '<newparagraph>':
            {
              execInsertHTML('\n\n');
              prevText = '';
              break;
            }
          case '<insertspace>':
            {
              execInsertHTML(String.fromCharCode(160));
              prevText += String.fromCharCode(160);
              break;
            }
          case '<newline>':
            {
              execInsertHTML('\n');
              prevText = '';
              break;
            }
          default:
            {
              if (capsNext) {
                part = capitalize(part);
                capsNext = false;
              }
              if (capsOn) part = part.toLocaleUpperCase();
              const finalText = adjustText(part, prevText);
              execInsertHTML(finalText);
              prevText += finalText;
            }
        }
      }
    }
  }
  function aa(a, b, c) {
    if (a.setSelectionRange) {
      a.focus();
      a.setSelectionRange(b, c);
    } else if (a.createTextRange) {
      var d = a.createTextRange();
      d.collapse(!0);
      d.moveEnd('character', c);
      d.moveStart('character', b);
      d.select();
    }
  }
  function _(a, b) {
    aa(a, b, b);
  }
  function putTextIntoTextArea(target, finalText) {
    var d = target.selectionStart;
    var c = target.value;
    target.value = c.substring(0, d) + finalText + c.substring(d);
    d += finalText.length;

    // TODO: Unroll this function ?
    _(target, d);
  }
  function insertTextIntoTextArea(target, text) {
    // text = text.replace(/<newparagraph>/g, '\n\n');
    // text = text.replace(/<newline>/g, '\n');
    // text = text.replace(/<insertspace>/g, String.fromCharCode(160));

    const parts = text.split(/(<[a-z]+>)/g);
    if (parts.length > 1) {
      trimParts(parts);
    }
    var doc = getActiveDocument();
    for (let i = 0; i < parts.length; i += 1) {
      let part = parts[i];
      if (part) {
        switch (part) {
          // case '<copybox>': {
          //   const copyText = document.getElementById('voicein_spacebox');
          //   navigator.clipboard.writeText(copyText.value)
          //     .then(() => { })
          //     .catch((err) => { console.error('Could not copy text: ', err); });
          //   break;
          // }
          case '<paste>':
            doc.execCommand('paste');
            break;
          case '<undo>':
            doc.execCommand('undo');
            break;
          case '<capitalize>':
            {
              capsNext = true;
              break;
            }
          case '<capson>':
            capsOn = true;
            break;
          case '<capsoff>':
            capsOn = false;
            break;
          case '<deleteword>':
            {
              var selEnd = target.selectionStart;
              var val = target.value;

              // find first ' ' or '\n'
              var selStart1 = Math.max(val.lastIndexOf(' ', selEnd), 0);
              var selStart2 = Math.max(val.lastIndexOf('\n', selEnd) + 1, 0);
              var selStart = Math.max(selStart1, selStart2);
              var finalText = val.slice(0, selStart) + val.slice(selEnd);
              target.value = finalText;
              target.setSelectionRange(selStart, selStart);
              break;
            }
          case '<newparagraph>':
            {
              putTextIntoTextArea(target, '\n\n');
              prevText = '';
              break;
            }
          case '<insertspace>':
            {
              putTextIntoTextArea(target, String.fromCharCode(160));
              prevText += String.fromCharCode(160);
              break;
            }
          case '<newline>':
            {
              putTextIntoTextArea(target, '\n');
              prevText = '';
              break;
            }
          default:
            {
              target.blur();
              target.focus();
              // TODO
              // $.event.trigger({
              //     type: "keypress"
              // });
              if (capsNext) {
                part = capitalize(part);
                capsNext = false;
              }
              if (capsOn) part = part.toLocaleUpperCase();
              const finalText = adjustText(part, prevText);
              putTextIntoTextArea(target, finalText);
              prevText += finalText;
              document.activeElement.dispatchEvent(new KeyboardEvent('keyup', {
                keyCode: copyKeyCode
              }));
              target.blur();
              target.focus();

              // $.event.trigger({
              //   type: "keypress"
              // });
            }
        }
      }
    }
  }

  function insertTextIntoContentEditable(target, text) {
    var e;
    var f;
    var g;
    const doc = getActiveDocument();
    const wndw = getActiveWindow();
    if (wndw && wndw.getSelection) {
      e = wndw.getSelection();
      if (e.getRangeAt && e.rangeCount) {
        f = e.getRangeAt(0);
        f.deleteContents();
        let skipRange = false;
        const parts = text.split(/(<[a-z]+>)/g);
        if (parts.length > 1) {
          trimParts(parts);
        }
        for (let i = 0; i < parts.length; i += 1) {
          let part = parts[i];
          if (part) {
            switch (part) {
              case '<newline>':
                {
                  g = document.createElement('span');
                  g.innerHTML = '<br>';
                  f.insertNode(g);
                  f.collapse(!0);
                  f.setStartAfter(g);
                  f.setEndAfter(g);
                  prevText = '';
                  break;
                }
              case '<newparagraph>':
                {
                  g = document.createElement('br');
                  f.insertNode(g);
                  f.collapse(!0);
                  f.setStartAfter(g);
                  f.setEndAfter(g);
                  g = document.createElement('br');
                  f.insertNode(g);
                  f.collapse(!0);
                  f.setStartAfter(g);
                  f.setEndAfter(g);
                  prevText = '';
                  break;
                }
              // case '<copybox>': {
              //   const copyText = document.getElementById('voicein_spacebox');
              //   navigator.clipboard.writeText(copyText.value)
              //     .then(() => { })
              //     .catch((err) => { console.error('Could not copy text: ', err); });
              //   break;
              // }
              case '<deleteword>':
                {
                  deletePreviousWord();
                  break;
                }
              case '<paste>':
                {
                  doc.execCommand('paste');
                  skipRange = true;
                  break;
                }
              case '<undo>':
                {
                  doc.execCommand('undo');
                  skipRange = true;
                  break;
                }
              case '<capitalize>':
                {
                  capsNext = true;
                  break;
                }
              case '<capson>':
                {
                  capsOn = true;
                  break;
                }
              case '<capsoff>':
                {
                  capsOn = false;
                  break;
                }
              case '<insertspace>':
                {
                  part = String.fromCharCode(160);
                  g = document.createTextNode(part);
                  f.insertNode(g);
                  f.collapse(!0);
                  f.setStart(g, part.length);
                  f.setEnd(g, part.length);
                  prevText += part;
                  break;
                }
              default:
                {
                  target.blur();
                  target.focus();
                  if (capsNext) {
                    part = capitalize(part);
                    capsNext = false;
                  }
                  if (capsOn) part = part.toLocaleUpperCase();
                  const finalText = adjustText(part, prevText);
                  g = document.createTextNode(finalText);
                  f.insertNode(g);
                  f.collapse(!0);
                  // f.setStartAfter(g);
                  // f.setEndAfter(g);
                  f.setStart(g, finalText.length);
                  f.setEnd(g, finalText.length);
                  prevText += finalText;
                  break;
                }
            }
          }
        }

        // f.setStart(g, rangeEnd);
        // f.setEnd(g, rangeEnd);
        if (!skipRange) {
          e.removeAllRanges();
          e.addRange(f);
        }
        if (g && g.parentNode) {
          g.parentNode.normalize();
        }
      }
    } else {
      // Never happens
      // document.selection && document.selection.createRange
    }
  }
  if (textToInsert.length > 0) {
    textToInsert = textToInsert.trimLeft();
    const domain = getHost();
    const path = getPath();
    if (domain === 'docs.google.com' && (path.startsWith('/document/') || path.startsWith('/presentation/')) || domain === 'writer.zoho.com') {
      prevText = prevText.slice(-6);
    } else {
      prevText = getPrevText(target, 6);
    }
    try {
      // consoleLog(`insertCE "${textToInsert}"`);
      // insertTextIntoContentEditable(target, textToInsert);

      // consoleLog(`paste-alt "${textToInsert}"`);
      // pasteTextIntoTargetAlt(target, textToInsert);

      // consoleLog(`paste "${textToInsert}"`);
      // pasteTextIntoTarget(target, textToInsert);

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        if (pasteMode) {
          consoleLog(`pasteTA "${textToInsert}"`);
          pasteTextIntoTarget(target, textToInsert);
        } else {
          consoleLog(`insertTA "${textToInsert}"`);
          insertTextIntoTextArea(target, textToInsert);
        }
      } else {
        var skipPasteMode = ['outlook.live.com', 'outlook.office.com', 'outlook.office365.com', 'mail.yahoo.com', 'www.linkedin.com', 'twitter.com', 'x.com'];
        const host = getHost();
        if (pasteMode && skipPasteMode.indexOf(host) === -1) {
          consoleLog(`pasteCE "${textToInsert}"`);
          pasteTextIntoTarget(target, textToInsert);
        } else {
          consoleLog(`insertCE "${textToInsert}"`);
          insertTextIntoContentEditable(target, textToInsert);
        }
      }
    } catch (err) {
      consoleLog(err);
    }
    return textToInsert.length;
  }
  return 0;
}
function addFinalText(txt) {
  console.log("txt", txt);
  var res = checkTargetable();
  if (res.targetable) {
    target = res.target;
    insertText(txt);
    // $("#voicein_voicebox").fadeOut("slow");
    // document.getElementById('voicein_voicebox').style.display = 'none';
    // document.getElementById('voicein_voicebox').innerHTML = '';
    // interimText = '';

    // var errorBox = document.querySelector('#voicein_error');
    // if (errorBox.style.display === 'block') {
    //   errorBox.style.display = 'none';
    // }
  }
}

function loadLanguage() {
  chrome.storage.sync.get('stored_lang', res => {
    lang = res.stored_lang;
    if (!(typeof lang === 'string' && lang.length > 1)) {
      lang = 'en-US';
    }
  });
}
function loadSettings() {
  // Enable some exceptions
  const host = getHost();

  // const PASTEMODE_DOMAINS = ['www.facebook.com', 'm.facebook.com', 'discord.com',
  //   'www.reddit.com', 'web.whatsapp.com', 'www.messenger.com', 'meet.google.com',
  //   'www.linkedin.com', 'twitter.com', 'web.skype.com', 'outlook.live.com', 'mail.yahoo.com',
  //   'keep.google.com', 'quizlet.com', 'www.instagram.com', 'www.teamwork.com',
  //   'classroom.google.com', 'www.carousell.com.hk', 'hangouts.google.com', 'www.youtube.com',
  //   'www.ebility.com', 'www.notion.so', 'docs.google.com', 'forms.google.com',
  //   'voice.google.com', 'twitch.tv', 'app.hubspot.com', 'provider.teladoc.com',
  //   'messages.google.com'];

  if (whitelist.indexOf(host) !== -1) {
    pasteMode = true;
  }
  loadLanguage();
  chrome.storage.sync.get('pro', ret => {
    if (!ret.pro) {
      return;
    }

    // User is pro
    plusEnabled = true;
    pasteMode = true;
    var pasteModeExceptions = ['mail.google.com', 'www.evernote.com'];
    if (pasteModeExceptions.indexOf(host) !== -1) {
      consoleLog('paste mode disabled - exception');
      pasteMode = false;
    } else {
      chrome.storage.sync.get('no_pastemode_domains', ret => {
        if (ret.no_pastemode_domains) {
          var domain = getHost();
          var pastemodeDomains = ret.no_pastemode_domains;
          var matched = false;
          for (var i = 0; i < pastemodeDomains.length; i += 1) {
            if (domain.endsWith(pastemodeDomains[i])) {
              matched = true;
              break;
            }
          }
          if (matched) {
            // global variable
            pasteMode = false;
          }
        }
      });
    }
    chrome.storage.sync.get('changeCase', ret => {
      if (ret.changeCase) {
        changeCase = ret.changeCase;
      }
    });
  });
}
function handleMessages(msg) {
  switch (msg.action) {
    case 'tab_url_change':
      pageURL = msg.url;
      if (!settingsLoaded) {
        settingsLoaded = true;
        loadSettings();
      }
      if (msg.recognizing) {
        recognizing = true;
      }
      break;
    case 'on_results':
      // consoleLog('Runtime', msg, recognizing);
      addFinalText(msg.txtToAdd);
      break;
    // case 'on_interim_results':
    //   addInterimText(msg.txtToAdd);
    //   break;
    case 'recognition_started_in_bg':
      pageURL = msg.url;
      if (!settingsLoaded) {
        settingsLoaded = true;
        loadSettings();
      } else {
        loadLanguage();
      }
      recognizing = true;
      break;
    case 'recognition_stopped_in_bg':
      recognizing = false;
      break;
    case 'lang_update':
      loadLanguage();
      break;
    case 'plus_activated':
      loadSettings();
      break;
    default:
  }
}

/***/ })

/******/ });