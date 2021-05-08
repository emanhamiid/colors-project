gitclass Colors {
  constructor() {
    this.profiles = [];
  }

  addProfiles(profile) {
    this.profiles.push(profile);
  }

  loadProfile() {}


  static get RandomHex() {
    const hexCode = "0123456789ABCDEF";
    let hex = '#';
    for (let i = 0; i < 6; i++)
      hex += hexCode[Math.floor(Math.random() * 16)];

    return hex;
  }
}

const userColors = new Color();

function generateProfile() {
  const profile = [];
  document.querySelector(".colors")
    .children.forEach(color => {
      const changeColor = color.querySelector('span');
      console.log(changeColor);
      if (changeColor)
        return;
      const randomHex = Colors.RandomHex;
      color.style.backgroundColor = randomHex;
      color.querySelector('#hex-value')
        .innerText = randomHex;
      profile.push(randomHex);
    });
  return profile;
}