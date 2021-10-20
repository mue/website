document.getElementById('reason').onchange = (e) => {
  document.getElementById('reasonWarning').textContent = '';
  if (e.target.value === 'other') {
    document.getElementById('otherReason').style.display = 'block';
  } else {
    document.getElementById('otherReason').style.display = 'none';
  }
}

document.getElementById('likelyToTry').oninput = () => {
  document.getElementById('likelyValue').innerText = '(' + document.getElementsByClassName('range')[0].value + ')';
}

const validateForm = () => {
  const form = document.forms['form'];
  const reasonWarning = document.getElementById('reasonWarning');
  const betterWarning = document.getElementById('betterWarning');
  
  if (document.getElementById('reason').value === 'other' && document.getElementById('otherReason').value === '') {
    return reasonWarning.textContent = 'Reason must be provided';
  } else {
    reasonWarning.textContent = '';
  }
  
  if (form['MultiLine'].value === '') {
    return betterWarning.textContent = 'Message box must be filled';
  } else {
    betterWarning.textContent = '';
  }
  
  document.forms['form'].submit();
}
