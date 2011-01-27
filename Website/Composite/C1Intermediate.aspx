<%@ Page Language="C#" ValidateRequest="false" AutoEventWireup="true" CodeBehind="C1Intermediate.aspx.cs" Inherits="C1Intermediate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form  id="form1" runat="server">
    <div>
        <asp:TextBox TextMode="MultiLine" Width="500" Height="400" ID="sourceCodeTextBox" runat="server" />
    </div>
    <div>
        <asp:PlaceHolder ID="resultPlaceHolder" runat="server" />
    </div>
    <div>
        <button id="submit" runat="server">
            Execute</button>
    </div>
    </form>
</body>
</html>


<%--

<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" ValidateRequest="false" AutoEventWireup="true" CodeBehind="C1Intermediate.aspx.cs" Inherits="C1Intermediate" %>

<%@ Register TagPrefix="control" TagName="httpheaders" Src="~/Composite/controls/HttpHeadersControl.ascx" %>
<%@ Register TagPrefix="control" TagName="scriptloader" Src="~/Composite/controls/ScriptLoaderControl.ascx" %>
<%@ Register TagPrefix="control" TagName="styleloader" Src="~/Composite/controls/StyleLoaderControl.ascx" %>


<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders ID="Httpheaders1" runat="server" />
<head id="Head1" runat="server">
     <title>C1 Intermediate</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
</head>
<body>
    <ui:page label="C1 Intermediate" image="${skin}/wysiwygeditor/source.png">
        <ui:scrollbox>
    <form  id="form2" runat="server">
    <div>
        <asp:TextBox TextMode="MultiLine" Width="100%" Height="400" ID="TextBox1" runat="server" />
    </div>
    <div>
        <asp:PlaceHolder ID="PlaceHolder1" runat="server" />
    </div>
    <div>
        <button id="Button1" runat="server">Execute</button>
    </div>
    </form>
            </ui:scrollbox>
    </ui:page>
</body>
</html>
--%>