using System.Collections.Generic;
using System.Configuration;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Configuration
{
    internal sealed class AppSettingsValueFunction : StandardFunctionBase
    {
        public AppSettingsValueFunction(EntityTokenFactory entityTokenFactory)
            : base("AppSettingsValue", "Composite.Utils.Configuration", typeof(string), entityTokenFactory)
        {
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass", Justification = "This works for now, but might have to be fixed")]
        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string keyName = parameters.GetParameter<string>("KeyName");

            return ConfigurationManager.AppSettings[keyName];
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "KeyName", typeof(string), true, new NoValueValueProvider(), StandardWidgetFunctions.TextBoxWidget);
            }
        }
    }
}
