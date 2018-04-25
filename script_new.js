try{
  var targetRow = document.getElementsByClassName('u_row')[0];
  targetRow.style.padding = 0;
}catch (err) {}
try {
  var ham = document.getElementById('responsive-menu-button');
  var body = document.getElementById('body');
  ham.onclick = function(){
    if(jQuery('#body').hasClass('blur')){
      body.classList.remove('blur');
    } else {
      body.classList.add('blur');
    }
  }
} catch(err) {}

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

var loggedIn = userLoggedIn();
var icons = jQuery('#wpfm-floating-menu-nav ul li');
var profile = icons[2];
var signIn = icons[1];
var signOut = icons[icons.length - 1];
if (!loggedIn) {
  profile.style.display = "none";
  signOut.style.display = "none";
} else {
	signIn.style.display = "none";
}

try {
  var newParent = document.getElementsByClassName('event-description')[0];
  var oldParent = document.getElementsByClassName('display-posts-listing')[0];
  while (oldParent.childNodes.length > 0) {
      newParent.appendChild(oldParent.childNodes[0]);
  }
} catch(err) {}

if (jQuery(".member-item")[0]){
  var title = document.title.split(' | ')[0];
  var titlePlace = jQuery('.single-event-content')[0];
  
  var titleElement = document.createElement('h1');
  var titleText = document.createTextNode(title);
  titleElement.appendChild(titleText);
  titleElement.setAttribute('id', 'article-title');
  
  titlePlace.prepend(titleElement);
}

try{
var img = jQuery('.member-item .row .col-md-4 .content-pad .item-thumbnail')[0];
var parent = document.getElementById('member');
parent.insertBefore(img, parent.childNodes[0]);
} catch(err) {}
try {
  var title = document.getElementById('article-title').innerHTML;
  document.getElementById('article-title').innerHTML = title.split(' - ')[0]
} catch(err) {}

try {
  var list = document.getElementsByClassName('courses-list')[0];
  var listTitle = document.getElementsByClassName('h2')[0];
  var parent = document.getElementById('related');
  parent.insertBefore(list, parent.childNodes[0]);
  list.insertBefore(listTitle, list.childNodes[0]);
} catch(err) {}
