/* global SystemJS */
import systemIstanbul from '@node/systemjs-istanbul-hook';
systemIstanbul.hookSystemJS(SystemJS, address => {
	// Only files in Composite/console should be instrumented
	return !address.startsWith(SystemJS.baseURL + 'Composite/console');
});
import fs from '@node/fs';
import runner from '/test/unit/runner.js';

runner
// after running the tests, save the coverage file
.then(function() {
	fs.writeFileSync('coverage.json', JSON.stringify(systemIstanbul.remapCoverage()));
})
.catch(err => {
	console.error(err); // eslint-disable-line no-console
	console.error(err.stack); // eslint-disable-line no-console
});
