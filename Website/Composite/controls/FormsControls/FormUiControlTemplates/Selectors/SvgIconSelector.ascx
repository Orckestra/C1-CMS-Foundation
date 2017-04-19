<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SvgIconSelectorTemplateUserControlBase"  %>
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
		this.Selected = _currentStringValue;
	}

	protected override void InitializeViewState()
	{
		_currentStringValue = this.Selected;
	}

	public override string GetDataFieldClientName()
	{
		return this.UniqueID;
	}

</script>

<ui:selector name="<%= this.UniqueID  %>" local="true" >
	<ui:selection selected="true" label="&lt;NONE&gt;" value="" tooltip="&lt;NONE&gt;" required="<%= this.Required.ToString().ToLower() %>" />
	<% 
		foreach (var icon in this.SvgIdsOptions)
		{ %>
			<ui:selection image="${icon:<%= HttpUtility.HtmlAttributeEncode(icon.Key) %>}" label="<%=HttpUtility.HtmlAttributeEncode(icon.Value) %>" value="<%=HttpUtility.HtmlAttributeEncode(icon.Key) %>" <%=(icon.Key==_currentStringValue)?"selected=\"true\"":"" %>/>
	<%  } %>
</ui:selector>
