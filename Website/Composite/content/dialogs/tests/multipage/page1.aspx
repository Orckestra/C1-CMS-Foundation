<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
			DocumentManager.hasNativeContextMenu = true;
		</script>
	</head>
	<body>
		<form>
			<ui:dialogpage label="Multipage1" resizable="false">
				<div style="padding-bottom:10px;">Load next page!</div>
				<ui:pagebody style="border: 2px inset ThreeDHighlight;padding: 10px;">
					<div style="padding-bottom:10px;">
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
					</div>
				</ui:pagebody>
				<ui:dialogtoolbar>
					<ui:toolbarbody align="right" equalsize="true">
						<ui:toolbargroup>
							<ui:clickbutton label="OK" response="accept"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:dialogtoolbar>
			</ui:dialogpage>
		</form>
	</body>
</html>