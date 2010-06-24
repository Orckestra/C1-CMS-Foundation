<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FixSearchTokens.aspx.cs" Inherits="FixSearchTokens" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form" runat="server">
    <div>
        Cliking the button starts conversion from old MediaFileSearchTokens objects to new ones
        <asp:Button runat="server" ID="btnStart" Text="Start" OnClick="Process"/>
    </div>
    </form>
</body>
</html>
