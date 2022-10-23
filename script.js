let currentPath = '';
let tree = document.getElementById('Tree');

function openLink(link) {
    window.open(link, "_self");
}

function openPath(path) {
    let linksList = "", i=0;
    
    if(currentPath.length != 0)
        linksList += '<span onclick="backPath()"><code>⌫ - </code>back</span><br>';
    else linksList += '<span><code>★ </code> Startpage</span><br>'

    path.forEach(element => {
        let name = Object.keys(element);
        let link = element[name];

        if(typeof(link) == 'string')
            linksList += `<a href="${link}"><code>${i} - </code>${name}</a>`;
        else linksList += `<span onclick="newPath(${i});"><code>${i} - </code>${name}</span>`;
        i++;
    });

    tree.innerHTML = linksList;
}

function show_by_path(decimal) {
    [...decimal].forEach(element => {
        console.log(element)
    });
}

function parsePath(tree, s) {
    if(s.length == 0)
        openPath(tree);

    if(!tree)
        return;

    let c = parseInt(s[0]);

    if(!tree[c]) {
        if(currentPath.length >= 1)
            currentPath = currentPath.slice(0, -1);

        return;
    }

    let k = Object.keys(tree[c]);
    
    if(!tree[c][k])
        return;

    if(s.length == 1) {
        if(typeof(tree[c][k]) == 'string') {
            openLink(tree[c][k]);
        } else {
            openPath(tree[c][k]);
        }
        return;
    }

    if(typeof(tree[c][k]) != 'object') {
        if(currentPath.length >= 1)
            currentPath = currentPath.slice(0, -1);
        
        return;
    }
    
    parsePath(tree[c][k], s.slice(1));
}

function newPath(c) {
    currentPath += c;
    parsePath(links, currentPath);
}

function backPath() {
    if(currentPath.length >= 1)
        currentPath = currentPath.slice(0, -1);
    parsePath(links, currentPath);
}

const all_keys = ['Backspace', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
document.documentElement.addEventListener('keydown', (event) => {
    if(all_keys.includes(event.key)) {
        if(event.key == 'Backspace')
            backPath();
        else {
            newPath(event.key);
        }
    }
});

parsePath(links, currentPath);