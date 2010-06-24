<?xml version="1.0" encoding="UTF-8"?>
<%@ Register tagPrefix="control" tagName="helpcontent" src="HelpContentControl.ascx" %>
<%@ Register TagPrefix="control" TagName="transform" Src="~/Composite/controls/RegisterOutputTransformation.ascx" %>
<control:transform ID="LocalTransform" runat="server" position="1" path="content/views/help/helpcontent.xsl"/>
<control:httpheaders runat="server" />
<control:helpcontent runat="server"/>