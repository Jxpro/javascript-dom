/*globals addLoadEvent*/
/*globals insertAfter*/
/*globals addClass*/

function highlightPage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementsByTagName) { return false; }

    let nav = document.getElementById('hearder-nav-list');
    if (!nav) { return false; }

    let list = nav.getElementsByTagName('a');
    if (!list) { return false; }

    let url = window.location.href;
    for (let a of list) {
        if (url.indexOf(a.href) > -1) {
            addClass(a, 'here');
            document.body.id = a.innerHTML.toLocaleLowerCase();
        }
    }
}

function prepareSlideshow() {
    if (!document.getElementById) { return false; }
    if (!document.createElement) { return false; }

    let intro = document.getElementById('intro');
    if (!intro) { return false; }

    let slideshow = document.createElement('div');
    let arr = intro.getElementsByTagName('a');
    slideshow.id = 'slideshow';
    insertAfter(slideshow, intro);

    for (let a of arr) {
        // console.log(a.href);
        // console.log(a.getAttribute('href'));
        // a.href = a.getAttribute('href');
        a.onmouseover = function () {
            switch (this.getAttribute('href')) {
                case 'index.html':
                    slideshow.style.backgroundPositionX = 0;
                    break;
                case 'about.html':
                    slideshow.style.backgroundPositionX = '-150px';
                    break;
                case 'photos.html':
                    slideshow.style.backgroundPositionX = '-300px';
                    break;
                case 'live.html':
                    slideshow.style.backgroundPositionX = '-450px';
                    break;
                case 'contact.html':
                    slideshow.style.backgroundPositionX = '-600px';
                    break;
            }
        };
    }
}

function showSection(id) {
    let section = document.getElementsByTagName('section');
    for (let sec of section) {
        sec.style.display = sec.id === id ? 'block' : 'none';
    }
}

function prepareInternalnav() {
    if (!document.getElementById) { return false; }
    let nav = document.getElementById('about-nav-list');
    let list = nav.getElementsByTagName('a');

    for (let a of list) {
        let secid = a.href.split('#')[1];
        let sec = document.getElementById(secid);
        if (!sec) { continue; }
        a.secid = secid;
        sec.style.display = 'none';
        a.onclick = function () {
            showSection(this.secid);
            return false;
        };
    }

}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
