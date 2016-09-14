var events = require('events');

function SetValueByLabel() {
  events.EventEmitter.call(this);
}

SetValueByLabel.prototype.command = function (fieldLabel,vlaue,inputType) {
	if(inputType == null){
		inputType = "input";
	}
    
    this.client.api.selectFrameWithXpath('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]');
    
    this.client.api
        .useXpath()
		.click('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
        .clearValue('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
		.setValue('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]', vlaue).useCss();
    return this.client.api;
};

module.exports = SetValueByLabel;