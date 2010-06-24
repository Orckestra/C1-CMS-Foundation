<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.TextInputTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories" %>

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
    
     private string TypeParam()
    {
        switch (this.Type)
        {
            case Composite.Forms.CoreUiControls.TextBoxType.ReadOnly:
                return @"readonly=""true""";
            default:
                return "";
        }        
    }
</script>

<ui:textbox required="false" name="<%= this.UniqueID  %>" <%= TypeParam() %>>
    <textarea><%= Server.HtmlEncode(_currentStringValue) %></textarea>
</ui:textbox>
