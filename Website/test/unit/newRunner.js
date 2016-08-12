/* global SystemJS */
import sourceMapSupport from '@node/source-map-support';
sourceMapSupport.install({ environment: 'node' });
import Mocha from '@node/mocha';
import systemIstanbul from '@node/systemjs-istanbul-hook';
systemIstanbul.hookSystemJS(SystemJS, address => {
	// Only files in Composite/console should be instrumented
	return !address.startsWith(SystemJS.baseURL + 'Composite/console');
});
import fs from '@node/fs';

var runner = new Mocha({ ui: 'bdd' });
runner.suite.emit('pre-require', global, 'global-mocha-context', runner);

SystemJS.import('./test/unit/suite.js').then(i => i.importSuite())
.then(function() {
	return new Promise((resolve, reject) => {
		runner.run((failures) => {
			if (failures) {
				reject(failures);
			} else {
				resolve();
			}
		});
	});
})
// after running the tests, save the coverage file
.then(function() {
	fs.writeFileSync('coverage.json', JSON.stringify(systemIstanbul.remapCoverage()));
})
.catch(err => {
	console.error(err); // eslint-disable-line no-console
	console.error(err.stack); // eslint-disable-line no-console
});
