const typewriter = new Typewriter(document.getElementById('typewriterText'), {
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
