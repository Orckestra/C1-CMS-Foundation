<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>
<%@ Import Namespace="Composite.C1Console.Forms.WebChannel" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.ComponentModel" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        this.ID = "TabPanels";

        int tabCounter = 0;
        foreach (FormControlDefinition formControlDefinition in this.FormControlDefinitions)
        {
            string uiTabStartTag = string.Format("<ui:tabpanel{0}>", CustomUiTabPanelTagParams(formControlDefinition, tabCounter));
            content.Controls.Add(new LiteralControl(uiTabStartTag));
            if (formControlDefinition.IsFullWidthControl == false)
                content.Controls.Add( new LiteralControl("<ui:scrollbox class='padded'>"));
                
            content.Controls.Add(formControlDefinition.FormControl);
            
            if (formControlDefinition.IsFullWidthControl == false)
                content.Controls.Add(new LiteralControl("</ui:scrollbox>"));
            
            content.Controls.Add(new LiteralControl("</ui:tabpanel>"));

            tabCounter++;
        }

        tabsRepeater.DataSource = this.FormControlDefinitions;
        tabsRepeater.DataBind();

        lazyBindingRepeater.DataSource = this.FormControlDefinitions;
        lazyBindingRepeater.DataBind();
    }

    string CustomUiTabTagParams(FormControlDefinition definition, int listPosition)
    {
        string tagParams = "";

        int preSelectedIndexNormalized = (this.PreSelectedIndex + this.FormControlDefinitions.Count) % this.FormControlDefinitions.Count;

        if (preSelectedIndexNormalized == listPosition)
        {
            tagParams += " selected=\"true\"";
        }

        if (typeof(IClickableTabPanelControl).IsAssignableFrom(definition.FormControl.GetType()))
        {
            IClickableTabPanelControl control = (IClickableTabPanelControl)definition.FormControl;
            tagParams += " id=\"" + control.CustomTabId + "\"";
            tagParams += " callbackid=\"" + control.EventControl.UniqueID + "\"";
        }

        return tagParams;
    }

    string CustomUiTabPanelTagParams(FormControlDefinition childControl, int listPosition)
    {
        StringBuilder tagParams = new StringBuilder();

        tagParams.AppendFormat(" id=\"tabpanel_{0}_{1}\"", this.UniqueID, childControl.Label );

        return tagParams.ToString();
    }

    string CustomUiLazyBindingTagParams(FormControlDefinition childControl, int listPosition)
    {
        if (this.PreSelectedIndex == listPosition)
        {
            return "";
        }
        
        StringBuilder tagParams = new StringBuilder("<ui:lazybinding ");

        tagParams.AppendFormat(" bindingid=\"tabpanel_{0}_{1}\"", this.UniqueID, childControl.Label);

        string lazyBindingPostBackName = string.Format("{0}_lazybindingactivated{1}", this.UniqueID, GetId(childControl));
        tagParams.AppendFormat(" name=\"{0}\"", HttpUtility.HtmlAttributeEncode(lazyBindingPostBackName));
        tagParams.AppendFormat(" callbackid=\"{0}\"", HttpUtility.HtmlAttributeEncode(lazyBindingPostBackName));
        this.RegisterLazyChildControl(listPosition, lazyBindingPostBackName);

        tagParams.Append(" />");

        return tagParams.ToString();
    }

    private string GetId(FormControlDefinition control)
    {
        return control.Label;
    }
    
</script>

<ui:lazybindingset>
    <asp:Repeater runat="server" ID="lazyBindingRepeater">
        <ItemTemplate>
            <%# CustomUiLazyBindingTagParams((FormControlDefinition)Container.DataItem, Container.ItemIndex) %> 
        </ItemTemplate>
    </asp:Repeater>
</ui:lazybindingset>

<ui:tabbox id="maintabbox">
    <ui:tabs id="maintabs">
        <asp:Repeater runat="server" ID="tabsRepeater">
            <ItemTemplate>
                <ui:tab 
                        label="<%# Server.HtmlEncode(((FormControlDefinition)Container.DataItem).Label) %>" 
                        tooltip="<%# Server.HtmlEncode(((FormControlDefinition)Container.DataItem).ToolTip) %>"
                        <%# CustomUiTabTagParams( (FormControlDefinition)Container.DataItem, Container.ItemIndex ) %> 
                        <%# CustomUiTabTagParams( (FormControlDefinition)Container.DataItem, Container.ItemIndex ).Contains("id=") ? "" :
                           "id=\"" + this.UniqueID + "_tab_" + Server.HtmlEncode(((FormControlDefinition)Container.DataItem).Label) + "\""   %> />
            </ItemTemplate>
        </asp:Repeater>
    </ui:tabs>
    <ui:tabpanels id="maintabpanels">
        <asp:PlaceHolder runat="server" ID="content" />
    </ui:tabpanels>       
</ui:tabbox>