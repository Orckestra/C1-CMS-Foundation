using System;
using System.Collections.Generic;
using System.Configuration;
using System.Workflow.Runtime;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider;
using Composite.C1Console.Workflow.Plugins.WorkflowRuntimeProvider.Runtime;


namespace Composite.C1Console.Workflow.Foundation.PluginFacades
{
    internal class WorkflowRuntimeProviderPluginFacadeImpl : IWorkflowRuntimeProviderPluginFacade
    {
        private ResourceLocker<Resources> _resources;



        public WorkflowRuntimeProviderPluginFacadeImpl()
        {
            _resources = new ResourceLocker<Resources>(new Resources { Owner = this }, Resources.Initialize);
        }



        public bool HasConfiguration
        {
            get
            {
                return (ConfigurationServices.ConfigurationSource != null) &&
                       (ConfigurationServices.ConfigurationSource.GetSection(WorkflowRuntimeProviderSettings.SectionName) != null);
            }
        }


        public WorkflowRuntime GetWorkflowRuntime(string providerName)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");

            using (_resources.Locker)
            {
                WorkflowRuntime workflowRuntime = GetWorkflowRuntimeProvider(providerName).GetWorkflowRuntime();

                if (workflowRuntime == null) throw new InvalidOperationException(string.Format("The workflow runtime provider '{0}' returned null", providerName));

                return workflowRuntime;
            }
        }



        public void OnFlush()
        {
            _resources.ResetInitialization();
        }



        private IWorkflowRuntimeProvider GetWorkflowRuntimeProvider(string providerName)
        {
            using (_resources.Locker)
            {
                IWorkflowRuntimeProvider provider;

                if (_resources.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
                {
                    try
                    {
                        provider = _resources.Resources.Factory.Create(providerName);

                        _resources.Resources.ProviderCache.Add(providerName, provider);
                    }
                    catch (ArgumentException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                    catch (ConfigurationErrorsException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                }

                return provider;
            }
        }



        private void HandleConfigurationError(Exception ex)
        {
            OnFlush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", WorkflowRuntimeProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public WorkflowRuntimeProviderFactory Factory { get; set; }
            public Dictionary<string, IWorkflowRuntimeProvider> ProviderCache { get; set; }
            public WorkflowRuntimeProviderPluginFacadeImpl Owner { get; set; }


            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new WorkflowRuntimeProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    resources.Owner.HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    resources.Owner.HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IWorkflowRuntimeProvider>();
            }
        }
    }
}
