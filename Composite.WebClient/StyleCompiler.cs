using System.Collections.Generic;
using System.IO;

namespace Composite.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StyleCompiler
    {
        public static void Compile(string sourceFile, string targetFile)
        {
            using (var outputFile = File.Open(targetFile, FileMode.Create))
            {
                using (var writer = new StreamWriter(outputFile))
                {
                    IncludeRecursive(sourceFile, writer, new HashSet<string>());
                }
            }
        }

        private static void IncludeRecursive(string fileToInclude, StreamWriter writer, HashSet<string> alreadyIncludedFiles)
        {
            fileToInclude = fileToInclude.ToLower();
            alreadyIncludedFiles.Add(fileToInclude);

            bool includingEnabled = true;

            string[] lines = File.ReadAllLines(fileToInclude);
            foreach (string line in lines)
            {
                var trimmedline = line.TrimStart();

                if (includingEnabled)
                {
                    if (trimmedline.StartsWith("@import url"))
                    {
                        int fileNameBegin = trimmedline.IndexOf("\"");
                        int fileNameEnd = trimmedline.LastIndexOf("\"");
                        if (fileNameBegin > 0 && fileNameEnd > 0 && fileNameBegin < fileNameEnd)
                        {
                            string relativeIncludedFilePath =
                                trimmedline.Substring(fileNameBegin + 1, fileNameEnd - fileNameBegin - 1).Replace('/', '\\');
                            string directoryPath = Path.GetDirectoryName(fileToInclude);

                            string includedFilePath = Path.Combine(directoryPath, relativeIncludedFilePath);
                            if (alreadyIncludedFiles.Contains(includedFilePath))
                            {
                                continue;
                            }

                            if (File.Exists(includedFilePath))
                            {
                                IncludeRecursive(includedFilePath, writer, alreadyIncludedFiles);
                                continue;
                            }
                        }
                    }
                    else if (trimmedline.StartsWith("#region"))
                    {
                        includingEnabled = false;
                    }
                }

                writer.WriteLine(trimmedline); // or just "trimmedline"
            }
        }
    }
}
