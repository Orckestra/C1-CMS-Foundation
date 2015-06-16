window.addEventListener('load', function () {
    window.setTimeout(function () {
        var element = document.getElementById('CompositeC1FunctionPreview');
        var gotIframes = element.getElementsByTagName('iframe').length > 0;

        setMaxWidthOnOverflows(element, '{$MAXWIDTH}');

        while (element != null && element != document.body) {
            strainghtenCssColumns(element);
            changeSiblingOpacity(element, '{$OPACITY}');  // the {$OPACITY} is replaced by c# at run time
            element = element.parentNode;
        }

        window.setTimeout(function () {
            finalize();
        }, (gotIframes ? 1000 : 0));
    }, 1);
});

function finalize() {
    setDebugMarkers();

    if (window.callPhantom != null)
        window.callPhantom('load');
}


/*
*  Change opacity on sibling elements, making the core rendering stand out
*/
function changeSiblingOpacity(element, opacityString) {
    sibling = element.parentNode.firstChild;
    while (sibling != null) {
        if (sibling != element && sibling.nodeType === 1 && sibling.className != 'DEVELOPERWARNING') sibling.style.opacity = opacityString;
        sibling = sibling.nextElementSibling || sibling.nextSibling
    }
}

/*
*  If an element is inside a 'column-count: (n)' zone this code with prevent column layout and make one single long slim column
*/
function strainghtenCssColumns(element) {
    if (window.getMatchedCSSRules == null) {
        var alarmAlarm = document.createElement('h1');
        alarmAlarm.className = 'DEVELOPERWARNING';
        alarmAlarm.style.color = 'pink';
        alarmAlarm.textContent = 'Yo debugging developer - CSS column-count detection/fix not applied - run this in Chrome/WebKit to get this feature.';
        document.body.appendChild(alarmAlarm);
        return;
    }
    var inColumns = false;
    var cssRules = window.getMatchedCSSRules(element);
    if (cssRules!=null) {
        for (i = 0; i < cssRules.length; i++)
            inColumns = inColumns || (cssRules[i].cssText.indexOf('column-count') != -1);
    }

    if (inColumns) {
        var newContainer = document.createElement('div');
        newContainer.style.display = 'inline-block';
        newContainer.style.width = '100%';
        while (element.childNodes.length > 0) {
            newContainer.appendChild(element.childNodes[0]);
        }
        element.appendChild(newContainer);
    }
}


/*
*  If an element has a width that exceed our maximum this function will set an explicit maximum width
*/
function setMaxWidthOnOverflows(element, maxWidth) {
    if (element == null || element.innerHTML == '') {
        return null;
    }

    var children = element.getElementsByTagName('*');
    if (children.lenght == 0) {
        return null;
    }

    for (i = 0; i < children.length; i++) {
        var childNode = children[i];

        var rect = childNode.getBoundingClientRect();
        if (rect.width > maxWidth) {
            childNode.style.maxWidth = maxWidth + 'px';
            childNode.style.width = 'auto';
        }
    }
}


// extracts the size of an element 
// - this is also used by renderingServer.js 
function getFunctionPreviewClientRect(previewElementId) {
    var element = document.getElementById(previewElementId);

    if (element == null || element.innerHTML == '') {
        return null;
    }

    var children = element.getElementsByTagName('*');
    if (children.lenght == 0) {
        return null;
    }

    var top, right, bottom, left, sizeSet = false;
    for (i = 0; i < children.length; i++) {
        var childNode = children[i];

        var rect = childNode.getBoundingClientRect();
        if (rect.width == 0 || rect.height == 0 || rect.bottom <= 0 || rect.right <= 0) {
            continue;
        }

        if (!sizeSet) {
            top = rect.top;
            right = rect.right;
            bottom = rect.bottom;
            left = rect.left;

            sizeSet = true;
        } else {
            top = top < rect.top ? top : rect.top;
            bottom = bottom > rect.bottom ? bottom : rect.bottom;
            left = left < rect.left ? left : rect.left;
            right = right > rect.right ? right : rect.right;
        }
    }

    // Checking is there's a child node that is a text node
    var childNodes = element.childNodes;
    for (var i = 0; childNode = childNodes[i]; i++) {
        if (childNode.toString() == '[object Text]' && childNode.nodeValue.trim() != '') {
            rect = element.getBoundingClientRect();

            if (rect.width == 0 || rect.height == 0 || rect.bottom <= 0 || rect.right <= 0) {
                continue;
            }

            if (!sizeSet) {
                top = rect.top;
                right = rect.right;
                bottom = rect.bottom;
                left = rect.left;

                sizeSet = true;
            } else {
                top = top < rect.top ? top : rect.top;
                bottom = bottom > rect.bottom ? bottom : rect.bottom;
                left = left < rect.left ? left : rect.left;
                right = right > rect.right ? right : rect.right;
            }

            break;
        }
    }

    if (!sizeSet) {
        return null;
    }

    return {
        left: left,
        top: top,
        height: bottom - top,
        width: right - left
    };
}

function setDebugMarkers() {
    var previewMarkerElement = document.getElementById('previewMarker');
    if (previewMarkerElement == null)
        return;
    var bounds = getFunctionPreviewClientRect('CompositeC1FunctionPreview');
    if (bounds != null) {
        document.body.insertBefore(previewMarkerElement, document.body.firstChild);
        previewMarkerElement.style.left = bounds.left + 'px';
        previewMarkerElement.style.top = bounds.top + 'px';
        previewMarkerElement.style.width = bounds.width + 'px';
        previewMarkerElement.style.height = bounds.height + 'px';
        previewMarkerElement.style.opacity = 0.5;
    }
}


window.previewJsInitialized = true;