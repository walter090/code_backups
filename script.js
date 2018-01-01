function userLoggedIn() {
    // Check if the current user is logged in
    // by looking for the 'logged-in' attribute
    // in body element.
    var loggedIn = document.body.getAttribute('class');
    var attrs = loggedIn.split(' ');
    for (i = 0; i < attrs.length; i ++) {
        if (attrs[i] === 'logged-in') {
            return true;
        }
    }
    return false;
}

function commentOnlyIfLoggedIn() {
    if (!userLoggedIn()) {
        var commentForm = document.getElementsByClassName('commentsform')[0];
        var message = document.createElement('p');
        message.innerHTML = 'Please <a class="login_modal">sign in</a> to comment.';
        commentForm.appendChild(message);
    }
}

function changeMenuOnUserStatus() {
    var loggedIn = userLoggedIn();
    if (loggedIn) {
//        var menuLink = document.getElementById('menu-item-6297').childNodes[0];
        var menuLink = document.getElementsByClassName('menu-item-6297');
        for (var i  = 0; i < menuLink.length; i ++) {
            menuLink[i].removeAttribute('href');
        }
        return;
    } else {
//        var menuLink = document.getElementById('menu-item-6297').childNodes[0];
        var menuLink = document.getElementsByClassName('menu-item-6297');
        for (var i = 0; i < menuLink.length; i ++) {
            menuLink[i].childNodes[0].innerHTML = 'Sign In/Register';
            menuLink[i].childNodes[0].setAttribute('class', 'login_modal');
        }

//        var signOutLink = document.getElementById('menu-item-6522');
        var signOutLink = document.getElementsByClassName('menu-item-6522');
        for (var i = 0; i < menuLink.length; i ++) {
            signOutLink[i].style.display = 'none';
        }
    }
}

//function changeMenuOnUserStatusMobile() {
//    var loggedIn = userLoggedIn();
//    var mobileMenu = document.getElementsByClassName('mobilenavcontainer')[0];
//    if (loggedIn) {
//        var menuLink = document.getElementById('menu-item-6297').childNodes[0];
//        menuLink.setAttribute('href', '/profile/');
//        return;
//    } else {
//        var menuLink = mobileMenu.getElementsByClassName('menu-item-6297')[0].childNodes[0];
//        menuLink.innerHTML = 'Sign In/Register';
//        menuLink.setAttribute('class', 'login_modal');
//
//        var signOutLink = mobileMenu.getElementsByClassName('menu-item-6522')[0];
//        signOutLink.style.display = 'none';
//    }
//}

function addChatButton(parent) {
    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Chat'));
    parent.appendChild(button);
    button.setAttribute('id', 'chat_button');
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

function dictToCookie(dict) {
    var appendCookie = '';
    Object.keys(dict).forEach(function(key) {
        appendCookie += key + '=' + dict[key] + ';';
    });
    return appendCookie;
}

function addToCookie(value) {
    document.cookie = dictToCookie({
        'email': value
    });
}

function errorAddToCookie(value) {
    document.cookie = dictToCookie({
        'error': value
    });
}

function addUserToCookie(selector) {
    var email = document.getElementById(selector).value;
    var password = document.getElementById('user_pass').value;
    if (email !== '' && password !== '') {
        addToCookie(email);
    }
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function displayEmail() {
    var logoutTexts = document.getElementsByClassName('wppb-front-end-logout');
    var email = getEmailFromCookie();
    for (var i = 0; i < logoutTexts.length; i ++) {
        logoutTexts[i].childNodes[0].innerHTML = 'You are currently logged in with ' + email + ' ';
    }
}

function getEmailFromCookie() {
    var cookieDict = dissectCookie(document.cookie);
    return cookieDict['email'];
}

function getFromCookie(cookieKey) {
    var cookieDict = dissectCookie(document.cookie);
    return cookieDict[cookieKey];
}

function preFill(attr, attrValue, value) {
    targets = jQuery('[' + attr + '=' + attrValue + ']');
    if (userLoggedIn()) {
        for (var i = 0; i < targets.length; i ++) {
            targets[i].value = value;
        }
    }
}

try {
    commentOnlyIfLoggedIn();
} catch (err) {}

changeMenuOnUserStatus();
displayEmail();
preFill('type', 'email', getEmailFromCookie());

jQuery('#wppb-submit').on('click', function(){
    addUserToCookie('user_login');
});
jQuery('#user_login').attr('required', 'required');
jQuery('#uesr_pass').attr('required', 'required');

signOutLinks = document.getElementsByClassName('wppb-logout-url');
for (var i = 0; i < signOutLinks.length; i ++) {
    signOutLinks[i].innerHTML = 'Sign out >>';
}

if (!userLoggedIn()) {
    deleteCookie('email');
}

if (jQuery('.wppb-error').length !== 0) {
    window.location.replace('/sign-in/');
}

if (jQuery('#wppb_form_success_message').length !== 0) {
    window.location.replace('/registration-success/');
}
