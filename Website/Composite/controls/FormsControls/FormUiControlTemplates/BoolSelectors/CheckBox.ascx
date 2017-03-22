<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.CheckBoxTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
    const string ViewStateKey = "Checkbox.IsChecked";
    private bool _initialize = false;

    private bool PrePostbackValue
    {
        get { return (bool) (ViewState[ViewStateKey] ?? this.Checked); }
        set { ViewState[ViewStateKey] = value; }
    }

    private bool UserValue
    {
        get { return (IsPostBack && !_initialize) ? (Request[UniqueID] ?? "").Contains("on") : this.Checked; }
    }

    public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
    {
        bool previousValue = PrePostbackValue;

        PrePostbackValue = UserValue;

        return !_initialize && UserValue != previousValue;
    }

    public override void RaisePostDataChangedEvent()
    {
        if (this.CheckedChangedEventHandler != null)
        {
            this.CheckedChangedEventHandler(this, EventArgs.Empty);
        }
    }

    protected override void BindStateToProperties()
    {
        this.Checked = UserValue;
    }

    protected override void InitializeViewState()
    {
        _initialize = true;
        PrePostbackValue = this.Checked;
    }

    public override string GetDataFieldClientName()
    {
        return this.UniqueID;
    }

    private string ExtraAttributes()
    {
        if (this.CheckedChangedEventHandler != null)
        {
            return string.Format(@"callbackid=""{0}"" onchange=""this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)""", this.UniqueID);
        }

        return null;
    }


</script>

<ui:checkboxgroup>
	<ui:checkbox label="<%= this.ItemLabel %>" name="<%= this.UniqueID %>" 
		ischecked="<%= UserValue.ToString().ToLower() %>" 
		<%= ExtraAttributes() %> />
</ui:checkboxgroup>
