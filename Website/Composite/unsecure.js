
if (document.location.protocol.toString() == "https:") {
    setTimeout(function () {
        document.location = document.location.toString().replace("unsecure.aspx", "top.aspx");
    }, 100);
} else {
    if (document.location.protocol.toString() == "http:") {
        var mySecureUrl = getMySecureUrl();
        var localWatermark = document.getElementById("watermark").getAttribute("content");
        document.write("<script type='text/javascript' src='" + mySecureUrl + "?jsprobe=true&watermark=" + encodeURIComponent(localWatermark) + "'></script>");
    }
}


window.onload = function () {
    document.body.className += " loaded";

    if (getParameterByName("fallback") == "true") {
        document.getElementById("splash").className += " fallbackallowed";

        setTimeout(function () {
            var start = document.getElementById("start");
            start.className += " active";
            start.onclick = function () {
                var adminPath = document.location.pathname.replace("unsecure.aspx", "");
                document.cookie = "avoidc1consolehttps=true; path=" + adminPath;
                var topUrl = document.location.toString().split("?")[0].replace("unsecure.aspx", "top.aspx");
                document.location = topUrl;
            }
        }, 2500);
    }
}


function getMySecureUrl() {
    var location = document.location;
    var customPort = getParameterByName("httpsport");

    var mySecureUrl = "https://" + location.hostname;

    if (customPort.length > 0) {
        mySecureUrl += ":" + parseInt(customPort, 10);
    }

    mySecureUrl += location.pathname;

    return mySecureUrl;
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}