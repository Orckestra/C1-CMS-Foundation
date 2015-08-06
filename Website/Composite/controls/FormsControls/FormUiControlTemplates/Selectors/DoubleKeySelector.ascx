<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TemplatedDoubleKeySelectorUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Linq" %>


<script runat="server">
 
    protected override void BindStateToProperties()
    {
        var match = Options.FirstOrDefault(tuple => clientSelector.SelectedValue == GetKey(tuple));
        
        if(match != null)
        {
            FirstKey = match.Item1;
            SecondKey = match.Item2;
        }
        else
        {
            FirstKey = SecondKey = null;
        }
    }


    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        /*if (this.SelectedIndexChangedEventHandler != null)
        {
            clientSelector.SelectedIndexChanged += this.SelectedIndexChangedEventHandler;
            clientSelector.AutoPostBack = true;
        }*/
    }


    protected override void InitializeViewState()
    {
        List<KeyLabelPair> options = this.GetOptions();

        clientSelector.DataSource = options;
        clientSelector.DataTextField = "Label";
        clientSelector.DataValueField = "Key";
        clientSelector.DataBind();

        string key = GetKey(this.FirstKey, this.SecondKey);
        
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
