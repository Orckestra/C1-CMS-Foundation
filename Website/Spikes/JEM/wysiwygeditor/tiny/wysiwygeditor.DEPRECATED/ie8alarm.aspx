<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.WysiwygEditor.IE8Alarm</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="ie8alarm.css"/>
	</head>
	<body>
		<ui:page>
			<ui:flexbox class="padded">
				<table id="messagelayout">
					<tr>
						<td id="messagevignette">
							<ui:vignette/>
						</td>
						<td id="messagetext">Internet Explorer 8 is known to crash Composite C1 when using the content editor.<br/>We are working on the problem. For now, this C1 installation is better viewed using Firefox.</td>
					</tr>
				</table>
				<!-- 
				<div id="getfirefox">
					<a href="http://www.getfirefox.com" target="_blank">Get Firefox!</a>
				</div>
				<button onclick="document.location.reload()">RELOAD</button>
				-->
			</ui:flexbox>
		</ui:page>
	</body>
</html>