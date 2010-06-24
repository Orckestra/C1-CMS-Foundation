<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Trees</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="TreeTest.js"></script>
	</head>
	<body>
		<ui:page label="Trees">
			<ui:tabbox>
				<ui:tabs>
					<ui:tab label="Draggable Tree"/>
					<ui:tab label="Tree performance test"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:tree id="draggabletree">
							<ui:treebody>
								<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.1" open="true">
									<ui:treenode dragtype="filea" label="File A.1"/>
									<ui:treenode dragtype="filea" label="File A.2"/>
									<ui:treenode dragtype="filea" label="File A.3"/>
								</ui:treenode>
								<ui:treenode dragtype="folderb" dragaccept="folderb fileb" label="Folder B.1" open="true">
									<ui:treenode dragtype="fileb" label="File B.1" dragaccept="fileb"/>
									<ui:treenode dragtype="fileb" label="File B.2" dragaccept="fileb"/>
									<ui:treenode dragtype="fileb" label="File B.3" dragaccept="fileb"/>
								</ui:treenode>
								<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.4" open="true">
									<ui:treenode dragtype="filea" label="File A.10" dragaccept="filea foldera"/>
									<ui:treenode dragtype="filea" label="File A.11" dragaccept="filea foldera"/>
									<ui:treenode dragtype="filea" label="File A.12" dragaccept="filea foldera"/>
									<ui:treenode dragtype="filea" label="File A.13" dragaccept="filea foldera"/>
									<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.2" open="true">
										<ui:treenode dragtype="filea" label="File A.4"/>
										<ui:treenode dragtype="filea" label="File A.5"/>
										<ui:treenode dragtype="filea" label="File A.6"/>
									</ui:treenode>
									<ui:treenode dragtype="foldera" dragaccept="filea foldera" label="Folder A.3" open="true">
										<ui:treenode dragtype="filea" label="File A.7"/>
										<ui:treenode dragtype="filea" label="File A.8"/>
										<ui:treenode dragtype="filea" label="File A.9"/>
									</ui:treenode>
									<ui:treenode dragtype="filea" label="File A.12"/>
								</ui:treenode>
							</ui:treebody>
						</ui:tree>
					</ui:tabpanel>
					<ui:tabpanel lazy="true">
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarbutton label="Build treenodes (API)" oncommand="this.bindingWindow.TreeTest.testAPI()"/>
									<ui:toolbarbutton label="Inject treenodes (innerHTML)" oncommand="this.bindingWindow.TreeTest.testHTML()"/>
								</ui:toolbargroup>
								<ui:toolbargroup>
									<ui:toolbarbutton label="Construct" oncommand="this.bindingWindow.TreeTest.constructBindings()"/>
									<ui:toolbarbutton label="Destruct" oncommand="this.bindingWindow.TreeTest.destructBindings()"/>
									<ui:toolbarbutton label="Attach" oncommand="this.bindingWindow.TreeTest.attachBindings()"/>
									<ui:toolbarbutton label="Detach" oncommand="this.bindingWindow.TreeTest.detachBindings()"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
							<ui:toolbarbody align="right">
								<ui:toolbargroup>
									<ui:selector id="selector" type="number">
										<ui:selection label="1000 treenodes" value="1000"/>
										<ui:selection label="100 treenodes" value="100"/>
										<ui:selection label="10 treenodes" value="10"/>
									</ui:selector>
								</ui:toolbargroup>
								<ui:toolbargroup>
									<ui:clickbutton label="Clear tree" oncommand="this.bindingWindow.bindingMap.testtree.empty()"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:tree id="testtree">
							<ui:treebody/>
						</ui:tree>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>