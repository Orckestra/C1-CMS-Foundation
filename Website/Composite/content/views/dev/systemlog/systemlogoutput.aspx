<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
    
	<control:httpheaders runat="server"/>
	<head>
		<title>Log Output</title>
		<link rel="stylesheet" type="text/css" media="screen" href="systemlogoutput.css.aspx"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
		//<![CDATA[
			DocumentManager.isDocumentSelectable = true;
			DocumentManager.hasNativeContextMenu = true;
		//]]>
		</script>
	</head>
	<body>
	</body>
</html>