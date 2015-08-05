<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase"  %>
<%@ Import Namespace="System.Linq" %>

<script runat="server">
    
    protected override void BindStateToProperties()
    {
        this.SelectedKeys = new List<string> { clientSelector.SelectedValue };
    }


    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        if (this.SelectedIndexChangedEventHandler != null)
        {
            clientSelector.SelectedIndexChanged += this.SelectedIndexChangedEventHandler;
            clientSelector.AutoPostBack = true;
        }
    }

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        clientSelector.IsDisabled = ReadOnly;
    }


    protected override void InitializeViewState()
    {
        List<KeyLabelPair> options = this.GetOptions();

        clientSelector.DataSource = options;
        clientSelector.DataTextField = "Label";
        clientSelector.DataValueField = "Key";
        clientSelector.DataBind();

        string key = this.SelectedKeys.FirstOrDefault();
        if (key != null && options.Any(f => f.Key == key))
        {
            clientSelector.SelectedValue = key;
        }
        else
        {
            clientSelector.SelectionRequired = this.Required;
        }
    }


    public override string GetDataFieldClientName()
    {
        return clientSelector.UniqueID;
    }
</script>

<aspui:Selector ID="clientSelector" runat="server" />
