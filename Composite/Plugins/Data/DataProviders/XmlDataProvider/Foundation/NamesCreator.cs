using System;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class NamesCreator
    {
        internal static string MakeFileName(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScopeIdentifier, string cultureName)
        {
            string typeFullName = StringExtensionMethods.CreateNamespace(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name, '.');

            string publicationScopePart = "";

            switch (dataScopeIdentifier.Name)
            {
                case DataScopeIdentifier.PublicName:
                    break;
                case DataScopeIdentifier.AdministratedName:
                    publicationScopePart = "_" + PublicationScope.Unpublished;
                    break;
                default:
                    throw new InvalidOperationException($"Unsupported data scope identifier: '{dataScopeIdentifier.Name}'");
            }

            string cultureNamePart = "";

            if (cultureName != "")
            {
                cultureNamePart = "_" + cultureName;
            }
                
            return typeFullName + publicationScopePart + cultureNamePart + ".xml";
        }



        internal static string MakeElementName(DataTypeDescriptor dataTypeDescriptor)
        {
            string name = dataTypeDescriptor.Name;

            if (name.StartsWith("I"))
            {
                name = name.Remove(0, 1);
                name = $"{name.Substring(0, 1).ToUpper()}{name.Remove(0, 1)}Elements";
            }

            return name;
        }



        internal static string MakeWrapperClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return $"{MakeNiceTypeFullName(dataTypeDescriptor)}Wrapper";
        }



        internal static string MakeDataIdClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return $"{MakeNiceTypeFullName(dataTypeDescriptor)}DataId";
        }



        internal static string MakeDataProviderHelperClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return $"{MakeNiceTypeFullName(dataTypeDescriptor)}DataProviderHelper";
        }



        internal static string MakeNamespaceName(string providerName)
        {
            return "CompositeGenerated." + providerName;
        }

        private static string MakeNiceTypeFullName(DataTypeDescriptor dataTypeDescriptor)
        {
            return dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_');
        }
    }
}
