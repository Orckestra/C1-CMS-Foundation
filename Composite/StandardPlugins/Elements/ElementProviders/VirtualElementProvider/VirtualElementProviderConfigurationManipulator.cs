using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Elements.Plugins.ElementProvider;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
{
	internal static class VirtualElementProviderConfigurationManipulator
	{
        public static void AddNewArea(string providerName, int order, string label, string closeFolderIconName, string openFolderIconName)
        {
            VirtualElementProviderData data = (VirtualElementProviderData)ElementProviderConfigurationServices.GetElementProviderConfiguration("VirtualElementProvider");

            ProviderHookingElementConfigurationElement configurationElement = new ProviderHookingElementConfigurationElement();

            configurationElement.Id = providerName;
            configurationElement.ParentId = "ID01";
            configurationElement.Order = 1000;
            configurationElement.Label = label;
            configurationElement.Name = providerName;
            configurationElement.ProviderName = providerName;
            configurationElement.CloseFolderIconName = closeFolderIconName ?? "";
            configurationElement.OpenFolderIconName = openFolderIconName ?? "";
            configurationElement.Type = typeof(ProviderHookingElementConfigurationElement);

            data.VirtualElements.Add(configurationElement);

            ElementProviderConfigurationServices.SaveElementProviderConfiguration(data);
        }


        public static bool RemoveArea(string providerName)
        {
            VirtualElementProviderData data = (VirtualElementProviderData)ElementProviderConfigurationServices.GetElementProviderConfiguration("VirtualElementProvider");

            if (data.VirtualElements.Contains(providerName) == true)
            {
                data.VirtualElements.Remove(providerName);

                ElementProviderConfigurationServices.SaveElementProviderConfiguration(data);

                return true;
            }

            return false;
        }
	}
}
