const setColors = (maxIterations) => {

  const _defaultColors = [
    [1, [0,0,0]],  [1, [203, 151, 37]], [ 1, [0,0,0]],
    [1, [229,184,46]], [1, [255, 255, 255]]
  ]

  const colorsList = document.getElementById('colors-list');

  let colors = [];

  if (colorsList.childNodes.length > 1) {

    const liData = [].slice.call(colorsList.getElementsByTagName('li'));
    liData.forEach((liObj) => {

      colors.push( [parseInt(liObj.innerHTML), liObj.data] )
    })

  } else {
    colors = _defaultColors;
  }

    const newColorsObj = {};
    let currentSum = 0;

    while (currentSum < maxIterations) {
      colors.forEach((colorsArr) => {
        currentSum += colorsArr[0];

        newColorsObj[currentSum] = colorsArr[1];
      })
    }
    return newColorsObj;
  }

export default setColors;
