// Detect Browser
const ua = detect.parse(navigator.userAgent);
const button = document.getElementById('download');

switch (ua.browser.family) {
    case 'Chrome': {
        button.href = 'webstore';
        button.innerHTML = '<i class="fab fa-chrome"></i> Chrome/Chromium';
        break;
    }

    case 'Firefox': {
        button.href = 'webstore';
        button.innerHTML = '<i class="fab fa-firefox"></i> Firefox';
        break;
    }

    default: {
        button.href = 'https://github.com/mue/mue';
        button.innerHTML = '<i class="fa fa-question"</i> Other';
    }
}

// Iframe Refresh
const refreshIframe = () => document.getElementById('iframe').src = 'https://mue.now.sh';