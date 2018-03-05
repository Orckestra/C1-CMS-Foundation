module.exports = {
	'@tags': ['website-zip-upload-extract'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'Upload and Extract Zip': function (browser) {
		browser
		.selectPerspective("System")
		.selectTreeNodeAction("/", "New Folder")
		.setFieldValue("Folder name", "ZipTest")
		.clickDialogButton("OK")
		.waitForDialogClosed()
		.selectPerspective("System")
		.selectTreeNodeAction("ZipTest", "Upload and Extract Zip", "Upload File")
		.setFileFieldValue("Zip file", require('path').resolve(__dirname + '/test.zip'))
		.clickDialogButton("OK")
		.waitForDialogClosed()
		.openTreeNode("ZipTest")
		.assertTreeNodeHasChild("ZipTest", "root.txt")
		.openTreeNode("subdir1")
		.openTreeNode("subdir2")
		.assertTreeNodeHasChild("subdir2", "simple.txt")
		.selectTreeNodeAction("ZipTest","Delete Folder")
		.clickDialogButton("OK")
		.waitForDialogClosed()
		.assertTreeNodeHasNoChild("/", "ZipTest")
	},
	afterEach: function (browser, done) {
		done();
	}
}

