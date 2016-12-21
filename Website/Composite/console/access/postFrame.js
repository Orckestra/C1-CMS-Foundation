/** Converts a JS object to a string containing XHTML markup
 @-prefixed members will be treated as attributes.
 */
export function objectToMarkupString(obj, tagName) {
	return objectToMarkupStringWithDepth(obj, tagName, '');
}

function objectToMarkupStringWithDepth(obj, tagName, depth) {
	let names = Object.keys(obj);
	let attributeString = names.filter(name => /^@/.test(name)).reduce((attribs, name) => {
		let value = obj[name];
		return attribs + ' ' + name.replace(/^@/, '') + '="' + value + '"';
	}, '');
	let childTags = names.filter(name => /^[^@]/.test(name)).map(name =>
		objectToMarkupStringWithDepth(obj[name], name, depth + '  '));
	if (childTags.length) {
		return depth + '<' + tagName + attributeString + '>\n' + childTags.join('') + depth + '</' + tagName + '>\n';
	} else {
		return depth + '<' + tagName + attributeString + '/>\n';
	}
}

// Finds an object in the outer console application.
// Will throw if no such application exists (i.e. top === undefined)
function getObject(path) {
	path = path.split('.');
	let parent = top;
	let obj = null;
	path.forEach((name, index) => {
		if (index < path.length - 1) {
			parent = parent[name];
		} else {
			obj = parent[name];
		}
	});
	return obj;
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
			response: getObject(provider.response)
		};
		let markup = provider.markup && getInObject(obj, [].concat(provider.markup));
		if (markup) {
			target.result = {
				FunctionMarkup: objectToMarkupString(markup, provider.markup.pop()),
				RequireConfiguration: true
			};
		}
		var action = new top.Action(target, getObject(provider.action));
		top.UserInterface.getBinding(window.frameElement.parentNode).dispatchAction(action);
		return Promise.resolve();
	} else {
		return Promise.reject(new Error('PostFrame protocol failed: No outer frame console application found'));
	}
}
