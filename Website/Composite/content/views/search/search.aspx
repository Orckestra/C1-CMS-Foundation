<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Website.Content.Views.Search.Search</title>
	    <control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="SearchPageBinding.js"></script>
		<link rel="stylesheet" type="text/css" href="search.css.aspx"/>
	</head>
	<body>
		<ui:page id="page" binding="SearchPageBinding">
			
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="${string:Website.Content.Views.Search.Search.LabelNewSearch}" oncommand="bindingMap.page.newSearch ()"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
 		 	</ui:toolbar>
			
			<ui:decks id="decks">
			
				<ui:deck id="defaultdeck">
					<ui:flexbox class="statustext">
					    <!-- No current search.-->
						<!--<ui:text label="${string:Website.Content.Views.Editors.RenderingEditor.RenderingEditor-General.Name.StatusText}"/>-->
					</ui:flexbox>
				</ui:deck>
			
				<ui:deck id="resultdeck">
			 		<ui:box class="statustext">
			 		    <!-- 23 results for "Fister" in "Flemming"-->
			 			<!--<ui:text label="323 results for &quot;fister&quot; in &quot;Flemming&quot;"/></ui:text>-->
			 		</ui:box>
					<ui:tree id="tree" binding="SystemTreeBinding">
						<ui:treebody/>
					</ui:tree>
				</ui:deck>
				
				<ui:deck id="noresultdeck">
			 		 <ui:flexbox class="statustext">
			 		    <!-- No results for "fister".-->
			 		 	<!--<ui:text label="No results for &quot;fisting&quot;"/>-->
			 		 </ui:flexbox>
				</ui:deck>
				
			</ui:decks>
		</ui:page>
	</body>
</html>