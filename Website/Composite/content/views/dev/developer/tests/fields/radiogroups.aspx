<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.DataInputs</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>		
		<script type="text/javascript">
		//function __doPostBack () {
		//	// simulate dot net
		//}
		</script>
		
	</head>
	<body>
		<form runat="server" class="updateform updatezone"> <!-- simulate dot net -->
			
			<ui:editorpage label="Checkboxes" id="EditorPage">
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true"/>
				</ui:broadcasterset>
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:toolbarbutton  
								oncommand="this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK )"
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
						<ui:fieldgroup label="Radiobuttons">
							<ui:field>
								<ui:fielddesc>radiogroup</ui:fielddesc>
								<ui:fielddata>
									<ui:radiodatagroup name="radiogroup1">
										<ui:radio label="Program 1" value="p1" ischecked="true"/>
										<ui:radio label="Program 2" value="p2"/>
										<ui:radio label="Program 3" value="p3"/>
									</ui:radiodatagroup>
								</ui:fielddata>
							</ui:field>
							<!-- 
							<ui:field>
								<ui:fielddesc>radiogroup + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:radiodatagroup name="radiogroup2">
										<ui:radio label="Program 1" value="p1"/>
										<ui:radio label="Program 2" value="p2" ischecked="true"/>
										<ui:radio label="Program 3" value="p3"/>
									</ui:radiodatagroup>
								</ui:fielddata>
							</ui:field>
							-->
						</ui:fieldgroup>
					</ui:fields>
				</ui:scrollbox>
				
			</ui:editorpage>
		</form>
	</body>
</html>