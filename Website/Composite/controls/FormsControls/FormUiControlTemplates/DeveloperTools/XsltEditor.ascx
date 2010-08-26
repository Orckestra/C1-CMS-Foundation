<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.XhtmlEditorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script type="C#" runat="server">

	private string _currentStringValue = null;

    protected override void BindStateToProperties()
    {
        _currentStringValue = Request.Form[this.UniqueID];
        this.Xhtml = HttpContext.Current.Server.UrlDecode(_currentStringValue);
    }
    protected override void InitializeViewState()
    {
       _currentStringValue = HttpContext.Current.Server.UrlEncode ( this.Xhtml ).Replace("+", "%20");;
    }
    public override string GetDataFieldClientName()
    {
        return this.UniqueID;
    }
</script>

<!-- This should be deprecated for the more generalized "SorceEditor"! -->

<ui:sourceeditor syntax="xsl" 
	value="<%= _currentStringValue %>"
	id="<%= this.UniqueID %>"
	name="<%= this.UniqueID %>"
	callbackid="<%= this.UniqueID %>"/>