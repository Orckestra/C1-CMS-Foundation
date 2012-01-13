<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextInputTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Data.Validation.ClientValidationRules" %>

<script runat="server">
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
        this.Text = _currentStringValue;
    }

    protected override void InitializeViewState()
    {
        _currentStringValue = this.Text;
    }

    public override string GetDataFieldClientName()
    {
        return this.ClientID.Replace("_", "$");
    }
    
    private string IsRequired()
    {
        return ClientValidationRules != null && ClientValidationRules.Any(rule => rule is NotNullClientValidationRule) ? "true" : "false";
    }
    
    private string TypeParam()
    {
        switch (this.Type)
        {
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.ReadOnly:
                return @"readonly=""true""";
            default:
                return "";
        }        
    }


    public string FilterCharactersAndHtmlEncode(string text)
     {
         // Filtering '\0' character, browsers' xml readers cannot parse neither '\0' nor "&#x0;"
         return Server.HtmlEncode((text ?? string.Empty).Replace('\0', ' '));
     }    
</script>

<ui:textbox required="<%= IsRequired() %>" name="<%= this.UniqueID  %>" spellcheck="<%= this.SpellCheck.ToString().ToLower() %>" <%= TypeParam() %>>
    <textarea><%= FilterCharactersAndHtmlEncode(_currentStringValue) %></textarea>
</ui:textbox>
