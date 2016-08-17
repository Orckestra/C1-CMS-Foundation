/* global SystemJS */
import systemIstanbul from '@node/systemjs-istanbul-hook';
systemIstanbul.hookSystemJS(SystemJS, address => {
	// Only files in Composite/console should be instrumented
	return !address.startsWith(SystemJS.baseURL + 'Composite/console');
});
import Reporter from '@node/istanbul-api/lib/reporter';
import libCoverage from '@node/istanbul-lib-coverage';
import runner from '/test/unit/runner.js';

runner
// after running the tests, save the coverage file
.then(function() {
	let coverage = systemIstanbul.remapCoverage();
	let coverageMap = libCoverage.createCoverageMap();
	coverageMap.merge(coverage);
	let reporter = new Reporter();
	reporter.add('html'); // FIXME: Should be 'lcov', but that causes an error. For now, HTML report works.
	reporter.write(coverageMap, {});
	console.log('Coverage report written to /coverage/lcov-report'); // eslint-disable-line no-console
})
.catch(err => {
	console.error(err); // eslint-disable-line no-console
	console.error(err.stack); // eslint-disable-line no-console
});
