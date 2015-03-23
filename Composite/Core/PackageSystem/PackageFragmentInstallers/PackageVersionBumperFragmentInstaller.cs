using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Xml;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>
    /// Updates the version number for an already installed package.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageVersionBumperFragmentInstaller : BasePackageFragmentInstaller
    {
        private Dictionary<Guid, string> _packagesToBumb;

        private Dictionary<Guid, string> _installedPackages;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "PackageVersions") > 1)
            {
                validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_OnlyOneElement, this.ConfigurationParent);
                return validationResult;
            }            

            XElement packageVersionsElement = this.Configuration.SingleOrDefault(f => f.Name == "PackageVersions");

            _packagesToBumb = new Dictionary<Guid, string>();

            if (packageVersionsElement != null)
            {
                foreach (XElement packageVersionElement in packageVersionsElement.Elements("PackageVersion"))
                {
                    XAttribute packageIdAttribute = packageVersionElement.Attribute("packageId");
                    XAttribute newVersionAttribute = packageVersionElement.Attribute("newVersion");

                    if (packageIdAttribute == null) 
                    { 
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_MissingAttribute("packageId"), packageVersionElement);
                        continue; 
                    }
                    if (newVersionAttribute == null) 
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

                    if (_packagesToBumb.ContainsKey(packageId))
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_PackageIdDuplicate(packageId), packageIdAttribute);
                        continue;
                    }

                    Version version;
                    try
                    {
                        version = new Version(newVersionAttribute.Value);
                    }
                    catch
                    {
                        validationResult.AddFatal(Texts.PackageVersionBumperFragmentUninstaller_WrongAttributeVersionFormat, newVersionAttribute);
                        continue;
                    }

                    _packagesToBumb.Add(packageId, version.ToString());
                }
            }


            if (validationResult.Count > 0)
            {
                _packagesToBumb = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            Verify.IsNotNull(_packagesToBumb, this.GetType().Name + " has not been validated");

            var installedElements = new List<XElement>();
            foreach (var kvp in _packagesToBumb)
            {
                if (this.InstalledPackages.ContainsKey(kvp.Key))
                {
                    XDocument doc = XDocumentUtils.Load(this.InstalledPackages[kvp.Key]);

                    XElement element = doc.Root;
                    if (element == null) continue;

                    XAttribute attribute = element.Attribute(PackageSystemSettings.VersionAttributeName);
                    if (attribute == null) continue;

                    installedElements.Add(
                        new XElement("PackageVersion",
                            new XAttribute("packageId", kvp.Key),
                            new XAttribute("oldVersion", attribute.Value))
                    );

                    attribute.Value = kvp.Value;

                    doc.SaveToFile(this.InstalledPackages[kvp.Key]);
                }
            }

            yield return new XElement("PackageVersions", installedElements);
        }



        private Dictionary<Guid, string> InstalledPackages
        {
            get { return _installedPackages ?? (_installedPackages = GetInstalledPackages()); }
        }

        internal static Dictionary<Guid, string> GetInstalledPackages()
        {
            var result = new Dictionary<Guid, string>();

            string baseDirectory = PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory);

            if (!C1Directory.Exists(baseDirectory)) return result;

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

                        result.Add(id, filename);
                    }
                }
            }

            return result;
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
