<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Inherits="functioneditor" Language="C#" AutoEventWireup="True" EnableEventValidation="true" ValidateRequest="false" CodeFile="functioncalleditor.aspx.cs" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<head runat="server">
		<title>Composite.Management.FunctionCallEditor</title>
        
        <control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
        <control:httpheaders runat="server" />
        
	
		<script type="text/javascript" src="bindings/FunctionEditorPageBinding.js"></script>
		<script type="text/javascript" src="bindings/ToolBarButtonDataBindingAddNew.js"></script>
		<script type="text/javascript" src="bindings/FieldsButtonDataBinding.js"></script>
		
		<ui:bindingmappingset>
			<ui:bindingmapping element="ui:fieldsbutton" binding="FieldsButtonDataBinding"/>
		</ui:bindingmappingset>
		
	</head>
	<body>
		<form id="Form1" runat="server" class="updateform updatezone">
			<ui:page id="functioneditorpage" binding="FunctionEditorPageBinding" class="with-top-toolbar"> <!--  fitasdialogsubpage="false" -->

                <aspui:Feedback runat="server" 
                    ID="ctlFeedback"
                    OnCommand="OnMessage" />

				<ui:decks id="decks">
					<ui:deck id="designdeck">
			
						<ui:toolbar id="toolbar">
							<ui:toolbarbody>
								<ui:toolbargroup id="toolbargroup">
								
                                    <aspui:Generic runat="server" 
			                        	binding="ToolBarButtonDataBindingAddNew"
			                            TagName="ui:toolbarbutton" 
			                            id="btnSetNewFunction"
			                            callbackid="btnSetNewFunction" 
			                            label="${string:Composite.Web.FormControl.FunctionCallsDesigner:SetNewButtonLabel}" 
			                            image="${icon:functioncall}" 
			                            image-disabled="${icon:functioncall}" 
			                            disabled="false" 
			                            value="(not-empty!)"/>

			                        <aspui:Generic runat="server" 
			                        	binding="ToolBarButtonDataBindingAddNew"
			                            TagName="ui:toolbarbutton" 
			                            id="btnAddFunction"
			                            callbackid="btnAddFunction" 
			                            label="${string:Composite.Web.FormControl.FunctionCallsDesigner:AddNewButtonLabel}" 
			                            image="${icon:add}" 
			                            image-disabled="${icon:add}" 
			                            disabled="false" 
			                            value="(not-empty!)"/>
			                            
			                        <aspui:Generic runat="server" 
			                            TagName="ui:toolbarbutton" 
			                            id="btnDeleteFunction" 
			                            callbackid="btnDeleteFunction" 
			                            label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DeleteButtonLabel}" 
			                            image="${icon:delete}" 
			                            image-disabled="${icon:delete-disabled()}" 
			                            disabled="false"/>
			                            
								</ui:toolbargroup>
								<%--<ui:toolbargroup rel="developermode">
									<ui:toolbarbutton 
										image="${icon:systemlog}" 
										label="DEBUG" tootltip="Dump innerHTML to the System Log..." 
										oncommand="this.logger.debug(document.body.innerHTML)" />
								</ui:toolbargroup>--%>
							</ui:toolbarbody>
							
							<ui:toolbarbody align="right">
								<ui:toolbargroup>
									<aspui:Generic runat="server"
                                        TagName="ui:toolbarbutton"
										callbackid="switchbutton"
										callbackarg="source"
									 	clientid="switchbutton"
										image="${icon:editor-sourceview}" 
										image-disabled="${icon:editor-sourceview-disabled}"
										
                                        />
								</ui:toolbargroup>
								<ui:toolbargroup id="basicgroup">
									<ui:toolbarbutton id="basicbutton" image="${icon:editor-plainedit}" />
									</ui:toolbargroup>
							</ui:toolbarbody>
							
							
						</ui:toolbar>
						
						<ui:flexbox id="formsflexbox" style="position:relative;"> <!-- contain the cover -->
						
							<ui:cover id="formscover" hidden="true"/>
								
							<ui:splitbox orient="horizontal" layout="4:5" forcefitness="true">
								<ui:splitpanel id="treepanel" forcefitness="true">
									<asp:PlaceHolder ID="TreePlaceholder" runat="server"/>
								</ui:splitpanel>
								<ui:splitter />
								<ui:splitpanel id="fieldspanel" forcefitness="true">
									<ui:scrollbox id="scrollbox" class="padded-sm">
									
									    <asp:MultiView ID="mlvMain" runat="server">
									      <asp:View ID="viewParameter" runat="server">
									      
											<ui:pagehead id="pagehead">
												<ui:pageheading id="fieldname">
													<asp:Label runat="server" ID="txtFieldName" />
												</ui:pageheading>
												<ui:pagedescription id="fieldtype">
													<span>&#8592;</span> <asp:Label runat="server" ID="txtFieldType" EnableViewState="false" />
												</ui:pagedescription>
												<ui:pagedescription id="fielddesc">
													<asp:Label runat="server" ID="txtFieldDescription"  />
												</ui:pagedescription>
											</ui:pagehead>
									      	
		                                      <ui:fields id="fieldsData" style="padding-bottom: 9px;"> <!-- padding hacks resize problem in dialog :( --> 
		                                     
		                                          <ui:fieldgroup id="optionsfieldgroup" class="options-filedgroup">
		                                              <ui:field>
		                                                  <ui:fielddesc><%= Server.HtmlEncode(GetString("ParameterTypeLabel")) %></ui:fielddesc>
		                                                  <ui:fielddata id="optionsfielddata">
		                                                      <aspui:Generic TagName="ui:fieldsbutton" runat="server" 
		                                                          id="btnDefault" label="${string:Composite.Web.FormControl.FunctionCallsDesigner:ParameterTypeDefaultLabel}" 
		                                                          callbackid="btnDefault"  />
		                                                          
		                                                      <aspui:Generic TagName="ui:fieldsbutton" runat="server" 
		                                                           id="btnConstant" label="${string:Composite.Web.FormControl.FunctionCallsDesigner:ParameterTypeConstantLabel}" callbackid="btnConstant" />
		                                                           
		                                                      <aspui:Generic TagName="ui:fieldsbutton" runat="server" 
		                                                           id="btnInputParameter" label="${string:Composite.Web.FormControl.FunctionCallsDesigner:ParameterTypeInputParameterLabel}" callbackid="btnInputParameter" />
		                                                      
	                                                             <aspui:PostBackDialog runat="server" 
	                                                                   EnableViewState="false"
	                                                                   ID="btnFunctionCall" 
	                                                                   label="${string:Composite.Web.FormControl.FunctionCallsDesigner:ParameterTypeFunctionLabel}" 
	                                                                   callbackid="btnFunctionCall"
	                                                                   handle="Composite.Management.FunctionSelectorDialog" 
	                                                                   binding="ViewDefinitionPostBackDataDialogBinding"/>
		                                                  </ui:fielddata>
		                                              </ui:field>
		                                          </ui:fieldgroup>
		                                          
		                                          <asp:MultiView ID="mlvWidget" runat="server" EnableViewState="true">
		                                          
		                                            <asp:View ID="viewWidget_Constant" runat="server">
			                                            <asp:PlaceHolder runat="server" ID="plhWidget" EnableViewState="true" />                                             
		                                            </asp:View>
		                                            
		                                            <asp:View ID="viewWidget_InputParameter" runat="server">
		                                                
		                                             <ui:fieldgroup id="parameternamefieldgroup" class="width-md">
		                                                 <ui:field>
		            					                    <ui:fielddesc><%= Server.HtmlEncode(GetString("ParameterNameLabel")) %></ui:fielddesc>
		            					                    <ui:fieldhelp></ui:fieldhelp>
		                					                    <ui:fielddata>
		                                                             <aspui:Selector runat="server" EnableViewState="false" 
		                						                    	ID="lstInputParameterName" 
		                						                    	InputType="ProgrammingIdentifier" />
		                					                    </ui:fielddata>
		                				                    </ui:field>
		                                                </ui:fieldgroup>
		                                                
		                                            </asp:View>
		                                          </asp:MultiView>
		                                          
		                                        </ui:fields>
			                                        
			                              </asp:View>
			                              <asp:View ID="viewFunction" runat="server">
			                              	
			                              	<ui:pagehead id="pagehead">
												<ui:pageheading id="fieldname">
													<asp:Label ID="txtFunctionName" runat="server" EnableViewState="false"/>
												</ui:pageheading>
												<ui:pagedescription id="fieldtype">
													<span>&#8592;</span> <asp:Label runat="server" ID="txtFunctionReturnType" EnableViewState="false" />
												</ui:pagedescription>
												<ui:pagedescription id="fielddesc">
													<asp:Label runat="server" ID="txtFunctionDescription" EnableViewState="false"/>
												</ui:pagedescription>
											</ui:pagehead>
			                            
			                                <asp:PlaceHolder id="plhEditLocalName" runat="server">  
			                                     <ui:fields>
			                                             <ui:fieldgroup id="localnamefieldgroup"> <!--  label="<%= Server.HtmlEncode(this.FunctionLocalNameGroupLabel) %>" -->
			                                                <ui:field>
			           					                    <ui:fielddesc><%= Server.HtmlEncode(FunctionLocalNameLabel) %></ui:fielddesc>
			           					                    <ui:fieldhelp><%= Server.HtmlEncode(FunctionLocalNameHelp) %></ui:fieldhelp>
			   		        			                    <ui:fielddata>
			   		        			                    	<!-- InputType="ProgrammingIdentifier" removed, see bug 2698 -->
			           						                    <aspui:DataInput 
			           						                    	ID="txtLocalName" runat="server" 
			           						                    	Client_autopost="true"/>
			       					                         </ui:fielddata>
			       				                       </ui:field>
			                                        </ui:fieldgroup>
			                                      </ui:fields>
			                                 </asp:PlaceHolder>   
			                                
			                              </asp:View>
			                               <asp:View ID="viewNoSelection" runat="server"/>
			                            </asp:MultiView>
									</ui:scrollbox>
								</ui:splitpanel>
							</ui:splitbox>
						</ui:flexbox>
						
					</ui:deck>
					<ui:deck id="sourcedeck" lazy="true">
						<aspui:Generic runat="server"
                            ID="ctlSourceEditor"
                            TagName="ui:sourceeditor"
							clientid="sourceeditor" 
							syntax="xml" 
							validator="http://www.composite.net/ns/function/1.0"
                            HasCallbackId="true" />
					</ui:deck>
				</ui:decks>
					
			</ui:page>

            <asp:HiddenField id="fldMode" runat="server" />
		</form>
	</body>
</html>