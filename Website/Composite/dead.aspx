<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>    

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dead</title>
		<style type="text/css">
			html,
			body {
				height: 100%;
			}
			html {
				background-color: ThreeDFace;
				color: WindowText;
			}
			html,
			body {
				border: none;
				margin: 0;
				padding: 0;
			}
		</style>
	</head>
	<body>
		<!-- 
			When a WindowBinding gets disposed, we need to load an empty document 
			into the associated iframe in order to fix a bug in Explorer where 
			the primary window content could be observed to hang around eerily. 
			Note that we cannot use an "about:blank" on a HTTPS protocol.
		-->
	</body>
</html>