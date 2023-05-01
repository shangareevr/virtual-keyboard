import keyBtns from './btns.js';

let lang = localStorage.getItem('lang');
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.prepend(wrapper);
const title = document.createElement('div');
title.className = 'title';
title.innerHTML = 'Виртуальная клавиатура';
wrapper.prepend(title);
const inputText = document.createElement('textarea');
inputText.className = 'textarea';
inputText.id = 'textarea';
inputText.setAttribute('autofocus', 'autofocus');
wrapper.append(inputText);
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard__wrapper');
wrapper.append(keyboard);
const langInfo = document.createElement('div');
langInfo.className = 'lang-info';
langInfo.innerHTML = 'Клавиатура выполнена под Windows. <br> Для переключения языка использовать комбинацию Ctrl + Alt.';
wrapper.append(langInfo);

inputText.focus();
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
        if (lang === 'rus') {
          if (key.classList.contains('Backquote')) {
            key.classList.add('letter');
          }
        } else if (key.classList.contains('Backquote ')) {
          key.classList.remove('letter');
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
      if (key.classList.contains(e.code) && e.code !== 'CapsLock') {
        key.classList.add('active');
      }
    });
  });
  window.addEventListener('keyup', (e) => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      if (key.classList.contains(e.code) && e.code !== 'CapsLock') {
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
        if (keys.classList.contains('letter')) {
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

keyboard.addEventListener('click', (e) => {
  if (e.target.closest('.CapsLock')) {
    keyboard.childNodes.forEach((keys) => {
      if (keys.classList.contains('CapsLock')) {
        keys.classList.toggle('active');
      }
      if (keys.classList.contains('letter')) {
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

function inputTextArea() {
  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    inputText.focus();
    if (e.code === 'Tab') {
      inputText.value += '\t';
    }
    if (e.code === 'Enter') {
      inputText.value += '\n';
    }
    if (e.code === 'Backspace') {
      const numBackspaceStart = Math.min(inputText.selectionStart, inputText.selectionEnd);
      const numBackspaceEnd = Math.max(inputText.selectionStart, inputText.selectionEnd);
      if (numBackspaceEnd !== numBackspaceStart) {
        inputText.value = inputText.value.substring(0, numBackspaceStart)
          + inputText.value.substring(numBackspaceEnd, inputText.value.length);
        inputText.selectionEnd = numBackspaceStart;
      } else {
        inputText.value = inputText.value.substring(0, numBackspaceStart - 1) + inputText.value.substring(numBackspaceStart, inputText.value.length);
        inputText.selectionEnd = numBackspaceStart - 1;
      }
    }
    if (e.code === ('Space')) {
      inputText.value += ' ';
    }
    if (e.code === 'Delete') {
      const numDeleteStart = inputText.selectionStart;
      const numDeleteEnd = inputText.selectionEnd;
      if (numDeleteStart !== numDeleteEnd) {
        inputText.value = inputText.value.substring(0, numDeleteStart) + inputText.value.substring(numDeleteEnd, inputText.value.length);
      } else {
        inputText.value = inputText.value.substring(0, numDeleteStart) + inputText.value.substring(numDeleteStart + 1, inputText.value.length);
      }
      inputText.selectionEnd = numDeleteStart;
    }
    if (e.code === 'ArrowLeft') {
      inputText.selectionStart -= 1;
      inputText.selectionEnd = inputText.selectionStart;
    }
    if (e.code === 'ArrowRight') {
      inputText.selectionStart += 1;
      inputText.selectionEnd = inputText.selectionStart;
    }
    if (e.code === 'ArrowUp') {
      if ((inputText.selectionStart > inputText.value.length - 48) && (inputText.value.length - 48) > 0) {
        inputText.selectionStart -= 49;
        inputText.selectionEnd = inputText.selectionStart;
      } else {
        inputText.selectionStart = 0;
        inputText.selectionEnd = inputText.selectionStart;
      }
    }
    if (e.code === 'ArrowDown') {
      if (inputText.value.length - inputText.selectionStart > 48) {
        inputText.selectionStart += 49;
        inputText.selectionEnd = inputText.selectionStart;
      } else {
        inputText.selectionStart = inputText.value.length;
        inputText.selectionEnd = inputText.selectionStart;
      }
    }
    keyBtns.forEach((key) => {
      if (e.code === key.name && !key.functional) {
        if (inputText.selectionStart !== inputText.value.length) {
          const textStart = inputText.value.substring(0, inputText.selectionStart);
          const pos = inputText.selectionStart;
          const textEnd = inputText.value.substring(inputText.selectionStart, inputText.value.length);
          inputText.value = textStart + key[`${lang}`] + textEnd;
          inputText.selectionStart = pos + 1;
          inputText.selectionEnd = pos + 1;
        } else {
          inputText.value += key[`${lang}`];
        }
      }
    });
  });
}
inputTextArea();

function inputTextAreaVirtual() {
  keyboard.addEventListener('click', (e) => {
    const clickBtn = e.target.parentElement.classList;
    if (clickBtn.contains('Tab')) {
      inputText.value += '\t';
    }
    if (clickBtn.contains('Enter')) {
      inputText.value += '\n';
    }
    if (clickBtn.contains('Backspace')) {
      inputText.value = inputText.value.substring(0, inputText.value.length - 1);
    }
    if (clickBtn.contains('Delete')) {
      const numDeleteStart = inputText.selectionStart;
      const numDeleteEnd = inputText.selectionEnd;
      if (numDeleteStart !== numDeleteEnd) {
        inputText.value = inputText.value.substring(0, numDeleteStart) + inputText.value.substring(numDeleteEnd, inputText.value.length);
      } else {
        inputText.value = inputText.value.substring(0, numDeleteStart) + inputText.value.substring(numDeleteStart + 1, inputText.value.length);
      }

      inputText.selectionEnd = numDeleteStart;
    }

    if (clickBtn.contains('ArrowLeft')) {
      inputText.selectionStart -= 1;
      inputText.selectionEnd = inputText.selectionStart;
    }
    if (clickBtn.contains('ArrowRight')) {
      inputText.selectionStart += 1;
      inputText.selectionEnd = inputText.selectionStart;
    }
    if (clickBtn.contains('ArrowUp')) {
      if (inputText.selectionStart > inputText.value.length - 48) {
        inputText.selectionStart -= 49;
        inputText.selectionEnd = inputText.selectionStart;
      } else {
        inputText.selectionStart = 0;
        inputText.selectionEnd = inputText.selectionStart;
      }
    }
    if (clickBtn.contains('Space')) {
      inputText.value += ' ';
    }
    if (clickBtn.contains('ArrowDown')) {
      if (inputText.value.length - inputText.selectionStart > 48) {
        inputText.selectionStart += 49;
        inputText.selectionEnd = inputText.selectionStart;
      } else {
        inputText.selectionStart = inputText.value.length;
        inputText.selectionEnd = inputText.selectionStart;
      }
    }
    keyBtns.forEach((key) => {
      if (e.target.parentElement.classList.contains(key.name) && !key.functional) {
        inputText.value += key[`${lang}`];
      }
    });
  });
}
inputTextAreaVirtual();
