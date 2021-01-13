const validateForm = () => {
  const form = document.forms['form'];
  if (!validator.isEmail(form['Email'].value)) document.getElementById('emailWarning').textContent = 'Invalid email';
  else document.getElementById('emailWarning').textContent = '';
  if (form['MultiLine'].value === '') return document.getElementById('messageWarning').textContent = 'Message box must be filled';
  else document.getElementById('messageWarning').textContent = '';
  document.forms['form'].submit();
}

const toggleAnswer = (number) => {
  const answer = document.getElementById('answer' + number);
  const button = document.getElementById('dwnBtn' + number);
  if (answer.style.display === 'none') {
    answer.style.display = 'block';
    button.style.transform = 'rotate(180deg)';
  } else {
    answer.style.display = 'none';
    button.style.transform = 'rotate(0deg)';
  }
}