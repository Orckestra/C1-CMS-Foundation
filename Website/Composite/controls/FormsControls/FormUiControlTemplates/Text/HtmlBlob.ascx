<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.HtmlBlobTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Core.WebClient" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">    
    protected override void BindStateToProperties(){}

    protected override void InitializeViewState(){}

    string ConvertRenderingUrls(string html)
    {
        html = PageUrlHelper.ChangeRenderingPageUrlsToPublic(html);
        html = MediaUrlHelper.ChangeInternalMediaUrlsToPublic(html);
        
        return html;
    }
</script>

<ui:scrollbox>
    <%= ConvertRenderingUrls(this.Html) %>
</ui:scrollbox>




