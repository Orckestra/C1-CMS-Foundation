/* global SystemJS */
import Mocha from '@node/mocha';

var runner = new Mocha({ ui: 'bdd' });
runner.suite.emit('pre-require', global, 'global-mocha-context', runner);

// Slightly hacky grep switch
var grepSwitchIndex = process.argv.indexOf('-g');
if (grepSwitchIndex > -1) {
	runner.grep(process.argv[grepSwitchIndex + 1] || '');
}

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
});
