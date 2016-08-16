/**
* This page object requires an initial presence in a frame that contains a
* visual editor. Calling the enter command outside this context will fail, as
* there is no editor to enter.
*/

module.exports = {
	elements: [
		{ wysiwygFrame: 'iframe[src^="/Composite/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx"]' },
		{ editorFrame: 'iframe[src^="/Composite/content/misc/editors/visualeditor/visualeditor.aspx"]' }
	],
	commands: [
		{
			enter: function () {
				this
					.waitForElementVisible('@editorFrame', 3000)
					.waitForFrameLoad('@editorFrame', 3000)
					.enterFrame('@editorFrame')
					.waitForFrameLoad('iframe[src^="tinymce.aspx"]', 10000) // Potentially v. slow
					.enterFrame('iframe[src^="tinymce.aspx"]')
					.waitForFrameLoad('#editor_ifr', 3000)
					.enterFrame('#editor_ifr')
				return this;
			},
			changeElementContent: function (selector, newContent) {
				// Enter frame with editor content
				this
					.enter()
					// Check that it is editable
					.assert.attributeEquals('body', 'contenteditable', 'true')
					// Check that it has content
					.section.editorBody
					.assert.visible(selector)
					// Change header
					.replaceContent(selector, newContent)
				return this;
			},
			save: function () {
                this.selectFrame('#savebutton');
				this.expect.element('#savebutton').to.not.have.attribute('isdisabled');
				this.click('#savebutton > labelbox');
				this.api.pause(1000)
				this.expect.element('#savebutton').to.have.attribute('isdisabled');
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
