<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        foreach (FormControlDefinition formControlDefinition in this.FormControlDefinitions)
        {
            content.Controls.Add(formControlDefinition.FormControl);
        }
    }
</script>

<asp:PlaceHolder ID="content" runat="server">
</asp:PlaceHolder>
