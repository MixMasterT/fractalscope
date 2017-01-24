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
	
	var _draw_mandlebrot = __webpack_require__(3);
	
	var _draw_mandlebrot2 = _interopRequireDefault(_draw_mandlebrot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STARTER_COLORS = { 2: [0, 0, 0], 10: [255, 0, 0],
	  100: [0, 0, 255],
	  500: [255, 255, 255] };
	
	document.addEventListener('DOMContentLoaded', function () {
	  var fractalCanvas = document.getElementById('fractal');
	  var gridCanvas = document.getElementById('grid');
	  var dragCanvas = document.getElementById('drag');
	
	  var gridCtx = gridCanvas.getContext("2d");
	  var dragCtx = dragCanvas.getContext("2d");
	  // const fractalCtx = fractalCanvas.getContext("2d");
	
	  console.log(gridCanvas.width);
	
	  //set center
	  var centerR = 0;
	  var centerI = 0;
	
	  //set complex center
	
	  var center = { r: centerR, i: centerI };
	
	  //Set initial scale
	  var scale = 2;
	
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
	    var viewPort = { scale: scale, center: center };
	    (0, _draw_mandlebrot2.default)(fractalCanvas, viewPort, STARTER_COLORS, 501);
	  };
	
	  var slideFactor = 1 / 8;
	
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
	    scale = 2;
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _expand_mandlebrot = __webpack_require__(2);
	
	var _expand_mandlebrot2 = _interopRequireDefault(_expand_mandlebrot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var drawMandlebrot = function drawMandlebrot(canvas, viewPort, colorsObj, max) {
	  var ctx = canvas.getContext('2d');
	  var width = canvas.width;
	  var height = canvas.height;
	  var imgData = ctx.getImageData(0, 0, width, height);
	  var cutoffs = Object.keys(colorsObj);
	  var centerR = viewPort.center.r;
	  var centerI = viewPort.center.i;
	  var scale = viewPort.scale;
	  console.log('current scale is ' + scale);
	
	  // loop over pixels on canvas, mapping each pixel to a Complex numbers
	  // move by 4s because each pixel has 4 values for R, G, B and Alpha
	  for (var j = 0; j < imgData.data.length; j += 4) {
	    var x = j / 4 % width;
	    var y = (j / 4 - x) / width;
	
	    var r = centerR - scale + x / width * 2 * scale;
	    var i = centerI + scale - y / width * 2 * scale;
	
	    var incsToEscape = (0, _expand_mandlebrot2.default)(r, i, max);
	
	    for (var k = 0; k < cutoffs.length; k++) {
	      if (incsToEscape < cutoffs[k]) {
	        imgData.data[j] = colorsObj[cutoffs[k]][0]; //red channel
	        imgData.data[j + 1] = colorsObj[cutoffs[k]][1]; //green channel
	        imgData.data[j + 2] = colorsObj[cutoffs[k]][2]; //blue channel
	        imgData.data[j + 3] = 255; //alpha channel
	        break;
	      }
	    }
	  }
	  ctx.putImageData(imgData, 0, 0);
	};
	
	exports.default = drawMandlebrot;
	
	// function draw_Mandlebrot() {
	//    //first access the canvas, create a context, and image Object
	//    var mCanvas = document.getElementById("mandlebrot");
	//    var mCtx = mCanvas.getContext("2d");
	//    var mImageData = mCtx.getImageData(0,0,mCanvas.width,mCanvas.height);
	//    var width = mCanvas.width;
	//    var MaxIncs = MAX_ITERATIONS;
	//    var alpha = 255;
	//    var colors = [[255,255,255],[0,0,0], [16,22,76],[27,44,153],[50,109,178], [76,172,191], [100,240,225],[156,255,244],[255,255,255]];
	//    for (var i = 0; i <colors.length; i++) {
	//      colors[i].push(alpha);
	//    }
	//    var cutoffs =[2, 5, 10, 20, 40, 80, 160, 320, MAX_ITERATIONS];
	//    console.log(colors);
	//
	//    //then loop through the pixels in the imageObject, and color them based on their number of escape iterations
	//    //call exapand_M() to calculate how many iterations to escape
	//    for(var i = 0; i < mImageData.data.length; i += 4) {
	//       //first, get pixel coords
	//       var X = (i/4) % width;
	//       var Y = ((i/4) - X)/width;
	//
	//       //then get complex coords
	//       var R = (cenR - currentRange/2) + (X/width)*currentRange;
	//       var I = (cenI + currentRange/2) - (Y/width)*currentRange;
	//
	//       //pass complex coords to exap and_M
	//       var incsToEscape = exapand_M(R,I,MaxIncs);
	//       //console.log("At Pixel (" + X + ", " + Y + ")" + " it took " + incsToEscape + " to escape.")
	//
	//       //based on the outcome, paint the pixel a color
	//       //
	//       //New plan here is to abstract out the RGBA from these calculations as well as the number of colors
	//       //
	//       //need to think of a way to let the user decide how many iterations, and what the color ranges
	//
	//       //will be. I think the easiest way to go is let the user select MAX_ITERATIONS and add a color
	//
	//       //picker for each of the ranges. This idea may need to be adjusted for better imaging.
	//       //if (incsToEscape <= 1) {}
	//       for (var j = 0; j < cutoffs.length; j++) {
	//         if (incsToEscape < cutoffs[j]) {
	//           mImageData.data[i] = colors[j][0];   //RED
	//           mImageData.data[i+1] = colors[j][1]; //GREEN
	//           mImageData.data[i+2] = colors[j][2]; //BlUE
	//           mImageData.data[i+3] = colors[j][3]; //alpha
	//           break;
	//         }
	//       }
	//    }
	//    mCtx.putImageData(mImageData,0,0);
	// }

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map