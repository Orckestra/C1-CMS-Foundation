/* global SystemJS */
import Mocha from '@node/mocha';
import bdd from 'unittest/helpers/ui.js';
Mocha.interfaces['bdd-openstack'] = bdd;

var runner = new Mocha({ ui: 'bdd-openstack' });
runner.suite.emit('pre-require', global, 'global-mocha-context', runner);

// Slightly hacky grep switch
var grepSwitchIndex = process.argv.indexOf('-g');
if (grepSwitchIndex > -1) {
	let grepArg = process.argv[grepSwitchIndex + 1] || '';
	grepArg = new RegExp(grepArg.replace('!!', '!'));
	runner.grep(grepArg);
}

export default SystemJS.import('unittest/suite.js')
.then(i => i.importSuite())
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
