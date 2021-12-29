'use strict';

//BOTAO HOME
const botaoWork = document.querySelector('#buttonWork');
const secondPage = document.querySelector('.secondPageContent'); 
const thirdPage = document.querySelector('.thirdPageContent')

botaoWork.addEventListener('click', function(){
   secondPage.scrollIntoView({behavior: 'smooth'})
})
 
const arrowDown = botaoWork.addEventListener('mouseover', function(e){
    console.log(e.target);
 
    botaoWork.innerHTML = "Ver meu trabalho &downarrow;"
})


////////////////////////////////////////////////////////////////////
//REVEAL RED HEXAGONS
const sectionAll = document.querySelectorAll('.propagandasSite');

const revealSection = function(entries, observer) {
    const[entry] = entries;
   

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('sec-hidden');
}

const sectionObserver = new IntersectionObserver (revealSection, {
    root: null,
    threshold: 0.15,
});

sectionAll.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add('sec-hidden')
});

/////////////////////////////////////////////////////////////////////////
//REVEAL SOBRE
const sobreAll = document.querySelectorAll('#sobre');

const revealSobre = function(entries, observer){
    const[entry] = entries;
   

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('sec-hiddenXR');    
}

const sobreObserver = new IntersectionObserver (revealSobre, {
    root: null,
    threshold: 0.15,
});

sobreAll.forEach(function(sobre){
    sobreObserver.observe(sobre);
    sobre.classList.add('sec-hiddenXR')
});


/////////////////////////////////////////////////////////////////////////
//REVEAL EU
const euAll = document.querySelectorAll('.slideLeftToRight');

const revealEu = function(entries, observer){
    const[entry] = entries;
   

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('sec-hiddenXL');    
}

const euObserver = new IntersectionObserver (revealEu, {
    root: null,
    threshold: 0.15,
});

euAll.forEach(function(eu){
    euObserver.observe(eu);
    eu.classList.add('sec-hiddenXL')
});

/////////////////////////////////////////////////////////////////////////
//REVEAL SOBRE
const direitaAll = document.querySelectorAll('.direitaImagemMinha');

const revealDireita = function(entries, observer){
    const[entry] = entries;
    

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('sec-hiddenXR');    
}

const direitaObserver = new IntersectionObserver (revealDireita, {
    root: null,
    threshold: 0.15,
});

direitaAll.forEach(function(direita){
    direitaObserver.observe(direita);
    direita.classList.add('sec-hiddenXR')
});

////////////////////////////////////////////////////////////////////////

let spinnerWrapper = document.querySelector('.spinner-wrapper');
const body = document.querySelector('body');
const particeles = document.querySelector('#particles-js')
const scrolel = document.querySelector('::-webkit-scrollbar');



window.addEventListener('load', function () {
    setTimeout(function(){ spinnerWrapper.style.display = 'none';}, 2000);
    setTimeout(disableScroll, 0);
    setTimeout(enableScroll, 1500);
 
    setTimeout(function(){  spinnerWrapper.classList.add('disappear');}, 1000);
});


var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}


var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}


function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}   



class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'Bem vindo'
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next();

  //////////////////////////////////////////
 