<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>

	<title>Composite.Management.App</title>

	<!-- quickly set this variable before the WindowManager loads! -->
	<script type="text/javascript">top.app = this;</script>

	<control:scriptloader type="sub" runat="server" />
	<control:styleloader runat="server" />
	<control:brandingSnippet runat="server" SnippetName="includes" />
	<ui:bindingmappingset>
		<ui:bindingmapping element="ui:splitbox" binding="StageSplitBoxBinding" />
		<ui:bindingmapping element="ui:splitpanel" binding="StageSplitPanelBinding" />
		<ui:bindingmapping element="ui:splitter" binding="StageSplitterBinding" />
	</ui:bindingmappingset>

	<ui:broadcasterset>
		<ui:broadcaster id="broadcasterCurrentIsEditor" isdisabled="true" />
		<ui:broadcaster id="broadcasterHasOpenEditors" isdisabled="true" />
		<ui:broadcaster id="broadcasterCurrentTabDirty" isdisabled="true" />
		<ui:broadcaster id="broadcasterHasDirtyTabs" isdisabled="true" />
	</ui:broadcasterset>

</head>
<body id="app">

	<ui:cursor id="dragdropcursor" />
	<ui:dialogset id="masterdialogset" binding="StageDialogSetBinding" />
	<ui:window id="downloadwindow" url="${root}/blank.aspx" flex="false" />

	<ui:popupset id="fieldhelpopupset" />
	<ui:popupset id="selectorpopupset" />
	<ui:popupset id="masterpopupset">
		<ui:popup id="masterpopup" />
		<ui:popup id="tabsbuttonpopup" position="bottom" />
		<ui:popup id="moreactionspopup" position="bottom" />
		<ui:popup id="visualeditorpopup" binding="VisualEditorPopupBinding" />
		<ui:popup id="sourcecodeeditorpopup" binding="CodeMirrorEditorPopupBinding" />
		<ui:popup id="explorerpopup" binding="ExplorerPopupBinding">
			<ui:menubody>
				<ui:menugroup rel="treeoperations">
					<ui:menuitem label="${string:Website.App.LabelRefresh}" cmd="refresh" image="${icon:refresh}" image-disabled="${icon:refresh-disabled}" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
		<ui:popup id="systemtreepopup" binding="SystemTreePopupBinding">
			<ui:menubody>
				<ui:menugroup rel="treeoperations">
					<ui:menuitem label="${string:Website.App.LabelRefresh}" cmd="refresh" image="${icon:refresh}" image-disabled="${icon:refresh-disabled}" />
				</ui:menugroup>
				<ui:menugroup rel="clipboardoperations">
					<ui:menuitem label="${string:Website.App.LabelCut}" cmd="cut" image="${icon:cut}" image-disabled="${icon:cut-disabled}" isdisabled="true" />
					<ui:menuitem label="${string:Website.App.LabelCopy}" cmd="copy" image="${icon:copy}" image-disabled="${icon:copy-disabled}" isdisabled="true" style="display: none;" />
					<ui:menuitem label="${string:Website.App.LabelPaste}" cmd="paste" image="${icon:paste}" image-disabled="${icon:paste-disabled}" isdisabled="true" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
		<ui:popup id="docktabpopup" binding="DockTabPopupBinding">
			<ui:menubody>
				<ui:menugroup>
					<ui:menuitem label="${string:Website.App.LabelCloseTab}" cmd="closetab" />
					<ui:menuitem label="${string:Website.App.LabelCloseOthers}" cmd="closeothers" />
				</ui:menugroup>
				<ui:menugroup rel="developermode">
					<ui:menuitem label="${string:Website.App.LabelRefreshView}" cmd="refreshview" />
					<ui:menuitem label="${string:Website.App.LabelMakeDirty}" cmd="makedirty" />
				</ui:menugroup>
				<ui:menugroup rel="developermode">
					<ui:menuitem label="${string:Website.App.LabelViewSource}" cmd="viewsource" />
					<ui:menuitem label="${string:Website.App.LabelViewGenerated}" cmd="viewgenerated" />
					<ui:menuitem label="${string:Website.App.LabelViewSerialized}" cmd="viewserialized" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
		<ui:popup id="dialogtitlebarpopup" binding="DialogTitleBarPopupBinding">
			<ui:menubody>
				<ui:menugroup>
					<ui:menuitem label="${string:Website.App.LabelClose}" cmd="closedialog" />
				</ui:menugroup>
				<ui:menugroup rel="developermode">
					<ui:menuitem label="${string:Website.App.LabelRefreshView}" cmd="refreshview" />
				</ui:menugroup>
				<ui:menugroup rel="developermode">
					<ui:menuitem label="${string:Website.App.LabelViewSource}" cmd="viewsource" />
					<ui:menuitem label="${string:Website.App.LabelViewGenerated}" cmd="viewgenerated" />
					<ui:menuitem label="${string:Website.App.LabelViewSerialized}" cmd="viewserialized" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
		<ui:popup id="toolboxpopup" position="bottom">
			<ui:menubody>
				<ui:menugroup id="toolboxpopupgroup" />
				<ui:menugroup>
					<ui:menuitem binding="StartMenuItemBinding" label="${string:Website.App.LabelViewCompositeStart}" image="${icon:company-composite}" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>

	<ui:balloonset id="balloonset" />
	<ui:balloonset id="dialogballoonset" />

	<ui:menubar id="menubar" class="menubar" binding="StageMenuBarBinding">

		<%--		<ui:menu label="${string:Website.App.LabelFile}" >
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelFileClose}" oncommand="Commands.close ()" observes="broadcasterCurrentIsEditor" tooltip="Save and close active editor" />
						<ui:menuitem label="${string:Website.App.LabelFileCloseAll}" oncommand="Commands.closeAll ()" observes="broadcasterHasOpenEditors" tooltip="Save and close all editors" />
					</ui:menugroup>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelSave}" oncommand="Commands.save ()" observes="broadcasterCurrentTabDirty" tooltip="Save active editor" />
						<ui:menuitem label="${string:Website.App.LabelFileSaveAll}" oncommand="Commands.saveAll ()" observes="broadcasterHasDirtyTabs" tooltip="Save all editors" />
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>--%>
		<%--		<ui:menu label="${string:Website.App.LabelView}">
			<ui:menupopup>
				<ui:menubody>

					<ui:menugroup>
						<ui:menuitem binding="StartMenuItemBinding" label="${string:Website.App.LabelViewCompositeStart}" image="${icon:composite}" />
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>--%>
		<ui:menu label="Developer" rel="developermode" id="developermenu" class="last">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelSystemLog}" binding="StageViewMenuItemBinding" handle="Composite.Management.SystemLog" type="checkbox" image="${icon:systemlog}" />
						<ui:menuitem label="${string:Website.App.LabelDeveloperPanel}" binding="StageViewMenuItemBinding" handle="Composite.Management.Developer" type="checkbox" image="${icon:developer}" />
						<ui:menuitem label="Icons">
							<ui:menupopup>
								<ui:menubody>
									<ui:menugroup>
										<ui:menuitem label="Sprite SVG" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack.SpriteSVG" type="checkbox" image="${icon:icon}" />
									</ui:menugroup>
								</ui:menubody>
							</ui:menupopup>
						</ui:menuitem>
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
		<%--		<ui:menu label="${string:Website.App.LabelTools}">
			<ui:menupopup>
				<ui:menubody>

				</ui:menubody>
			</ui:menupopup>
		</ui:menu>--%>
		<ui:menu image="${icon:help}" id="helpmenu" class="icon" tooltip="${string:Website.App.LabelHelp}">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelHelpContents}" image="${icon:help}" binding="StageViewMenuItemBinding" handle="Composite.Management.Help" />
						<ui:menuitem label="${string:Website.App.LabelFeedback}" image="${icon:feedback}" oncommand="window.open('http://users.composite.net/Feedback')" />
					</ui:menugroup>
					<ui:menugroup>
						<div class="brand-about-menuitem" onclick="Commands.about()">
							<img alt="brand" src="images/branding/brand-icon.png?cacheversion=<%= DateTime.Now.TimeOfDay %>" />
							<div class="menuitem-text">
								<ui:text label="${string:Website.App.LabelAbout}"></ui:text>
							</div>
						</div>
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
		<ui:menu image="${icon:settings}" id="settingsmenu" class="icon" tooltip="${string:Website.App.LabelSettings}">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup id="toolsmenugroup" />
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
		<ui:menu id="localizationmenu" binding="LocalizationSelectorBinding">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
		<ui:menu label="Username" id="usermenu">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup id="translationsmenugroup" />
					<ui:menugroup id="usermenugroup" />
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelFileExit}" image="${icon:exit}" oncommand="Application.quit ();" />
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
	</ui:menubar>
	<ui:explorer id="explorer">
		<ui:explorermenu id="explorermenu">
			<ui:explorertoolbar>
				<ui:toolbarbody align="left">
					<ui:toolbargroup class="clearfix">
						<div class="brand-name">
							<div class="brand-icon">
								<img src="images/branding/brand-icon.png?cacheversion=<%= DateTime.Now.TimeOfDay %>" alt="brand" onclick="EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);" />
							</div>
							<div class="brand-text">
								<img src="images/branding/brand-text.svg?cacheversion=<%= DateTime.Now.TimeOfDay %>" alt="brand" />
							</div>
						</div>
						<ui:toolbarbutton id="menutogglebutton" class="menu-toggle" image="${icon:menu}" oncommand="top.app.bindingMap.explorermenu.toggle()" />
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody class="max">
					<ui:toolbargroup class="max textonly" />
				</ui:toolbarbody>
				<ui:toolbarbody class="brand-main">
					<control:brandingSnippet SnippetName="brand-main" runat="server" />
				</ui:toolbarbody>
			</ui:explorertoolbar>
		</ui:explorermenu>
	</ui:explorer>
	<ui:cover id="explorermenucover" transparent="true" busy="false" class="explorermenucover" onclick="top.app.bindingMap.explorermenu.collapse()" />

	<ui:cover id="stagesplittercover" hidden="true" transparent="true" busy="false" />
	<ui:stagesplitterbody id="stagesplitterbody" class="binding" binding="StageSplitterBodyBinding" />

	<ui:viewset id="views" />

	<ui:stagecontainer id="stagecontainer">
		<ui:flexbox id="stageflexbox">
			<ui:stage id="stage" strongfocusmanager="false">
				<ui:splitbox id="appstagesplitbox" orient="horizontal" layout="5:2" persist="layout">
					<ui:splitpanel>
						<ui:splitbox id="appverticalsplitbox" orient="vertical" layout="3:1" persist="layout">
							<ui:splitpanel>
								<ui:decks id="maindecks">
									<ui:deck id="startdeck">
										<ui:dock id="startdock" reference="start" type="start">
											<ui:docktabs>
												<ui:docktab handle="Composite.Management.Start" />
											</ui:docktabs>
											<ui:dockpanels>
												<ui:dockpanel />
											</ui:dockpanels>
										</ui:dock>
									</ui:deck>
									<ui:deck id="stagedeck">
										<ui:cover id="stagedeckscover" busy="false" />
										<ui:stagedecks id="stagedecks" />
									</ui:deck>
								</ui:decks>
							</ui:splitpanel>
							<ui:splitter />
							<ui:splitpanel>
								<ui:splitbox id="absbottomsplitbox" orient="horizontal" layout="2:1" persist="layout">
									<ui:splitpanel>
										<ui:dock reference="absbottomleft">
											<ui:docktabs />
											<ui:dockpanels />
										</ui:dock>
									</ui:splitpanel>
									<ui:splitter />
									<ui:splitpanel>
										<ui:dock reference="absbottomright">
											<ui:docktabs />
											<ui:dockpanels />
										</ui:dock>
									</ui:splitpanel>
								</ui:splitbox>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:splitpanel>
					<ui:splitter />
					<ui:splitpanel>
						<ui:splitbox id="absrightsplitbox" orient="vertical" layout="1:1" persist="layout">
							<ui:splitpanel>
								<ui:dock reference="absrighttop">
									<ui:docktabs />
									<ui:dockpanels />
								</ui:dock>
							</ui:splitpanel>
							<ui:splitter />
							<ui:splitpanel>
								<ui:dock reference="absrightbottom">
									<ui:docktabs />
									<ui:dockpanels />
								</ui:dock>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:stage>
		</ui:flexbox>
		<%--	<ui:toolbar id="statusbar" binding="StageStatusBarBinding">
			<ui:toolbarbody>
				<ui:toolbargroup>
					<ui:toolbarlabel id="statusbarlabel" />
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody align="right">
				<ui:selector binding="LocalizationSelectorBinding" image="${icon:users-changepublicculture}" />
			</ui:toolbarbody>
		</ui:toolbar>--%>
	</ui:stagecontainer>

</body>
</html>
