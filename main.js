import drawGrid from './js/draw_grid.js';

import expandMandlebrot from './js/expand_mandlebrot';

import drawMandlebrot from './js/draw_mandlebrot';

import setupColorPicker from './js/color_picker';

import setColors from './js/set_colors';

let DEFAULT_COLORS =  { 2: [0, 0, 0], 10: [255, 0, 0],
  100: [0, 0, 255],
  250: [0, 255, 255],
  500: [255, 255, 255] };

let MAX_ITERATIONS = 500;

const SLIDE_FACTOR = (1 / 8);

const ZOOM_FACTOR = (3 / 2);

document.addEventListener('DOMContentLoaded', () => {
  const fractalCanvas = document.getElementById('fractal');
  const gridCanvas = document.getElementById('grid');

  const gridCtx = gridCanvas.getContext("2d");

  //set center
  let centerR = 0;
  let centerI = 0;

  //set complex center
  const center = {r: centerR, i: centerI};

  //Set initial scale
  let scale = 2;

  drawGrid(gridCtx, center, scale);
  drawMandlebrot(fractalCanvas,
                  { center, scale },
                  DEFAULT_COLORS,
                  MAX_ITERATIONS);

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

  const real = document.getElementById('real');
  const imaginary = document.getElementById('imaginary');

  const updateDisplay = () => {
    real.innerHTML = center.r.toFixed(3);
    imaginary.innerHTML = `${center.i.toFixed(3)}i`;
    currentZoomDisplay.innerHTML = `${(2 / scale).toFixed(1)} x`;
    drawGrid(gridCtx, center, scale);
    const viewPort = { scale, center };

    drawMandlebrot(fractalCanvas,
                    viewPort,
                    (document.getElementById('colors-list')
                    .childNodes.length > 0 ?
                     setColors(MAX_ITERATIONS) :
                     DEFAULT_COLORS),
                     MAX_ITERATIONS);
  };

  const maxIterations = document.getElementById('max-iterations');
  maxIterations.onchange = (e) => {
    MAX_ITERATIONS = e.target.value;
  };

  const slideFactor = (1 / 8);

  const slideLeft = () => {
    center.r -= (scale * slideFactor);
    updateDisplay();
  };

  const slideRight = () => {
    center.r += (scale * slideFactor);
    updateDisplay();
  };

  const slideUp = () => {
    center.i -= (scale * slideFactor);
    updateDisplay();
  };

  const slideDown = () => {
    center.i += (scale * slideFactor);
    updateDisplay();
  };

  const recenter = () => {
    center.i = 0;
    center.r = 0;
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

  const recenterButton = document.getElementById('recenter');
  recenterButton.onclick = recenter;

  //zoom controls
  const zoomFactor = 3/2;

  const currentZoomDisplay = document.getElementById('magnification');

  const zoomIn = () => {
    scale /= zoomFactor;
    updateDisplay();
  };

  const zoomOut = () => {
    scale *= zoomFactor;
    updateDisplay();
  };

  const resetZoom = () => {
    scale = 2;
    updateDisplay();
  };

  // $('li').append("<input type='color' />");
  setupColorPicker();

  const zoom = document.getElementById('in');
  zoom.onclick = zoomIn;

  const zoomReset = document.getElementById('reset-zoom');
  zoomReset.onclick = resetZoom;

  const zoomBack = document.getElementById('out');
  zoomBack.onclick = zoomOut;

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
        resetZoom();
        break;
    }
  };

  const downloadButton = document.getElementById('download');
  downloadButton.addEventListener('click', function (e) {
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
