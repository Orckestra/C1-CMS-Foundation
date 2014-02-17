var hdc;

function byId(e) { return document.getElementById(e); }

function drawPoly(coOrdStr) {
    var mCoords = coOrdStr.split(',');
    var i, n;
    n = mCoords.length;

    hdc.beginPath();
    hdc.moveTo(mCoords[0], mCoords[1]);
    for (i = 2; i < n; i += 2) {
        hdc.lineTo(mCoords[i], mCoords[i + 1]);
    }
    hdc.lineTo(mCoords[0], mCoords[1]);
    hdc.stroke();
}

function drawRect(coOrdStr) {
    var mCoords = coOrdStr.split(',');
    var top, left, bot, right;
    left = mCoords[0];
    top = mCoords[1];
    right = mCoords[2];
    bot = mCoords[3];
    hdc.strokeRect(left, top, right - left, bot - top);
}

function myHover(element) {
    // var hoveredElement = element;
    var coordStr = element.getAttribute('coords');
    var areaType = element.getAttribute('shape');

    switch (areaType) {
        case 'polygon':
        case 'poly':
            drawPoly(coordStr);
            break;

        case 'rect':
            drawRect(coordStr);
    }
}

function myLeave() {
    var canvas = byId('myCanvas');
    hdc.clearRect(0, 0, canvas.width, canvas.height);
}

function CanvasInit(imageElementId) {
    // get the target image
    var img = byId(imageElementId);

    var x, y, w, h;

    // get it's position and width+height
    x = img.offsetLeft;
    y = img.offsetTop;
    w = img.clientWidth;
    h = img.clientHeight;

    // move the canvas, so it's contained by the same parent as the image
    var imgParent = img.parentNode;
    var can = byId('myCanvas');
    imgParent.appendChild(can);

    // place the canvas in front of the image
    can.style.zIndex = 1;

    // position it over the image
    can.style.left = x + 'px';
    can.style.top = y + 'px';

    // make same size as the image
    can.setAttribute('width', w + 'px');
    can.setAttribute('height', h + 'px');

    // get it's context
    hdc = can.getContext('2d');

    // set the 'default' values for the colour/width of fill/stroke operations
    hdc.fillStyle = 'red';
    hdc.strokeStyle = 'red';
    hdc.lineWidth = 2;
}