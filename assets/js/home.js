// Detect Browser
const ua = detect.parse(navigator.userAgent);
const button = document.getElementById('download');

if (ua.device.type === 'Mobile') {
    document.getElementById('unsupported').style.display = 'block';
    button.href = '';
    button.innerHTML = 'View Supported Browsers';
} else switch (ua.browser.family) {
    case 'Chrome': {
        button.href = 'https://chrome.google.com/webstore/detail/mue/bngmbednanpcfochchhgbkookpiaiaid';
        button.innerHTML = '<i class="fab fa-chrome"></i> Add to Chrome';
        break;
    }

    case 'Firefox': {
        button.href = 'https://addons.mozilla.org/en-GB/firefox/addon/mue/';
        button.innerHTML = '<i class="fab fa-firefox"></i> Add to Firefox';
        break;
    }

    default: {
        button.href = 'https://github.com/mue/mue';
        button.innerHTML = '<i class="fab fa-github"</i> Download from GitHub';
    }
}