let typewriter = new Typewriter(document.getElementById('typewriterText'), {
  loop: true,
  delay: 55
});

typewriter
  .typeString('the team is')
  .pauseFor(1500)
  .deleteChars(11)
  .typeString('things gets done')
  .pauseFor(1500)
  .deleteChars(16)
  .typeString('the new tab is<br>reinvented')
  .pauseFor(1500)
  .deleteChars(25)
  .start();

const getStats = async () => {
  const users = document.getElementById('users');
  const userStats = sessionStorage.getItem('users');
  if (userStats !== '' && userStats !== null) return users.textContent = userStats + '+ users, 10+ 5 star reviews';
  let data = await fetch('http://127.0.1:8080');
  data = await data.json();
  sessionStorage.setItem('users', data.total);
  users.textContent = data.total + '+ users';
}

getStats();