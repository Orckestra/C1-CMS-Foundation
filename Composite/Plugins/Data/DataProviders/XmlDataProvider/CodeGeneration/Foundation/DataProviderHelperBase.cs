using System;
using System.Globalization;
using System.Linq.Expressions;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data;
using System.Threading;

namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class DataProviderHelperBase : IXmlDataProviderHelper
    {
        /// <exclude />
        protected ConstructorInfo _idClassConstructor;

        /// <exclude />
        protected ConstructorInfo _wrapperClassConstructor;

        /// <exclude />
        protected Hashtable<Type, Hashtable<string, Delegate>> _selectFunctionCache = new Hashtable<Type, Hashtable<string, Delegate>>();

        /// <exclude />
        public abstract Type _InterfaceType { get; }

        /// <exclude />
        public abstract Type _DataIdType { get; }


        /// <exclude />
        public Func<XElement, T> CreateSelectFunction<T>(string providerName) where T : IData
        {
            Type type = typeof(T);

            var cache = _selectFunctionCache[typeof(T)];

            if (cache == null)
            {
                lock (_selectFunctionCache)
                {
                    cache = _selectFunctionCache[type];

                    if (cache == null)
                    {
                        cache = new Hashtable<string, Delegate>();
                        _selectFunctionCache.Add(type, cache);
                    }
                }
            }

            CultureInfo cultureInfo = LocalizationScopeManager.MapByType(type);
            DataScopeIdentifier dataScopeIdentifier = DataScopeManager.MapByType(type);

            string cacheKey = cultureInfo + "|" + dataScopeIdentifier.Name;

            Delegate result = cache[cacheKey];

            if (result == null)
            {
                lock (this)
                {
                    result = cache[cacheKey];
                    if (result == null)
                    {
                        // element => new [WrapperClass](element, new DataSourceId(new [DataIdClass](element), providerName, type, dataScope, localizationScope)), element
                        ParameterExpression parameterExpression = Expression.Parameter(typeof(XElement), "element");
                        result = Expression.Lambda<Func<XElement, T>>(
                            Expression.New(_wrapperClassConstructor,
                            new Expression[]
                                {
                                    parameterExpression,
                                    Expression.New(GeneretedClassesMethodCache.DataSourceIdConstructor2,
                                    new Expression[]
                                        {
                                            Expression.New(_idClassConstructor, new Expression[] { parameterExpression }), 
                                            Expression.Constant(providerName, typeof(string)), 
                                            Expression.Constant(type, typeof(Type)), 
                                            Expression.Constant(dataScopeIdentifier, typeof(DataScopeIdentifier)), 
                                            Expression.Constant(cultureInfo, typeof(CultureInfo))
                                        })
                                }), new[] { parameterExpression }).Compile();
                        cache.Add(cacheKey, result);
                    }
                }
            }
            return (Func<XElement, T>)result;
        }


        /// <exclude />
        public abstract IDataId CreateDataId(XElement xElement);


        /// <exclude />
        public abstract void ValidateDataType(IData data);


        /// <exclude />
        public abstract T CreateNewElement<T>(IData data, out XElement newElement, string elementName, string providerName) where T : IData;


        /// <summary>
        /// CodeDom does not support '^' operatior, so this method is used instead
        /// </summary>
        public static Int32 Xor(int a, int b)
        {
            return a ^ b;
        }

        /// <summary>
        /// Parses a decimal value, sets the correct precision.
        /// </summary>
        public static Decimal ParseDecimal(string value, int precision)
        {
            if(precision >= 1 || precision <= 4)
            {
                // DDZ: check if has to be done in "chinese" style for optimal permormance
                int comaIndex = value.IndexOf(".");
                if(comaIndex < 0)
                {
                    value += "." + new string('0', precision);
                }
                else
                {
                    int zerosToAdd = precision - (value.Length - comaIndex - 1);
                    if(zerosToAdd > 0)
                    {
                        value += new string('0', zerosToAdd);
                    }
                }
            }

            value = value.Replace(".", System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator);

            return Decimal.Parse(value);
        }
    }
}
