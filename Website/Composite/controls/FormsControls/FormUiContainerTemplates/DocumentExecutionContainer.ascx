<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" Inherits="Composite_Forms_DocumentExecutionContainer" CodeFile="DocumentExecutionContainer.ascx.cs" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head runat="server">
		<title>Composite.Management.Document</title>
		<control:httpheaders ID="Httpheaders1" runat="server" />
		<control:styleloader ID="Styleloader1" runat="server" />
		<control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
		<asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	</head>
	<body id="root">
		<form id="form1" runat="server" class="updateform updatezone">
			<ui:editorpage id="formcontrolpage" 
            	image="<%= Server.HtmlEncode ( this.ContainerIconClientString ) %>"
			    label="<%= Server.HtmlEncode ( this.ContainerLabel ) %>"
                labelfield="<%= Server.HtmlEncode( GetTitleFieldControlId() ) %>"
				<% if (this.ContainerTooltip != null) { %>
					tooltip="<%= Server.HtmlEncode ( this.ContainerTooltip ) %>"
				<% } %>
			>

				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
				</ui:broadcasterset> 

                <aspui:Feedback runat="server" 
                    ID="ctlFeedback"
                    OnCommand="OnMessage" />

				<asp:PlaceHolder ID="customBroadcasterSets" runat="server" />
				<asp:PlaceHolder ID="formPlaceHolder" runat="server" />
                <div id="TEMP_ID">
				<asp:PlaceHolder ID="messagePlaceHolder" runat="server"/>
                </div>
						
			</ui:editorpage>
		</form>
	</body>
</html>