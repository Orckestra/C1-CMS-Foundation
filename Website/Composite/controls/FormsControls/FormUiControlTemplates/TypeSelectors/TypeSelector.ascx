<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TypeSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.Types" %>

<script runat="server">
    
    protected override void BindStateToProperties()
    {
        this.SelectedType = TypeManager.GetType(typeSelector.SelectedValue);
    }

    private IEnumerable<KeyValuePair> GetTypeKeyValues()
    {
        return this.TypeOptions.Select(type => new KeyValuePair(TypeManager.SerializeType(type), type.GetShortLabel()));
    }

    
    protected override void InitializeViewState()
    {
        typeSelector.ToolTip = this.FormControlLabel;
        typeSelector.DataSource = GetTypeKeyValues().OrderBy(f => f.Value);
        typeSelector.DataValueField = "Key";
        typeSelector.DataTextField = "Value";
        typeSelector.DataBind();

        if (this.SelectedType != null)
        {
            try
            {
                typeSelector.SelectedValue = TypeManager.SerializeType(this.SelectedType);
            }
            catch (Exception) 
            {
                this.Controls.Add(new LiteralControl("Failed to locate selected value"));
            }
        }
    }

    public override string GetDataFieldClientName()
    {
        return this.typeSelector.UniqueID;
    }


</script>

<aspui:Selector runat="server" ID="typeSelector">
</aspui:Selector>
