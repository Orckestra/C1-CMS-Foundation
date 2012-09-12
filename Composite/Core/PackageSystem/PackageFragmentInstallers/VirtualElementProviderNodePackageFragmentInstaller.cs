using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;
using Composite.Core.Logging;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class VirtualElementProviderNodePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<Area> _areasToInstall = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Areas").Count() > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodePackageFragmentInstaller.OnlyOneElement")));
                return validationResult;
            }

            XElement areasElement = this.Configuration.Where(f => f.Name == "Areas").SingleOrDefault();

            _areasToInstall = new List<Area>();

            if (areasElement != null)
            {
                foreach (XElement areaElement in areasElement.Elements("Area"))
                {
                    XAttribute orderAttribute = areaElement.Attribute("order");
                    XAttribute elementProviderTypeAttribute = areaElement.Attribute("elementProviderType");
                    XAttribute labelAttribute = areaElement.Attribute("label");

                    XAttribute closeFolderIconNameAttribute = areaElement.Attribute("closeFolderIconName");
                    XAttribute openFolderIconNameAttribute = areaElement.Attribute("openFolderIconName");

                    if ((orderAttribute == null) || (elementProviderTypeAttribute == null) || (labelAttribute == null))
                    {
                        if (orderAttribute == null) validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "FilePackageFragmentInstaller.MissingAttribute"), "order"), areaElement));
                        if (elementProviderTypeAttribute == null) validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "FilePackageFragmentInstaller.MissingAttribute"), "elementProviderType"), areaElement));
                        if (labelAttribute == null) validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "FilePackageFragmentInstaller.MissingAttribute"), "label"), areaElement));
                    }
                    else
                    {
                        Type elementProviderType = null;
                        try
                        {
                            elementProviderType = TypeManager.TryGetType(elementProviderTypeAttribute.Value);
                        }
                        catch (Exception)
                        {
                            validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodePackageFragmentInstaller.MissingType"), elementProviderTypeAttribute.Value), areaElement));
                            continue;
                        }


                        Area area = new Area();
                        area.Order = (int)orderAttribute;
                        area.ElementProviderTypeName = elementProviderTypeAttribute.Value;
                        area.ElementProviderType = elementProviderType;
                        area.Label = labelAttribute.Value;

                        if (closeFolderIconNameAttribute != null)
                        {
                            if ((closeFolderIconNameAttribute.Value != "") && (IconResourceSystemFacade.GetResourceHandle(closeFolderIconNameAttribute.Value) == null))
                            {
                                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodePackageFragmentInstaller.MissingIcon"), closeFolderIconNameAttribute.Value), areaElement));
                                continue;
                            }
                            else
                            {
                                area.CloseFolderIconName = closeFolderIconNameAttribute.Value;
                            }
                        }

                        if (openFolderIconNameAttribute != null)
                        {
                            if ((openFolderIconNameAttribute.Value != "") && (IconResourceSystemFacade.GetResourceHandle(openFolderIconNameAttribute.Value) == null))
                            {
                                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodePackageFragmentInstaller.MissingIcon"), openFolderIconNameAttribute.Value), areaElement));
                                continue;
                            }
                            else
                            {
                                area.OpenFolderIconName = openFolderIconNameAttribute.Value;
                            }
                        }

                        _areasToInstall.Add(area);
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _areasToInstall = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            if (_areasToInstall == null) throw new InvalidOperationException("VirtualElementProviderNodePackageFragmentInstaller has not been validated");

            List<XElement> areaElements = new List<XElement>();
            foreach (Area area in _areasToInstall)
            {
                string name = string.Format("{0}{1}", area.ElementProviderType.Name, Guid.NewGuid());

                LoggingService.LogVerbose("VirtualElementProviderNodePackageFragmentInstaller", string.Format("Installing the element provider '{0}'", name));

                if (area.ElementProviderType == null)
                {
                    area.ElementProviderType = TypeManager.GetType(area.ElementProviderTypeName);
                }

                HooklessElementProviderData elementProviderData = new HooklessElementProviderData();
                elementProviderData.Type = area.ElementProviderType;
                elementProviderData.Name = name;

                ElementProviderConfigurationServices.SaveElementProviderConfiguration(elementProviderData);
                VirtualElementProviderConfigurationManipulator.AddNewArea(name, area.Order, area.Label, area.CloseFolderIconName, area.OpenFolderIconName);

                XElement areaElement = new XElement("Area", new XAttribute("elementProviderName", name));
                areaElements.Add(areaElement);
            }

            GlobalEventSystemFacade.FlushTheSystem(true);

            yield return new XElement("Areas", areaElements);
        }



        private sealed class Area
        {
            public int Order { get; set; }
            public string ElementProviderTypeName { get; set; }
            public Type ElementProviderType { get; set; }
            public string Label { get; set; }
            public string CloseFolderIconName { get; set; }
            public string OpenFolderIconName { get; set; }
        }
    }
}
