<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        repeater.ItemDataBound += new RepeaterItemEventHandler(repeater_ItemDataBound);
        repeater.DataSource = this.FormControlDefinitions;
        repeater.DataBind();

    }

    void repeater_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        FormControlDefinition definition = ((FormControlDefinition)e.Item.DataItem);
        e.Item.FindControl("controlPlaceholder").Controls.Add(definition.FormControl);
    }
    
</script>

<ui:toolbar class="document-toolbar">
    <ui:toolbarbody>
        <ui:toolbargroup>
            <asp:Repeater runat="server" ID="repeater">
                <ItemTemplate>
                    <asp:PlaceHolder ID="controlPlaceholder" runat="server" />
                </ItemTemplate>
            </asp:Repeater>
        </ui:toolbargroup>
    </ui:toolbarbody>
</ui:toolbar>
