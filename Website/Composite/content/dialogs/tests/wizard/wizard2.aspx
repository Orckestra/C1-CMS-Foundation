<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Wizard2</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:wizardpage label="Auto Height Dialog" resizable="true" width="300">
			<ui:pagebody>
				<div style="padding-bottom:10px;">This dialog fits the content. Although you can resize it!</div>
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
						<ui:clickbutton 
							oncommand="document.location=Resolver.resolve('${root}/content/dialogs/tests/wizard/wizard1.aspx')"
							callbackid="CALLBACKID" 
							id="previousbutton" 
							image="${icon:previous}" 
							label="Back"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:wizardpage>
	
	</body>
</html>