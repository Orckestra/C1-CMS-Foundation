<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.PreviewTabPanelTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        this.Controls.Add( this.EventControl );
    }
</script>
<ui:window id="previewwindow" binding="PreviewWindowBinding"/>
