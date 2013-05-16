using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Xml;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    class PackageVersionBumberFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private Dictionary<Guid, string> _packageToRestore = null;

        private Dictionary<Guid, string> _installedPackages = null;


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "PackageVersions") > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, GetResourceString("PackageVersionBumberFragmentUninstaller.OnlyOneElement")));
                return validationResult;
            }

            XElement packageVersionsElement = this.Configuration.SingleOrDefault(f => f.Name == "PackageVersions");

            _packageToRestore = new Dictionary<Guid, string>();

            if (packageVersionsElement != null)
            {
                foreach (XElement packageVersionElement in packageVersionsElement.Elements("PackageVersion"))
                {
                    XAttribute packageIdAttribute = packageVersionElement.Attribute("packageId");
                    XAttribute oldVersionAttribute = packageVersionElement.Attribute("oldVersion");

                    if (packageIdAttribute == null)
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentUninstaller.MissingAttribute").FormatWith("packageId"), packageVersionElement); 
                        continue;
                    }
                    if (oldVersionAttribute == null)
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentUninstaller.MissingAttribute").FormatWith("newVersion"), packageVersionElement); 
                        continue;
                    }

                    Guid packageId;
                    if (packageIdAttribute.TryGetGuidValue(out packageId) == false)
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentUninstaller.WrongAttributeGuidFormat"), packageIdAttribute);
                        continue;
                    }

                    if (_packageToRestore.ContainsKey(packageId))
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentUninstaller.PackageIdDuplicate"), packageIdAttribute);
                        continue;
                    }

                    Version version;
                    try
                    {
                        version = new Version(oldVersionAttribute.Value);
                    }
                    catch
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentUninstaller.WrongAttributeVersionFormat"), oldVersionAttribute);
                        continue;
                    }

                    _packageToRestore.Add(packageId, version.ToString());
                }
            }


            if (validationResult.Count > 0)
            {
                _packageToRestore = null;
                _installedPackages = null;
            }

            return validationResult;
        }



        public override void Uninstall()
        {
            foreach (var kvp in _packageToRestore.Reverse())
            {
                if (this.InstalledPackages.ContainsKey(kvp.Key))
                {
                    XDocument doc = XDocumentUtils.Load(this.InstalledPackages[kvp.Key]);

                    XElement element = doc.Root;
                    if (element == null) continue;

                    XAttribute attribute = element.Attribute(PackageSystemSettings.VersionAttributeName);
                    if (attribute == null) continue;                   

                    attribute.Value = kvp.Value;

                    doc.SaveToFile(this.InstalledPackages[kvp.Key]);
                }
            }
        }


        private Dictionary<Guid, string> InstalledPackages
        {
            get
            {
                if (_installedPackages == null)
                {
                    _installedPackages = new Dictionary<Guid, string>();

                    string baseDirectory = PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory);

                    if (C1Directory.Exists(baseDirectory) == false) return _installedPackages;

                    string[] packageDirectories = C1Directory.GetDirectories(baseDirectory);
                    foreach (string packageDirecoty in packageDirectories)
                    {
                        if (C1File.Exists(Path.Combine(packageDirecoty, PackageSystemSettings.InstalledFilename)))
                        {
                            string filename = Path.Combine(packageDirecoty, PackageSystemSettings.PackageInformationFilename);

                            if (C1File.Exists(filename))
                            {
                                string path = packageDirecoty.Remove(0, baseDirectory.Length);
                                if (path.StartsWith("\\"))
                                {
                                    path = path.Remove(0, 1);
                                }

                                Guid id = new Guid(path);

                                _installedPackages.Add(id, filename);
                            }
                        }
                    }
                }

                return _installedPackages;
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
