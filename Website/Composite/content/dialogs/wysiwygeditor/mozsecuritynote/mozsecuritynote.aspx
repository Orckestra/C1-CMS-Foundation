<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Errors.ClipboardError</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage 
			label="${string:Composite.Web.VisualEditor:MozSecurityNote.LabelSecurityStuff}" 
			image="${icon:warning}"
			class="warning" 
			resizable="false"
			width="340">
			<ui:flexbox>
				<table id="dialoglayout">
					<tr>
						<td id="dialogvignette">
							<ui:dialogvignette/>
						</td>
						<td id="dialogtext">
							<ui:text label="${string:Composite.Web.VisualEditor:MozSecurityNote.TextSecurityStuff}"/>
						</td>
					</tr>
				</table>
			</ui:flexbox>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelDisclosure}" url="http://www.mozilla.org/editor/midasdemo/securityprefs.html" focusable="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>