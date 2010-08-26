<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextEditorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>

<script type="C#" runat="server">

	private string _currentStringValue = null;
	
	protected override void BindStateToProperties()
	{
        _currentStringValue = Request.Form[this.UniqueID];
	    this.Text = HttpContext.Current.Server.UrlDecode ( _currentStringValue );
	}
	protected override void InitializeViewState()
	{
        _currentStringValue = Context.Server.UrlEncode(this.Text ?? string.Empty).Replace("+", "%20");
	}
	public override string GetDataFieldClientName()
	{
	    return this.UniqueID;
	}

</script>

<!-- This should be deprecated for the more generalized "SorceEditor"! -->

<ui:sourceeditor syntax="sql" 
	value="<%= _currentStringValue %>"
	id="<%= this.UniqueID %>"
	name="<%= this.UniqueID %>"
	callbackid="<%= this.UniqueID %>"/>