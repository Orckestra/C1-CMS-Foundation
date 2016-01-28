using System.Xml.Linq;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Utils
{
    internal sealed class ConsoleIconSelectorWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "ConsoleIconSelector";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Utils." + _functionName;


        public ConsoleIconSelectorWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement formElement = base.BuildBasicWidgetMarkup("ConsoleIconSelector", "Selected", label, help, bindingSourceName);
            return formElement;
        }

    }
}
