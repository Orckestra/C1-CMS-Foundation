using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.IO;
using Composite.Logging;


namespace Composite.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FilePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private List<string> _filesToDelete;


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Files").Count() > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, GetResourceString("FileAddOnFragmentUninstaller.OnlyOneFilesElement")));
                return validationResult;
            }

            XElement filesElement = this.Configuration.Where(f => f.Name == "Files").SingleOrDefault();
            if (filesElement == null) return validationResult;
            

            _filesToDelete = new List<string>();

            //  NOTE: Packages, that were installed on version earlier than C1 1.2 SP3 have absolute file path references, f.e.:
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\CaptchaImageCreator.ashx" />
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\Controls/FormsRender.ascx" />
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\Controls/FormsRender.ascx.cs" />
            List<string> absoluteReferences = new List<string>();

            foreach (XElement fileElement in filesElement.Elements("File").Reverse())
            {
                XAttribute filenameAttribute = fileElement.Attribute("filename");
                if (filenameAttribute == null)
                {
                    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetResourceString("FileAddOnFragmentInstaller.MissingAttribute"), "filename"), fileElement)); 
                    continue;
                }

                string filePath = filenameAttribute.Value;
                if(!filePath.Contains(":\\"))
                {
                    filePath = PathUtil.Resolve(filePath);
                    _filesToDelete.Add(filePath);
                }
                else
                {
                    absoluteReferences.Add(filePath);
                }
            }

            if(absoluteReferences.Count > 0)
            {
                // Trying to resolve what was the old absolute path.
                // To do that the longest common beginning is calculated

                string longestCommonBegining;

                string firstPath = absoluteReferences[0];

                if (absoluteReferences.Count == 1)
                {
                    longestCommonBegining = firstPath;
                }
                else
                {
                    int commonStartLength = 0;
                    for (; commonStartLength < firstPath.Length; commonStartLength++)
                    {
                        bool match = true;
                        char symbol = firstPath[commonStartLength];
                        for (int i = 1; i < absoluteReferences.Count; i++)
                        {
                            if (absoluteReferences[i][commonStartLength] != symbol)
                            {
                                match = false;
                                break;
                            }
                        }
                        if (!match) break;
                    }

                    longestCommonBegining = firstPath.Substring(0, commonStartLength);
                }

                longestCommonBegining = longestCommonBegining.Replace('/', '\\');

                if(!longestCommonBegining.EndsWith("\\"))
                {
                    longestCommonBegining = longestCommonBegining.Substring(0, longestCommonBegining.LastIndexOf("\\") + 1);
                }

                string newRoot = PathUtil.BaseDirectory;
                if(!newRoot.EndsWith("\\"))
                {
                    newRoot += "\\";
                }

                // If the site hasn't been moved to another folder, just using the pathes
                if (longestCommonBegining.StartsWith(newRoot, StringComparison.OrdinalIgnoreCase))
                {
                    _filesToDelete.AddRange(absoluteReferences);
                }
                else
                {
                    // If the longest common path looks like C:\inetpub\docs\Frontend\Composite\
                    // than we will the following pathes as site roots:
                    //
                    // C:\inetpub\docs\Frontend\Composite\
                    // C:\inetpub\docs\Frontend\
                    // C:\inetpub\docs\
                    // C:\inetpub\
                    // C:\

                    string oldRoot = longestCommonBegining;

                    bool fileExists = false;
                    while(!string.IsNullOrEmpty(oldRoot))
                    {
                        for(int i=0; i < absoluteReferences.Count; i++)
                        {
                            if(File.Exists(ReplaceFolder(absoluteReferences[0], oldRoot, newRoot)))
                            {
                                fileExists = true;
                                break;
                            }
                        }
                        if(fileExists) break;

                        oldRoot = ReducePath(oldRoot);
                    }

                    if(!fileExists)
                    {
                        // Showing a message if we don't have a match
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, GetResourceString("FileAddOnFragmentInstaller.WrongBasePath")));
                    }
                    else
                    {
                        _filesToDelete.AddRange(absoluteReferences.Select(path => ReplaceFolder(path, oldRoot, newRoot)));
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _filesToDelete = null;
            }

            return validationResult;
        }

        private static string ReplaceFolder(string filePath, string oldFolderPath, string newFolderPath)
        {
            return newFolderPath + filePath.Substring(oldFolderPath.Length);
        }

        private static string ReducePath(string path) 
        {
            // C:\A\B\ -> C:\A\
            int offset = path.LastIndexOf('\\', path.Length - 2);
            if(offset < 0) return null;
            return path.Substring(0, offset + 1);
        }

        public override void Uninstall()
        {
            if (_filesToDelete == null) throw new InvalidOperationException("Has not been validated");

            foreach (string filename in _filesToDelete)
            {
                LoggingService.LogVerbose("FileAddOnFragmentUninstaller", string.Format("Uninstalling the file '{0}'", filename));

                FileEx.Delete(filename);
            }
        }
    }
}
