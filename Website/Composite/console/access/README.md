# Access systems

The source files in this folder represent access points (usually) to the server. Three forms are currently supported, WAMP, JSON-over-HTTP requests, and calls to an external instance of the old UI. All of these access points are structured to return a promise, which will resolve with received data or reject with error depending on success or failure of the call.

`wampClient.js` provides a client for calling RPCs and subcribing to topics on a WAMP router. It also provides the hook point for the mock-data RPCs found in `console/mocks/`. `wampTest.js` has test code that ensures the router can be reached, and which renders an error message if it cannot.

`requestJSON.js` gives the ability to send a GET or POST request to an HTTP server. It will parse a returned JSON string into data, and retry after a wait if requested to by the server.

`postFrame.js` is a shim to provide the means of communicating from inside an iframe with a surrounding old C1 console. It does this by accessing the event system of the exterior application, and dispatching an action on it. No response is expected or supported.
