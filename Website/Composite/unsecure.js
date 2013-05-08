
if (document.location.protocol.toString() == "https:") {
    setTimeout(function () {
        document.location = document.location.toString().replace("unsecure.aspx", "top.aspx");
    }, 250);
} else {
    if (document.location.protocol.toString() == "http:") {
        var mySecuredUrl = document.location.toString().replace("http:", "https:");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", mySecuredUrl, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var localWatermark = document.getElementById("watermark").getAttribute("content");
                if (xmlHttp.responseText.indexOf(localWatermark) > -1) {
                    document.location = mySecuredUrl.replace("unsecure.aspx", "top.aspx");
                }
            }
        };
        xmlHttp.send(null);
    }
}

window.onload = function () {
    if (location.search.indexOf("fallback=true") > -1) {
        document.getElementById("splash").className += " fallbackallowed";

        setTimeout(function () {
            var start = document.getElementById("start");
            start.className += " active";
            start.onclick = function () {
                var adminPath = document.location.pathname.replace("unsecure.aspx", "");
                document.cookie = "avoidc1consolehttps=true; path=" + adminPath;
                document.location = document.location.toString().replace("unsecure.aspx", "top.aspx");
            }
        }, 2500);
    }
}
