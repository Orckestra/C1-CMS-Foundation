<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HttpHeadersControl.ascx.cs" Inherits="HttpHeadersControl" %>
<%@ Register Src="~/Composite/controls/RegisterOutputTransformation.ascx" TagPrefix="local" TagName="outputtransformation" %>
<local:outputtransformation ID="StructureTransformation" runat="server" position="1" path="transformations/defaultfilters/structurefilter.xsl"/>
<local:outputtransformation ID="CoreOutputTransformation" runat="server" position="10" path="transformations/defaultfilters/masterfilter.xsl"/>
<local:outputtransformation ID="FinalizeTransformation" runat="server" position="20" path="transformations/defaultfilters/finalizefilter.xsl"/>
