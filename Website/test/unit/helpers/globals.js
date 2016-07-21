import unexpectedReact from 'unexpected-react';

export default {
	view: {
		// Ensure React is cleaned up between each test
		beforeEach: () => unexpectedReact.clearAll()
	}
};
