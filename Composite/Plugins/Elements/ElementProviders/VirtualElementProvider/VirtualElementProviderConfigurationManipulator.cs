using Composite.C1Console.Elements.Plugins.ElementProvider;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
	internal static class VirtualElementProviderConfigurationManipulator
	{
        public static void AddNewArea(string providerName, int order, string label, string closeFolderIconName, string openFolderIconName)
        {
            VirtualElementProviderData data = (VirtualElementProviderData)ElementProviderConfigurationServices.GetElementProviderConfiguration("VirtualElementProvider");

            var perspectiveElement = new SimpleVirtualElement();
            perspectiveElement.Name = providerName;
            perspectiveElement.Label = label;
            perspectiveElement.CloseFolderIconName = closeFolderIconName ?? "";
            perspectiveElement.OpenFolderIconName = openFolderIconName ?? "";
            perspectiveElement.Type = typeof(SimpleVirtualElement);

            data.Perspectives.Add(perspectiveElement);

            var providerElement = new AttachProviderVirtualElement();
            providerElement.Name = providerName;
            providerElement.ProviderName = providerName;
            providerElement.Type = typeof (AttachProviderVirtualElement);

            perspectiveElement.Elements.Add(providerElement);

            ElementProviderConfigurationServices.SaveElementProviderConfiguration(data);
        }


        public static bool RemoveArea(string providerName)
        {
            var data = (VirtualElementProviderData)ElementProviderConfigurationServices.GetElementProviderConfiguration("VirtualElementProvider");

            if (data.Perspectives.Contains(providerName))
            {
                data.Perspectives.Remove(providerName);

                ElementProviderConfigurationServices.SaveElementProviderConfiguration(data);

                return true;
            }

            return false;
        }
	}
}
