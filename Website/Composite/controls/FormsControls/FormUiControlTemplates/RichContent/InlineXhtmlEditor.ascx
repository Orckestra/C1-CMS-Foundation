<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.XhtmlEditorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.WebClient.Services.WysiwygEditor" %>
<%@ Import Namespace="Composite.Types" %>

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
            _currentStringValue = "<html xmlns='http://www.w3.org/1999/xhtml'>\n\t<head></head>\n\t<body></body>\n</html>";
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
	value="<%= _currentStringValue %>" 
	formattingconfiguration="common"
	elementclassconfiguration="<%= this.ClassConfigurationName %>" 
    embedablefieldstypenames="<%= HttpUtility.HtmlAttributeEncode(this.EmbedableFieldsTypesString) %>"
	configurationstylesheet="<%= Composite.WebClient.UrlUtils.ResolvePublicUrl( "Frontend/Styles/VisualEditor/VisualEditor.Config.css" ) %>"  
	presentationstylesheet="<%= Composite.WebClient.UrlUtils.ResolvePublicUrl( "Frontend/Styles/VisualEditor/VisualEditor.Default.css" ) %>"   
	name="<%= this.UniqueID %>"
	callbackid="<%= this.UniqueID %>"/>