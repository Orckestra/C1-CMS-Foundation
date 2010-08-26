<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">    
    protected override void BindStateToProperties(){}

    protected override void InitializeViewState(){}
</script>

<div style="height:8em; background-color:White; padding: 0.3em; border:solid 1px ThreeDShadow; overflow: auto; margin-bottom:1em">
  <%= "<span>" + HttpUtility.HtmlEncode(this.Text ?? "").Replace("\n", "</span><br/><span>") + "</span>" %>
</div>






