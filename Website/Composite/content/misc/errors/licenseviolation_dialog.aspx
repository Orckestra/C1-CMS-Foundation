<%@ Page Language="C#" %><?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head runat="server">
		<title>Composite.Management.ServerErrorDialog</title>
		<control:scriptloader type="sub" runat="server" />
		<control:styleloader runat="server" />
		<link rel="stylesheet" type="text/css" href="licenseviolation.css.aspx" />
		<script type="text/javascript" src="ServerErrorDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage 
			binding="ServerErrorDialogPageBinding" 
			label="${string:Website.LicenseViolation.LicenseViolationTitle}" 
			image="${icon:error}" 
			width="300">
			
			<ui:flexbox>
				<div id="box">
					<div id="layout">
						<ui:cover id="cover" busy="false"/>
						<div id="image"></div>
						<div id="text">
							<ui:text label="${string:Website.LicenseViolation.LicenseViolationMessage}" />
			        		<ui:text label="<%= HttpUtility.HtmlAttributeEncode( Request.QueryString["message"] ) %>" />
						</div>
					</div>
				</div>
			</ui:flexbox>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>