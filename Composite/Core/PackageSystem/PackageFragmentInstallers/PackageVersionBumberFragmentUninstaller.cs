using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.ResourceSystem;
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

            if (this.Configuration.Where(f => f.Name == "PackageVersions").Count() > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, GetResourceString("PackageVersionBumberFragmentUninstaller.OnlyOneElement")));
                return validationResult;
            }

            XElement packageVersionsElement = this.Configuration.Where(f => f.Name == "PackageVersions").SingleOrDefault();

            _packageToRestore = new Dictionary<Guid, string>();

            if (packageVersionsElement != null)
            {
                foreach (XElement packageVersionElement in packageVersionsElement.Elements("PackageVersion"))
                {
                    XAttribute packageIdAttribute = packageVersionElement.Attribute("packageId");
                    XAttribute oldVersionAttribute = packageVersionElement.Attribute("oldVersion");

                    if (packageIdAttribute == null) { validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "PackageVersionBumberFragmentUninstaller.MissingAttribute"), "packageId"), packageVersionElement)); continue; }
                    if (oldVersionAttribute == null) { validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "PackageVersionBumberFragmentUninstaller.MissingAttribute"), "newVersion"), packageVersionElement)); continue; }

                    Guid packageId;
                    if (packageIdAttribute.TryGetGuidValue(out packageId) == false)
                    {
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "PackageVersionBumberFragmentUninstaller.WrongAttributeGuidFormat"), packageIdAttribute));
                        continue;
                    }

                    if (_packageToRestore.ContainsKey(packageId) == true)
                    {
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "PackageVersionBumberFragmentUninstaller.PackageIdDuplicate"), packageIdAttribute));
                        continue;
                    }

                    Version version;
                    try
                    {
                        version = new Version(oldVersionAttribute.Value);
                    }
                    catch
                    {
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "PackageVersionBumberFragmentUninstaller.WrongAttributeVersionFormat"), oldVersionAttribute));
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
                if (this.InstalledPackages.ContainsKey(kvp.Key) == true)
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
                        if (C1File.Exists(Path.Combine(packageDirecoty, PackageSystemSettings.InstalledFilename)) == true)
                        {
                            string filename = Path.Combine(packageDirecoty, PackageSystemSettings.PackageInformationFilename);

                            if (C1File.Exists(filename) == true)
                            {
                                string path = packageDirecoty.Remove(0, baseDirectory.Length);
                                if (path.StartsWith("\\") == true)
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
    }
}
