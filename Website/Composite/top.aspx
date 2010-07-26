<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:appinitializer runat="server"/>
	<control:httpheaders runat="server"/>
	<head>
		<title>C1: <%=Request.Url.Host%></title>
        <meta name="robots" content="noindex, nofollow" />
		<control:styleloader runat="server"/>
		<link rel="stylesheet" type="text/css" href="top.css.aspx"/>
		<link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico"/>
		<control:scriptloader type="top" runat="server"/>
		
		<script type="text/javascript">
			DocumentManager.hasNativeContextMenu = true;
		</script>
		
		<ui:keyset>
			
			<!-- general keycombos -->
			<ui:key key="L" modifiers="control shift" oncommand="Commands.systemLog ()" preventdefault="true"/>
			<ui:key key="S" modifiers="control" oncommand="Commands.save ()" preventdefault="true"/>
			<ui:key key="R" modifiers="control" oncommand="Application.reload ()" preventdefault="true"/>
			<ui:key key="D" modifiers="control" oncommand="// disable bookmarking!" preventdefault="true"/>
			
			<!-- globally broadcasting special keystrokes -->
			<ui:key key="VK_ENTER" 		oncommand="Keyboard.keyEnter ()" modifiers="*"/>
			<ui:key key="VK_ESCAPE"		oncommand="Keyboard.keyEscape ()" modifiers="*"/>
			<ui:key key="VK_SPACE" 		oncommand="Keyboard.keySpace ()" modifiers="*"/>
			<ui:key key="VK_SHIFT" 		oncommand="Keyboard.keyShift ()" modifiers="*"/>
			<ui:key key="VK_CONTROL" 	oncommand="Keyboard.keyControl ()" modifiers="*"/>
			<ui:key key="VK_TAB"		oncommand="Keyboard.keyTab ()" modifiers="*"/>
			<ui:key key="VK_UP" 		oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_UP )" modifiers="*"/>
			<ui:key key="VK_RIGHT" 		oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_RIGHT )" modifiers="*"/>
			<ui:key key="VK_DOWN" 		oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_DOWN )" modifiers="*"/>
			<ui:key key="VK_LEFT" 		oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_LEFT )" modifiers="*"/>
			
		</ui:keyset>
		
	</head>
	<body id="top">
	
		<ui:cover id="mastercover" transparent="true" busy="true" blockevents="true"/>
		<ui:cover id="logoutcover" busy="false" blockevents="true" hidden="true"/>
		<ui:uncover id="uncover"/>
		
		<ui:theatre id="offlinetheatre">
			<div id="offlinesplash">
				<div id="offlineimage"></div>
				<span id="offlinetext">
					<span class="text1">Working</span>
					<span class="text2">Working</span>
				</span>
			</div>
			<div id="offlinemovie"/>
		</ui:theatre>
		
		<ui:persistance id="persistance"/>
		<ui:window id="audioloader" binding="AudioWindowBinding"/>
		
		<ui:page id="toppage" strongfocusmanager="false" flex="false">
		
			<!-- show intro splash or normal splash? -->
			<ui:cover id="cover" busy="false">
				<asp:PlaceHolder ID="introholder" runat="server" Visible="false">
					<% Response.WriteFile ( "welcome.inc" ) %>
				</asp:PlaceHolder>
				<asp:PlaceHolder ID="splashholder" runat="server" Visible="true">
					<% Response.WriteFile ( "top.inc" ) %>
				</asp:PlaceHolder>
			</ui:cover>
			
			<!-- app loaded here! -->
			<ui:window id="appwindow"/>
			
		</ui:page>
	</body>
</html>