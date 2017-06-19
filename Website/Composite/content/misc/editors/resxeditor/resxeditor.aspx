<%@ Page Async="true" Language="C#" Debug="true" AutoEventWireup="true" CodeFile="resxeditor.aspx.cs" Inherits="ResxEditor" %>

<%@ Import Namespace="Composite.Core.ResourceSystem" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<link rel="stylesheet" type="text/css" href="resxeditor.css.aspx" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:600,400" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="bindings/RowContainerBinding.js"></script>
</head>
<body>
	<form runat="server" class="updateform updatezone">
		 
		<ui:editorpage label="<%= PageTitle%>" image="${icon:page-list-unpublished-items}">
			<aspui:Feedback runat="server"
                    ID="ctlFeedback"
                    OnCommand="OnMessage" />
			<ui:broadcasterset>
				<ui:broadcaster id="broadcasterCanSave" isdisabled="true"/>
			</ui:broadcasterset> 
			<ui:toolbar id="toolbar" class="document-toolbar">
				<ui:toolbarbody>
					<ui:toolbarbutton
						oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE)"
						id="savebutton"
						image="${icon:save}"
						image-disabled="${icon:save-disabled}"
						label="${string:Composite.Web.SourceEditor:ResxEditor.Save}"
						observes="broadcasterCanSave"/>
				</ui:toolbarbody>
			</ui:toolbar>
				<ui:scrollbox id="scrollbox">
					<table class="table">
						<asp:Repeater ID="DataRepeater" runat="server">
							<HeaderTemplate>
								<thead>
									<tr class="head">
										<th>
											<%= LocalizationFiles.Composite_Web_SourceEditor.ResxEditor_Label %> 
										</th>
										<th>
											<%= LocalizationFiles.Composite_Web_SourceEditor.ResxEditor_OriginalText %> 
										</th>
										<% if (OtherCultureExist)
											{ %>
										<th>
											<%= LocalizationFiles.Composite_Web_SourceEditor.ResxEditor_TranslatedText %> 
										</th>
										<% } %>
										<th></th>
									</tr>
								</thead>
								<tbody id="tbody" binding="RowContainerBinding">
							</HeaderTemplate>
							<ItemTemplate>
								<tr>
									<td>
										<asp:Label ID="Label" runat="server" Text='<%#Eval("Label") %>' />
									</td>
									<% if (!OtherCultureExist)
										{ %>
									<td>
										<div class="inputbox">
											<aspui:DataInput id="Original" runat="server" text='<%#Eval("Original") %>' />
										</div>
									</td>
									<% } %>
									<% if (OtherCultureExist)
										{ %>
									<td>
										<div class="label">
											<asp:Label ID="Original2" runat="server" Text='<%#Eval("Original") %>' />
										</div>
									</td>
									<td>
										<div class="inputbox">
											<aspui:DataInput id="Translated" runat="server" text='<%#Eval("Translated") %>' />
										</div>
									</td>
									<% } %>
									<td></td>
								</tr>
							</ItemTemplate>
							<FooterTemplate>
								</tbody>

							</FooterTemplate>
						</asp:Repeater>
					</table>
				</ui:scrollbox>
		</ui:editorpage>

	</form>

</body>

</html>
