<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.EnumSelectorTemplateUserControlBase"  %>
<%@ Import Namespace="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">    
    protected override void BindStateToProperties()
    {
        this.Selected = optionsRepeater.SelectedValue;
    }

    protected override void InitializeViewState()
    {
        optionsRepeater.DataSource = this.Options;
        optionsRepeater.SelectedValue = this.Selected;
        optionsRepeater.DataBind();
    }

    public override string GetDataFieldClientName()
    {
        return this.optionsRepeater.UniqueID;
    }
    
</script>

    <aspui:Selector runat="server" ID="optionsRepeater" AutoPostBack="false" Visible="true">
    </aspui:Selector>
