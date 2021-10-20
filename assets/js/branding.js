const downloadFile = (url) => download(url);

const copyHex = (input) => {
  const copy = document.createElement('input');
  copy.type = 'text';
  copy.value = input;
  copy.id = 'copy';
  document.body.appendChild(copy);
  document.getElementById('copy').select();
  document.execCommand('copy');
  document.body.removeChild(copy);

  const toast = document.getElementById('toast');
  toast.className = 'show';
  setTimeout(() => { 
    toast.className = toast.className.replace('show', ''); 
  }, 3000);
}
