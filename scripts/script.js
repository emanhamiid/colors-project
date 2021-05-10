class Palette {
  constructor(name, colors) {
    this.name = name;
    this.colors = colors;
  }
}

class Pallets {
  constructor() {
    this.savedPalettes = [];
    this.workingPalette;
  }

  saveWorkingPalette(name) {
    this.savedPalettes.push(new Palette(name, [...this.workingPalette]));
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
const userPallets = new Pallets();

function generatePalette(e) {
  const palette = [];

  const colorDivs = Array.from(document.querySelector(".colors")
    .children);

  colorDivs.forEach(color => {
    const doNotChangeColor = color.querySelector('input');
    if (doNotChangeColor.checked)
      return palette.push(color.style.backgroundColor);
    const randomHex = Pallets.randomHex;
    color.style.backgroundColor = randomHex;
    color.querySelector('div')
      .innerText = randomHex;
    palette.push(randomHex);
  });
  userPallets.workingPalette = palette;
}

function showPallets(e) {
  const savedPalletsPopUp = document.querySelector('#saved-palettes-popup');
  savedPalletsPopUp.style.visibility = 'visible';

  userPallets.savedPalettes.forEach((palette, index) => createListing(palette, index));

  function createListing(palette, index) {
    const list = savedPalletsPopUp.querySelector('#saved-palettes-list');

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
    btn.innerText = 'Select';
    wrapper.append(btn);
  }
}

function savePalette(e) {
  const paletteSaveDiv = document.querySelector('#palette-save-form');
  paletteSaveDiv.style.visibility = 'visible';

  const paletteSaveForm = paletteSaveDiv.querySelector('form');
  paletteSaveForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('palette-name');
    userPallets.saveWorkingPalette(name);

    paletteSaveDiv.style.visibility = 'hidden';
  });
}

function handleButtonClicks(e) {
  let element = e.target;

  while (element) {
    if (element.nodeName === "BUTTON") {
      const btnValue = element.value;
      if (btnValue === 'generate') generatePalette();

      if (btnValue === 'library') showPallets();

      if (btnValue === 'save-palette') savePalette();

      break;
    }
    element = element.parentNode;
  }
}
document.querySelector('.btns')
  .addEventListener('click', handleButtonClicks);