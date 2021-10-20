// Navbar
const navbar = () => {
  const navbar = document.getElementById('navbar');
  (navbar.className === 'navbar') ? navbar.className += ' responsive' : navbar.className = 'navbar';
}

const scrollbutton = document.getElementById('scroll');

window.onscroll = () => scrollFunction();

const scrollFunction = () => (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? scrollbutton.style.display = 'block' : scrollbutton.style.display = 'none';

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
