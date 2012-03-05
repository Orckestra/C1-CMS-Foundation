<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.DataInputs</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="crawlers.js"></script>
	</head>
	<body>
		<ui:editorpage label="Crawlers">
		
			<ui:splitbox layout="2:1" orient="horizontal">
				<ui:splitpanel>
		
						<ui:tabbox>
							<ui:tabs>
								<ui:tab label="Descending"/>
								<ui:tab label="Ascending"/>
							</ui:tabs>
							<ui:tabpanels>
								<ui:tabpanel>
								
									<ui:toolbar>
										<ui:toolbarbody>
											<ui:toolbargroup>
												<ui:toolbarbutton label="Test NodeCrawler" oncommand="Crawlers.testDescending(1)" image="${icon:help}"/>
												<ui:toolbarbutton label="Test ElementCrawler" oncommand="Crawlers.testDescending(2)" image="${icon:help}"/>
												<ui:toolbarbutton label="Test BindingCrawler" oncommand="Crawlers.testDescending(3)" image="${icon:help}"/>
											</ui:toolbargroup>
										</ui:toolbarbody>
									</ui:toolbar>
									
									<div f="START" id="test1" style="position: absolute;">
										<div f="A1"/>
										<div f="A2" directive="skip node"/> 
										<div f="A3">
											<div f="B1"/>
											<div f="B2"/>
											<div f="B3" nextnode="X1">
												<div f="C1" directive="skip node"/>
												<div f="C2" directive="skip node"/>
												<div f="C3"/>
											</div>
										</div>
										<div f="A4" binding="Binding"/>
										<div f="X1" id="X1">
											<div f="Y1" binding="Binding"/>
											<div f="Y2" directive="skip children">
												<div f="Z1"/>
												<div f="Z2"/>
												<div f="Z3"/>
											</div>
											<div f="Y3">
												<div f="Z4" directive="stop crawling"/>
												<div f="Z5"/>
												<div f="Z6"/>
											</div>
										</div>
									</div>
									
									<ui:sourcecodeviewer syntax="xml">
										<textarea>&lt;div  f="START" id="test1"&gt;
										&lt;div f="A1"/&gt;
										&lt;div f="A2" directive="skip node"/&gt; 
										&lt;div f="A3"&gt;
											&lt;div f="B1"/&gt;
											&lt;div f="B2"/&gt;
											&lt;div f="B3" nextnode="X1"&gt;
												&lt;div f="C1" directive="skip node"/&gt;
												&lt;div f="C2" directive="skip node"/&gt;
												&lt;div f="C3"/&gt;
											&lt;/div&gt;
										&lt;/div&gt;
										&lt;div f="A4" binding="Binding"/&gt;
										&lt;div f="X1" id="X1"&gt;
											&lt;div f="Y1" binding="Binding"/&gt;
											&lt;div f="Y2" directive="skip children"&gt;
												&lt;div f="Z1"/&gt;
												&lt;div f="Z2"/&gt;
												&lt;div f="Z3"/&gt;
											&lt;/div&gt;
											&lt;div f="Y3"&gt;
												&lt;div f="Z4" directive="stop crawling"/&gt;
												&lt;div f="Z5"/&gt;
												&lt;div f="Z6"/&gt;
											&lt;/div&gt;
										&lt;/div&gt;
									&lt;/div&gt;</textarea>
									</ui:sourcecodeviewer>
									
								</ui:tabpanel>
								<ui:tabpanel>
									
									<ui:toolbar>
										<ui:toolbarbody>
											<ui:toolbargroup>
												<ui:toolbarbutton label="Test NodeCrawler" oncommand="Crawlers.testAscending(1)" image="${icon:help}"/>
												<ui:toolbarbutton label="Test ElementCrawler" oncommand="Crawlers.testAscending(2)" image="${icon:help}"/>
												<ui:toolbarbutton label="Test BindingCrawler" oncommand="Crawlers.testAscending(3)" image="${icon:help}"/>
											</ui:toolbargroup>
										</ui:toolbarbody>
									</ui:toolbar>
									
									<div f="STOP" directive="stop crawling">
										<div f="G1"/>
										<div f="G2"/> 
										<div f="G3">
											<div f="F1"/>
											<div f="F2"/>
											<div f="F3" directive="skip node">
												<div f="E1"/>
												<div f="E2"/>
												<div f="E3" binding="Binding">
													<div f="D1"/>
													<div f="D2" id="D2"/>
													<div f="D3">
														<div f="C1"/>
														<div f="C2"/>
														<div f="C3" nextnode="D2">
															<div f="B1"/>
															<div f="B2"/>
															<div f="B3">
																<div f="A1"/>
																<div f="A2"/>
																<div f="START" id="test2"/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<ui:sourcecodeviewer syntax="xml">
										<textarea>&lt;div f="STOP" directive="stop crawling"&gt;
										&lt;div f="G1"/&gt;
										&lt;div f="G2"/&gt; 
										&lt;div f="G3"&gt;
											&lt;div f="F1"/&gt;
											&lt;div f="F2"/&gt;
											&lt;div f="F3" directive="skip node"&gt;
												&lt;div f="E1"/&gt;
												&lt;div f="E2"/&gt;
												&lt;div f="E3" binding="Binding"&gt;
													&lt;div f="D1"/&gt;
													&lt;div f="D2" id="D2"/&gt;
													&lt;div f="D3"&gt;
														&lt;div f="C1"/&gt;
														&lt;div f="C2"/&gt;
														&lt;div f="C3" nextnode="D2"&gt;
															&lt;div f="B1"/&gt;
															&lt;div f="B2"/&gt;
															&lt;div f="B3"&gt;
																&lt;div f="A1"/&gt;
																&lt;div f="A2"/&gt;
																&lt;div f="START" id="test2"/&gt;
															&lt;/div&gt;
														&lt;/div&gt;
													&lt;/div&gt;
												&lt;/div&gt;
											&lt;/div&gt;
										&lt;/div&gt;
									&lt;/div&gt;</textarea>
								</ui:sourcecodeviewer>
								
								</ui:tabpanel>
							</ui:tabpanels>
						</ui:tabbox>
					
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel class="padded">
						<ol id="output">
						
						</ol>
					</ui:splitpanel>
				</ui:splitbox>
			
			
			
		</ui:editorpage>
	</body>
</html>