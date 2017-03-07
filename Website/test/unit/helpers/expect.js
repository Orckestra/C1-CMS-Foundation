import 'unittest/helpers/emulateDom.js';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';
import unexpectedDom from 'unexpected-dom';
import unexpectedMitm from 'unexpected-mitm';
import unexpectedZurvan from 'unexpected-zurvan';
import unexpectedImmutable from 'unittest/helpers/unexpected-immutable.js';
import TestUtils from 'react-addons-test-utils';

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

// console.log(expect.outputFormat());
expect.outputFormat('ansi');
export default expect;
