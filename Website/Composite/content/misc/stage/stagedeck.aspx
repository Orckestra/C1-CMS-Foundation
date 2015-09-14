<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>    

	<control:httpheaders runat="server" />
	<head>
	
		<title>Composite.Management.StageDeck</title>
		<control:styleloader runat="server"/>
		<link rel="stylesheet" type="text/css" href="stagedeck.css.aspx"/>
		<control:scriptloader type="sub" runat="server"/>
		
		<!-- custom bindings around here! -->
		<ui:bindingmappingset>
			<ui:bindingmapping element="body" binding="StageDeckRootBinding"/>
			<ui:bindingmapping element="ui:splitbox" binding="StageSplitBoxBinding"/>
			<ui:bindingmapping element="ui:splitpanel" binding="StageSplitPanelBinding"/>
			<ui:bindingmapping element="ui:splitter" binding="StageSplitterBinding"/>
		</ui:bindingmappingset>
	</head>
	<body>
		
		<!-- 
			the StageDeckRootBinding has been setup to load deck markup 
			from server using XMLHttpRequest so that we can preserve 
			deck layout between sessions. This feature is DISABLED now, 
			and the markup has been hardwired. All changes here should 
			be mirrored in "templates/defaultstagedeck.xml" at some point.
		-->
		
		<ui:viewset id="views"/>

		
		<ui:splitbox orient="horizontal" layout="8:3">
			<ui:splitpanel>
				<ui:splitbox orient="vertical" layout="8:3">
					<ui:splitpanel type="editors">
						<ui:dock reference="main" type="editors">
							<ui:docktabs>
							</ui:docktabs>
							<ui:dockpanels>
							</ui:dockpanels>
						</ui:dock>
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel>
						<ui:splitbox orient="horizontal" layout="1:1">
							<ui:splitpanel>
								<ui:dock reference="bottomleft">
									<ui:docktabs>
									</ui:docktabs>
									<ui:dockpanels>
									</ui:dockpanels>
								</ui:dock>
							</ui:splitpanel>
							<ui:splitter/>
							<ui:splitpanel>
								<ui:dock reference="bottomright">
									<ui:docktabs>
									</ui:docktabs>
									<ui:dockpanels>
									</ui:dockpanels>
								</ui:dock>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:splitpanel>
			<ui:splitter collapse="after"/>
			<ui:splitpanel>
				<ui:splitbox orient="vertical" layout="1:1">
					<ui:splitpanel>
						<ui:dock reference="righttop">
							<ui:docktabs>
							</ui:docktabs>
							<ui:dockpanels>
							</ui:dockpanels>
						</ui:dock>
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel>
						<ui:dock reference="rightbottom">
							<ui:docktabs>
							</ui:docktabs>
							<ui:dockpanels>
							</ui:dockpanels>
						</ui:dock>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:splitpanel>
		</ui:splitbox>
		
	</body>
</html>
