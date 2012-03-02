<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test!</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="seoassist.css.aspx"/>
		<script type="text/javascript" src="scripts/SEODOMParser.js"></script>
		<script type="text/javascript" src="scripts/SEOResult.js"></script>
		<script type="text/javascript" src="bindings/SEOAssistantPageBinding.js"></script>
		<script type="text/javascript" src="bindings/SEOResultTreeBinding.js"></script>
		<script type="text/javascript" src="bindings/SEOResultTreeNodeBinding.js"></script>
		<ui:stringbundle id="strings" />
	</head>
	<body>
		<ui:page binding="SEOAssistantPageBinding">
			<ui:tabbox id="tabbox">
				<ui:tabs>
					<ui:tab id="scoretab" label="${string:Composite.Web.SEOAssistant:TabResult}"/>
					<ui:tab id="keywordstab" label="${string:Composite.Web.SEOAssistant:TabKeywords}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:decks id="decks">
							<ui:deck id="defaultdeck">
								<div id="message">
									<div id="icon"/>
									<div id="text">
										<ui:text label="${string:Composite.Web.SEOAssistant:IntroText}"/>
									</div>
								</div>
							</ui:deck>
							<ui:deck id="resultdeck">
								<ui:tree id="tree" binding="SEOResultTreeBinding">
									<ui:treebody/>
								</ui:tree>
							</ui:deck>
						</ui:decks>
					</ui:tabpanel>
					<ui:tabpanel>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarbutton id="savebutton" label="${string:Website.App.LabelSave}" image="${icon:save}" image-disabled="${icon:save-disabled}" isdisabled="true"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:scrollbox id="keywords">
							<ui:cover id="inputcover" transparent="true" busy="false" hidden="true"/>
							<div id="inputs"/>
						</ui:scrollbox>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>