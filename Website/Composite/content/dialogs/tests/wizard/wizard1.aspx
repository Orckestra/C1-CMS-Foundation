<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Wizard1</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body>
		<ui:wizardpage label="Auto Height Dialog" resizable="true">
			<ui:pagebody>
				<div style="padding-bottom:10px;">This dialog fits the content. Although you can resize it!</div>
				<ui:fields>
					<ui:fieldgroup label="Fields!">
						<ui:field>
							<ui:fielddesc>Fister!</ui:fielddesc>
							<ui:fielddata>
								<ui:datainput type="integer" error="Alarm!" />
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton oncommand="document.location=Resolver.resolve('${root}/content/dialogs/tests/wizard/wizard2.aspx')" callbackid="CALLBACKID" id="nextbutton" image="${icon:next}" label="Next" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:wizardpage>
	</body>
</html>