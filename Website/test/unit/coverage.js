/* global SystemJS */
import systemIstanbul from '@node/systemjs-istanbul-hook';
systemIstanbul.hookSystemJS(SystemJS, address => {
	// Only files in Composite/console should be instrumented
	return !address.startsWith(SystemJS.baseURL + 'Composite/console');
});
import istanbul from '@node/istanbul';
import runner from 'unittest/runner.js';

runner
// after running the tests, save the coverage file
.then(function() {
	let coverage = systemIstanbul.remapCoverage();
	let collector = new istanbul.Collector();
	collector.add(coverage);
	let reporter = new istanbul.Reporter();
	reporter.add('lcov');
	return new Promise((resolve, reject) => {
		try {
			reporter.write(collector, true, () => {
				console.log('Coverage report written to ' + reporter.dir); // eslint-disable-line no-console
				resolve();
			});
		} catch (err) {
			reject(err);
		}
	});
})
.catch(err => {
	console.error(err); // eslint-disable-line no-console
	console.error(err.stack); // eslint-disable-line no-console
});
