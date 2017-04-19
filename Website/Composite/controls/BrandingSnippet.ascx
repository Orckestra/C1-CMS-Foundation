<%@ Control Language="C#" AutoEventWireup="true" %>
<script runat="server">
	const string contentdHolderFileUrlTemplate = "../content/branding/{0}{1}.inc";
	public string SnippetName { get; set; }

	protected void Page_Init(object sender, EventArgs e)
	{
		var snippetFileUrl = string.Format(contentdHolderFileUrlTemplate, SnippetName, string.Empty);
		var snippentBrandedFileUrl = string.Format(contentdHolderFileUrlTemplate, SnippetName, "-branded");
		var brandedContent = string.Empty;
		if(Composite.Core.IO.C1File.Exists(this.MapPath(snippentBrandedFileUrl)))
		{
			brandedContent = Composite.Core.IO.C1File.ReadAllText(this.MapPath(snippentBrandedFileUrl));
		}
		contentHolder.Text = !string.IsNullOrEmpty(brandedContent) ? brandedContent :Composite.Core.IO.C1File.ReadAllText(this.MapPath(snippetFileUrl));
	}

</script>
<asp:Literal ID="contentHolder" runat="server"></asp:Literal>