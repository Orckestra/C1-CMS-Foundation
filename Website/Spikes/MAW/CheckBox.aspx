<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_MAW_CheckBox" Codebehind="CheckBox.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:CheckBox ID="hejsa" runat="server" oncheckedchanged="hejsa_CheckedChanged" AutoPostBack="true"  />
    </div>
    </form>
    
    <form method="get">
        <input id="Checkbox1" type="checkbox" name="hejsa" />
        <input type="submit" />
    </form>
</body>
</html>
