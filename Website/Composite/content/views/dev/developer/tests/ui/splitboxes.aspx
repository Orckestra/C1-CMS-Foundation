<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Splitboxes</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="Splitboxes">
		
			<ui:tabbox>
				<ui:tabs>
					<ui:tab label="Nothing"/>
					<ui:tab label="Complex nest"/>
					<ui:tab label="Stage layout"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
					
					</ui:tabpanel>
					<ui:tabpanel lazy="true">
						
						
						<ui:splitbox orient="horizontal" layout="1:3">
							<ui:splitpanel/>
							<ui:splitter/>
							<ui:splitpanel>
								<ui:splitbox orient="vertical" layout="1:3">
									<ui:splitpanel/>
									<ui:splitter/>
									<ui:splitpanel>
									 	<ui:splitbox orient="horizontal" layout="1:3">
											<ui:splitpanel/>
											<ui:splitter/>
											<ui:splitpanel>
												<ui:splitbox orient="vertical" layout="1:3">
													<ui:splitpanel/>
													<ui:splitter/>
													<ui:splitpanel>
													 	<ui:splitbox orient="horizontal" layout="1:3">
															<ui:splitpanel/>
															<ui:splitter/>
															<ui:splitpanel>
																<ui:splitbox orient="vertical" layout="1:3">
																	<ui:splitpanel/>
																	<ui:splitter/>
																	<ui:splitpanel>
																	 	<ui:splitbox orient="horizontal" layout="1:3">
																			<ui:splitpanel/>
																			<ui:splitter/>
																			<ui:splitpanel>
																				<ui:splitbox orient="vertical" layout="1:3">
																					<ui:splitpanel/>
																					<ui:splitter/>
																					<ui:splitpanel/>
																				</ui:splitbox>
																			</ui:splitpanel>
																		</ui:splitbox>
																	</ui:splitpanel>
																</ui:splitbox>
															</ui:splitpanel>
														</ui:splitbox>
													</ui:splitpanel>
												</ui:splitbox>
											</ui:splitpanel>
										</ui:splitbox>
									</ui:splitpanel>
								</ui:splitbox>
							</ui:splitpanel>
						</ui:splitbox>
						
						
					</ui:tabpanel>
					<ui:tabpanel lazy="true">
				
						<ui:splitbox orient="horizontal" layout="8:3">
							<ui:splitpanel>
								<ui:splitbox orient="vertical" layout="8:3">
									<ui:splitpanel/>
									<ui:splitter/>
									<ui:splitpanel>
										<ui:splitbox orient="horizontal" layout="1:1">
											<ui:splitpanel/>
											<ui:splitter/>
											<ui:splitpanel/>
										</ui:splitbox>
									</ui:splitpanel>
								</ui:splitbox>
							</ui:splitpanel>
							<ui:splitter collapse="after"/>
							<ui:splitpanel>
								<ui:splitbox orient="vertical" layout="1:1">
									<ui:splitpanel/>
									<ui:splitter/>
									<ui:splitpanel/>
								</ui:splitbox>
							</ui:splitpanel>
						</ui:splitbox>
						
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>