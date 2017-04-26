# Warnings

This test suite is intended to verify console function when changing functionality within the CMS. **Do not run it** to test any particular site setup as it will not only not work, but will delete data installed on this CMS copy.

# Running the nightwatch tests

In order to run the end-to-end test suite, you will first need to have built your working copy of CMS with Visual Studio, installed all npm packages, and run the grunt build task as documented elsewhere.

In order to install nightwatch, you will need to access your command line. This can be done by either starting PowerShell or the Windows Command Line utility, `cmd`.

First we need to verify that you have the needed version of node.js, which is used to execute the tests. In your command line, enter the command `node -v`. This should respond with better than version 4.4. If your version is older (or you don't have node.js installed), you can install the current version from [the official website](https://nodejs.org/en/download/). As of this writing, the recommended version is 4.4.7 LTS (subject to change).

The next step is installing nightwatch itself. This is done by issuing the command `npm install -g nightwatch`. This will install nightwatch as a globally accessible command. There may be some warnings issued by npm as it runs, these can usually be ignored without issue.

Nightwatch expects to find the CMS running on localhost, port 8080. You can either change your Visual Studio or WebMatrix/IIS setup to use this port, or edit the `nightwatch.json` configuration file found in the project root. You can edit the line that says `"launch_url" : "http://localhost:8080"` to reflect the URL used.

You may need to consider installing the latest:

* chromedriver (if running tests in Chrome)
* robocopy (used for reseting the website and installing various Starter Site options)

Go to /Website and run these commands there:

* `npm install --save-dev chromedriver@latest`
* `npm install --save-dev robocopy@latest`

Finally, navigate to the root directory of your CMS working copy. This will usually be named `CMS`, but you may have named it otherwise when cloning it. In this directory, you can then start the tests by running `nightwatch` from your command line. This will run the whole test suite, starting with installing the Venus starter site.

Due to certain technical limitations, nightwatch must always be run from the working directory, and cannot be run from any subdirectory.

## Running tests separately

A few methods exist to run specific tests. If you wish to rerun the installation test alone, you can exploit the fact that it has the `install` tag. If you add the 'tag' command line switch - `nightwatch --tag install` - only tests with that tag will be run, no others.

If, conversely, you wish to run all other tests, but not the install test - for instance if you just ran the install test separately and it passed - you can skip that test by using `nightwatch --skiptags install`.

Lastly, if you wish to run a particular test, locate the file containing it, and simply give that as a parameter to the nightwatch command, like this: `nightwatch .\Website\test\e2e\100_login\devMode.js`. This also works if you wish to run the tests in a specific directory: `nightwatch .\Website\test\e2e\100_login\` will run all tests in that directory.

## Constructing new tests

Test related files are found within `.\Website\test\e2e\`, alongside this readme file.

To build new tests, it is recommended to look at what already exists, and structure your tests similarly. It is also recommended to familiarize yourself with nightwatch's own [documentation](http://nightwatchjs.org/guide).

A test file consists of a CommonJS formatted module, exporting a single object with functions as members. A few names on these objects are reserved - `before`, `after`, `beforeEach` and `afterEach` - for setting up and tearing down your tests. You can look this up in [the nightwatch developer guide](http://nightwatchjs.org/guide#using-before-each-and-after-each-hooks) for the full details. Any other member of that object will be run as a test case.

Custom commands have been added to accommodate testing within the specific system of CMS's console. These may be found within the `commands` directory, with examples of use found throughout the test cases.

A number of [page objects](http://nightwatchjs.org/guide#page-objects) have been constructed as well, providing ease of access, custom commands and assertions specific to certain parts of the console. These may be found in the `pageObjects` directory, again, with examples of use throughout the tests.
