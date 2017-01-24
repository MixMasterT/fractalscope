// move this and import drawGrid from './js/drawGrid.js'; TODO
const drawGrid = (ctx, center, scale) => {
  // start by clearing the grid and setting the stroke style
  ctx.clearRect(0,0,500,500);
  ctx.strokeStyle = "#222";

  //horizontal lines
  ctx.moveTo(35, 125);
  ctx.lineTo(500,125);
  ctx.stroke();

  ctx.moveTo(35, 250);
  ctx.lineTo(500,250);
  ctx.stroke();

  ctx.moveTo(35, 375);
  ctx.lineTo(500,375);
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
  const p = 2; // p for 'precision'

  ctx.fillText(`${(center.i + scale/2).toFixed(p)}i`, 3, 125 );
  ctx.fillText(`${(center.i).toFixed(p)}i`, 3, 250 );
  ctx.fillText(`${(center.i - scale/2).toFixed(p)}i`, 3, 375 );
  ctx.fillText(`${(center.r - scale/2).toFixed(p)}`, 110, 15 );
  ctx.fillText(`${(center.r).toFixed(p)}`, 235, 15 );
  ctx.fillText(`${(center.r + scale/2).toFixed(p)}`, 360, 15 );

};

// above code should be relocated to external files
document.addEventListener('DOMContentLoaded', () => {
  const fractalCanvas = document.getElementById('fractal');
  const gridCanvas = document.getElementById('grid');
  const dragCanvas = document.getElementById('drag');

  const gridCtx = gridCanvas.getContext("2d");
  const dragCtx = dragCanvas.getContext("2d");
  const fractalCtx = fractalCanvas.getContext("2d");

  //set center
  let centerR = 0;
  let centerI = 0;

  //set complex center


  const center = {r: centerR, i: centerI};

  //Set scale
  let scale = 3;

  fractalCtx.fillStyle = "#990";
  fractalCtx.fillRect(0, 0, 500, 500);

  drawGrid(gridCtx, center, scale);

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
    imaginary.innerHTML = center.i.toFixed(3);
    drawGrid(gridCtx, center, scale);
  };

  const slideFactor = (1 / 5);

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

  const zoomIn = () => {
    scale /= zoomFactor;
    updateCenterDisplay();
  };

  const zoomOut = () => {
    scale *= zoomFactor;
    updateCenterDisplay();
  };

  const resetZoom = () => {
    scale = 3;
    updateCenterDisplay();
  };

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
