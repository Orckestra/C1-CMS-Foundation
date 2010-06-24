<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_CreateDataLayer_Default" Codebehind="Default.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div>
            <strong>Data provider name:</strong><br />
            <asp:TextBox ID="DataProviderNameTextBox" runat="server" Width="500">FrejaWebDevStoreSqlDataProvider</asp:TextBox>
        </div>
        <div>
            <strong>Types:</strong><br />
            <asp:ListBox ID="TypesListBox" runat="server" SelectionMode="Multiple" Rows="20"></asp:ListBox>
        </div>
        <asp:Button ID="ReCreateButton" runat="server" Text="(Re)create data layer" 
		onclick="ReCreateButton_Click" />
    </div>
    </form>
</body>
</html>
