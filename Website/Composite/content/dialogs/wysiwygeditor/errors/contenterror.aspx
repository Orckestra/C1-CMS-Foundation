<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Errors.ContentError</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="ContentErrorDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="ContentErrorDialogPageBinding"
			label="${string:Composite.Web.VisualEditor:ContentError.DialogTitle}" 
			image="${icon:error}"
			class="error" 
			resizable="false">
			<ui:flexbox>
				<table id="dialoglayout">
					<tr>
						<td id="dialogvignette">
							<ui:dialogvignette/>
						</td>
						<td id="dialogtext">
							<ui:text label="${string:Composite.Web.VisualEditor:ContentError.DialogText}"/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td id="error">${error}</td>
					</tr>
				</table>
			</ui:flexbox>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>