<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        this.ID = "DocumentBody";
        foreach (FormControlDefinition formControlDefinition in this.FormControlDefinitions)
        {
            content.Controls.Add(formControlDefinition.FormControl);
        }

        if (this.FormControlDefinitions[0].IsFullWidthControl == true)
        {
            this.paddingStart.Visible = false;
            this.paddingEnd.Visible = false;
        }
    }
</script>

<asp:PlaceHolder ID="paddingStart" runat="server">
    <ui:scrollbox class="padded">
</asp:PlaceHolder>

<asp:PlaceHolder ID="content" runat="server">
</asp:PlaceHolder>

<asp:PlaceHolder ID="paddingEnd" runat="server">
    </ui:scrollbox>
</asp:PlaceHolder>
