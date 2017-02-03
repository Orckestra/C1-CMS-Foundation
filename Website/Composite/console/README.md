# The new console

This is a JavaScript-based single page application, using React, Redux and WAMP to provide a fast, expandable and data driven console UI.

Be sure to look at the README files in the subdirectories of this folder, and in the `/Website/Composite/test/unit/` folder.

## Development

In order to install the required libraries and run tests and build scripts, you will need to verify the following:

1. Check version of node.js - should be 4.0 or better (`cmd` -> `node -v` to check, if needed download and install new version from [here](https://nodejs.org/en/).
2. Check that Visual Studio uses correct node executable - see [this article](https://ryanhayes.net/synchronize-node-js-install-version-with-visual-studio-2015/).

To run npm scripts directly from the Visual Studio Task Runner (not required if these are run only in command line/PowerShell):

1. Install [npm Task runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner)
2. Locate npm scripts in Task Runner Explorer, in Website project
