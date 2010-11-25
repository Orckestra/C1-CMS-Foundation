using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Core.Types;


namespace Composite.Data.Hierarchy.DataAncestorProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyDataAncestorProviderAttribute : Attribute
    {
        private string _idPropertyName;
        private string _parentIdPropertyName;
        private Type _parentDataType;
        private object _nullValue;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idPropertyName">The name of the property that contains the value of the parent id property</param>
        /// <param name="parentDataType">The type of the parent</param>
        /// <param name="parentIdPropertyName">The name of the id property on the parent</param>
        /// <param name="nullValue"></param>
        public PropertyDataAncestorProviderAttribute(string idPropertyName, Type parentDataType, string parentIdPropertyName, object nullValue)
        {
            _idPropertyName = idPropertyName;            
            _parentDataType = parentDataType;
            _parentIdPropertyName = parentIdPropertyName;
            _nullValue = nullValue;
        }


        public string IdPropertyName
        {
            get { return _idPropertyName; }
        }

        public string ParentIdPropertyName
        {
            get { return _parentIdPropertyName; }
        }

        public Type ParentDataType
        {
            get { return _parentDataType; }
        }

        public object NullValue
        {
            get { return _nullValue; }
        }
    }





    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyDataAncestorProvider : IDataAncestorProvider
    {
        private Dictionary<Type, Entry> _methodInfoCache = new Dictionary<Type, Entry>();



        public IData GetParent(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            Entry entry = GetEntry(data.GetType());
            object propertyValue = entry.PropertyValueMethodInfo.Invoke(data, null);

            if (entry.PropertyValueMethodInfo.ReturnType == typeof(Guid))
            {
                if (Equals(propertyValue, Guid.Empty) == true) return null;
            }
            else
            {
                if (Equals(propertyValue, entry.NullValue) == true) return null;
            }

            using (DataScope dataScope = new DataScope(data.DataSourceId.DataScopeIdentifier))
            {
                List<object> queryResult = GetQueryResult(entry.ParentDataType, entry.ParentIdPropertyName, propertyValue);

                if (queryResult.Count == 0) throw new InvalidOperationException(string.Format("The parent of the type {0} with the id ({1}) value of {2} was not found", entry.ParentDataType, entry.ParentIdPropertyName, propertyValue));
                if (queryResult.Count > 1) throw new InvalidOperationException(string.Format("More than one parent of the type {0} with the id ({1}) value of {2} was found", entry.ParentDataType, entry.ParentIdPropertyName, propertyValue));

                return (IData)queryResult[0];
            }
        }



        private Entry GetEntry(Type dataType)
        {
            Entry entry;

            if (_methodInfoCache.TryGetValue(dataType, out entry) == false)
            {
                List<PropertyDataAncestorProviderAttribute> attributes = dataType.GetCustomInterfaceAttributes<PropertyDataAncestorProviderAttribute>().ToList();

                if (attributes.Count == 0) throw new InvalidOperationException(string.Format("Missing {0} attribute on the data type {1}", typeof(PropertyDataAncestorProviderAttribute), dataType));
                if (attributes.Count > 1) throw new InvalidOperationException(string.Format("Only one {0} attribute is allowed on the data type {1}", typeof(PropertyDataAncestorProviderAttribute), dataType));

                PropertyDataAncestorProviderAttribute attribute = attributes[0];

                PropertyInfo propertyInfo = dataType.GetProperty(attribute.IdPropertyName);
                if (propertyInfo == null) throw new InvalidOperationException(string.Format("No property named {0} (as specified on the PropertyDataAncestorProivder) on the type {1}", attribute.IdPropertyName, dataType));

                MethodInfo methodInfo = propertyInfo.GetGetMethod();
                if (methodInfo == null) throw new InvalidOperationException(string.Format("Missing get property named {0} (as specified on the PropertyDataAncestorProivder) on the type {1}", attribute.IdPropertyName, dataType));

                if (typeof(IData).IsAssignableFrom(attribute.ParentDataType) == false) throw new InvalidOperationException(string.Format("The parent type ({0}) should be of type {1}", attribute.ParentDataType, typeof(IData)));
                if (attribute.ParentDataType.GetProperty(attribute.ParentIdPropertyName) == null) throw new InvalidOperationException(string.Format("The id property named {0} is missing from the parent type {1}", attribute.IdPropertyName, attribute.ParentDataType));

                entry = new Entry
                    {
                        PropertyValueMethodInfo = methodInfo,                        
                        ParentDataType = attribute.ParentDataType,
                        ParentIdPropertyName = attribute.ParentIdPropertyName,
                        NullValue = attribute.NullValue,
                    };

                _methodInfoCache.Add(dataType, entry);
            }

            return entry;
        }



        private List<object> GetQueryResult(Type dataType, string idPropertyName, object value)
        {
            ParameterExpression parameter = Expression.Parameter(dataType, "parameter");
            Expression body = Expression.Equal(Expression.Property(parameter, idPropertyName), Expression.Constant(value));
            LambdaExpression lambda = Expression.Lambda(body, parameter);

            MethodInfo getDataMethod = DataFacade.GetGetDataMethodInfo(dataType);

            IQueryable queryable = (IQueryable)getDataMethod.Invoke(null, new object[] { true, null });

            Expression whereExpression = ExpressionCreator.Where(queryable.Expression, lambda);

            IEnumerable enumerable = (IEnumerable)queryable.Provider.CreateQuery(whereExpression);

            return enumerable.ToListOfObjects();
        }



        private sealed class Entry
        {
            public MethodInfo PropertyValueMethodInfo { get; set; }            
            public Type ParentDataType { get; set; }
            public string ParentIdPropertyName { get; set; }
            public object NullValue { get; set; }
        }
    }
}
