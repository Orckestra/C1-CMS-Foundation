/**
* This page object requires an initial presence in a frame that contains a
* visual editor. Calling the enter command outside this context will fail, as
* there is no editor to enter.
*/

module.exports = {
	elements: [
		{ editorFrame: 'iframe[src^="/Composite/content/misc/editors/visualeditor/visualeditor.aspx"]' }
	],
	commands: [
		{
			enter: function () {
				this
					.waitForElementVisible('@editorFrame', 1000)
					.waitForFrameLoad('@editorFrame', 1000)
					.enterFrame('@editorFrame')
					.enterFrame('iframe[src^="tinymce.aspx"]')
					.enterFrame('#editor_ifr')
				return this;
			}
		}
	],
	sections: {
		editorBody:  {
			selector: '#tinymce'
		}
	}
};
