/* global SystemJS */
import Mocha from '@node/mocha';

var runner = new Mocha({ ui: 'bdd' });
runner.suite.emit('pre-require', global, 'global-mocha-context', runner);

export default SystemJS.import('./test/unit/suite.js').then(i => i.importSuite())
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
.catch(err => {
	console.error(err); // eslint-disable-line no-console
	console.error(err.stack); // eslint-disable-line no-console
});
