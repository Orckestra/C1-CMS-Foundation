using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using Composite.Data.DynamicTypes;
using System.Xml.Linq;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
    internal static class DataInstanceHelper
    {
        public static BaseValueProvider GetFallbackValueProvider(DataFieldDescriptor dataFieldDescriptor, bool isKeyProperty)
        {
            if (dataFieldDescriptor.DefaultValue != null)
            {
                return new ConstantValueProvider(dataFieldDescriptor.DefaultValue.Value);
            }

            Type instanceType = GetInstanceType(dataFieldDescriptor);
            if (instanceType == typeof(int))
            {
                return new ConstantValueProvider(0);
            }
            else if (instanceType == typeof(decimal))
            {
                return new ConstantValueProvider(0.0);
            }
            else if (instanceType == typeof(bool))
            {
                return new ConstantValueProvider(false);
            }
            else if (instanceType == typeof(string))
            {
                return new ConstantValueProvider("");
            }
            else if (instanceType == typeof(Guid))
            {
                if (isKeyProperty)
                {
                    return new ConstantValueProvider(Guid.NewGuid());
                }
                else
                {
                    return new ConstantValueProvider(Guid.Empty);
                }
            }
            else if (instanceType == typeof(DateTime))
            {
                return new ConstantValueProvider(DateTime.Now);
            }
            else
            {
                return new ConstantValueProvider("");
            }
        }



        public static WidgetFunctionProvider GetWidgetFunctionProvider(DataFieldDescriptor dataFieldDescriptor)
        {
            if ((dataFieldDescriptor.FormRenderingProfile != null) && (string.IsNullOrEmpty(dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup) == false))
            {
                WidgetFunctionProvider widgetFunctionProvider = new WidgetFunctionProvider(XElement.Parse(dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup));
                return widgetFunctionProvider;
            }
            else
            {
                return StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(dataFieldDescriptor.InstanceType);
            }
        }



        public static Type GetInstanceType(DataFieldDescriptor dataFieldDescriptor)
        {
            Type instanceType = dataFieldDescriptor.InstanceType;
            if (instanceType.IsGenericType && instanceType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                instanceType = instanceType.GetGenericArguments().First();
            }

            return instanceType;
        }
    }
}
