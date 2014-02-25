<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FunctionCallsDesigner.ascx.cs" Inherits="CompositeFunctionCallsDesigner.FunctionCallsDesigner" %>
<%@ Import Namespace="System.Xml" %>
<ui:functioneditor stateprovider="<%= this.SessionStateProvider %>" handle="<%= this.SessionStateId %>" id="<%=ClientID %>" hasbasic="<%= XmlConvert.ToString(HasBasic) %>"/>