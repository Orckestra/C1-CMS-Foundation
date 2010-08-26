using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.DynamicTypes;
using Composite.Core.Logging;
using Composite.Core.Extensions;
using Composite.Core.Types;

namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class ValidationHelper
    {
        private class ValidationInfo
        {
            public List<Pair<PropertyInfo, int>> MaxStringLengthByField;
        }

        private static readonly Cache<Type, ValidationInfo> _validationInfoCache = new Cache<Type, ValidationInfo>("XmlDataProvider.ValidationInfo", 200);
        private static readonly object[] EmptyParameterList = new object[0];

        public static void Validate(IData datum)
        {
            Type type = datum.DataSourceId.InterfaceType;

            ValidationInfo info = _validationInfoCache.Get(type);
            if(info == null)
            {
                lock(_validationInfoCache)
                {
                    info = _validationInfoCache.Get(type);
                    if(info == null)
                    {
                        info = new ValidationInfo { MaxStringLengthByField = new List<Pair<PropertyInfo, int>>() };

                        foreach(PropertyInfo propertyInfo in type.GetProperties())
                        {
                            if(propertyInfo.PropertyType != typeof(string)) continue;

                            object[] attributes = propertyInfo.GetCustomAttributes(typeof(StoreFieldTypeAttribute), false);
                            if(attributes.Length > 1)
                            {
                                LoggingService.LogError(typeof(ValidationHelper).Name, "Encoutered more than one '{0}' attrubute".FormatWith(typeof(StoreFieldTypeAttribute).FullName));
                                continue;
                            }

                            if (attributes.Length == 0) continue;


                            var storeFieldTypeAttr = attributes[0] as StoreFieldTypeAttribute;
                            StoreFieldType storeFieldType = storeFieldTypeAttr.StoreFieldType;

                            if (storeFieldType.IsLargeString || !storeFieldType.IsString) 
                            {
                                continue;
                            }

                            info.MaxStringLengthByField.Add(new Pair<PropertyInfo, int>(propertyInfo, storeFieldType.MaximumLength));
                        }

                        _validationInfoCache.Add(type, info);
                    }
                }
            }

            foreach(Pair<PropertyInfo, int> pair in info.MaxStringLengthByField)
            {
                string fieldValue = pair.First.GetValue(datum, EmptyParameterList) as string;
                if (fieldValue != null && fieldValue.Length > pair.Second)
                {
                    Verify.ThrowInvalidOperationException("Constraint violation. Value for field '{0}' on data type '{1}' is longer than {2} symbols.".FormatWith(pair.First.Name, type.FullName, pair.Second));
                }
            }
        }
    }
}
