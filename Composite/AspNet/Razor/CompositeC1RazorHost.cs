using System.Web.Razor.Generator;
using System.Web.Razor.Parser;
using System.Web.WebPages.Razor;
using Composite.AspNet.Razor.Parser;

namespace Composite.AspNet.Razor
{
    internal class CompositeC1RazorHost : WebPageRazorHost
	{
		public CompositeC1RazorHost(string virtualPath, string physicalPath)
			: base(virtualPath, physicalPath)
		{
			DefaultPageBaseClass = typeof(CompositeC1WebPage).FullName;
		}

		public override RazorCodeGenerator DecorateCodeGenerator(RazorCodeGenerator incomingCodeGenerator)
		{
			if (incomingCodeGenerator is CSharpRazorCodeGenerator)
			{
				return new CompositeC1CSharpRazorCodeGenerator(incomingCodeGenerator.ClassName,
													   incomingCodeGenerator.RootNamespaceName,
													   incomingCodeGenerator.SourceFileName,
													   incomingCodeGenerator.Host, false);
			}

			return base.DecorateCodeGenerator(incomingCodeGenerator);
		}

		public override ParserBase DecorateCodeParser(ParserBase incomingCodeParser)
		{
			if (incomingCodeParser is CSharpCodeParser)
			{
				return new CompositeC1CSharpCodeParser();
			}

			return base.DecorateCodeParser(incomingCodeParser);
		}
	}
}
