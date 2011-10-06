<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DataReferenceSelectorTemplateUserControlBase"  %>
<%@ Register TagPrefix="ui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="Composite.Data" %>

<script runat="server">
    protected override void BindStateToProperties()
    {
    	EnsurePostDataLoaded();
        Type dataReferenceType = typeof(DataReference<>).MakeGenericType(new [] {this.DataType});
        object[] activationParameters = new object[1];
        activationParameters[0] = GetValue();
        IDataReference dataReference = (IDataReference)Activator.CreateInstance(dataReferenceType, activationParameters);

        this.Selected = dataReference;
        
        InitializeViewState();
    }

	private void EnsurePostDataLoaded()
	{
		var form = System.Web.HttpContext.Current.Request.Form;
		if (form[DataReferenceSelector.UniqueID] != null)
		{
			(DataReferenceSelector as IPostBackDataHandler).LoadPostData(DataReferenceSelector.UniqueID, form);
		}
	}
	
    private string GetValue()
    {
        string value = DataReferenceSelector.SelectedValue;
        if(string.IsNullOrEmpty(DataReferenceSelector.SelectedValue))
        {
            return this.Request.Form[DataReferenceSelector.UniqueID] ?? string.Empty;
        }
        
        return value;
    }

    protected override void InitializeViewState()
    {
        PopulateSelector();

        if (this.Selected != null && this.Selected.IsSet == true)
        {
            ListItem selectedItem = DataReferenceSelector.Items.FindByValue(this.Selected.KeyValue.ToString());
            if (selectedItem != null) selectedItem.Selected = true;
        }
    }
    
    private void PopulateSelector()
    {
        // This widget is currently 'code bound' to IMediaFileFolder. Rename or - even better - put this out of it's missery.
        
        if (this.DataType.Equals(typeof(Composite.Data.Types.IMediaFileFolder)))
        {
            DataReferenceSelector.DataSource = DataFacade.GetData<Composite.Data.Types.IMediaFileFolder>().OrderBy(f => f.Path).ToDataList();
        }
        else
        {
            throw new NotSupportedException("Type '{0}' not supported by this widget");
        }

        DataReferenceSelector.DataTextField = "Path";
        DataReferenceSelector.DataValueField = "KeyPath";
        DataReferenceSelector.DataBind();
    }

    public override string GetDataFieldClientName()
    {
        return this.DataReferenceSelector.UniqueID;
    }
    
</script>

<ui:Selector ID="DataReferenceSelector" runat="server" />
