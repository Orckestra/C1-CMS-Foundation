using System;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
	internal class FunctionParameterHolder
	{
		public string Name { get; set; }
		public Type Type { get; set; }
		public WidgetFunctionProvider WidgetProvider { get; private set; }
		public FunctionParameterAttribute Attribute { get; set; }

		public FunctionParameterHolder(string name, Type type, FunctionParameterAttribute att, WidgetFunctionProvider widgetProvider)
		{
			Name = name;
			Type = type;
			Attribute = att;

			WidgetProvider = widgetProvider;
		}

		public void SetValue(object obj, object value)
		{
			obj.GetType().GetProperty(Name).SetValue(obj, value, null);
		}
	}
}
