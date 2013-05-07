using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Functions.Plugins.FunctionProvider.Runtime;


namespace Composite.Functions.Foundation
{
    internal sealed class FunctionContainer : MetaFunctionContainer
    {
        internal FunctionContainer(List<string> excludedFunctionNames)
            : base(excludedFunctionNames)
        {
        }


        protected override IEnumerable<string> OnGetProviderNames()
        {
            if ((ConfigurationServices.ConfigurationSource == null) ||
                (ConfigurationServices.ConfigurationSource.GetSection(FunctionProviderSettings.SectionName) == null))
            {
                Log.LogError("FunctionProviderRegistry", "Failed to load the configuration section '{0}' from the configuration", FunctionProviderSettings.SectionName);

                return new List<string>();
            }

            var functionProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(FunctionProviderSettings.SectionName) as FunctionProviderSettings;

            return functionProviderSettings.FunctionProviderPlugins.Select(plugin => plugin.Name);
        }



        protected override IEnumerable<IMetaFunction> OnGetFunctionsFromProvider(string providerName, FunctionTypesToReturn functionTypesToReturn)
        {
            try
            {
                switch (functionTypesToReturn)
                {
                    case FunctionTypesToReturn.StaticDependentFunctions:
                        return FunctionProviderPluginFacade.Functions(providerName);
                    
                    case FunctionTypesToReturn.DynamicDependentOnlyFunctions:
                        return FunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName);
                    
                    case FunctionTypesToReturn.AllFunctions:
                        IEnumerable<IMetaFunction> functions = FunctionProviderPluginFacade.Functions(providerName);
                        return functions.Concat(FunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName));
                }
            }
            catch (ThreadAbortException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Log.LogCritical("FunctionProviderRegistry", ex);
                throw;
            }

            throw new NotImplementedException(string.Format("Unexpected FunctionTypesToReturn enumeration value '{0}' from provider '{1}'", functionTypesToReturn, providerName));
        }

        protected override void OnFunctionsAdded(List<string> functionNames, bool fireEvents)
        {
            if (fireEvents)
            {
                FunctionEventSystemFacade.FireFunctionAddedEvent(new FunctionsAddedEventArgs(functionNames));
            }
        }



        protected override void OnFunctionsRemoved(List<string> functionNames)
        {
            FunctionEventSystemFacade.FireFunctionRemovedEvent(new FunctionsRemovedEventArgs(functionNames));
        }



        protected override string FunctionType
        {
            get { return "Function"; }
        }
    }
}
