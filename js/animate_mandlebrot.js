import expandMandlebrot from './expand_mandlebrot';

import drawMandlebrot from './drawMandlebrot';

const animateMandlebrot = (rate, canvas, mandleCache, colorsObj, max) => {
  // MUST return setTimeOut id so that clearTimeOut can be called externally!

  const timeoutId = setInterval(() => {
    const colorKeys = Object.keys(colorsObj);
    const newColors = {};

    // keep old color for points inside the set
    newColors[colorKeys[0]] = currentColors[colorKeys[0]];

    //keep old color for fastest escaping points
    newColors[colorKeys[1]] = currentColors[colorKeys[1]];
    // console.log(newColors);

    for (let i = 2; i < colorKeys.length; i++) {
      newColors[colorKeys[i]] = currentColors[colorKeys[ 2 + ((i + 1) % (colorKeys.length - 2))]];
    }

    currentColors = newColors;
    updateDisplay();
  }, 50);
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.getImageData(0, 0, width, height);
  const cutoffs = Object.keys(colorsObj);

  // loop over pixels on canvas, mapping each pixel to a Complex numbers
  // move by 4s because each pixel has 4 values for R, G, B and Alpha
  for(let j = 0; j < imgData.data.length; j += 4) {
    const incsToEscape = mandleCache[Math.floor(j / 4)]

    for(let k = 0; k < cutoffs.length; k++) {
      if (incsToEscape < cutoffs[k]) {
        imgData.data[j] = colorsObj[cutoffs[k]][0];     //red channel
        imgData.data[j + 1] = colorsObj[cutoffs[k]][1]; //green channel
        imgData.data[j + 2] = colorsObj[cutoffs[k]][2]; //blue channel
        imgData.data[j + 3] = 255;                      //alpha channel
        break;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
};

export default animateMandlebrot;
