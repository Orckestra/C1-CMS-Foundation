using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using System.Configuration;
using Composite.Security;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Configuration
{
    internal sealed class AppSettingsValueFunction : StandardFunctionBase
	{
        public AppSettingsValueFunction(EntityTokenFactory entityTokenFactory)
            : base("AppSettingsValue", "Composite.Utils.Configuration", typeof(string), entityTokenFactory)
        {
        }


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
                    "KeyName", typeof(string), true, new NoValueValueProvider(), StandardWidgetFunctions.TextBoxWidget );
            }
        }
    }
}
