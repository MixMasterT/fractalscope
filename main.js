// import drawGrid from './js/drawGrid.js';
const drawGrid = (ctx, center, scale) => {
  //
  // const gridCanvas = document.getElementById('grid');
  //
  // const gridCtx = gridCanvas.getContext("2d");

  ctx.strokeStyle = "#222"

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
  ctx.font = "18px Scada Sans-serif"

  //set numbers based on scale and center
  const p = 2; // p for 'precision'

  ctx.fillText(`${(center.y + scale/2).toFixed(p)}i`, 3, 125 );
  ctx.fillText(`${(center.y).toFixed(p)}i`, 3, 250 );
  ctx.fillText(`${(center.y - scale/2).toFixed(p)}i`, 3, 375 );
  ctx.fillText(`${(center.x - scale/2).toFixed(p)}`, 110, 15 );
  ctx.fillText(`${(center.x).toFixed(p)}`, 235, 15 );
  ctx.fillText(`${(center.x + scale/2).toFixed(p)}`, 360, 15 );

}


// above code should be relocated to external files
document.addEventListener('DOMContentLoaded', () => {
  const fractalCanvas = document.getElementById('fractal');
  const gridCanvas = document.getElementById('grid');
  const dragCanvas = document.getElementById('drag');

  const gridCtx = gridCanvas.getContext("2d");
  const dragCtx = dragCanvas.getContext("2d");
  const fractalCtx = fractalCanvas.getContext("2d");

  //set center
  let centerX = 0;
  let centerY = 0;

  const center = {x: centerX, y: centerY};

  //Set scale
  let scale = 3;

  fractalCtx.fillStyle = "#990";
  fractalCtx.fillRect(0, 0, 500, 500);

  drawGrid(gridCtx, center, scale);

});
