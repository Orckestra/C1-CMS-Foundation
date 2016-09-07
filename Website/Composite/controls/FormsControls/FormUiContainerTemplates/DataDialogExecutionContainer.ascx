<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DataDialogExecutionContainer.ascx.cs"
    Inherits="Composite_Forms_DataDialogExecutionContainer" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head id="Head1" runat="server">
	    <title>Composite.Management.DialogDocument</title>
	    <control:httpheaders id="Httpheaders1" runat="server" />
	    <control:styleloader id="Styleloader1" runat="server" />
	    <control:scriptloader id="Scriptloader1" type="sub" runat="server" />
	    <asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	</head>
	<body>
	    <form id="form1" runat="server" class="updateDISABLEDform updatezone">
		    <ui:dialogpage
		    	id="formcontrolpage"
		    	label="<%= Server.HtmlEncode( this.ContainerLabel )%>"
		    	image="<%= Server.HtmlEncode( this.ContainerIconClientString )%>"
		        resizable="false">

		        <aspui:Feedback runat="server"
		        	ID="ctlFeedback"
		        	OnCommand="OnMessage" />

				<asp:PlaceHolder ID="customBroadcasterSets" runat="server" />
				<asp:PlaceHolder ID="formPlaceHolder" runat="server"/>
				<div style="display: none;" id="clientmessages">
					<asp:PlaceHolder ID="messagePlaceHolder" runat="server"/>
				</div>
			</ui:dialogpage>
	    </form>
	</body>
</html>
