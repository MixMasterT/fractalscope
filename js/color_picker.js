import jscolor from './jscolor';

import setColors from './set_colors';

const setupColorPicker = () => {
  const colorPicker = document.querySelector('.color-picker');

  const addColorButton = document.createElement('BUTTON');
  addColorButton.innerHTML = 'add color';

  colorPicker.appendChild(addColorButton);

  const addColorForm = document.getElementById('add-color');
  addColorForm.style.visibility = 'hidden';

  const colorsList = document.getElementById('colors-list');

  addColorForm.onsubmit = (e) => {
    e.preventDefault();

    const hexToRgb = (hex) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : null;
    }

    const color = document.getElementById('color');

    // this is 'width' of color band in iterations, not a pixel value
    const width = document.getElementById('width');

    const rgb = hexToRgb(color.value);

    const newLi = document.createElement('li');
    newLi.innerHTML = `${width.value} incs`;
    newLi.style.backgroundColor = color.value;

    newLi.data = rgb;

    const deleteButton = document.createElement('DIV');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = (e) => {
      $(e.target).closest('li').remove();
    }

    let colorSum = 0;
    Object.keys(rgb).forEach((color) => { colorSum += rgb[color] })
    const darknessAvg = colorSum / 3;

    if(darknessAvg < 127) {
      newLi.style.color = 'white';
    }

    newLi.appendChild(deleteButton);

    //get first li in colorsList
    const firstLi = colorsList.childNodes[0];

    if(firstLi) {
      colorsList.insertBefore(newLi, firstLi);
    } else {
      colorsList.appendChild(newLi);
    }
  };

  const handleAddColorClick = () => {
    if (addColorButton.innerHTML === 'add color') {
      addColorForm.style.visibility = 'visible';
      addColorButton.innerHTML = 'hide';
    } else {
      addColorForm.style.visibility = 'hidden';
      addColorButton.innerHTML = 'add color';
    }
  }
  addColorButton.onclick = handleAddColorClick;
}

export default setupColorPicker;
