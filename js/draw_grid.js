const drawGrid = (ctx, center, scale) => {
  // start by clearing the grid and setting the stroke style
  ctx.clearRect(0,0,500,500);
  ctx.strokeStyle = "#888";

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
  ctx.fillStyle = '#888';

  //set numbers based on scale and center
  const p = 2; // p for 'precision'

  ctx.fillText(`${(center.i + scale/2).toFixed(p)}i`, 3, 125 );
  ctx.fillText(`${(center.i).toFixed(p)}i`, 3, 250 );
  ctx.fillText(`${(center.i - scale/2).toFixed(p)}i`, 3, 375 );
  ctx.fillText(`${(center.r - scale/2).toFixed(p)}`, 110, 15 );
  ctx.fillText(`${(center.r).toFixed(p)}`, 235, 15 );
  ctx.fillText(`${(center.r + scale/2).toFixed(p)}`, 360, 15 );

};

export default drawGrid;
