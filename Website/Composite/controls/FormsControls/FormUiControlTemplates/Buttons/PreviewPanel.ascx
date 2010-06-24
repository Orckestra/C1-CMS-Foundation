<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.PreviewTabPanelTemplateUserControlBase" %>
<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        this.Controls.Add( this.EventControl );
    }
</script>
<ui:window id="previewwindow" binding="PreviewWindowBinding"/>
