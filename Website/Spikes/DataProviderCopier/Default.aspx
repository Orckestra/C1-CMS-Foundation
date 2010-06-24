<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_DataProviderCopier_Default" Codebehind="Default.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Copy database</title>
</head>
<body>
    <form id="mainForm" runat="server">
    <div>
        <h2>Copy database</h2>
        <p>
          <div>With help of this page you can transfer all types and data from one data provider to another.</div>
          <div>Select source and target data providers:</div>
        </p>
        <table border="0">
         <tr>
          <td>
            Source
          </td>
          <td>
            <asp:DropDownList ID="sourceDataProviderDropDownList" runat="server" ToolTip="Source data provider" />
          </td>
         </tr>
         <tr>
          <td>
            Target
          </td>         
          <td>
            <asp:DropDownList ID="destinationDataProviderDropDownList" runat="server" ToolTip="Target data provider" />
          </td>
         </tr>         
         <tr>
          <td colspan="2">
            <asp:Button ID="doCopyButton" OnClick="doCopyButton_Click" runat="server" Text="Start type / data copying..." />
          </td>
         </tr>          
        </table>
       <br />
       <br />
       <asp:Label id="lblResult" runat="server"/>
    </div>
    </form>

</body>
</html>
