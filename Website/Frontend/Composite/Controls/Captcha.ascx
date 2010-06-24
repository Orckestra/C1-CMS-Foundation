<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Captcha.ascx.cs" Inherits="Composite.Frontend.Controls.Captcha" %>

<div>
 <input type="hidden" id="hdnEncryptedValue" name="encryptedValue" runat="server" />
 <div>
   <img runat="server" id="imgCaptcha" />
   <br />
   <input type="text" id="txtValue" runat="server" /> <label id="lblInvalidValue" runat="server">*</label>
 </div>
</div>