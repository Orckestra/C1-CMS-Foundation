// Set up and run the test suite
import System from 'systemjs';
import '../../config.js';
import glob from 'glob';

let files = glob.sync('./suite/**/*.spec.js', { cwd: './test/unit' });
files.forEach(file => require(file));
