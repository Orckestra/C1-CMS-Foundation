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
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageVersionBumberFragmentInstaller : BasePackageFragmentInstaller
    {
        private Dictionary<Guid, string> _packagesToBumb = null;

        private Dictionary<Guid, string> _installedPackages = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "PackageVersions").Count() > 1)
            {
                validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.OnlyOneElement"), this.ConfigurationParent);
                return validationResult;
            }            

            XElement packageVersionsElement = this.Configuration.Where(f => f.Name == "PackageVersions").SingleOrDefault();

            _packagesToBumb = new Dictionary<Guid, string>();

            if (packageVersionsElement != null)
            {
                foreach (XElement packageVersionElement in packageVersionsElement.Elements("PackageVersion"))
                {
                    XAttribute packageIdAttribute = packageVersionElement.Attribute("packageId");
                    XAttribute newVersionAttribute = packageVersionElement.Attribute("newVersion");

                    if (packageIdAttribute == null) 
                    { 
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.MissingAttribute").FormatWith("packageId"), packageVersionElement);
                        continue; 
                    }
                    if (newVersionAttribute == null) 
                    { 
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.MissingAttribute").FormatWith("newVersion"), packageVersionElement); 
                        continue; 
                    }

                    Guid packageId;
                    if (packageIdAttribute.TryGetGuidValue(out packageId) == false)
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.WrongAttributeGuidFormat"), packageIdAttribute);
                        continue;
                    }

                    if (_packagesToBumb.ContainsKey(packageId))
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.PackageIdDuplicate"), packageIdAttribute);
                        continue;
                    }

                    Version version;
                    try
                    {
                        version = new Version(newVersionAttribute.Value);
                    }
                    catch
                    {
                        validationResult.AddFatal(GetText("PackageVersionBumberFragmentInstaller.WrongAttributeVersionFormat"), newVersionAttribute);
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
            if (_packagesToBumb == null) throw new InvalidOperationException("PackageVersionBumberFragmentInstaller has not been validated");

            List<XElement> installedElements = new List<XElement>();
            foreach (var kvp in _packagesToBumb)
            {
                if (this.InstalledPackages.ContainsKey(kvp.Key))
                {
                    XDocument doc = XDocumentUtils.Load(this.InstalledPackages[kvp.Key]);

                    XElement element = doc.Root;
                    if (element == null) continue;

                    XAttribute attribute = element.Attribute(PackageSystemSettings.VersionAttributeName);
                    if (attribute == null) continue;

                    XElement installedElement = new XElement("PackageVersion");
                    installedElement.Add(new XAttribute("packageId", kvp.Key));
                    installedElement.Add(new XAttribute("oldVersion", attribute.Value));
                    installedElements.Add(installedElement);

                    attribute.Value = kvp.Value;

                    doc.SaveToFile(this.InstalledPackages[kvp.Key]);
                }
            }

            yield return new XElement("PackageVersions", installedElements);
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
