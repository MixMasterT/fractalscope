const drawGrid = () => {

  const gridCanvas = document.getElementById('grid');

  const gridCtx = gridCanvas.getContext("2d");

  gridCtx.moveTo(0, 125);
  gridCtx.lineTo(500,125);

}

export default drawGrid;
