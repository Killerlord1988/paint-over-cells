const field = document.querySelector('.field');
const range = document.querySelector('.range');
const rangeValue = document.querySelector('.range-value');
const buttonAddColor = document.querySelector('.button-add-color');
const changeColor = document.querySelector('.color');
const badge = document.querySelector('.badge');
const changeColorLayout = document.querySelector('.change-color__layout');
const colors = ['#ff0000', '#00ff00', '#ffff00'];
let badgeCount = 1;

console.log(changeColorLayout);

range.addEventListener('input', function () {
  rangeValue.innerHTML = range.value + ' на ' + range.value;
  addSquare(range.value)
})

buttonAddColor.addEventListener('click', function () {
  for (let i = 0; i < colors.length; i++) {
    if (changeColor.value == colors[i]) {
      return
    }
  }
  colors.push(changeColor.value)
  addColorLayout(colors)
  console.log(colors);
});

function setColor(el) {
  const color = getRandomColor();
  el.style.backgroundColor = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 30px ${color}`;
  badge.innerHTML = badgeCount++;
}

function removeColor(el) {
  el.style.backgroundColor = '#1d1d1d';
  el.style.boxShadow = `0 0 2px #1d1d1d, 0 0 30px #1d1d1d`
}

function addColorLayout(arr) {
  changeColorLayout.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const colorSquare = document.createElement('div');
    colorSquare.style.backgroundColor = arr[i];
    changeColorLayout.appendChild(colorSquare);
    colorSquare.addEventListener('click', function (el) {
      this.remove();
      const rgbColor = el.target.style.backgroundColor;
      function rgbToHex(col) {
        if (col.charAt(0) == 'r') {
          col = col.replace('rgb(', '').replace(')', '').split(',');
          var r = parseInt(col[0], 10).toString(16);
          var g = parseInt(col[1], 10).toString(16);
          var b = parseInt(col[2], 10).toString(16);
          r = r.length == 1 ? '0' + r : r;
          g = g.length == 1 ? '0' + g : g;
          b = b.length == 1 ? '0' + b : b;
          var colHex = '#' + r + g + b;
          return colHex;
        }
      }
      const hexColor = rgbToHex(rgbColor);
      for (let j = 0; j < arr.length; j++) {
        if (hexColor == arr[j]) {
          arr.splice(j,1)
        }
      }
    })
  }
}
addColorLayout(colors);

function addSquare(n) {
  field.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < n; j++) {
      const square = document.createElement('div');
      square.className = 'cell';
      row.appendChild(square);
      square.addEventListener('mouseover', () => setColor(square))
      square.addEventListener('mouseleave', () => removeColor(square))
    }
    field.append(row)
  }
}
addSquare(4);

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
