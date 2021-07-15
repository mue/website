// Detect Browser
const ua = new UAParser(navigator.userAgent);
const button = document.getElementById('download');
if (ua.getDevice().type === 'mobile' || ua.getDevice().type === 'tablet') {
    document.getElementById('unsupported').style.display = 'block';
    button.href = 'https://github.com/mue/mue#installation';
    button.innerHTML = 'View Supported Browsers';
} else switch (ua.getBrowser().name) {
    case 'Chrome':
        button.href = 'https://chrome.google.com/webstore/detail/mue/bngmbednanpcfochchhgbkookpiaiaid';
        button.innerHTML = '<i class="fab fa-chrome"></i> Add to Chrome';
        break;

    case 'Firefox':
        button.href = 'https://addons.mozilla.org/firefox/addon/mue/';
        button.innerHTML = '<i class="fab fa-firefox"></i> Add to Firefox';
        break;

    case 'Edge':
        button.href = 'https://microsoftedge.microsoft.com/addons/detail/mue/aepnglgjfokepefimhbnibfjekidhmja';
        button.innerHTML = '<i class="fab fa-edge"></i> Add to Edge';
        break;

    case 'Whale':
        button.href = 'https://store.whale.naver.com/detail/ecllekeilcmicbfkkiknfdddbogibbnc';
        button.innerHTML = '<i class="fas fa-plus"></i> Add to Whale';
        break;

    default:
        button.href = 'https://github.com/mue/mue';
        button.innerHTML = '<i class="fab fa-github"</i> Download from GitHub';
}