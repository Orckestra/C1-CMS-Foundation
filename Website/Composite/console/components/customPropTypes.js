import Immutable from 'immutable';

function getError(propName, componentName, expectedType) {
	let expected = '';
	if (expectedType) {
		if (/^[aeiouAEIOU]/.test(expectedType)) {
			expected = ', expected an ' + expectedType;
		} else {
			expected = ', expected a ' + expectedType;
		}
	}
	return new Error(
		'Invalid prop `' + propName + '` supplied to' +
		' `' + componentName + '`' + expected + '.'
	);
}
const immutableListRequired = (props, propName, componentName) => {
	if (!Immutable.List.isList(props[propName])) {
		return getError(propName, componentName, 'Immutable.List');
	}
};
export const immutableList = (props, propName, componentName) => {
	if (props[propName]) {
		return immutableListRequired(props, propName, componentName);
	}
};
immutableList.isRequired = immutableListRequired;
