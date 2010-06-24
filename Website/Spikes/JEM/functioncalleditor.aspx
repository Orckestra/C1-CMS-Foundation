<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml"
xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.Test.IE8Disaster</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
</head>
<body>
    <ui:page label="IE8 Disaster">
        <ui:toolbar>
            <ui:toolbarbody>
                <ui:toolbarbutton label="!" />
            </ui:toolbarbody>
        </ui:toolbar>
        <ui:popupset>
            <ui:popup id="fisse">
                <ui:menubody>
                    <ui:menugroup>
                        <ui:menuitem label="Add New" image="${icon:functioncall}" />
                        <ui:menuitem label="Add New" image="${icon:functioncall}" />
                        <ui:menuitem label="Delete" image="${icon:delete}" image-disabled="${icon:delete-disabled()}" />
                    </ui:menugroup>
                </ui:menubody>
            </ui:popup>
        </ui:popupset>
        <ui:splitbox orient="horizontal" layout="4:5">
            <ui:splitpanel>
                <ui:tree contextmenu="fisse">
                    <ui:treebody>
                        <ui:treenode label="Composite.Data.Types.IMediaFolder.GetIMediaFolderXml" image="${icon:functioncall}"
                            open="true">
                            <ui:treenode label="Selected fields: Id, Path" image="${icon:parameter_overloaded}" />
                            <ui:treenode label="Filter" image="${icon:parameter_overloaded}" open="true">
                                <ui:treenode label="Composite.Data.Types.IMediaFolder.FieldPredicateFilter" image="${icon:functioncall}"
                                    open="true">
                                    <ui:treenode label="Id" image="${icon:parameter_overloaded}" open="true">
                                        <ui:treenode label="Composite.Utils.Predicates.GuidEquals" image="${icon:functioncall}"
                                            open="true">
                                            <ui:treenode label="The value to compare to" image="${icon:parameter_overloaded}"
                                                open="true">
                                                <ui:treenode label="Composite.Web.Request.QueryStringGuidValue" image="${icon:functioncall}"
                                                    open="true">
                                                    <ui:treenode label="Parameter name: mediafolderid" image="${icon:parameter_overloaded}" />
                                                    <ui:treenode label="Fallback Value" image="${icon:parameter}" />
                                                </ui:treenode>
                                            </ui:treenode>
                                        </ui:treenode>
                                    </ui:treenode>
                                    <ui:treenode label="KeyPath" image="${icon:parameter}" />
                                    <ui:treenode label="CompositePath" image="${icon:parameter}" />
                                    <ui:treenode label="StoreId" image="${icon:parameter}" />
                                    <ui:treenode label="Path" image="${icon:parameter}" />
                                    <ui:treenode label="Title" image="${icon:parameter}" />
                                    <ui:treenode label="Descrition" image="${icon:parameter}" />
                                </ui:treenode>
                            </ui:treenode>
                            <ui:treenode label="Order by" image="${icon:parameter}" />
                            <ui:treenode label="Order ascending" image="${icon:parameter}" />
                            <ui:treenode label="Page" image="${icon:parameter}" />
                        </ui:treenode>
                    </ui:treebody>
                </ui:tree>
            </ui:splitpanel>
            <ui:splitter />
            <ui:splitpanel>
                <ui:flexbox>
                    <ui:scrollbox class="padded">
                        <h3>
                            Selected fields</h3>
                        <p>
                            &lt;-- List&lt;String&gt;</p>
                        <p>
                            Select the fields to include in your XML document. The more fields, the less performant.
                            Yada yada.</p>
                            
                            
                           <ui:fields>
                            <ui:fieldgroup>
                                <!--
                                <ui:field>
                                    <ui:fielddesc>Name</ui:fielddesc>
                                    <ui:fielddata>
                                        <ui:datainput value="Selected Fields" readonly="true"/>
                                    </ui:fielddata>
                                </ui:field>
                                -->
                                <ui:field>
                                    <ui:fielddesc>Parameter Type</ui:fielddesc>
                                    <ui:fielddata>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-fisse}" label="Default"/>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-disbled}" label="Constant"/>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-disbled}" label="Function"/>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept}" label="Input Parameter"/>
                                    </ui:fielddata>
                                </ui:field>
                            </ui:fieldgroup>
                            <ui:fieldgroup>
                                <ui:field>
       
                                        <!--<ui:datainput value="(No value)" readonly="true"/>-->
                                       
                                <ui:fielddesc>Parameter Value</ui:fielddesc>
                                 <ui:fielddata>
                                     <ui:datainputselector name="datainputselector1" value="IsFrontpage" type="integer">
                                        <ui:selection value="2"/>
                                        <ui:selection value="3"/>
                                        <ui:selection value="4"/>
                                        <ui:selection value="5"/>
                                    </ui:datainputselector>
                                    </ui:fielddata>
                                </ui:field>
                            </ui:fieldgroup>
                        </ui:fields>
                          <!--
                        <ui:fields>
                            <ui:fieldgroup label="Parameter value type">
                                <ui:field>
                                    <ui:fielddesc>Value type</ui:fielddesc>
                                    <ui:fielddata>
                                        <ui:radiodatagroup name="radiogroup1">
                                        
                                            <ui:radio label="Default" value="p1" checked="true" />
                                            <ui:radio label="Constant" value="p2" />
                                            
                                            <ui:radio label="Function" value="p3" />
                                        </ui:radiodatagroup>
                                    </ui:fielddata>
                                </ui:field>
                                <ui:field>
                                    <ui:fielddesc>Value value</ui:fielddesc>
                                    <ui:fielddata>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:functioncall}" label="QuerystringGuidValue"/>
                                    </ui:fielddata>
                                </ui:field>
                            </ui:fieldgroup>
                        </ui:fields>
                        -->
                    </ui:scrollbox>
                </ui:flexbox>
            </ui:splitpanel>
        </ui:splitbox>
    </ui:page>
</body>
</html>
