class Palette {
  constructor(name, colors = []) {
    this.name = name;
    this.colors = colors;
  }
}

class Palettes {
  constructor(savedPalettes = []) {
    this.savedPalettes = savedPalettes;
    this.workingPalette;
  }

  saveWorkingPalette(name) {
    this.savedPalettes.push(new Palette(name, [...this.workingPalette]));
    savePalettesToLocal();
  }

  //https://www.tutorialspoint.com/javascript-to-generate-random-hex-codes-of-color
  static get randomHex() {
    const hexCode = "0123456789ABCDEF";
    let hex = '#';
    for (let i = 0; i < 6; i++)
      hex += hexCode[Math.floor(Math.random() * 16)];

    return hex;
  }
}

let userPalettes;
loadFromLocal();

userPalettes.workingPalette ? loadPalette(userPalettes.workingPalette) : generatePalette();

function loadFromLocal() {
  userPalettes = Object.assign(new Palettes(), JSON.parse(localStorage.getItem('userPalettes')));
  if (!userPalettes) {
    userPalettes = new Palettes();
    savePalettesToLocal();
  }
}

function savePalettesToLocal() {
  const userPalettesSerialized = JSON.stringify(userPalettes);
  localStorage.setItem('userPalettes', userPalettesSerialized);
}

function generatePalette(e) {
  const palette = [];

  const colorDivs = Array.from(document.querySelector(".colors")
    .children);

  colorDivs.forEach(color => {
    const doNotChangeColor = color.querySelector('input');
    if (doNotChangeColor.checked)
      return palette.push(color.style.backgroundColor);
    const randomHex = Palettes.randomHex;
    color.style.backgroundColor = randomHex;
    color.querySelector('div')
      .innerText = randomHex;
    palette.push(randomHex);
  });
  userPalettes.workingPalette = palette;
}

function loadPalette(colors) {
  const colorDivs = Array.from(document.querySelector(".colors")
    .children);
  colorDivs.forEach((div, index) => {
    div.style.backgroundColor = colors[index];
    div.querySelector('div')
      .innerText = colors[index];
  });
  this.workingPalette = colors;
}

const savedPalettesPopUp = document.querySelector('#saved-palettes-popup');
savedPalettesPopUp.parentNode.addEventListener('click', e => {
  if (e.target.classList.contains('pop-up'))
    savedPalettesPopUp.style.visibility = 'hidden';

  if (e.target.classList.contains('palette-select-btn')) {
    let selectedIndex = e.target.value;
    savedPalettesPopUp.style.visibility = 'hidden';
    loadPalette(userPalettes.savedPalettes[selectedIndex].colors);
  }
});

function showSavedPalettes(e) {
  savedPalettesPopUp.style.visibility = 'visible';
  const list = savedPalettesPopUp.querySelector('#saved-palettes-list');
  list.innerHTML = '';

  userPalettes.savedPalettes.forEach((palette, index) => createListing(palette, index));

  function createListing(palette, index) {

    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    list.append(listItem);

    const name = document.createElement('label');
    name.for = index;
    name.innerText = palette.name;
    listItem.append(name);

    const wrapper = document.createElement('div');
    wrapper.classList.add('palette-button-wrapper');
    listItem.append(wrapper);

    const paletteDisplay = document.createElement('div');
    paletteDisplay.classList.add('mini-palette-display');
    palette.colors.forEach(colorHex => {
      const color = document.createElement('div');
      color.style.backgroundColor = colorHex;
      paletteDisplay.append(color);
    });
    wrapper.append(paletteDisplay);

    const btn = document.createElement('button');
    btn.classList.add('palette-select-btn');
    btn.value = index;
    btn.innerText = 'Select';
    wrapper.append(btn);
  }
}

const paletteSaveDiv = document.querySelector('#palette-save-form');
const paletteSaveForm = paletteSaveDiv.querySelector('form');
paletteSaveForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('palette-name');
  userPalettes.saveWorkingPalette(name);

  paletteSaveDiv.style.visibility = 'hidden';
});

function savePalette(e) {
  paletteSaveDiv.style.visibility = 'visible';
}

function handleButtonClicks(e) {
  let element = e.target;

  while (element) {
    if (element.nodeName === "BUTTON") {
      const btnValue = element.value;
      if (btnValue === 'generate') generatePalette();

      if (btnValue === 'library') showSavedPalettes();

      if (btnValue === 'save-palette') savePalette();

      break;
    }
    element = element.parentNode;
  }


}
document.querySelector('.btns')
  .addEventListener('click', handleButtonClicks);