<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.Test!</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <link rel="stylesheet" type="text/css" href="seoassist.css.aspx" />
    <script type="text/javascript" src="scripts/SEODOMParser.js"></script>
    <script type="text/javascript" src="scripts/SEOResult.js"></script>
    <script type="text/javascript" src="bindings/SEOAssistantPageBinding.js"></script>
    <ui:stringbundle id="strings" />
</head>
<body>
    <ui:page binding="SEOAssistantPageBinding">
        <ui:scrollbox>
            <table class="resulttable">
                <thead>
                    <tr>
                        <th colspan="2">
                            <div class="seoform clearfix">
                                <ui:fielddata>
                                    <ui:datainput id="keywordinput" placeholder="${string:Composite.Web.SEOAssistant:AddKeywordInputPlaceholder}" />
                                    <ui:toolbarbutton image="add" id="addkeywordbutton" title="Add Keyword" />
                                </ui:fielddata>
                            </div>
                        </th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInTitle}"></ui:text></th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInURL}"></ui:text></th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInMenuTitle}"></ui:text></th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInDescription}"></ui:text></th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInHeading}"></ui:text></th>
                        <th>
                            <ui:text label="${string:Composite.Web.SEOAssistant:isInContent}"></ui:text></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="resultcontaner">
                </tbody>
            </table>
            <div id="message">
                <div id="icon">
                    <ui:labelbox image="message" />
                </div>

                <div id="text">
                    <ui:text label="${string:Composite.Web.SEOAssistant:IntroText}" />
                </div>
            </div>
        </ui:scrollbox>
    </ui:page>
</body>
</html>
