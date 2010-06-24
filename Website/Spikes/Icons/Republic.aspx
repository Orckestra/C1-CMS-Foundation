<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_Icons_Republic" enableEventValidation="false" Codebehind="Republic.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Untitled Page</title>
    <style>
        body
        {
        	font-family: Arial;
        	font-size: 10pt;
        }
        
        div.iconcontainer
        {
        	float: left;
        	width: 36px;
        	border: solid 1px silver;
        	margin-top: 3px;
        	margin-left: 3px;
        	background-color: #eee;
        }
        
        img
        {
        	float:left;
        	margin-top:4px;
        	margin-bottom:4px;
        	margin-left:4px;
        }
        
        div.normal span
        {
        	margin-left: 28px;
        }
        
        div.large span
        {
        	margin-left: 36px;
        }
        
        div.xlarge span
        {
        	margin-left: 54px;
        }
        
        span.iconnamespace,
        span.iconname
        {
        	display: block;
        }
        
        span.iconnamespace
        {
        	font-size: 7pt;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:DropDownList ID="IconSize" runat="server" onselectedindexchanged="IconSize_SelectedIndexChanged" AutoPostBack="true" >
            <asp:ListItem Value="*16px*.png" />
            <asp:ListItem Value="*24px*.png" />
            <asp:ListItem Value="*32px*.png" />
        </asp:DropDownList>
        
        <asp:PlaceHolder ID="IconPlaceHolder" runat="server" />
    </div>
    </form>
</body>
</html>
