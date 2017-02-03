# Test suite

The test suite runs in [Mocha](https://mochajs.org/) and uses the [Unexpected](http://unexpected.js.org/) test assertion library. It is set up to be run through JSPM, using the `jspm run unittest/runner.js` and `jspm run unittest/coverage.js` commands, but scripts have been added to the package.json file permitting the test suite and coverage to be run through `npm test` and `npm run coverage` respectively.

All files ending in `.js` in the `suite/` directory and its subdirectories will be run as tests. Subdirectories will be processed as BDD contexts, similar to a `describe()` call wrapping all files in the directory. The directory name, capitalized, will be used as the description text.

## Overall structure

Test files generally map one-to-one with source files - `loadAndOpen.spec.js` contains tests for the code found in `loadAndOpen.js`. The same is true of directory structure. This is intended to make it easier to find and update test files. 

## Running tests

If you wish to run a specific test, you can use Mocha's built in `grep` functionality with the `-g` switch. Example:

```
jspm run unittest/runner.js -g 'ConnectPerspectives'
```

The above command will run only tests with the 'ConnectPerspectives' string in their name. In this case, that would be all tests relating to the perspective explorer's container component.

## Assertions

`./helpers/` contains an array of functionality for testing. It also includes a 'one-stop' `expect.js` which provides an `expect()` equipped with the plugins and custom types and assertions used throughout the test suite. The plugins in question (and where to find their documentation) are:

* [unexpected-react](http://bruderstein.github.io/unexpected-react/)
* [unexpected-sinon](http://unexpected.js.org/unexpected-sinon/)
* [unexpected-dom](https://github.com/munter/unexpected-dom/)
* [unexpected-mitm](http://unexpected.js.org/unexpected-mitm/)
* [unexpected-zurvan](https://github.com/gertsonderby/unexpected-zurvan)
* [unexpected-immutable](https://github.com/erikmueller/unexpected-immutable/)

In addition to this, the `expect.js` file itself contains a few custom assertions, which are (it is hoped) reasonably self-explanatory. Please see the tests which employ them.
