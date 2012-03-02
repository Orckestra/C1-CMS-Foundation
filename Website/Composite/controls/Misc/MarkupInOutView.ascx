<?xml version="1.0" encoding="UTF-8" ?>
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MarkupInOutView.ascx.cs" Inherits="CompositeMarkupInOutView" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<control:httpheaders id="Httpheaders1" runat="server" />
	<head>
		<title>Composite.Management.FunctionEditor.InputOutputMarkup</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="<%= Composite.Core.WebClient.UrlUtils.ResolveAdminUrl("controls/Misc/MarkupInOutView.css.aspx" ) %>"/>
	</head>
	<body>
		<form id="Form1" runat="server">
			<ui:page>
		    <asp:Placeholder runat="server" id="InputRelated01">
				<ui:splitbox id="functioneditorinputoutputsplitbox" orient="vertical" layout="1:1" persist="layout">
					<ui:splitpanel>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarlabel label="${string:Website.Misc.SourceCodeViewer.LabelInput}" image="${icon:input}"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:sourcecodeviewer syntax="xml">
							<aspui:TextBox TextMode="MultiLine" ID="inMarkupHolder" runat="server" Wrap="false" />
						</ui:sourcecodeviewer>
					</ui:splitpanel>
					<ui:splitter />
					<ui:splitpanel>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarlabel label="${string:Website.Misc.SourceCodeViewer.LabelOutput}" image="${icon:output}"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
		    </asp:Placeholder>
						<asp:PlaceHolder ID="ErrorDetailsPlaceHolder" Visible="false" runat="server">
							<div id="error">
								<div id="erroricon"><!-- emptydiv --></div>
								<div id="errortype">
									<asp:Label ID="ErrorTypeLabel" runat="server" />
								</div>
								<div id="errortext">
									<asp:Label ID="ErrorDescriptionLabel" runat="server" />
								</div>
							</div>
						</asp:PlaceHolder>
						<asp:PlaceHolder id="OutputSourceViewerPlaceHolder" runat="server">
						    <ui:sourcecodeviewer syntax="xml">
							    <aspui:TextBox TextMode="MultiLine" ID="outMarkupHolder" runat="server" Wrap="false" />
						    </ui:sourcecodeviewer>
						</asp:PlaceHolder>
		    <asp:Placeholder runat="server" id="InputRelated02">
					</ui:splitpanel>
				</ui:splitbox>
                    <ui:toolbar class="statusbar">
                        <ui:toolbarbody>
                            <ui:toolbargroup>
                                <ui:toolbarlabel style="color:ThreeDDarkShadow;" label="<%= this.Attributes["statusmessage"] %>" image="${icon:message}" />
                            </ui:toolbargroup>
                        </ui:toolbarbody>
                    </ui:toolbar>
			</asp:Placeholder>
			</ui:page>
		</form>
	</body>
</html>