// import React from 'react';
// import UnexpectedHtmlLike from 'unexpected-htmllike';
// import ReactElementAdapter from 'unexpected-htmllike-jsx-adapter';

// const reactElementAdapter = new ReactElementAdapter({ convertToString: true, concatTextContent: true });
// const htmlLikeReactElement = UnexpectedHtmlLike(reactElementAdapter);

export default function (expect) {
	expect.addType({
		name: 'StyledReactElement',
		base: 'ReactElement',
		identify: function (value) {
			return this.baseType.identify(value) &&
				value.type &&
				/^styled\b/.test(value.type.displayName);
				// && (console.log('SC:', value.type.target, value.type.rules.length) || true);
		},
		equal: function (a, b, equal) {
			// console.log('comparing SCs');
			return this.baseType.equal(a, b, equal) &&
				Array.equals(a.type.rules, b.type.rules);// &&
				// (console.log('match') || true);
		}
		// inspect(value, depth, output, inspect) {
		// 	return htmlLikeReactElement.inspect(value, depth, output, inspect);
		// }

	});
}
