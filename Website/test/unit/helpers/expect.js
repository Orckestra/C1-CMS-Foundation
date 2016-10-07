import 'unittest/helpers/emulateDom.js';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';
import unexpectedDom from 'unexpected-dom';
import unexpectedMitm from 'unexpected-mitm';
import unexpectedZurvan from 'unexpected-zurvan';
import unexpectedImmutable from 'unexpected-immutable';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';

// define our instance of the `expect` function to use
const expect = unexpected.clone()
	.use(unexpectedDom)
	.use(unexpectedMitm)
	.use(unexpectedZurvan)
	.use(unexpectedReact)
	.use(unexpectedImmutable)
	.use(unexpectedSinon);


// Custom assertions
expect.addAssertion('<RenderedReactElement> finding DOM tag <string> <assertion?>', function (expect, subject, tagName) {
	let element = TestUtils.findRenderedDOMComponentWithTag(subject, tagName);
	return expect.shift(element);
});

expect.addAssertion('<ReactElement> to have props [exhaustively] satisfying <any>', function (expect, subject, model) {
	let props = subject.props;
	return expect(props, 'to [exhaustively] satisfy', model);
});

expect.addAssertion('<object> to be an action of type <string>', function (expect, subject, actionName) {
	return expect(subject, 'to have own property', 'type', actionName);
});

expect.addAssertion('<Immutable> to [exhaustively] satisfy <any>', function (expect, subject, pattern) {
	return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern);
});

expect.addType({
	name: 'ImmutableMap',
	base: 'Immutable',
	identify: function (obj) {
		return obj && Immutable.Map.isMap(obj);
	}
});

expect.addAssertion('<ImmutableMap> to have values [exhaustively] satisfying <any>', function (expect, subject, pattern) {
	return expect(subject.toObject(), 'to have values [exhaustively] satisfying', pattern);
});

expect.addAssertion('<ImmutableMap> to have [own] property <string> <any>', function (expect, subject, name, value) {
	return expect(subject.toObject(), 'to have [own] property', name, value);
});

expect.addAssertion('<ImmutableMap> [not] to have property <string>', function (expect, subject, name) {
	return expect(subject.toObject(), '[not] to have property', name);
});

expect.addType({
	name: 'ImmutableList',
	base: 'Immutable',
	identify: function (obj) {
		return obj && Immutable.List.isList(obj);
	}
});

expect.addAssertion('<ImmutableList> to have items [exhaustively] satisfying <any>', function (expect, subject, pattern) {
	return expect(subject.toArray(), 'to have items [exhaustively] satisfying', pattern);
});
expect.addAssertion('<ImmutableList> to have items [exhaustively] satisfying <assertion>', function (expect, subject, ...pattern) {
	return expect(subject.toArray(), 'to have items [exhaustively] satisfying', ...pattern);
});
// console.log(expect.outputFormat());
expect.outputFormat('ansi');
export default expect;
