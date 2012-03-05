<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Test.Selectors</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript">function __doPostBack () {}</script>
		<script type="text/javascript" src="NullPostBackDataDialogBinding.js"></script>
		<script type="text/javascript" src="NullPostBackDataDialogSelectorBinding.js"></script>
	</head>
	<body>
		<form action="nulltreeselector.aspx" method="post" class="updateform updatezone"><!-- simulate dot net -->
			<ui:editorpage label="Null Tree Selector">
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
				</ui:broadcasterset>
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:toolbarbutton oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE)" id="savebutton" image="${icon:save}" image-disabled="${icon:save-disabled}" label="Save" observes="broadcasterCanSave" />
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:scrollbox class="padded">
					<ui:fields>
						<ui:fieldgroup label="Hello Master">
							<ui:field>
								<ui:fielddesc>This is it</ui:fielddesc>
								<ui:fielddata>
									<ui:nullpostbackdialog  
										callbackid="HelloFister" 
										handle="Composite.Management.ImageSelectorDialog" 
										selectorlabel="Select something" 
										label="FriendlyValue"
										value="DataValue"/>
									<!-- 
									<ui:selector name="selector1" type="integer">
										<ui:selection label="Selection" value="X" />
									</ui:selector>
									-->
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
					</ui:fields>
				</ui:scrollbox>
			</ui:editorpage>
		</form>
	</body>
</html>