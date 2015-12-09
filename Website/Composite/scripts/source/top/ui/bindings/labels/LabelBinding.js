LabelBinding.prototype = new Binding;
LabelBinding.prototype.constructor = LabelBinding;
LabelBinding.superclass = Binding.prototype;

/*
 * Can be used to indicate that a dialog window will 
 * open. Looks more elegant than three regular dots.
 */
LabelBinding.DIALOG_INDECATOR_SUFFIX = String.fromCharCode(8230); // "…".charCodeAt ( 0 );
LabelBinding.DEFAULT_IMAGE = "blank";
LabelBinding.SPRITE_PATH = "${root}/images/sprite.svg";
LabelBinding.CLASSNAME_GRAYTEXT = "graytext";
LabelBinding.CLASSNAME_FLIPPED = "flipped";

LabelBinding.DOCKTABLABEL_OVERFLOWED_CLASSNAME = "overflowed";
LabelBinding.DOCKTABLABEL_WIDTH = 110; // If value is changed, then also make fix in css. See file docks.less

/**
 * SVG Images
 * @type {Element}
 */
LabelBinding.sprites = null;

/**
 * Sprite whiting to load
 * @type {Element}
 */
LabelBinding.spritesQueue = new Map();


/**
 * Indicate that loading images starterd
 * @type {Element}
 */
LabelBinding.spriteLoading = false;

/**
 * Load SVG images 
 */
LabelBinding.spriteLoad = function () {

	function onspriteload() {
		var request = this, sprites = document.createElement('x');
		sprites.innerHTML = request.responseText;
		var uses = sprites.querySelectorAll("use");
		for (var i = 0; i < uses.length; ++i) {
			var use = uses[i];
			var def = use.parentNode;
			var hash = use.getAttribute('xlink:href').split('#')[1];
			var target = sprites.querySelector('#' + hash);
			if (target) {
				var clone = target.cloneNode(true);
				clone.id = def.id;
				def.parentNode.replaceChild(clone, def);
			}
		}
		LabelBinding.sprites = sprites;
		LabelBinding.spriteLoading = false;

		LabelBinding.spritesQueue.each(function (key, image) {
			var binding = UserInterface.getBindingByKey(key);
			if (binding != null) {
				LabelBinding.setImageSvg(binding, image);
			}
		});

		LabelBinding.spritesQueue.empty();
	}

	if (!LabelBinding.spriteLoading) {
		LabelBinding.spriteLoading = true;
		var request = new XMLHttpRequest();
		request.open('GET', Resolver.resolve(LabelBinding.SPRITE_PATH));
		request.onload = onspriteload;
		request.send();
	}
}

/**
 * Set SVG Image 
 * @param {LabelBinding} binding
 * @param {string} image
 */
LabelBinding.setImageSvg = function (binding, image) {
	//validate that image is string and have valid Id
	if (image && typeof image == "string" && /^[A-Za-z]+[\w\-\.]*$/.test(image)) {
		if (binding.shadowTree.labelBody) {
			if (!image) {

			} else {

				if (LabelBinding.sprites) {
					var isDisabled = image.toLowerCase().indexOf('-disabled') > 0;
					image = image.toLowerCase().replace('-disabled', '');
					var g = LabelBinding.sprites.querySelector("#" + image);
					if (g) {
						var xmlns = "http://www.w3.org/2000/svg";
						if (!binding.shadowTree.svg) {
							binding.shadowTree.svg = binding.bindingDocument.createElementNS(xmlns, "svg");
							binding.shadowTree.labelBody.insertBefore(binding.shadowTree.svg, binding.shadowTree.labelBody.firstChild);
						}
						var svg = binding.shadowTree.svg;
						svg.setAttribute("viewBox", "0 0 24 24");
						if (isDisabled)
						{
							svg.setAttribute("class", "disabled");
						}
						var viewBox = g.getAttribute('viewBox'),
							fragment = document.createDocumentFragment(),
							clone = g.cloneNode(true);

						if (viewBox) {
							svg.setAttribute('viewBox', viewBox);
						}

						fragment.appendChild(clone);
						while (svg.lastChild) {
							svg.removeChild(svg.lastChild);
						}
						svg.appendChild(fragment);
					}
				} else {
					LabelBinding.spritesQueue.set(binding.getID(), image);
					LabelBinding.spriteLoad();
				}
			}
		}
	} else {
		var svg = binding.shadowTree.svg;
		if (svg) {
			if (svg.parentNode) {
				svg.parentNode.removeChild(svg);
			}
			binding.shadowTree.svg = null;
		}
	}
}

/**
 * @class
 */
function LabelBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("LabelBinding");

	/**
	 * @type {boolean}
	 */
	this.hasImage = false;

	/**
	 * @type {boolean}
	 */
	this.hasLabel = false;

	/**
	 * Image and text position reversed?
	 * @type {boolean}
	 */
	this.isFlipped = false;

	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters = new List([DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID]);

	/*
	 * Returnable.
	 */
	return this;
}

/** 
 * Identifies binding.
 */
LabelBinding.prototype.toString = function () {

	return "[LabelBinding]";
}


/** 
 * Can't remember why we need to build DOM content in the registration phase...
 * @overloads {Binding#onBindingRegister}
 */
LabelBinding.prototype.onBindingRegister = function () {

	LabelBinding.superclass.onBindingRegister.call(this);

	if (this.isBindingBuild) {
		this.shadowTree.labelBody = this._getBuildElement("labelbody");
	} else {
		this.shadowTree.labelBody = DOMUtil.createElementNS(
			Constants.NS_UI, "ui:labelbody", this.bindingDocument
		);
		this.bindingElement.appendChild(this.shadowTree.labelBody);
	}
}

/** 
 * @overloads {Binding#onBindingAttach}
 */
LabelBinding.prototype.onBindingAttach = function () {

	LabelBinding.superclass.onBindingAttach.call(this);

	if (this.isBindingBuild) {
		var element = this._getBuildElement("labeltext");
		if (element) {
			this.shadowTree.labelText = element;
			this.shadowTree.text = element.firstChild;
			this.hasLabel = true;
		}
	} else {

		var label = this.getProperty("label");
		var image = this.getProperty("image");
		var tooltip = this.getProperty("tooltip");

		if (label) {
			this.setLabel(label, false);
		}
		if (image) {
			this.setImage(image, false);
		}
		if (tooltip) {
			this.setToolTip(tooltip);
		}
		this.buildClassName();
	}
}

/**
 * @param {string} label
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
LabelBinding.prototype.setLabel = function (label, isNotBuildingClassName) {

	label = label != null ? label : "";

	if (!this.hasLabel) {
		this.buildLabel();
	}
	this.shadowTree.text.data = Resolver.resolve(label);
	this.setProperty("label", label);
	if (!isNotBuildingClassName) {
		this.buildClassName();
	}

	var dockTabBinding = this.getAncestorBindingByType(DockTabBinding, true);
	if (dockTabBinding != null) {
		var textEl = this.shadowTree.labelText;
		var cssWidthStr = CSSComputer.getWidth(textEl);
		textEl.style.width = "auto";
		var actualWidth = textEl.clientWidth;
		var cssWidth = Number(cssWidthStr.replace(/[^\d\.\-]/g, ''));
		if (actualWidth > cssWidth) {
			this.attachClassName(LabelBinding.DOCKTABLABEL_OVERFLOWED_CLASSNAME);
		}
		textEl.style.width = cssWidthStr;
	}

}

/**
 * @return {string}
 */
LabelBinding.prototype.getLabel = function () {

	return this.getProperty("label");
}

/**
 * Set image.
 * @param {string} url Eh - this could be a boolean!
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
LabelBinding.prototype.setImage = function (url, isNotBuildingClassName) {

	if (url != false && url != undefined) {
		url = url ? url : LabelBinding.DEFAULT_IMAGE;
		var resolverUrl = Resolver.resolve(url);
		if (resolverUrl.classes) {
			this.setAlphaTransparentBackdrop();
			this.setImageSvg();
			this.setImageClasses(resolverUrl.classes);
		} else if (typeof resolverUrl == "string" && resolverUrl[0] == "/") {
			this.setAlphaTransparentBackdrop(resolverUrl);
			this.setImageSvg();
			this.setImageClasses();
		} else {
			this.setAlphaTransparentBackdrop();
			this.setImageSvg(resolverUrl);
			this.setImageClasses();
		}
		if (typeof resolverUrl == "string") {
			this.setProperty("image", url);
		}
		this.hasImage = true;
		if (!isNotBuildingClassName) {
			this.buildClassName();
		}
	} else {
		this.setImageSvg();
		this.setImageClasses();
		this.deleteProperty("image");
		this.hasImage = false;
		this.buildClassName();
	}
}

/**
 * Set image class.
 * @param {string} url
 */
LabelBinding.prototype.setImageClasses = function (classes) {

	if (this.shadowTree.labelBody) {
		if (!classes) {
			if (this.shadowTree.icon) {
				this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
				this.shadowTree.icon = null;
			}
		} else {
			if (!this.shadowTree.icon) {
				this.shadowTree.icon = DOMUtil.createElementNS(
					Constants.NS_UI, "ui:icon", this.bindingDocument
				);

				this.shadowTree.labelBody.insertBefore(this.shadowTree.icon, this.shadowTree.labelBody.firstChild);
			}
			this.shadowTree.icon.className = classes;
		}
	}
}


/**
 * Set image class.
 * @param {string} url
 */
LabelBinding.prototype.setImageSvg = function (svg) {

	LabelBinding.setImageSvg(this, svg);
}


/**
 * Set image.
 * @param {string} url
 */
LabelBinding.prototype.setDefaultImage = function (url) {

	this.setImage(LabelBinding.DEFAULT_IMAGE);
}

/**
 * Attaches a background-image to the labelbody 
 * element, supporting 24bit alphatransparency.
 * @param {string} url
 */
LabelBinding.prototype.setAlphaTransparentBackdrop = function (url) {

	if (this.shadowTree.labelBody) { // sometimes it glitches in moz...
		if (url) {
			url = Resolver.resolve(url);
			this.shadowTree.labelBody.style.backgroundImage = "url('" + url + "')";

		} else {
			this.shadowTree.labelBody.style.removeProperty("background-image");
		}
	}
}

/**
 * @return {string}
 */
LabelBinding.prototype.getImage = function () {

	return this.getProperty("image");
}

/**
 * For some reason, setting tooltip on the label may not work reliably 
 * in Explorer. Always check the result if you use this method.
 * @param {string} tooltip
 */
LabelBinding.prototype.setToolTip = function (tooltip) {

	this.setProperty("tooltip", tooltip);

	/*
	 * Some guy keeps setting tooltips equal to the labels of things. 
	 * If a tooltip has nothing new to say, it's better not to show it,  
	 * since the tooltip may obscure the view while navigating trees etc. 
	 * TODO: fix that guy instead!
	 */
	if (tooltip != this.getLabel()) {
		this.setProperty("title", Resolver.resolve(tooltip));
	}
}

/**
 * @return {string}
 */
LabelBinding.prototype.getToolTip = function (tooltip) {

	return this.getProperty("tooltip");
}

/**
 * Flip image and text position. This is not supported in IE6.
 * @param @optional {boolean} isFlipped.
 */
LabelBinding.prototype.flip = function (isFlipped) {

	isFlipped = isFlipped == null ? true : isFlipped;
	var classname = LabelBinding.CLASSNAME_FLIPPED;

	if (!Client.isExplorer6) {
		this.isFlipped = isFlipped;
		if (isFlipped) {
			this.attachClassName(classname);
		} else {
			this.detachClassName(classname);
		}
	}
}

/**
 * Build the various label elements: A "labelbody" element 
 * containing a "labeltext" element containing a textnode. 
 * These extra elements will come in handy for CSS purposes.
 */
LabelBinding.prototype.buildLabel = function () {

	if (!this.hasLabel) {
		this.shadowTree.labelText = DOMUtil.createElementNS(
			Constants.NS_UI, "ui:labeltext", this.bindingDocument
		);
		this.shadowTree.text = this.bindingDocument.createTextNode("");
		this.shadowTree.labelText.appendChild(this.shadowTree.text);
		this.shadowTree.labelBody.appendChild(this.shadowTree.labelText);
		this.hasLabel = true;
	}
}

/**
 * Builds the CSS classname, taking care to preserve externally applied classnames.
 */
LabelBinding.prototype.buildClassName = function () {

	var class1 = "textonly";
	var class2 = "imageonly";
	var class3 = "image-and-text";

	if (this.hasLabel && this.hasImage) {
		this.detachClassName(class1);
		this.detachClassName(class2);
		this.attachClassName(class3);
	} else if (this.hasLabel) {
		this.detachClassName(class3);
		this.detachClassName(class2);
		this.attachClassName(class1);
	} else if (this.hasImage) {
		this.detachClassName(class3);
		this.detachClassName(class1);
		this.attachClassName(class2);
	}
}

/**
 * LabelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {LabelBinding}
 */
LabelBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:labelbox", ownerDocument);
	return UserInterface.registerBinding(element, LabelBinding);
}