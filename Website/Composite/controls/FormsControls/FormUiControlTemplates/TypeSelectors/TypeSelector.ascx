<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TypeSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="Composite.Core.Types" %>

<script runat="server">
    protected override void BindStateToProperties()
    {
        string selectedValue = typeSelector.SelectedValue;
        if(string.IsNullOrEmpty(selectedValue))
        {
            selectedValue = Request.Form[typeSelector.UniqueID] ?? string.Empty;
            typeSelector.SelectedValue = selectedValue;
        }

        this.SelectedType = TypeManager.GetType(selectedValue);
    }


    private IEnumerable<KeyValuePair> GetTypeKeyValues()
    {
        foreach (Type type in this.TypeOptions)
        {
            yield return new KeyValuePair(TypeManager.SerializeType(type), type.GetShortLabel());
        }
        
    }
    
    protected override void InitializeViewState()
    {
        typeSelector.ToolTip = this.FormControlLabel;
        typeSelector.DataSource = GetTypeKeyValues().OrderBy(f=>f.Value);
        typeSelector.DataValueField = "Key";
        typeSelector.DataTextField = "Value";
        typeSelector.DataBind();

        if (null != this.SelectedType)
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
        return this.typeSelector.ClientID;
    }

</script>

<aspui:Selector runat="server" ID="typeSelector">
</aspui:Selector>
