<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders ID="Httpheaders1" runat="server" />
	<head runat="server">
		<title>Composite.Management.Test.FunctionEditor</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript">
		function __doPostBack () {
			// simulate dot net
		}
		</script>
	</head>
	<body>
		<form action="javascript://" method="get"> <!-- simulate dot net -->
			<ui:editorpage label="Function Editor" id="functioneditortestpage">
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
						<ui:tab label="Input Parameters"/>
						<ui:tab label="Function Calls" selected="true"/>
						<ui:tab label="Nothing"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel lazy="true">
							<ui:parametereditor>
								<textarea name="parameters">hello!</textarea>
							</ui:parametereditor>
						</ui:tabpanel>
						<ui:tabpanel>
							<ui:functioneditor>
								<textarea name="function">hello!</textarea>
							</ui:functioneditor>
						</ui:tabpanel>
						<ui:tabpanel lazy="true">
							<ui:scrollbox class="padded">
								<ui:fields>
									<ui:fieldgroup label="Johnson">
										<ui:field>
											<ui:fielddata>
												<ui:datainput name="john1" value="John!"/>
											</ui:fielddata>
										</ui:field>
										<ui:field>
											<ui:fielddata>
												<ui:datainput name="john2" value="John!"/>
											</ui:fielddata>
										</ui:field>
										<ui:field>
											<ui:fielddata>
												<ui:datainput name="john3" value="John!"/>
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