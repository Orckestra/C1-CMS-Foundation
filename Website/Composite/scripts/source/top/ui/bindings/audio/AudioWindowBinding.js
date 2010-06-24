AudioWindowBinding.prototype= new WindowBinding;
AudioWindowBinding.prototype.constructor = AudioWindowBinding;
AudioWindowBinding.superclass = WindowBinding.prototype;

AudioWindowBinding.URL = "${root}/content/misc/audioloader/audio.aspx";

/**
 * @class
 */
function AudioWindowBinding () {
	
	/**
	 * @overloads {FlexBoxBinding#isFlexible}
	 * @type {boolean}
	 */
	this.isFlexible = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 * @return {string}
 */
AudioWindowBinding.prototype.toString = function () {
	
	return "[AudioWindowBinding]";
}

/**
 * Load the audio gear only if client has the correct Flash version installed.
 * @overloads {WindowBinding#onBindingRegister}
 */
AudioWindowBinding.prototype.onBindingRegister = function () {
	
	AudioWindowBinding.superclass.onBindingRegister.call ( this );
	
	if ( Client.hasFlash == true ) {
		// document.location = Resolver.resolve ( AudioWindowBinding.URL );
		this.setURL ( AudioWindowBinding.URL );
	}
}