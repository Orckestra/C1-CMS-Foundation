<%@ Control Language="C#" AutoEventWireup="True" Inherits="CompositeTypeFieldDesigner.TypeFieldDesigner"
    CodeFile="TypeFieldDesigner.ascx.cs" %>
<%@ Import Namespace="Composite.Data.DynamicTypes" %>
<%@ Import namespace="Texts=Composite.Core.ResourceSystem.LocalizationFiles.Composite_Web_FormControl_TypeFieldDesigner" %>

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
					<ui:treenode callbackid="folder" label="<%= Texts.LabelDataTypeFields %>" open="true" image="${icon:<%= (this.HasFields ? "data-interface-open" : "data-interface-closed" ) %>}">
                       <asp:Repeater runat="server" ID="FieldListRepeater" OnItemCommand="FieldDataList_ItemCommand">
							<ItemTemplate>
							<aspui:TreeNode runat="server" ID="FieldSelectLinkButton" CommandName="Select" 
                                ImageUrl='<%# GetTreeIcon((DataFieldDescriptor)Container.DataItem) %>'
                                CommandArgument='<%# Eval("Id") %>' 
                                Text='<%# Server.HtmlEncode(((DataFieldDescriptor)Container.DataItem).Name) %>' 
                                Focused='<%# ((DataFieldDescriptor)Container.DataItem).Id == this.CurrentlySelectedFieldId %>' /> 
                              </ItemTemplate>
                           
                           <%--ImageUrl="<%# GetTreeIcon((DataFieldDescriptor)Container.DataItem) %>"--%>
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
							<ui:tab label="<%= Texts.BasicTabLabel %>" />
							<ui:tab label="<%= Texts.AdvancedTabLabel %>" />
						</ui:tabs>
						<ui:tabpanels>
							<ui:tabpanel>
								<ui:scrollbox class="padded" forcefitness="true" id="typefielddesignerscrollboxleft">
									<ui:fields id="typefielddesignerfieldsleft">
									    
                                            <asp:PlaceHolder runat="server" Visible="<%# SelectedFieldIsKeyField %>" ID="plhKeyFieldProperties">
                                                
                                                 <ui:fieldgroup label="<%= Texts.KeyFieldDetailsGroupLabel %>">
                                                     
                                                    <ui:field>
														<ui:fielddesc><%= Texts.Name %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.NameHelp %></ui:fieldhelp>
														<ui:fielddata>
                                                            <!-- <aspui:DataInput  ... InputType="ProgrammingIdentifier" ... /> -->
															<aspui:DataInput ID="txtKeyFieldName" runat="server" InputType="ProgrammingIdentifier" Client_autopost="true"/>
														</ui:fielddata>
													</ui:field>

                                                     <ui:field>
														<ui:fielddesc><%= Texts.KeyFieldType %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.KeyFieldTypeHelp %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:Selector ID="lstKeyType" runat="server">
															</aspui:Selector>
														</ui:fielddata>
													</ui:field>

                                                  </ui:fieldgroup>
                                            </asp:PlaceHolder>
                                        
                                        <asp:PlaceHolder runat="server" Visible="<%# !SelectedFieldIsKeyField %>" ID="plhFieldProperties">
											<ui:fieldgroup label="<%= Texts.FieldDetailsGroupLabel %>">
													<ui:field>
														<ui:fielddesc><%= Texts.Name %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.NameHelp %></ui:fieldhelp>
														<ui:fielddata>
                                                            <!-- <aspui:DataInput  ... InputType="ProgrammingIdentifier" ... /> -->
															<aspui:DataInput ID="NameField" runat="server" InputType="ProgrammingIdentifier" Client_autopost="true"/>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= Texts.Label %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.LabelHelp %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:DataInput ID="LabelField" runat="server"></aspui:DataInput>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= Texts.Help %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.HelpHelp %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:DataInput ID="HelpField" runat="server"></aspui:DataInput>
														</ui:fielddata>
													</ui:field>
	
													<ui:field>
														<ui:fielddesc><%= Texts.Position %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.PositionHelp %></ui:fieldhelp>
														<ui:fielddata>
																<aspui:Selector ID="PositionField" runat="server" AutoPostBack="True" OnSelectedIndexChanged="PositionField_SelectedIndexChanged" />
														</ui:fielddata>
													</ui:field>
	
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= Texts.FieldTypeGroupLabel %>">
													<ui:field>
														<ui:fielddesc><%= Texts.FieldType %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.FieldTypeHelp %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:Selector ID="TypeSelector" runat="server" AutoPostBack="True" OnSelectedIndexChanged="TypeSelector_SelectedIndexChanged">
																<asp:ListItem value="System.String" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.String}" />
																<asp:ListItem value="XHTML" Text="XHTML" />
																<asp:ListItem value="Reference" Text="${Composite.Web.FormControl.TypeFieldDesigner, Reference}" />
																<asp:ListItem value="System.Boolean" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Boolean}" />
																<asp:ListItem value="System.DateTime" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.DateTime}" />
																<asp:ListItem value="System.Int32" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Int32}" />
																<asp:ListItem value="System.Decimal" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Decimal}" />
																<asp:ListItem value="System.Guid" Text="${Composite.Web.FormControl.TypeFieldDesigner, System.Guid}" />
															</aspui:Selector>
														</ui:fielddata>
													</ui:field>
	
													<asp:PlaceHolder ID="TypeDetailsPlaceHolder" runat="server">
														<ui:field>
															<ui:fielddesc>
																<asp:Label id="TypeDetailsLabel" runat="server" />
															</ui:fielddesc>
															<ui:fieldhelp><%= Texts.TypeDetailsHelp %></ui:fieldhelp>
															<ui:fielddata>
																<aspui:Selector ID="TypeDetailsSelector" runat="server" OnSelectedIndexChanged="TypeDetailsSelector_Reference_SelectedIndexChanged">
																</aspui:Selector>
															</ui:fielddata>
														</ui:field>
													</asp:PlaceHolder>
	
													<asp:PlaceHolder ID="TypeDetailsOptionalPlaceHolder" runat="server">
													    <ui:field>
														    <ui:fielddesc><%= Texts.Optional %></ui:fielddesc>
														    <ui:fieldhelp><%= Texts.OptionalHelp %></ui:fieldhelp>
														    <ui:fielddata>
															    <aspui:Selector ID="OptionalSelector" runat="server" AutoPostBack="true" OnSelectedIndexChanged="OptionalSelector_SelectedIndexChanged">
																    <asp:ListItem value="false" Text="${Composite.Web.FormControl.TypeFieldDesigner, OptionalFalseLabel}" />
																    <asp:ListItem value="true" Text="${Composite.Web.FormControl.TypeFieldDesigner, OptionalTrueLabel}" />
															    </aspui:Selector>
														    </ui:fielddata>
													    </ui:field>
                                                    </asp:PlaceHolder>
	
											</ui:fieldgroup>
                                        </asp:PlaceHolder>
									</ui:fields>
								</ui:scrollbox>
							</ui:tabpanel>
	
							<ui:tabpanel> 
								<ui:scrollbox class="padded" forcefitness="true">
									<ui:fields id="typefielddesignerfieldsright">
	
                                        <asp:PlaceHolder runat="server" Visible="<%# !SelectedFieldIsKeyField %>" ID="plhAdvancedFieldProperties">

											<ui:fieldgroup label="<%= Texts.FieldPresentationGroupLabel %>">
									                
													<ui:field>
														<ui:fielddesc><%= Texts.Widget %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.WidgetHelp %></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnWidgetFunctionMarkup" EncodeValue="True" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= Texts.FieldValidationGroupLabel %>">
													<ui:field>
														<ui:fielddesc><%= Texts.ValidationRules %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.ValidationRulesHelp %></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnValidationRulesFunctionMarkup" EncodeValue="True" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= Texts.FieldStructureGroupLabel %>">
						                        <ui:field>
													<ui:fielddesc><%= Texts.IsTitleField %></ui:fielddesc>
													<ui:fieldhelp><%= Texts.IsTitleFieldHelp %></ui:fieldhelp>
													<ui:fielddata>
														<ui:checkboxgroup timestamp="<%= DateTime.Now.Ticks %>">
															<aspui:CheckBox client_callbackid="IsTitleFieldDateTimeSelector" ItemLabel="${Composite.Web.FormControl.TypeFieldDesigner, IsTitleFieldLabel}" ID="IsTitleFieldDateTimeSelector" runat="server" OnCheckChanged="IsTitleFieldDateTimeSelector_OnCheckChanged" />
														</ui:checkboxgroup>
													</ui:fielddata>
												</ui:field>
	
												<ui:field>
													<ui:fielddesc><%= Texts.TreeOrdering %></ui:fielddesc>
													<ui:fieldhelp><%= Texts.TreeOrderingHelp %></ui:fieldhelp>
													<ui:fielddata>
															<aspui:Selector ID="TreeOrderingField" runat="server" />
													</ui:fielddata>
												</ui:field>

												<ui:field>
													<ui:fielddesc><%= Texts.GroupByPriority %></ui:fielddesc>
													<ui:fieldhelp><%= Texts.GroupByPriorityHelp %></ui:fieldhelp>
													<ui:fielddata>
															<aspui:Selector ID="GroupByPriorityField" runat="server" />
													</ui:fielddata>
												</ui:field>

											</ui:fieldgroup>
	
											<ui:fieldgroup label="<%= Texts.DefaultValueGroupLabel %>">
									                
													<ui:field>
														<ui:fielddesc><%= Texts.DefaultValue %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.DefaultValueHelp %></ui:fieldhelp>
														<ui:fielddata>
                                                            <aspui:PostBackDialog runat="server" ID="btnDefaultValueFunctionMarkup" EncodeValue="True" />
														</ui:fielddata>
													</ui:field>
											</ui:fieldgroup>
	                                    </asp:PlaceHolder>
                                        
                                        <asp:PlaceHolder runat="server" ID="plhDataUrl">
                                            <ui:fieldgroup label="<%= Texts.DataUrlGroupLabel %>">
                                            	<ui:field>
													<ui:fielddesc><%= Texts.AppearsInUrlLabel %></ui:fielddesc>
													<ui:fieldhelp><%= Texts.AppearsInUrlHelp %></ui:fieldhelp>
													<ui:fielddata>
														<ui:checkboxgroup timestamp="<%= DateTime.Now.Ticks %>">
															<aspui:CheckBox ID="chkShowInDataUrl" runat="server" AutoPostBack="True"
                                                                ItemLabel="<%# Texts.AppearsInUrlItemLabel %>" />
														</ui:checkboxgroup>
													</ui:fielddata>
												</ui:field>
                                                
                                                <asp:PlaceHolder runat="server" Visible="<%# chkShowInDataUrl.Checked %>">
                                                    <ui:field>
														<ui:fielddesc><%= Texts.DataUrlOrderLabel %></ui:fielddesc>
														<ui:fieldhelp><%= Texts.DataUrlOrderHelp %></ui:fieldhelp>
														<ui:fielddata>
															<aspui:Selector ID="lstDataUrlOrder" runat="server" AutoPostBack="True">

															</aspui:Selector>
														</ui:fielddata>
													</ui:field>
                                                    
                                                    <asp:PlaceHolder runat="server" Visible="<%# SelectedField != null && SelectedField.InstanceType == typeof(DateTime) %>">
                                                        <ui:field>
														    <ui:fielddesc><%= Texts.DataUrlDateFormatLabel%></ui:fielddesc>
														    <ui:fieldhelp><%= Texts.DataUrlDateFormatHelp %></ui:fieldhelp>
														    <ui:fielddata>
															    <aspui:Selector ID="lstDataUrlDateFormat" runat="server" AutoPostBack="True">

															    </aspui:Selector>
														    </ui:fielddata>
													    </ui:field>
                                                    </asp:PlaceHolder>
                                                </asp:PlaceHolder>
                                            </ui:fieldgroup>
                                        </asp:PlaceHolder>
									</ui:fields>
								</ui:scrollbox>
							</ui:tabpanel>
						</ui:tabpanels>
					</ui:tabbox>
	
				</asp:PlaceHolder>
			
		</ui:flexbox>

	</ui:splitpanel>
</ui:splitbox>
