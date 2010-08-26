<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        cancelButton.Click += this.FormControlClickEventHandler;
        cancelButton.Text = this.FormControlLabel;
    }
</script>

<aspui:ClickButton  ID="cancelButton" 
                    AutoPostBack="false" 
                    client_response="cancel" 
                    client_id="buttonCancel" 
                    client_focusable="true" 
                    runat="server" 
                    client_oncommand="void(false);"/> <!-- DON'T POST AFTER WORKFLOW CANCEL; REMOVE WHEN AJAX! -->
