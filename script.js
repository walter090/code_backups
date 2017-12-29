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
  return false
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
    var menuLink = document.getElementById('menu-item-6297').childNodes[0];
    menuLink.setAttribute('href', '/profile/');
    return;
  } else {
    var menuLink = document.getElementById('menu-item-6297').childNodes[0];
    menuLink.innerHTML = 'Sign In/Register';
    menuLink.setAttribute('class', 'login_modal');
    
    var signOutLink = document.getElementById('menu-item-6522');
    signOutLink.style.display = 'none';
  }
}

function changeMenuOnUserStatusMobile() {
  var loggedIn = userLoggedIn();
  var mobileMenu = document.getElementsByClassName('mobilenavcontainer')[0];
  if (loggedIn) {
    var menuLink = document.getElementById('menu-item-6297').childNodes[0];
    menuLink.setAttribute('href', '/profile/');
    return;
  } else {
    var menuLink = mobileMenu.getElementsByClassName('menu-item-6297')[0].childNodes[0];
    menuLink.innerHTML = 'Sign In/Register';
    menuLink.setAttribute('class', 'login_modal');
    
    var signOutLink = mobileMenu.getElementsByClassName('menu-item-6522')[0];
    signOutLink.style.display = 'none';
  }
}

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

function addPairToCookie(key, value) {
  document.cookie = dictToCookie({
    key: value
  });
}

function addUserToCookie(selector) {
  email = document.getElementById(selector).value;
  if (email !== '' && password !== '') {
    addPairToCookie('email', email);
  }
}

try {
  commentOnlyIfLoggedIn();
} catch (err) {}

jQuery('#wppb-submit').on('click', function(){
  addUserToCookie('user_login');
});

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  changeMenuOnUserStatusMobile();
  console.log('mo');
} else {
  changeMenuOnUserStatus();
}

jQuery('#user_login').attr('required', 'required');
jQuery('#uesr_pass').attr('required', 'required');

