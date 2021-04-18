function getElById(id) {
  return document.querySelector(`#${id}`);
}

const kickBtn = getElById('btn-kick');
const ultimateKickBtn = getElById('btn-ultimate');


const character = {
  name: 'Pikachu',
  defaultHp: 100,
  damageHp: 100,
  elHpCount: getElById('health-character'),
  elHpProgressBar: getElById('progressbar-character'),
  changeHp: changeHp,
  renderHp: renderHp,
  renderLife: renderLife,
  renderLifeProgressBar: renderLifeProgressBar,
}

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  damageHp: 100,
  elHpCount: getElById('health-enemy'),
  elHpProgressBar: getElById('progressbar-enemy'),
  changeHp: changeHp,
  renderHp: renderHp,
  renderLife: renderLife,
  renderLifeProgressBar: renderLifeProgressBar,
}

function renderLife() {
  this.elHpCount.innerText = `${this.damageHp} / ${this.defaultHp}`;
}

function renderLifeProgressBar() {
  this.elHpProgressBar.style.width = `${this.damageHp}%`;
}

function renderHp() {
  this.renderLife();
  this.renderLifeProgressBar();
}

function changeHp(value) {
  this.damageHp -= value;

  if (this.damageHp <= 0) {
    this.damageHp = 0;
    alert(`Покемон ${this.name} проиграл...`)
    kickBtn.disabled = true;
  }

  this.renderHp();
}

function randomDmg(num) {
  return Math.ceil(Math.random() * num);
}

kickBtn.addEventListener('click', () => {
  character.changeHp(randomDmg(20));
  enemy.changeHp(randomDmg(20));
});

ultimateKickBtn.addEventListener('click', () => {
  character.changeHp(randomDmg(70));
  enemy.changeHp(randomDmg(70));
})

function init() {
  console.log('START');
  character.renderHp();
  enemy.renderHp();
}

init();
