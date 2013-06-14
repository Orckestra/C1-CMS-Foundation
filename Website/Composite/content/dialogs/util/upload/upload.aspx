<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="Composite.Core.Types" %>

<%@ Register TagPrefix="control" TagName="httpheaders" Src="~/Composite/controls/HttpHeadersControl.ascx" %>
<%@ Register TagPrefix="control" TagName="scriptloader" Src="~/Composite/controls/ScriptLoaderControl.ascx" %>
<%@ Register TagPrefix="control" TagName="styleloader" Src="~/Composite/controls/StyleLoaderControl.ascx" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">

<control:httpheaders runat="server" />
<head>
	<title>Composite.Management.Dialog.Standard</title>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<script type="text/javascript" src="UploadDialogPageBinding.js"></script>
	<script runat="server">

		private const string DefaultMediaStore = "MediaArchive";

		protected void Page_Load(object sender, EventArgs e)
		{
			if (!IsPostBack)
			{
				var list = new List<string>() { "/" };
				using (var connection = new DataConnection())
				{
					foreach (var mediaFileFolder in connection.Get<IMediaFileFolder>().Where(d => d.StoreId == DefaultMediaStore).OrderBy(d => d.Path))
					{
						list.Add(mediaFileFolder.Path);
					}
				}
				MediaFileFolder.DataSource = list;
				MediaFileFolder.DataBind();
			}
		}
	
	</script>
</head>
<body>
	<ui:dialogpage binding="UploadDialogPageBinding"
		label="${string:MediaFileProviderElementProvider.AddMediaFile}"
		image="${icon:image}"
		height="auto"
		resizable="false">
		<ui:pagebody>
			<ui:fields>
				<ui:fieldgroup label="${string:Composite.Web.VisualEditor:Image.LabelImage}">
					<ui:field>
						<ui:fielddesc label="${string:Composite.Plugins.StandardFunctions:Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.label}" />
						<ui:fielddata>
							<aspui:Selector runat="server" EnableViewState="false"
								ID="MediaFileFolder" />
						</ui:fielddata>
					</ui:field>

					<ui:field>
						<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.MaxWidth}" />
						<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.MaxWidthToolTip}" />
						<ui:fielddata>
							<ui:datainput name="maxwidth" type="integer" value="400" />
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.MaxHeight}" />
						<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.MaxHeightToolTip}" />
						<ui:fielddata>
							<ui:datainput name="maxheight" type="integer" />
						</ui:fielddata>
					</ui:field>
				</ui:fieldgroup>
			</ui:fields>
		</ui:pagebody>
		<ui:dialogtoolbar>
			<ui:toolbarbody align="right" equalsize="true">
				<ui:toolbargroup>
					<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true" />
					<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:dialogtoolbar>
	</ui:dialogpage>
</body>
</html>
