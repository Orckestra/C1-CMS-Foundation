<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" Inherits="Composite_content_views_mediabrowser" CodeFile="mediabrowser.aspx.cs" %>
<%@ Import Namespace="Composite.C1Console.Elements" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head>
		<title>Media Browser</title>

        <control:httpheaders runat="server" />
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" updateManagerDisabled="True"/>

		<link rel="stylesheet" type="text/css" href="mediabrowser.css.aspx" />
	</head>
	<body>
		<form id="Form1" runat="server">
			<ui:page label="${string:ServerLog.LabelTitle}" image="${icon:log-viewlog}">

				<ui:scrollbox id="scrollbox" class="padded">
                   
                    <asp:PlaceHolder runat="server" ID="plhShowFile" Visible="false">
                        <div class="filePreview">
                            <div class="fileName">
                              <asp:Literal runat="server" ID="txtFileName"></asp:Literal>  
                            </div>
                            <div class="title">
                              <asp:Literal runat="server" ID="txtTitle"></asp:Literal>  
                            </div>
                            
                            <div class="imagePreviewFrame">
                                <img id="imgViewFile" runat="server" class="previewImage" Visible="false" />
                            </div>
                            
                            <div class="previewIcon" runat="server" ID="divIconPreview" Visible="false">
                                <ui:labelbox class="imageonly" image="<%= FileIconName %>" />
                            </div>

                            <div class="description">
                              <asp:Literal runat="server" ID="txtDescription"></asp:Literal>  
                            </div>
                        </div>
                    </asp:PlaceHolder>
                    
                    <asp:PlaceHolder runat="server" ID="plhShowFolder" Visible="false">
                        <div class="folderPreview clearfix">
                            
                            <asp:Repeater runat="server" ID="rptElements">
                                <ItemTemplate>
                                    <div class="previewItem">
                                        <div class="imagePreviewFrame">
                                            <img ID="imgPreview" runat="server" class="previewImage" Visible="false" />
                                            
                                            <div class="previewIcon" runat="server" ID="divIconPreview" Visible="false">
                                                <ui:labelbox class="imageonly" image="<%# (Container.DataItem as Element).VisualData.Icon.ResourceName %>" />
                                            </div>
                                        </div>

                                        <div class="title">
                                            <asp:Literal runat="server" ID="txtTitle" />
                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>

                        </div>
                    </asp:PlaceHolder>

				</ui:scrollbox>
			</ui:page>
		</form>
	</body>
</html>
