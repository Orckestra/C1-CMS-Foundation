using System.Reflection;


namespace Composite.Data
{
	internal static class DataKeyPropertyCollectionExtensionMethods
	{
        public static DataKeyPropertyCollection CreateDataKeyPropertyCollection(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            var dataKeyPropertyCollection = new DataKeyPropertyCollection();

            foreach (PropertyInfo propertyInfo in data.GetKeyProperties())
            {
                object value = propertyInfo.GetValue(data, null);

                dataKeyPropertyCollection.AddKeyProperty(propertyInfo, value);
            }

            return dataKeyPropertyCollection;
        }
	}
}
