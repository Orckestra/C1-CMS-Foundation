<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
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
						
						<ui:fieldgroup label="Datainput">
							<ui:field>
								<ui:fielddesc>Password + minlength</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="password" password="true" minlength="5"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Required</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" required="true"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Type</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput2" type="email"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Regexrule</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput3" regexrule="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$" error="Det er forkert"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>Maxlength</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput4" maxlength="3"/>
								</ui:fielddata>
							</ui:field>
							<!-- 
							<ui:field>
								<ui:fielddesc>datainput</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" value="23" type="integer" minlength="5" onvaluechange="this.logger.debug (Math.random ())"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput + help string req</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainput name="datainput2" value="required string" type="string" required="true"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainput name="datainput2" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainput name="datainput2" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainput name="datainput2" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput</ui:fielddesc>
								<ui:fielddata>
									<ui:datainput name="datainput1" value="23" type="integer"/>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainput + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainput name="datainput2" value="23" type="integer"/>
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