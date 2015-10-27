<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.About</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <link rel="stylesheet" type="text/css" href="about.css.aspx" />
    <script type="text/javascript" src="About.js"></script>
</head>
<body>
    <ui:dialogpage label="${string:Website.Dialogs.About.Title}" image="${icon:company-composite}" height="auto" width="370" resizable="false">
            <div id="about">
                <div id="info">
                    <ui:cover id="infocover" busy="false" hidden="true" />
                    <div id="prettyversion">${pretty}</div>
                    <div id="version">Build no. ${version}</div>
                    <div id="copyright">© <%=DateTime.Now.Year%> Composite A/S</div>
                    <br />
                    <div>
                        <input id="id" value="${id}" onclick="this.select()" readonly="readonly" />
                        Installation ID: 
                    </div>
                </div>
                <div id="credits">
                    <div id="roll">
                        <a href="http://www.composite.net/" target="wwwcompositenet">
                            <div class="logo" id="logo1" ></div>
                        </a>
                        <h2>Visual Editor</h2>
                        <p>
                            powered by<br />
                            <a href="http://tinymce.moxiecode.com/" title="Visit Moxicode" target="_blank">TinyMCE</a>
                        </p>
                        <h2>Source Editor</h2>
                        <p>
                            powered by<br />
                            <a href="http://codemirror.net/" title="Visit CodeMirror" target="_blank">CodeMirror</a>
                        </p>
                        <h2>Function Previews</h2>
                        <p>
                            powered by<br />
                            <a href="http://phantomjs.org/" title="Visit PhantomJS" target="_blank">PhantomJS</a>
                        </p>
                        <h2>SVG Icons</h2>
                        <p>
                            designed by<br />
                            <a href="http://www.orckestra.com/" title="Visit Orckestra" target="_blank">Orckestra</a><br />
                            <a href="http://www.freepik.com/" title="Visit Freepik" target="_blank">Freepik</a>
                        </p>
                        <div id="names" />
                        <div class="logo" id="logo2"></div>
                    </div>
                </div>
                 <div id="fade"></div>
            </div>
        <ui:dialogtoolbar>
            <ui:toolbarbody equalsize="true">
                <ui:toolbargroup>
                    <ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true" class="pull-right"/>
                    <ui:clickbutton id="buttonCredits" label="${string:Website.Dialogs.About.LabelCredits}" focusable="true" oncommand="About.credits ()" />
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:dialogtoolbar>
    </ui:dialogpage>
</body>
</html>
