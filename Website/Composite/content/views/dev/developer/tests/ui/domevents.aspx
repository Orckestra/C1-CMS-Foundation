<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Fields</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
		window.onload = function () {
			var target = document.getElementById ( "target" );
			var logger = SystemLogger.getLogger ( "DOMEvents TEST" );
			DOMEvents.addEventListener ( target, DOMEvents.MOUSEENTER, {
				handleEvent : function ( e ) {
					logger.debug ( e.type + ": " + Math.random ());
				}
			});
			DOMEvents.addEventListener ( target, DOMEvents.MOUSELEAVE, {
				handleEvent : function ( e ) {
					logger.debug ( e.type + ": " + Math.random ());
				}
			});
		}
		</script>
	</head>
	<body>
		<ui:page label="Testing DOMEvents" class="padded">
			<div id="target" style="background-color: #FFFFFF; padding: 20px;">
				<div style="background-color: #CCCCCC; padding: 20px;">
					<div style="background-color: #888888; padding: 20px;">
						
					</div>
				</div>
			</div>
		</ui:page>
	</body>
</html>