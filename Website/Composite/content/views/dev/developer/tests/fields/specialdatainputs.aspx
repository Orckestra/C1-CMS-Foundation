<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.DataInputs</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
		function __doPostBack () {
			// simulate dot net
		}
		</script>
	</head>
	<body>
		<form action="javascript://" method="get"> <!-- simulate dot net -->
			
			
			<ui:editorpage label="Fields">
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true"/>
				</ui:broadcasterset>
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:toolbarbutton  
								oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE)"
								id="savebutton" 
								image="${icon:save}" 
								image-disabled="${icon:save-disabled}" 
								label="Save"
								observes="broadcasterCanSave"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				
				<ui:scrollbox class="padded">
				
					<ui:fields>
						
						<ui:fieldgroup label="Special DataInputBindings">
							<ui:field>
								<ui:fielddesc>URL</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="url" value="http://" type="url"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Identifier</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="programmingidentifier" type="programmingidentifier"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Namespace</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="programmingnamespace" type="programmingnamespace"/>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
						
					</ui:fields>
					
				</ui:scrollbox>
						
			</ui:editorpage>
		</form>
	</body>
</html>