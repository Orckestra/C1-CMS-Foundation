using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Functions.Plugins.FunctionProvider.Runtime;
using Composite.Core.Logging;


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
            if ((ConfigurationServices.ConfigurationSource != null) &&
                (ConfigurationServices.ConfigurationSource.GetSection(FunctionProviderSettings.SectionName) != null))
            {
                FunctionProviderSettings functionProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(FunctionProviderSettings.SectionName) as FunctionProviderSettings;

                return functionProviderSettings.FunctionProviderPlugins.Select(plugin => plugin.Name);
            }
            else
            {
                LoggingService.LogError("FunctionProviderRegistry", string.Format("Failed to load the configuration section '{0}' from the configuration", FunctionProviderSettings.SectionName));

                return new List<string>();
            }
        }



        protected override IEnumerable<IMetaFunction> OnGetFunctionsFromProvider(string providerName, FunctionTypesToReturn functionTypesToReturn)
        {
            IEnumerable<IMetaFunction> functions = new List<IMetaFunction>();

            switch (functionTypesToReturn)
            {
                case FunctionTypesToReturn.StaticDependentFunctions:
                    try
                    {
                        functions = FunctionProviderPluginFacade.Functions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }
                    break;
                case FunctionTypesToReturn.DynamicDependentOnlyFunctions:
                    try
                    {
                        functions = FunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }
                    break;
                case FunctionTypesToReturn.AllFunctions:
                    try
                    {
                        functions = FunctionProviderPluginFacade.Functions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }

                    try
                    {
                        functions = functions.Concat(FunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName).Cast<IMetaFunction>());
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }
                    break;
                default:
                    throw new NotImplementedException();
            }

            return functions;
        }



        protected override void OnFunctionsAdded(List<string> functionNames, bool fireEvents)
        {
            if (fireEvents == true)
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
