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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

const defaultVoiceCommands = __webpack_require__(6);
class Utils {
  static writeText(e) {
    const t = document.createElement("textarea");
    t.value = e, document.body.append(t), t.select();
    const r = document.execCommand("copy");
    return t.remove(), r ? Promise.resolve(e) : Promise.reject(new Error("Unable to write to clipboard"));
  }
  static isBrowserChromium() {
    for (let e = 0; e < navigator.plugins.length; e += 1) if (null != navigator.plugins[e].name && -1 !== navigator.plugins[e].name.indexOf("Chromium")) return !0;
    return !1;
  }
  static isInCompatible() {
    return false;
    // return (
    //   !(window.navigator.userAgent.indexOf("Edg") > -1) &&
    //   (window.navigator.userAgent.indexOf("Firefox") > -1
    //     ? "Firefox"
    //     : void 0 !== window.navigator.brave
    //     ? "Brave"
    //     : void 0 !== window.safari
    //     ? "Safari"
    //     : !!Utils.isBrowserChromium() && "Chromium")
    // );
  }

  static injectIntoTab(e, t) {
    chrome.tabs.executeScript(e.id, {
      file: "/js/cs/cs_top.js"
    }), t ? chrome.tabs.executeScript(e.id, {
      file: "/js/cs/cs_all.js",
      allFrames: !0,
      matchAboutBlank: !0
    }, t) : chrome.tabs.executeScript(e.id, {
      file: "/js/cs/cs_all.js",
      allFrames: !0,
      matchAboutBlank: !0
    });
  }
  static getDefaultVoiceCommands(e) {
    const t = Object.keys(defaultVoiceCommands);
    for (let r = 0; r < t.length; r += 1) if (e.startsWith(t[r])) return defaultVoiceCommands[t[r]];
    return defaultVoiceCommands.en;
  }
  static mergeArrays(e, t) {
    for (var r = [], i = e.concat(t), a = i.length, n = {}; a > 0;) {
      var o = i[a -= 1];
      n[o] || (r.unshift(o), n[o] = !0);
    }
    return r;
  }
  static trimSpacesOnly(e) {
    if (0 == e.length) return "";
    for (; " " == e[0] || e[0] == String.fromCharCode(160);) if (0 == (e = e.slice(1)).length) return "";
    for (; " " == e[e.length - 1] || e[e.length - 1] == String.fromCharCode(160);) if (0 == (e = e.slice(0, -1)).length) return "";
    return e;
  }
}
if (true) {
  module.exports = Utils;
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

var defaultVoiceCommands = {
  en: [{
    block: "Common Commands",
    entries: [["<newline>", "new line"], ["<newline>", "next line"], ["<newline>", "uline"], ["<newline>", "make slime"], ["<newparagraph>", "new paragraph"], ["<paste>", "paste that"], ["<undo>", "undo"], ["<capson>", "caps on"], ["<capsoff>", "caps off"], ["<deleteword>", "delete word"], ["<deleteword>", "delete last word"], ["<insertspace>", "insert space"], ["<capitalize>", "capitalize next"], ["<enter>", "press enter"], ["<tab>", "press tab"], ["<scrolldown>", "scroll down"], ["<scrollup>", "scroll up"]]
  }, {
    block: "Smileys",
    entries: [[";-)", "wink face"], [":-|", "straight face"], [":-)", "smiley"], [":-(", "sad face"], [":-/", "annoyed face"]]
  }, {
    block: "Special Characters",
    entries: [["©", "insert copyright"], ["@", "insert at"], ["+", "insert plus"], ["÷", "insert division"], ["*", "insert asterisk"], ["<", "insert less than"], ["%", "insert percent"], ["=", "insert equal"], ["-", "insert minus"], ["x", "insert multiplication"], [">", "insert greater than"], ["$", "insert dollar sign"], ["€,", "insert euro sign"]]
  }, {
    block: "Punctuation Marks",
    entries: [[".", "full stop"], ["·", "center dot"], ["!", "exclamation mark"], ["#", "hashtag"], ["…", "ellipsis"], [";", "semicolon"], ["/", "forward slash"], ["_", "underscore"], [",", "comma"], ["&", "ampersand"], ["|", "vertical bar"], [":", "colon"], ["?", "question mark"], ["\\", "backslash"], ["-", "hyphen"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["“", "open quote"], ["‘", "open single quote"], ["“", "open double quote"], ["{", "open brace"], ["(", "open parenthesis"], ["[", "open bracket"], ["<", "open angle bracket"], ["”", "close quote"], ["’", "close single quote"], ["”", "close double quote"], ["}", "close brace"], [")", "close parenthesis"], ["]", "close bracket"], [">", "close angle bracket"]]
  }],
  el: [{
    block: "Special Commands",
    entries: [["<newline>", "νέα γραμμή"], ["<newline>", "βάλε γραμμή"], ["<newline>", "άλλαξε γραμμή"], ["<newparagraph>", "νέα παράγραφος"], ["<newparagraph>", "βάλε παράγραφο"], ["<newparagraph>", "άλλαξε παράγραφο"], ["<paste>", "κάνε επικόλληση"], ["<capitalize>", "βάλε κεφαλαία στην επόμενη λέξη"], ["<capson>", "βάλε κεφαλαία"], ["<capsoff>", "βάλε πεζά"], ["<deleteword>", "σβήσε την τελευταία λέξη"], ["<insertspace>", "βάλε κενό"]]
  }, {
    block: "Smileys",
    entries: [["😉", "πρόσωπο που κλείνει το μάτι"], ["😐", "σοβαρό πρόσωπο"], ["😊", "χαμογελαστό πρόσωπο"], ["☹", "λυπημένο πρόσωπο"], [":-/", "ενοχλημένο πρόσωπο"]]
  }, {
    block: "Special Characters",
    entries: [["©", "βάλε πνευματικά δικαιώματα"], ["©", "βάλε copyright"], ["@", "βάλε παπάκι"], ["+", "βάλε συν"], ["÷", "βάλε διαίρεση"], ["/", "βάλε δία"], ["/", "βάλε διά"], ["/", "βάλε δια"], ["*", "βάλε αστερίσκο"], ["<", "βάλε μικρότερο"], ["%", "βάλε ποσοστό"], ["=", "βάλε ίσον"], ["-", "βάλε μείον"], ["-", "βάλε πλην"], ["×", "βάλε πολλαπλασιασμό"], ["×", "βάλε επί"], [">", "βάλε μεγαλύτερο"], ["$", "βάλε δολάριο"], ["€", "βάλε ευρώ"]]
  }, {
    block: "Punctuation Marks",
    entries: [[".", "βάλε τελεία"], [".", "βάλε τέλεια"], ["·", "βάλε άνω τελεία"], ["·", "βάλε άνω τέλεια"], ["!", "βάλε θαυμαστικό"], ["#", "βάλε δίεση"], ["…", "βάλε αποσιωπητικά"], [";", "βάλε ερωτηματικό"], [";", "βάλε ελληνικό ερωτηματικό"], ["/", "βάλε πρόσθια κάθετο"], ["_", "βάλε κάτω παύλα"], ["-", "βάλε παύλα"], [",", "βάλε κόμμα"], ["&", "βάλε και"], ["°", "βάλε βαθμούς"], ["|", "βάλε κάθετο"], [":", "βάλε άνω-κάτω τελεία"], [":", "βάλε άνω-κάτω τέλεια"], ["?", "βάλε αγγλικό ερωτηματικό"], ["\\", "βάλε ανάποδη κάθετο"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["”", "βάλε εισαγωγικά"], ["’", "βάλε μονά εισαγωγικά"], ["“", "άνοιξε εισαγωγικά"], ["‘", "άνοιξε μονά εισαγωγικά"], ["«", "άνοιξε ελληνικά εισαγωγικά"], ["{", "άνοιξε άγκιστρα"], ["(", "άνοιξε παρένθεση"], ["[", "άνοιξε αγκύλες"], ["<", "άνοιξε γωνία"], ["”", "κλείσε εισαγωγικά"], ["’", "κλείσε μονά εισαγωγικά"], ["»", "κλείσε ελληνικά εισαγωγικά"], ["}", "κλείσε άγκιστρα"], [")", "κλείσε παρένθεση"], ["]", "κλείσε αγκύλες"], [">", "κλείσε γωνία"]]
  }],
  pt: [{
    block: "Common Commands",
    entries: [["<newline>", "nova linha"], ["<newparagraph>", "novo parágrafo"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "careta"], [":-)", "sorriso"], [";-)", "piscar o olho"]]
  }, {
    block: "Special Characters",
    entries: [["*", "asterisco"], ["@", "arroba"], ["%", "símbolo de percentagem"], ["©", "símbolo de copyright"], ["=", "sinal de igual"], [">", "sinal de maior"], ["<", "sinal de menor"], ["-", "sinal de menos"], ["x", "sinal de multiplicação"], ["+", "sinal de mais"], ["<", "parêntesis inicial angular"], [">", "parêntesis final angular"], ["$", "sinal do dólar"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "dois pontos"], [",", "vírgula"], ["—", "traço"], ["…", "reticências"], ["!", "ponto de exclamação"], ["–", "hífen"], [".", "ponto final"], ["?", "ponto de interrogação"], [";", "ponto e vírgula"], ["&", "e comercial"], ["\\", "barra invertida"], ["·", "ponto central"], ["°", "símbolo de grau"], ["#", "cardinal"], ["_", "carácter de sublinhado"], ["|", "barra vertical"], ["/", "barra"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["“", "aspas iniciais"], ["”", "aspas finais"], ["‘", "plica inicial"], ["’", "plica final"], ["[", "parêntesis inicial reto"], ["]", "parêntesis final reto"], ["(", "parêntesis inicial curvo"], [")", "parêntesis final curvo"], ["{", "chaveta inicial"], ["}", "chaveta final"]]
  }],
  it: [{
    block: "Common Commands",
    entries: [["<newline>", "nuova riga"], ["<newparagraph>", "nuovo paragrafo"], ["<undo>", "cancella testo"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "faccina triste"], [":-)", "faccina felice"], [";-)", "faccina che fa l'occhiolino"]]
  }, {
    block: "Special Characters",
    entries: [["*", "asterisco"], ["@", "chiocciola"], ["%", "segno di percentuale"], ["©", "simbolo di copyright"], ["=", "segno di uguale"], [">", "segno di maggiore"], ["<", "segno di minore"], ["-", "segno di meno"], ["x", "segno di per"], ["+", "segno di più"], ["<", "apri parentesi angolare"], [">", "chiudi parentesi angolare"], ["$", "simbolo del dollaro"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "due punti"], ["—", "trattino lungo"], ["_", "trattino basso"], ["–", "trattino"], ["…", "puntini sospensivi"], ["!", "punto esclamativo"], ["?", "punto interrogativo"], [";", "punto e virgola"], ["·", "punto centrale"], [".", "punto"], [",", "virgola"], ["&", "e commerciale"], ["\\", "barra rovesciata"], ["|", "barra verticale"], ["/", "barra"], ["°", "simbolo dei gradi"], ["#", "cancelletto"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["‘", "apri virgoletta singola"], ["’", "chiudi virgoletta singola"], ["“", "apri virgolette"], ["”", "chiudi virgolette"], ["[", "apri parentesi quadra"], ["]", "chiudi parentesi quadra"], ["{", "apri parentesi graffa"], ["}", "chiudi parentesi graffa"], ["(", "apri parentesi"], [")", "chiudi parentesi"]]
  }],
  hu: [{
    block: "Common Commands",
    entries: [["<newline>", "új sor"], ["<newparagraph>", "új bekezdés"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "szomorú arc"], [":-)", "mosolygó arc"], [";-)", "kacsintó arc"]]
  }, {
    block: "Special Characters",
    entries: [["*", "csillag"], ["@", "kukac"], ["%", "százalékjel"], ["©", "copyright jel"], ["=", "egyenlőségjel"], [">", "„nagyobb mint” jel"], ["<", "„kisebb mint” jel"], ["-", "mínuszjel"], ["x", "szorzásjel"], ["+", "pluszjel"], [">", "csúcsos zárójel bezár"], ["<", "csúcsos zárójel"], ["$", "dollárjel"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "kettőspont"], ["—", "kötőjel"], ["…", "három pont"], ["!", "felkiáltójel"], ["–", "gondolatjel"], ["?", "kérdőjel"], [";", "pontosvessző"], ["&", "„és” jel"], ["\\", "fordított perjel"], [",", "vessző"], ["/", "perjel"], ["·", "középső pont"], ["°", "fokjel"], ["#", "kettőskereszt jel"], ["_", "aláhúzásjel"], ["|", "függőleges vonal"], [".", "pont"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["”", "idézőjel bezár"], ["’", "egyszeres idézőjel bezár"], ["‘", "egyszeres idézőjel"], ["“", "idézőjel"], ["[", "szögletes zárójel"], ["]", "szögletes zárójel bezár"], [")", "zárójel bezár"], ["}", "kapcsos zárójel bezár"], ["{", "kapcsos zárójel"], ["(", "zárójel"]]
  }],
  ja: [{
    block: "Common Commands",
    entries: [["<newline>", "新しい行", "新しい行"], ["<newparagraph>", "次の段落", "次の段落"], ["<insertspace>", "スペース挿入"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "しかめっ面"], [":-)", "スマイリー"], [";-)", "ウインク"]]
  }, {
    block: "Special Characters",
    entries: [["*", "アステリスク"], ["@", "アットマーク"], ["%", "パーセント記号"], ["©", "著作権記号"], ["=", "イコール"], [">", "大なり"], ["<", "小なり"], ["-", "引く"], ["x", "かける"], ["+", "たす"], ["<", "山かっこ開く"], [">", "山かっこ閉じる"], ["$", "ドル記号"]]
  }, {
    block: "Punctuation Marks",
    entries: [["。", "まる"], ["、", "くてん"], [",", "コンマ"], ["—", "ダッシュ"], ["…", "てんてんてん"], ["!", "感嘆符"], ["–", "ハイフン"], [".", "ピリオド／ドット"], ["?", "疑問符"], [";", "セミコロン"], ["&", "アンパサンド"], ["\\", "バックスラッシュ"], ["/", "スラッシュ"], ["·", "中黒 ・"], ["°", "度記号"], ["#", "シャープ"], ["_", "アンダースコア"], ["|", "パイプ"], [":", "コロン"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["”", "ダブルクオーテーション閉じる"], ["“", "ダブルクオーテーション"], ["’", "クオーテーション閉じる"], ["‘", "クオーテーション"], ["[", "大かっこ開く"], ["]", "大かっこ閉じる"], ["{", "中かっこ開く"], ["(", "かっこ開く"], ["}", "中かっこ閉じる"], [")", "かっこ閉じる"]]
  }],
  es: [{
    block: "Common Commands",
    entries: [["<newline>", "nueva línea", "nueva línea"], ["<newparagraph>", "nuevo párrafo", "nuevo párrafo"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "cara triste"], [":-)", "cara sonriente"], [";-)", "guiño"]]
  }, {
    block: "Special Characters",
    entries: [["*", "asterisco"], ["@", "arroba"], ["%", "signo de porcentaje"], ["©", "signo de copyright"], ["=", "signo igual"], [">", "signo mayor que"], ["<", "signo menor que"], ["-", "signo menos"], ["x", "signo de multiplicar"], ["+", "signo más"], ["<", "comilla angular de apertura"], [">", "comilla angular de cierre"], ["$", "signo del dólar"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "dos puntos"], ["…", "puntos suspensivos"], ["!", "signo de exclamación"], ["–", "raya"], ["?", "signo de interrogación"], [";", "punto y coma"], ["\\", "barra invertida"], [",", "coma"], ["/", "barra diagonal"], ["·", "punto central"], ["°", "signo de grado"], ["#", "almohadilla"], ["_", "guion bajo"], ["—", "guion"], ["|", "barra vertical"], [".", "punto"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["‘", "abrir comillas simples"], ["’", "cerrar comillas simples"], ["“", "abrir comillas"], ["”", "cerrar comillas"], ["[", "corchete de apertura"], ["]", "corchete de cierre"], ["(", "paréntesis de apertura"], [")", "paréntesis de cierre"], ["{", "llave de apertura"], ["}", "llave de cierre"]]
  }],
  fr: [{
    block: "Common Commands",
    entries: [["<newline>", "nouvelle ligne"], ["<newparagraph>", "nouveau paragraphe"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "visage triste"], [":-)", "sourire"], [";-)", "clin d’œil"]]
  }, {
    block: "Special Characters",
    entries: [["*", "astérisque"], ["@", "arobase"], ["%", "symbole de pourcentage"], ["©", "symbole du copyright"], ["=", "signe égal"], ["-", "signe moins"], ["x", "signe de multiplication"], ["+", "signe plus"], ["<", "crochet oblique ouvert"], [">", "crochet oblique fermé"], ["$", "symbole du dollar"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "deux point"], ["—", "tiret"], ["…", "points de suspension"], ["!", "point exclamation"], ["–", "trait union"], ["?", "point interrogation"], [";", "point virgule"], [",", "virgule"], ["&", "esperluette"], ["\\", "barre oblique inversée"], ["/", "barre oblique"], ["·", "point médian"], ["°", "symbole des degrés"], ["#", "hashtag"], ["_", "tiret bas"], ["|", "barre verticale"], [".", "point"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["“", "guillemets ouverts"], ["”", "guillemets fermés"], ["‘", "guillemet simple ouvrant"], ["’", "guillemet simple fermant"], ["[", "crochet ouvert"], ["]", "crochet fermé"], ["(", "parenthèse ouverte"], [")", "parenthèse fermée"], ["{", "accolade ouverte"], ["}", "accolade fermée"]]
  }],
  de: [{
    block: "Default Commands",
    entries: [["<newline>", "neue zeile"], ["<newparagraph>", "neuer absatz"], [":", "doppelpunkt"], [",", "komma"], ["—", "gedankenstrich"], ["…", "auslassungszeichen"], ["!", "ausrufezeichen"], ["–", "bindestrich"], [".", "punkt"], ["?", "fragezeichen"], ["“", "anführungszeichen unten"], ["”", "anführungszeichen oben"], ["‘", "einfaches anführungszeichen unten"], ["’", "einfaches anführungszeichen oben"], [";", "semikolon"], ["&", "und-zeichen"], ["*", "sternchen"], ["@", "at-zeichen"], ["\\", "backslash"], ["/", "schrägstrich"], ["^", "caret-zeichen"], ["·", "mittelpunkt"], ["•", "großer mittelpunkt"], ["°", "gradzeichen"], ["#", "hashtag"], ["%", "prozentzeichen"], ["_", "unterstrich"], ["|", "senkrechtstrich"], ["XD", "lachender smiley mit zugekniffenen augen"], [":-(", "trauriger smiley"], [":-)", "smiley"], [";-)", "zwinkernder smiley"], ["©", "copyright-zeichen"], ["®", "registered-zeichen"], ["™", "markensymbol"], ["=", "gleichheitszeichen"], [">", "größer-als-zeichen"], ["<", "kleiner-als-zeichen"], ["-", "minus-zeichen"], ["x", "multiplikationszeichen"], ["+", "plus-zeichen"], ["[", "eckige klammer auf"], ["]", "eckige klammer zu"], ["(", "klammer auf"], [")", "klammer zu"], ["{", "geschweifte klammer auf"], ["}", "geschweifte klammer zu"], ["<", "spitze klammer auf"], [">", "spitze klammer zu"], ["$", "dollarzeichen"], ["¢", "cent-zeichen"], ["£", "pfundsymbol"], ["€", "eurosymbol"], ["¥", "yensymbol"]]
  }],
  hi: [{
    block: "Default Commands",
    entries: [["<newline>", "नई पंक्ति"], ["<newparagraph>", "नया अनुच्छेद"], ["।", "पूर्ण विराम"], [":", "उपविराम"], [",", "अल्पविराम"], ["—", "निर्देशक चिन्ह"], ["!", "आश्चर्य सूचक चिन्ह"], ["!", "संबोधन वाचक"], ["–", "योजक चिन्ह"], ["?", "प्रश्न चिन्ह"], ["?", "प्रश्नवाचक चिन्ह"], [";", "अर्धविराम"], ["*", "संकेत चिन्ह"], ["^", "विस्मरण चिन्ह"], ["=", "तुल्यता सूचक चिन्ह"]]
  }],
  nl: [{
    block: "Default Commands",
    entries: [["<newline>", "nieuwe regel"], ["<newparagraph>", "nieuwe alinea"], [":", "dubbelepunt"], [",", "komma"], ["—", "streepje"], ["…", "drie puntjes"], ["!", "uitroepteken"], ["–", "koppelteken"], [".", "punt"], ["?", "vraagteken"], ["“", "open dubbel aanhalingsteken"], ["”", "sluit dubbel aanhalingsteken"], ["‘", "open enkel aanhalingsteken"], ["’", "sluit enkel aanhalingsteken"], [";", "puntkomma"], ["&", "ampersand"], ["*", "asterisk"], ["@", "apenstaart"], ["\\", "schuine streep naar links"], ["/", "schuine streep"], ["^", "caret"], ["·", "middenpunt"], ["•", "groot middenpunt"], ["°", "gradenteken"], ["#", "hashtag"], ["%", "procentteken"], ["_", "onderstrepingsteken"], ["|", "verticale balk"], ["XD", "lachend gezicht met gekruiste ogen"], [":-(", "frons gezicht"], [":-)", "lachend gezicht"], [";-)", "knipoog"], ["©", "copyrightteken"], ["®", "gedeponeerd"], ["™", "handelsmerk"], ["=", "gelijkteken"], [">", "groterdanteken"], ["<", "kleinerdanteken"], ["-", "minteken"], ["x", "vermenigvuldigingsteken"], ["+", "plusteken"], ["[", "open vierkant haakje"], ["]", "sluit vierkant haakje"], ["(", "open rond haakje"], [")", "sluit rond haakje"], ["{", "open accolade"], ["}", "sluit accolade"], ["<", "open punthaakje"], [">", "sluit punthaakje"], ["$", "dollarteken"], ["¢", "centteken"], ["£", "pondteken"], ["€", "euroteken"], ["¥", "yenteken"]]
  }],
  no: [{
    block: "Default Commands",
    entries: [["<newline>", "ny linje"], ["<newparagraph>", "nytt avsnitt"], [":", "kolon"], [",", "komma"], ["—", "tankestrek"], ["…", "ellipse"], ["!", "utropstegn"], ["–", "bindestrek"], [".", "punktum"], ["?", "spørsmålstegn"], ["“", "venstre anførselstegn"], ["”", "høyre anførselstegn"], ["‘", "venstre enkelt anførselstegn"], ["’", "høyre enkelt anførselstegn"], [";", "semikolon"], ["&", "et-tegn"], ["*", "asterisk eller stjerne"], ["@", "krøllalfa"], ["\\", "omvendt skråstrek"], ["/", "skråstrek"], ["^", "cirkumfleks"], ["·", "midtpunkt"], ["•", "stort midtpunkt"], ["°", "gradesymbol"], ["#", "nummertegn"], ["%", "prosenttegn"], ["_", "understrek"], ["|", "stolpe"], ["XD", "latterfjes"], [":-(", "bistert fjes"], [":-)", "smilefjes"], [";-)", "blunkefjes"], ["©", "opphavsrettsymbol"], ["®", "registrert varemerke-symbol"], ["™", "varemerkesymbol"], ["=", "likhetstegn"], [">", "større enn-tegn"], ["<", "mindre enn-tegn"], ["-", "minustegn"], ["x", "multipliseringstegn"], ["+", "plusstegn"], ["[", "venstre hakeparentes"], ["]", "høyre hakeparentes"], ["(", "venstreparentes"], [")", "høyreparentes"], ["{", "venstre klamme"], ["}", "høyre klamme"], ["<", "venstre vinkelparentes"], [">", "høyre vinkelparentes"], ["$", "dollartegn"], ["¢", "cent-symbol"], ["£", "engelsk pund-symbol"], ["€", "euro-symbol"], ["¥", "yen-symbol"]]
  }],
  fi: [{
    block: "Default Commands",
    entries: [["<newline>", "uusi rivi"], ["<newparagraph>", "uusi kappale"], [":", "kaksoispiste"], [",", "pilkku"], ["—", "viiva"], ["…", "kolme pistettä"], ["!", "huutomerkki"], ["–", "tavuviiva"], [".", "piste"], ["?", "kysymysmerkki"], ["“", "vasen lainausmerkki"], ["”", "oikea lainausmerkki"], ["‘", "vasen yksinkertainen lainausmerkki"], ["’", "oikea yksinkertainen lainausmerkki"], [";", "puolipiste"], ["&", "et-merkki"], ["*", "asteriski"], ["@", "ät-merkki"], ["\\", "kenoviiva"], ["/", "kauttaviiva"], ["^", "poisjääntimerkki"], ["·", "keskellä oleva piste"], ["•", "suuri keskellä oleva piste"], ["°", "astemerkki"], ["#", "hash-tunniste|punnan merkki"], ["%", "prosenttimerkki"], ["_", "alaviiva"], ["|", "pystyviiva"], ["XD", "silmät ristissä naurava naama"], [":-(", "surullinen ilme"], [":-)", "hymiö"], [";-)", "silmänisku"], ["©", "tekijänoikeusmerkki"], ["®", "rekisteröity-merkki"], ["™", "tavaramerkki"], ["=", "yhtä suuri kuin -merkki"], [">", "suurempi kuin -merkki"], ["<", "pienempi kuin -merkki"], ["-", "miinusmerkki"], ["x", "kertomerkki"], ["+", "plusmerkki"], ["[", "vasen kaarisulje"], ["]", "oikea kaarisulje"], ["(", "vasen sulje"], [")", "oikea sulje"], ["{", "vasen aaltosulje"], ["}", "oikea aaltosulje"], ["<", "vasen hakasulje"], [">", "oikea hakasulje"], ["$", "dollarimerkki"], ["¢", "sentin merkki"], ["£", "punnan merkki"], ["€", "euron merkki"]]
  }],
  da: [{
    block: "Default Commands",
    entries: [["<newline>", "ny linje"], ["<newparagraph>", "nyt afsnit"], [":", "kolon"], [",", "komma"], ["—", "tankestreg"], ["…", "ellipse"], ["!", "udråbstegn"], ["–", "bindestreg"], [".", "punktum"], ["?", "spørgsmålstegn"], ["“", "anførselstegn start"], ["”", "anførselstegn slut"], ["‘", "enkelt anførselstegn start"], ["’", "enkelt anførselstegn slut"], [";", "semikolon"], ["&", "og-tegn"], ["*", "asterisk"], ["@", "snabel-a"], ["\\", "omvendt skråstreg"], ["/", "skråstreg"], ["^", "cirkumfleks"], ["·", "punkttegn"], ["•", "stort punkttegn"], ["°", "gradtegn"], ["#", "hashtag"], ["%", "procenttegn"], ["_", "understreg"], ["|", "lodret streg"], [":-(", "sur smiley"], [":-)", "smiley"], [";-)", "blinkesmiley"], ["©", "ophavsretstegn"], ["®", "tegn for registreret varemærke"], ["™", "varemærketegn"], ["=", "lighedstegn"], [">", "større end"], ["<", "mindre end"], ["-", "minus"], ["x", "multiplikationstegn"], ["+", "plus"], ["[", "kanteparentes start"], ["]", "kanteparentes slut"], ["(", "parentes start"], [")", "parentes slut"], ["{", "tuborgklamme start"], ["}", "tuborgklamme slut"], ["<", "vinkelparentes start"], [">", "vinkelparentes slut"], ["$", "dollartegn"], ["¢", "centtegn"], ["£", "pundtegn"], ["€", "eurotegn"], ["¥", "yentegn"]]
  }],
  th: [{
    block: "Default Commands",
    entries: [["<newline>", "บรรทัดใหม่"], ["<newparagraph>", "ย่อหน้าใหม่"], [":", "ทวิภาค"], [",", "จุลภาค"], ["—", "ขีดกลาง"], ["…", "จุดไข่ปลา"], ["!", "อัศเจรีย์"], ["–", "ยัติภังค์"], [".", "มหัพภาพ จุด จุดทศนิยม|จุดฟุลสต๊อป"], ["?", "เครื่องหมายคำถาม"], ["“", "อัญประกาศ"], ["”", "อัญประกาศปิด"], ["‘", "อัญประกาศเดี่ยวเปิด"], ["’", "อัญประกาศเดี่ยวปิด"], [";", "อัฒภาค"], ["&", "เครื่องหมายและ"], ["*", "ดอกจัน"], ["@", "เครื่องหมายแอท"], ["\\", "เครื่องหมายทับหลัง"], ["/", "เครื่องหมายทับ"], ["^", "เครื่องหมายตก"], ["·", "เครื่องหมายจุดกลาง"], ["•", "เครื่องหมายจุดกลางใหญ่"], ["°", "เครื่องหมายองศา"], ["#", "เครื่องหมายแฮชแท็ก"], ["%", "เครื่องหมายเปอร์เซ็นต์"], ["_", "ขีดล่าง"], ["|", "ขีดตั้ง"], ["XD", "ใบหน้าหัวเราะตาเหล่"], [":-(", "ใบหน้าเศร้า"], [":-)", "ใบหน้ายิ้ม"], [";-)", "ใบหน้าขยิบตา"], ["©", "เครื่องหมายลิขสิทธิ์"], ["®", "เครื่องหมายลงทะเบียน"], ["™", "เครื่องหมายการค้า"], ["=", "เครื่องหมายเท่ากับ"], [">", "เครื่องหมายมากกว่า"], ["<", "เครื่องหมายน้อยกว่า"], ["-", "เครื่องหมายลบ"], ["x", "เครื่องหมายคูณ"], ["+", "เครื่องหมายบวก"], ["[", "วงเล็บใหญ่เปิด"], ["]", "วงเล็บใหญ่ปิด"], ["(", "วงเล็บเปิด"], [")", "วงเล็บปิด"], ["{", "วงเล็บปีกกาเปิด"], ["}", "วงเล็บปีกกาปิด"], ["<", "วงเล็บมุมเปิด"], [">", "วงเล็บมุมปิด"], ["$", "เครื่องหมายเงินดอลลาร์"], ["¢", "เครื่องหมายเงินเซนต์"], ["£", "เครื่องหมายเงินปอนด์"], ["€", "เครื่องหมายเงินยูโร"], ["¥", "เครื่องหมายเงินเยน"]]
  }],
  id: [{
    block: "Default Commands",
    entries: [["<newline>", "baris baru"], ["<newparagraph>", "paragraf baru"], [":", "titik dua"], [",", "koma"], ["—", "tanda pisah"], ["…", "elipsis"], ["!", "tanda seru"], ["–", "tanda hubung"], [".", "titik"], ["?", "tanda tanya"], ["“", "tanda kutip awal"], ["”", "tanda kutip akhir"], ["‘", "tanda kutip tunggal awal"], ["’", "tanda kutip tunggal akhir"], [";", "titik koma"], ["&", "simbol dan"], ["*", "bintang"], ["@", "tanda at"], ["\\", "garis miring terbalik"], ["/", "garis miring"], ["^", "tanda sisip"], ["·", "dot tengah"], ["•", "dot tengah besar"], ["°", "simbol derajat"], ["#", "hashtag"], ["%", "tanda persen"], ["_", "garis bawah"], ["|", "bar vertikal"], ["XD", "wajah tertawa"], [":-(", "wajah sedih"], [":-)", "wajah tersenyum"], [";-)", "wajah berkedip sebelah mata"], ["©", "lambang hak cipta"], ["®", "lambang terdaftar"], ["™", "lambang merek dagang"], ["=", "tanda sama dengan"], [">", "tanda lebih dari"], ["<", "tanda kurang dari"], ["-", "tanda minus"], ["x", "tanda kali"], ["+", "tanda plus"], ["[", "kurung siku buka"], ["]", "kurung siku tutup"], ["(", "kurung buka"], [")", "kurung tutup"], ["{", "kurung kurawal buka"], ["}", "kurung kurawal tutup"], ["<", "kurung sudut buka"], [">", "kurung sudut tutup"], ["$", "lambang dolar"], ["¢", "lambang sen"], ["£", "lambang poundsterling"], ["€", "lambang euro"], ["¥", "lambang yen"]]
  }],
  tr: [{
    block: "Default Commands",
    entries: [["<newline>", "yeni satır"], ["<newparagraph>", "yeni paragraf"], [":", "iki nokta üst üste"], [",", "virgül"], ["—", "tire"], ["…", "üç nokta"], ["!", "ünlem işareti"], ["–", "kısa çizgi"], [".", "nokta"], ["?", "soru işareti"], ["“", "tırnak aç"], ["”", "tırnak kapat"], ["‘", "tek tırnak aç"], ["’", "tek tırnak kapat"], [";", "noktalı virgül"], ["&", "ve işareti"], ["*", "yıldız işareti"], ["@", "at işareti"], ["\\", "ters eğik çizgi"], ["/", "öne eğik çizgi"], ["^", "inceltme işareti"], ["·", "orta nokta"], ["•", "büyük orta nokta"], ["°", "derece işareti"], ["#", "hashtag"], ["%", "yüzde işareti"], ["_", "altçizgi"], ["|", "düşey çubuk"], ["XD", "şaşı gözlü gülen yüz"], [":-(", "üzgün yüz"], [":-)", "gülen yüz"], [";-)", "göz kırpan yüz"], ["©", "copyright işareti"], ["®", "kayıtlı işareti"], ["™", "ticari marka işareti"], ["=", "eşittir işareti"], [">", "büyüktür işareti"], ["<", "küçüktür işareti"], ["-", "eksi işareti"], ["x", "çarpma işareti"], ["+", "artı işareti"], ["[", "köşeli ayraç aç"], ["]", "köşeli ayraç kapat"], ["(", "parantez aç"], [")", "parantez kapat"], ["{", "kaşlı ayraç aç"], ["}", "kaşlı ayraç kapat"], ["<", "açılı ayraç aç"], [">", "açılı ayraç kapat"], ["$", "dolar işareti"], ["¢", "sent işareti"], ["£", "sterlin işareti"], ["€", "euro işareti"], ["¥", "yen işareti"]]
  }],
  pl: [{
    block: "Default Commands",
    entries: [["<newline>", "nowy wiersz"], ["<newparagraph>", "nowy akapit"], [":", "dwukropek"], [",", "przecinek"], ["—", "myślnik"], ["…", "wielokropek"], ["!", "wykrzyknik"], ["–", "kreska"], [".", "kropka"], ["?", "znak zapytania"], ["“", "cudzysłów"], ["”", "zamknij cudzysłów"], ["‘", "otwórz cudzysłów pojedynczy"], ["’", "zamknij cudzysłów pojedynczy"], [";", "średnik"], ["&", "ampersand"], ["*", "gwiazdka"], ["@", "małpa"], ["\\", "ukośnik wsteczny"], ["/", "ukośnik"], ["^", "grot"], ["·", "kropka środkowa"], ["•", "duża kropka środkowa"], ["°", "znak stopni"], ["#", "krzyżyk"], ["%", "procent"], ["_", "podkreślenie"], ["|", "kreska pionowa"], ["XD", "śmiejąca się buźka"], [":-(", "smutna buźka"], [":-)", "uśmiechnięta buźka"], [";-)", "mrugająca buźka"], ["©", "znak praw autorskich"], ["®", "znak zarejestrowany"], ["™", "znak towarowy"], ["=", "znak równości"], [">", "znak większe niż"], ["<", "znak mniejsze niż"], ["-", "znak minus"], ["x", "znak mnożenia"], ["+", "znak plus"], ["[", "otwórz nawias kwadratowy"], ["]", "zamknij nawias kwadratowy"], ["(", "otwórz nawias"], [")", "zamknij nawias"], ["{", "otwórz klamrę"], ["}", "zamknij klamrę"], ["<", "otwórz nawias trójkątny"], [">", "zamknij nawias trójkątny"], ["$", "znak dolara"], ["¢", "znak centa"], ["£", "znak funta szterlinga"], ["€", "znak euro"], ["¥", "znak jena"]]
  }],
  ru: [{
    block: "Common Commands",
    entries: [["<newline>", "новая строка"], ["<newparagraph>", "новый абзац"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "хмурый смайлик"], [":-)", "улыбающийся смайлик"], [";-)", "подмигивающий смайлик"]]
  }, {
    block: "Special Characters",
    entries: [["*", "звездочка"], ["@", "знак коммерческого at"], ["%", "знак процента"], ["©", "знак авторского права"], ["=", "знак «равно»"], [">", "знак «больше»"], ["<", "знак «меньше»"], ["-", "знак «минус»"], ["x", "знак умножения"], ["+", "знак «плюс»"], ["<", "открывающая угловая скобка"], [">", "закрывающая угловая скобка"], ["$", "знак доллара"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "двоеточие"], [",", "запятая"], ["—", "тире"], ["…", "многоточие"], ["!", "восклицательный знак"], ["–", "дефис"], ["?", "вопросительный знак"], [";", "точка с запятой"], ["&", "амперсанд"], ["\\", "обратная косая черта"], ["/", "косая черта"], ["·", "центрированная точка"], [".", "конец предложения"], [".", "точка"], ["°", "знак градуса"], ["#", "знак фунта"], ["_", "нижнее подчеркивание"], ["|", "вертикальная черта"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["“", "открывающие кавычки"], ["”", "закрывающие кавычки"], ["‘", "открывающие одиночные кавычки"], ["’", "закрывающие одиночные кавычки"], ["[", "открывающая скобка"], ["]", "закрывающая скобка"], ["(", "открывающая круглая скобка"], [")", "закрывающая круглая скобка"], ["{", "открывающая фигурная скобка"], ["}", "закрывающая фигурная скобка"]]
  }],
  ar: [{
    block: "Common Commands",
    entries: [["<newline>", "سطر جديد"], ["<newparagraph>", "فقرة جديدة"]]
  }, {
    block: "Smileys",
    entries: [[":-(", "وجه مكشّر"], [":-)", "وجه مبتسم"], [";-)", "وجه يغمز"]]
  }, {
    block: "Special Characters",
    entries: [["*", "نجمة"], ["%", "علامة النسبة المئوية"], ["©", "علامة حقوق النشر"], ["=", "علامة يساوي"], [">", "علامة أكبر من"], ["<", "علامة أصغر من"], ["-", "علامة الطرح"], ["x", "علامة الضرب"], ["+", "علامة الجمع"], ["<", "فتح قوس مثلث"], [">", "غلق قوس مثلث"], ["$", "علامة الدولار"]]
  }, {
    block: "Punctuation Marks",
    entries: [[":", "نقطتان"], [",", "فاصلة"], ["…", "حذف"], ["!", "علامة تعجّب"], ["–", "واصلة"], [".", "علامة وقف"], ["?", "علامة استفهام"], [";", "فاصلة منقوطة"], ["&", "علامة العطف"], ["\\", "خط مائل للخلف"], ["/", "خط مائل للأمام"], ["·", "نقطة وسطى"], ["°", "علامة الدرجة"], ["#", "علامة الرطل"], ["_", "شرطة سفلية"], ["|", "شريط عمودي"], ["—", "شرطة"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["”", "نهاية الاقتباس"], ["‘", "بداية تنصيص مفرد"], ["’", "نهاية تنصيص مفرد"], ["[", "فتح قوس معقوف"], ["“", "اقتباس"], ["]", "غلق قوس معقوف"], ["(", "فتح قوس هلالي"], [")", "غلق قوس هلالي"], ["{", "فتح علامة حصر"], ["}", "غلق علامة حصر"]]
  }],
  cmn: [{
    block: "Default",
    entries: [["; ", "分号"], [": ", "冒号"], [") ", "右圆括号"], ["(", "左圆括号"], [". ", "句号"], ["! ", "感叹号"], ["? ", "问号"], ["——", "破折号"], [", ", "逗号"], ["、", "頓號"], ["<newline>", "换行"]]
  }],
  sv: [{
    block: "Vanliga Kommandon",
    entries: [["<newline>", "ny rad"], ["<newline>", "nytt stycke"]]
  }, {
    block: "Punktueringstecken",
    entries: [[".", "punkt"], ["·", "slut mening"], ["!", "utropstecken"], ["#", "brädgård"], ["…", "utelämningstecken"], [";", "semikolon"], ["/", "frammåt slash"], ["_", "understreck"], ["—", "bindestreck"], [",", "komma"], ["&", "och tecken"], ["°", "grad"], ["|", "vertikal streck"], [":", "kolon"], ["?", "frågetecken"], ["\\", "bakåt slash"], ["–", "talstreck"]]
  }, {
    block: "Paranteser",
    entries: [["‘", "öppen enkel citationstecken"], ["“", "öppen dubbel citationstecken"], ["{", "öppen måsvinge"], ["(", "öppen parantes"], ["[", "öppen hakparantes"], ["<", "öppen vinkelparantes"], ["’", "stängd enkel citationstecken"], ["”", "stängd dubbel citationstecken"], ["}", "stängd måsvinge"], [")", "stängd parantes"], ["]", "stängd hakparantes"], [">", "stängd vinkelparantes"]]
  }, {
    block: "Smileys",
    entries: [[";-)", "flörtigt ansikte"], [":-))", "mycket glatt ansikte"], [":-|", "neutralt ansikte"], [":-)", "glatt ansikte"], [":-(", "ledset ansikte"], [":-/", "irriterat ansikte"]]
  }, {
    block: "Specialtecken",
    entries: [["©", "lägg till copyright"], ["@", "lägg till at"], ["+", "lägg till plus tecken"], ["÷", "lägg till division"], ["*", "lägg till asterisk"], ["<", "lägg till mindre än"], ["%", "lägg till procent"], ["=", "lägg till likamed"], ["-", "lägg till minus"], ["x", "lägg till multiplikation"], [">", "lägg till större än"], ["$", "lägg till dollar tecken"], ["€", "lägg till euro tecken"]]
  }],
  bg: [{
    block: "Специални команди",
    entries: [["<newline>", "нов ред"], ["<newparagraph>", "нов параграф"], ["<paste>", "постави копираното"], ["<paste>", "постави копираното съдържание"], ["<capitalize>", "главна буква"], ["<capson>", "горен регистър"], ["<capsoff>", "долен регистър"], ["<deleteword>", "последна дума изтриване"], ["<insertspace>", "вмъкни интервал"]]
  }, {
    block: "Емотикони",
    entries: [["😉", "постави изражение с намигване"], ["😐", "постави неутрално изражение"], ["😊", "постави изражение с усмивка"], ["☹", "постави тъжно изражение"], [":-/", "постави сърдито изражение"]]
  }, {
    block: "Специални знаци",
    entries: [["©", "знак за авторски права"], ["©", "вмъкни знак за авторски права"], ["©", "млъкни знак за авторски права"], ["@", "вмъкни кльомба"], ["@", "вмъкни маймунско а"], ["@", "млъкни кльомба"], ["@", "млъкни маймунско а"], ["+", "вмъкни плюс"], ["+", "млъкни плюс"], ["÷", "вмъкни делено"], ["÷", "млъкни делено"], ["/", "вмъкни деление"], ["/", "млъкни деление"], ["*", "вмъкни звездичка"], ["*", "млъкни звездичка"], ["<", "вмъкни знак по-малко"], ["<", "вмъкни знак за по-малко"], ["<", "млъкни знак по-малко"], ["<", "млъкни знак за по-малко"], ["%", "вмъкни процент"], ["%", "млъкни процент"], ["=", "вмъкни равно"], ["=", "млъкни равно"], ["-", "вмъкни минус"], ["-", "млъкни минус"], ["×", "вмъкни знак за умножение"], ["×", "млъкни знак за умножение"], [">", "вмъкни знак по-голямо"], [">", "вмъкни знак за по-голямо"], [">", "млъкни знак по-голямо"], [">", "млъкни знак за по-голямо"], ["$", "вмъкни знак за долар"], ["$", "млъкни знак за долар"], ["€", "вмъкни знак за евро"], ["€", "млъкни знак за евро"]]
  }, {
    block: "Пунктуационни знаци",
    entries: [["·", "точка"], ["!", "удивителен знак"], ["#", "диез"], ["#", "диес"], ["…", "многоточие"], [";", "точка и запетая"], ["/", "наклонена черта"], ["”", "обратно наклонена черта"], ["_", "долна черта"], ["-", "късо тире"], ["-", "късо кире"], ["–", "тире"], ["–", "кире"], [",", "запетая"], ["&", "вмъкни логическо и"], ["&", "млъкни логическо и"], ["°", "вмъкни знак за градус"], ["°", "млъкни знак за градус"], ["|", "вертикална черта"], [":", "две точки"], [":", "двуеточие"], ["?", "въпросителен знак"], ["//", "двойна наклонена черта"], ["\\", "двойна обратно наклонена черта"]]
  }, {
    block: "Кавички и Скоби",
    entries: [["“", "отвори кавички"], ["‘", "отвори кавичка"], ["«", "отвори руски кавички"], ["{", "отвори голяма скоба"], ["(", "отвори скоба"], ["[", "отвори средна скоба"], ["<", "отвори остра скоба"], ["”", "затвори кавички"], ["”", "затвори кавичките"], ["»", "затвори руски кавички"], ["»", "затвори руските кавички"], ["}", "затвори голяма скоба"], ["}", "затвори голямата скоба"], [")", "затвори скоба"], [")", "затвори скобата"], ["]", "затвори средна скоба"], ["]", "затвори средната скоба"], [">", "затвори остра скоба"], [">", "затвори острата скоба"]]
  }, {
    block: "Примери за добавяне на пунктуация за TTS услуги",
    entries: [["схеми", "схемѝ"], ["сеерийност", "сѐрийност"], ["серийност", "сѐрийност"], ["множества", "мно́жества̀"]]
  }],
  fa: [{
    block: "Common Commands",
    entries: [["<newline>", "خط جدید"], ["<newline>", "سرخط"], ["<newline>", "خط بعد"], ["<newparagraph>", "پاراگراف بعد"], ["<paste>", "چسباندن"], ["<capson>", "کپس لاک روشن"], ["<capsoff>", "کپس لاک خاموش"], ["<deleteword>", "پاک کن"], ["<insertspace>", "فاصله"], ["<capitalize>", "حرف بزرگ"]]
  }, {
    block: "Smileys",
    entries: [[";-)", "ایموجی چشمک"], [":-|", "ایموجی متعجب"], [":-)", "ایموجی خندان"], [":-(", "ایموجی غمگین"], [":-/", "ایموجی دهن کجی"]]
  }, {
    block: "Special Characters",
    entries: [["©", "کپی رایت"], ["@", "ات ساین"], ["+", "علامت جمع"], ["÷", "علامت تقسیم"], ["*", "ستاره"], ["<", "علامت کوچکتر"], ["%", "درصد"], ["=", "علامت تساوی"], ["-", "علامت منها"], ["x", "علامت ضرب"], [">", "علامت بزرگتر"], ["$", "علامت دلار"], ["€,", "علامت یورو"]]
  }, {
    block: "Punctuation Marks",
    entries: [[".", "نقطه"], ["·", "نقطه وسط"], ["!", "علامت تعجب"], ["#", "هشتگ"], ["…", "سه نقطه"], [";", "نقطه ویرگول"], ["/", "ممیز"], ["_", "خط زیرین،آندرلاین"], ["—", "خط تیره"], [",", "ویرگول"], ["&", "علامت اند،امپرسند"], ["°", "درجه"], ["|", "پایپ"], [":", "دونقطه"], ["?", " علامت سوال"], ["\\", "بک اسلش"], ["-", "هایفن،خط پیوند"]]
  }],
  yue: [{
    block: "Common Commands",
    entries: [["<newline>", "新一行"], ["<newline>", "下一行"], ["<newparagraph>", "下一段"], ["<paste>", "貼上"], ["<undo>", "還原"], ["<undo>", "返轉頭"], ["<capson>", "轉大階"], ["<capsoff>", "轉細階"], ["<deleteword>", "delete上一隻字"], ["<insertspace>", "空白鍵"], ["<insertspace>", "插入空格"]]
  }, {
    block: "Smileys",
    entries: [[";-)", "單眼樣"], [":-|", "木口木面樣"], [":-)", "微笑樣"], [":-(", "唔開心樣"], [":-/", "嬲樣"]]
  }, {
    block: "Special Characters",
    entries: [["©", "插入copyright"], ["@", "插入at"], ["+", "插入加號"], ["÷", "插入除號"], ["*", "插入星號"], ["<", "插入細過"], ["%", "插入percent"], ["=", "插入等號"], ["-", "插入減號"], ["x", "插入成號"], [">", "插入大過"], ["$", "插入錢符號"], ["€,", "插入歐羅符號"]]
  }, {
    block: "Punctuation Marks",
    entries: [["。", "句號"], ["！", "感嘆號"], ["#", "hashtag"], ["…", "點點點"], ["；", "分號"], ["/", "forward slash"], ["_", "underscore"], ["，", "逗號"], ["&", "ampersand"], ["|", "vertical bar"], ["：", "冒號"], ["？", "問號"], ["\\", "backslash"], ["、", "頓號"], ["-", "hyphen"]]
  }, {
    block: "Quotes and Brackets",
    entries: [["“", "open quote"], ["‘", "open single quote"], ["“", "open double quote"], ["{", "開大括號"], ["（", "開括號"], ["「", "開引號"], ["[", "開中括號"], ["<", "open angle bracket"], ["”", "close quote"], ["’", "close single quote"], ["”", "close double quote"], ["}", "close brace"], ["）", "閂括號"], ["」", "閂引號"], ["]", "閂中括號"], [">", "close angle bracket"]]
  }]
};
if (true) {
  module.exports = defaultVoiceCommands;
}

/***/ })

/******/ });