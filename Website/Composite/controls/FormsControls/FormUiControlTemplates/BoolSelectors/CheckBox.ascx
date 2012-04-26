<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.CheckBoxTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
    bool _isChecked = false;

    protected void Page_Init(object sender, EventArgs e)
    {
        _isChecked = (string.IsNullOrEmpty(HttpContext.Current.Request.Form[this.ClientID]) == false);
    }
    
    protected override void BindStateToProperties()
    {
        this.Checked = _isChecked; 
    }

    protected override void InitializeViewState()
    {
        _isChecked = this.Checked;
    }

    public override string GetDataFieldClientName()
    {
        return this.ClientID;
    }
</script>

<ui:checkboxgroup>
	<ui:checkbox label="<%= this.ItemLabel %>" name="<%= this.ClientID %>" ischecked="<%= this._isChecked.ToString().ToLower() %>" />
</ui:checkboxgroup>
