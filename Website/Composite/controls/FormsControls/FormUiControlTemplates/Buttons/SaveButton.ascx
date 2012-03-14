<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.SaveButtonTemplateUserControlBase" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.WebClient" %>
<script runat="server">
	private void Page_Init(object sender, System.EventArgs e)
	{
		(this.Page as FlowPage).OnSave = SaveEventHandler;

		if (this.SaveAndPublishEventHandler != null)
		{
			(this.Page as FlowPage).OnSaveAndPublish = SaveAndPublishEventHandler;
			SaveAndPublishButtonPlaceholder.Visible = true;
		}
	}

</script>
<ui:toolbarbutton oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
	id="savebutton" image="${icon:save}" image-disabled="${icon:save-disabled}" label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
	observes="broadcasterCanSave" />
<asp:PlaceHolder ID="SaveAndPublishButtonPlaceholder" Visible="false" runat="server">
	<ui:toolbarbutton id="moreactionsbutton" label="▼" popup="moreactionspopup" observes="broadcasterCanSave" />
	<ui:popupset>
		<ui:popup id="moreactionspopup" position="bottom">
			<ui:menubody>
					<ui:menugroup >
							<ui:menuitem label="Save and Publish"  image="${icon:save}" image-disabled="${icon:save-disabled}" observes="broadcasterCanSave"
							 oncommand="bindingMap.savebutton.dispatchAction(EditorPageBinding.ACTION_SAVE_AND_PUBLISH);" />
				
					</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>
</asp:PlaceHolder>
