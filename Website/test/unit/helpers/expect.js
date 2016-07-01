require( './emulateDom');

var unexpected = require('unexpected');

// then require unexpected-react
var unexpectedReact = require('unexpected-react');

// then react
var React = require('react');

// define our instance of the `expect` function to use
const expect = unexpected.clone()
    .use(unexpectedReact);

export default expect;
