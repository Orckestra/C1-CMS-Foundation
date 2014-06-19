<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
<%
	Response.Cache.SetExpires(DateTime.Now.AddHours(1));
	Response.Cache.SetCacheability(HttpCacheability.Private);
%>

	<control:httpheaders runat="server"/>
	<head>
		<!-- dont change this title! -->
		<title>Composite.Management.DefaultPostBack</title>
		<link rel="stylesheet" type="text/css" href="postback.css"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="postback.js"></script>
	</head>
	<body> 
		<form action="javascript:void(false);" method="post" target="_self"/>
	</body>
</html>