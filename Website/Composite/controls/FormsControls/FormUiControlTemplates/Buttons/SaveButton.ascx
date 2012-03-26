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

	public string BindingParam()
	{
		if (this.SaveAndPublishEventHandler != null)
		{
			return @"binding=""ToolBarComboButtonBinding""";
		}
		return string.Empty;
	}
	public string PopupParam()
	{
		if (this.SaveAndPublishEventHandler != null)
		{
			return @"popup=""moreactionspopup""";
		}
		return string.Empty;
	}

</script>
<ui:toolbarbutton <%= this.BindingParam() %>
	oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
	id="savebutton" image="${icon:save}" image-disabled="${icon:save-disabled}" label="<%=Server.HtmlEncode(this.FormControlLabel)%>"
	observes="broadcasterCanSave" <%= this.PopupParam() %>/>
<asp:PlaceHolder ID="SaveAndPublishButtonPlaceholder" Visible="false" runat="server">
	<ui:popupset>
		<ui:popup id="moreactionspopup" position="bottom">
			<ui:menubody>
					<ui:menugroup >
							<ui:menuitem id="save" label="<%=Server.HtmlEncode(this.FormControlLabel)%>" image="${icon:save}" image-disabled="${icon:save-disabled}" observes="broadcasterCanSave"
							 oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);" />
							<ui:menuitem id="saveandpublish" label="${string:Composite.Management:Website.App.LabelSaveAndPublish}" image="${icon:saveandpublish}" image-disabled="${icon:save-disabled}" observes="broadcasterCanSave"
							 oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE_AND_PUBLISH);" />
					</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>
</asp:PlaceHolder>
