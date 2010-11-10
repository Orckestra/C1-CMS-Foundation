<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Inherits="dmitryfun" Language="C#" AutoEventWireup="true" EnableEventValidation="true" ValidateRequest="true" CodeFile="dmitryfun.aspx.cs" %> <%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders ID="Httpheaders1" runat="server" />
	<head runat="server">
		<title>Composite.Management.Dialogs.Functions.EditFunctionCall</title>
		<control:styleloader ID="Styleloader1" runat="server" />
		<control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
		<asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
		<script type="text/javascript">
		    DataManager.isPostBackFun = true;
			// C1Ajax  - calling Ajax gods :)
		</script>
	</head>
	<body>
		<form id="Form1" runat="server"> 
			<ui:page label="Postback FUN :)">
			
			    <input runat="server" id="Bugaga" />
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbarbutton label="!" />
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:popupset>
					<ui:popup id="xisse">
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
						<ui:tree contextmenu="xisse">
							<ui:treebody>
								<ui:treenode label="Composite.Data.Types.IMediaFolder.GetIMediaFolderXml" image="${icon:functioncall}" open="true">
									<ui:treenode label="Selected fields: Id, Path" image="${icon:parameter_overloaded}" />
									<ui:treenode label="Filter" image="${icon:parameter_overloaded}" open="true">
										<ui:treenode label="Composite.Data.Types.IMediaFolder.FieldPredicateFilter" image="${icon:functioncall}" open="true">
											<ui:treenode label="Id" image="${icon:parameter_overloaded}" open="true">
												<ui:treenode label="Composite.Utils.Predicates.GuidEquals" image="${icon:functioncall}" open="true">
													<ui:treenode label="The value to compare to" image="${icon:parameter_overloaded}" open="true">
														<ui:treenode label="Composite.Web.Request.QueryStringGuidValue" image="${icon:functioncall}" open="true">
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
								<h3>Selected fields</h3>
								<p>&lt;-- List&lt;String&gt;</p>
								<p>Select the fields to include in your XML document, bitch.</p>
								<!-- 
								<ui:fields>
									<ui:fieldgroup>
										<ui:field>
											<ui:fielddesc>Parameter Type</ui:fielddesc>
											<ui:fielddata>
												<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-disbled}" label="Default" />
												<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-disbled}" label="Constant" />
												<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-disbled}" label="Function" />
												<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept}" label="Input Parameter" />
											</ui:fielddata>
										</ui:field>
									</ui:fieldgroup>
								</ui:fields>
								-->
								<ui:fields id="superCoolFields">
									
									<asp:Button runat="server" Text="UPDATE SOMETHING" ID="UpdaterButton" OnClick="UpdaterButton_Click" />
									<h1><asp:Label ID="lblTest" runat="server" /></h1>
									<asp:PlaceHolder Visible="true" ID="fakedUpdatePanel_OFF" runat="server">
										<ui:fieldgroup id="niceFieldGroup" updated="true"/>
									</asp:PlaceHolder>
									<asp:PlaceHolder Visible="false" ID="fakedUpdatePanel_ON" runat="server">
										<ui:fieldgroup id="niceFieldGroup" updated="true">
											<ui:field>
												<ui:fielddesc>Parameter Type</ui:fielddesc>
												<ui:fielddata>
													<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-fisse}" label="Default" />
													<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-disbled}" label="Constant" />
													<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" ximage="${icon:accept-disbled}" label="Function" />
													<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" image="${icon:accept}" label="Input Parameter" />
												</ui:fielddata>
											</ui:field>
										</ui:fieldgroup>
									</asp:PlaceHolder>
								</ui:fields>
								
								<div id="Div1" updated="true">
									<p><%= DateTime.Now %></p>
								    <asp:Calendar runat="server" ID="worldsMostCoolCalendar" />
								</div>
								
							</ui:scrollbox>
						</ui:flexbox>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:page>
		</form>
	</body>
</html>
