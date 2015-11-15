<!DOCTYPE html>
<%@ Page Language="C#" AutoEventWireup="true" Inherits="Composite_Management_Top" CodeFile="Top.aspx.cs" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:appinitializer runat="server" />
<control:httpheaders runat="server" />
<head>

    <%--<meta http-equiv="x-ua-compatible" content="IE=EmulateIE9" >--%>
    <%--<meta http-equiv="X-UA-Compatible" content="IE=5">--%>

    <title>C1: <%= Request.Url.Host%></title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="google" value="notranslate" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <control:styleloader runat="server" />
    <link rel="stylesheet" type="text/css" href="top.css.aspx" />
	<control:brandingSnippet runat="server" SnippetName="includes" />
     <% Response.WriteFile("favicon.inc"); %>
    <control:scriptloader type="top" runat="server" />

    <ui:keyset>

        <!-- general keycombos -->
        <ui:key key="L" modifiers="control shift" oncommand="Commands.systemLog ()" preventdefault="true" />
        <ui:key key="S" modifiers="control" oncommand="Commands.save ()" preventdefault="true" />
        <ui:key key="R" modifiers="control" oncommand="Application.reload ()" preventdefault="true" />
        <ui:key key="D" modifiers="control" oncommand="// disable bookmarking!" preventdefault="true" />

        <!-- help view -->
        <ui:key key="VK_F1" oncommand="Commands.help ()" preventdefault="true" />

        <!-- globally broadcasting special keystrokes -->
        <ui:key key="VK_ENTER" oncommand="Keyboard.keyEnter ()" modifiers="*" />
        <ui:key key="VK_ESCAPE" oncommand="Keyboard.keyEscape ()" modifiers="*" />
        <ui:key key="VK_SPACE" oncommand="Keyboard.keySpace ()" modifiers="*" />
        <ui:key key="VK_SHIFT" oncommand="Keyboard.keyShift ()" modifiers="*" />
        <ui:key key="VK_CONTROL" oncommand="Keyboard.keyControl ()" modifiers="*" />
        <ui:key key="VK_TAB" oncommand="Keyboard.keyTab ()" modifiers="*" />
        <ui:key key="VK_UP" oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_UP )" modifiers="*" />
        <ui:key key="VK_RIGHT" oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_RIGHT )" modifiers="*" />
        <ui:key key="VK_DOWN" oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_DOWN )" modifiers="*" />
        <ui:key key="VK_LEFT" oncommand="Keyboard.keyArrow ( KeyEventCodes.VK_LEFT )" modifiers="*" />

    </ui:keyset>

</head>
<body id="top">

    <ui:cover id="mastercover" transparent="true" busy="true" blockevents="true" doubletouchunlock="true" />
    <ui:cover id="logoutcover" busy="false" blockevents="true" hidden="true" />
    <ui:uncover id="uncover" />

    <ui:theatre id="offlinetheatre" hidden="true">
        <div id="offlinesplash">
            <div id="offlineimage" />
            <div id="offlinetext">
                Working... Please wait.
    				<noscript><div>ERROR! Your browser does not support JavaScript</div></noscript>
            </div>
        </div>
    </ui:theatre>

    <ui:persistance id="persistance" />

    <ui:page id="toppage" strongfocusmanager="false" flex="false">

        <!-- show intro splash or normal splash? -->
        <ui:cover id="cover" class="splash-cover" busy="false">
            <div class="splash-bg"></div>
			<asp:Literal ID="contentHolder" runat="server" />
		</ui:cover>

        <!-- app loaded here! -->
        <ui:window id="appwindow" />

    </ui:page>
</body>
</html>
