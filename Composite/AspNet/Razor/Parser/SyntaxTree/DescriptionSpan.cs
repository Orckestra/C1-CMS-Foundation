using System;
using System.Web.Razor.Parser;
using System.Web.Razor.Parser.SyntaxTree;
using System.Web.Razor.Text;

namespace Composite.AspNet.Razor.Parser.SyntaxTree
{
	internal class DescriptionSpan : CodeSpan
	{
		public string Description { get; private set; }

		public DescriptionSpan(SourceLocation start, string content)
			: base(start, content)
		{
			Description = content.Trim();
		}

		public override int GetHashCode()
		{
			return base.GetHashCode() ^ (Description ?? String.Empty).GetHashCode();
		}

		public override bool Equals(object obj)
		{
			var span = obj as DescriptionSpan;

			return span != null && Equals(span);
		}

		private bool Equals(DescriptionSpan span)
		{
			return base.Equals(span) && String.Equals(Description, span.Description, StringComparison.Ordinal);
		}

		public new static DescriptionSpan Create(ParserContext context, string description)
		{
			return new DescriptionSpan(context.CurrentSpanStart, description);
		}
	}
}
