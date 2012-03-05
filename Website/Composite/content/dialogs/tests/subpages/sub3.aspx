<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<form>
			<ui:page>
				<ui:clickbutton label="Load next sub-page!" oncommand="document.location=document.location.toString().replace('sub3','sub4');"/>
				<div style="padding: 10px; clear: both;">
					<div style="padding-bottom:10px;">
						<div>This page is smaller than the previous page. This will NOT resize the dialog!</div>
					</div>
					<div style="padding-bottom:10px;">
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
					</div>
				</div>
		</ui:page>
		</form>
	</body>
</html>