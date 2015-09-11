<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.Standard</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="StandardDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="StandardDialogPageBinding"
			class="standard" 
			resizable="false"
			width="440">
			<ui:pagebody>
				<table id="dialoglayout">
					<tr>
						<td id="dialogvignette">
							<ui:dialogvignette/>
						</td>
						<td id="dialogtext"><!-- ${dialogtext} --></td>
					</tr>
				</table>
			</ui:pagebody>
			<ui:dialogtoolbar id="dialogtoolbar">
				<ui:toolbarbody id="dialogtoolbarbody" align="right" equalsize="true">
					<ui:toolbargroup id="dialogtoolbargroup"/>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>