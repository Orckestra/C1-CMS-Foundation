<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<%@ Page Language="C#" %>
<control:httpheaders runat="server" />
<head>
	<title>Composite.Management.Browser</title>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<link rel="stylesheet" type="text/css" href="browser.css.aspx" />
	<script type="text/javascript" src="BrowserAddressBarBinding.js"></script>
	<script type="text/javascript" src="BrowserPageBinding.js"></script>
	<script type="text/javascript" src="BrowserPathBinding.js"></script>
	<script type="text/javascript" src="BrowserToolBarBinding.js"></script>
	<script type="text/javascript" src="BrowserTabBoxBinding.js"></script>
	<script type="text/javascript" src="BrowserTabBinding.js"></script>
	<script type="text/javascript" src="LanguageSelectorBinding.js"></script>

	
</head>
<body>
	<ui:broadcasterset>
		<ui:broadcaster id="broadcasterHistoryBack" isdisabled="true" />
		<ui:broadcaster id="broadcasterHistoryForward" isdisabled="true" />
		<ui:broadcaster id="broadcasterBrowserView" isdisabled="true" />
	</ui:broadcasterset>
	<ui:popupset>
		<ui:popup id="contextmenu">
			<ui:menubody>
				<ui:menugroup>
					<ui:menuitem cmd="back" label="${string:Composite.Web.PageBrowser:ContextMenu.Back}" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipBack}" observes="broadcasterHistoryBack" />
					<ui:menuitem cmd="forward" label="${string:Composite.Web.PageBrowser:ContextMenu.Forward}" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipForward}" observes="broadcasterHistoryForward" />
					<ui:menuitem cmd="refresh" label="${string:Composite.Web.PageBrowser:ContextMenu.Refresh}" image="${icon:refresh}" tooltip="${string:Website.Content.Views.Help.ToolTipRefresh}" />
				</ui:menugroup>
				<ui:menugroup>
					<ui:menuitem cmd="viewsource" label="${string:Composite.Web.PageBrowser:ContextMenu.ViewSource}" image="${icon:editor-sourceview}" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>


		<ui:popup id="toolboxpopupgroup" />
		<ui:popup id="toolboxpopup" position="bottom" />
		<ui:popup id="moreactionspopup" position="bottom" />
		<ui:popup id="screenpopup" position="bottom">
			<ui:menubody>
				<ui:menugroup id="screenpopupgroup">
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>
	<ui:page id="browserpage" binding="BrowserPageBinding" image="${icon:browser}">
		
		<ui:toolbar id="toolbarplaceholder" class="explorertoolbar">
			<ui:toolbarbody />
		</ui:toolbar>
		<ui:toolbar id="navbar" class="dark nav-toolbar" binding="BrowserToolBarBinding">
			<ui:toolbarbody>
				<ui:toolbargroup>
					<ui:toolbarbutton id="toggletreebutton" cmd="toggletree" image="${icon:nodes}" binding="CheckButtonBinding" ischecked="true"/>
					<ui:toolbarbutton class="btn-group-left" cmd="back" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Back.ToolTip}" observes="broadcasterHistoryBack" />
					<ui:toolbarbutton class="btn-group-right" cmd="forward" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Forward.ToolTip}" observes="broadcasterHistoryForward" />
					<ui:toolbarbutton cmd="refresh" image="${icon:refresh}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Refresh.ToolTip}" />
					<ui:toolbarbutton cmd="home" image="${icon:home}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Home.ToolTip}" />
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody align="right" class="max" style="overflow: hidden;">
				<ui:toolbargroup>
					<ui:datainput id="addressbar" name="addressbar" binding="BrowserAddressBarBinding" autoselect="true" />
				</ui:toolbargroup>
				<ui:toolbargroup id="addressrightgroup">
					<ui:toolbarbutton id="go" image="${icon:input}" image-disabled="${icon:input-disabled}" isdisabled="true" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Go.ToolTip}" />
					<ui:toolbarbutton id="setscreenbutton" image="${icon:browsedevicetype}" popup="screenpopup"  observes="broadcasterBrowserView" />
					<ui:toolbarbutton cmd="viewsource" tooltip="${string:Composite.Web.PageBrowser:Menu.ViewSource}" image="${icon:editor-sourceview}"  observes="broadcasterBrowserView" />
					<ui:toolbarbutton cmd="seoassistant" image="${icon:seoassistant}"  observes="broadcasterBrowserView" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:splitbox id="app1horizontalsplitbox" orient="horizontal" layout="2:7" class="line" >
			<ui:splitpanel type="explorer" id="explorerpanel">
				<div style="width:100%" ></div>
			</ui:splitpanel>
			<ui:splitter />
			<ui:splitpanel>
				<ui:cover id="cover" transparent="true" busy="false" />
				<ui:tabbox id="browsertabbox" binding="BrowserTabBoxBinding">
					<ui:tabs hidden="true" />
					<ui:tabpanels style="position: relative;">
						<ui:cover id="blocker" transparent="false" busy="false" hidden="true">
							<div id="message">
								<ui:labelbox image="${icon:message}"></ui:labelbox>
								<div id="text">
									<ui:text label="External URL not loaded: " />
									<span id="externalurl">:)</span>
								</div>
							</div>
						</ui:cover>
					</ui:tabpanels>
				</ui:tabbox>
			</ui:splitpanel>
		</ui:splitbox>

<%--		<ui:toolbar class="statusbar">
			<ui:toolbarbody align="right">
				<ui:toolbargroup>
					<ui:selector binding="LanguageSelectorBinding" id="langselector" image="${icon:users-changepublicculture}" tooltip="View translation" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>--%>
	</ui:page>
</body>
</html>
