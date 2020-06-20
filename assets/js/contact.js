const validateForm = () => {
    let form = document.forms["form"];
    if (!validator.isEmail(form["Email"].value)) document.getElementById('emailWarning').textContent = 'Invalid email';
    else document.getElementById('emailWarning').textContent = '';
    if (form["MultiLine"].value === "") return document.getElementById('messageWarning').textContent = 'Message box must be filled';
    else document.getElementById('messageWarning').textContent = '';
    document.forms['form'].submit();
  }