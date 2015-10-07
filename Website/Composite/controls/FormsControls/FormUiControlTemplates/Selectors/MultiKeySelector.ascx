<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase" %>

<script runat="server">
	private List<string> _selectedKeys = new List<string>();


    protected override void InitializeViewState()
    {
        compactModePlaceHolder.Visible = CompactMode;
        verboseModePlaceHolder.Visible = !CompactMode;

        _selectedKeys = new List<string>(this.SelectedKeys);

        var repeater = CompactMode ? OptionsRepeater : CheckBoxRepeater;

        repeater.DataSource = GetOptions();
        repeater.DataBind();
    }
    
    
    protected override void BindStateToProperties()
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

            OptionsRepeater.DataSource = GetOptions();
            OptionsRepeater.DataBind();
        }

        this.SelectedKeys = result;
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
