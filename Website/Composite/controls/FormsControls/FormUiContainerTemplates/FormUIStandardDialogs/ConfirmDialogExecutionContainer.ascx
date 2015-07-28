<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ConfirmDialogExecutionContainer.ascx.cs" Inherits="Composite_Forms_ConfirmDialogExecutionContainer" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head id="Head1" runat="server">
	    <title>Composite.Management.ConfirmDialog</title>
	    <control:httpheaders id="Httpheaders1" runat="server" />
	    <control:styleloader id="Styleloader1" runat="server" />
	    <control:scriptloader id="Scriptloader1" type="sub" runat="server" />
	    <asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	</head>
	<body>
	    <form id="form1" runat="server">
		    <ui:dialogpage 
		    	id="formcontrolpage"
		    	class="standard question" 
		    	label="<%= Server.HtmlEncode( this.ContainerLabel )%>"
		        image="${icon:question}"  
		        width="380" 
		        resizable="false">
		        
		        <aspui:Feedback runat="server"
		         	ID="ctlFeedback"
		         	OnCommand="OnMessage" />
		        
		        <asp:PlaceHolder ID="formPlaceHolder" runat="server"/>
		        <div style="display: none;">
		        	<asp:PlaceHolder ID="messagePlaceHolder" runat="server"/>
		        </div>
		    </ui:dialogpage>
	    </form>
	</body>
</html>