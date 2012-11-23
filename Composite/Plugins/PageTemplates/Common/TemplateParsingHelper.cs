using System;
using System.Text;
using Composite.Core.Extensions;
using Composite.Core.IO;

namespace Composite.Plugins.PageTemplates.Common
{
    internal static class TemplateParsingHelper
    {
        public static bool TryExtractTemplateIdFromCSharpCode(string filePath, out Guid templateId, string idTokenBegin, string idTokenEnd)
        {
            templateId = Guid.Empty;

            if (!C1File.Exists(filePath)) return false;

            var allText = C1File.ReadAllText(filePath, Encoding.UTF8);

            allText = RemoveWhiteSpaces(allText);

            string beginning = RemoveWhiteSpaces(idTokenBegin);
            string ending = RemoveWhiteSpaces(idTokenEnd);

            int firstIndex = allText.IndexOf(beginning, StringComparison.Ordinal);
            if (firstIndex < 0) return false;

            int lastIndex = allText.LastIndexOf(beginning, StringComparison.Ordinal);
            if (lastIndex != firstIndex) return false;

            int endOffset = allText.IndexOf(ending, firstIndex, StringComparison.Ordinal);
            if (endOffset < 0) return false;

            int guidOffset = firstIndex + beginning.Length;
            string guidStr = allText.Substring(guidOffset, endOffset - guidOffset);

            return Guid.TryParse(guidStr, out templateId);
        }


        private static string RemoveWhiteSpaces(string str)
        {
            var whiteSpaces = new[] { ' ', '\t', '\r', '\n' };

            whiteSpaces.ForEach(ch => str = str.Replace(new string(ch, 1), ""));

            return str;
        }
    }
}
