/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _draw_grid = __webpack_require__(1);
	
	var _draw_grid2 = _interopRequireDefault(_draw_grid);
	
	var _expand_mandlebrot = __webpack_require__(2);
	
	var _expand_mandlebrot2 = _interopRequireDefault(_expand_mandlebrot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var fractalCanvas = document.getElementById('fractal');
	  var gridCanvas = document.getElementById('grid');
	  var dragCanvas = document.getElementById('drag');
	
	  var gridCtx = gridCanvas.getContext("2d");
	  var dragCtx = dragCanvas.getContext("2d");
	  var fractalCtx = fractalCanvas.getContext("2d");
	
	  //set center
	  var centerR = 0;
	  var centerI = 0;
	
	  //set complex center
	
	  var center = { r: centerR, i: centerI };
	
	  //Set scale
	  var scale = 3;
	
	  fractalCtx.fillStyle = "#990";
	  fractalCtx.fillRect(0, 0, 500, 500);
	
	  (0, _draw_grid2.default)(gridCtx, center, scale);
	
	  //Button to Show  and hide Grid
	  var showGridButton = document.getElementById('grid-on-off');
	  showGridButton.onclick = function () {
	    if (showGridButton.innerHTML === 'hide grid') {
	      showGridButton.innerHTML = 'show grid';
	      gridCanvas.style.visibility = 'hidden';
	    } else {
	      showGridButton.innerHTML = 'hide grid';
	      (0, _draw_grid2.default)(gridCtx, center, scale);
	      gridCanvas.style.visibility = 'visible';
	    }
	  };
	
	  var real = document.getElementById('real');
	  var imaginary = document.getElementById('imaginary');
	
	  var updateCenterDisplay = function updateCenterDisplay() {
	    real.innerHTML = center.r.toFixed(3);
	    imaginary.innerHTML = center.i.toFixed(3) + 'i';
	    currentZoomDisplay.innerHTML = (3 / scale).toFixed(3) + ' x';
	    (0, _draw_grid2.default)(gridCtx, center, scale);
	  };
	
	  var slideFactor = 1 / 5;
	
	  var slideLeft = function slideLeft() {
	    center.r -= scale * slideFactor;
	    updateCenterDisplay();
	  };
	
	  var slideRight = function slideRight() {
	    center.r += scale * slideFactor;
	    updateCenterDisplay();
	  };
	
	  var slideUp = function slideUp() {
	    center.i -= scale * slideFactor;
	    updateCenterDisplay();
	  };
	
	  var slideDown = function slideDown() {
	    center.i += scale * slideFactor;
	    updateCenterDisplay();
	  };
	
	  var left = document.getElementById('slide-left');
	  left.onclick = slideLeft;
	
	  var right = document.getElementById('slide-right');
	  right.onclick = slideRight;
	
	  var up = document.getElementById('slide-up');
	  up.onclick = slideUp;
	
	  var down = document.getElementById('slide-down');
	  down.onclick = slideDown;
	
	  //zoom controls
	  var zoomFactor = 3 / 2;
	
	  var currentZoomDisplay = document.getElementById('zoom-factor');
	
	  var zoomIn = function zoomIn() {
	    scale /= zoomFactor;
	    updateCenterDisplay();
	  };
	
	  var zoomOut = function zoomOut() {
	    scale *= zoomFactor;
	    updateCenterDisplay();
	  };
	
	  var resetZoom = function resetZoom() {
	    scale = 3;
	    updateCenterDisplay();
	  };
	  //
	  // const dial = $('.dial').knob({
	  //   'change': () => { scale = this.value; }
	  // });
	
	  var zoom = document.getElementById('in');
	  zoom.onclick = zoomIn;
	
	  var zoomReset = document.getElementById('reset-zoom');
	  zoomReset.onclick = resetZoom;
	
	  var zoomBack = document.getElementById('out');
	  zoomBack.onclick = zoomOut;
	
	  // Key binding for slide acitions
	  document.onkeydown = function (e) {
	    e.preventDefault();
	    switch (e.keyCode) {
	      case 37:
	        slideLeft();
	        break;
	      case 38:
	        slideUp();
	        break;
	      case 39:
	        slideRight();
	        break;
	      case 40:
	        slideDown();
	        break;
	      case 90:
	        zoomIn();
	        break;
	      case 88:
	        zoomOut();
	        break;
	      case 82:
	        resetZoom();
	        break;
	    }
	  };
	
	  console.log((0, _expand_mandlebrot2.default)(-1.29, 0.133, 1000));
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var drawGrid = function drawGrid(ctx, center, scale) {
	  // start by clearing the grid and setting the stroke style
	  ctx.clearRect(0, 0, 500, 500);
	  ctx.strokeStyle = "#222";
	
	  //horizontal lines
	  ctx.moveTo(35, 125);
	  ctx.lineTo(500, 125);
	  ctx.stroke();
	
	  ctx.moveTo(35, 250);
	  ctx.lineTo(500, 250);
	  ctx.stroke();
	
	  ctx.moveTo(35, 375);
	  ctx.lineTo(500, 375);
	  ctx.stroke();
	
	  //vertical lines
	  ctx.moveTo(125, 20);
	  ctx.lineTo(125, 500);
	  ctx.stroke();
	
	  ctx.moveTo(250, 20);
	  ctx.lineTo(250, 500);
	  ctx.stroke();
	
	  ctx.moveTo(375, 20);
	  ctx.lineTo(375, 500);
	  ctx.stroke();
	
	  // Add number marking
	  ctx.font = "18px Scada Sans-serif";
	
	  //set numbers based on scale and center
	  var p = 2; // p for 'precision'
	
	  ctx.fillText((center.i + scale / 2).toFixed(p) + "i", 3, 125);
	  ctx.fillText(center.i.toFixed(p) + "i", 3, 250);
	  ctx.fillText((center.i - scale / 2).toFixed(p) + "i", 3, 375);
	  ctx.fillText("" + (center.r - scale / 2).toFixed(p), 110, 15);
	  ctx.fillText("" + center.r.toFixed(p), 235, 15);
	  ctx.fillText("" + (center.r + scale / 2).toFixed(p), 360, 15);
	};
	
	exports.default = drawGrid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var expandMandlebrot = function expandMandlebrot(real, imaginary, max) {
	  var incsCount = 0;
	  var r = real;
	  var i = imaginary;
	  var magnitude = Math.sqrt(real * real + imaginary * imaginary);
	  var newReal = 0;
	  while (magnitude < 4.0) {
	    ++incsCount;
	    if (incsCount > max) {
	      return -1;
	    }
	    newReal = r * r - i * i + real;
	    i = r * i * 2 + imaginary;
	    r = newReal;
	    magnitude = Math.sqrt(r * r + i * i);
	  }
	  return incsCount;
	};
	
	exports.default = expandMandlebrot;
	//
	//
	// function exapand_M(real,imaginary,MAX) {
	//   var count=0;
	//   var r = real, i = imaginary;
	//   var mag = Math.sqrt(r * r + i * i);
	//   var new_r = 0.0;
	//   while( mag < 4.0 ) {
	//     ++count;
	//     if(count > MAX) { return -1; }
	//     new_r = r * r - i * i + real;
	//     i = r * i * 2 + imaginary;
	//     r = new_r;
	//     mag = Math.sqrt(r * r + i * i);
	//   }
	//   return count;
	// }

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map