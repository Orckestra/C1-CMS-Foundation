using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;
using Composite.Core.ResourceSystem;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class VirtualElementProviderNodePackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private List<string> _areasToUninstall = null;

        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Areas").Count() > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodeAddOnFragmentUninstaller.OnlyOneElement")));
                return validationResult;
            }

            XElement areasElement = this.Configuration.Where(f => f.Name == "Areas").SingleOrDefault();
            if (areasElement == null)
            {
                return validationResult;
            }

            _areasToUninstall = new List<string>();

            foreach (XElement areaElement in areasElement.Elements("Area").Reverse())
            {
                XAttribute elementProviderNameAttribute = areaElement.Attribute("elementProviderName");

                if (elementProviderNameAttribute == null) 
                {
                    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodeAddOnFragmentUninstaller.MissingAttribute"), "elementProviderName"), areaElement));
                }
                else
                {
                    _areasToUninstall.Add(elementProviderNameAttribute.Value);
                }
            }

            if (validationResult.Count > 0)
            {
                _areasToUninstall = null;
            }

            return validationResult;
        }



        public override void Uninstall()
        {
            if (_areasToUninstall == null) throw new InvalidOperationException("Has not been validated");

            bool makeAFlush = false;
            foreach (string elementProviderName in _areasToUninstall)
            {
                bool deleted = ElementProviderConfigurationServices.DeleteElementProviderConfiguration(elementProviderName);
                bool removed = VirtualElementProviderConfigurationManipulator.RemoveArea(elementProviderName);

                if ((deleted == true) || (removed == true))
                {
                    makeAFlush = true;
                }
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem(true);
            }
        }
    }
}
