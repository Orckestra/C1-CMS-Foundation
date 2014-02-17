function getFunctionPreviewClientRect(previewElementId) {
    var element = document.getElementById(previewElementId);

    if (element == null || element.innerHTML == "") {
        return null;
    }
				    
    var childNodes = element.getElementsByTagName('*');
    if (childNodes.lenght == 0) {
        return null;
    }

    var top, right, bottom, left, sizeSet = false;
    for (i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i]; 

        var rect = childNode.getBoundingClientRect();
        if (rect.width == 0 || rect.height == 0) {
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

function getPlaceholdersLocationInfo(placeholderElementName) {
    var ret = [];

    var placeholders = document.getElementsByTagName(placeholderElementName);
    for (i = 0; pl = placeholders[i]; i++) {
        var clientRect = pl.getBoundingClientRect();
        var placeholderInfoParts = [pl.id, clientRect.left, clientRect.top, clientRect.width, clientRect.height];
        ret.push(placeholderInfoParts.join(','));
    }
    return ret.join('|');
};

function BuildFunctionPreview(system, console, address, output, authCookie, mode) {
    var page = require('webpage').create();
    
	if(authCookie != null) {
		phantom.deleteCookie(authCookie.name);
		
		var cookieAdded = phantom.addCookie(authCookie);
		if(!cookieAdded) {
			// Adding the cookie header manually, if PhantomJs fails to add because of a custom domain name used (f.e. "local" instead of "localhost")
			page.customHeaders = { 'Cookie' : authCookie.name + '=' + authCookie.value };
		}
	}	
		


	if (mode == "templatePreview") {
	    var zoom = 0.2;
	    page.viewportSize = { width: 1280 * zoom, height: 600 };
	    page.zoomFactor = zoom;
	} else {
	    page.viewportSize = { width: 1280, height: 600 };
	}

	page.settings.resourceTimeout = 5000;
    
	page.onResourceTimeout = function (request) {
	    if (request.id == 1) {
	        console.log('ERROR: ' + JSON.stringify(request.errorString) + ', URL: ' + JSON.stringify(request.url));
	        
            phantom.exit();
	    }
	};
	
	page.open(address, function (status) {
		
		if (status !== 'success') {
			console.log('ERROR: ' + status);
			page.close();
			WaitForInput(system, console);
		} else {
		    // console.log('SUCCESS: Address loaded:' + address); // remove
		    window.setTimeout(function () {
		        if (mode == "functionPreview") {
		            var previewElementId = "CompositeC1FunctionPreview";

		            var clientRect = page.evaluate(getFunctionPreviewClientRect, previewElementId);

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
		            page.close();

		            console.log('SUCCESS: ' + address);
		        } else {
		            // Template preview:
		            var placeholdersInfo = page.evaluate(getPlaceholdersLocationInfo, 'placeholderpreview');
                    
		            page.render(output);
		            page.close();

		            console.log('templateInfo:' + placeholdersInfo);
		        }
				
				
				WaitForInput(system, console);
			}, 200);
		}
	});
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
	   
	   var parameters = line.split("|");
	   if(parameters.length == 4) {
	   
		  var cookieInfo = parameters[0];
		  var url = parameters[1];
		  var outputFilePath = parameters[2];
		  var mode = parameters[3];
		  
		  var cookie = null;
		  
		  if(cookieInfo != "") {
			var cookieInfoParts = cookieInfo.split(",");
			
			if(cookieInfoParts.length != 3) {
				console.log('Invalid cookie information, correct format is {name},{value},{domain}');
				continue;
			}
		
			cookie = {
				'name': cookieInfoParts[0],
				'value': cookieInfoParts[1],
				'domain': cookieInfoParts[2],
				'path': '/',
				'httponly': true,
				'secure':   false,
				'expires':  (new Date()).getTime() + (1000 * 60 * 60)
			};
		  }
		  		  	   
		  BuildFunctionPreview(system, console, url, outputFilePath, cookie, mode);
		  return;
	   }
	   else {
		  console.log('Usage: {Authentication cookie information}|{url}|{out put file name}. Where {Authentication cookie information} = {name},{value},{domain}');
	   }
   }
}

WaitForInput(system, console);