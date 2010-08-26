<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        ShadowSaveLinkButton.Click += this.FormControlClickEventHandler;
        ShadowSaveLinkButton.Text = this.FormControlLabel;
    }
</script>
<span style="display:none;"><asp:LinkButton runat="server" ID="ShadowSaveLinkButton" Visible="true" Text="Computer!"/></span>

<ui:toolbarbutton   oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
                    callbackid="<%=ShadowSaveLinkButton.ClientID%>" 
                    id="saveasbutton" 
                    image="${skin}/imageeditor/save.png" 
                    image-disabled="${skin}/imageeditor/save-disabled.png" 
                    label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
                    observes="broadcasterCanSave"/>

