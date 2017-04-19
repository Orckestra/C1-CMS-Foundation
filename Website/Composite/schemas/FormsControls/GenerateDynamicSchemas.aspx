<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GenerateDynamicSchemas.aspx.cs"
    Inherits="Composite_schemas_FormsControls_GenerateDynamicSchemas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>C1 CMS Form UI Schemas</title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:PlaceHolder ID="XsdTable" runat="server"></asp:PlaceHolder>
    <hr />
    <div>
        <asp:Button Text="Re-generate all Form UI schemas" ID="GenerateButton" runat="server" />
    </div>
    </form>
</body>
</html>
