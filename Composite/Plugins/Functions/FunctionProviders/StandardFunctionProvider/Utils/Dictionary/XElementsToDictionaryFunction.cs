using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Dictionary
{
    internal class XElementsToDictionaryFunction : StandardFunctionBase
    {
        public XElementsToDictionaryFunction(EntityTokenFactory entityTokenFactory)
            : base("XElementsToDictionary", "Composite.Utils.Dictionary", typeof(IDictionary), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IEnumerable<XElement> elements = parameters.GetParameter<IEnumerable<XElement>>("XElements");
            string keyAttributeName = parameters.GetParameter<string>("KeyAttributeName");
            string valueAttributeName = parameters.GetParameter<string>("ValueAttributeName");

            Dictionary<string, string> resultDictionary = new Dictionary<string, string>();
            foreach (XElement element in elements)
            {
                XAttribute keyAttribute = element.Attribute(keyAttributeName);
                XAttribute valueAttribute = element.Attribute(valueAttributeName);

                string keyValue = keyAttribute != null ? keyAttribute.Value : null;
                string valueValue = valueAttribute != null ? valueAttribute.Value : null;

                resultDictionary.Add(keyValue, valueValue);

            }

            return resultDictionary;
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;
                
                yield return new StandardFunctionParameterProfile(
                    "XElements", typeof(IEnumerable<XElement>), true, new NoValueValueProvider(), null);

                yield return new StandardFunctionParameterProfile(
                    "KeyAttributeName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "ValueAttributeName", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }
    }
}
