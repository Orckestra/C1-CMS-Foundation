export function getBaseUrl() {

	let baseUrlMatches = /^.*?(?=\/Composite\/)/gi.exec(location.pathname);
	let baseUrl = baseUrlMatches == null ? '' : baseUrlMatches[0];
	return baseUrl;
}

export function handleLinkClick(e) {
	if (top && top.Client && top.Client.isAnyExplorer) { 
		e.preventDefault();
		let link = e.target;
		if (link.target == '_top' && link.href.indexOf('#') > 1) {
			top.location.href = link.href;
		}
	}
}