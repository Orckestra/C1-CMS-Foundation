<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase"  %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Security.Policy" %>
<%@ Import Namespace="Composite.Core.WebClient.UiControlLib.Foundation" %>

<script runat="server">

    public override void BindStateToProperties()
    {
        this.SelectedKeys = new List<string> { clientSelector.SelectedValue };
    }


    protected override void OnLoad(EventArgs e)
    {
        this.CopyClientAttributesTo(clientSelector);

        base.OnLoad(e);

        if (this.SelectedIndexChangedEventHandler != null)
        {
            clientSelector.SelectedIndexChanged += this.SelectedIndexChangedEventHandler;
            clientSelector.AutoPostBack = true;
        }
    }


    public override void InitializeViewState()
    {
        List<KeyLabelPair> options = this.GetOptions();

        clientSelector.DataSource = options;
        clientSelector.DataTextField = "Label";
        clientSelector.DataValueField = "Key";
        clientSelector.DataBind();

        string key = this.SelectedKeys.FirstOrDefault();
        if (key != null)
        {
            clientSelector.SelectedValue = key;
        }

        clientSelector.SelectionRequired = this.Required;
    }


    public override string GetDataFieldClientName()
    {
        return clientSelector.UniqueID;
    }
</script>

<aspui:ComboBox ID="clientSelector" runat="server" />
