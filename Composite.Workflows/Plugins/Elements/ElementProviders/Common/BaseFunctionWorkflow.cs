using System;
using System.Linq;
using Composite.AspNet.Security;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.Configuration;
using Composite.Functions;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Functions.Plugins.FunctionProvider.Runtime;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using BaseFunctionElementProvider = Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider;

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
            var functionFolderEntityToken = (this.EntityToken as BaseFunctionFolderElementEntityToken);
            if (functionFolderEntityToken != null)
            {
                var elementProvider = ElementProviderPluginFacade.GetElementProvider(functionFolderEntityToken.ElementProviderName) as BaseFunctionElementProvider;
                if (elementProvider != null)
                {
                    var provider = FunctionProviderPluginFacade.GetFunctionProvider(elementProvider.FunctionProviderName);

                    if (provider is T)
                    {
                        return provider as T;
                    }
                }
            }

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

        internal void GetProviderAndFunction<FunctionType>(
            FileBasedFunctionEntityToken entityToken,
            out FileBasedFunctionProvider<FunctionType> provider,
            out FileBasedFunction<FunctionType> function) where FunctionType : FileBasedFunction<FunctionType>
        {
            string functionProviderName = entityToken.FunctionProviderName;

            provider = (FileBasedFunctionProvider<FunctionType>)FunctionProviderPluginFacade.GetFunctionProvider(functionProviderName);
            IFunction func = FunctionFacade.GetFunction(entityToken.FunctionName);

            Verify.IsNotNull(func, "Failed to get function '{0}'", entityToken.FunctionName);

            if (func is FunctionWrapper)
            {
                func = (func as FunctionWrapper).InnerFunction;
            }

            function = (FileBasedFunction<FunctionType>) func;
        }
    }
}

