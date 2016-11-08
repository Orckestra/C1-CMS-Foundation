var events = require('events');

function SetValueByLabel() {
  events.EventEmitter.call(this);
}

SetValueByLabel.prototype.command = function (fieldLabel,value) {
    this.client.api.selectFrameWithXpath('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]');
    
    this.client.api
		.useXpath()
		.click('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "input"]')
		.useCss()
		.setValue('input[type="file"]', value);
	return this.client.api;
};

module.exports = SetValueByLabel;