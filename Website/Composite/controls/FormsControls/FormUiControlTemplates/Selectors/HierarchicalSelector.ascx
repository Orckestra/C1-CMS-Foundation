<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.HierarchicalSelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.C1Console.Forms.CoreUiControls" %>
<%@ Import Namespace="Composite.Core.Extensions" %>
<%@ Import Namespace="Composite.Core.Types" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>

<script runat="server">
	protected override void InitializeViewState()
	{

	}


	protected override void BindStateToProperties()
	{
		var result = new List<object>();

		string postedValue = Request.Form[this.ClientID];
		if (!string.IsNullOrEmpty(postedValue))
		{
			result.AddRange(postedValue.Split(','));
		}
		this.SelectedKeys = result;


	}


	public override string GetDataFieldClientName()
	{
		return this.ClientID;
	}

	private string _treeXhml;

	protected override void OnPreRender(EventArgs args)
	{
		var sb = new StringBuilder();

		foreach (var node in TreeNodes)
		{
			RenderTree(sb, node);
		}

		_treeXhml = sb.ToString();
	}

	private void RenderTree(StringBuilder sb, SelectionTreeNode treeNode)
	{
		sb.Append(string.Format("<ui:selection label=\"{0}\"", Server.HtmlEncode(treeNode.Label)));
		if (treeNode.Key != null)
		{
			sb.AppendFormat(" value=\"{0}\"", Server.HtmlEncode(ValueTypeConverter.Convert<string>(treeNode.Key)));

			if (SelectedKeys.Contains(treeNode.Key))
			{
				sb.AppendFormat(" selected=\"true\"");
			}

			if (treeNode.Selectable)
			{
				sb.AppendFormat(" selectable=\"true\"");
			}
		}

		if (!treeNode.Icon.IsNullOrEmpty())
		{
			sb.AppendFormat(" image=\"{0}\"", treeNode.Icon);
		}

		if (treeNode.Readonly)
		{
			sb.AppendFormat(" readonly=\"true\"");
		}

		if (treeNode.Children == null || !treeNode.Children.Any())
		{
			sb.AppendLine("/>");
		}
		else
		{
			sb.AppendLine(">");

			foreach (var child in treeNode.Children)
			{
				RenderTree(sb, child);
			}

			sb.AppendLine("</ui:selection>");
		}
	}
</script>


<ui:hierarchicalselector name="<%= this.ClientID %>"
	 required="<%= Required ? "true" : "false" %>"
	 autoselectchildren="<%= AutoSelectChildren ? "true" : "false" %>">
	<%= _treeXhml %>
</ui:hierarchicalselector>
