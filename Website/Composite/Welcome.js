var Welcome = new function () {

	var TIME = 750;
	var setup = null;
	var clone = null;

	var hasSetup = false;
	var hasLanguages = false;
	var hasBlock = false;
	var hasLength = false;

	var tabindex = 0;
	var progressNotchIndex = 1;
	var progressLoading = null;
	/**
	* @type {String}
	*/
	this.params = new String("");

	/**
	* Results are real. UI is fake ;)
	*/
	this.test = function () {

		EventBroadcaster.subscribe(BroadcastMessages.KEY_TAB, this);
		EventBroadcaster.subscribe(BroadcastMessages.KEY_ENTER, this);

		var ul = document.getElementById("introtest");
		var lis = ul.getElementsByTagName("li");
		var result = {};

		var response = new List(SetupService.CheckRequirements(true));
		response.each(function (res) {

			var li = document.createElement("li");
			if (!ul.hasChildNodes()) {
				li.className = "on";
			}
			li.rel = res.Key;
			li.appendChild(document.createTextNode(res.Title));
			ul.appendChild(li);
			result[res.Key] = res.Success;
		})

		var i = 0;
		var isSuccess = true;

		setTimeout(function () {
			doit(result);
		}, TIME * 2);

		function doit(res) {

			var li = lis.item(i);
			var rel = li.rel;
			li.className += res[rel] ? " ok" : " bad";

			var is = res[rel];
			if (!is) {
				Welcome.params += (Welcome.params.length > 0 ? ";" : "") + li.rel;
			}
			if (isSuccess) {
				isSuccess = is;
			}

			var next = lis.item(i + 1);
			if (next != null) {
				next.className = "on";
			}

			var wait = TIME * Math.random();
			if (i++ < lis.length - 1) {
				setTimeout(function () {
					doit(res);
				}, wait);
			} else {
				setTimeout(function () {
					Welcome.result(isSuccess);
				}, wait);
			}
		}
	}

	/**
	* Test result.
	*/
	this.result = function (isSuccess) {

		var successtext = document.getElementById("introtestsuccess");
		var failuretext = document.getElementById("introtestfailure");

		var successbutton = bindingMap.introtestsuccessbutton;
		var failurebutton = bindingMap.introtestfailurebutton;

		if (isSuccess) {
			successtext.style.visibility = "visible";
			successbutton.getBindingElement().style.visibility = "visible";
		} else {
			successtext.style.display = "none";
			failuretext.style.display = "block";
			successbutton.hide();
			failurebutton.setURL(failurebutton.getURL() + Welcome.params);
			failurebutton.show();
		}

	}

	/**
	* Switch to deck.
	* @param {String} id
	*/
	this.switchTo = function (id) {

		switch (id) {

			case "test":

				break;

			case "license":
				var doc = SetupService.GetLicenseHtml(true);
				var markup = DOMSerializer.serialize(doc);
				document.getElementById("licensetext").innerHTML = markup;
				break;

			case "setup":
				if (!hasSetup) {
					getSetup();
					hasSetup = true;
				}
				break;

			case "language":
				updateSetup();
				if (!hasLanguages) {
					getLanguages();
					hasLanguages = true;
				}
				prepareForm("languageform");
				break;

			case "login":
				var form = document.getElementById("loginform");
				prepareForm("loginform");
				setConsoleLanguage();
				break;

		}

		bindingMap.introdecks.select(id);
		bindingMap.navdecks.select("nav" + id);

		var p = document.getElementById("crumbs");
		var spans = new List(p.getElementsByTagName("span"));
		spans.each(function (span) {
			if (span.id == "crumb" + id) {
				span.className = "text-primary";
			} else {
				span.className = "";
			}
		});
	}

	function setConsoleLanguage() {
		document.getElementById("consolelanguage").value = document.getElementById("websitelanguage").value;
	}

	function getLanguages() {

		var langs = new List(SetupService.GetLanguages(true));
		var markup = "";
		langs.each(function (lang) {
			markup += "<option value=\"" + lang.Key + "\"" + (lang.Selected ? " selected=\"selected\"" : "") + ">" + lang.Title + "</option>";
		});
		
		var selector = document.getElementById("websitelanguage");
		selector.innerHTML = markup;

		selector = document.getElementById("consolelanguage");
		selector.innerHTML = markup;
	}

	/**
	* @param {String} id
	*/
	function prepareForm(id) {

		var form = document.getElementById(id);
		var elements = new List(form.elements);

		if (!form.isPrepared) {

			form.isPrepared = true;

			elements.each(function (element, index) {

				element.onfocus = function () {

					window.standardEventHandler.enableNativeKeys();

					tabindex = index;

					if (this.type == "text" || this.type == "password") {
						var input = this;
						setTimeout(function () {
							if (Client.isExplorer) {
								var range = input.createTextRange();
								range.moveStart("character", 0);
								range.moveEnd("character", input.value.length);
								range.select();
							} else {
								input.setSelectionRange(0, input.value.length);
							}
						}, 0);
					}
				}

				element.onblur = function () {

					window.standardEventHandler.disableNativeKeys();

					switch (this.id) {
						case "password":
							if (this.value != "" && this.value.length < 6) {
								badPassLength(true);
							} else if (hasLength) {
								badPassLength(false);
							}
							break;
						case "passcheck":
							var password = document.getElementById("password");
							if (password.value != "") {
								if (password.value != this.value) {
									noneShallPass(true);
								} else if (hasBlock) {
									noneShallPass(false);
								}
							}
							break;
					}
				}

				if (id == "loginform") {
					element.onkeyup = function () {
						validate();
					}

					if (element.id == "newsletter") {
						element.onclick = function () {
							validate();
						}
					}
				}
			});
		}

		elements.get(0).focus();

	}

	// isRFC822ValidEmail function by Ross Kendall, http://rosskendall.com/ - added '.' check.
	function isRFC822ValidEmail(sEmail) {
		var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		var sDomain_ref = sAtom;
		var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		var reValidEmail = new RegExp(sValidEmail);

		if (reValidEmail.test(sEmail) && sEmail.indexOf('.') != -1) {
			return true;
		}

		return false;
	}


	function validate() {

		var username = document.getElementById("username");
		var password = document.getElementById("password");
		var passcheck = document.getElementById("passcheck");
		var email = document.getElementById("email");
		var newsletter = document.getElementById("newsletter");

		var isValid = false;

		if (username.value != "") {
			if (password.value.length >= 6 && passcheck.value.length >= 6) {
				if (password.value == passcheck.value) {
					if (isRFC822ValidEmail(email.value)) {
						isValid = true;
					}
				}
			}
		}

		if (isValid) {
			bindingMap.startbutton.enable();
			if (hasBlock) {
				noneShallPass(false);
			}
		} else {
			bindingMap.startbutton.disable();
		}

		return isValid;
	}

	/**
	* @param {boolean} isBad
	*/
	function badPassLength(isBad) {

		if (hasBlock) {
			noneShallPass(false);
		}

		var p = document.getElementById("lengthbad");
		if (isBad) {
			p.style.display = "block";
		} else {
			p.style.display = "none";
		}
		hasLength = isBad;
	}

	/**
	* @param {boolean} isBlock
	*/
	function noneShallPass(isBlock) {

		if (hasLength) {
			badPassLength(false);
		}

		var p = document.getElementById("loginbad");
		if (isBlock) {
			p.style.display = "block";
		} else {
			p.style.display = "none";
		}
		hasBlock = isBlock;
	}

	/**
	* @implements {IBroadcastListener}
	* @param {String} broadcast
	*/
	this.handleBroadcast = function (broadcast) {

		var decks = bindingMap.introdecks;
		var deck = decks.getSelectedDeckBinding();
		var id = deck.getID()

		if (id == "language" || id == "login") {

			switch (broadcast) {

				case BroadcastMessages.KEY_TAB:

					var form = document.getElementById(id + "form");
					var elements = form.elements;

					var index = 0;

					if (Keyboard.isShiftPressed) {
						if (tabindex == 0) {
							index = elements.length - 1;
						} else {
							index = --tabindex;
						}
					} else {
						if (tabindex != elements.length - 1) {
							index = ++tabindex;
						}
					}
					elements[index].focus();
					tabindex = index;
					break;

				case BroadcastMessages.KEY_ENTER:
					if (id == "login") {
						if (validate()) {
							this.login();
						}
					}
					break;
			}
		}
	}

	/**
	* Mount setup options.
	*/
	function getSetup() {

		var transformer = new XSLTransformer();
		transformer.importStylesheet("${root}/welcome.xsl");

		setup = SetupService.GetSetupDescription(true);
		var html = transformer.transformToString(setup, true);
		html = Client.fixUI(html);

		var target = document.getElementById("setuptext");
		target.innerHTML = setup.documentElement.getAttribute("desc");

		target = document.getElementById("setupfields");
		target.innerHTML = html.replace(/xmlns:ui=\"urn:HACKED\"/g, "").replace('<?xml version="1.0"?>',"");
		DocumentManager.attachBindings(target);
	}

	function updateSetup() {

		// reset setup result
		if (Client.isWebKit) { // huh? Cannot clone document node?
			var xml = DOMSerializer.serialize(setup);
			clone = XMLParser.parse(xml);
		} else {
			clone = setup.cloneNode(true);
		}

		var keys = {};
		var radios = new List();
		var elements = new List(clone.getElementsByTagName("*"));

		elements.each(function (element) { // IE no speak getElementsByTagName ( "radio" )!
			if (element.nodeName == "radio") {
				radios.add(element);
			}
		});

		radios.each(function (radio) {
			radio.removeAttribute("selected");
			keys[radio.getAttribute("key")] = radio;
		});

		var target = document.getElementById("setupfields");
		var groups = new List(DOMUtil.getElementsByTagName (target, "radiodatagroup"));

		// update setup result
		groups.each(function (group) {
			group = UserInterface.getBinding(group);
			var key = group.getValue();
			var radio = keys[key];
			radio.setAttribute("selected", "true");
		});

		// remove unselected elements
		radios.each(function (radio) {
			if (radio.getAttribute("selected") == null) {
				radio.parentNode.removeChild(radio);
			} else {
				radio.removeAttribute("selected");
			}
		});
	}

	this.update = function (binding) {

		switch (binding.constructor) {
			case RadioDataBinding:
				updateRadio(binding);
				break;
		}
	}

	function updateRadio(binding) {

		var parent = binding.bindingElement.parentNode;
		var group = UserInterface.getBinding(parent);
		var radios = group.getChildBindingsByLocalName("radio");

		setTimeout(function () {
			radios.each(function (radio) {
				var id = "div" + radio.getProperty("value");
				var div = document.getElementById(id);
				if (div != null) {
					if (radio.isChecked) {
						CSSUtil.attachClassName(div, "visible");
					} else {
						CSSUtil.detachClassName(div, "visible");
					}
				}
			});
		}, 0);
	}

	/**
	* @param {HTMLInputElement} input
	*/
	this.acceptLicense = function (input) {

		var button = bindingMap.setupbutton;
		if (input.checked) {
			button.enable();
		} else {
			button.disable();
		}
	}

	/**
	* Login!
	*/
	this.login = function () {
	
		var self = this;
		var serial = DOMSerializer.serialize(clone, true);
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var email = document.getElementById("email").value;
		var newsletter = document.getElementById("newsletter").checked;

		var select = document.getElementById("websitelanguage");
		var websitelanguage = select.options[select.selectedIndex].value;

		select = document.getElementById("consolelanguage");
		var consolelanguage = select.options[select.selectedIndex].value;

		self.loading();

		SetupService.SetUp(serial, username, email, password, websitelanguage, consolelanguage, newsletter,
				function (response) {
					if (response) {
						Application.reload(true);
					} else {
						clearInterval(progressLoading);
						alert("An unfortunate error has occurred.");
					}
				}
			);
	}

	/**
	* Show Loading Deck with progress bar
	* Progress bar goes from 0 to 100 in 45 seconds - and then restart after 5 seconds (if things are still working).
	*/
	this.loading = function () {
		bindingMap.introdecks.select("loading");
		bindingMap.cover.attachClassName("loading-cover");
		bindingMap.navdecks.hide();
		var current = new Date().getTime();
		var end = current + 50000; // total 45 seconds + wait 5 seconds
		ProgressBarBinding.notch(1);
		progressLoading = setInterval(function () {
			if (current > end) {
				ProgressBarBinding.reload();
				progressNotchIndex = 0;
				end = current + 50000;
			}
			ProgressBarBinding.notch(1);
			current = new Date().getTime();
			progressNotchIndex++;
		}, 2250); // 20 notches * 2.25 seconds = 45 seconds
	}
}