import expandMandlebrot from './expand_mandlebrot';

const getMandleCache = (canvas, viewPort, max) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const mandleCache = [];
  const imgData = ctx.getImageData(0, 0, width, height);
  const centerR = viewPort.center.r;
  const centerI = viewPort.center.i;
  const scale = viewPort.scale;

  // loop over pixels on canvas, mapping each pixel to a Complex number
  // return an array of increments to escape for each pixel in the image
  // since the canvas if 500 * 500 pixels, this is array will have
  // 250 000 values.

  for (let j = 0; j < imgData.data.length; j += 4) {
    const x = (j / 4) % width;
    const y = ((j / 4) - x)/ width;

    const r = (centerR - scale) + (x / width) * 2 * scale;
    const i = (centerI + scale) - (y / width) * 2 * scale;

    const incsToEscape = expandMandlebrot(r, i, max);

    mandleCache.push(incsToEscape);
  }
  console.log(mandleCache.length);
  return mandleCache;
}


export default getMandleCache;
