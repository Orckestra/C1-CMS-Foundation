<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.BoolSelectorTemplateUserControlBase"  %>

<script runat="server">
	private bool ViewState_IsTrue
	{
		get { return (bool) ViewState["IsTrue"]; }
		set { ViewState["IsTrue"] = value; }
	}

	protected void Page_Init(object sender, EventArgs e)
	{
	}

	protected override void BindStateToProperties()
	{
		this.IsTrue = ViewState_IsTrue;
	}

	protected override void InitializeViewState()
	{
		ViewState_IsTrue = this.IsTrue;
	}

	public override string GetDataFieldClientName()
	{
		return this.ClientID;
	}

	public override bool LoadPostData(string postDataKey, NameValueCollection postCollection)
	{
		bool previousValue = ViewState_IsTrue;

		ViewState_IsTrue = postCollection[postDataKey] == "true";

		return ViewState_IsTrue != previousValue;
	}

	public override void RaisePostDataChangedEvent()
	{
		if (this.SelectionChangedEventHandler != null)
		{
			this.SelectionChangedEventHandler(this, EventArgs.Empty);
		}
	}
</script>

<ui:radiodatagroup name="<%= this.ClientID %>" callbackid="<%= this.UniqueID %>" onchange="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)" >
	<ui:radio label="<%= Server.HtmlEncode(this.TrueLabel) %>" value="true" ischecked="<%= this.IsTrue.ToString().ToLower() %>" />
	<ui:radio label="<%= Server.HtmlEncode(this.FalseLabel) %>" value="false" ischecked="<%= (!this.IsTrue).ToString().ToLower() %>" />
</ui:radiodatagroup>
