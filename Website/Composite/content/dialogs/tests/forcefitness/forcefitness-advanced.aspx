<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
			DocumentManager.hasNativeContextMenu = true;
		</script>
	</head>
	<body>
		<form>
			<ui:dialogpage label="Fitness Advanced :)" width="760" height="300" resizable="false">
			
			<ui:pagebody style="border: 1px solid black;">			
				<ui:splitbox orient="horizontal" layout="1:3">
					<ui:splitpanel>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:clickbutton label="Fit!!!" oncommand="this.dispatchAction(Binding.ACTION_UPDATED)" style="margin: 0"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<div style="padding: 10px;">
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content</div>
							<div>Content LAST!</div>
						</div>
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel>						
						<ui:scrollbox fit="true">
							<ui:toolbar>
								<ui:toolbarbody>
									<ui:toolbargroup>
										<ui:clickbutton label="Fit!!!" oncommand="this.dispatchAction(Binding.ACTION_UPDATED)" style="margin: 0"/>
									</ui:toolbargroup>
								</ui:toolbarbody>
							</ui:toolbar>
							<div class="padded" id="hello">
								<ui:fields>
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
													<ui:checkbox label="Checkbox 1" name="check4" value="d1" ischecked="true"/>
													<ui:checkbox label="Checkbox 2" name="check5" value="d2"/>
													<ui:checkbox label="Checkbox 3" name="check6" value="d3"/>
												</ui:checkboxgroup>
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
									<ui:fieldgroup label="Radiobuttons">
										<ui:field>
											<ui:fielddesc>datainput</ui:fielddesc>
											<ui:fielddata>
												<ui:datainput name="datainput23" value="23" type="integer" error="Testing error!"/>
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
								</ui:fields>
							</div>
							</ui:scrollbox>
						</ui:splitpanel>
					</ui:splitbox>
				</ui:pagebody>

				<ui:dialogtoolbar>
					<ui:toolbarbody align="right" equalsize="true">
						<ui:toolbargroup>
							<ui:clickbutton label="OK" response="accept"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:dialogtoolbar>
			
			</ui:dialogpage>
		</form>
	</body>
</html>