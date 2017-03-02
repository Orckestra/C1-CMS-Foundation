using System;
using System.IO;

namespace Composite.AspNet.Roslyn
{
    internal static class CompilationUtil
    {
        internal static string RemoveAllQuotes(string arg)
        {
            return arg?.Replace("\"", "");
        }

        internal static string RemoveTrailingSpacesAndDots(string path)
        {
            if (path == null)
            {
                return path;
            }
            int length = path.Length;
            int i = length - 1;
            while (i >= 0)
            {
                char c = path[i];
                if (!char.IsWhiteSpace(c) && c != '.')
                {
                    if (i != length - 1)
                    {
                        return path.Substring(0, i + 1);
                    }
                    return path;
                }

                i--;
            }
            return string.Empty;
        }

        internal static void ParseAndNormalizeFile(string unquoted, string baseDirectory, out string outputFileName, out string outputDirectory, out string invalidPath)
        {
            outputFileName = null;
            outputDirectory = null;
            invalidPath = unquoted;
            string text = Path.Combine(baseDirectory, unquoted);
            if (text != null)
            {
                try
                {
                    text = Path.GetFullPath(text);
                    invalidPath = text;
                    outputFileName = Path.GetFileName(text);
                    outputDirectory = Path.GetDirectoryName(text);
                }
                catch (Exception)
                {
                    text = null;
                }
                if (outputFileName != null)
                {
                    outputFileName = CompilationUtil.RemoveTrailingSpacesAndDots(outputFileName);
                }
            }
            if (text == null)
            {
                outputFileName = null;
            }
        }
    }
}
