import keyBtns from './btns.js';

let lang = 'eng';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.prepend(wrapper);
const inputText = document.createElement('textarea');
inputText.className = 'textarea';
inputText.setAttribute('autofocus', 'autofocus');

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
    const str = this.name.substring(0, 3);
    if (str === 'Key') {
      key.classList.add('letter');
    }
    key.innerHTML = `
            <div class='value rus hidden-key'>${this.rus}</div>
            <div class='value rusCaps hidden-key'>${this.rusCaps}</div>
            <div class='value eng hidden-key'>${this.eng}</div>
            <div class='value engCaps hidden-key'>${this.engCaps}</div>
        `;
    key.childNodes.forEach((node) => {
      if (node.nodeName !== '#text') {
        if (node.classList.contains(`${lang}`)) {
          node.classList.remove('hidden-key');
        } else {
          node.classList.add('hidden-key');
        }
      }
    });

    keyboard.append(key);
  }
}
function generateKeyboard() {
  keyBtns.forEach((btn) => {
    const res = new GenerateKey(btn.name, btn.rus, btn.eng, btn.rusCaps, btn.engCaps);
    res.createElement();
  });
}
generateKeyboard();

function animatedForPressKey() {
  window.addEventListener('keydown', (e) => {
    inputText.focus();
    const keys = document.querySelectorAll('.key');
    // console.log(e);
    keys.forEach((key) => {
      if (key.classList.contains(e.code)) {
        key.classList.add('active');
      }
    });
  });
  window.addEventListener('keyup', (e) => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      if (key.classList.contains(e.code)) {
        key.classList.remove('active');
      }
    });
  });
}
animatedForPressKey();

function defineLang() {
  if (lang === 'eng') {
    lang = 'rus';
    keyboard.innerHTML = '';
    generateKeyboard();
  } else {
    lang = 'eng';
    keyboard.innerHTML = '';
    generateKeyboard();
  }
}

function changeInputLang() {
  const keysToLang = new Set();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Control' || e.key === 'Alt') {
      keysToLang.add(e.key);
    }
    if (keysToLang.has('Control') && keysToLang.has('Alt')) {
      keysToLang.clear();
      defineLang();
    }
  });
  document.addEventListener('keyup', (e) => {
    keysToLang.delete(e.key);
  });
}
changeInputLang();

function shiftKey() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
      lang = `${lang}Caps`;
      keyboard.innerHTML = '';
      generateKeyboard();
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
      lang = lang.substring(0, 3);
      keyboard.innerHTML = '';
      generateKeyboard();
    }
  });
}
shiftKey();

function capsKay() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'CapsLock') {
      keyboard.childNodes.forEach((keys) => {
        if (keys.classList.contains('letter') || (keys.classList.contains('Backquote') && (lang === 'rus'))) {
          keys.childNodes.forEach((node) => {
            if (node.nodeName !== '#text') {
              if (node.classList.contains(`${lang}Caps`)) {
                node.classList.toggle('hidden-key');
              }
              if (node.classList.contains(`${lang}`)) {
                node.classList.toggle('hidden-key');
              }
            }
          });
        }
      });
    }
  });
}
capsKay();
