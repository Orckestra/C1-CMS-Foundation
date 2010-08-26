using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using System;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime
{
    internal sealed class FunctionFactoryCustomFactory : AssemblerBasedCustomFactory<IFormFunctionFactory, FunctionFactoryData>
    {
        protected override FunctionFactoryData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            FunctionFactorySettings settings = configurationSource.GetSection(FunctionFactorySettings.SectionName) as FunctionFactorySettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", FunctionFactorySettings.SectionName));
            }

            int index = name.IndexOf("->");

            string namespaceName = name.Substring(0, index);
            string tag = name.Substring(index + 2);


            NamespaceConfigurationElement namespaceElement = settings.Namespaces[namespaceName];
            if (null == namespaceElement) throw new ConfigurationErrorsException(string.Format("The namespace {0} is missing from the configuration", namespaceName));

            return namespaceElement.Factories.Get(tag);
        }
    }
}
