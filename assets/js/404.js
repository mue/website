let messages = [
    'Looks like that resource doesn\'t exist',
    'Apparently, the resource does not exist',
    'The resource you are looking for is in another castle',
    'The resource is a lie',
    'The resource is not on this planet',
    '[placeholder 404 message]',
    'Terry loves 404 pages',
    'Looks like you\'re lost. Want to go home?'
];

document.getElementById('errortext').innerText = messages[Math.floor(Math.random() * messages.length)];