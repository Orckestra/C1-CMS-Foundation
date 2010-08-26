<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Collections.Generic" %>

<script runat="server">
    private bool _optionsListInitialized;
    
    protected override void BindStateToProperties()
    {
        // TODO: refactor???
        InitializeOptionList();
        EnsurePostDataLoaded();
        
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

    
    private void EnsurePostDataLoaded()
    {
        var form = System.Web.HttpContext.Current.Request.Form;
        if(form[clientSelector.UniqueID] != null)
        {
            (clientSelector as IPostBackDataHandler).LoadPostData(clientSelector.UniqueID, form);
        }
    }
    
    private void InitializeOptionList()
    {
        if(!_optionsListInitialized)
        {
            List<KeyLabelPair> options = this.GetOptions();

            clientSelector.DataSource = options;
            clientSelector.DataTextField = "Label";
            clientSelector.DataValueField = "Key";
            clientSelector.DataBind();
            
            _optionsListInitialized = true;
        }
    }
    

    protected override void InitializeViewState()
    {
        InitializeOptionList();
        
        string key = this.SelectedKeys.FirstOrDefault();
        if (key != null)
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

<aspui:ComboBox ID="clientSelector" runat="server" />
