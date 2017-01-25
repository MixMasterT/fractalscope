// const STARTER_COLORS =  { 2: [0, 0, 0], 10: [255, 0, 0],
//                                           100: [0, 0, 255],
//                                           250: [0, 255, 255],
//                                           500: [255, 255, 255] };

const setColors = () => {
  const newColorsObj = {};
  let currentSum = 0;

  const colorsList = document.getElementById('colors-list');
  const colors = colorsList.getElementsByTagName('li');
  colors.forEach((color) => {
    const incs = parseInt(color.innerHTML);

    console.log(incs);
    // currentSum += incs;
    //
    // const rgbStrings = color.style.backgroundColor.match(/[\d]{1,3}/g);
    // const rgbInts = [];
    // rgbStrings.forEach((str, idx) => { rgbInts[idx] = parseInt(str); });
    //
    // newColorsObj[currentSum] = rgbInts;
  })
}

export default setColors;
