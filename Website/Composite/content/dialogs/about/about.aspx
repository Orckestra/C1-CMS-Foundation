<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.About</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="about.css.aspx"/>
		<script type="text/javascript" src="About.js"></script>
	</head>
	<body>
		<ui:dialogpage label="${string:Website.Dialogs.About.Title}" image="${icon:composite}" height="auto" width="348" resizable="false">
			<div id="about">
				<div id="credits">
					<div id="roll">
						<a href="http://www.composite.net/" target="wwwcompositenet"><div class="logo" id="logo1"/></a>
						<h2>Visual Editor</h2>
						<p>powered by<br/><a href="http://tinymce.moxiecode.com/" title="Visit Moxicode" target="_blank">TinyMCE</a></p>
						<h2>Source Editor</h2>
						<p>powered by<br/><a href="http://codemirror.net/" title="Visit CodeMirror" target="_blank">CodeMirror</a></p>
						<h2>Function Previews</h2>
						<p>powered by<br/><a href="http://phantomjs.org/" title="Visit PhantomJS" target="_blank">PhantomJS</a></p>
						<div id="names"/>
						<div class="logo" id="logo2"/>
					</div>
				</div>
				<div id="info">
					<ui:cover id="infocover" busy="false" hidden="true"/>
					<div id="prettyversion">${pretty}</div>
					<div id="version">Build no. ${version}</div>
					<div id="copyright">© <%=DateTime.Now.Year%> Composite A/S</div>
					<br/>
					<div>
                        <input id="id" value="${id}" onclick="this.select()" readonly="readonly" />
                        Installation ID: 
                    </div>
                    
				</div>
				<div id="fade"/>
			</div>
			<ui:dialogtoolbar>
				<ui:toolbarbody equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton id="buttonCredits" label="${string:Website.Dialogs.About.LabelCredits}" focusable="true" oncommand="About.credits ()"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>