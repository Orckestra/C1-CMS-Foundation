<%@ Page Async="true" Language="C#" Debug="true" AutoEventWireup="true" CodeFile="resxeditor.aspx.cs" Inherits="ResxEditor" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<link rel="stylesheet" type="text/css" href="resxeditor.css.aspx" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:600,400" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="bindings/RowContainerBinding.js"></script>
	<script type="text/javascript" src="bindings/ResxEditorPageBinding.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
</head>
<body>
	<form runat="server" class="updateform updatezone">
		<ui:page label="<%# PageTitle%>" image="${icon:page-list-unpublished-items}">
			<ui:toolbar id="toolbar">
				<ui:toolbarbody>
					<aspui:selector runat="server" id="CultureSelector" OnSelectedIndexChanged="Culture_OnSelectedIndexChanged" autopostback="True" />
						<aspui:ToolbarButton id="SaveButton" ImageUrl="${icon:save}" ImageUrlWhenDisabled="${icon:save-disabled}" label="Save" 
							text="Save"
							oncommand="Save"
							runat="server"
							Enabled="False"/>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:pagebody>
				<ui:scrollbox id="scrollbox">
					<table class="table">
						<asp:Repeater ID="DataRepeater" runat="server" >
							<HeaderTemplate>
								<thead>
									<tr class="head">
										<th>
											Label 
										</th>
										<th>
											English Text 
										</th>
										<% if (OtherCultureExist)
											{ %>
											<th>
												Translated Text
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
												<td>
													<aspui:TextBox ID="Original" Width="400px" runat="server" Text='<%#Eval("Original") %>' onkeyup="enable(this)" AutoPostBack="True" ReadOnly="<%#OtherCultureExist==true%>"></aspui:TextBox>
												</td>
												<% if (OtherCultureExist){ %>
													<td>
														<aspui:TextBox ID="Translated" Width="400px" runat="server" Text='<%#Eval("Translated") %>' onkeyup="enable(this)" AutoPostBack="True"></aspui:TextBox>
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
		</ui:page>

	</form>

</body>
	<script>
		function enable(selectObj) {
			__doPostBack('<%= Page.ClientID %>', selectObj.name);
		}
	</script>
</html>
