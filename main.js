import drawGrid from './js/draw_grid.js';

import expandMandlebrot from './js/expand_mandlebrot';

import drawMandlebrot from './js/draw_mandlebrot';

import setupColorPicker from './js/color_picker';

import setColors from './js/set_colors';

import getMandleCache from './js/get_mandle_cache';

let MAX_ITERATIONS = 500;

const SLIDE_FACTOR = (1 / 8);

const ZOOM_FACTOR = (3 / 2);

document.addEventListener('DOMContentLoaded', () => {
  const fractalCanvas = document.getElementById('fractal');
  const gridCanvas = document.getElementById('grid');
  const clickCanvas = document.getElementById('click');

  const fractalCtx = fractalCanvas.getContext("2d");
  const gridCtx = gridCanvas.getContext("2d");

  //set center
  let centerR = 0;
  let centerI = 0;

  //set complex center
  const center = {r: centerR, i: centerI};

  //Set initial scale
  let scale = 2;

  //Set global viewPort variable
  const viewPort = { center, scale }

  //Create contained access to adjustments to the viewPort

  let currentColors = setColors(MAX_ITERATIONS);

  let mandleCache = getMandleCache(fractalCanvas, viewPort, MAX_ITERATIONS);

  drawGrid(gridCtx, center, scale);
  drawMandlebrot(fractalCanvas,
                 mandleCache,
                 currentColors,
                 MAX_ITERATIONS);
  const adjustViewPort = (newR, newI, newScale) => {
    viewPort.center.r = newR,
    viewPort.center.i = newI,
    viewPort.scale = newScale

    // recalculate mandleBrot calc cache Array
    mandleCache = getMandleCache(fractalCanvas, viewPort, MAX_ITERATIONS);
  }

  //Button to Show  and hide Grid
  const showGridButton = document.getElementById('grid-on-off');
  showGridButton.onclick = () => {
    if(showGridButton.innerHTML === 'hide grid') {
      showGridButton.innerHTML = 'show grid';
      gridCanvas.style.visibility = 'hidden';
    } else {
      showGridButton.innerHTML = 'hide grid';
      drawGrid(gridCtx, center, scale);
      gridCanvas.style.visibility = 'visible';
    }
  };

  const colorsList = document.getElementById('colors-list');
  colorsList.addEventListener('DOMSubtreeModified', (e) => {
    currentColors = setColors(MAX_ITERATIONS);
  });

  const real = document.getElementById('real');
  const imaginary = document.getElementById('imaginary');

  const updateDisplay = () => {
    real.innerHTML = viewPort.center.r.toFixed(3);
    imaginary.innerHTML = `${viewPort.center.i.toFixed(3)}i`;
    currentZoomDisplay.innerHTML = `${(2 / viewPort.scale).toFixed(1)} x`;
    drawGrid(gridCtx, viewPort.center, viewPort.scale);
    drawMandlebrot(fractalCanvas,
                   mandleCache,
                   currentColors,
                   MAX_ITERATIONS);
  };

  const maxIterations = document.getElementById('max-iterations');
  maxIterations.onchange = (e) => {
    MAX_ITERATIONS = e.target.value;
  };

  const currentZoomDisplay = document.getElementById('magnification');

  const zoomIn = () => {
    adjustViewPort( viewPort.center.r,
                    viewPort.center.i,
                    viewPort.scale /= ZOOM_FACTOR)
    updateDisplay();
  };

  const zoomOut = () => {
    adjustViewPort( viewPort.center.r,
                    viewPort.center.i,
                    viewPort.scale *= ZOOM_FACTOR)
    updateDisplay();
  };

  const slideLeft = () => {
    adjustViewPort( viewPort.center.r -= SLIDE_FACTOR * viewPort.scale,
                    viewPort.center.i,
                    viewPort.scale )
    updateDisplay();
  };

  const slideRight = () => {
    adjustViewPort( viewPort.center.r += SLIDE_FACTOR * viewPort.scale,
                    viewPort.center.i,
                    viewPort.scale )
    updateDisplay();
  };

  const slideUp = () => {
    adjustViewPort( viewPort.center.r,
                    viewPort.center.i -= SLIDE_FACTOR * viewPort.scale,
                    viewPort.scale )
    updateDisplay();
  };

  const slideDown = () => {
    adjustViewPort( viewPort.center.r,
                    viewPort.center.i += SLIDE_FACTOR * viewPort.scale,
                    viewPort.scale )
    updateDisplay();
  };

  const left = document.getElementById('slide-left');
  left.onclick = slideLeft;

  const right = document.getElementById('slide-right');
  right.onclick = slideRight;

  const up = document.getElementById('slide-up');
  up.onclick = slideUp;

  const down = document.getElementById('slide-down');
  down.onclick = slideDown;

  const resetCenter = () => {
    adjustViewPort( 0, 0, 2);
    updateDisplay();
  }

  const recenterButton = document.getElementById('recenter');
  recenterButton.onclick = resetCenter;

  setupColorPicker();

  const zoom = document.getElementById('in');
  zoom.onclick = zoomIn;

  const zoomBack = document.getElementById('out');
  zoomBack.onclick = zoomOut;

  // Add listeners to #click canvas
  //
  // let isDown = false;
  // let dragStartX;
  // let dragStartY;
  // let mouseX;
  // let mouseY;
  //
  // clickCanvas.onmousedown = (e) => {
  //   e.stopPropagation();
  //   const rect = clickCanvas.getBoundingClientRect();
  //   dragStartX = Math.floor(e.clientX - rect.left);
  //   dragStartY = Math.floor(e.clientY - rect.top);
  //   isDown = true;
  //
  //   mouseX = dragStartX;
  //   mouseY = dragStartY;
  // }
  //
  // clickCanvas.onmousemove = (e) => {
  //   if (!isDown) {
  //     return;
  //   }
  //   const rect = clickCanvas.getBoundingClientRect();
  //   mouseX = Math.floor(e.clientX - rect.left);
  //   mouseY = Math.floor(e.clientY - rect.top);
  //
  //   center.r = center.r + ((dragStartX - mouseX) / 500) * scale;
  //   center.i = center.i + ((mouseY - dragStartY) / 500) * scale;
  //
  //   updateDisplay();
  // }
  //
  // const handleRelease = (e) => {
  //   const rect = clickCanvas.getBoundingClientRect();
  //   const finishX = Math.floor(e.clientX - rect.left);
  //   const finishY = Math.floor(e.clientY - rect.top);
  //
  //   center.r = center.r + ((dragStartX - finishX) / 500) * scale;
  //   center.i = center.i + ((finishY - dragStartY) / 500) * scale;
  //
  //   updateDisplay();
  //
  //   isDown = false;
  // }
  //
  // clickCanvas.onmouseup = handleRelease;
  // clickCanvas.onmouseout = handleRelease;

  clickCanvas.ondblclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = clickCanvas.getBoundingClientRect();
    const clickX = Math.floor(e.clientX - rect.left);
    const clickY = Math.floor(e.clientY - rect.top);

    viewPort.center.r = (viewPort.center.r - viewPort.scale) +
                          (clickX / 500) * 2 * viewPort.scale;
    viewPort.center.i = (viewPort.center.i + viewPort.scale) -
                          (clickY / 500) * 2 * viewPort.scale;
    zoomIn();
  }

  // Key binding for slide and zoom actions
  document.onkeydown= (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 39:
        slideLeft();
        break;
      case 38:
        slideUp();
        break;
      case 37:
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
        resetCenter();
        break;
    }
    updateDisplay();
  };

  const rotateColorsButton = document.getElementById('rotate-colors');

  let rotationInterval;

  rotateColorsButton.onclick = (e) => {
    if (rotateColorsButton.innerHTML === 'Rotate Colors') {
      rotateColorsButton.innerHTML = 'Stop Rotation';
      rotationInterval = setInterval(() => {
        const colorKeys = Object.keys(currentColors);
        const newColors = {};

        // keep old color for points inside the set
        newColors[colorKeys[0]] = currentColors[colorKeys[0]];

        //keep old color for fastest escaping points
        newColors[colorKeys[1]] = currentColors[colorKeys[1]];
        // console.log(newColors);

        for (let i = 2; i < colorKeys.length; i++) {
          // let newKey = colorKeys[i] - 1;
          // if (newKey < 3) {
          //   newKey += MAX_ITERATIONS;
          // }
          newColors[colorKeys[i]] = currentColors[colorKeys[ 2 + ((i + 1) % (colorKeys.length - 2))]];
        }


        currentColors = newColors;
        console.log(currentColors);
        updateDisplay();
      }, 50);
    } else {
      rotateColorsButton.innerHTML = 'Rotate Colors';
      clearInterval(rotationInterval);
    }
  }

  const downloadButton = document.getElementById('download');
  downloadButton.addEventListener('click', (e) => {
    var dataURL = fractalCanvas.toDataURL('image/png');
    downloadButton.href = dataURL;
  });

  const infoModal = document.getElementById('info');

  const openModalButton = document.getElementById("info-modal");

  // Get the element that closes the modal
  const closeButton = document.getElementById("close");

  // When the user clicks on the button, open the modal
  openModalButton.onclick = function() {
      infoModal.style.display = "block";
  }

  // close the infoModal
  closeButton.onclick = function() {
      infoModal.style.display = "none";
  }

  // When the user clicks outside of the infoModal, close it
  window.onclick = function(event) {
      if (event.target == infoModal) {
          infoModal.style.display = "none";
      }
  }
});
