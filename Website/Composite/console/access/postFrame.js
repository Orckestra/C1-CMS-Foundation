// Finds an object in the outer console application.
// Will throw if no such application exists (i.e. top === undefined)
function getApplicationObject(path) {
	path = path.split('.');
	return getInObject(top, path);
}

// Provides Immutable.Iterator#getIn() functionality for ordnary JS objects.
function getInObject(obj, path) {
	let name = path.shift();
	if (obj[name]) {
		if (path.length) {
			return getInObject(obj[name], path);
		} else {
			return obj[name];
		}
	} else {
		return null;
	}
}

/** Somewhat hacky shim to communicate with old UI outside an iframe hosting this app.
 XXX: DEPRECATED AT START OF LIFE - do not use this unless you have to.
 FIXME: Hardcoded to return function markup, needs to be more general
*/
export default function outerFrameCallback(provider, obj) {
	if (top && top.Application) {
		var target = {
			response: getApplicationObject(provider.response)
		};
		let markup = provider.markup && getInObject(obj, provider.markup);
		if (markup) {
			target.result = {
				FunctionMarkup: markup,
				RequireConfiguration: true
			};
		}
		var action = new top.Action(target, getApplicationObject(provider.action));
		top.UserInterface.getBinding(window.frameElement.parentNode).dispatchAction(action);
		return Promise.resolve();
	} else {
		return Promise.reject(new Error('PostFrame protocol failed: No outer frame console application found'));
	}
}
