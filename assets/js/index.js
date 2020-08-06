// Navbar
const navbar = () => {
    const navbar = document.getElementById('navbar');
    (navbar.className === 'navbar') ? navbar.className += ' responsive' : navbar.className = 'navbar';
}

// Easter Egg
new Egg('up, up, down, down, left, right, left, right, b, a', () => {
    window.location = 'https://www.youtube.com/watch?v=QZXc39hT8t4'; // yes
}).listen();

mybutton = document.getElementById('scroll');

window.onscroll = () => scrollFunction();

const scrollFunction = () => (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? mybutton.style.display = "block" : mybutton.style.display = "none";

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}