<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
    <head runat="server">
        <title>Composite.Management.CompletedUI</title>
        <control:scriptloader type="sub" runat="server"/>
		<control:styleloader runat="server"/>
		<link rel="stylesheet" type="text/css" href="FlowUICompleted.css.aspx"/>
		<script type="text/javascript" src="FlowUICompletedPageBinding.js"></script>
    </head>
    <body>
    	<ui:page 
    		binding="FlowUICompletedPageBinding" 
    		label="${string:Website.FlowUICompleted.ExecutionEndedTitle}" 
    		image="${icon:generic-delete}">
	        <div id="layout">
				<ui:cover id="cover" busy="false"/>
	        	<div id="image"></div>
	        	<div id="text">
		            <ui:text label="${string:Website.FlowUICompleted.ExecutionEndedMessage}"/>
				</div>
	        </div>
	    </ui:page>
    </body>
</html>