<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.CheckBoxTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
	const string ViewStateKey = "Checkbox.IsChecked";

	protected void Page_Load(object sender, EventArgs e)
	{
		// Workaround for <ui:control> not posting a value when it is not checked
		if (IsPostBack
		    && CheckedChangedEventHandler == null
		    && string.IsNullOrEmpty(Request.Form[UniqueID]))
		{
			LoadPostData(UniqueID, Request.Form);
		}
	}

	private bool ViewState_Checked
	{
		get { return (bool) (ViewState[ViewStateKey] ?? this.Checked); }
		set { ViewState[ViewStateKey] = value; }
	}

	public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
	{
		bool previousValue = ViewState_Checked;

		ViewState_Checked = (postCollection[postDataKey] ?? "").Contains("on");

		return ViewState_Checked != previousValue;
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
		this.Checked = ViewState_Checked;
	}

	protected override void InitializeViewState()
	{
		ViewState_Checked = this.Checked;
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
		ischecked="<%= this.Checked.ToString().ToLower() %>" 
		<%= ExtraAttributes() %> />
</ui:checkboxgroup>
