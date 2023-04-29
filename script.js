import keyBtns from './btns.js';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.prepend(wrapper);
const inputText = document.createElement('textarea');
inputText.classList.add('textarea');
wrapper.prepend(inputText);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard__wrapper');
wrapper.append(keyboard);

class GenerateKey {
  constructor(name, rus, eng, rusCaps, engCaps) {
    this.name = name;
    this.rus = rus;
    this.eng = eng;
    this.rusCaps = rusCaps;
    this.engCaps = engCaps;
  }

  createElement() {
    const key = document.createElement('div');
    key.className = `key ${this.name}`;
    key.innerHTML = `
            <span class='rus hidden-key'>${this.rus}</span>
            <span class='rusCaps hidden-key'>${this.rusCaps}</span>
            <span class='eng'>${this.eng}</span>
            <span class='engCaps hidden-key'>${this.engCaps}</span>
        `;
    keyboard.append(key);
  }
}

keyBtns.forEach((btn) => {
  const res = new GenerateKey(btn.name, btn.rus, btn.eng, btn.rusCaps, btn.engCaps);
  res.createElement();
});
