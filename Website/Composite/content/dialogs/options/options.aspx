<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
	        <title>Composite.Management.Dialogs.Options</title>
			<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="OptionsDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage 
			binding="OptionsDialogPageBinding" 
			image="${icon:default}" 
			label="${string:Website.Dialogs.Options.LabelOptions}" 
			class="tabboxed">
			<ui:tabbox type="boxed" equalsize="true">
				<ui:tabs>
					<ui:tab label="${string:Website.Dialogs.Options.LabelGeneral}"/>
					<ui:tab label="${string:Website.Dialogs.Options.LabelAdvanced}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:fields>
							<ui:fieldgroup label="${string:Website.Dialogs.Options.LabelLoginPreferences}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.Options.LoginScreen}"/>
									<ui:fielddata>
										<ui:radiodatagroup id="login">
											<ui:radio id="logintrue" name="logintrue" label="${string:Website.Dialogs.Options.LabelFakeLoginScreen}" value="true"/>
											<ui:radio id="loginfalse" name="loginfalse" label="${string:Website.Dialogs.Options.LabelNoLoginScreen}" value="false"/>
										</ui:radiodatagroup>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
						</ui:fields>
					</ui:tabpanel>
					<ui:tabpanel>
						
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			
		</ui:dialogpage>
	</body>
</html>