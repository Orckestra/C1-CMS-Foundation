<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="EmptyDocumentExecutionContainer.ascx.cs" Inherits="Composite_Forms_EmptyDocumentExecutionContainer" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<head runat="server">
		<title>Composite.Management.EmptyDocument</title>
		<control:httpheaders ID="Httpheaders1" runat="server" />
		<control:styleloader ID="Styleloader1" runat="server" />
		<control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
		<asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	</head>
	<body id="root">
		<form id="form1" runat="server" class="updateform updatezone">
			<ui:editorpage 
				id="formcontrolpage"
            	image="<%= Server.HtmlEncode( this.ContainerIconClientString )%>"
			    label="<%= Server.HtmlEncode( this.ContainerLabel )%>">
				
				<aspui:Feedback runat="server" 
					ID="ctlFeedback" 
					OnCommand="OnMessage" />
					
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
				</ui:broadcasterset>
				 
				<asp:PlaceHolder ID="customBroadcasterSets" runat="server" />
				<asp:PlaceHolder ID="formPlaceHolder" runat="server" />
				<asp:PlaceHolder ID="messagePlaceHolder" runat="server" />
					
			</ui:editorpage>
		</form>
	</body>
</html>