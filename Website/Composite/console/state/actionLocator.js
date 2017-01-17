const library = {};

function registerActionCreator(name, func) {
	library[name] = func;
}

function getActionCreator(name) {
	return library[name];
}

export default {
	register: registerActionCreator,
	get: getActionCreator
};
