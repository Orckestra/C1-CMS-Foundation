<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.DefaultStart</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="defaultstart.css.aspx"/>
		<script type="text/javascript" src="DefaultStart.js"></script>
	</head>
	<body>
		<div id="startinfo">
			<table>
				<tbody>
					<tr>
						<td class="index">
							<ui:text label="${string:Website.General.LabelVersionNumber}"/>
						</td>
						<td id="versioninfo">&#160;</td>
					</tr>					
				</tbody>
			</table>
			<div id="logo"></div>
		</div>
	</body>
</html>