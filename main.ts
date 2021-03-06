function getElById(id: string) {
  return document.querySelector(`#${id}`);
}

const kickBtn = getElById('btn-kick') as HTMLButtonElement;
const ultimateKickBtn = getElById('btn-ultimate') as HTMLButtonElement;

interface Unit {
  name: string,
  defaultHp: number,
  damageHp: number,
  elHpCount: any,
  elHpProgressBar: any,
  changeHp: any,
  renderHp: any,
  renderLife: any,
  renderLifeProgressBar: any,
}

const character: Unit = {
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

const enemy: Unit = {
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

function renderLife(this: Unit) {
  this.elHpCount.innerText = `${this.damageHp} / ${this.defaultHp}`;
}

function renderLifeProgressBar(this: Unit) {
  this.elHpProgressBar.style.width = `${this.damageHp * 100 / this.defaultHp}%`;
}

function renderHp(this: Unit) {
  this.renderLife();
  this.renderLifeProgressBar();
}

function changeHp(this: Unit, value: number) {
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

function randomNum(num: number): number {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson: string, secondPerson: string, damage: number, currentHp: number, maxHp: number) {
  const battleLog = getElById('logs') as HTMLElement;
  const p = document.createElement('p');
  const logs: string[] = [
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
