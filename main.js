import drawGrid from './js/draw_grid.js';

import expandMandlebrot from './js/expand_mandlebrot';

import drawMandlebrot from './js/draw_mandlebrot';

const STARTER_COLORS =  { 2: [0, 0, 0], 10: [255, 0, 0],
                                          100: [0, 0, 255],
                                          500: [255, 255, 255] };

document.addEventListener('DOMContentLoaded', () => {
  const fractalCanvas = document.getElementById('fractal');
  const gridCanvas = document.getElementById('grid');
  const dragCanvas = document.getElementById('drag');

  const gridCtx = gridCanvas.getContext("2d");
  // const fractalCtx = fractalCanvas.getContext("2d");

  console.log(gridCanvas.width);

  //set center
  let centerR = 0;
  let centerI = 0;

  //set complex center

  const center = {r: centerR, i: centerI};

  //Set initial scale
  let scale = 2;

  drawGrid(gridCtx, center, scale);
  drawMandlebrot(fractalCanvas, { center, scale }, STARTER_COLORS , 501);

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

  const updateCenterDisplay = () => {
    real.innerHTML = center.r.toFixed(3);
    imaginary.innerHTML = `${center.i.toFixed(3)}i`;
    currentZoomDisplay.innerHTML = `${(3 / scale).toFixed(3)} x`;
    drawGrid(gridCtx, center, scale);
    const viewPort = { scale, center };
    drawMandlebrot(fractalCanvas, viewPort, STARTER_COLORS , 501);
  };

  const slideFactor = (1 / 8);

  const slideLeft = () => {
    center.r -= (scale * slideFactor);
    updateCenterDisplay();
  };

  const slideRight = () => {
    center.r += (scale * slideFactor);
    updateCenterDisplay();
  };

  const slideUp = () => {
    center.i -= (scale * slideFactor);
    updateCenterDisplay();
  };

  const slideDown = () => {
    center.i += (scale * slideFactor);
    updateCenterDisplay();
  };

  const left = document.getElementById('slide-left');
  left.onclick = slideLeft;

  const right = document.getElementById('slide-right');
  right.onclick = slideRight;

  const up = document.getElementById('slide-up');
  up.onclick = slideUp;

  const down = document.getElementById('slide-down');
  down.onclick = slideDown;

  //zoom controls
  const zoomFactor = 3/2;

  const currentZoomDisplay = document.getElementById('zoom-factor');

  const zoomIn = () => {
    scale /= zoomFactor;
    updateCenterDisplay();
  };

  const zoomOut = () => {
    scale *= zoomFactor;
    updateCenterDisplay();
  };

  const resetZoom = () => {
    scale = 2;
    updateCenterDisplay();
  };
  //
  // const dial = $('.dial').knob({
  //   'change': () => { scale = this.value; }
  // });

  const zoom = document.getElementById('in');
  zoom.onclick = zoomIn;

  const zoomReset = document.getElementById('reset-zoom');
  zoomReset.onclick = resetZoom;

  const zoomBack = document.getElementById('out');
  zoomBack.onclick = zoomOut;



  // Key binding for slide acitions
  document.onkeydown= (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        slideLeft();
        break;
      case 40:
        slideUp();
        break;
      case 39:
        slideRight();
        break;
      case 38:
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
