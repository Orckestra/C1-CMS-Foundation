function BuildFunctionPreview(system, console, address, output, authCookie) {
    var page = require('webpage').create();
    
	if(authCookie != null) {
		phantom.deleteCookie(authCookie.name);
		
		var cookieAdded = phantom.addCookie(authCookie);
		if(!cookieAdded) {
			// Adding the cookie header manually, if PhantomJs fails to add because of a custom domain name used (f.e. "local" instead of "localhost")
			page.customHeaders = { 'Cookie' : authCookie.name + '=' + authCookie.value };
		}
	}	
		
	page.viewportSize = { width: 1000, height: 600 };
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
				var previewElementId = "CompositeC1FunctionPreview";

				var elementExists = page.evaluate(function (s) {
				    var element = document.getElementById(s);

				    return element != null && element.innerHTML != "";
				}, previewElementId);
				
				if (elementExists) {
				    var clientRect = page.evaluate(function(s) {
				        return document.getElementById(s).getBoundingClientRect();
				    }, previewElementId);

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
	   if(parameters.length == 3) {
	   
		  var cookieInfo = parameters[0];
		  var url = parameters[1];
		  var outputFilePath = parameters[2];
		  
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
		  		  	   
		  BuildFunctionPreview(system, console, url, outputFilePath, cookie);
		  return;
	   }
	   else {
		  console.log('Usage: {Authentication cookie information}|{url}|{out put file name}. Where {Authentication cookie information} = {name},{value},{domain}');
	   }
   }
}

WaitForInput(system, console);