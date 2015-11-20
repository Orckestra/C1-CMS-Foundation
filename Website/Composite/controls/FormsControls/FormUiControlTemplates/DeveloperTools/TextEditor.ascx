<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextEditorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>

<script type="C#" runat="server">

	private string _currentStringValue = null;
	
	protected override void BindStateToProperties()
	{
        _currentStringValue = Request.Form[this.UniqueID];
        this.Text = HttpContext.Current.Server.UrlDecode(_currentStringValue);
	}
	protected override void InitializeViewState()
	{
        _currentStringValue = HttpContext.Current.Server.UrlEncode(this.Text).Replace("+", "%20"); ;
	}
	public override string GetDataFieldClientName()
	{
	    return this.UniqueID;
	}

    private string GetFileSyntax()
    {
        switch (this.MimeType)
        {
            case "text/html":
                return "html";
            case "text/xml":
                return "xml";
            case "text/css":
                return "css";
            case "text/javascript":
            case "text/js":
                return "js";
            case "application/x-ashx":
            case "text/x-csharp":
                return "cs";
            case "application/x-cshtml":
                return "cshtml";
            case "application/x-aspx":
            case "application/x-asax":
            case "application/x-ascx":
            case "application/x-master-page":
                return "aspx";
            case "text/x-sass":
                return "sass";
            default:
                return "text";
        }
    }
    
    // html, text, xml, css, javascript, cs, cshtml
</script>

<!-- This should be deprecated for the more generalized "SorceEditor"! -->

<ui:sourceeditor syntax="<%= GetFileSyntax() %>" 
	value="<%= _currentStringValue %>"
	id="<%= this.UniqueID %>"
	name="<%= this.UniqueID %>"
	callbackid="<%= this.UniqueID %>"
	strictsave="false"
	/>
