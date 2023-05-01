import keyBtns from './btns.js';

let lang = localStorage.getItem('lang');
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

window.addEventListener('load', () => {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else {
    lang = 'rus';
  }
});

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
  localStorage.setItem('lang', lang);
}

function changeInputLang() {
  const keysToLang = new Set();
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft' || e.code === 'AltLeft' || e.code === 'ControlRight' || e.code === 'AltRight') {
      keysToLang.add(e.code);
    }
    if ((keysToLang.has('ControlLeft') && keysToLang.has('AltLeft')) || (keysToLang.has('ControlRight') && keysToLang.has('AltRight'))) {
      keysToLang.clear();
      defineLang();
    }
  });
  document.addEventListener('keyup', (e) => {
    keysToLang.delete(e.code);
  });
}
changeInputLang();

function shiftKey() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
      lang = `${lang}Caps`;
      keyboard.innerHTML = '';
      generateKeyboard();
      keyboard.childNodes.forEach((keys) => {
        if (keys.classList.contains(`${e.code}`)) {
          keys.classList.toggle('active');
        }
      });
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
        if (keys.classList.contains('CapsLock')) {
          keys.classList.toggle('active');
        }
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

document.addEventListener('keydown', (e) => {
  if (e.code === 'Tab') {
    e.preventDefault();
    inputText.value += '\t';
  }
});
keyboard.addEventListener('click', (e) => {
  if (e.target.closest('.CapsLock')) {
    e.target.parentElement.classList.toggle('active');
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
  if (e.target.closest('.ShiftLeft') || e.target.closest('.ShiftRight')) {
    e.target.parentElement.classList.toggle('active');
    keyboard.childNodes.forEach((keys) => {
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
    });
  }
});

function switchLangVirtial() {
  const btnToLang = new Set();
  keyboard.addEventListener('click', (e) => {
    if (e.target.closest('.ControlLeft') || e.target.closest('.AltLeft') || e.target.closest('.ControlRight') || e.target.closest('.AltRight')) {
      e.target.parentElement.classList.add('active');
      btnToLang.add(e.target.parentElement.classList[1]);
    }
    if ((btnToLang.has('ControlLeft') && btnToLang.has('AltLeft')) || (btnToLang.has('ControlRight') && btnToLang.has('AltRight'))) {
      btnToLang.clear();
      defineLang();
    }
  });
}

switchLangVirtial();
