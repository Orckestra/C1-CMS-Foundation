var events = require('events');

function SelectDialog() {
  events.EventEmitter.call(this);
}

SelectDialog.prototype.command = function (tabName) {
	this.client.api.selectFrameWithXpath('//*[local-name() = "dialoghead"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]');
	this.client.api
        .useXpath()
		.click('//*[local-name() = "dialoghead"]/*//*[local-name() = "labeltext"][normalize-space(text())="'+tabName+'"]').useCss()
        
    return this.client.api;
};

module.exports = SelectDialog;