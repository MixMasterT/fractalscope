const applyControls = (slideFactor, zoomFactor) => {

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

  const currentZoomDisplay = document.getElementById('magnification');

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
}
