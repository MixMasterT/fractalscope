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

    const color = document.getElementById('color');
    // this is 'width' of color band in iterations, not a pixel value
    const width = document.getElementById('width');

    const rgb = color.style.backgroundColor.match(/[\d]{1,3}/g);

    const newLi = document.createElement('li');
    newLi.innerHTML = `${width.value} incs`;
    newLi.style.backgroundColor = color.style.backgroundColor;

    const deleteButton = document.createElement('DIV');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = (e) => {
      $(e.target).closest('li').remove();
    }

    newLi.appendChild(deleteButton);

    if(((rgb.reduce((a, b) => parseInt(a) + parseInt(b))) / 3) < 127) {
      newLi.style.color = 'white';
    }

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
