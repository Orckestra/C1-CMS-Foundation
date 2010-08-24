<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Help.Contents</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="_frontend/styles/help.css.aspx"/>
		<script type="text/javascript" src="_frontend/scripts/help.js"></script>
	</head>
	<body>
	
		<h4>Tasks</h4>
		<ui:tree flex="false">
			<ui:treebody>
				<ui:treenode label="Brugeradministration">
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Administion af rettigheder">
						<ui:treenode label="Rettigheder på brugere" url="dummy1.aspx"/>
						<ui:treenode label="Rettigheder på sider" url="dummy1.aspx"/>
					</ui:treenode>
				</ui:treenode>
				<ui:treenode label="Brugeradministration">
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Administion af rettigheder">
						<ui:treenode label="Rettigheder på brugere" url="dummy1.aspx"/>
						<ui:treenode label="Rettigheder på sider" url="dummy1.aspx"/>
					</ui:treenode>
				</ui:treenode>
			</ui:treebody>
		</ui:tree>
		
		<h4>Reference</h4>
		<ui:tree flex="false">
			<ui:treebody>
				<ui:treenode label="Brugeradministration">
					<ui:treenode label="Opret en ny bruger"/>
					<ui:treenode label="Administion af rettigheder">
						<ui:treenode label="Rettigheder på brugere"/>
						<ui:treenode label="Rettigheder på sider"/>
					</ui:treenode>
				</ui:treenode>
				<ui:treenode label="Brugeradministration">
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Opret en ny bruger" url="dummy1.aspx"/>
					<ui:treenode label="Administion af rettigheder">
						<ui:treenode label="Rettigheder på brugere" url="dummy1.aspx"/>
						<ui:treenode label="Rettigheder på sider" url="dummy1.aspx"/>
					</ui:treenode>
				</ui:treenode>
			</ui:treebody>
		</ui:tree>
		
		<h4>(Birgitte)</h4>
		<ui:tree flex="false">
			<ui:treebody>
				<ui:treenode label="Standard side" url="_frontend/templates/standard.aspx"/>
			</ui:treebody>
		</ui:tree>
		
	</body>
</html>