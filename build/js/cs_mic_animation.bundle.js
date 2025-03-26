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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mic", function() { return mic; });
window.it = 0;
var audio = document.getElementById("audio");
var micStream;
function play() {
  var audio = document.getElementById("audio");
  audio.play();
}
async function mic(cbx) {
  console.log('mic clickedtwo');
  var micStream;
  if (!recording) {
    play();
    recording = true;
    // console.log('recording', recording)
    class AudioVisualizer {
      constructor(audioContext, processFrame, processError) {
        this.audioContext = audioContext;
        this.processFrame = processFrame;
        this.connectStream = this.connectStream.bind(this);
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        }).then(this.connectStream).catch(error => {
          if (processError) {
            processError(error);
          }
        });
      }
      connectStream(stream) {
        window.micStream = stream;
        this.analyser = this.audioContext.createAnalyser();
        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
        this.analyser.smoothingTimeConstant = 0.5;
        this.analyser.fftSize = 32;
        this.initRenderLoop(this.analyser);
      }
      initRenderLoop() {
        const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        const processFrame = this.processFrame || (() => {});
        const renderFrame = () => {
          this.analyser.getByteFrequencyData(frequencyData);
          processFrame(frequencyData);
          requestAnimationFrame(renderFrame);
        };
        requestAnimationFrame(renderFrame);
      }
    }
    const visualMainElement = cbx;
    const visualValueCount = 16;
    let visualElements;
    const createDOMElements = () => {
      let i;
      for (i = 0; i < visualValueCount; ++i) {
        const elm = document.createElement('div');
        visualMainElement.appendChild(elm);
      }
      visualElements = visualMainElement.querySelectorAll('div');
    };
    const init = () => {
      // Creating initial DOM elements
      const audioContext = new AudioContext();
      const initDOM = () => {
        visualMainElement.innerHTML = '';
        createDOMElements();
      };
      initDOM();
      const dataMap = {
        0: 15,
        1: 10,
        2: 8,
        3: 9,
        4: 6,
        5: 5,
        6: 2,
        7: 1,
        8: 0,
        9: 4,
        10: 3,
        11: 7,
        12: 11,
        13: 12,
        14: 13,
        15: 14
      };
      const processFrame = data => {
        const values = Object.values(data);
        let i;
        for (i = 0; i < visualValueCount; ++i) {
          const value = values[dataMap[i]] / 285;
          const elmStyles = visualElements[i].style;
          elmStyles.transform = `scaleY( ${value} )`;
          elmStyles.opacity = Math.max(0.9, value);
          elmStyles.display = i == 5 || i == 6 || i == 7 || i == 8 || i == 9 ? 'block' : 'none';
          // elmStyles.backgroundColor = i == 5 && 'red'
          // elmStyles.backgroundColor = i == 6 && 'green'
          // elmStyles.backgroundColor = i == 7 && 'blue'
          // elmStyles.backgroundColor = i == 8 && 'yellow'
        }
      };

      const processError = () => {
        visualMainElement.classList.add('error');
        visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo';
      };
      new AudioVisualizer(audioContext, processFrame, processError);
    };
    init();
  } else {
    recording = false;
    play();
    cbx.innerHTML = '<img src="voice.png" style="height: 80%; width: 100%; object-fit: contain; margin-top: 1.5px;">';
    const tracks = window.micStream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }
}

// console.log('recording', recording)
// class AudioVisualizer {
//   constructor(audioContext) {
//     this.audioContext = audioContext;
//     this.connectStream = this.connectStream.bind(this);
//     navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: false
//     }).
//       then(this.connectStream).
//       catch(error => {
//         console.log(error)
//       });
//   }

//   connectStream(stream) {
//     window.micStream = stream
//     this.analyser = this.audioContext.createAnalyser();
//     const source = this.audioContext.createMediaStreamSource(stream);
//     source.connect(this.analyser);
//     this.analyser.smoothingTimeConstant = 0.5;
//     this.analyser.fftSize = 32;

//     var source2 = this.audioContext.createMediaStreamSource(stream);
//     // Connect the source to the speakers
//     source2.connect(this.audioContext.destination);

//     this.initRenderLoop(this.analyser);
//   }

//   initRenderLoop() {
//     const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
//     let counter = 0;
//     const renderFrame = () => {
//       console.log('frd', this.analyser.getByteFrequencyData(frequencyData))
//       this.analyser.getByteFrequencyData(frequencyData);
//       if (++counter % 10 === 0) {
//         window.parent.postMessage({
//           type: 'frequencyData',
//           frequencyData
//         }, '*');
//       }
//       requestAnimationFrame(renderFrame);
//     };
//     requestAnimationFrame(renderFrame);
//   }

// }

/***/ })

/******/ });