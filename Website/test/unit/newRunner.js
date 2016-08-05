/* global SystemJS */
import sourceMapSupport from '@node/source-map-support';
sourceMapSupport.install({ environment: 'node' });
import Mocha from '@node/mocha';
import systemIstanbul from '@node/systemjs-istanbul-hook';
systemIstanbul.hookSystemJS(SystemJS);

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
.catch(console.error.bind(console)); // eslint-disable-line no-console
