import keyBtns from './btns.js';

let lang = 'eng';
const caps = false;
const shift = false;

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

// function changeInputLang(){
//   console.log(lang);
//   if (lang == "rus") {
//     lang = "eng";
//       generateKeyboard();
//   } else {
//     lang = "rus"
//       generateKeyboard();
//   }
// keyboard.addEventListener("click", (e)=>{
//   inputText.innerText = inputText.innerText+ e.target.innerText;
//   console.log(e.target.innerText)
//   console.log(inputText.selectionStart);
//   console.log(inputText.selectionEnd)
// })
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
    if (e.key === 'Shift' || e.key === 'Alt') {
      // console.log(e.key);
      keysToLang.add(e.key);
    }
    if (keysToLang.has('Shift') && keysToLang.has('Alt')) {
      keysToLang.clear();
      defineLang();
    }
  });
  document.addEventListener('keyup', (e) => {
    keysToLang.delete(e.key);
  });
}

changeInputLang();
// document.addEventListener("keydown", (e)=>{
//   console.log(e.code);
//   console.log(e.key);
//   if (e.code == "KeyZ") {
//     console.log("я");
//   keyboard.innerHTML = "";
// // changeInputLang()
//   }
// })
