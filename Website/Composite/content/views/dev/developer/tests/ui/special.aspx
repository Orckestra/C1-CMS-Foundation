<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.SourceCodeViewers</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="special.css.aspx"/>
		<script type="text/javascript">
			function ready () {
			
			}
		</script>
	</head>
	<body>
		<ui:page label="Special!">
			<object id="applet" type="application/x-java-applet;version=1.5">
				<param name="code" value="org.dataplastique.editor.XMLEditorApplet"/>
				<param name="archive" value="xmleditor.jar"/>
				<param name="cache_option" value="no"/>
			</object>
		</ui:page>
	</body>
</html>