<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.FontIconSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<script runat="server">
	
	private string _currentStringValue = null;

	protected void Page_Init(object sender, EventArgs e)
	{
		if (_currentStringValue == null)
		{
			_currentStringValue = Request.Form[this.UniqueID]??string.Empty;
		}
	}

	protected override void BindStateToProperties()
	{
		this.SelectedClassName = _currentStringValue;
	}

	protected override void InitializeViewState()
	{
		_currentStringValue = this.SelectedClassName;
	}

	public override string GetDataFieldClientName()
	{
		return this.UniqueID;
	}

</script>

<ui:selector name="<%= this.UniqueID  %>" local="true" >
	<ui:selection selected="true" label="&lt;NONE&gt;" value="" tooltip="&lt;NONE&gt;" required="<%= this.Required.ToString().ToLower() %>" />
	<% 
		foreach (var icon in this.ClassNameOptions)
		{ %>
			<ui:selection image="${class:<%= this.ClassNamePrefix+HttpUtility.HtmlAttributeEncode(icon.Key) %>}" label="<%=HttpUtility.HtmlAttributeEncode(icon.Value) %>" value="<%=HttpUtility.HtmlAttributeEncode(icon.Key) %>" <%=(icon.Key==_currentStringValue)?"selected=\"true\"":"" %>/>
	<%  } %>
</ui:selector>

<ui:stylesheet id="stylebinding"  link="<%= Composite.Core.WebClient.UrlUtils.ResolvePublicUrl( this.StylesheetPath )  %>" />
