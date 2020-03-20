// Navbar
const navbar = () => {
    const navbar = document.getElementById('navbar');
    if (navbar.className === 'navbar') navbar.className += ' responsive';
    else navbar.className = 'navbar';
}

// Easter Egg
new Egg('up, up, down, down, left, right, left, right, b, a', () => {
    window.location = 'https://www.youtube.com/watch?v=QZXc39hT8t4'; // yes
}).listen();