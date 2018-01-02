jQuery(document).ready(function(){
    targets = document.querySelectorAll('[type="email"]');
    for (var i = 0; i < targets.length; i ++) {
	email = getEmailFromCookie();
	if (email !== undefined) {
	targets[i].value = email;
	}
    }
});

function getEmailFromCookie() {
    var cookieDict = dissectCookie(document.cookie);
    return cookieDict['email'];
}

function dissectCookie(cookie) {
    var values = cookie.split('; ');
    var cookieDict = {};
    for (var i = 0; i < values.length; i ++) {
        key = values[i].split('=')[0];
        value = values[i].split('=')[1];
        cookieDict[key] = value;
    }
    return cookieDict;
}
