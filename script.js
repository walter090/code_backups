function userLoggedIn() {
    var loggedIn = document.body.getAttribute('class');
    var attrs = loggedIn.split(' ');
    for (i = 0; i < attrs.length; i++) {
        if (attrs[i] === 'logged-in') {
            return !0
        }
    }
    return !1
}

function commentOnlyIfLoggedIn() {
    if (!userLoggedIn()) {
        var commentForm = document.getElementsByClassName('commentsform')[0];
        var message = document.createElement('p');
        message.innerHTML = 'Please <a class="login_modal">sign in</a> to comment.';
        commentForm.appendChild(message)
    }
}

function changeMenuOnUserStatus() {
    var loggedIn = userLoggedIn();
    if (loggedIn) {
        var menuLink = document.getElementsByClassName('menu-item-6297');
        for (var i = 0; i < menuLink.length; i++) {
            menuLink[i].removeAttribute('href')
        }
        return
    } else {
        var menuLink = document.getElementsByClassName('menu-item-6297');
        for (var i = 0; i < menuLink.length; i++) {
            menuLink[i].childNodes[0].innerHTML = 'Sign In/Register';
            menuLink[i].childNodes[0].setAttribute('class', 'login_modal')
        }
        var signOutLink = document.getElementsByClassName('menu-item-6522');
        for (var i = 0; i < menuLink.length; i++) {
            signOutLink[i].style.display = 'none'
        }
    }
}

function addChatButton(parent) {
    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Chat'));
    parent.appendChild(button);
    button.setAttribute('id', 'chat_button')
}

function dissectCookie(cookie) {
    var values = cookie.split('; ');
    var cookieDict = {};
    for (var i = 0; i < values.length; i++) {
        key = values[i].split('=')[0];
        value = values[i].split('=')[1];
        cookieDict[key] = value
    }
    return cookieDict
}

function dictToCookie(dict) {
    var appendCookie = '';
    Object.keys(dict).forEach(function(key) {
        appendCookie += key + '=' + dict[key] + ';'
    });
    return appendCookie
}

function addToCookie(value) {
    document.cookie = dictToCookie({
        'email': value
    })
}

function errorAddToCookie(value) {
    document.cookie = dictToCookie({
        'error': value
    })
}

function addUserToCookie(selector) {
    var email = document.getElementById(selector).value;
    var password = document.getElementById('user_pass').value;
    if (email !== '' && password !== '') {
        addToCookie(email)
    }
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function displayEmail() {
    var logoutTexts = document.getElementsByClassName('wppb-front-end-logout');
    var email = getEmailFromCookie();
    if (email === undefined) {
        return
    }
    for (var i = 0; i < logoutTexts.length; i++) {
        logoutTexts[i].childNodes[0].innerHTML = 'You are currently logged in with ' + email + ' '
    }
}

function getEmailFromCookie() {
    var cookieDict = dissectCookie(document.cookie);
    return cookieDict.email
}

function getFromCookie(cookieKey) {
    var cookieDict = dissectCookie(document.cookie);
    return cookieDict[cookieKey]
}

function preFill(attr, attrValue, value) {
    var targets = jQuery('[' + attr + '=' + attrValue + ']');
    if (userLoggedIn() && value !== undefined) {
        for (var i = 0; i < targets.length; i++) {
            if (targets[i].getAttribute('name') !== 'NomineesEmail') {
                targets[i].value = value
            }
        }
    }
}
try {
    commentOnlyIfLoggedIn()
} catch (err) {}
changeMenuOnUserStatus();
displayEmail();
preFill('type', 'email', localStorage.email);
jQuery('#loginform').on('submit', function() {
    localStorage.email = document.getElementById('user_login').value
});
jQuery('#user_login').attr('required', 'required');
jQuery('#uesr_pass').attr('required', 'required');
signOutLinks = document.getElementsByClassName('wppb-logout-url');
for (var i = 0; i < signOutLinks.length; i++) {
    signOutLinks[i].innerHTML = 'Sign out >>'
}
if (!userLoggedIn()) {
    localStorage.removeItem('email')
}
if (userLoggedIn()) {
    try {
        document.getElementById('error').style.display = 'none'
    } catch (err) {}
}
if (jQuery('.wppb-error').length !== 0) {
    window.location.href = '/sign-in-error/'
}
if (document.referrer === 'https://wastewise.be/sign-in-error/' && userLoggedIn()) {
    window.location.href = '/'
}
if (jQuery('#wppb_form_success_message').length !== 0) {
    window.location.href = '/registration-success/'
} else if (jQuery('#wppb_general_top_error_message').length !== 0) {
    window.location.href = '/register/'
}
try {
    document.getElementById('wppb-submit').value = 'Sign In'
} catch (err) {}
try {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var widget = sidebar.getElementsByClassName('widget')[0];
    var ps = widget.getElementsByTagName('p');
    var psObjs = [];
    var i = 0;
    for (i = 0; i < ps.length; i++) {
        ps[i].innerHTML = ps[i].innerHTML.replace('(UTC)', 'UTC<br>');
        textOnly = ps[i].innerHTML.split('UTC')[0] + 'UTC';
        psObjs.push({
            time: Date.parse(textOnly),
            text: ps[i].innerHTML
        })
    }
    psObjs.sort(function(a, b) {
        if (a.time < b.time) {
            return -1
        }
        if (a.time > b.time) {
            return 1
        }
        return 0
    });
    for (i = 0; i < psObjs.length; i++) {
        ps[i].innerHTML = psObjs[i].text
    }
} catch (err) {}
try {
    var emailSignin = document.getElementById('wpa-submit');
    emailSignin.value = 'Sign In'
} catch (err) {}
if (jQuery('.wpa-error').length !== 0) {
    window.location.href = '/passwordless-error/'
}
if (jQuery('.wpa-success').length !== 0) {
    window.location.href = '/passwordless-sign-in/'
}
try {
    topBarDate = document.getElementsByClassName('topbar')[0].getElementsByClassName('container')[0].getElementsByClassName('alignleft')[0]
    topBarDate.innerHTML = 'be Waste Wise';
} catch (err) {}

try {
    var tabs = jQuery('ul.nav-tabs');
    tabs[0].style.backgroundColor = 'white';
    var inactiveTab = jQuery('#custom-tabs > li');
    for (var i = 0; inactiveTab.length; i++) {
        inactiveTab[i].style.borderRadius = 0;
        inactiveTab[i].style.borderWidth = '3px';
    }

    var inactiveTabs = jQuery('#custom-tabs li > a');
    for (i = 0; inactiveTabs.length; i++) {
        inactiveTabs[i].style.backgroundColor = 'white';
        inactiveTabs[i].style.color = 'f7951e';
    }
} catch (err) {}