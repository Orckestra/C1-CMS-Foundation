/* global SystemJS */
import glob from 'glob';
export function importSuite() {
	return describeDirs();
}

const baseDir = './test/unit/suite';
const jsFileEx = /.js$/;
function describeDirs(testDir) {
	let cwd = baseDir + (testDir ? '/' + testDir : '');
	let dirs = glob.sync('*', { cwd });
	return Promise.all(dirs.map(pathName => {
		let fullPathName = (testDir ? testDir + '/' : '') + pathName;
		if (jsFileEx.test(pathName)) {
			// Test file, require in where we stand
			return SystemJS.import(baseDir + '/' + fullPathName);
		} else {
			// Directory, describe by name, move in and check contents
			// let groupName = pathName[0].toUpperCase() + pathName.slice(1);
			// describe(groupName, () => {
			return describeDirs(fullPathName);
			// });
		}
	}));
}
