<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CaptchaTest.aspx.cs" Inherits="Composite.Spikes.DDZ.CaptchaTest" %>

<%@ Register src="../../Frontend/Composite/Controls/Captcha.ascx" tagname="Captcha" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>CAPTCHA test</title>
</head>
<body>
     <asp:MultiView ID="mlvMain" runat="server">
       <asp:View ID="viewInput" runat="server">
          <form id="form" runat="server">       
            <div>
                Name:
                <br />
                <asp:TextBox runat="server" ID="txtName" />
                <br />
                E-mail:
                <br />
                <asp:TextBox runat="server" ID="txtEmail" />        
                
                <uc1:Captcha ID="Captcha1" runat="server" />
                
                <input id="Submit1" type="submit" runat="server" OnServerClick="OnSubmit"/>
            </div>
            </form>                
      </asp:View>
      <asp:View ID="viewSumbitted" runat="server">
        Submitted. Thank you for the participation!!!
      </asp:View>
    </asp:MultiView>
  
</body>
</html>
