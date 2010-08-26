<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        finishButton.Click += this.FormControlClickEventHandler;
        finishButton.Text = this.FormControlLabel;

        this.Page.Items.Add("HasFinishButton", true);
    }
</script>

<aspui:ClickButton  ID="finishButton" 
                    AutoPostBack="false" 
                    OnClientClick="this.dispatchAction(WizardPageBinding.ACTION_FINISH);" 
                    CustomClientId="finishbutton" 
                    client_image="${icon:finish}" 
                    client_image-disabled="${icon:finish-disabled}" 
                    client_focusable="true" 
                    client_default="true" 
                    runat="server" />
