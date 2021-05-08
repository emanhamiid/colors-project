class Colors {
  constructor() {
    this.profiles = [];
  }

  addProfiles(profile) {
    this.profile.push(profile);
  }

  static get RandomHex() {
    const hexCode = "0123456789ABCDEF";
    let hex = '#';
    for (let i = 0; i < 6; i++)
      hex += hexCode[Math.floor(Math.random() * 16)];

    return hex;
  }
}

const userColors = new Color();

function getRandomHex() {

}

document.querySelector(".colors")
  .children.forEach(color => {
    const randomHex = getRandomHex;
    color.style.backgroundColor = randomHex;
    color.querySelector('#hex-value')
      .innerText = randomHex;
  });