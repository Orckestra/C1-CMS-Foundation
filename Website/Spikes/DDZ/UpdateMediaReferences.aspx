<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UpdateMediaReferences.aspx.cs" Inherits="Composite.Spikes.DDZ.UpdateMediaReferences" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form" runat="server">
    <div>
        Cliking the button below will update all media references to the new format
        <asp:Button runat="server" ID="btnStart" Text="Start" OnClick="Process"/>
    </div>
    </form>
</body>
</html>
