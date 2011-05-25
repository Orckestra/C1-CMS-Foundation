<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextInputTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Data.Validation.ClientValidationRules" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>

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
        if (this.ClientValidationRules == null)
        {
            return "";
        }
        bool required = false;
        int maxLength = Int32.MaxValue;
        int minLength = 0;
        bool hasLengthRule = false;
        string regexValidationRule = null;

        required = this.Required;
        
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

            if (rule is RegexClientValidationRule)
            {
                var regexRule = (RegexClientValidationRule)rule;

                regexValidationRule = regexRule.Expression;
            }
        }

        
        StringBuilder paramsBuilder = new StringBuilder();

        if (required == true) paramsBuilder.Append(@" required=""true""");
        if (hasLengthRule == true) paramsBuilder.AppendFormat(@" minlength=""{0}"" maxlength=""{1}""", minLength, maxLength);

        return paramsBuilder.ToString();
    }

    public string FilterCharactersAndEncode(string text)
    {
        // Filtering '\0' character, browsers' xml readers cannot parse neither '\0' nor "&#x0;"
        return Server.HtmlEncode((text ?? string.Empty).Replace('\0', ' '));
    }
    
</script>
<ui:datainput name="<%= this.UniqueID  %>" value="<%= FilterCharactersAndEncode(_currentStringValue) %>" <%= ValidationParams() %> <%= TypeParam() %> />
