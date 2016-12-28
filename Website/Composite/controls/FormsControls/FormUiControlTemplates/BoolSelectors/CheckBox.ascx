<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.CheckBoxTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
    bool _isChecked;

    public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
    {
        _isChecked = !string.IsNullOrEmpty(postCollection[postDataKey]);
        return true;
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
        return this.UniqueID;
    }
</script>

<ui:checkboxgroup>
	<ui:checkbox label="<%= this.ItemLabel %>" name="<%= this.UniqueID %>" ischecked="<%= this._isChecked.ToString().ToLower() %>" />
</ui:checkboxgroup>
