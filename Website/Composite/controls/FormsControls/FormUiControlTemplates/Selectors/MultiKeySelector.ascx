<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="Composite.Core.Types" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>

<script runat="server">
    protected void Page_Init(object sender, EventArgs e)
    {
        if (!this.CompactMode)
        {
            CheckBoxRepeater.ItemDataBound += CheckBoxRepeater_ItemDataBound;

            CheckBoxRepeater.DataSource = this.GetOptions();
            CheckBoxRepeater.DataBind();
            verboseModePlaceHolder.Visible = true;
            compactModePlaceHolder.Visible = false;
            
        }
        else
        {
            // the list back-and-forth is intended to keep the sort order
            var selectedKeys = new List<string>(this.SelectedKeys);

            var selectedOptions = new List<KeyLabelPair>();
            foreach( string key in selectedKeys)
            {
                var selectedOption = this.GetOptions().FirstOrDefault(f => f.Key == key);
                if (selectedOption != null)
                {
                    selectedOptions.Add(selectedOption);
                }
            }

            var unselectedOptions = this.GetOptions().Where(o => selectedKeys.Contains(o.Key)==false);
            
            optionsRepeater.DataSource = selectedOptions.Concat(unselectedOptions);
            optionsRepeater.DataBind();
            verboseModePlaceHolder.Visible = false;
            compactModePlaceHolder.Visible = true;
        }
    }

    void CheckBoxRepeater_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        var definition = (KeyLabelPair) e.Item.DataItem;
        e.Item.ID = definition.Key.GetHashCode().ToString();
        Control control = e.Item.FindControl("CheckBox");

        var checkBox = (Composite.Core.WebClient.UiControlLib.CheckBox)control;

        string key = HttpUtility.HtmlDecode(checkBox.Text);
        if (SelectedKeys.Contains(key))
        {
            checkBox.Checked = true;
        }
    }


    protected override void BindStateToProperties()
    {
        var result = new List<string>();

        if (!this.CompactMode)
        {
            for (int i = 0; i < CheckBoxRepeater.Items.Count; i++)
            {
                Control control = CheckBoxRepeater.Items[i].FindControl("CheckBox");

                EnsurePostDataLoaded(control);

                var checkBox = (Composite.Core.WebClient.UiControlLib.CheckBox)control;

                if (checkBox.Checked) result.Add(HttpUtility.HtmlDecode(checkBox.Text));
            }
        }
        else
        {
            string postBackName = this.ClientID; 
            if (!string.IsNullOrEmpty(Request.Form[postBackName]))
            {
                result = new List<string>(Request.Form[postBackName].Split(','));
            }
        }

        this.SelectedKeys = result;
    }



    protected override void InitializeViewState()
    {
    }


    private void EnsurePostDataLoaded(Control control)
    {
        (control as IPostBackDataHandler).LoadPostData(control.UniqueID, Request.Form);
    }


    public override string GetDataFieldClientName()
    {
        if (this.CompactMode)
        {
            return this.ClientID;
        }

        if (CheckBoxRepeater.Items.Count > 0)
        {
            return CheckBoxRepeater.Items[0].ClientID.Replace("_", "$") + "$CheckBox";
        }

        return null;
    }


    protected string CustomUiSelectorTagParams(KeyLabelPair keyLabelPair)
    {
        string key = keyLabelPair.Key;

        if (SelectedKeys.Contains(key))
        {
            return "selected=\"true\"";
        }

        return "";
    }
    
</script>

<asp:PlaceHolder ID="verboseModePlaceHolder" runat="server" Visible="false">
    <ui:checkboxgroup name="<%= this.ClientID %>" required="<%= Required ? "true" : "false" %>">
    <asp:Repeater runat="server" ID="CheckBoxRepeater" ViewStateMode="Disabled">
        <ItemTemplate>
            <aspui:CheckBox ID="CheckBox" runat="server"
              ToolTip="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
              ItemLabel="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
              Text="<%# HttpUtility.HtmlAttributeEncode(((KeyLabelPair)Container.DataItem).Key) %>" />
        </ItemTemplate>
    </asp:Repeater>
</ui:checkboxgroup>
</asp:PlaceHolder>

<asp:PlaceHolder ID="compactModePlaceHolder" runat="server" Visible="false">
    <ui:multiselector name="<%= this.ClientID %>" required="<%= Required ? "true" : "false" %>">
        <asp:Repeater runat="server" ID="optionsRepeater" ViewStateMode="Disabled">
            <ItemTemplate>
                      <ui:selection 
                          label="<%# Server.HtmlEncode(((KeyLabelPair)Container.DataItem).Label) %>" 
                          value="<%# Server.HtmlEncode(((KeyLabelPair)Container.DataItem).Key) %>"
                          <%# CustomUiSelectorTagParams( (KeyLabelPair)Container.DataItem ) %> />
            </ItemTemplate>
        </asp:Repeater>
</ui:multiselector>
</asp:PlaceHolder>
