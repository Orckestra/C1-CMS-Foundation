// Set up and run the test suite
import System from 'systemjs'; //eslint-disable-line no-unused-vars
import '../../config.js';
import glob from 'glob';
import globals from './helpers/globals';

let dirs = glob.sync('*', { cwd: './test/unit/suite' });
dirs.forEach(dir => {
	if (globals[dir]) {
		if (globals[dir].beforeEach) {
			beforeEach(globals[dir].beforeEach);
		}
		if (globals[dir].afterEach) {
			afterEach(globals[dir].afterEach);
		}
	}
	let groupName = dir[0].toUpperCase() + dir.slice(1);
	describe(groupName, () => {
		let files = glob.sync('./suite/' + dir + '/**/*.spec.js', { cwd: './test/unit' });
		files.forEach(file => require(file));
	});
});
