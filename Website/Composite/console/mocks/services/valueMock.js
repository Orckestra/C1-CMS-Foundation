const values = {
	'edit-language': {
		'edit-language.form.properties.url-mapping-name': 'en'
	},
	'other-page': {
		'other-page.form.properties.url-mapping-name': 'en',
		'other-page.form.properties.pimp-my-select': null,
		'other-page.form.properties.check-one': true,
		'other-page.form.properties.check-three': true
	}
};

export function valueFetcher(pageName) {
	return values[pageName];
}
export function valuePutter(pageName, values) {
	console.log('Saved values', pageName, values); // eslint-disable-line no-console
}
