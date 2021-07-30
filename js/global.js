/*globals addLoadEvent*/
/*globals insertAfter*/
/*globals addClass*/

function highlightPage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementsByTagName) { return false; }

    let list = document.getElementById('hearder-nav-list');
    if (!list) { return false; }

    let arr = list.getElementsByTagName('a');
    if (!arr) { return false; }

    let url = window.location.href;
    for (let a of arr) {
        if (url.indexOf(a.href) > -1) {
            addClass(a, 'here');
            document.body.id = a.innerHTML.toLocaleLowerCase();
        }
    }
}

addLoadEvent(highlightPage);
