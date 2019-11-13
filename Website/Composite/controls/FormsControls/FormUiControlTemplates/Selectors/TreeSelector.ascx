<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TreeSelectorTemplateUserControlBase"  %>

<script runat="server">

	private string _currentStringValue;

	protected override void InitializeViewState()
	{
		_currentStringValue = this.SelectedKey;
	}

	public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
	{
		_currentStringValue = postCollection[postDataKey];
		return true;
	}

	protected override void BindStateToProperties()
	{
		this.SelectedKey = _currentStringValue;
	}

	public override string GetDataFieldClientName()
	{
		return this.UniqueID;
	}

	private string ValidationParams()
	{
		var paramsBuilder = new StringBuilder();

		if (this.Required) paramsBuilder.Append(@" required=""true""");

		return paramsBuilder.ToString();
	}

	public string FilterCharactersAndEncode(string text)
	{
		// Filtering '\0' character, browsers' xml readers cannot parse neither '\0' nor "&#x0;"
		return Server.HtmlEncode((text ?? string.Empty).Replace('\0', ' '));
	}


</script>
<ui:datainputdialog
	readonly="true"
	id="<%= this.UniqueID  %>"
	name="<%= this.UniqueID  %>"
	element-provider="<%= FilterCharactersAndEncode(this.ElementProvider)  %>"
	selection-property="<%= FilterCharactersAndEncode(this.SelectableElementPropertyName)  %>"
	selection-value="<%= FilterCharactersAndEncode(this.SelectableElementPropertyValue)  %>"
	selection-result="<%= FilterCharactersAndEncode(this.SelectableElementReturnValue)  %>"
	serialized-search-token="<%= FilterCharactersAndEncode(this.SerializedSearchToken)  %>"
	value="<%= FilterCharactersAndEncode(_currentStringValue) %>" binding="TreeSelectorDialogBinding"
	<%= ValidationParams() %> />
