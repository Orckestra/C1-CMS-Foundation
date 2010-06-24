using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Collections;
using Composite.Types;
using Composite.Data;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter.Foundation
{
    public static class ListPropertyNamesHelper
    {
        public static IEnumerable GetOptionsWithReferences(string typeManagerName)
        {
            Type t = TypeManager.GetType(typeManagerName);
            IEnumerable<ForeignPropertyInfo> foreignKeyProperties = DataReferenceFacade.GetForeignKeyPropertyInfos(t);
            List<PropertyInfo> properties = t.GetPropertiesRecursively(f=>f.DeclaringType!=typeof(IData));

            List<string> result = new List<string>();

            foreach (PropertyInfo propertyInfo in properties)
            {
                result.Add( propertyInfo.Name);
                ForeignPropertyInfo foreignKeyInfo = foreignKeyProperties.FirstOrDefault(f=>f.SourcePropertyName==propertyInfo.Name);

                if (foreignKeyInfo!=null)
                {
                    List<PropertyInfo> foreignProperties = foreignKeyInfo.TargetType.GetPropertiesRecursively(f=>f.DeclaringType!=typeof(IData));

                    foreach (PropertyInfo foreignPropertyInfo in foreignProperties)
                    {
                        string foreignKey = string.Format("{0}.{1}", propertyInfo.Name, foreignPropertyInfo.Name );
                        result.Add( foreignKey);
                    }

                }
            }

            return result;
        }


        public static IEnumerable GetOptions(string typeManagerName)
        {
            Type t = TypeManager.GetType(typeManagerName);

            List<PropertyInfo> properties = t.GetPropertiesRecursively();

            List<string> result = new List<string>();

            result.AddRange(
                from property in properties
                where property.DeclaringType != typeof(IData)
                select property.Name);

            return result;
        }

    }
}
