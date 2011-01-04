<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ToolbarButtonTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        ShadowLinkButton.Click += this.FormControlClickEventHandler;
        ShadowLinkButton.Text = this.FormControlLabel;
    }


    private string OptionalParams
    {
        get
        {
            StringBuilder sb = new StringBuilder();

            string oncommands = "";
            
            if (this.FormControlSaveBehaviour == true)
            {
                sb.Append("observes='broadcasterCanSave' ");
                oncommands += "this.dispatchAction(EditorPageBinding.ACTION_SAVE);";
            }

            if (this.FormControlClickEventHandler != null)
            {
                sb.AppendFormat("callbackid='{0}' ", ShadowLinkButton.ClientID);

                /*
                 * Client auto-generates this action dispatch when it sees a callbackid...
                 *
                if (this.FormControlSaveBehaviour == false)
                    oncommands += "this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);";
                */
            }

            if (string.IsNullOrEmpty(this.FormControlLaunchUrl) == false)
                sb.AppendFormat("url='{0}' ",  HttpUtility.HtmlAttributeEncode(this.FormControlLaunchUrl));

            if (string.IsNullOrEmpty(this.FormControlIconHandle) == false)
                sb.AppendFormat("image='${{icon:{0}}}' ", this.FormControlIconHandle);

            if (string.IsNullOrEmpty(this.FormControlDisabledIconHandle) == false)
                sb.AppendFormat("image-disabled='${{icon:{0}}}' ", this.FormControlDisabledIconHandle);

            if (string.IsNullOrEmpty(oncommands) == false)
                sb.AppendFormat("oncommand='{0}' ", oncommands);

            if (this.FormControlIsDisabled == true)
                sb.Append("isdisabled='true' ");

            return sb.ToString();
        }
    }
    
</script>
<span style="display:none;"><asp:LinkButton runat="server" ID="ShadowLinkButton" Visible="true" Text="Computer!"/></span>

<ui:toolbarbutton   label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
                    tooltip="<%=Server.HtmlEncode(this.FormControlHelp)%>"
                    <%= this.OptionalParams %>
                    />



