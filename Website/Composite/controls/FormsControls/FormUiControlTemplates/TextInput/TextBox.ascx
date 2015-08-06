<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextInputTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Data.Validation.ClientValidationRules" %>

<script runat="server">
    private string _currentStringValue;

    protected override void InitializeViewState()
    {
        _currentStringValue = this.Text;
    }

    
    public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
    {
        _currentStringValue = postCollection[postDataKey];
        return true;
    }

    
    protected override void BindStateToProperties()
    {
        this.Text = _currentStringValue;
    }

        

    public override string GetDataFieldClientName()
    {
        return this.UniqueID;
    }

    private string TypeParam()
    {
        switch (this.Type)
        {
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.Password:
                return @"password=""true""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.Integer:
                return @"type=""integer""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.Decimal:
                return @"type=""number""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.Guid:
                return @"type=""guid""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.ProgrammingIdentifier:
                return @"type=""programmingidentifier""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.ProgrammingNamespace:
                return @"type=""programmingnamespace""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.ReadOnly:
                return @"readonly=""true""";
            case Composite.C1Console.Forms.CoreUiControls.TextBoxType.String:
            default:
                return "";
        }        
    }


    private string ValidationParams()
    {
        bool required = this.Required;
        int maxLength = Int32.MaxValue;
        int minLength = 0;
        bool hasLengthRule = false;

        if (this.ClientValidationRules != null)
        {
            foreach (var rule in this.ClientValidationRules)
            {
                if (rule is NotNullClientValidationRule) required = true;

                if (rule is StringLengthClientValidationRule)
                {
                    hasLengthRule = true;
                    var lengthRule = (StringLengthClientValidationRule)rule;
                    minLength = Math.Max(minLength, lengthRule.LowerBound);
                    maxLength = Math.Min(maxLength, lengthRule.UpperBound);

                    if (minLength > 0) required = true;
                }
            }
        }

        var paramsBuilder = new StringBuilder();

        if (required) paramsBuilder.Append(@" required=""true""");
        if (hasLengthRule) paramsBuilder.AppendFormat(@" minlength=""{0}"" maxlength=""{1}""", minLength, maxLength);
        
        return paramsBuilder.ToString();
    }

    public string FilterCharactersAndEncode(string text)
    {
        // Filtering '\0' character, browsers' xml readers cannot parse neither '\0' nor "&#x0;"
        return Server.HtmlEncode((text ?? string.Empty).Replace('\0', ' '));
    }
    
</script>
<ui:datainput name="<%= this.UniqueID  %>" value="<%= FilterCharactersAndEncode(_currentStringValue) %>" spellcheck="<%= this.SpellCheck.ToString().ToLower() %>" <%= ValidationParams() %> <%= TypeParam() %> />
