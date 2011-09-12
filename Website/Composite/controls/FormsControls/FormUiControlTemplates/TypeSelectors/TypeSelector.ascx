<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.TypeSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="Composite.Core.Types" %>

<script runat="server">
    protected override void BindStateToProperties()
    {
        // TODO: refactor???
        InitializeOptionList();
        EnsurePostDataLoaded();
        
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

    private void EnsurePostDataLoaded()
    {
        var form = System.Web.HttpContext.Current.Request.Form;
        if (form[typeSelector.UniqueID] != null)
        {
            (typeSelector as IPostBackDataHandler).LoadPostData(typeSelector.UniqueID, form);
        }
    }
    
    private void InitializeOptionList()
    {
        typeSelector.ToolTip = this.FormControlLabel;
        typeSelector.DataSource = GetTypeKeyValues().OrderBy(f => f.Value);
        typeSelector.DataValueField = "Key";
        typeSelector.DataTextField = "Value";
        typeSelector.DataBind();
    }
    
    protected override void InitializeViewState()
    {
        InitializeOptionList();

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
        return this.typeSelector.UniqueID;
    }

</script>

<aspui:Selector runat="server" ID="typeSelector">
</aspui:Selector>
