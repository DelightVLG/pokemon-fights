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
  this.elHpProgressBar.style.width = `${this.damageHp * 100 / this.defaultHp}%`;
}

function renderHp() {
  this.renderLife();
  this.renderLifeProgressBar();
}

function changeHp(value) {
  this.damageHp -= value;

  const log = this === enemy
    ? generateLog(this.name, character.name, value, this.damageHp, this.defaultHp)
    : generateLog(this.name, enemy.name, value, this.damageHp, this.defaultHp)
  console.log(log);

  if (this.damageHp <= 0) {
    this.damageHp = 0;
    alert(`Покемон ${this.name} проиграл...`)
    kickBtn.disabled = true;
  }

  this.renderHp();
}

function randomNum(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, damage, currentHp, maxHp) {
  const battleLog = getElById('logs');
  const p = document.createElement('p');
  const logs = [
    `${firstPerson} вспомнил что-то важное, но неожиданно ${secondPerson}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} поперхнулся, и за это ${secondPerson} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} забылся, но в это время наглый ${secondPerson}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} пришел в себя, но неожиданно ${secondPerson} случайно нанес мощнейший удар. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} поперхнулся, но в это время ${secondPerson} нехотя раздробил кулаком противника. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} удивился, а ${secondPerson} пошатнувшись влепил подлый удар. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} высморкался, но неожиданно ${secondPerson} провел дробящий удар. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} пошатнулся, и внезапно наглый ${secondPerson} беспричинно ударил в ногу противника -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} расстроился, как вдруг, неожиданно ${secondPerson} случайно влепил стопой в живот соперника. -${damage} [${currentHp}/${maxHp}]`,
    `${firstPerson} пытался что-то сказать, но вдруг, неожиданно ${secondPerson} со скуки, разбил бровь сопернику -${damage} [${currentHp}/${maxHp}]`,
  ];

  p.innerText = logs[randomNum(logs.length - 1)];
  battleLog.prepend(p);
}

kickBtn.addEventListener('click', () => {
  character.changeHp(randomNum(20));
  enemy.changeHp(randomNum(20));
});

ultimateKickBtn.addEventListener('click', () => {
  character.changeHp(randomNum(70));
  enemy.changeHp(randomNum(70));
})

function init() {
  console.log('START');
  character.renderHp();
  enemy.renderHp();
}

init();
