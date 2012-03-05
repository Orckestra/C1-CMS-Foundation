<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Test.IEBug</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body>
		<ui:page label="IE BUG!">
			<ui:tabbox>
				<ui:tabs>
					<ui:tab label="Palle" />
					<ui:tab label="Birgitte" />
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:splitbox orient="horizontal" layout="1:3">
							<ui:splitpanel>
								<ui:tree id="draggabletree">
									<ui:treebody><!-- dragaccept="filea fileb" -->
										<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.1" open="true">
											<ui:treenode dragtype="filea" label="File A.1" />
											<ui:treenode dragtype="filea" label="File A.2" />
											<ui:treenode dragtype="filea" label="File A.3" />
										</ui:treenode>
										<ui:treenode dragaccept="fileb" label="Folder B.1" open="true">
											<ui:treenode dragtype="fileb" label="File B.1" />
											<ui:treenode dragtype="fileb" label="File B.2" />
											<ui:treenode dragtype="fileb" label="File B.3" />
										</ui:treenode>
										<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.4" open="true">
											<ui:treenode dragtype="filea" label="File A.10" dragaccept="filea foldera" />
											<ui:treenode dragtype="filea" label="File A.11" dragaccept="filea foldera" />
											<ui:treenode dragtype="filea" label="File A.12" dragaccept="filea foldera" />
											<ui:treenode dragtype="filea" label="File A.13" dragaccept="filea foldera" />
											<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.2" open="true">
												<ui:treenode dragtype="filea" label="File A.4" />
												<ui:treenode dragtype="filea" label="File A.5" />
												<ui:treenode dragtype="filea" label="File A.6" />
											</ui:treenode>
											<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.3" open="true">
												<ui:treenode dragtype="filea" label="File A.7" />
												<ui:treenode dragtype="filea" label="File A.8" />
												<ui:treenode dragtype="filea" label="File A.9" />
											</ui:treenode>
											<ui:treenode dragtype="filea" label="File A.12" />
										</ui:treenode>
									</ui:treebody>
								</ui:tree>
							</ui:splitpanel>
							<ui:splitter />
							<ui:splitpanel>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:tabpanel>
					<ui:tabpanel>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>