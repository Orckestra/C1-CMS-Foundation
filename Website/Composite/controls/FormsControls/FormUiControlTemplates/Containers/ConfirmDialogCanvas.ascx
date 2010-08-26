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

<ui:pagebody id="pagebody">
    <table id="dialoglayout">
	    <tr>
		    <td id="dialogvignette">
			    <ui:dialogvignette/>
		    </td>
		    <td id="dialogtext">
                <asp:Repeater runat="server" ID="repeater">
                    <ItemTemplate>
                        <asp:PlaceHolder ID="controlPlaceholder" runat="server" />
                    </ItemTemplate>
                </asp:Repeater>
		    </td>
	    </tr>
    </table>
</ui:pagebody>