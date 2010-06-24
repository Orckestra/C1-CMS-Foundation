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
				
				<ui:lazybindingset>
					<ui:lazybinding bindingid="tabpanel2" name="lazyA"/>
					<ui:lazybinding bindingid="tabpanel3" name="lazyB"/>
					<ui:lazybinding bindingid="tabpanel4" name="lazyC"/>
					<ui:lazybinding bindingid="tabpanel5" name="lazyD"/>
				</ui:lazybindingset>
				
				<ui:tabbox>
					<ui:tabs>
						<ui:tab label="1"/>
						<ui:tab label="2"/>
						<ui:tab label="3"/>
						<ui:tab label="4"/>
						<ui:tab label="5"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel id="tabpanel1">
							<ui:scrollbox class="padded">
								<ui:fields>		
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="23" type="integer" id="A"/>
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
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
						<ui:tabpanel id="tabpanel2">
							<ui:scrollbox class="padded">
								<ui:fields>		
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="23" type="integer" id="B"/>
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
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
						<ui:tabpanel id="tabpanel3">
							<ui:scrollbox class="padded">
								<ui:fields>		
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="23" type="integer" id="C"/>
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
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
						<ui:tabpanel id="tabpanel4">
							<ui:scrollbox class="padded">
								<ui:fields>		
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="23" type="integer" id="D"/>
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
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
						<ui:tabpanel id="tabpanel5">
							<ui:scrollbox class="padded">
								<ui:fields>		
									<ui:fieldgroup label="Datainput">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="23" type="integer" id="E"/>
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
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
						
			</ui:editorpage>
		</form>
	</body>
</html>