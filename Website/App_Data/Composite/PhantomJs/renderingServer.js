var page = require('webpage').create();

function WriteSuccess(console) {
	console.log("SUCCESS");
}

function WriteError(console, message) {
	console.log("ERROR: " + message);
}

function WriteTimeout(console, message) {
	console.log("TIMEOUT: " + message);
}

function WriteRedirect(console, location) {
	console.log("REDIRECT: " + location);
}

function WriteEndOfReply(console) {
	console.log("END_OF_REPLY");
}

function getPlaceholdersLocationInfo(placeholderElementName) {
    var ret = [];

    var placeholders = document.getElementsByTagName(placeholderElementName);
    for (i = 0; pl = placeholders[i]; i++) {
        var clientRect = pl.getBoundingClientRect();
        var placeholderInfoParts = [pl.id.substring(3), clientRect.left, clientRect.top, clientRect.width, clientRect.height];
        ret.push(placeholderInfoParts.join(','));
    }
    return ret.join('|');
};

function BuildFunctionPreview(system, console, address, output, cookies, mode) {
    var globalTimeout = null;

    var clearGlobalTimeout = function() {
        if (globalTimeout != null) {
            clearTimeout(globalTimeout);
            globalTimeout = null;
        }
    };

	// Sends "END_OF_REQUESTS" message and runs the message loop
	var endRequest = function() {
		clearGlobalTimeout();
		WriteEndOfReply(console);
		WaitForInput(system, console);
	}

    if (cookies != null) {
	    var customCookieHeader = null;

	    for (var i = 0; i < cookies.length; i++) {
		    var cookie = cookies[i];

			phantom.deleteCookie(cookie.name);

			var cookieAdded = phantom.addCookie(cookie);
			if (!cookieAdded) {

				var cookieString = cookie.name + '=' + cookie.value;
				if (customCookieHeader == null) {
					customCookieHeader = cookieString;
				} 
				else {
					customCookieHeader += "; " + cookieString;
				}
			}
		}
    	
		if (customCookieHeader != null) {
			// Adding the cookie header manually, if PhantomJs fails to add because of a custom domain name used (f.e. "local" instead of "localhost")
			page.customHeaders = { 'Cookie': customCookieHeader };
		}
	}	
		
    if (mode === "test") {
    	page.viewportSize = { width: 320, height: 200 };
    	page.clipRect = { top: 0, left: 0, height: 320, width: 200 };
    } else {
    	page.viewportSize = { width: 1920, height: 600 };
    }

    page.settings.resourceTimeout = 30000;

	page.onUrlChanged = function (targetUrl) {
		if (page.preview_url !== targetUrl) {
			WriteRedirect(console, targetUrl);

			endRequest();
		}
	};

	page.onResourceTimeout = function (request) {
	    if (request.id === 1) {
			WriteTimeout(console, "page.onResourceTimeout: " + JSON.stringify(request.errorString) + ", URL: " + JSON.stringify(request.url));

			endRequest();
	    }
	};

    // if js errors happen on the page 
	page.onError = function (msg, trace) {
		// ignore in page js errors - some dev writing sloppy js, should not affect us
	}

	page.onResourceError = function (resourceError) {
		console.log("page.onResourceError: url '" + resourceError.url + "'; Error code: " + resourceError.errorCode + ". Description: " + resourceError.errorString);
	};

	page.onResourceReceived = function (response) {
		console.log("Resource received. Id: " + response.id + " status = " + response.status + " url = " + request.url);
	    if (response.id === 1) {
	        var closePage = false;

	        if (response.status === 301 || response.status === 302) {
		        WriteRedirect(console, response.url);
	            closePage = true;
	        }

            if (response.status >= 400) {
                var description  = "HTTP Status-Code " + response.status + ".";

                if (response.status === 500) {
                    description = "500 Internal Server Error.";
                }
                else if (response.status === 503) {
                    description = "503 Service Unavailable.";
                }

	            WriteError(console, description);

                closePage = true;
            }

	        if (closePage) {
				endRequest();
	        }
	    }
	}

    // called by our custom js injected in the rendered page
	page.onCallback = function (data) {
	    clearGlobalTimeout();

	    if (mode === "function") {
	        var previewElementId = "CompositeC1FunctionPreview";

	        var clientRect = page.evaluate("getFunctionPreviewClientRect", previewElementId);

	        if (clientRect != null && clientRect.height > 1 && clientRect.width > 1) {

	            // Limiting image height
	            if (clientRect.height > 800) {
	                clientRect.height = 800;
	            }
	            page.clipRect = clientRect;
	        } else {
		        console.log("warn: clientRect is empty, redering a 1x1 image. " + JSON.stringify(clientRect));

	            // Rendering an empty spot
	            page.clipRect = { top: 0, left: 0, height: 1, width: 1 };
	        }

	        page.render(output);

		    WriteSuccess(console);
	    } else if (mode === "template") {
	        // Template preview:
	        var placeholdersInfo = page.evaluate(getPlaceholdersLocationInfo, "placeholderpreview");

	        page.render(output);

	        console.log('templateInfo:' + placeholdersInfo); // TODO: pass placeholders info as JSON
	        WriteSuccess(console);
	    } else {
	        page.render(output);

	        WriteSuccess(console);
	    }

		endRequest();
	};

	try {
		console.log("Opening url: " + address);

		page.preview_url = address;
        page.open(address, function (status) {
            if (status !== "success") {
            	WriteError("page.open(), status=" + status);

                endRequest();
            } else {
                if (mode === "test") {
                	page.render(output);

                	WriteSuccess(console);

	                endRequest();
                } else {
                    var previewJsExecuted = page.evaluate(function () {
                        return window.previewJsInitialized === true;
                    });

                    // If "preview.js" isn't inserted, closing the page, as the default callback will not be called
                    if (!previewJsExecuted) {
                        WriteError(console, "preview.js script is not present in the response body");

	                    endRequest();
                    }
                }
            }
        });
    } finally {
        var timeoutInSeconds = 60;

        globalTimeout = setTimeout(function () {
        	globalTimeout = null;
        	WriteTimeout(console, "Max execution time - " + timeoutInSeconds + " seconds - exceeded");

	        endRequest();
        }, timeoutInSeconds * 1000);
    }
}

var system = require('system');

function WaitForInput(system, console) {
	while (true) {
		var line = system.stdin.readLine();
		if (line === "exit") {
			phantom.exit(0);
			return;
		}

		var request = JSON.parse(line);
		if (request.mode) {

			var mode = request.mode;
			var url = request.url;
			var outputFilePath = request.outputFilePath;
			var cookieInfo = request.cookies;

			var cookies = null;

			if (cookieInfo != null) {

				cookies = [];
				for (var i = 0; i < cookieInfo.length; i++) {
					var cookie = {
						'name': cookieInfo[i].name,
						'value': cookieInfo[i].value,
						'domain': cookieInfo[i].value,
						'path': '/',
						'httponly': true,
						'secure': false,
						'expires': (new Date()).getTime() + (1000 * 60 * 60)
					};

					cookies.push(cookie);
				}
			}

			BuildFunctionPreview(system, console, url, outputFilePath, cookies, mode);
			return;
		}
		else {
			console.log('Usage: {mode: "...", url: "...", ...}');
		}
	}
}

WaitForInput(system, console);