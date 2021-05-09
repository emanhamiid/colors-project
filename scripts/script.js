class Pallete {
  constructor(name, colors) {
    this.name = name;
    this.colors = colors;
  }
}

class Pallets {
  constructor() {
    this.savedPalletes = [];
    this.workingPallete;
  }

  saveWorkingPallete(name) {
    this.savedPalletes.push(name, this.wokringPallete);
  }

  // setWorkingPallete(pallete) {
  //   this.workingPallete = show(pallete);
  // }

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

function generatePallete(e) {
  const pallete = [];

  const colorDivs = Array.from(document.querySelector(".colors")
    .children);

  colorDivs.forEach(color => {
    const doNotChangeColor = color.querySelector('input');
    if (doNotChangeColor.checked)
      return pallete.push(color.style.backgroundColor);
    const randomHex = Pallets.randomHex;
    color.style.backgroundColor = randomHex;
    color.querySelector('div')
      .innerText = randomHex;
    pallete.push(randomHex);
  });
  userPallets.workingPallete = pallete;
}

function showPallets(e) {
  // unhide popup with all the
  return;
}

function savePallete(e) {
  const palleteSaveDiv = document.querySelector('#pallete-save-form');
  palleteSaveDiv.style.display = 'block';

  const palleteSaveForm = palleteSaveDiv.querySelector('form');
  palleteSaveForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('pallete-name');
    userPallets.saveWorkingPallete(name);

    palleteSaveDiv.style.display = 'none';
  });
}

document.querySelector('#generate-btn')
  .addEventListener('click', generatePallete);

document.querySelector('#library-btn')
  .addEventListener('click', showPallets);

document.querySelector('#save-btn')
  .addEventListener('click', savePallete);