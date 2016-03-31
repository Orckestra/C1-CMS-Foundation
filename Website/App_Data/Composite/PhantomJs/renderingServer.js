var page = require('webpage').create();

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
		
    if (mode == "test") {
    	page.viewportSize = { width: 320, height: 200 };
    	page.clipRect = { top: 0, left: 0, height: 320, width: 200 };
    } else {
    	page.viewportSize = { width: 1920, height: 600 };
    }

    page.settings.resourceTimeout = 30000;
    
	page.onResourceTimeout = function (request) {
	    if (request.id == 1) {
	        clearGlobalTimeout();

	        var errorMessage = 'TIMEOUT: page.onResourceTimeout: ' + JSON.stringify(request.errorString) + ', URL: ' + JSON.stringify(request.url);

	        console.log(errorMessage);
	        WaitForInput(system, console);
	    }
	};

    // if js errors happen on the page 
	page.onError = function (msg, trace) {
		// ignore in page js errors - some dev writing sloppy js, should not affect us
	}

	page.onResourceError = function (resourceError) {
		page.fail_reason = "Error opening url '" + resourceError.url + "'; Error code: " + resourceError.errorCode + ". Description: " + resourceError.errorString;
	};

    // redirects ...
	page.onResourceReceived = function (response) {
	    if (response.id == 1) {
	        var closePage = false;

	        if (response.status == 301 || response.status == 302) {
	            console.log('REDIRECT: ' + response.url);
	            closePage = true;
	        }

            if (response.status >= 400) {
                var description  = 'HTTP Status-Code ' + response.status + '.';

                if (response.status == 500) {
                    description = '500 Internal Server Error.';
                }
                else if (response.status == 503) {
                    description = '503 Service Unavailable.';
                }

                console.log('ERROR: ' + description);

                closePage = true;
            }

	        if (closePage) {
	            clearGlobalTimeout();
	            WaitForInput(system, console);
	        }
	    }
	}

    // called by our custom js injected in the rendered page
	page.onCallback = function (data) {
	    clearGlobalTimeout();

	    if (mode == "function") {
	        var previewElementId = "CompositeC1FunctionPreview";

	        var clientRect = page.evaluate("getFunctionPreviewClientRect", previewElementId);

	        if (clientRect != null && clientRect.height > 1 && clientRect.width > 1) {

	            // Limiting image height
	            if (clientRect.height > 800) {
	                clientRect.height = 800;
	            }
	            page.clipRect = clientRect;
	        } else {
	            // Rendering an empty spot
	            page.clipRect = { top: 0, left: 0, height: 1, width: 1 };
	        }

	        page.render(output);

	        console.log('SUCCESS: ' + address);
	    } else if (mode == "template") {
	        // Template preview:
	        var placeholdersInfo = page.evaluate(getPlaceholdersLocationInfo, 'placeholderpreview');

	        page.render(output);

	        console.log('templateInfo:' + placeholdersInfo);
	    } else {
	        page.render(output);

	        console.log('SUCCESS');
	    }

	    WaitForInput(system, console);
	};

    try {
        page.open(address, function (status) {
            if (status !== 'success') {
                clearGlobalTimeout();
            	console.log('ERROR, page.open: ' + status 
					+ "; " + page.fail_reason);

                WaitForInput(system, console);
            } else {
                if (mode === "test") {
                    clearGlobalTimeout();

                    page.render(output);

                    console.log('SUCCESS');

                    WaitForInput(system, console);
                } else {
                    var previewJsExecuted = page.evaluate(function () {
                        return window.previewJsInitialized == true;
                    });

                    // If "preview.js" isn't inserted, closing the page, as the default callback will not be called
                    if (!previewJsExecuted) {
                        clearGlobalTimeout();

                        console.log('ERROR: preview.js script is not present in the response body');

                        WaitForInput(system, console);
                    }
                }
            }
        });
    } finally {
        var timeoutInSeconds = 60;

        globalTimeout = setTimeout(function () {
            console.log("TIMEOUT: Max execution time - " + timeoutInSeconds + " seconds - exceeded");
            globalTimeout = null;
            WaitForInput(system, console);
        }, timeoutInSeconds * 1000);
    }
}

var system = require('system');

function WaitForInput(system, console) {
	while(true) {
	   var line = system.stdin.readLine();
	   if(line == "exit") 
	   {
			phantom.exit(0);
			return;
	   }

	   var parameters = line.split(";");
	   if(parameters.length == 4) {
	   
		  var cookieInfo = parameters[0];
		  var url = parameters[1];
		  var outputFilePath = parameters[2];
		  var mode = parameters[3];
		  
		  var cookies = null;

		  if(cookieInfo !== "") {
			var cookieInfoParts = cookieInfo.split(",");
			
			if(cookieInfoParts.length % 3 !== 0) {
				console.log('Invalid cookie information, correct format is {name},{value},{domain}[,{name},{value},{domain}]*');
				continue;
			}
		
			cookies = [];
			for (var i = 0; i < cookieInfoParts.length / 3; i++) {
				var cookie = {
					'name': cookieInfoParts[i*3],
					'value': cookieInfoParts[i * 3 + 1],
					'domain': cookieInfoParts[i * 3 + 2],
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
	   	console.log('Usage: {Authentication cookie information};{url};{out put file name};{mode}. Where {Authentication cookie information} = {name},{value},{domain}[,{name},{value},{domain}]*');
	   }
   }
}

WaitForInput(system, console);