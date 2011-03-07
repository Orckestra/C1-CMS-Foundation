<%@ Control Language="C#" AutoEventWireup="true" Inherits="CompositeTypeFieldDesigner.TypeFieldDesigner"
    CodeFile="TypeFieldDesigner.ascx.cs" %>
<%@ Register TagPrefix="asphtml" Namespace="System.Web.UI.HtmlControls" Assembly="System.Web" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib"
    Assembly="Composite" %>
<%@ Import Namespace="Composite.Data.DynamicTypes" %>
<%@ Import Namespace="Composite.Functions.ManagedParameters" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.ResourceSystem" %>
<formscontrol:styleloader adminrelativepath="controls/FormsControls/FormUiControlTemplates/DeveloperTools/TypeFieldDesigner.css.aspx"
    runat="server" />
<ui:broadcasterset>
    <ui:broadcaster id="broadcasterInputFieldHasSelection" isdisabled="<%= (this.CurrentlySelectedFieldId == Guid.Empty).ToString().ToLower() %>" />
</ui:broadcasterset>
<div style="display: none" id="clientmessages">
    <asp:PlaceHolder ID="BaloonPlaceHolder" runat="server" />
    <asp:PlaceHolder ID="MakeDirtyEventPlaceHolder" runat="server" Visible="false">
        <ui:binding onattach="this.dispatchAction(Binding.ACTION_DIRTY);" />
    </asp:PlaceHolder>
</div>
<ui:splitbox layout="1:3" orient="horizontal">

	<ui:splitpanel id="typefielddesignerleft">
		<ui:toolbar>
			<ui:toolbarbody>
				<ui:toolbargroup>
					<aspui:ToolbarButton ID="EnterCreateModeButton" runat="server" 
					Text="${Composite.Web.FormControl.TypeFieldDesigner, AddNewButtonLabel}" 
					OnClick="AddNewButton_Click" 
					client_image="${icon:parameter}" />
				</ui:toolbargroup>
				<ui:toolbargroup>
					<aspui:ToolbarButton ID="DeleteButton" runat="server" 
					Text="${Composite.Web.FormControl.TypeFieldDesigner, DeleteButtonLabel}" 
					OnClick="DeleteButton_Click"
					client_image="${icon:delete}" 
					client_image-disabled="${icon:delete-disabled}"
					client_observes="broadcasterInputFieldHasSelection" />
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:tree>
			<ui:treebody id="typefielddesignertreebody">
					<ui:treenode callbackid="folder" label="<%= GetString("LabelDataTypeFields") %>" open="true" image="${icon:<%= (this.HasFields ? "generated-interface-open" : "generated-interface-closed" ) %>}">
                       <asp:Repeater runat="server" ID="FieldListRepeater" OnItemCommand="FieldDataList_ItemCommand">
							<ItemTemplate>
							<aspui:TreeNode ImageUrl="${icon:parameter}" CommandName="Select" runat="server" ID="FieldSelectLinkButton" CommandArgument='<%# Eval("Id") %>' Text='<%# Server.HtmlEncode(((DataFieldDescriptor)Container.DataItem).Name) %>' Focused='<%# ((DataFieldDescriptor)Container.DataItem).Id == this.CurrentlySelectedFieldId %>' /> 
                              </ItemTemplate>
						</asp:Repeater>
					</ui:treenode>
			</ui:treebody>
		</ui:tree>
	</ui:splitpanel>

	<ui:splitter />

	<ui:splitpanel>
		
		<ui:flexbox id="updatemanagerhelperflexbox">
		
				<asp:PlaceHolder ID="DetailsSplitPanelPlaceHolder" runat="server">
					<ui:tabbox>
						<ui:tabs>
							<ui:tab label="<%= GetString("BasicTabLabel") %>" />
							<ui:tab label="<%= GetString("AdvancedTabLabel") %>" />
						</ui:tabs>
						<ui:tabpanels>
							<ui:tabpanel>
								<ui:scrollbox class="padded" forcefitness="true" id="typefielddesignerscrollboxleft">
									<ui:fields id="typefielddesignerfieldsleft">
											<ui:fieldgroup label="<%= GetString("FieldDetailsGroupLabel") %>">
													<ui:field>
														<ui:fielddesc><%= GetString("Name") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("NameHelp") %></ui:fieldhelp>
														<ui:fielddata>
                                                            <!-- <aspui:DataInput  ... InputType="ProgrammingIdentifier" ... /> -->
															<aspui:DataInput ID="NameField" runat="server" InputType="ProgrammingIdentifier" Client_autopost="true"/>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= GetString("Label") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("LabelHelp") %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:DataInput ID="LabelField" runat="server"></aspui:DataInput>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= GetString("Help") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("HelpHelp") %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:DataInput ID="HelpField" runat="server"></aspui:DataInput>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= GetString("Position") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("PositionHelp") %></ui:fieldhelp>
														<ui:fielddata>
																<aspui:Selector ID="PositionField" runat="server" AutoPostBack="True" OnSelectedIndexChanged="PositionField_SelectedIndexChanged" />
														</ui:fielddata>
													</ui:field>
	
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= GetString("FieldTypeGroupLabel") %>">
													<ui:field>
														<ui:fielddesc><%= GetString("FieldType") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("FieldTypeHelp") %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:Selector ID="TypeSelector" runat="server" AutoPostBack="True" OnSelectedIndexChanged="TypeSelector_SelectedIndexChanged">
																<asp:ListItem value="System.String" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.String}" />
																<asp:ListItem value="System.Int32" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Int32}" />
																<asp:ListItem value="System.Decimal" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Decimal}" />
																<asp:ListItem value="System.DateTime" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.DateTime}" />
																<asp:ListItem value="System.Boolean" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Boolean}" />
																<asp:ListItem value="System.Guid" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Guid}" />
																<asp:ListItem value="Reference" Text="${Composite.Web.FormControl.TypeFieldDesigner, Reference}" />
															</aspui:Selector>
														</ui:fielddata>
													</ui:field>
	
													<asp:PlaceHolder ID="TypeDetailsPlaceHolder" runat="server">
														<ui:field>
															<ui:fielddesc>
																<asp:Label id="TypeDetailsLabel" runat="server" />
															</ui:fielddesc>
															<ui:fieldhelp><%= GetString("TypeDetailsHelp") %></ui:fieldhelp>
															<ui:fielddata>
																<aspui:Selector ID="TypeDetailsSelector" runat="server" OnSelectedIndexChanged="TypeDetailsSelector_Reference_SelectedIndexChanged">
																</aspui:Selector>
															</ui:fielddata>
														</ui:field>
													</asp:PlaceHolder>
	
													<asp:PlaceHolder ID="TypeDetailsOptionalPlaceHolder" runat="server">
													    <ui:field>
														    <ui:fielddesc><%= GetString("Optional") %></ui:fielddesc>
														    <ui:fieldhelp><%= GetString("OptionalHelp") %></ui:fieldhelp>
														    <ui:fielddata>
															    <aspui:Selector ID="OptionalSelector" runat="server" AutoPostBack="true" OnSelectedIndexChanged="OptionalSelector_SelectedIndexChanged">
																    <asp:ListItem value="false" Text="${Composite.Web.FormControl.TypeFieldDesigner, OptionalFalseLabel}" />
																    <asp:ListItem value="true" Text="${Composite.Web.FormControl.TypeFieldDesigner, OptionalTrueLabel}" />
															    </aspui:Selector>
														    </ui:fielddata>
													    </ui:field>
                                                    </asp:PlaceHolder>
	
											</ui:fieldgroup>
									</ui:fields>
								</ui:scrollbox>
							</ui:tabpanel>
	
							<ui:tabpanel> 
								<ui:scrollbox class="padded" forcefitness="true">
									<ui:fields id="typefielddesignerfieldsright">
	
											<ui:fieldgroup label="<%= GetString("FieldPresentationGroupLabel") %>">
									                
													<ui:field>
														<ui:fielddesc><%= GetString("Widget") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("WidgetHelp") %></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnWidgetFunctionMarkup" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= GetString("FieldValidationGroupLabel") %>">
													<ui:field>
														<ui:fielddesc><%= GetString("ValidationRules") %></ui:fielddesc>
														<ui:fieldhelp><%= GetString("ValidationRulesHelp")%></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnValidationRulesFunctionMarkup" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= GetString("FieldStructureGroupLabel") %>">
						                                <ui:field>
													<ui:fielddesc><%= GetString("IsTitleField") %></ui:fielddesc>
													<ui:fieldhelp><%= GetString("IsTitleFieldHelp")%></ui:fieldhelp>
													<ui:fielddata>
														<ui:checkboxgroup timestamp="<%= DateTime.Now.Ticks %>">
															<aspui:CheckBox client_callbackid="IsTitleFieldDateTimeSelector" ItemLabel="${Composite.Web.FormControl.TypeFieldDesigner, IsTitleFieldLabel}" ID="IsTitleFieldDateTimeSelector" runat="server" OnCheckChanged="IsTitleFieldDateTimeSelector_OnCheckChanged" />
														</ui:checkboxgroup>
													</ui:fielddata>
												</ui:field>
	
												<ui:field>
													<ui:fielddesc><%= GetString("GroupByPriority") %></ui:fielddesc>
													<ui:fieldhelp><%= GetString("GroupByPriorityHelp")%></ui:fieldhelp>
													<ui:fielddata>
															<aspui:Selector ID="GroupByPriorityField" runat="server" />
													</ui:fielddata>
												</ui:field>
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= GetString("DefaultValueGroupLabel") %>">
									                
													<ui:field>
														<ui:fielddesc><%= GetString("DefaultValue")%></ui:fielddesc>
														<ui:fieldhelp><%= GetString("DefaultValueHelp")%></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnDefaultValueFunctionMarkup" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	
									</ui:fields>
								</ui:scrollbox>
							</ui:tabpanel>
						</ui:tabpanels>
					</ui:tabbox>
	
				</asp:PlaceHolder>
			
		</ui:flexbox>

	</ui:splitpanel>
</ui:splitbox>
