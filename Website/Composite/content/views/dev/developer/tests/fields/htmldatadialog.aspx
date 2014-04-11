<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
    
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Test.DataInputs</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript">function __doPostBack () {}</script>
	</head>
	<body>
		<form action="javascript://" method="get"><!-- simulate dot net -->
			<ui:editorpage label="Fields">
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
						<ui:fieldgroup label="Visual editor control!">
							<ui:field>
								<ui:fielddesc>htmldatadialog</ui:fielddesc>
								<ui:fielddata>
									<ui:htmldatadialog 
										callbackid="fisgerloegsovs" 
										name="htmldatadialog" 
										formattingconfiguration="common">
										<input name="alarm" value="Fisterloegsovs!"/>
									</ui:htmldatadialog>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
					</ui:fields>
				</ui:scrollbox>
			</ui:editorpage>
		</form>
	</body>
</html>