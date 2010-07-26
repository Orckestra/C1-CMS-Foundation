using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using Composite.ResourceSystem.Plugins.ResourceProvider;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.StandardPlugins.ResourceSystem.PropertyResourceProvider
{
    [ConfigurationElementType(typeof(NonConfigurableResourceProvider))]
    internal sealed class PropertyResourceProvider : IStringResourceProvider
	{
        public string GetStringValue(string stringId, CultureInfo cultureInfo)
        {
            int index = stringId.LastIndexOf('.');
            if (index == -1) throw new InvalidOperationException(string.Format("'{0}' is not of correct format", stringId));

            string typeName = stringId.Substring(0, index);
            string propertyName = stringId.Substring(index + 1);

            Type type = TypeManager.GetType(typeName);
            if (type == null) throw new InvalidOperationException(string.Format("'{0}' type could not found", typeName));

            PropertyInfo propertyInfo = type.GetProperty(propertyName, BindingFlags.Public | BindingFlags.Static);

            if (propertyInfo == null) throw new InvalidOperationException(string.Format("The property '{0}' on the type '{1}' could not be found", propertyInfo));

            return (string)propertyInfo.GetValue(null, null);
        }



        public IDictionary<string, string> GetAllStrings(CultureInfo cultureInfo)
        {
            return new Dictionary<string, string>();
        }



        public IEnumerable<CultureInfo> GetSupportedCultures()
        {
            yield break;
        }        
    }
}
