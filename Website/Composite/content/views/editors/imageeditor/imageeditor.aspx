<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.ImageEditor</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <link rel="stylesheet" type="text/css" href="imageeditor.css.aspx" />

    <script type="text/javascript" src="ImageEditor.js"></script>
    <script type="text/javascript" src="ImageEditorAction.js"></script>
    <script type="text/javascript" src="ImageEditorActions.js"></script>
    <script type="text/javascript" src="bindings/ImageEditorPageBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageBoxBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageSelectionBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageStageBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageScrollBoxBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageCursorBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageToolBoxBinding.js"></script>
    <script type="text/javascript" src="bindings/ImageToolBoxDraggerBinding.js"></script>

    <ui:bindingmappingset>
        <ui:bindingmapping element="ui:imagebox" binding="ImageBoxBinding" />
        <ui:bindingmapping element="ui:imageselection" binding="ImageSelectionBinding" />
        <ui:bindingmapping element="ui:imagetoolbox" binding="ImageToolBoxBinding" />
        <ui:bindingmapping element="ui:imagetoolboxdragger" binding="ImageToolBoxDraggerBinding" />
    </ui:bindingmappingset>

    <ui:keyset>
        <ui:key key="VK_NUMPLUS" oncommand="ImageEditor.zoomIn ()" />
        <ui:key key="VK_NUMMINUS" oncommand="ImageEditor.zoomOut ()" />
    </ui:keyset>

</head>
<body id="root">

    <ui:broadcasterset>
        <ui:broadcaster id="broadcasterHasSelection" isdisabled="true" />
        <ui:broadcaster id="broadcasterCanUndo" isdisabled="true" />
        <ui:broadcaster id="broadcasterCanRedo" isdisabled="true" />
        <ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
        <!-- not used?!?! -->
        <ui:broadcaster id="broadcasterCanZoomIn" />
        <ui:broadcaster id="broadcasterCanZoomOut" />
    </ui:broadcasterset>

    <ui:editorpage id="editorpage"
        binding="ImageEditorPageBinding"
        label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTitle}"
        image="${icon:media-edit-image-file}">

        <ui:menubar>
            <ui:menu label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelImage}" class="last">
                <ui:menupopup>
                    <ui:menubody>
                        <ui:menugroup>
                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTransform}">
                                <ui:menupopup>
                                    <ui:menubody>
                                        <ui:menugroup>
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipHorizontal}" oncommand="ImageEditorActions.flip(true)" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipVertical}" oncommand="ImageEditorActions.flip(false)" />
                                        </ui:menugroup>
                                        <ui:menugroup>
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CW}" oncommand="ImageEditorActions.rotate(90)" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CCW}" oncommand="ImageEditorActions.rotate(270)" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate180}" oncommand="ImageEditorActions.rotate(180)" />
                                        </ui:menugroup>
                                    </ui:menubody>
                                </ui:menupopup>
                            </ui:menuitem>
                        </ui:menugroup>
                        <ui:menugroup>
                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelScale}"
                                oncommand="ImageEditorActions.scale ()"
                                image="${icon:scale}" />
                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelCrop}"
                                oncommand="ImageEditorActions.crop ()"
                                image="${icon:crop}"
                                image-disabled="${icon:crop-disabled}"
                                observes="broadcasterHasSelection" />
                        </ui:menugroup>
                    </ui:menubody>
                </ui:menupopup>
            </ui:menu>
            <ui:menu label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelView}">
                <ui:menupopup>
                    <ui:menubody>
                        <ui:menugroup>
                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoom}" image="${icon:zoom}">
                                <ui:menupopup>
                                    <ui:menubody>
                                        <ui:menugroup>
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomIn}"
                                                oncommand="ImageEditor.zoomIn ();"
                                                observes="broadcasterCanZoomIn" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomOut}"
                                                oncommand="ImageEditor.zoomOut ();"
                                                observes="broadcasterCanZoomOut" />
                                        </ui:menugroup>
                                        <ui:menugroup id="zoommenugroup">
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label800}" zoom="6" type="checkbox" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label400}" zoom="5" type="checkbox" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label200}" zoom="4" type="checkbox" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label100}" zoom="3" type="checkbox" ischecked="true" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label50}" zoom="2" type="checkbox" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label25}" zoom="1" type="checkbox" />
                                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label12}" zoom="0" type="checkbox" />
                                        </ui:menugroup>
                                    </ui:menubody>
                                </ui:menupopup>
                            </ui:menuitem>
                        </ui:menugroup>
                    </ui:menubody>
                </ui:menupopup>
            </ui:menu>
            <ui:menu label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFile}">
                <ui:menupopup>
                    <ui:menubody>
                        <ui:menugroup>
                            <ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSave}"
                                image="${icon:save}"
                                image-disabled="${icon:save-disabled}"
                                observes="broadcasterCanUndo"
                                id="savemenuitem"
                                oncommand="bindingMap.savemenuitem.dispatchAction(EditorPageBinding.ACTION_SAVE);" />
                            <!-- 
								<ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSaveAs}"/>
								<ui:menuitem label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRevert}" observes="broadcasterCanUndo"/>
								-->
                        </ui:menugroup>
                    </ui:menubody>
                </ui:menupopup>
            </ui:menu>
        </ui:menubar>

        <ui:toolbar id="toolbar" class="btns-group">
            <ui:toolbarbody>
                <ui:toolbargroup>
                    <ui:toolbarbutton
                        id="savebutton"
                        image="${icon:save}"
                        tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelSave}"
                        image-disabled="${icon:save-disabled}"
                        oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"
                        observes="broadcasterCanUndo" />
                </ui:toolbargroup>
                <ui:toolbargroup>
                    <ui:toolbarbutton
                        id="scalebutton"
                        tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelScale}"
                        oncommand="ImageEditorActions.scale ()"
                        image="${icon:scale}" />
                    <ui:toolbarbutton
                        id="cropbutton"
                        tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelCrop}"
                        oncommand="ImageEditorActions.crop ()"
                        image="${icon:crop}"
                        image-disabled="${icon:crop-disabled}"
                        observes="broadcasterHasSelection" />
                </ui:toolbargroup>
                <ui:toolbargroup>
                    <ui:toolbarbutton
                        image="${icon:undo}"
                        tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelUndo}"
                        image-disabled="${icon:undo-disabled}"
                        observes="broadcasterCanUndo"
                        oncommand="ImageEditorActions.undo()" />
                    <ui:toolbarbutton
                        image="${icon:redo}"
                        tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelRedo}"
                        image-disabled="${icon:redo-disabled}"
                        observes="broadcasterCanRedo"
                        oncommand="ImageEditorActions.redo()" />
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:toolbar>

        <ui:flexbox id="imagestagecontainer">

            <ui:flexbox id="imagestage" binding="ImageStageBinding">
                <ui:imageboxsystem id="imagecontainer">
                    <ui:imagebox id="imagebox">
                        <img id="image" src="blank.png" />
                        <ui:imagecover />
                        <ui:imageselection id="imageselection" />
                    </ui:imagebox>
                </ui:imageboxsystem>
                <ui:cursor id="imagecursor" binding="ImageCursorBinding" />
                <ui:scrollbox id="imagescrollbox" binding="ImageScrollBoxBinding" />
            </ui:flexbox>

            <ui:imagetoolbox>
                <ui:imagetoolboxdragger />
                <ui:toolbar imagesize="large">
                    <ui:toolbarbody>
                        <ui:toolbargroup>
                            <!-- <ui:toolbarbutton type="radio" image="${skin}/imageeditor/move24.png" oncommand="ImageEditor.setMode ( ImageEditor.MODE_MOVE )"/>-->
                            <ui:toolbarbutton type="radio" image="${icon:selection(24)}" oncommand="ImageEditor.setMode ( ImageEditor.MODE_SELECT )" tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipSelect}" />
                            <ui:toolbarbutton type="radio" image="${icon:zoom(24)}" oncommand="ImageEditor.setMode ( ImageEditor.MODE_ZOOMIN )" tooltip="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipZoom}" />
                        </ui:toolbargroup>
                    </ui:toolbarbody>
                </ui:toolbar>
            </ui:imagetoolbox>

        </ui:flexbox>

        <ui:toolbar class="statusbar" blockactionevents="true">
            <ui:toolbarbody>
                <ui:toolbargroup>
                    <ui:selector id="zoomselector" image="${icon:zoom}">
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label800}" value="6" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label400}" value="5" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label200}" value="4" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label100}" value="3" selected="true" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label50}" value="2" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label25}" value="1" />
                        <ui:selection label="${string:Website.Content.Views.Editors.ImageEditor.ImageEditor.Label12}" value="0" />
                    </ui:selector>
                    <ui:labelbox id="statustext" class="toolbartext" />
                </ui:toolbargroup>
            </ui:toolbarbody>
            <ui:toolbarbody class="pull-right">
                <ui:labelbox id="coordstext" class="toolbartext" />
            </ui:toolbarbody>
        </ui:toolbar>

    </ui:editorpage>
</body>
</html>
