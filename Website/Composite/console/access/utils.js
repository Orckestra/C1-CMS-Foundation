export function getBaseUrl() {

	let baseUrlMatches = /^.*?(?=\/Composite\/)/gi.exec(location.pathname);
	let baseUrl = baseUrlMatches == null ? "" : baseUrlMatches[0];
	return baseUrl;
}
