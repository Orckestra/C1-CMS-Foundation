<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
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
						<div class="logo" id="logo1"/>
						<div class="logo" id="logo2"/>
						<h2>Visual Editor</h2>
						<p>powered by<br/><a href="http://tinymce.moxiecode.com/" title="Visit Moxicode" target="_blank">TinyMCE</a></p>
						<h2>Source Editor</h2>
						<p>powered by<br/><a href="http://bobdawg.org/codepress/" title="Visit Sourceforge" target="_blank">Codepress</a></p>
						<div id="names">
							<!-- 
							<h2>Core Development</h2>
							<p>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson
							</p>
							<h2>Package Development</h2>
							<p>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson
							</p>
							<h2>Localization</h2>
							<p>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson
							</p>
							<h2>Special Thanks To</h2>
							<p>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson<br/>
								John Johnson
							</p>
							-->
						</div>
					</div>
				</div>
				<div id="info">
					<ui:cover id="infocover" busy="false" hidden="true"/>
					<div id="prettyversion">${pretty}</div>
					<div id="version">Build no. ${version}</div>
					<div id="copyright">© 2010 Composite A/S</div>
					<br/>
					<div>Installation ID:<span id="id" title="Installation ID">${id}</span></div>
				</div>
				<div id="fade"/>
			</div>
			<ui:dialogtoolbar>
				<ui:toolbarbody equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton id="buttonCredits" label="Credits" focusable="true" oncommand="About.credits ()"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>