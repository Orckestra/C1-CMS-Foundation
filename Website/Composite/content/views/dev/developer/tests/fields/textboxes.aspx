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
				
				<ui:tabbox>
					<ui:tabs>
						<ui:tab label="Used in fields"/>
						<ui:tab label="Used standalone" selected="true"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
				
							<ui:scrollbox class="padded">
								<ui:fields>			
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>textbox</ui:fielddesc>
											<ui:fielddata>
												<ui:textbox name="textbox1"/>
											</ui:fielddata>
										</ui:field>
										<!-- 
										<ui:field>
											<ui:fielddesc>editortextbox</ui:fielddesc>
											<ui:fielddata>
												<ui:editortextbox name="editortextbox1"/>
											</ui:fielddata>
										</ui:field>
										-->
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
							
						</ui:tabpanel>
						
						<ui:tabpanel>
							<ui:flexbox>
								<ui:editortextbox name="editortextbox2">
									<textarea>Creating a TextRange object on the 
body will not include the content 
inside a textArea or button. Conversely, 
you cannot change the start or end 
position of a text range over the textArea 
or button to move outside the 
scope of these particular elements. 
Use the properties provided on each element, 
isTextEdit and parentTextEdit, to walk the hierarchy. 
If the document above contained a textArea, 
a createTextRange on the body object would not 
find the position where the user actually clicked. 
The following reworks the above example to handle this case.
									</textarea>
								</ui:editortextbox>
							</ui:flexbox>
							<div style="padding: 10px; font-weight: bold;">Use classname "full" on the editortextbox!</div>
						</ui:tabpanel>
						
					</ui:tabpanels>
				</ui:tabbox>
						
			</ui:editorpage>
		</form>
	</body>
</html>