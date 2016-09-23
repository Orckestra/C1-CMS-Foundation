var events = require('events');

function CloseDocumentTab() {
  events.EventEmitter.call(this);
}

CloseDocumentTab.prototype.command = function (tabName) {

	this.client.api.selectFrameWithXpath('//*[local-name() = "docktab"]//*[@label="'+tabName+'"]');
	this.client.api
        .useXpath()
		.click('//*[local-name() = "docktab"]//*[@label="'+tabName+'"]/*//*[local-name() = "control"][@controltype="close"]').useCss()
        
    return this.client.api;
};

module.exports = CloseDocumentTab;