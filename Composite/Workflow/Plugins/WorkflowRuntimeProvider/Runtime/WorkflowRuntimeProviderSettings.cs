using System.Configuration;

using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Workflow.Plugins.WorkflowRuntimeProvider.Runtime
{
    internal sealed class WorkflowRuntimeProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Workflow.Plugins.WorkflowRuntimeProviderConfiguration";


        private const string _defaultProviderNameProperty = "defaultProviderName";
        [ConfigurationProperty(_defaultProviderNameProperty, IsRequired = true)]
        public string DefaultProviderName
        {
            get { return (string)base[_defaultProviderNameProperty]; }
            set { base[_defaultProviderNameProperty] = value; }
        }


        private const string _workflowRuntimeProviderPluginsProperty = "WorkflowRuntimeProviderPlugins";
        [ConfigurationProperty(_workflowRuntimeProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<WorkflowRuntimeProviderData> WorkflowRuntimeProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<WorkflowRuntimeProviderData>)base[_workflowRuntimeProviderPluginsProperty];
            }
        }
    }
}
