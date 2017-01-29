const setColors = (max) => {

  const colorsList = document.getElementById('colors-list');

  if (colorsList.childNodes.length > 1) {
    let colors = [].slice.call(colorsList.getElementsByTagName('li'));

    const newColorsObj = {};
    let currentSum = 0;

    while (currentSum < max) {
      colors.forEach((color) => {
        const incs = parseInt(color.innerHTML);

        currentSum += incs;

        const rgbStrings = color.style.backgroundColor.match(/[\d]{1,3}/g);
        const rgbInts = [];
        rgbStrings.forEach((str, idx) => { rgbInts[idx] = parseInt(str); });

        newColorsObj[currentSum] = rgbInts;
      })
    }
    return newColorsObj;

  } else {
    return {20:[0,0,0],40:[203,151,37],60:[0,0,0],80:[229,184,46],
      100:[255,255,255],120:[0,0,0],140:[203,151,37],160:[0,0,0],
      180:[229,184,46],200:[255,255,255],220:[0,0,0],240:[203,151,37],
      260:[0,0,0],280:[229,184,46],300:[255,255,255],320:[0,0,0],
      340:[203,151,37],360:[0,0,0],380:[229,184,46],400:[255,255,255],
      420:[0,0,0],440:[203,151,37],460:[0,0,0],480:[229,184,46],
      500:[255,255,255]};
  }
}

export default setColors;
