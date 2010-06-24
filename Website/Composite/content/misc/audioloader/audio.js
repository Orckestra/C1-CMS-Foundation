var isBrowserReady = false;
var isAudioInitialized = false;

/**
 * Invoked by Flash plugin when loading is finished. Initializes the top 
 * {@link Audio} object with argument depending on whether or not the 
 * Flash code was successful in creating/loading the localstore file.
 * @param {boolean} isPanic True when Flash was installed by couldn't load.
 */
function initializeAudio ( isPanic ) {
	
	if ( !isAudioInitialized ) {
		isAudioInitialized = true;
		var audio = document.getElementById ( "audio" );
		var isOperational = !isPanic && audio.isOperational && audio.isOperational ();
		top.Audio.initialize ( isOperational? audio : null );
	}
}

/**
 * Flag ready status when loaded. Set a timeout in case Flash went completely wrong.
 */
window.onload = function () {

	isBrowserReady = true;
	window.setTimeout ( function () {
		var isPanic = true;
		initializeAudio ( isPanic );
	}, 8 * 1000 );
}

/** 
 * Requested by Flash plugin while loading.
 * Returns true as soon as window is loaded.
 * @return {boolean}
 */
function isReady () {

	return isBrowserReady;
}