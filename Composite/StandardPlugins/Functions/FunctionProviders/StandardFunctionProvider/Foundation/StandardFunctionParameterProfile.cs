using System;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation
{
	internal sealed class StandardFunctionParameterProfile
	{
        public StandardFunctionParameterProfile(
            string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, 
            WidgetFunctionProvider widgetFunctionProvider)
        {
            this.Name = name;
            this.Type = type;
            this.IsRequired = isRequired;
            this.FallbackValueProvider = fallbackValueProvider;
            this.WidgetFunctionProvider = widgetFunctionProvider;
        }

        public StandardFunctionParameterProfile(
            string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider,
            WidgetFunctionProvider widgetFunctionProvider, string customResourceHandleNamespace)
            : this( name,type,isRequired,fallbackValueProvider, widgetFunctionProvider)
        {
            this.CustomResourceHandleNamespace = customResourceHandleNamespace;
        }


        public string Name { get; private set; }
        public Type Type{ get; private set; }
        public bool IsRequired{ get; private set; }
        public BaseValueProvider FallbackValueProvider{ get; private set; }
        public WidgetFunctionProvider WidgetFunctionProvider{ get; private set; }

        public string CustomLabel { get; set; }

        public string CustomHelpText { get; set; }

        public string CustomResourceHandleNamespace { get; private set; }

	}
}
