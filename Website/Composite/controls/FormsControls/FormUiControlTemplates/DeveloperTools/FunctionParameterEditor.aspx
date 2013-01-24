<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Language="C#" AutoEventWireup="true" Inherits="Composite.controls.FormsControls.FormUiControlTemplates.DeveloperTools.FunctionParameterEditor" ValidateRequest="false" CodeFile="FunctionParameterEditor.aspx.cs" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>
<%@ Import Namespace="Composite.Functions.ManagedParameters" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head>
		<title>Composite.Management.FunctionParameterEditor</title>
		<control:styleloader ID="Styleloader1" runat="server" />
		<control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
		<control:httpheaders id="Httpheaders1" runat="server" />
		<link rel="stylesheet" type="text/css" href="FunctionParameterEditor.css.aspx"/>	
	</head>
	<body>
		<form id="Form1" runat="server" class="updateform updatezone">
			<ui:page id="parametereditorpage">
		
				<div style="display:none" id="functionparamdesignerclientmessages">
					<asp:PlaceHolder ID="MessagesPlaceHolder" runat="server" />
					<asp:PlaceHolder ID="MakeDirtyEventPlaceHolder" runat="server" Visible="false">
						<ui:binding onattach="this.dispatchAction(Binding.ACTION_DIRTY);" />
					</asp:PlaceHolder>
				</div>
				
				<aspui:Feedback runat="server" 
                    ID="ctlFeedback"
                    OnCommand="OnMessage" />
				
				<ui:splitbox layout="1:3" orient="horizontal" persist="layout" id="FunctionParameterDesignerSplitbox">
					<ui:splitpanel>
						<ui:toolbar id="treetoolbar">
							<ui:toolbarbody>
								<ui:toolbargroup>
                                
                                    <aspui:Generic runat="server"
                                         ID="btnAddNew"
                                         HasCallbackId="true"
                                         OnServerClick="btnAddNew_Click"

                                         TagName="ui:toolbarbutton"
                                         label="${Composite.Web.FormControl.FunctionParameterDesigner, AddNewButtonLabel}" 
                                         image="${icon:generic-add}"  />

								</ui:toolbargroup>
								<ui:toolbargroup>
									
                                    <aspui:Generic runat="server"
                                         ID="btnDelete"
                                         HasCallbackId="true"
                                         OnServerClick="btnDelete_Click"
                                         TagName="ui:toolbarbutton"
                                         clientid="DeleteButton" 
                                         label="${Composite.Web.FormControl.FunctionParameterDesigner, DeleteButtonLabel}" 
                                         image="${icon:delete}" 
                                         image-disabled="${icon:delete-disabled()}" />

								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:tree>
							<ui:treebody id="functionparamdesignertreebody">
								<ui:treenode label="<%=GetString("TreeRootNodeLabel") %>" open="true" image="${icon:<%= (this.HasFields ? "folder_active" : "folder" ) %>}">
									<asp:Repeater runat="server" ID="FieldListRepeater" OnItemCommand="FieldDataList_ItemCommand">
										<ItemTemplate>
											<aspui:TreeNode ImageUrl="${icon:parameter}" CommandName="Select" runat="server" ID="FieldSelectLinkButton" CommandArgument='<%# Eval("Id") %>' Text='<%# Server.HtmlEncode(((ManagedParameterDefinition)Container.DataItem).Name) %>' Focused='<%# ((ManagedParameterDefinition)Container.DataItem).Id == this.CurrentlySelectedFieldId%>' OnClientClick="bindingMap.broadcasterInputFieldHasSelection.enable()" />
										</ItemTemplate>
									</asp:Repeater>
								</ui:treenode>
							</ui:treebody>
						</ui:tree>
					</ui:splitpanel>
				
					<ui:splitter />
				
					<ui:splitpanel>
				        <ui:scrollbox class="padded" id="funtionparamdesignerfields">
					        <asp:PlaceHolder ID="DetailsSplitPanelPlaceHolder" runat="server">
						        <ui:fields>
					                <ui:fieldgroup label="<%=GetString("ParameterNamingGroupLabel") %>">
					                    <ui:field>
						                    <ui:fielddesc><%= GetString("Name") %></ui:fielddesc>
						                    <ui:fieldhelp><%= GetString("NameHelp") %></ui:fieldhelp>
						                    <ui:fielddata>
							                    <aspui:DataInput ID="NameField" runat="server" InputType="ProgrammingIdentifier" client_autopost="true" />
						                    </ui:fielddata>
					                    </ui:field>
				
					                    <ui:field>
						                    <ui:fielddesc><%= GetString("Label") %></ui:fielddesc>
						                    <ui:fieldhelp><%= GetString("LabelHelp")%></ui:fieldhelp>
						                    <ui:fielddata>
						                        <aspui:DataInput ID="LabelField" runat="server"></aspui:DataInput>
						                    </ui:fielddata>
					                    </ui:field>
				
					                    <ui:field>
						                    <ui:fielddesc><%= GetString("Help") %></ui:fielddesc>
						                    <ui:fieldhelp><%= GetString("HelpHelp")%></ui:fieldhelp>
						                    <ui:fielddata>
                                                <aspui:TextArea ID="HelpField" runat="server" />
						                    </ui:fielddata>
					                    </ui:field>
					                </ui:fieldgroup>
				
					                <ui:fieldgroup label="<%=GetString("ParameterTypeValueGroupLabel") %>">
					                    <ui:field>
						                    <ui:fielddesc><%= GetString("Type") %></ui:fielddesc>
						                    <ui:fieldhelp><%= GetString("TypeHelp")%></ui:fieldhelp>
						                    <ui:fielddata>
							                    <aspui:Selector ID="TypeSelector" runat="server" AutoPostBack="True" OnSelectedIndexChanged="TypeSelector_SelectedIndexChanged">
							                    </aspui:Selector>
						                    </ui:fielddata>
					                    </ui:field>
		
			                            <ui:field>
				                            <ui:fielddesc><%= GetString("DefaultValue") %></ui:fielddesc>
				                            <ui:fieldhelp><%= GetString("DefaultValueHelp")%></ui:fieldhelp>
			                                <ui:fielddata>
                                                <aspui:PostBackDialog runat="server" ID="btnDefaultValueFunctionMarkup" EncodeValue="True" />
			                                </ui:fielddata>
			                            </ui:field>
		
			                            <ui:field>
				                            <ui:fielddesc><%= GetString("TestValue") %></ui:fielddesc>
				                            <ui:fieldhelp><%= GetString("TestValueHelp")%></ui:fieldhelp>
			                                <ui:fielddata>
                                                <aspui:PostBackDialog runat="server" ID="btnTestValueFunctionMarkup" EncodeValue="True" />
			                                </ui:fielddata>
			                            </ui:field>
				
					                </ui:fieldgroup>
				
					                <ui:fieldgroup label="<%=GetString("ParameterPresentationGroupLabel") %>">
				                        <ui:field>
				                            <ui:fielddesc><%= GetString("Widget") %></ui:fielddesc>
				                            <ui:fieldhelp><%= GetString("WidgetHelp")%></ui:fieldhelp>
				                            <ui:fielddata>
                                                <aspui:PostBackDialog runat="server" ID="btnWidgetFunctionMarkup" EncodeValue="True" />
				                            </ui:fielddata>
				                        </ui:field>
				
					                    <ui:field>
				                            <ui:fielddesc><%= GetString("Position") %></ui:fielddesc>
				                            <ui:fieldhelp><%= GetString("PositionHelp")%></ui:fieldhelp>
						                    <ui:fielddata>
				    		                    <aspui:Selector ID="PositionField" runat="server" AutoPostBack="True" OnSelectedIndexChanged="PositionField_SelectedIndexChanged" />
						                    </ui:fielddata>
					                    </ui:field>
				
					                </ui:fieldgroup>
					            </ui:fields>
					        </asp:PlaceHolder>
				        </ui:scrollbox>        
					</ui:splitpanel>
				</ui:splitbox>
				
			</ui:page>
		</form>
	</body>
</html>
