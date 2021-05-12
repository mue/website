const validateForm = () => {
    const form = document.forms['form'];
    const messageWarning = document.getElementById('messageWarning');

    if (form['MultiLine'].value === '') {
        return messageWarning.textContent = 'Message box must be filled';
    } else {
        messageWarning.textContent = '';
    }

    document.forms['form'].submit();
}