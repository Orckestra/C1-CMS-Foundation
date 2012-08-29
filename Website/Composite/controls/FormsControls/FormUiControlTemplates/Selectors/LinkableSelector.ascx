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

    private string ValidationParams()
    {
        StringBuilder paramsBuilder = new StringBuilder();

        if (this.Required == true) paramsBuilder.Append(@" required=""true""");

        return paramsBuilder.ToString();
    }

    public string FilterCharactersAndEncode(string text)
    {
        // Filtering '\0' character, browsers' xml readers cannot parse neither '\0' nor "&#x0;"
        return Server.HtmlEncode((text ?? string.Empty).Replace('\0', ' '));
    }
    
</script>
<ui:linkableinputdialog id="<%= this.UniqueID  %>" type="url" handle="Composite.Management.LinkableSelectorDialog" name="<%= this.UniqueID  %>" required="true" value="<%= FilterCharactersAndEncode(_currentStringValue) %>"  <%= ValidationParams() %> />