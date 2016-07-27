// Set up and run the test suite
import System from 'systemjs'; //eslint-disable-line no-unused-vars
import '../../config.js';
import glob from 'glob';

const jsFileEx = /.js$/;
function describeDirs(testDir) {
	let cwd = './test/unit/suite' + (testDir ? '/' + testDir : '');
	let dirs = glob.sync('*', { cwd });
	dirs.forEach(pathName => {
		let fullPathName = (testDir ? testDir + '/' : '') + pathName;
		if (jsFileEx.test(pathName)) {
			// Test file, require in where we stand
			require('./suite/' + fullPathName);
		} else {
			// Directory, describe by name, move in and check contents
			let groupName = pathName[0].toUpperCase() + pathName.slice(1);
			describe(groupName, () => {
				describeDirs(fullPathName);
			});
		}
	});

}
describeDirs();
