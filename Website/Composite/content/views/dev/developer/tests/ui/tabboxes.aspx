<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Tabboxes</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
	
		<form method="post" action="javascript://">
	
		<ui:lazybindingset>
			<ui:lazybinding bindingid="tabpanelA" value="false" name="alarmA"/>
			<ui:lazybinding bindingid="tabpanelB" value="false" name="alarmB"/>
			<ui:lazybinding bindingid="tabpanelC" value="false" name="alarmC"/>
		</ui:lazybindingset>
	
		<ui:page label="Tabboxes">
		
			<ui:tabbox>
				<ui:tabs>
					<ui:tab label="Boxed Tabboxes"/>
					<ui:tab label="Too Many Tabs!"/> 
					<ui:tab label="Fields ohoy!"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel id="tabpanelA">
						<ui:scrollbox class="padded">
							<ui:fields>
								<ui:fieldgroup label="Boxed Tabbox">
									<ui:field>
										<p>Tabbox will resize to fit the visible tabpanel.</p>
										<ui:tabbox type="boxed">
											<ui:tabs>
												<ui:tab label="Some Content"/>
												<ui:tab label="More Content"/>
												<ui:tab label="Most Content"/>
											</ui:tabs>
											<ui:tabpanels>
												<ui:tabpanel>
													<div><strong>Tabpanel 1</strong></div>
													<div>Some content</div>
												</ui:tabpanel>
												<ui:tabpanel>
													<div><strong>Tabpanel 2</strong></div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
												</ui:tabpanel>
												<ui:tabpanel>
													<div><strong>Tabpanel 3</strong></div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
												</ui:tabpanel>
											</ui:tabpanels>
										</ui:tabbox>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="Boxed Equalsize Tabbox">
									<ui:field>
										<p>Tabbox will fit the largest tabpanel.</p>
										<ui:tabbox type="boxed" equalsize="true">
											<ui:tabs>
												<ui:tab label="Some Content"/>
												<ui:tab label="More Content"/>
												<ui:tab label="Most Content"/>
											</ui:tabs>
											<ui:tabpanels flex="false">
												<ui:tabpanel>
													<div><strong>Tabpanel 1</strong></div>
													<div>Some content</div>
												</ui:tabpanel>
												<ui:tabpanel>
													<div><strong>Tabpanel 2</strong></div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
												</ui:tabpanel>
												<ui:tabpanel>
													<div><strong>Tabpanel 3</strong></div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
													<div>More content</div>
												</ui:tabpanel>
											</ui:tabpanels>
										</ui:tabbox>			
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:scrollbox>
					</ui:tabpanel>
					<ui:tabpanel id="tabpanelB">
						<ui:splitbox orient="horizontal" layout="1:1">
							<ui:splitpanel class="padded">
								<ui:tabbox type="boxed" equalsize="true">
									<ui:tabs>
										<ui:tab label="Long Tab Title Number One"/>
										<ui:tab label="Long Tab Title Number Two"/>
										<ui:tab label="Long Tab Title Number Three"/>
										<ui:tab label="Long Tab Title Number Four"/>
										<ui:tab label="Long Tab Title Number Five"/>
										<ui:tab label="Long Tab Title Number Six"/>
										<ui:tab label="Long Tab Title Number Seven"/>
										<ui:tab label="Long Tab Title Number Eight"/>
										<ui:tab label="Long Tab Title Number Nine"/>
										<ui:tab label="Long Tab Title Number Ten"/>
									</ui:tabs>
									<ui:tabpanels>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
									</ui:tabpanels>
								</ui:tabbox>
							</ui:splitpanel>
							<ui:splitter/>
							<ui:splitpanel class="padded">
								<ui:tabbox type="boxed" equalsize="true">
									<ui:tabs>
										<ui:tab label="Long Tab Title Number One"/>
										<ui:tab label="Long Tab Title Number Two"/>
										<ui:tab label="Long Tab Title Number Three"/>
										<ui:tab label="Long Tab Title Number Four"/>
										<ui:tab label="Long Tab Title Number Five"/>
										<ui:tab label="Long Tab Title Number Six"/>
										<ui:tab label="Long Tab Title Number Seven"/>
										<ui:tab label="Long Tab Title Number Eight"/>
										<ui:tab label="Long Tab Title Number Nine"/>
										<ui:tab label="Long Tab Title Number Ten"/>
									</ui:tabs>
									<ui:tabpanels>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
										<ui:tabpanel/>
									</ui:tabpanels>
								</ui:tabbox>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:tabpanel>
					<ui:tabpanel id="tabpanelC">
					
						<ui:tabbox type="boxed">
							<ui:tabs>
								<ui:tab label="Some Content"/>
							</ui:tabs>
							<ui:tabpanels>
								<ui:tabpanel>
									<ui:fields>
									
										<ui:fieldgroup label="Datainputdialogs Datainputdialogs Datainputdialogs">
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
									</ui:fields>
										
								</ui:tabpanel>
							</ui:tabpanels>
						</ui:tabbox>
							
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
			
		</ui:page>
		
		</form>
		
	</body>
</html>