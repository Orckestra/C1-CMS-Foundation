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
                    throw new InvalidOperationException("Unsupported data scope identifier: '{0}'".FormatWith(dataScopeIdentifier.Name));
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
                name = string.Format("{0}{1}Elements", name.Substring(0, 1).ToUpper(), name.Remove(0, 1));
            }

            return name;
        }



        internal static string MakeWrapperClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}Wrapper", dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_'));
        }



        internal static string MakeDataIdClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}DataId", dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_'));
        }



        internal static string MakeDataProviderHelperClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}DataProviderHelper", dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_'));
        }



        internal static string MakeNamespaceName(string providerName)
        {
            return "CompositeGenerated." + providerName;
        }
    }
}
