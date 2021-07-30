/*globals addLoadEvent*/
/*globals insertAfter*/
/*globals addClass*/

function highlightPage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementsByTagName) { return false; }

    let nav = document.getElementById('hearder-nav-list');
    if (!nav) { return false; }

    let list = nav.getElementsByTagName('a');
    if (!list.length) { return false; }

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
    let arr = document.getElementsByTagName('a');
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
    if (!nav) { return false; }
    let list = nav.getElementsByTagName('a');

    for (let a of list) {
        let secid = a.href.split('#')[1];
        let sec = document.getElementById(secid);
        if (!sec) { continue; }
        a.secid = secid;
        // a.setAttribute('secid', secid);
        // console.log(a.secid);
        sec.style.display = 'none';
        a.onclick = function () {
            showSection(this.secid);
            return false;
        };
    }

}


function showPic(witchPic) {
    let placeholder = document.getElementById('placeholder');
    let description = document.getElementById('description');

    if (!placeholder) { return false; }
    placeholder.src = witchPic.getAttribute('href');

    if (description) {
        let text = witchPic.title;
        description.firstChild.nodeValue = text;
    }
    return true;
}

function preGallery() {
    if (!document.getElementsByTagName) { return false; }
    if (!document.getElementById) { return false; }

    let galley = document.getElementById('imagegallery');
    if (galley) {
        let links = galley.getElementsByTagName('a');
        for (let i of links) {
            i.onclick = function () { return !showPic(this); };
            // i.setAttribute('onclick', ' return !showPic(this); ');
        }
    } else { return false; }
}

function prePlaceHolder() {
    if (!document.getElementById) { return false; }
    if (!document.createElement) { return false; }
    if (!document.createTextNode) { return false; }

    let target = document.getElementById('imagegallery');
    if (!target) { return false; }

    let imgNode = document.createElement('img');
    imgNode.id = 'placeholder';
    imgNode.src = './src/img/placeholder.gif';
    imgNode.alt = 'My Image Galley';
    // imgNode.height = 520; // 520px => 0
    // imgNode.style.height = '520px';
    imgNode.setAttribute('width', '475px');

    let pNode = document.createElement('p');
    pNode.id = 'description';
    let text = document.createTextNode('Choose an image');
    pNode.appendChild(text);

    insertAfter(pNode, target);
    insertAfter(imgNode, pNode);
}

function displayAbbreviations() {
    if (!document.getElementById) { return false; }
    if (!document.createElement) { return false; }
    if (!document.createTextNode) { return false; }
    let abbr = document.getElementsByTagName('abbr');
    if (!abbr.length) { return false; }

    let defs = [];
    for (let a of abbr) {
        if (!a.childNodes.length) { continue; }
        defs[a.innerHTML] = a.title;
    }

    let dlist = document.createElement('dl');
    for (let key in defs) {
        let dt = document.createElement('dt');
        let dt_text = document.createTextNode(key);
        dt.appendChild(dt_text);
        let dd = document.createElement('dd');
        let dd_text = document.createTextNode(defs[key]);
        dd.appendChild(dd_text);
        dlist.appendChild(dt);
        dlist.appendChild(dd);
    }
    if (!dlist.childNodes.length) { return false; }

    let header = document.createElement('h3');
    let header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);

    let article = document.getElementsByTagName('article')[0];
    if (!article) { return false; }

    article.appendChild(header);
    article.appendChild(dlist);
}

function resetFields(whichForm) {
    for (let f of whichForm) {
        if (f.type === 'submit') { continue; }
        let text = f.placeholder;
        if (!text) { continue; }
        f.onfocus = function () {
            if (this.value === text) {
                this.value = '';
                this.className = '';
            }
        };
        f.onblur = function () {
            if (this.value === '') {
                this.value = text;
                this.className = 'placeholder';
            }
        };
        f.onblur();
    }
}

function prepareForms() {
    for (let form of document.forms) {
        resetFields(form);
        form.onsubmit = function () {
            return submitFormWithAjax(this, document.getElementsByTagName('article')[0]) ? false : true;
        };
    }
}

function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    let content = document.createElement('img');
    content.src = './src/img/loading.gif';
    content.alt = 'loading';
    content.setAttribute('width', '50px');
    element.appendChild(content);
}

function submitFormWithAjax(whichForm, target) {
    let xhr = new XMLHttpRequest();
    if (!xhr) { return false; }
    displayAjaxLoading(target);
    xhr.open('GET', whichForm.action);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // console.log(this);
            if (xhr.status === 200) {
                let matches = xhr.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches) {
                    target.innerHTML = matches[1];
                } else {
                    target.innerHTML = '<p>Oops, there was an error</p>';
                }
            } else {
                target.innerHTML = '<p>' + xhr.statusText + '</p>';
            }
        }
    };
    xhr.send();
    return true;
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prePlaceHolder);
addLoadEvent(preGallery);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareForms);
