import expandMandlebrot from './expand_mandlebrot';

const drawMandlebrot = (canvas, mandleCache, colorsObj, max) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.getImageData(0, 0, width, height);
  const cutoffs = Object.keys(colorsObj);
  // const centerR = viewPort.center.r;
  // const centerI = viewPort.center.i;
  // const scale = viewPort.scale;

  // loop over pixels on canvas, mapping each pixel to a Complex numbers
  // move by 4s because each pixel has 4 values for R, G, B and Alpha
  for(let j = 0; j < imgData.data.length; j += 4) {
    // const x = (j / 4) % width;
    // const y = ((j / 4) - x)/ width;
    //
    // const r = (centerR - scale) + (x / width) * 2 * scale;
    // const i = (centerI + scale) - (y / width) * 2 * scale;
    //
    // const incsToEscape = expandMandlebrot(r, i, max);
    const incsToEscape = mandleCache[Math.floor(j / 4)]

    for(let k = 0; k < cutoffs.length; k++) {
      if (incsToEscape < cutoffs[k]) {
        imgData.data[j] = colorsObj[cutoffs[k]][0]; //red channel
        imgData.data[j + 1] = colorsObj[cutoffs[k]][1]; //green channel
        imgData.data[j + 2] = colorsObj[cutoffs[k]][2]; //blue channel
        imgData.data[j + 3] = 255; //alpha channel
        break;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
};

export default drawMandlebrot;
