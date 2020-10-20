const validateForm = () => {
    const form = document.forms['form'];
    if (!validator.isEmail(form['Email'].value)) document.getElementById('emailWarning').textContent = 'Invalid email';
    else document.getElementById('emailWarning').textContent = '';
    if (form['MultiLine'].value === '') return document.getElementById('messageWarning').textContent = 'Message box must be filled';
    else document.getElementById('messageWarning').textContent = '';
    document.forms['form'].submit();
}

const toggleAnswer = (number) => {
    const x = document.getElementById('answer' + number);
    const y = document.getElementById('dwnBtn' + number);
    if (x.style.display === 'none') {
      x.style.display = 'block';
      y.style.transform = 'rotate(180deg)';
    } else {
      x.style.display = 'none';
      y.style.transform = 'rotate(0deg)';
    }
  }