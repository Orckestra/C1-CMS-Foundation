using System;
using System.Collections.Generic;
using System.Linq;
using Composite.ConfigurationSystem;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Functions.Plugins.WidgetFunctionProvider.Runtime;
using Composite.Logging;


namespace Composite.Functions.Foundation
{
    internal sealed class WidgetFunctionContainer : MetaFunctionContainer
    {
        internal WidgetFunctionContainer(List<string> excludedFunctionNames)
            : base(excludedFunctionNames)
        {
        }


        protected override IEnumerable<string> OnGetProviderNames()
        {
            if ((ConfigurationServices.ConfigurationSource != null) &&
                (ConfigurationServices.ConfigurationSource.GetSection(WidgetFunctionProviderSettings.SectionName) != null))
            {
                WidgetFunctionProviderSettings functionProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(WidgetFunctionProviderSettings.SectionName) as WidgetFunctionProviderSettings;

                return functionProviderSettings.WidgetFunctionProviderPlugins.Select(plugin => plugin.Name);
            }
            else
            {
                LoggingService.LogError("FunctionProviderRegistry", string.Format("Failed to load the configuration section '{0}' from the configuration", WidgetFunctionProviderSettings.SectionName));

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
                        functions = WidgetFunctionProviderPluginFacade.Functions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }
                    break;
                case FunctionTypesToReturn.DynamicDependentOnlyFunctions:
                    try
                    {
                        functions = WidgetFunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }
                    break;
                case FunctionTypesToReturn.AllFunctions:
                    try
                    {
                        functions = WidgetFunctionProviderPluginFacade.Functions(providerName).Cast<IMetaFunction>();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogCritical("FunctionProviderRegistry", ex);
                    }

                    try
                    {
                        functions = functions.Concat(WidgetFunctionProviderPluginFacade.DynamicTypeDependentFunctions(providerName).Cast<IMetaFunction>());
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
                FunctionEventSystemFacade.FireWidgetFunctionAddedEvent(new WidgetFunctionsAddedEventArgs(functionNames));
            }
        }



        protected override void OnFunctionsRemoved(List<string> functionNames)
        {
            FunctionEventSystemFacade.FireWidgetFunctionRemovedEvent(new WidgetFunctionsRemovedEventArgs(functionNames));
        }



        protected override string FunctionType
        {
            get { return "WidgetFunction"; }
        }
    }
}
