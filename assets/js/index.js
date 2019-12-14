document.addEventListener('DOMContentLoaded', () => {
  Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0).forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('is-active');
        document.getElementById(el.dataset.target).classList.toggle('is-active');
      });
    });
});

function insertText() {
  document.getElementById('mue-title').innerHTML = 'Mue';
  document.getElementById('description').innerHTML = 'A modern open-source, customiable new tab for modern browsers.';
  document.getElementById('extra-dropdown').innerHTML = 'More';
}

function french() {
  document.getElementById('mue-title').innerHTML = 'Mue';
  document.getElementById('description').innerHTML = 'Un nouvel onglet moderne open-source et personnalisable pour les navigateurs modernes.';
  document.getElementById('extra-dropdown').innerHTML = 'Plus';
  document.getElementById('report-issue').innerHTML = 'Fonction de rapport';
  document.getElementById('suggest-feature').innerHTML = 'suggérer une fonctionnalité';
  document.getElementById('example-tab').innerHTML = 'Exemple d\'onglet';
  document.getElementById('privacy').innerHTML = ' Intimité';
  document.getElementById('add-to-chrome').innerHTML = 'Ajouter à <i class=\'fab fa-chrome\'></i>';
  document.getElementById('add-to-firefox').innerHTML = 'Ajouter à <i class=\'fab fa-firefox\'></i>';
  document.getElementById('add-to-else').innerHTML = 'Ajouter à <i class=\'far fa-question-circle\'></i>';
  var expiration = new Date(date).toUTCString();
  console.log(expiration);
  var cookie = escape(key) + '=' + escape(value) + ';expires=' + expiration + ';';
  document.cookie = cookie;
  console.log(cookie);
  console.log('New cookie with key: ');
}

let data; 
const getImg = async () => {
  try {
    data = await fetch('https://api.muetab.xyz/getImage?category=Outdoors');
    data = await data.json();


  } catch (e) {
    data = null;
  }
  if (data) {
  document.getElementById('main').style.backgroundImage = `url(${data.file})`; // Set the background
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="assets/css/text.css " id="theme">');
  }
}

//getImg();
//function readCookie(name) {
// var key = name + '=';
// var cookies = document.cookie.split(';');
// for (var i = 0; i < cookies.length; i++) {
//   var cookie = cookies[i];
//   while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
//   if (cookie.indexOf(key) === 0) return cookie.substring(key.length, cookie.length);
// }
//  return null;
// }
//createCookie('sport', 'basketball', Date.UTC(2017, 8, 1));
// createCookie('icecream', 'vanilla', Date.UTC(2017, 8, 1));
// console.log(readCookie('icecream'));```