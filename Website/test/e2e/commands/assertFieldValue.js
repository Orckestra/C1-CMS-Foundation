var events = require('events');

function AssertFieldValue() {
  events.EventEmitter.call(this);
}

AssertFieldValue.prototype.command = function (dialogLabel,fieldLabel,vlaueToAssert,inputType) {
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
		.getValue('//*[local-name() = "fielddesc"][normalize-space(text())="'+fieldLabel+'"]/parent::*//*[local-name() = "'+inputType+'"]',function(result) {
			this.assert.equal(typeof result, "object");
			this.assert.equal(result.status, 0);
			this.assert.equal(result.value, vlaueToAssert);
		}).useCss();
        
    return this.client.api;
};

module.exports = AssertFieldValue;
