using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
{
    internal sealed class SetSessionVariableFunction :  StandardFunctionBase
	{
        public SetSessionVariableFunction(EntityTokenFactory entityTokenFactory)
            : base("SetSessionVariable", "Composite.Web.Response", typeof(string), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "VariableName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Value", typeof(string), true, new ConstantValueProvider(""), textboxWidget );
            }
        }


      public override object Execute(ParameterList parameters, FunctionContextContainer context)
      {
          if (HttpContext.Current != null && HttpContext.Current.Request != null)
          {
              HttpContext.Current.Session[parameters.GetParameter<string>("VariableName")] = parameters.GetParameter<string>("Value");
          }

          return null;
      }
	}
}
