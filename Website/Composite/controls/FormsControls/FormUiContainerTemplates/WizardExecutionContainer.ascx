<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WizardExecutionContainer.ascx.cs" Inherits="Composite_Forms_WizardExecutionContainer" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<head runat="server">
	    <title>Composite.Management.WizardDocument</title>
	    <control:httpheaders runat="server" />
	    <control:styleloader runat="server" />
	    <control:scriptloader type="sub" runat="server" />
	    <asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	</head>
	<body>
	    <form id="form1" runat="server" class="updateXXXform updateXXXzone">
		    <ui:wizardpage 
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
		    </ui:wizardpage>
	    </form>
	</body>
</html>