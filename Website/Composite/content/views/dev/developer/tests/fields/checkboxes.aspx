<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.DataInputs</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>		
		
		
	</head>
	<body>
		<form runat="server" class="updateform updatezone">
			
			<ui:editorpage label="Checkboxes">
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
						<ui:fieldgroup label="Checkboxes">
							<ui:field>
								<ui:fielddesc>checkbox</ui:fielddesc>
								<ui:fielddata>
									<ui:checkboxgroup>
										<ui:checkbox label="Checkbox 1" name="checkA1" value="c1" ischecked="true"/>
										<ui:checkbox label="Checkbox 2" name="checkA2" value="c2" oncommand="alert('fister')"/>
										<ui:checkbox label="Checkbox 3" name="checkA3" value="c3"/>
									</ui:checkboxgroup>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>checkbox + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:checkboxgroup>
										<ui:checkbox label="Checkbox 1" name="checkB1" value="c1" ischecked="true"/>
										<ui:checkbox label="Checkbox 2" name="checkB2" value="c2"/>
										<ui:checkbox label="Checkbox 3" name="checkB3" value="c3"/>
									</ui:checkboxgroup>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>checkbox REQUIRED</ui:fielddesc>
								<ui:fielddata>
									<ui:checkboxgroup required="true">
										<!-- 
										<ui:labelbox class="invalid" label="Selection required" image="${icon:error}"/>
										-->
										<ui:checkbox label="Checkbox 1" name="checkC1" value="c1"/>
										<ui:checkbox label="Checkbox 2" name="checkC2" value="c2"/>
										<ui:checkbox label="Checkbox 3" name="checkC3" value="c3"/>
									</ui:checkboxgroup>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
					</ui:fields>
				</ui:scrollbox>
				
			</ui:editorpage>
		</form>
	</body>
</html>