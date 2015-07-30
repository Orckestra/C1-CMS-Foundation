<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.MultiSelectorDialog</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="MultiSelectorDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterLeft" isdisabled="true"/>
			<ui:broadcaster id="broadcasterRight" isdisabled="true"/>
			<ui:broadcaster id="broadcasterUp" isdisabled="true"/>
			<ui:broadcaster id="broadcasterDown" isdisabled="true"/>
		</ui:broadcasterset>
		<ui:dialogpage width="560" binding="MultiSelectorDialogPageBinding" class="dialog-multiselector">
			<ui:flexbox>
				<ui:fields>
					<ui:field class="left">
						<ui:fielddata>
							<ui:multiselector 
								id="leftselector"
								editable="false" 
								selectable="true" 
								display="unselected"/>
						</ui:fielddata>
					</ui:field>
					<ui:box class="controls">
						<ui:clickbutton label="►" id="rightbutton" observes="broadcasterLeft"/>
						<ui:clickbutton label="◄" id="leftbutton" observes="broadcasterRight"/>
					</ui:box>
					<ui:field class="right">
						<ui:fielddata>
							<ui:multiselector 
								id="rightselector" 
								editable="false" 
								selectable="true"
								display="selected"/>
						</ui:fielddata>
					</ui:field>
					<ui:box class="controls">
						<ui:clickbutton label="▲" id="upbutton" observes="broadcasterUp"/>
						<ui:clickbutton label="▼" id="downbutton" observes="broadcasterDown"/>
					</ui:box>
				</ui:fields>
			</ui:flexbox>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true" id="buttonAccept"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>