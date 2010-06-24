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
			<ui:cover id="cover" busy="false">
				<ui:splash id="splash">
					<ui:decks id="decks" flex="false">
					
						<!-- intro -->
						<ui:deck id="introdeck">
							 <!-- this is supposed to be empty! -->
						</ui:deck>
						
						<!-- login -->
						<ui:deck id="logindeck">
							<!-- 
							<div class="buzzwords">
								<div id="version"><ui:text label="${version}"/></div>
								<div id="registration"><ui:text label="Registered to: ${registration}"/></div>
								<div><ui:text label="2010 Composite A/S"/></div>
							</div>
							-->
							<ui:fields id="loginfields">
								<div id="loginerror" class="errortext">
									<ui:text label="Username or password incorrect!"/>
								</div>
								<ui:field>
									<ui:fielddesc>Username</ui:fielddesc>
									<ui:fielddata>
										<ui:datainput name="username" required="true" autoselect="true"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc>Password</ui:fielddesc>
									<ui:fielddata>
										<ui:datainput name="password" password="true" required="true" minlength="6" autoselect="true"/>
									</ui:fielddata>
								</ui:field>
							</ui:fields>
							<ui:dialogtoolbar>
								<ui:clickbutton label="Login" image="${skin}/splash/button.png" focusable="true" oncommand="KickStart.login()"/>
							</ui:dialogtoolbar>
						</ui:deck>
						
						<!-- loading -->
						<ui:deck id="loadingdeck">
							<div class="strong">
								<div>Depending on your internet connection speed, Composite C1 may take a few moments to load.</div>
								<div id="progressbar">
									<ui:text label="Initializing Composite C1"/>
									<ui:progressbar/>
								</div>
							</div>
						</ui:deck>
						
						<!-- first time? -->
						<ui:deck id="firsttimedeck">
							<div class="strong">
								<div>Preparing first time startup...</div>
							</div>
						</ui:deck>
						
						<!-- shutdown -->
						<ui:deck id="shutdowndeck">
							<div class="strong">
								<div>Shutting down...</div>
							</div>
						</ui:deck>
						
					</ui:decks>
					<div id="backdrop"></div>
				</ui:splash>
			</ui:cover>
			
			<!-- app loaded here! -->
			<ui:window id="appwindow"/>
			
		</ui:page>
	</body>
</html>