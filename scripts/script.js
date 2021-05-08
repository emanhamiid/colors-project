class Colors {
  constructor() {
    this.palletes = [];
  }

  addPallete(pallete) {
    this.palletes.push(pallete);
  }

  static get randomHex() {
    const hexCode = "0123456789ABCDEF";
    let hex = '#';
    for (let i = 0; i < 6; i++)
      hex += hexCode[Math.floor(Math.random() * 16)];

    return hex;
  }
}
const userColors = new Colors();

function generatePallete(e) {
  const pallete = [];

  const colorDivs = Array.from(document.querySelector(".colors")
    .children);

  colorDivs.forEach(color => {
    const doNotChangeColor = color.querySelector('input');
    if (doNotChangeColor.checked)
      return pallete.push(color.style.backgroundColor);
    const randomHex = Colors.randomHex;
    color.style.backgroundColor = randomHex;
    color.querySelector('div')
      .innerText = randomHex;
    pallete.push(randomHex);
  });
  return pallete;
}

document.querySelector('#generate-btn')
  .addEventListener('click', generatePallete);