using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FilePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private static readonly string LogTitle = typeof (FilePackageFragmentUninstaller).Name;

        private List<string> _filesToDelete;
        private List<Tuple<string, string>> _filesToCopy;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Files") > 1)
            {
                validationResult.AddFatal(Texts.FilePackageFragmentUninstaller_OnlyOneFilesElement, ConfigurationParent);
                return validationResult;
            }

            XElement filesElement = this.Configuration.SingleOrDefault(f => f.Name == "Files");
            

            _filesToDelete = new List<string>();
            _filesToCopy = new List<Tuple<string, string>>();

            //  NOTE: Packages, that were installed on version earlier than C1 1.2 SP3 have absolute file path references, f.e.:
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\CaptchaImageCreator.ashx" />
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\Controls/FormsRender.ascx" />
            //  <File filename="C:\inetpub\docs\Frontend\Composite\Forms\Renderer\Controls/FormsRender.ascx.cs" />
            List<string> absoluteReferences = new List<string>();

            if (filesElement != null)
            {
                foreach (XElement fileElement in filesElement.Elements("File").Reverse())
                {
                    XAttribute filenameAttribute = fileElement.Attribute("filename");
                    if (filenameAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("filename"), fileElement);
                        continue;
                    }

                    string filePath = filenameAttribute.Value;
                    if (filePath.Contains(":\\"))
                    {
                        absoluteReferences.Add(filePath);
                        continue;
                    }
                    
                    filePath = PathUtil.Resolve(filePath);

                    string backupFile = (string) fileElement.Attribute("backupFile");

                    if (backupFile != null)
                    {
                        var backupFilePath = Path.Combine(UninstallerContext.PackageDirectory, "FileBackup", backupFile);
                        if (!C1File.Exists(backupFilePath))
                        {
                            validationResult.AddFatal("Missing backup file '{0}'".FormatWith(backupFilePath), fileElement);
                            continue;
                        }

                        _filesToCopy.Add(new Tuple<string, string>(backupFilePath, filePath));
                    }
                    else
                    {
                        _filesToDelete.Add(filePath);
                    }
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
                    int shortestPathLength = absoluteReferences.Min(path => path.Length);

                    int commonStartLength = 0;
                    for (; commonStartLength < shortestPathLength; commonStartLength++)
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
                            if(C1File.Exists(ReplaceFolder(absoluteReferences[0], oldRoot, newRoot)))
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
                        validationResult.AddFatal(GetResourceString("FilePackageFragmentInstaller.WrongBasePath"));
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
                _filesToCopy = null;
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



        /// <exclude />
        public override void Uninstall()
        {
            Verify.IsNotNull(_filesToDelete as object ?? _filesToCopy, "FilePackageFragmentUninstaller has not been validated");

            foreach (string filename in _filesToDelete)
            {
                Log.LogVerbose(LogTitle, "Uninstalling the file '{0}'", filename);

                FileUtils.Delete(filename);
            }

            foreach (var fileToCopy in _filesToCopy)
            {
                string targetFile = fileToCopy.Item2;

                Log.LogVerbose(LogTitle, "Restoring file from a backup copy'{0}'", targetFile);

                if ((C1File.GetAttributes(targetFile) & FileAttributes.ReadOnly) > 0)
                {
                    FileUtils.RemoveReadOnly(targetFile);
                }

                C1File.Copy(fileToCopy.Item1, targetFile, true);
            }
        }
    }
}
