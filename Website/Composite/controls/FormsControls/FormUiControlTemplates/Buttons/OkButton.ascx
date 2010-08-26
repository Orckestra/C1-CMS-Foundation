<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {        
        finishButton.Click += this.FormControlClickEventHandler;
        finishButton.Text = this.FormControlLabel;

        this.Page.Items.Add("HasOkButton", true);
    }
</script>

<aspui:ClickButton  ID="finishButton" 
                    AutoPostBack="false" 
                    CustomClientId="buttonAccept" 
                    client_validate="true"  
                    client_focusable="true" 
                    client_default="true" 
                    runat="server" />