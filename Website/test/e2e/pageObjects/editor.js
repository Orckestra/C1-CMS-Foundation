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
				this.client.api
					.pause(400)
					.useXpath()
					.selectFrameWithXpath('//*[@data-id="editor"]').useCss()
					
				return this;
			},
			changeElementContent: function (selector, newContent) {
				this
					.enter()
					.assert.attributeEquals('body', 'contenteditable', 'true')
					.section.editorBody
					.assert.visible(selector)
					.replaceContent(selector, newContent)
				return this;
			},
			selcetActionOnContent: function (number, action) {
			this
					.enter()
					.assert.attributeEquals('body', 'contenteditable', 'true')
					.client.api.useXpath()
					.waitForElementVisible('//*[@id="tinymce"]/*['+number+']',this.api.globals.timeouts.basic)
					.moveToElement('//*[@id="tinymce"]/*['+number+']',null,null)
					.mouseButtonClick('right')
					.selectFrameWithXpath('//*[local-name() = "menuitem"]//*[local-name() = "labelbox"]')
					.waitForElementVisible('//*[local-name() = "menuitem"]//*[local-name() = "labelbox"][@label="'+action+'"]',this.api.globals.timeouts.basic)
					.click('//*[local-name() = "menuitem"]//*[local-name() = "labelbox"][@label="'+action+'"]').useCss()
					return this;
			},
			selectEditOnContent: function (number) {
				this
					.enter()
					.assert.attributeEquals('body', 'contenteditable', 'true')
					.client.api.useXpath()
					.waitForElementVisible('//*[@id="tinymce"]/*['+number+']',this.api.globals.timeouts.basic)
					.moveToElement('//*[@id="tinymce"]/*['+number+']',null,null)
					.click('//*[@id="tinymce"]/*['+number+']')
					.selectFrame('toolbar[binding="VisualEditorToolBarBinding"]')
					.waitForElementPresent('//*[local-name()="labeltext"][text()="Function Properties…"]',this.api.globals.timeouts.basic)
					.clickText("Function Properties…")
				this.client.api.page.appWindow().enter()
					.waitForElementPresent('iframe[src="/Composite/content/dialogs/postback/postbackdialog.aspx"]',this.api.globals.timeouts.basic)
					return this;
			},
			selectContent: function (number) {
				this
					.enter()
					.assert.attributeEquals('body', 'contenteditable', 'true')
					.client.api.useXpath()
					.waitForElementVisible('//*[@id="tinymce"]/*['+number+']',this.api.globals.timeouts.basic)
					.moveToElement('//*[@id="tinymce"]/*['+number+']',null,null)
					.click('//*[@id="tinymce"]/*['+number+']')
					.selectFrame('toolbar[binding="VisualEditorToolBarBinding"]')
					.waitForElementPresent('//*[local-name()="labeltext"][text()="Function Properties…"]',this.api.globals.timeouts.basic)
					return this;
			},
			acceptChanges: function (){
				this
					.enter()
					.client.api.useXpath()
					.selectFrameWithXpath('//*[@response="accept"]')
					.click('//*[@response="accept"]').useCss();
					return this;
			},
			acceptFunctionEdit: function (){
				this
					.enter()
					.client.api.useXpath()
					.selectFrameWithXpath('//*[@callbackid="buttonAccept"]')
					.click('//*[@callbackid="buttonAccept"]').useCss();
					return this;
			},
			pause: function (number){
				this
					.client.api.pause(number)
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
