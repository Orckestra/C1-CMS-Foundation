var events = require('events');

function SetValueByLabelFieldGroup() {
  events.EventEmitter.call(this);
}

SetValueByLabelFieldGroup.prototype.command = function (dialogLabel,fieldLabel,value,inputType) {
	if(inputType == null){
		inputType = "input";
	}
    if (dialogLabel == null) {
        this.client.api.selectFrameWithXpath('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]');
    } else {
        this.client.api.selectFrameWithXpath('//*[local-name() = "fieldgroup"][@label="' + dialogLabel + '"]');
    }
    this.client.api
        .useXpath()
		.click('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
        .clearValue('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]')
		.setValue('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]', value)
		.assertFieldValue(dialogLabel,fieldLabel,value,inputType)
    return this.client.api;
};

module.exports = SetValueByLabelFieldGroup;