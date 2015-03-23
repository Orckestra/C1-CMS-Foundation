using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Xml;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    class PackageVersionBumperFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private Dictionary<Guid, string> _packageToRestore;

        private Dictionary<Guid, string> _installedPackages;


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "PackageVersions") > 1)
            {
                validationResult.AddFatal(Texts.PackageVersionBumperFragmentInstaller_OnlyOneElement);
                
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
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_MissingAttribute("packageId"), packageVersionElement); 
                        continue;
                    }
                    if (oldVersionAttribute == null)
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_MissingAttribute("newVersion"), packageVersionElement); 
                        continue;
                    }

                    Guid packageId;
                    if (!packageIdAttribute.TryGetGuidValue(out packageId))
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_WrongAttributeGuidFormat, packageIdAttribute);
                        continue;
                    }

                    if (_packageToRestore.ContainsKey(packageId))
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_PackageIdDuplicate(packageId), packageIdAttribute);
                        continue;
                    }

                    Version version;
                    try
                    {
                        version = new Version(oldVersionAttribute.Value);
                    }
                    catch
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_WrongAttributeVersionFormat, oldVersionAttribute);
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
                return _installedPackages ?? (_installedPackages = PackageVersionBumperFragmentInstaller.GetInstalledPackages());
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
