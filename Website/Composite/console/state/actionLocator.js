/**
	This registry is currently very simple, but does the job. Verification of
	stored objects (i.e. ensure functions, etc.) is not present, and neither is
	protection from overwriting. Some additional work is definitely warranted
	here, but for the initial phase, this should be sufficient.
*/
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
