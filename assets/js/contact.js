const validateForm = () => {
  const form = document.forms['form'];
  const emailWarning = document.getElementById('emailWarning');
  const messageWarning = document.getElementById('messageWarning');

  if (!validator.isEmail(form['Email'].value)) {
    emailWarning.textContent = 'Invalid email';
  } else {
    emailWarning.textContent = '';
  }

  if (form['MultiLine'].value === '') {
    return messageWarning.textContent = 'Message box must be filled';
  } else {
    messageWarning.textContent = '';
  }

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
