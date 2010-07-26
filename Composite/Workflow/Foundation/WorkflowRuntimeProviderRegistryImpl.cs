using System.Configuration;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.EventSystem;
using Composite.Workflow.Plugins.WorkflowRuntimeProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Logging;


namespace Composite.Workflow.Foundation
{
    internal class WorkflowRuntimeProviderRegistryImpl : IWorkflowRuntimeProviderRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        public string DefaultWorkflowRuntimeProviderName
        {
            get
            {
                using (_resourceLocker.Locker)
                {
                    return _resourceLocker.Resources.DefaultWorkflowRuntimeProviderName;
                }
            }
        }



        public void OnFlush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static IConfigurationSource GetConfiguration()
        {
            IConfigurationSource source = ConfigurationServices.ConfigurationSource;

            if (null == source)
            {
                throw new ConfigurationErrorsException(string.Format("No configuration source specified"));
            }

            return source;
        }



        






        private sealed class Resources
        {
            public string DefaultWorkflowRuntimeProviderName { get; set; }

            public static void Initialize(Resources resources)
            {
                IConfigurationSource configurationSource = GetConfiguration();

                WorkflowRuntimeProviderSettings settings = configurationSource.GetSection(WorkflowRuntimeProviderSettings.SectionName) as WorkflowRuntimeProviderSettings;
                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", WorkflowRuntimeProviderSettings.SectionName));
                }

                resources.DefaultWorkflowRuntimeProviderName = settings.DefaultProviderName;
            }
        }
    }
}
