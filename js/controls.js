export const slideFactor = (1 / 5);

export const slideLeft = () => {
  center.r -= (scale * slideFactor);
  updateCenterDisplay();
};

export const slideRight = () => {
  center.r += (scale * slideFactor);
  updateCenterDisplay();
};

export const slideUp = () => {
  center.i -= (scale * slideFactor);
  updateCenterDisplay();
};

export const slideDown = () => {
  center.i += (scale * slideFactor);
  updateCenterDisplay();
};

export const left = document.getElementById('slide-left');
left.onclick = slideLeft;

export const right = document.getElementById('slide-right');
right.onclick = slideRight;

export const up = document.getElementById('slide-up');
up.onclick = slideUp;

export const down = document.getElementById('slide-down');
down.onclick = slideDown;

//zoom controls
export const zoomFactor = 3/2;

export const currentZoomDisplay = document.getElementById('magnification');

export const zoomIn = () => {
  scale /= zoomFactor;
  updateCenterDisplay();
};

export const zoomOut = () => {
  scale *= zoomFactor;
  updateCenterDisplay();
};

export const resetZoom = () => {
  scale = 3;
  updateCenterDisplay();
};
//
// export const dial = $('.dial').knob({
//   'change': () => { scale = this.value; }
// });

export const zoom = document.getElementById('in');
zoom.onclick = zoomIn;

const zoomReset = document.getElementById('reset-zoom');
zoomReset.onclick = resetZoom;

const zoomBack = document.getElementById('out');
zoomBack.onclick = zoomOut;
