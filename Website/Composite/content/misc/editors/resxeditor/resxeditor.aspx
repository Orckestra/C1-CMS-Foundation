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
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
</head>
<body>
	<form runat="server" class="updateform updatezone">
		<ui:editorpage label="<%= PageTitle%>" image="${icon:page-list-unpublished-items}">
			<ui:toolbar id="toolbar" class="document-toolbar">
				<ui:toolbarbody>
					<aspui:toolbarbutton id="SaveButton" imageurl="${icon:save}" imageurlwhendisabled="${icon:save-disabled}" label="Save"
						text="${string:Composite.Web.SourceEditor:ResxEditor.Save}"
						oncommand="Save"
						runat="server"
						enabled="False" />
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:pagebody>
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
										<asp:Label ID="Label" runat="server" Text='<%#Eval("Label") %>'></asp:Label>
									</td>
									<% if (!OtherCultureExist)
										{ %>
									<td>
										<aspui:textbox cssclass="inputs" id="Original" width="400px" runat="server" text='<%#Eval("Original") %>' onkeyup="enable(this)" autopostback="True"></aspui:textbox>
									</td>
									<% } %>
									<% if (OtherCultureExist)
										{ %>
									<td>
										<asp:Label ID="Original2" Width="400px" runat="server" CssClass="label" Text='<%#Eval("Original") %>'></asp:Label>
									</td>
									<td>
										<aspui:textbox cssclass="inputs" id="Translated" width="400px" runat="server" text='<%#Eval("Translated") %>' onkeyup="enable(this)" autopostback="True"></aspui:textbox>
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

			</ui:pagebody>
		</ui:editorpage>

	</form>

</body>
<script>
	function enable(selectObj) {
		__doPostBack('<%= Page.ClientID %>', selectObj.name);
	}
	$('.inputs').keydown(function (e) {
		if (e.which === 13) {
			var index = $('.inputs').index(this) + 1;
			$('.inputs').eq(index).focus().select();
		}
	});
</script>
</html>
