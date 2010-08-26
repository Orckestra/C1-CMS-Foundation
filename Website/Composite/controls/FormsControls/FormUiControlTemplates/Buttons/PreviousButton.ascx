<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        previousButton.Click += this.FormControlClickEventHandler;
        previousButton.Text = this.FormControlLabel;
    }
</script>

<aspui:ClickButton 
    ID="previousButton" 
    AutoPostBack="false" 
    OnClientClick="this.dispatchAction(WizardPageBinding.ACTION_NAVIGATE_PREVIOUS);" 
    CustomClientId="previousbutton" 
    client_image="${icon:previous}" 
    client_image-disabled="${icon:previous-disabled}" 
    client_focusable="true" 
    runat="server" />
