using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.String
{
    internal sealed class Format : StandardFunctionBase, ICompoundFunction
    {
        public Format(EntityTokenFactory entityTokenFactory)
            : base("Format", "Composite.Utils.String", typeof(string), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string format = parameters.GetParameter<string>("Format");

            var formatParameters = new object[5];

            formatParameters[0] = parameters.GetParameter<string>("Parameter1");

            Verify.IsNotNull(formatParameters[0], "Parameter1 is null");

            formatParameters[1] = parameters.GetParameter<string>("Parameter2");
            formatParameters[2] = parameters.GetParameter<string>("Parameter3");
            formatParameters[3] = parameters.GetParameter<string>("Parameter4");
            formatParameters[4] = parameters.GetParameter<string>("Parameter5");

            return string.Format(format, formatParameters);
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "FormatString", typeof(IEnumerable<string>), true, new NoValueValueProvider(), null);

                yield return new StandardFunctionParameterProfile(
                    "Parameter1", typeof(string), true, new ConstantValueProvider(null), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Parameter2", typeof(string), false, new ConstantValueProvider(null), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Parameter3", typeof(string), false, new ConstantValueProvider(null), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Parameter4", typeof(string), false, new ConstantValueProvider(null), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Parameter5", typeof(string), false, new ConstantValueProvider(null), textboxWidget);
            }
        }
    
        public bool  AllowRecursiveCall
        {
	        get { return true; }
        }
    }
}
