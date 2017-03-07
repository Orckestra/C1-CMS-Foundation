module.exports = {
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare()
			.section.docktabs.clickTab(1);
	},
	'can access pages via content tree browser': function (browser) {
		var content = browser.page.content();
		var systemView = browser.page.systemView();
		systemView
			.enter()
		// 1  Check the “Websites” node.  Make sure the “Websites” node is expanded.
		browser.expect.element('treenode[label="Websites"]').to.have.attribute('open', 'true');
		// 2  Locate the “Venus Starter Site” page. The page is present below “Websites”.
		systemView.assertTreeNodeHasChild('Websites', 'Venus Starter Site');
		// 3  Expand the “Venus Starter Site” page. The page gets expanded.
		systemView.openTreeNode('Venus Starter Site');
		//     Child pages appear below the page.
		systemView.assertTreeNodeHasChild('Venus Starter Site');
		// 4  Locate the “Getting Started” page. The page is present below ““Venus Starter Site”.
		systemView.assertTreeNodeHasChild('Venus Starter Site', 'Getting Started');
		// 5  Expand the “Getting Started” page. The page gets expanded.
		systemView.openTreeNode('Getting Started');
		//     Child pages appear below the page.
		systemView.assertTreeNodeHasChild('Getting Started');
	    // 6  Locate the “Components” page. The page is present below “Getting Started”.
		systemView.assertTreeNodeHasChild('Getting Started', 'Components');
	    // 7  Select the “Components” page The “Test” page gets selected in the tree.
		systemView.openTreeNode('Components')
	    //     The “Components” page’s content loads in the browser view.
		content
			.assertBrowserContains('div.content-column > h1', 'Test components')
		//     The URL in the address bar reads “http://<website>/Getting-Started/components/c1mode(unpublished)
			.assertBrowserUrl('/Getting-Started/components/c1mode(unpublished)')
	}
};
