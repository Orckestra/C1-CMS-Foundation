<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page CodeFile="postbackfun.aspx.cs" Inherits="postbackfun" Language="C#" AutoEventWireup="true"
    EnableEventValidation="false" ValidateRequest="false" %>

<%@ Register TagPrefix="aspui" Namespace="Composite.WebClient.UiControlLib" Assembly="Composite" %>
<%@ Register TagPrefix="control" Src="~/Composite/controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionCallsDesigner.ascx"
    TagName="FunctionCallDesigner" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    <formscontrol:styleloader adminrelativepath="controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionCallsDesigner.css.aspx" runat="server" />
	<control:httpheaders ID="Httpheaders1" runat="server" />

<head>
    <title>Composite.Management.Dialogs.Functions.EditFunctionCall</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <link rel="stylesheet" type="text/css" href="editfunctioncall.css.aspx" />
    <link rel="stylesheet" type="text/css" href="../../../controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionCallsDesigner.css.aspx" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />

    <script type="text/javascript" src="EditFunctionCallDialogPageBinding.js"></script>

    <script type="text/javascript" src="../../../scripts/aspnetajax/BindingForm.js"></script>

    <asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />

    <script type="text/javascript">
		    /*
		     * Hacks a bug where haywire would fire on dialog exit.
		     * TODO: Less inline javascript, more Silverlight.
		     */
		    function exit () {
		        setTimeout ( function () {
		            bindingMap.renderingdialogpage.onDialogAccept ();		            
		        }, 0 );
		    }
    </script>

</head>
<body>
    <form id="Form1" runat="server">
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
                                <ui:field>
                                    <ui:fielddesc>Parameter Type</ui:fielddesc>
                                    <ui:fielddata>
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-fisse}"
                                            label="Default" />
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-disbled}"
                                            label="Constant" />
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept-disbled}"
                                            label="Function" />
                                        <ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept}"
                                            label="Input Parameter" />
                                    </ui:fielddata>
                                </ui:field>
                            </ui:fieldgroup>
                            
                            <!-- here -->
                            <asp:Button runat="server" Text="UPDATE SOMETHING" ID="UpdaterButton" OnClick="UpdaterButton_Click" />
                            
                                <asp:PlaceHolder Visible="true" ID="fakedUpdatePanel_OFF" runat="server">
                                    <div id="fakedUpdatePanelZone01">
                                        <!-- nothing yet... -->
                                    </div>
                                </asp:PlaceHolder>
                                <asp:PlaceHolder Visible="false" ID="fakedUpdatePanel_ON" runat="server">
                                    <div id="fakedUpdatePanelZone01" updated="yes">
                                        <ui:fieldgroup>
                                            <ui:field>
                                                <ui:fielddesc>Parameter Value</ui:fielddesc>
                                                <ui:fielddata>
                                                    <ui:datainputselector name="datainputselector1" value="IsFrontpage" type="integer">
                                                        <ui:selection value="2" />
                                                        <ui:selection value="3" />
                                                        <ui:selection value="4" />
                                                        <ui:selection value="5" />
                                                    </ui:datainputselector>
                                                </ui:fielddata>
                                            </ui:field>
                                        </ui:fieldgroup>
                                    </div>
                                </asp:PlaceHolder>
                        </ui:fields>
                    </ui:scrollbox>
                </ui:flexbox>
            </ui:splitpanel>
        </ui:splitbox>
    </ui:page>
    </form>
</body>
</html>
