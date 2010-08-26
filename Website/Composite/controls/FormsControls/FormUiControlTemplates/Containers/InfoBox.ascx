<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.ContainerTemplateUserControlBase" %>

<script runat="server">
    private void Page_Init(object sender, System.EventArgs e)
    {
        foreach (FormControlDefinition formControlDefinition in this.FormControlDefinitions)
        {
            content.Controls.Add(formControlDefinition.FormControl);
        }
    }
</script>

<!-- 
<ui:scrollbox class="infobox">
   placeholder here!
</ui:scrollbox>
-->

<!-- FOK THIS - HARDWIRED HACK FOR IMMEDIATE RELEASE! -->
<table id="dialoglayout">
	<tr>
		<td id="dialogvignette">
			<ui:dialogvignette class="error"/>
		</td>
		<td id="dialogtext">
			<strong>
				<ui:text label="<%= this.Label %>" />
			</strong>
			<asp:PlaceHolder ID="content" runat="server">
    		</asp:PlaceHolder>
		</td>
	</tr>
</table>