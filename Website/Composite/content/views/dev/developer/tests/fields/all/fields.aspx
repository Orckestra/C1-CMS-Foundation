<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Fields</title>
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
			
			<ui:errorset>
				<ui:error targetname="datainput23" text="Welcome travellers!"/>
			</ui:errorset>
			
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
				
				<ui:splitbox orient="horizontal" layout="1:1">
					<ui:splitpanel>
				
						<ui:scrollbox class="padded">
							
							<!-- 
							<ui:tree id="simpletree" style="height: 100px;" flex="false">
								<ui:treebody>
									<ui:treenode label="TreeNode A">
										<ui:treenode label="TreeNode A1" onbindingfocus="this.logger.debug(Math.random())"/>
										<ui:treenode label="TreeNode A2"/>
										<ui:treenode label="TreeNode A3"/>
									</ui:treenode>
									<ui:treenode label="TreeNode B">
										<ui:treenode label="TreeNode B1"/>
										<ui:treenode label="TreeNode B2"/>
										<ui:treenode label="TreeNode B3"/>
									</ui:treenode>
								</ui:treebody>
							</ui:tree>
							-->
						
							<ui:fields>
							
								<ui:fieldgroup label="Datadialogs">
									<ui:field>
										<ui:fielddesc>datadialog</ui:fielddesc>
										<ui:fielddata>
											<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" label="Advanced options"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>datainputdialog</ui:fielddesc>
										<ui:fielddata>
											<ui:datainputdialog handle="Composite.Management.ImageSelectorDialog" name="datainputdialog1" value="1" type="integer"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>datainputdialog + help</ui:fielddesc>
										<ui:fieldhelp>Help!</ui:fieldhelp>
										<ui:fielddata>
											<ui:datainputdialog handle="Composite.Management.ImageSelectorDialog" name="datainputdialog2" value="1" type="integer"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								
								<ui:fieldgroup label="Checkboxes">
									<ui:field>
										<ui:fielddesc>checkbox</ui:fielddesc>
										<ui:fielddata>
											<ui:checkboxgroup>
												<ui:checkbox label="Checkbox 1" name="check1" value="c1" ischecked="true"/>
												<ui:checkbox label="Checkbox 2" name="check2" value="c2" oncommand="alert('fister')"/>
												<ui:checkbox label="Checkbox 3" name="check3" value="c3"/>
											</ui:checkboxgroup>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>checkbox + help</ui:fielddesc>
										<ui:fieldhelp>Help!</ui:fieldhelp>
										<ui:fielddata>
											<ui:checkboxgroup>
												<ui:checkbox label="Checkbox 1" name="check4" value="c1" ischecked="true"/>
												<ui:checkbox label="Checkbox 2" name="check5" value="c2"/>
												<ui:checkbox label="Checkbox 3" name="check6" value="c3"/>
											</ui:checkboxgroup>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							
								<ui:fieldgroup label="Radiobuttons">
									<ui:field>
										<ui:fielddesc>datainput</ui:fielddesc>
										<ui:fielddata>
											<ui:datainput name="datainput23" value="23" type="integer" error="Der er sket en beklagelig fejl!"/>
										</ui:fielddata>
									</ui:field>
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
								</ui:fieldgroup>
							
								<ui:fieldgroup label="Datainput">
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
								
								<ui:fieldgroup label="Selectors">
									<ui:field>
										<ui:fielddesc>selector</ui:fielddesc>
										<ui:fielddata>
											<ui:selector name="selector1" label="(vælg farve)" type="integer">
												<ui:selection label="Blå" value="2"/>
												<ui:selection label="Grøn" value="3"/>
												<ui:selection label="Sort" value="4"/>
												<ui:selection label="Pink" value="5"/>
											</ui:selector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>selector + help</ui:fielddesc>
										<ui:fieldhelp>Help!</ui:fieldhelp>
										<ui:fielddata>
											<ui:selector name="selector2" label="(vælg farve)" type="integer">
												<ui:selection label="Blå" value="2"/>
												<ui:selection label="Grøn" value="3"/>
												<ui:selection label="Sort" value="4" selected="true"/>
												<ui:selection label="Pink" value="5"/>
											</ui:selector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>datainputselector</ui:fielddesc>
										<ui:fielddata>
											<ui:datainputselector name="datainputselector1" value="1" type="integer">
												<ui:selection value="2"/>
												<ui:selection value="3"/>
												<ui:selection value="4"/>
												<ui:selection value="5"/>
											</ui:datainputselector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>datainputselector + help</ui:fielddesc>
										<ui:fieldhelp>Help!</ui:fieldhelp>
										<ui:fielddata>
											<ui:datainputselector name="datainputselector2" value="1" type="integer">
												<ui:selection value="2"/>
												<ui:selection value="3"/>
												<ui:selection value="4"/>
												<ui:selection value="5"/>
											</ui:datainputselector>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								
								<ui:fieldgroup label="Texboxes">
									<ui:field>
										<ui:fielddesc>textbox</ui:fielddesc>
										<ui:fielddata>
											<ui:textbox name="textbox1" value="Text!"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>textbox + help</ui:fielddesc>
										<ui:fieldhelp>Help!</ui:fieldhelp>
										<ui:fielddata>
											<ui:textbox name="textbox2" value="Text!"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								
							</ui:fields>
							
						</ui:scrollbox>
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel>
						<ui:scrollbox class="padded">
							
							<ui:window url="fieldsframe.aspx"/>
							
						</ui:scrollbox>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:editorpage>
		</form>
	</body>
</html>