<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Audio</title>
		<script type="text/javascript" src="audio.js"></script>
		<style type="text/css">
			html,
			body {
				margin: 0;
				padding: 0;
				border: none;
				background-color: ThreeDFace;
			}
		</style>
	</head>
	<body>
		<div>
			<object id="audio" type="application/x-shockwave-flash" data="../../../flash/CompositeManagementAudio.swf" height="215" width="138">
				<param name="movie" value="../../../flash/CompositeManagementAudio.swf"/>
			</object>
		</div>
	</body>
</html>