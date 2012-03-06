<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SaveButtonTemplateUserControlBase" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.WebClient" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        (this.Page as FlowPage).OnSave = SaveEventHandler;

        if (this.SaveAndPublishEventHandler != null)
        {
            SaveAndPublishButtonPlaceholder.Visible = true;
            
            ShadowLinkButton.Click += this.SaveAndPublishEventHandler;
            ShadowLinkButton.Text = this.FormControlLabel;
        }
    }

</script>

<ui:toolbarbutton
    oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
    id="savebutton"
    image="${icon:save}" 
    image-disabled="${icon:save-disabled}" 
    label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
    observes="broadcasterCanSave" />


<asp:PlaceHolder ID="SaveAndPublishButtonPlaceholder" Visible="false" runat="server">
    <span style="display:none;"><asp:LinkButton runat="server" ID="ShadowLinkButton" Visible="true" Text="Computer!"/></span>
    <ui:toolbarbutton   label="Save and PÅBLISJ"
                        tooltip="Click me and you got two things done is one step!"
                        observes='broadcasterCanSave' 
                        callbackid='<%= ShadowLinkButton.ClientID %>' />
</asp:PlaceHolder>
