<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase" %>

<script runat="server">
	private List<string> _selectedKeys = new List<string>();


    public override void InitializeViewState()
    {
        compactModePlaceHolder.Visible = CompactMode;
        verboseModePlaceHolder.Visible = !CompactMode;

        _selectedKeys = new List<string>(this.SelectedKeys);

        PopulateRepeater(_selectedKeys);
    }
    
    
    public override void BindStateToProperties()
    {
        var result = new List<string>();

        if (!this.CompactMode)
        {
            for (int i = 0; i < CheckBoxRepeater.Items.Count; i++)
            {
                Control control = CheckBoxRepeater.Items[i].FindControl("CheckBox");

                var checkBox = (Composite.Core.WebClient.UiControlLib.CheckBox)control;

                if (checkBox.Checked) result.Add(HttpUtility.HtmlDecode(checkBox.Text));
            }
        }
        else
        {
            string postedValue = Request.Form[this.ClientID];
            if (!string.IsNullOrEmpty(postedValue))
            {
                result.AddRange(postedValue.Split(','));
            }

            _selectedKeys = result;

            PopulateRepeater(result);
        }

        this.SelectedKeys = result;
    }

	private void PopulateRepeater(List<string> selectedKeys)
	{
		var repeater = CompactMode ? OptionsRepeater : CheckBoxRepeater;

		var options = GetOptions();
		if (CompactMode)
		{
			// Preserving the order of selection in compact mode
			int index = 0;
			var order = selectedKeys.ToDictionary(option => option, option => index++);
			options = options.OrderBy(kvp => order.ContainsKey(kvp.Key) ? order[kvp.Key] : -1).ToList();
		}

		repeater.DataSource = options;
		repeater.DataBind();
	}


    public override string GetDataFieldClientName()
    {
        if (this.CompactMode)
        {
            return this.ClientID;
        }

        if (CheckBoxRepeater.Items.Count > 0)
        {
            return CheckBoxRepeater.Items[0].UniqueID + "$CheckBox";
        }

        return null;
    }


    protected string CustomUiSelectorTagParams(KeyLabelPair keyLabelPair)
    {
        return IsChecked(keyLabelPair.Key) ? "selected=\"true\"" : "";
    }

    protected bool IsChecked(string key)
    {
        return _selectedKeys.Contains(key);
    }
    
</script>

<asp:PlaceHolder ID="verboseModePlaceHolder" runat="server" Visible="false">
    <ui:checkboxgroup name="<%= this.ClientID %>" required="<%= Required ? "true" : "false" %>">
    <asp:Repeater runat="server" ID="CheckBoxRepeater">
        <ItemTemplate>
            <aspui:CheckBox ID="CheckBox" runat="server"
              ToolTip="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
              ItemLabel="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
              Text="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Key) %>" 
              Checked="<%# IsChecked(((KeyLabelPair)Container.DataItem).Key) %>"/>
        </ItemTemplate>
    </asp:Repeater>
</ui:checkboxgroup>
</asp:PlaceHolder>

<asp:PlaceHolder ID="compactModePlaceHolder" runat="server" Visible="false">
    <ui:multiselector name="<%= this.ClientID %>" required="<%= Required ? "true" : "false" %>">
        <asp:Repeater runat="server" ID="OptionsRepeater">
            <ItemTemplate>
                      <ui:selection 
                          label="<%# Server.HtmlEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
                          value="<%# Server.HtmlEncode(((KeyLabelPair)Container.DataItem).Key) %>"
                          <%# CustomUiSelectorTagParams( (KeyLabelPair)Container.DataItem ) %> />
            </ItemTemplate>
        </asp:Repeater>
</ui:multiselector>
</asp:PlaceHolder>
