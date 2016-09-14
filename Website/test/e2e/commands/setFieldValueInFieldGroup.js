var events = require('events');

function SetValueByLabelFieldGroup() {
  events.EventEmitter.call(this);
}

SetValueByLabelFieldGroup.prototype.command = function (dialogLabel,fieldLabel,vlaue,inputType) {
	if(inputType == null){
		inputType = "input";
	}
    if (dialogLabel == null) {
        this.client.api.selectFrameWithXpath('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]');
    } else {
        this.client.api.selectFrameWithXpath('//*[local-name() = "fieldgroup"][@label="' + dialogLabel + '"]');
    }
    this.client.api
        .useXpath()
		.click('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
        .clearValue('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
		.setValue('//*[local-name() = "fielddesc"][text()="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]', vlaue).useCss();
    return this.client.api;
};

module.exports = SetValueByLabelFieldGroup;