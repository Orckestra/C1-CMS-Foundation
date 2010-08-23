<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Help</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="HelpPageBinding.js"></script>
	</head>
	<body>
	
		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterHistoryBack" isdisabled="true"/>
			<ui:broadcaster id="broadcasterHistoryForward" isdisabled="true"/>
		</ui:broadcasterset>
		
		<ui:popupset>
			<ui:popup id="textsizepopup">
				<ui:menubody>
					<ui:menugroup>
						<ui:menuitem label="Normal" type="checkbox" ischecked="true"/>
						<ui:menuitem label="Larger" type="checkbox"/>
						<ui:menuitem label="Largest" type="checkbox"/>
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
		</ui:popupset>
		
		<!-- <ui:cover id="cover"/>  -->
		
		<ui:page id="page" binding="HelpPageBinding">
			<ui:toolbar id="toolbar" type="imagesonly">
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton id="backbutton" label="Back" image="${icon:previous}" image-disabled="${icon:previous-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipBack}" observes="broadcasterHistoryBack"/>
						<ui:toolbarbutton id="forwardbutton" label="Forward" image="${icon:next}" image-disabled="${icon:next-disabled}" tooltip="${string:Website.Content.Views.Help.ToolTipForward}" observes="broadcasterHistoryForward"/>
						<ui:toolbarbutton id="refreshbutton" rel="developermode" label="Refresh" image="${icon:refresh}" tooltip="${string:Website.Content.Views.Help.ToolTipRefresh}"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody align="right" rel="developermode">
					<ui:toolbargroup>
						<ui:toolbarbutton id="bookmarkbutton" label="Bookmark" rel="developermode" image="${icon:bookmark}" tooltip="Bookmark this page"/>
						<ui:toolbarbutton id="textsizebutton" label="Text Size" rel="developermode" image="${icon:zoom}" tooltip="Change text size" popup="textsizepopup"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:window id="helpwindow"/>
			<ui:toolbar id="statusbar" class="statusbar" rel="developermode">
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton id="contentsbutton" label="Contents" image="${icon:page}" tooltip="Help contents"/>
						<ui:toolbarbutton id="searchbutton" rel="developermode" label="Search" image="${icon:zoom}" tooltip="Search Help"/>
						<ui:toolbarbutton id="bookmarksbutton" rel="developermode" label="Bookmarks" image="${icon:bookmark}" tooltip="Your bookmarked pages"/>
						<!-- <ui:toolbarbutton id="navindex" label="Index" tooltip="Alphabetic index"/>-->
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
		</ui:page>
		
	</body>
</html>