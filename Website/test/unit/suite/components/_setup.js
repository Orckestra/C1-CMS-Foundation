import unexpectedReact from 'unexpected-react';

beforeEach(() => {
	unexpectedReact.clearAll();
	while (document.body.lastChild) {
		document.body.removeChild(document.body.lastChild);
	}
});
