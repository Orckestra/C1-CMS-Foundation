<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.XhtmlEditorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.WebClient.Services.WysiwygEditor" %>
<%@ Import Namespace="Composite.Core.Types" %>

<script type="C#" runat="server">

	private string _currentStringValue = null;

	protected void Page_Init(object sender, EventArgs e)
    {
        if (_currentStringValue == null)
        {
            _currentStringValue = Request.Form[this.UniqueID];
        }
    }

    protected override void BindStateToProperties()
    {
        _currentStringValue = Request.Form[this.UniqueID];
        this.Xhtml = HttpContext.Current.Server.UrlDecode(_currentStringValue).Replace("&nbsp;", "&#160;");
    }

    protected override void InitializeViewState()
    {
		if (string.IsNullOrEmpty(this.Xhtml) == false)
        {
            _currentStringValue = this.Xhtml;
        }
        else
        {
            _currentStringValue = "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head></head>\n\t<body></body>\n</html>";
        }
		_currentStringValue = HttpContext.Current.Server.UrlEncode(_currentStringValue).Replace("+", "%20");
    }

    public override string GetDataFieldClientName()
    {
        return this.UniqueID;
    }

    private string EmbedableFieldsTypesString
    {
        get
        {
            if (this.EmbedableFieldsTypes == null)
            {
                return "";
            }
            else
            {
                var serializedNames =
                    from t in this.EmbedableFieldsTypes
                    select TypeManager.SerializeType(t);

                return string.Join("|", serializedNames.ToArray());
            }
        }
    }
</script>

<ui:htmldatadialog
	label="<%= HttpUtility.HtmlAttributeEncode(String.Format( Composite.Core.ResourceSystem.StringResourceSystemFacade.GetString("Composite.Web.VisualEditor","LaunchButton.Label"), FormControlLabel)) %>" 
	value="<%= _currentStringValue %>" 
	formattingconfiguration="<%= this.ClassConfigurationName %>"
    containerclasses="<%= this.ContainerClasses %>"
    embedablefieldstypenames="<%= HttpUtility.HtmlAttributeEncode(this.EmbedableFieldsTypesString) %>"
	name="<%= this.UniqueID %>"
	callbackid="<%= this.UniqueID %>"
    previewpageid="<%= PreviewPageId %>"
    previewtemplateid="<%= PreviewTemplateId %>"
    previewplaceholder="<%= PreviewPlaceholder %>"
    image="${icon:edit}"
    />