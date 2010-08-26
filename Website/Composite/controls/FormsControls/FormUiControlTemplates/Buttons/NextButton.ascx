<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        nextButton.Click += this.FormControlClickEventHandler;
        nextButton.Text = this.FormControlLabel;
    }


    private void Page_Load(object sender, System.EventArgs e)
    {
        if (this.Page.Items.Contains("HasFinishButton") == false)
        {
            nextButton.Attributes.Add("client_default", "true");
        }
    }
</script>

<aspui:ClickButton 
    ID="nextButton" 
    AutoPostBack="false" 
    OnClientClick="this.dispatchAction(WizardPageBinding.ACTION_NAVIGATE_NEXT);" 
    CustomClientId="nextbutton" 
    client_image="${icon:next}" 
    client_image-disabled="${icon:next-disabled}" 
    client_focusable="true" 
    runat="server" />
