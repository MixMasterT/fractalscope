import expandMandlebrot from './expand_mandlebrot';

const drawMandlebrot = (canvas, viewPort, colorsObj, max) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.getImageData(0, 0, width, height);
  const cutoffs = Object.keys(colorsObj);
  const centerR = viewPort.center.r;
  const centerI = viewPort.center.i;
  const scale = viewPort.scale;

  // loop over pixels on canvas, mapping each pixel to a Complex numbers
  // move by 4s because each pixel has 4 values for R, G, B and Alpha
  for(let j = 0; j < imgData.data.length; j += 4) {
    const x = (j / 4) % width;
    const y = ((j / 4) - x)/ width;

    const r = (centerR - scale) + (x / width) * 2 * scale;
    const i = (centerI + scale) - (y / width) * 2 * scale;

    const incsToEscape = expandMandlebrot(r, i, max);

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

// function draw_Mandlebrot() {
//    //first access the canvas, create a context, and image Object
//    var mCanvas = document.getElementById("mandlebrot");
//    var mCtx = mCanvas.getContext("2d");
//    var mImageData = mCtx.getImageData(0,0,mCanvas.width,mCanvas.height);
//    var width = mCanvas.width;
//    var MaxIncs = MAX_ITERATIONS;
//    var alpha = 255;
//    var colors = [[255,255,255],[0,0,0], [16,22,76],[27,44,153],[50,109,178], [76,172,191], [100,240,225],[156,255,244],[255,255,255]];
//    for (var i = 0; i <colors.length; i++) {
//      colors[i].push(alpha);
//    }
//    var cutoffs =[2, 5, 10, 20, 40, 80, 160, 320, MAX_ITERATIONS];
//    console.log(colors);
//
//    //then loop through the pixels in the imageObject, and color them based on their number of escape iterations
//    //call exapand_M() to calculate how many iterations to escape
//    for(var i = 0; i < mImageData.data.length; i += 4) {
//       //first, get pixel coords
//       var X = (i/4) % width;
//       var Y = ((i/4) - X)/width;
//
//       //then get complex coords
//       var R = (cenR - currentRange/2) + (X/width)*currentRange;
//       var I = (cenI + currentRange/2) - (Y/width)*currentRange;
//
//       //pass complex coords to exap and_M
//       var incsToEscape = exapand_M(R,I,MaxIncs);
//       //console.log("At Pixel (" + X + ", " + Y + ")" + " it took " + incsToEscape + " to escape.")
//
//       //based on the outcome, paint the pixel a color
//       //
//       //New plan here is to abstract out the RGBA from these calculations as well as the number of colors
//       //
//       //need to think of a way to let the user decide how many iterations, and what the color ranges
//
//       //will be. I think the easiest way to go is let the user select MAX_ITERATIONS and add a color
//
//       //picker for each of the ranges. This idea may need to be adjusted for better imaging.
//       //if (incsToEscape <= 1) {}
//       for (var j = 0; j < cutoffs.length; j++) {
//         if (incsToEscape < cutoffs[j]) {
//           mImageData.data[i] = colors[j][0];   //RED
//           mImageData.data[i+1] = colors[j][1]; //GREEN
//           mImageData.data[i+2] = colors[j][2]; //BlUE
//           mImageData.data[i+3] = colors[j][3]; //alpha
//           break;
//         }
//       }
//    }
//    mCtx.putImageData(mImageData,0,0);
// }
