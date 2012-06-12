using System.CodeDom;
using System.Web.Razor;
using System.Web.Razor.Generator;
using System.Web.Razor.Parser.SyntaxTree;
using Composite.AspNet.Razor.Parser.SyntaxTree;
using Composite.Functions;

namespace Composite.AspNet.Razor.Parser
{
    internal class CompositeC1CSharpRazorCodeGenerator : CSharpRazorCodeGenerator
	{
		public bool StrictMode { get; private set; }

		public CompositeC1CSharpRazorCodeGenerator(string className, string rootNamespaceName, string sourceFileName, RazorEngineHost host, bool strictMode)
			: base(className, rootNamespaceName, sourceFileName, host)
		{
			StrictMode = strictMode;
		}

		protected override bool TryVisitSpecialSpan(Span span)
		{
			if (TryVisit<ReturnTypeSpan>(span, VisitReturnTypeSpan))
			{
				return true;
			}

			if (TryVisit<DescriptionSpan>(span, VisitDescriptionSpan))
			{
				return true;
			}

			return false;
		}

		public override void VisitError(RazorError err)
		{
			if (StrictMode)
			{
				throw new TemplateParsingException(err);
			}

			base.VisitError(err);
		}

		private void VisitDescriptionSpan(DescriptionSpan span)
		{
			if (DesignTimeMode)
			{
				WriteHelperVariable(span.Description, "__descriptionHelper");
			}

			var attributeType = new CodeTypeReference(typeof(FunctionAttribute));
			var attributeArgument = new CodeAttributeArgument("Description", new CodePrimitiveExpression(span.Description));
			var attr = new CodeAttributeDeclaration(attributeType, new[] { attributeArgument });

			GeneratedClass.CustomAttributes.Add(attr);
		}

		private void VisitReturnTypeSpan(ReturnTypeSpan span)
		{
			if (DesignTimeMode)
			{
				WriteHelperVariable(span.ReturnType, "__returnTypeHelper");
			}

			var attributeType = new CodeTypeReference(typeof(FunctionReturnTypeAttribute));
			var attributeArgument = new CodeAttributeArgument("ReturnType", new CodeTypeOfExpression(span.ReturnType));
			var attr = new CodeAttributeDeclaration(attributeType, new[] { attributeArgument });

			GeneratedClass.CustomAttributes.Add(attr);
		}
	}
}
