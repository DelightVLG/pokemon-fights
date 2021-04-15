const kickBtn = document.querySelector('#btn-kick');
const ultimateKickBtn = document.querySelector('#btn-ultimate');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  damageHp: 100,
  elHpCount: document.querySelector('#health-character'),
  elHpProgressBar: document.querySelector('#progressbar-character')
}

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  damageHp: 100,
  elHpCount: document.querySelector('#health-enemy'),
  elHpProgressBar: document.querySelector('#progressbar-enemy'),
}

const renderLife = (person) => {
  person.elHpCount.innerText = `${person.damageHp} / ${person.defaultHp}`;
}

const renderLifeProgressBar = (person) => {
  person.elHpProgressBar.style.width = `${person.damageHp}%`;
}

const renderHp = (person) => {
  renderLife(person);
  renderLifeProgressBar(person);
}

const changeHp = (value, person) => {
  if (person.damageHp < value) {
    person.damageHp = 0;
    alert(`Покемон ${person.name} проиграл...`)
    kickBtn.disabled = true;
  } else {
    person.damageHp -= value;
  }

  renderHp(person);
}

const randomDmg = (num) => {
  return Math.ceil(Math.random() * num);
}

const calculateDmg = (value) => {
  changeHp(randomDmg(value), character);
  changeHp(randomDmg(value), enemy);
}

kickBtn.addEventListener('click', () => {
  calculateDmg(20)
});

ultimateKickBtn.addEventListener('click', () => {
  calculateDmg(70)
})

const init = () => {
  console.log('START');
  renderHp(character);
  renderHp(enemy);
}

init();
