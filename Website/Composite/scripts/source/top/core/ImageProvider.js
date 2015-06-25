/**
 * @class
 * Image provider.
 */
function _ImageProvider () {}

_ImageProvider.prototype = {

	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "ImageProvider" ),
		
	/**
	 * Service URL.
	 */
	SERVICE_URL : "services/Icon/GetIcon.ashx",
	
	/**
	 * Default icon provider.
	 */
	UI : "Composite.Icons",
	
	/**
	 * @param {object} object
	 */
	getImageURL : function ( object, size ) {
	
		var result = null;
		var url = Constants.APPROOT + "/" + this.SERVICE_URL + "?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
		var hash = object.ResourceNamespace;
		var name = object.ResourceName;
		//size = size ? size : "DEFAULT";
		
		//if ( name != null && hash != null ) {
		//	result = url
		//		.replace ( "${name}", name )
		//		.replace ( "${hash}", hash )
		//		.replace ( "${size}", size );
		//	if ( size == "DEFAULT" ) {
		//		result = result.split ( "&size=DEFAULT" )[ 0 ];
		//	}
		//} else {
		//	throw "Could not compute image URL.";
		//}
		//return result;
		result = "${svg:"+object.ResourceName+"}";

		return result;
	},
	
	/**
	 * THIS US NOT USED!
	 * @param image
	 * @returns
	 */
	toGrayScaleURL : function ( image ) {
		
		var myCanvas=document.createElement("canvas");
		var ctx=myCanvas.getContext("2d");
		var image = new Image ();
		

		var imgWidth=image.width;
		var imgHeight=image.height;
		
		// You'll get some string error if you fail to specify the dimensions
		myCanvas.width= imgWidth;
		myCanvas.height=imgHeight;
		
		// alert(imgWidth);
		ctx.drawImage(image,0,0);

		// This function cannot be called if the image is not rom the same domain.
		// You'll get security error if you do.
		var imageData=ctx.getImageData(0,0, imgWidth, imgHeight);

		// This loop gets every pixels on the image and
		for (j=0; j<imageData.height; i++) {
			for (i=0; i<imageData.width; j++) {
				var index=(i*4)*imageData.width+(j*4);
				var red=imageData.data[index];
				var green=imageData.data[index+1];
				var blue=imageData.data[index+2];
				var alpha=imageData.data[index+3];
				var average=(red+green+blue)/3;
				imageData.data[index]=average;
				imageData.data[index+1]=average;
				imageData.data[index+2]=average;
				imageData.data[index+3]=alpha;
			}
		}
		return myCanvas.toDataURL();
	}
}

/**
 * The instance that does it.
 */
var ImageProvider = new _ImageProvider ();