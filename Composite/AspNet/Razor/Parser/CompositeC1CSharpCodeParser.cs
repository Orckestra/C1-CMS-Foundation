using System.Web.Razor.Parser;
using System.Web.Razor.Parser.SyntaxTree;
using Composite.AspNet.Razor.Parser.SyntaxTree;

namespace Composite.AspNet.Razor.Parser
{
    internal class CompositeC1CSharpCodeParser : CSharpCodeParser
	{
		public CompositeC1CSharpCodeParser()
		{
			RazorKeywords.Add("returnType", WrapSimpleBlockParser(BlockType.Directive, ParseReturnTypeStatement));
			RazorKeywords.Add("description", WrapSimpleBlockParser(BlockType.Directive, ParseDescriptionStatement));
		}

		public bool ParseDescriptionStatement(CodeBlockInfo block)
		{
			string description = null;
			var currentLocation = CurrentLocation;
			var flag = RequireSingleWhiteSpace();
			var acceptedCharacters = flag ? AcceptedCharacters.None : AcceptedCharacters.Any;

			End(MetaCodeSpan.Create(Context, false, acceptedCharacters));
			Context.AcceptWhiteSpace(false);

			if (ParserHelpers.IsIdentifierStart(CurrentCharacter))
			{
				using (Context.StartTemporaryBuffer())
				{
					Context.AcceptLine(false);
					description = Context.ContentBuffer.ToString();
					Context.AcceptTemporaryBuffer();
				}

				Context.AcceptNewLine();
			}
			else
			{
				OnError(currentLocation, "Description keyword must be followed by a string");
			}

			if (HaveContent || flag)
			{
				End(DescriptionSpan.Create(Context, description));
			}

			return false;
		}

		public bool ParseReturnTypeStatement(CodeBlockInfo block)
		{
			string returnType = null;
			var currentLocation = CurrentLocation;
			var flag = RequireSingleWhiteSpace();
			var acceptedCharacters = flag ? AcceptedCharacters.None : AcceptedCharacters.Any;

			End(MetaCodeSpan.Create(Context, false, acceptedCharacters));
			Context.AcceptWhiteSpace(false);

			if (ParserHelpers.IsIdentifierStart(CurrentCharacter))
			{
				using (Context.StartTemporaryBuffer())
				{
					Context.AcceptLine(false);
					returnType = Context.ContentBuffer.ToString();
					Context.AcceptTemporaryBuffer();
				}

				Context.AcceptNewLine();
			}
			else
			{
				OnError(currentLocation, "ReturnType keyword must be followed by type name");
			}

			if (HaveContent || flag)
			{
				End(ReturnTypeSpan.Create(Context, returnType));
			}

			return false;
		}
	}
}
