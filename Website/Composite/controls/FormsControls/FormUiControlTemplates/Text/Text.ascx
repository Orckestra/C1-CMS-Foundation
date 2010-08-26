<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">    
    protected override void BindStateToProperties(){}

    protected override void InitializeViewState(){}
</script>

<%= "<span>" + HttpUtility.HtmlEncode(this.Text).Replace("\n", "</span><br/><span>") + "</span>" %>




