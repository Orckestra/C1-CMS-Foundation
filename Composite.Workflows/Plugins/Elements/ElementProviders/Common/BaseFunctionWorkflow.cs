using System;
using System.Linq;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow.Activities;
using Composite.C1Console.Workflow;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Core.Configuration;
using Composite.Functions.Plugins.FunctionProvider.Runtime;
using Composite.Functions.Foundation.PluginFacades;


namespace Composite.Plugins.Elements.ElementProviders.Common
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class BaseFunctionWorkflow : FormsWorkflow
    {
        /// <summary>
        /// Refreshed function tree for the currently used function provider element provider.
        /// </summary>
        public void RefreshFunctionTree()
        {
            WorkflowActionToken actionToken = (WorkflowActionToken)this.ActionToken;

            var entityToken = new BaseFunctionFolderElementEntityToken(actionToken.Payload, string.Empty);

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(entityToken);
        }

        public T GetFunctionProvider<T>() where T: class, IFunctionProvider
        {
            var functionProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(FunctionProviderSettings.SectionName) 
                                           as FunctionProviderSettings;

            var providerNames = functionProviderSettings.FunctionProviderPlugins.Select(plugin => plugin.Name);

            foreach (string providerName in providerNames)
            {
                var provider = FunctionProviderPluginFacade.GetFunctionProvider(providerName);
                if (provider is T)
                {
                    return provider as T;
                }
            }

            throw new InvalidOperationException("Failed to get instance of " + typeof(T).Name);
        }
    }
}

