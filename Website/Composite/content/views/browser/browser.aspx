<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Browser</title>
	    <control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="browser.css.aspx"/>
		<script type="text/javascript" src="BrowserAddressBarBinding.js"/>
		<script type="text/javascript" src="BrowserPageBinding.js"/>
		<script type="text/javascript" src="BrowserToolBarBinding.js"/>
		<script type="text/javascript" src="BrowserTabBoxBinding.js"/>
		<script type="text/javascript" src="BrowserTabBinding.js"/>
		<script type="text/javascript" src="LanguageSelectorBinding.js"/>
	</head>
	<body>
		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterHistoryBack" isdisabled="true"/>
			<ui:broadcaster id="broadcasterHistoryForward" isdisabled="true"/>
		</ui:broadcasterset>
		<ui:popupset>
			<ui:popup id="contextmenu">
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem cmd="back" label="Back" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipBack}" observes="broadcasterHistoryBack"/>
						<ui:menuitem cmd="forward" label="Forward" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipForward}" observes="broadcasterHistoryForward"/>
						<ui:menuitem cmd="refresh" label="Refresh" image="${icon:refresh}" tooltip="${string:Website.Content.Views.Help.ToolTipRefresh}"/>
					</ui:menugroup>
					<ui:menugroup>
						<ui:menuitem cmd="viewsource" label="View Page source" image="${icon:editor-sourceview}"/>
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
		</ui:popupset>
		<ui:page id="browserpage" binding="BrowserPageBinding" image="${icon:browser}">
			<ui:cover id="cover" transparent="true" busy="false"/>
			<ui:menubar id="menubar" binding="StageMenuBarBinding">
				<ui:menu label="${string:Website.App.LabelView}">
					<ui:menupopup>
						<ui:menubody>
							<ui:menugroup>
								<ui:menuitem cmd="viewsource" label="Page source" image="${icon:editor-sourceview}"/>
							</ui:menugroup>
						</ui:menubody>
					</ui:menupopup>
				</ui:menu>
			</ui:menubar>
			<ui:toolbar id="navbar" imagesize="large" binding="BrowserToolBarBinding">
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton cmd="back" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Back.ToolTip}" observes="broadcasterHistoryBack"/>
						<ui:toolbarbutton cmd="forward" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Forward.ToolTip}" observes="broadcasterHistoryForward"/>
						<ui:toolbarbutton cmd="refresh" image="${icon:refresh}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Refresh.ToolTip}"/>
						<ui:toolbarbutton cmd="home" image="${icon:home}" tooltip="${string:Composite.Web.PageBrowser:ToolBarButton.Home.ToolTip}"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody align="right" class="max" style="overflow:hidden;">
					<ui:toolbargroup>
						<ui:datainput id="addressbar" name="addressbar" binding="BrowserAddressBarBinding" autoselect="true"/>
						<ui:toolbarbutton id="go" image="${icon:input}" image-disabled="${icon:input-disabled}" isdisabled="true" tooltip="Go to the address in the location bar"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:tabbox id="browsertabbox" binding="BrowserTabBoxBinding">
				<ui:tabs hidden="true"/>
				<ui:tabpanels style="position:relative;">
					<ui:cover id="blocker" transparent="false" busy="false" hidden="true">
						<div id="message">
							<div id="icon"/>
							<div id="text">
								<ui:text label="External URL not loaded: "/>
								<span id="externalurl">:)</span>
							</div>
						</div>
					</ui:cover>
				</ui:tabpanels>
			</ui:tabbox>
			<ui:toolbar class="statusbar">
				<ui:toolbarbody align="right">
					<ui:toolbargroup>
						<ui:selector binding="LanguageSelectorBinding" id="langselector" image="${icon:users-changepublicculture}" tooltip="View translation"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
		</ui:page>
	</body>
</html>