CodeMirror.defineMode("razor", function (config, parserConfig) {

	var scriptEndRegex = /^<\/?(a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)( |>)/i;

	var scriptingMode, htmlMixedMode;

	function htmlToken(stream, state) {
		if (stream.match(/^@\*/i, false)) {
			return razorComment(stream, state);
		}
		else if (stream.match(/^@/i, false)) {
			state.token = scriptToken;
			return razor(stream, state);
		}
		else
			return htmlMixedMode.token(stream, state.htmlState);
	}

	function scriptToken(stream, state) {
		if (stream.match(scriptEndRegex, false)) {
			state.token = htmlToken;
			var style = htmlMixedMode.token(stream, state.htmlState);
			return style;
		}
		else if (stream.match(/^@/i, false)) {
			state.token = scriptToken;
			return razor(stream, state);
		}
		else {
			var style = scriptingMode.token(stream, state.scriptState);
			return style;
		}
	}

	function razor(stream, state) {
		var ch;
		while (ch = stream.next()) {
			if (ch == "@") {
				break;
			}
		}
		return "razor";
	}

	function razorComment(stream, state) {
		var maybeEnd = false, ch;
		while (ch = stream.next()) {
			if (ch == "@" && maybeEnd) {
				break;
			}
			maybeEnd = (ch == "*");
		}
		return "razor-comment";
	}

	return {
		startState: function () {
			scriptingMode = scriptingMode || CodeMirror.getMode(config, "text/x-csharp");
			htmlMixedMode = htmlMixedMode || CodeMirror.getMode(config, "htmlmixed");
			return {
				token: htmlToken,
				htmlState: htmlMixedMode.startState(),
				scriptState: scriptingMode.startState()
			};
		},

		token: function (stream, state) {
			return state.token(stream, state);
		},

		indent: function (state, textAfter) {
			if (state.token == htmlToken)
				return htmlMixedMode.indent(state.htmlState, textAfter);
			else
				return scriptingMode.indent(state.scriptState, textAfter);
		},

		copyState: function (state) {
			return {
				token: state.token,
				htmlState: CodeMirror.copyState(htmlMixedMode, state.htmlState),
				scriptState: CodeMirror.copyState(scriptingMode, state.scriptState)
			};
		},

		electricChars: "/{}:",

		innerMode: function (state) {
			if (state.token == scriptToken) return { state: state.scriptState, mode: scriptingMode };
			else return { state: state.htmlState, mode: htmlMixedMode };
		}
	};
}, "htmlmixed");

CodeMirror.defineMIME("application/x-cshtml", "razor");
CodeMirror.defineMIME("application/x-master-page", "razor");