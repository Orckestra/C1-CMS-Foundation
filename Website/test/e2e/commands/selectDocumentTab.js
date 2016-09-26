var events = require('events');

function SelectDocumentTab() {
  events.EventEmitter.call(this);
}

SelectDocumentTab.prototype.command = function (tabName) {
	this.client.api.selectFrameWithXpath('//*[local-name() = "docktabs"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]');
	this.client.api
        .useXpath()
		.click('//*[local-name() = "docktabs"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]').useCss();
    
    return this.client.api;
};

module.exports = SelectDocumentTab;