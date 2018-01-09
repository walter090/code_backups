document.getElementsByClassName('widget-title')[0].innerHTML = 'Upcoming Events';

var sidebar = document.getElementsByClassName('sidebar')[0];
var sidebarInner = jQuery("[method=post]")[0];
var newInner = document.createElement('div');
newInner.classList.add('events-wrapper');
newInner.appendChild(sidebarInner.cloneNode(true));
sidebar.replaceChild(newInner, sidebarInner);

var widget = document.getElementsByClassName('events-wrapper')[0];
var ps = widget.getElementsByTagName('p');
var psObjs = [];
var i = 0;
for (i = 0; i < ps.length; i ++) {
	ps[i].innerHTML = ps[i].innerHTML.replace('(Africa/Accra)', 'UTC<br>');
	textOnly = ps[i].innerHTML.split('UTC')[0] + 'UTC';
	psObjs.push({time: Date.parse(textOnly),
		     text: ps[i].innerHTML});
}

psObjs.sort(function(a, b) {
	if (a.time < b.time) {
		return -1;
	}
	if (a.time > b.time) {
		return 1;
	}
	return 0;
});

for(i = 0; i < psObjs.length; i ++) {
	ps[i].innerHTML = psObjs[i].text;
}

