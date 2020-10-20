const validateForm = () => {
    const form = document.forms['form'];
    if (form['MultiLine'].value === '') return document.getElementById('messageWarning').textContent = 'Message box must be filled';
    else document.getElementById('messageWarning').textContent = '';
    document.forms['form'].submit();
}