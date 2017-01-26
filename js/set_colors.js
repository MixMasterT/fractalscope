const setColors = (max) => {
  const newColorsObj = {};
  let currentSum = 0;

  const colorsList = document.getElementById('colors-list');
  const colors = [].slice.call(colorsList.getElementsByTagName('li'));

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
}

export default setColors;
