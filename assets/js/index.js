// Navbar
const navbar = () => {
    const navbar = document.getElementById('navbar');
    if (navbar.className === 'navbar') navbar.className += ' responsive';
    else navbar.className = 'navbar';
}