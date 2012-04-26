<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.BoolSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
    bool _isTrue = false;

    protected void Page_Init(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(HttpContext.Current.Request.Form[this.ClientID]) == false)
        {
            _isTrue = ("true" == HttpContext.Current.Request.Form[this.ClientID]);
        }
    }
    
    protected override void BindStateToProperties()
    {
        this.IsTrue = _isTrue; 
    }

    protected override void InitializeViewState()
    {
        _isTrue = this.IsTrue;
    }

    public override string GetDataFieldClientName()
    {
        return this.ClientID;
    }
</script>

<ui:radiodatagroup name="<%= this.ClientID %>">
	<ui:radio label="<%= this.TrueLabel %>" value="true" ischecked="<%= this.IsTrue.ToString().ToLower() %>" />
	<ui:radio label="<%= this.FalseLabel %>" value="false" ischecked="<%= (this.IsTrue==false).ToString().ToLower() %>" />
</ui:radiodatagroup>
