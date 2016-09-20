var events = require('events');

function SetValueByLabel() {
  events.EventEmitter.call(this);
}

SetValueByLabel.prototype.command = function (fieldLabel,value,inputType) {
	if(inputType == null){
		inputType = "input";
	}
    this.client.api.selectFrameWithXpath('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]');
    
    this.client.api
		.useXpath()
		.click('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
        .clearValue('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
		.setValue('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]', value)
		.assertFieldValue(null,fieldLabel,value,inputType)
	return this.client.api;
};

module.exports = SetValueByLabel;