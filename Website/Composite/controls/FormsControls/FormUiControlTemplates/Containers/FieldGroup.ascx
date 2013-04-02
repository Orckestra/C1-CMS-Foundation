<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        foreach (FormControlDefinition formControlDefinition in this.FormControlDefinitions)
        {
            UiFields.Controls.Add(new LiteralControl("<ui:field>"));
            UiFields.Controls.Add(new LiteralControl(string.Format("<ui:fielddesc>{0}</ui:fielddesc>", Server.HtmlEncode(FieldLabel ?? formControlDefinition.Label))));
            if (string.IsNullOrEmpty(formControlDefinition.Help) == false)
            {
                string helpMarkup = string.Format("<ui:fieldhelp>{0}</ui:fieldhelp>", Server.HtmlEncode(formControlDefinition.Help));
                UiFields.Controls.Add(new LiteralControl(helpMarkup));
            }
            //PlaceHolder fieldDataWithIdPlaceholder = new PlaceHolder();
            //UiFields.Controls.Add(fieldDataWithIdPlaceholder);
            UiFields.Controls.Add(new LiteralControl("<ui:fielddata>"));
            UiFields.Controls.Add(formControlDefinition.FormControl);
            UiFields.Controls.Add(new LiteralControl("</ui:fielddata>"));
            UiFields.Controls.Add(new LiteralControl("</ui:field>"));

            // ID-GENERATING FEATURE MOVED TO XSLT!
            //fieldDataWithIdPlaceholder.Controls.Add(new LiteralControl(string.Format("<ui:fielddata id='{0}_fielddata'>", formControlDefinition.FormControl.ClientID)));
        }
    }

    private string FieldLabel
    {
        get
        {
            return this.Settings.ContainsKey("FieldLabel")
                ? (string)this.Settings["FieldLabel"] : null; 
        }
    }
    
    // Temporary workaround
    public bool RenderFieldsTag 
    {
       get 
       {
           return !this.Settings.ContainsKey("RenderFieldsTag") 
                  || (bool)this.Settings["RenderFieldsTag"]; 
       }
    }
</script>
<%= RenderFieldsTag ? string.Format(@"<ui:fields id=""fields_{0}"">", this.ClientID) : string.Empty%>

    <ui:fieldgroup label="<%= Server.HtmlEncode(this.Label) %>">
        <asp:PlaceHolder ID="UiFields" runat="server" />
    </ui:fieldgroup>
    
<%= RenderFieldsTag ? "</ui:fields>" : string.Empty %>
