import './emulateDom';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';

// define our instance of the `expect` function to use
const expect = unexpected.clone()
	.use(unexpectedReact)
	.use(unexpectedSinon)

export default expect;
