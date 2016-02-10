<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.HierarchicalSelectorTemplateUserControlBase" %>

<script runat="server">
	//private List<object> _selectedKeys = new List<object>();


	protected override void InitializeViewState()
	{
		//_selectedKeys = new List<object>(this.SelectedKeys);

		//var repeater = CompactMode ? OptionsRepeater : CheckBoxRepeater;

		//repeater.DataSource = GetOptions();
		//repeater.DataBind();
	}


	protected override void BindStateToProperties()
	{
		var result = new List<object>();
				
		// TODO: implement

		this.SelectedKeys = result;
	}


	public override string GetDataFieldClientName()
	{
		return this.ClientID;
	}

</script>

<h1>Hierarchical selector</h1>