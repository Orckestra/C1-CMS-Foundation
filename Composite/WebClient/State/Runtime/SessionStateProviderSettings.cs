using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.WebClient.State.Runtime
{
    internal sealed class SessionStateProviderSettings :  SerializableConfigurationSection
    {
        public const string SectionName = "Composite.WebClient.Plugins.SessionStateProviderConfiguration";

        private const string _providersPropertyName = "Providers";
        [ConfigurationProperty(_providersPropertyName)]
        public NameTypeConfigurationElementCollection<SessionStateProviderData, SessionStateProviderData> Providers
        {
            get { return (NameTypeConfigurationElementCollection<SessionStateProviderData, SessionStateProviderData>)base[_providersPropertyName]; }
        }
    }

    [Assembler(typeof(NonConfigurableSessionStateProviderDataAssembler))]
    internal class SessionStateProviderData : NameTypeConfigurationElement
    {
    }

    internal sealed class NonConfigurableSessionStateProviderDataAssembler : IAssembler<ISessionStateProvider, SessionStateProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public ISessionStateProvider Assemble(IBuilderContext context, SessionStateProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (ISessionStateProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}

