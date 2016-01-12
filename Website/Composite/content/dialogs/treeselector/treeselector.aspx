<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
	<title>Composite.Management.Dialog.TreeSelector</title>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<script type="text/javascript" src="TreeSelectorDialogPageBinding.js"></script>
	<script type="text/javascript" src="TreeSelectorToolBarBinding.js"></script>
	<link rel="stylesheet" type="text/css" href="treeselector.css.aspx" />
</head>
<body>
	<ui:broadcasterset>
		<ui:broadcaster id="broadcasterHistoryBack" isdisabled="true" />
		<ui:broadcaster id="broadcasterHistoryForward" isdisabled="true" />
		<ui:broadcaster id="broadcasterBrowserView" isdisabled="true" />
	</ui:broadcasterset>
	<ui:popupset id="masterpopupset">
		<ui:popup id="moreactionspopup" position="bottom" />
	</ui:popupset>
	<ui:dialogpage binding="TreeSelectorDialogPageBinding"
		label="(title supplied as page argument!)"
		width="1200"
		height="750"
		resizable="false"
		class="with-top-toolbar">
		<ui:toolbar id="toolbar" binding="TreeSelectorToolBarBinding" imagesize="large" class="white">
			<ui:toolbarbody />
			<ui:toolbarbody id="moreactionstoolbargroup">
				<ui:toolbargroup>
					<ui:toolbarbutton id="moreactionsbutton" label="More" popup="moreactionspopup" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:toolbar id="navbar" class="dark">
			<ui:toolbarbody>
				<ui:toolbargroup>
					<ui:toolbarbutton id="toggletreebutton" cmd="toggletree" image="${icon:nodes}" binding="CheckButtonBinding" ischecked="true" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.TreeView.ToolTip}" />
					<ui:toolbarbutton class="btn-group-left" cmd="back" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Back.ToolTip}" observes="broadcasterHistoryBack" />
					<ui:toolbarbutton class="btn-group-right" cmd="forward" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Forward.ToolTip}" observes="broadcasterHistoryForward" />
					<ui:toolbarbutton cmd="refresh" image="${icon:refresh}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Refresh.ToolTip}" />
					<ui:toolbarbutton cmd="home" image="${icon:home}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Home.ToolTip}" />
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody align="right" class="max" style="overflow: hidden;">
				<ui:toolbargroup class="max">
					<ui:datainput id="addressbar" name="addressbar" autoselect="true" binding="AddressBarBinding" readonly="true"/>
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:pagebody class="pad-0">

			<ui:splitbox orient="horizontal" layout="2:3" class="line">
				<ui:splitpanel id="explorerpanel">
					<ui:tree id="selectiontree" binding="SystemTreeBinding" selectiontype="single" actionaware="true"
						treeselector="true" locktoeditor="false">
						<ui:treebody />
					</ui:tree>
				</ui:splitpanel>
				<ui:splitter />
				<ui:splitpanel>
					<ui:tabbox id="browsertabbox">
						<ui:tabs hidden="true">
							<ui:tab id="generictab"/>
							<ui:tab id="previewtab"/>
						</ui:tabs>
						<ui:tabpanels>
							<ui:tabpanel>
								<ui:tree id="genericview" treeselector="true" binding="GenericViewBinding" selectiontype="single"
									locktoeditor="false">
									<ui:treebody />
								</ui:tree>
							</ui:tabpanel>
							<ui:tabpanel>
								<ui:window id="previewframe" />
							</ui:tabpanel>
						</ui:tabpanels>
					</ui:tabbox>
				</ui:splitpanel>
			</ui:splitbox>
		</ui:pagebody>

		<ui:dialogtoolbar>
			<ui:toolbarbody class="max">
				<ui:toolbargroup class="max">
					<ui:datainput readonly="true" isdisabled="true" id="treeselectionresult" name="treeselectionresult" />
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody align="right" equalsize="true" class="right">
				<ui:toolbargroup>
					<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" id="buttonAccept" response="accept" isdisabled="true" focusable="true" default="true" />
					<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:dialogtoolbar>
	</ui:dialogpage>
</body>
</html>
