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
				<ui:tabbox>
					<ui:tabs>
						<ui:tab label="Radiobuttons" />
						<ui:tab label="Checkboxes" />
						<ui:tab label="Selectors" />
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<ui:scrollbox class="padded">
								<ui:fields>
									<ui:fieldgroup label="Single field relation">
										<ui:field>
											<ui:fielddesc>Radiogroup</ui:fielddesc>
											<ui:fielddata>
												<ui:radiodatagroup name="radiogroup1">
													<ui:radio label="Field one" value="p1" ischecked="true"/>
													<ui:radio label="Field two" value="p2"/>
													<ui:radio label="Field three" value="p3"/>
												</ui:radiodatagroup>
											</ui:fielddata>
										</ui:field>
										<ui:field id="field1">
											<ui:fielddesc>Field one</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1" value="ONE" />
											</ui:fielddata>
										</ui:field>
										<ui:field id="field2">
											<ui:fielddesc>Field two</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput2" value="TWO" />
											</ui:fielddata>
										</ui:field>
										<ui:field id="field3">
											<ui:fielddesc>Field three</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput3" value="THREE" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup relation">
										<ui:field>
											<ui:fielddesc>Radiogroup</ui:fielddesc>
											<ui:fielddata>
												<ui:radiodatagroup name="radiogroup1">
													<ui:radio label="Fieldgroup one" value="p1" ischecked="true" relate="fieldgroup1" />
													<ui:radio label="Fieldgroup two" value="p2" relate="fieldgroup2" />
													<ui:radio label="Fieldgroup three" value="p3" relate="fieldgroup3" />
												</ui:radiodatagroup>
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup one" id="fieldgroup1">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput4" value="HEJ" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup two" id="fieldgroup2">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput5" value="DAV" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup three" id="fieldgroup3">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput6" value="HALLO" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
								</ui:fields>
							</ui:scrollbox>
						</ui:tabpanel>
						<ui:tabpanel />
						<ui:tabpanel>
							<ui:scrollbox class="padded">
								<ui:fields>
									<ui:fieldgroup label="Single field relation">
										<ui:field>
											<ui:fielddesc>Selector</ui:fielddesc>
											<ui:fielddata>
												<ui:selector name="selector1">
													<ui:selection label="Field one" value="field1b" relate="field1b" />
													<ui:selection label="Field two" value="field2b" relate="field2b" />
													<ui:selection label="Field three" value="field3b" relate="field3b" />
												</ui:selector>
											</ui:fielddata>
										</ui:field>
										<ui:field id="field1b">
											<ui:fielddesc>Field one</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput1b" value="ONE" />
											</ui:fielddata>
										</ui:field>
										<ui:field id="field2b">
											<ui:fielddesc>Field two</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput2b" value="TWO" />
											</ui:fielddata>
										</ui:field>
										<ui:field id="field3b">
											<ui:fielddesc>Field three</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput3b" value="THREE" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup relation">
										<ui:field>
											<ui:fielddesc>Radiogroup</ui:fielddesc>
											<ui:fielddata>
												<ui:radiodatagroup name="radiogroup1">
													<ui:radio label="Fieldgroup one" value="p1" ischecked="true" relate="fieldgroup1" />
													<ui:radio label="Fieldgroup two" value="p2" relate="fieldgroup2" />
													<ui:radio label="Fieldgroup three" value="p3" relate="fieldgroup3" />
												</ui:radiodatagroup>
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup one" id="fieldgroup1b">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput4" value="HEJ" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup two" id="fieldgroup2b">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput5" value="DAV" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Fieldgroup three" id="fieldgroup3b">
										<ui:field>
											<ui:fielddesc>Field</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput6" value="HALLO" />
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