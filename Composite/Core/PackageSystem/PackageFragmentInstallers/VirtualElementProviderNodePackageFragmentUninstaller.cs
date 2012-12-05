using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class VirtualElementProviderNodePackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private List<string> _areasToUninstall = null;

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Areas") > 1)
            {
                validationResult.AddFatal(GetText("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"));
                return validationResult;
            }

            XElement areasElement = this.Configuration.SingleOrDefault(f => f.Name == "Areas");

            _areasToUninstall = new List<string>();

            if (areasElement != null)
            {
                foreach (XElement areaElement in areasElement.Elements("Area").Reverse())
                {
                    XAttribute elementProviderNameAttribute = areaElement.Attribute("elementProviderName");

                    if (elementProviderNameAttribute == null)
                    {
                        validationResult.AddFatal(GetText("VirtualElementProviderNodePackageFragmentUninstaller.MissingAttribute").FormatWith("elementProviderName"), areaElement);
                    }
                    else
                    {
                        _areasToUninstall.Add(elementProviderNameAttribute.Value);
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _areasToUninstall = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override void Uninstall()
        {
            if (_areasToUninstall == null) throw new InvalidOperationException("VirtualElementProviderNodePackageFragmentUninstaller has not been validated");

            bool makeAFlush = false;
            foreach (string elementProviderName in _areasToUninstall)
            {
                bool deleted = ElementProviderConfigurationServices.DeleteElementProviderConfiguration(elementProviderName);
                bool removed = VirtualElementProviderConfigurationManipulator.RemoveArea(elementProviderName);

                if (deleted || removed)
                {
                    makeAFlush = true;
                }
            }

            if (makeAFlush)
            {
                GlobalEventSystemFacade.FlushTheSystem(true);
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
