var events = require('events');

function SelectContentTab() {
  events.EventEmitter.call(this);
}

SelectContentTab.prototype.command = function (tabName) {
	this.client.api.selectFrameWithXpath('//*[local-name() = "tabs"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]');
	this.client.api
        .useXpath()
		.click('//*[local-name() = "tabs"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]').useCss()
        
    return this.client.api;
};

module.exports = SelectContentTab;