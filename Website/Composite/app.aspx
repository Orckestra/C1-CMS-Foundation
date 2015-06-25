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
	<link rel="stylesheet" type="text/css" href="app.css.aspx" />

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
					<ui:menuitem binding="StartMenuItemBinding" label="${string:Website.App.LabelViewCompositeStart}" image="${icon:composite}" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>
	
	<ui:toolbar id="systemtoolbar" binding="SystemToolBarBinding">
			<ui:toolbarbody/>
			<ui:toolbarbody id="moreactionstoolbargroup">
				<ui:toolbargroup>
					<ui:toolbarbutton id="moreactionsbutton" label="More ▼" popup="moreactionspopup"/>
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>

	<ui:balloonset id="balloonset" />
	<ui:balloonset id="dialogballoonset" />

	<ui:menubar id="menubar" binding="StageMenuBarBinding">
		
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
		<ui:menu label="Developer" rel="developermode">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelSystemLog}" binding="StageViewMenuItemBinding" handle="Composite.Management.SystemLog" type="checkbox" image="${icon:systemlog}" />
						<ui:menuitem label="${string:Website.App.LabelDeveloperPanel}" binding="StageViewMenuItemBinding" handle="Composite.Management.Developer" type="checkbox" image="${icon:developer}" />
						<ui:menuitem label="Icons">
							<ui:menupopup>
								<ui:menubody>
									<ui:menugroup>
										<ui:menuitem label="Composite C1" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack.System" type="checkbox" image="${icon:icon}" />
										<ui:menuitem label="Files">
											<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
														<ui:menuitem label="Republic" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack.Republic" type="checkbox" image="${icon:icon}" />
														<ui:menuitem label="Harmony" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack.Harmony" type="checkbox" image="${icon:icon}" />
														<ui:menuitem label="Sprite SVG" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack.SpriteSVG" type="checkbox" image="${icon:icon}" />
													</ui:menugroup>
												</ui:menubody>
											</ui:menupopup>
										</ui:menuitem>
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
		<ui:menu image="${icon:help}">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelHelpContents}" image="${icon:help}" binding="StageViewMenuItemBinding" handle="Composite.Management.Help" />
						<ui:menuitem label="${string:Website.App.LabelFeedback}" image="${icon:feedback}" oncommand="window.open('http://users.composite.net/Feedback')" />
					</ui:menugroup>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelAboutComposite}" oncommand="Commands.about()" image="${icon:composite}" />
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
		
		<ui:menu binding="LocalizationSelectorBinding">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
					</ui:menugroup>
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>

		<ui:menu label="${string:AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelNewType}">
			<ui:menupopup>
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="${string:Website.App.LabelFileExit}" image="${icon:exit}" oncommand="Application.quit ();" />
					</ui:menugroup>
					<ui:menugroup id="translationsmenugroup" />
					<ui:menugroup id="toolsmenugroup" />
				</ui:menubody>
			</ui:menupopup>
		</ui:menu>
	</ui:menubar>

	<ui:explorermenu id="explorermenu">
		<ui:explorertoolbar>
			<ui:toolbarbody align="left">
				<ui:toolbargroup>
					<ui:throbber id="throbber" />
					<ui:toolbarbutton id="compositebutton" image="${icon:composite}"  oncommand="/* nothing */" />
					<ui:toolbarbutton id="menutogglebutton" image="${icon:menu}"  oncommand="top.app.bindingMap.explorermenu.toggle()" />
				</ui:toolbargroup>
				<ui:toolbargroup>
					<%--<ui:toolbarbutton id="mainmenubutton" popup="mainmenupopup" image="${icon:menu}" />--%>
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody class="max">
				<ui:toolbargroup class="max textonly" />
			</ui:toolbarbody>
		</ui:explorertoolbar>
	</ui:explorermenu>

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
								<ui:splitbox id="apphorizontalsplitbox" orient="horizontal" layout="7:0" persist="layout">
									<ui:splitpanel id="stagedeckssplitpanel">
										<ui:decks id="maindecks">
											<ui:deck id="startdeck">
												<ui:decks>
													<ui:deck>
														<ui:dock id="startdock" reference="start" type="start">
															<ui:docktabs>
																<ui:docktab handle="Composite.Management.Start" />
															</ui:docktabs>
															<ui:dockpanels>
																<ui:dockpanel />
															</ui:dockpanels>
														</ui:dock>
													</ui:deck>
													<ui:deck id="defaultstartdeck">
														<ui:window id="defaultstartwindow" url="${root}/content/misc/defaultstart/defaultstart.aspx" />
													</ui:deck>
												</ui:decks>
											</ui:deck>
											<ui:deck id="stagedeck">
												<ui:cover id="stagedeckscover" busy="false" />
												<ui:stagedecks id="stagedecks" />
											</ui:deck>
										</ui:decks>
									</ui:splitpanel>
									<ui:splitter style="display: none;"/>
									<ui:splitpanel type="explorer">
										<ui:dock id="explorerdock" reference="explorer" type="explorer" active="true">
											<ui:docktabs>
												<ui:docktab  id="explorerdocktab" handle="Composite.Management.Explorer" />
											</ui:docktabs>
											<ui:dockpanels>
												<ui:dockpanel />
											</ui:dockpanels>
										</ui:dock>
									</ui:splitpanel>
									
								</ui:splitbox>
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
