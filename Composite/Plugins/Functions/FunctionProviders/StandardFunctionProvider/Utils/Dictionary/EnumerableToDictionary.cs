using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Collections;
using Composite.Functions;
using System.Reflection;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Dictionary
{
    internal class EnumerableToDictionary : StandardFunctionBase
    {
        public EnumerableToDictionary(EntityTokenFactory entityTokenFactory)
            : base("EnumerableToDictionary", "Composite.Utils.Dictionary", typeof(IDictionary), entityTokenFactory)
        {
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IEnumerable elements = parameters.GetParameter<IEnumerable>("Elements");
            string keyPropertyName = parameters.GetParameter<string>("KeyPropertyName");
            string valuePropertyName = parameters.GetParameter<string>("ValuePropertyName");

            Dictionary<string, string> resultDictionary = new Dictionary<string, string>();

            PropertyInfo keyPropertyInfo = null;
            PropertyInfo valuePropertyInfo = null;
            foreach (object element in elements)
            {
                if (keyPropertyInfo == null)
                {
                    keyPropertyInfo = element.GetType().GetProperty(keyPropertyName);
                }

                if (valuePropertyInfo == null)
                {
                    valuePropertyInfo = element.GetType().GetProperty(valuePropertyName);
                }

                string keyValue = keyPropertyInfo.GetValue(element, null).ToString();
                string valueValue = valuePropertyInfo.GetValue(element, null).ToString();

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
                    "Elements", typeof(IEnumerable), true, new NoValueValueProvider(), null);

                yield return new StandardFunctionParameterProfile(
                    "KeyPropertyName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "ValuePropertyName", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }
    }
}
