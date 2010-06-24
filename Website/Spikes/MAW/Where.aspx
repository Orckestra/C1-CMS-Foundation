<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" Inherits="Spikes_MAW_Where" Codebehind="Where.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="QueryMarkupTextBox" runat="server" TextMode="MultiLine" Width="100%" Rows="25"></asp:TextBox>
    </div>
    <asp:Button ID="TheBigPostBackButton" runat="server" Text="Query again...." />
    <asp:PlaceHolder ID="ResultPlaceHolder" runat="server">
        
    </asp:PlaceHolder>
    </form>
</body>
</html>
