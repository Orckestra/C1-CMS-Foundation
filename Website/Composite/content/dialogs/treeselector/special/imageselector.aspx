<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.Dialog.ImageSelector</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <script type="text/javascript" src="../TreeSelectorDialogPageBinding.js"></script>
    <script type="text/javascript" src="../TreeSelectorToolBarBinding.js"></script>
    <script type="text/javascript" src="ImageSelectorDialogPageBinding.js"></script>
    <link rel="stylesheet" type="text/css" href="../treeselector.css.aspx" />
    <link rel="stylesheet" type="text/css" href="imageselector.css.aspx" />
</head>
<body>
    <ui:popupset id="masterpopupset">
        <ui:popup id="moreactionspopup" position="bottom" />
    </ui:popupset>
    <ui:dialogpage binding="ImageSelectorDialogPageBinding"
        label="(title supplied as page argument!)"
        width="600"
        height="480"
        resizable="false"
        class="with-top-toolbar">
        <ui:toolbar id="toolbar" binding="TreeSelectorToolBarBinding" imagesize="large" class="white">
            <ui:toolbarbody />
            <ui:toolbarbody id="moreactionstoolbargroup">
                <ui:toolbargroup>
                    <ui:toolbarbutton id="moreactionsbutton" label="More" popup="moreactionspopup" />
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:toolbar>
        <ui:pagebody class="pad-0">
            <ui:box id="treebox">
                <ui:tree id="selectiontree" binding="SystemTreeBinding" selectiontype="single" actionaware="true" treeselector="true" locktoeditor="false">
                    <ui:treebody />
                </ui:tree>
            </ui:box>
            <ui:box id="infobox">
                <div id="info">
                    <ui:datainput readonly="true" isdisabled="true" id="treeselectionresult" name="treeselectionresult" />
                    <div id="previewimage">
                        <ui:labelbox class="icon-preview" image="${icon:folder-open-2}"></ui:labelbox>
                    </div>
                </div>
            </ui:box>
        </ui:pagebody>

        <ui:dialogtoolbar>
            <ui:toolbarbody align="right" equalsize="true" class="right">
                <ui:toolbargroup>
                    <ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" id="buttonAccept" response="accept" isdisabled="true" focusable="true" default="true" />
                    <ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true" />
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:dialogtoolbar>
    </ui:dialogpage>
</body>
</html>
