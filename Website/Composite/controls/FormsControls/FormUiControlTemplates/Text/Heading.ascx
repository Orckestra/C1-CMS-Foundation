<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.HeadingTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">    
    protected override void InitializeViewState(){}
</script>

<ui:pagehead>
	<ui:pageheading><%= this.Title %></ui:pageheading>
	<ui:pagedescription><%= this.Description %></ui:pagedescription>
</ui:pagehead>


