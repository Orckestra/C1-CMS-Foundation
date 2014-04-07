<%@ Page Language="C#" AutoEventWireup="true" %>

<script runat="server">
	public string Path { get; set; }

	protected void Page_Load(object sender, EventArgs e)
	{
		switch (Request["__EVENTTARGET"])
		{
			case "style1":
				Path = "${root}/content/views/dev/developer/tests/ui/style1.css";
				this.pStyle.Visible = true;
				break;
			case "style2":
				Path = "${root}/content/views/dev/developer/tests/ui/style2.css";
				this.pStyle.Visible = true;
				break;
			default:
				this.pStyle.Visible = false;
				break;
		}
	}
</script>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<control:httpheaders runat="server" />
<head>
	<title>Composite.Management.Test.DataInputs</title>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />


</head>
<body>
	<form runat="server" class="updateform updatezone">

		<ui:editorpage label="Checkboxes">
			<ui:broadcasterset>
				<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
			</ui:broadcasterset>
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton
							oncommand="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)"
							id="clear"
							image="${icon:cleanup}"
							callbackid="clear"
							label="Clear" />
						<ui:toolbarbutton
							oncommand="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)"
							id="style1"
							image="${icon:parameter_missing}"
							callbackid="style1"
							label="Style 1" />
						<ui:toolbarbutton
							oncommand="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)"
							id="style2"
							image="${icon:media-download-file}"
							callbackid="style2"
							label="Style 2" />

					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>

			<ui:scrollbox class="padded">
				<div id="styles">
					<asp:PlaceHolder ID="pStyle" runat="server">
						<ui:stylesheet id="stylebinding" binding="StyleBinding" link="<%=Path%>" />
					</asp:PlaceHolder>
				</div>
				<ui:fields>
					<ui:fieldgroup label="Johnson">
						<ui:field>
							<ui:fielddata>
								<ui:datainput name="john1" value="John!" />
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddata>
								<ui:datainput name="john2" value="John!" />
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddata>
								<ui:datainput name="john3" value="John!" />
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:scrollbox>
		</ui:editorpage>
	</form>
</body>
</html>
