<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.ButtonTemplateUserControlBase" %>
<%@ Import Namespace="Composite.WebClient" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        (this.Page as FlowPage).OnSave = FormControlClickEventHandler;
    }
    
</script>

<ui:toolbarbutton
    oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
    id="savebutton"
    image="${icon:save}" 
    image-disabled="${icon:save-disabled}" 
    label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
    observes="broadcasterCanSave" />