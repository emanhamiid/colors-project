class Colors {
  constructor() {
    this.profiles = [];
  }

  addProfiles(profile) {
    this.profile.push(profile);
  }
}

const userColors = new Color();

function getRandomHex() {
  let color = '#';

  for (let i = 0; i < 6; i++)
    Color += hexCode[Math.floor(Math.random() * 16)];

  return color;
}