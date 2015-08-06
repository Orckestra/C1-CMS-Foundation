<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TextInputTemplateUserControlBase"  %>

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
<ui:urlinputdialog id="<%= this.UniqueID  %>" type="url" handle="Composite.Management.LinkableSelectorDialog" name="<%= this.UniqueID  %>" value="<%= FilterCharactersAndEncode(_currentStringValue) %>"  <%= ValidationParams() %> />