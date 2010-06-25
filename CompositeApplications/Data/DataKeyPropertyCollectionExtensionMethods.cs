using System;
using System.Reflection;


namespace Composite.Data
{
	internal static class DataKeyPropertyCollectionExtensionMethods
	{
        public static DataKeyPropertyCollection CreateDataKeyPropertyCollection(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            DataKeyPropertyCollection dataKeyPropertyCollection = new DataKeyPropertyCollection();

            foreach (PropertyInfo propertyInfo in data.GetKeyPropertyInfoes())
            {
                object value = propertyInfo.GetValue(data, null);

                dataKeyPropertyCollection.AddKeyProperty(propertyInfo, value);
            }

            return dataKeyPropertyCollection;
        }
	}
}
