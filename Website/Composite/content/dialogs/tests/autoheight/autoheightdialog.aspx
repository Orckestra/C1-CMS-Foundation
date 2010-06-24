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
			<ui:dialogpage label="Auto Height Dialog" height="auto" resizable="true">
				<div style="padding-bottom:10px;">This dialog fits the content. Although you can resize it!</div>
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
					</ui:flexbox>
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