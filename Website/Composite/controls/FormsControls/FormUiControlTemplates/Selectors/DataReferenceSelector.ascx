<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DataReferenceSelectorTemplateUserControlBase"  %>
<%@ Register TagPrefix="ui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>

<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.Extensions" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>

<script runat="server">
    protected override void BindStateToProperties()
    {
        Type dataReferenceType = typeof(DataReference<>).MakeGenericType(new [] {this.DataType});

        object[] activationParameters = { DataReferenceSelector.SelectedValue };
        
        var dataReference = (IDataReference) Activator.CreateInstance(dataReferenceType, activationParameters);

        this.Selected = dataReference;
    }

    protected override void InitializeViewState()
    {
        // This widget is currently 'code bound' to IMediaFileFolder. Rename or - even better - put this out of it's misery.
        if (this.DataType == typeof(IMediaFileFolder))
        {
            DataReferenceSelector.DataSource = DataFacade.GetData<IMediaFileFolder>().OrderBy(f => f.Path).ToDataList();
        }
        else
        {
            throw new NotSupportedException("Type '{0}' not supported by this widget".FormatWith(DataType.FullName));
        }

        DataReferenceSelector.DataTextField = "Path";
        DataReferenceSelector.DataValueField = "KeyPath";
        DataReferenceSelector.DataBind();

        if (this.Selected != null && this.Selected.IsSet)
        {
            ListItem selectedItem = DataReferenceSelector.Items.FindByValue(this.Selected.KeyValue.ToString());
            if (selectedItem != null) selectedItem.Selected = true;
        }
    }
    
    public override string GetDataFieldClientName()
    {
        return this.DataReferenceSelector.UniqueID;
    }
    
</script>

<ui:Selector ID="DataReferenceSelector" runat="server" />
