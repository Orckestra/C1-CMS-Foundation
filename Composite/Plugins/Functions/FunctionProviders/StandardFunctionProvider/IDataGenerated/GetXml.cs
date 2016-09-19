using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Caching;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Functions;
using Composite.Core.Linq;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter.Foundation;
using Composite.Core.Types;
using Composite.Core.Extensions;
using Composite.Core.Collections.Generic;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
    internal class GetXmlCacheRecord
    {
        public int Version;
        public IEnumerable<XElement> Result;
    }

    internal class QueryInfo
    {
        public IEnumerable<Type> ReferencedDataTypes;
        public bool HasPublishableReference;
        public bool HasLocalizableReference;
    }


    internal sealed class GetXml<T> : StandardFunctionBase
        where T : class, IData
    {
        private static readonly ICache<string, GetXmlCacheRecord> ResultCache =
            CacheManager.Get<string, GetXmlCacheRecord>("GetXml results", new CacheSettings(CacheType.Mixed) { Size = 2500 });

        private static readonly Hashtable<string, QueryInfo> _queryInfoTable = new Hashtable<string, QueryInfo>();

        private List<string> _propertyNames;
        private List<PropertyInfo> _propertyInfos;
        private object _lock = new object();

        public GetXml(EntityTokenFactory entityTokenFactory)
            : base("Get" + typeof(T).Name + "Xml", typeof(T).FullName, typeof(IEnumerable<XElement>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.GetXml";
        }


        private List<PropertyInfo> GetPropertyInfos()
        {
            if (_propertyInfos == null)
            {
                lock (_lock)
                {
                    if (_propertyInfos == null)
                    {
                        var result = new List<PropertyInfo>(typeof (T).GetKeyProperties());

                        PropertyInfo labelPropertyInfo = typeof (T).GetLabelPropertyInfo();

                        if (!result.Any(f => f.Name == labelPropertyInfo.Name))
                        {
                            result.Add(labelPropertyInfo);
                        }

                        _propertyInfos = result;
                    }
                }
            }

            return _propertyInfos;
        }

        private List<string> GetPropertyNames()
        {
            List<string> result = _propertyNames;

            if (result == null)
            {
                lock (_lock)
                {
                    result = _propertyNames;
                    if (result == null)
                    {
                        result = GetPropertyInfos().Select(f => f.Name).ToList();
                        _propertyNames = result;
                    }
                }
            }

            return result;
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider orderBySelector =
                    StandardWidgetFunctions.DropDownList(
                        typeof(ListPropertyNamesHelper),
                        "GetOptions",
                        TypeManager.SerializeType(typeof(T)),
                        false,
                        true,
                        true);

                WidgetFunctionProvider propertyNamesSelector =
                    StandardWidgetFunctions.DropDownList(
                        typeof(ListPropertyNamesHelper),
                        "GetOptionsWithReferences",
                        TypeManager.SerializeType(typeof(T)),
                        true,
                        true,
                        true);

                yield return new StandardFunctionParameterProfile(
                    "PropertyNames",
                    typeof(IEnumerable<string>),
                    true,
                    new ConstantValueProvider(GetPropertyNames()),
                    propertyNamesSelector);

                Expression<Func<T, bool>> defaultFilter = DataFacade.GetEmptyPredicate<T>();

                yield return new StandardFunctionParameterProfile(
                    "Filter",
                    typeof(Expression<Func<T, bool>>),
                    false,
                    new ConstantValueProvider(defaultFilter),
                    null);

                yield return new StandardFunctionParameterProfile(
                    "OrderByField",
                    typeof(string),
                    false,
                    new ConstantValueProvider(""),
                    orderBySelector);

                yield return new StandardFunctionParameterProfile(
                    "OrderAscending",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Order ascending (a-z)", "Order descending (z-a)"));

                yield return new StandardFunctionParameterProfile(
                    "PageSize",
                    typeof(int),
                    false,
                    new ConstantValueProvider(1000),
                    StandardWidgetFunctions.IntegerTextBoxWidget);

                yield return new StandardFunctionParameterProfile(
                    "PageNumber",
                    typeof(int),
                    false,
                    new ConstantValueProvider(1),
                    StandardWidgetFunctions.IntegerTextBoxWidget);


                yield return new StandardFunctionParameterProfile(
                    "ShowReferencesInline",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, show reference type data as attributes", "No, show as XML elements"));


                yield return new StandardFunctionParameterProfile(
                    "IncludePagingInfo",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, add item/page count details", "No, do not calculate paging info"));


                var randomizedParam = new StandardFunctionParameterProfile(
                    "Randomized",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, randomize selection. Use the 'Page size' for number of random elements.", "No, behave consistently"));
                yield return randomizedParam;


                var elementNameParam = new StandardFunctionParameterProfile(
                    "ElementName",
                    typeof(string),
                    false,
                    new ConstantValueProvider(typeof(T).Name),
                    StandardWidgetFunctions.TextBoxWidget);
                elementNameParam.CustomHelpText = string.Format("The name of the XML element. The detault is '{0}'", typeof(T).Name);
                yield return elementNameParam;


                var elementNamespaceParam = new StandardFunctionParameterProfile(
                    "ElementNamespace",
                    typeof(XNamespace),
                    false,
                    new ConstantValueProvider(XNamespace.None),
                    StandardWidgetFunctions.TextBoxWidget);
                elementNamespaceParam.CustomHelpText = string.Format("The namespace the XML element belongs to. The detault is '{0}'", XNamespace.None);
                yield return elementNamespaceParam;

                WidgetFunctionProvider cachePriorityDropDown = StandardWidgetFunctions.DropDownList(
                    this.GetType(), "GetCachePriorities", "Key", "Value", false, true);


                yield return new StandardFunctionParameterProfile(
                    "CachePriority",
                    typeof(GetXmlCachePriority),
                    false,
                    new ConstantValueProvider(GetXmlCachePriority.Default),
                    cachePriorityDropDown);
            }
        }

        /// <summary>
        /// To be called though reflection
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<KeyValuePair<GetXmlCachePriority, string>> GetCachePriorities()
        {
            yield return new KeyValuePair<GetXmlCachePriority, string>(GetXmlCachePriority.Disabled, "Disabled");
            yield return new KeyValuePair<GetXmlCachePriority, string>(GetXmlCachePriority.Default, "Default");
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            List<string> propertyNames = parameters.GetParameter<IEnumerable<string>>("PropertyNames").ToList();
            Expression<Func<T, bool>> filter = parameters.GetParameter<Expression<Func<T, bool>>>("Filter");

            string elementName = parameters.GetParameter<string>("ElementName");
            string namespaceString = parameters.GetParameter<string>("ElementNamespace");
            string orderByField = parameters.GetParameter<string>("OrderByField");
            bool orderAscending = parameters.GetParameter<bool>("OrderAscending");
            int pageSize = parameters.GetParameter<int>("PageSize");
            int pageNumber = parameters.GetParameter<int>("PageNumber");
            bool showReferencesInline = parameters.GetParameter<bool>("ShowReferencesInline");
            bool includePagingInfo = parameters.GetParameter<bool>("IncludePagingInfo");
            bool randomized = parameters.GetParameter<bool>("Randomized");
            GetXmlCachePriority cachePriority = parameters.GetParameter<GetXmlCachePriority>("CachePriority");

            int queryVersion = 0;

            bool cachingEnabled = cachePriority != GetXmlCachePriority.Disabled;
            string cacheKey = null;

            if (cachingEnabled)
            {
                cacheKey = GetCacheKey(propertyNames, filter, elementName, namespaceString, orderByField, orderAscending, pageSize, pageNumber, showReferencesInline, includePagingInfo, randomized);
                if (cacheKey != null)
                {
                    queryVersion = GetQueryVersion(propertyNames);

                    GetXmlCacheRecord cacheRecord = ResultCache.Get(cacheKey);
                    if (cacheRecord != null && cacheRecord.Version == queryVersion)
                    {
                        return cacheRecord.Result;
                    }
                }
            }

            XNamespace elementNamespace = (string.IsNullOrEmpty(namespaceString) ? XNamespace.None : namespaceString);

            LambdaExpression orderByExpression;

            if (string.IsNullOrEmpty(orderByField))
            {
                orderByField = propertyNames.FirstOrDefault(f => f.Contains(".") == false);
                if (!randomized && !orderByField.IsNullOrEmpty())
                {
                    orderByExpression = DataToXElements<T>.GetOrderByPropertyNameExpression(orderByField);
                }
                else
                {
                    orderByExpression = DataFacade.GetEmptyPredicate<T>();
                }
            }
            else
            {
                orderByExpression = DataToXElements<T>.GetOrderByPropertyNameExpression(orderByField);
            }

            IEnumerable<XElement> result = DataToXElements<T>.GetXElements(
                filter,
                orderByExpression,
                orderAscending,
                pageSize,
                pageNumber,
                propertyNames,
                elementNamespace,
                elementName,
                showReferencesInline,
                includePagingInfo,
                randomized);

            if (cachingEnabled && cacheKey != null)
            {
                result = result.ToList();
                ResultCache.Add(cacheKey, new GetXmlCacheRecord { Result = result, Version = queryVersion });
            }

            return result;
        }

        private static QueryInfo GetQueryInfo(IEnumerable<string> propertyNames)
        {
            string key = string.Join("|", propertyNames);

            QueryInfo queryInfo = _queryInfoTable[key];

            if (queryInfo != null) return queryInfo;


            lock (_queryInfoTable)
            {
                queryInfo = _queryInfoTable[key];
                if (queryInfo != null) return queryInfo;

                queryInfo = new QueryInfo();
                queryInfo.HasLocalizableReference = DataLocalizationFacade.IsLocalized(typeof(T));
                queryInfo.HasPublishableReference = DataFacade.GetSupportedDataScopes(typeof(T)).Count() > 1;

                List<Type> relatedTypesList = new List<Type>();

                foreach (string propertyName in propertyNames.Where(f => f.Contains(".")))
                {
                    string foreignKeyPropertyName = propertyName.Substring(0, propertyName.IndexOf("."));
                    ForeignPropertyInfo keyInfo = DataReferenceFacade.GetForeignKeyPropertyInfo(typeof(T),
                                                                                                foreignKeyPropertyName);

                    Type targetType = keyInfo.TargetType;
                    if (!relatedTypesList.Contains(targetType))
                    {
                        relatedTypesList.Add(targetType);
                    }

                    queryInfo.HasLocalizableReference = queryInfo.HasLocalizableReference || DataLocalizationFacade.IsLocalized(targetType);
                    queryInfo.HasPublishableReference = queryInfo.HasPublishableReference || (DataFacade.GetSupportedDataScopes(targetType).Count() > 1);
                }

                queryInfo.ReferencedDataTypes = relatedTypesList;

                _queryInfoTable.Add(key, queryInfo);
                return queryInfo;
            }
        }

        private static int GetQueryVersion(IEnumerable<string> propertyNames)
        {
            int result = TableVersion.Get(typeof(T));

            QueryInfo queryInfo = GetQueryInfo(propertyNames);

            foreach (Type t in queryInfo.ReferencedDataTypes)
            {
                result += TableVersion.Get(t);
            }

            return result;
        }

        private static string GetCacheKey(List<string> propertyNames, Expression filter, string elementName, string namespaceString, string orderByField, bool orderAscending, int pageSize, int pageNumber, bool showReferencesInline, bool includePagingInfo, bool randomized)
        {
            if (randomized) return null;

            string filterKey = string.Empty;

            if (filter != null)
            {
                filterKey = filter.BuildCacheKey();
                if (filterKey == null) return null;
            }

            var result = new StringBuilder();

            result.Append(typeof(T).FullName).Append(',');

            QueryInfo qi = GetQueryInfo(propertyNames);

            if (qi.HasPublishableReference)
            {
                var currentDataScope = DataScopeManager.CurrentDataScope;
                if (currentDataScope != null)
                {
                    result.Append(currentDataScope.ToString()).Append(',');
                }
            }

            if (qi.HasLocalizableReference)
            {
                var languageScope = LocalizationScopeManager.CurrentLocalizationScope;
                if (languageScope != null)
                {
                    result.Append(languageScope.ToString()).Append(',');
                }
            }

            result.Append(string.Join("*", propertyNames)).Append("|");
            result.Append(elementName ?? string.Empty).Append(',');
            result.Append(namespaceString ?? string.Empty).Append(',');
            result.Append(orderByField ?? string.Empty).Append(',');
            result.Append(orderAscending ? '1' : '0').Append(',');
            result.Append(pageSize).Append(',');
            result.Append(pageNumber).Append(',');
            result.Append(showReferencesInline ? '1' : '0');
            result.Append(includePagingInfo ? '1' : '0').Append('|');
            result.Append(filterKey);

            return result.ToString();
        }
    }

    internal static class DataToXElements<T> where T : class, IData
    {
        private static readonly Dictionary<Type, IOrderByTypeFixer<T>> __orderByTypeFixers = new Dictionary<Type, IOrderByTypeFixer<T>>();
        private static readonly object _lock = new object();

        public static LambdaExpression GetOrderByPropertyNameExpression(string propertyName)
        {
            PropertyInfo orderByPropertyInfo = typeof(T).GetDataPropertyRecursivly(propertyName);

            IOrderByTypeFixer<T> orderByFixer = GetOrderByTypeFixer(orderByPropertyInfo);
            return orderByFixer.GetOrderByPropertyNameExpression(orderByPropertyInfo);
        }



        public static IEnumerable<XElement> GetXElements(
            Expression<Func<T, bool>> filter,
            LambdaExpression orderBy,
            bool orderAscending,
            int coreElementItemsPerPage,
            int coreElementPageNumber,
            IEnumerable<string> propertyNames,
            XNamespace elementNamespace,
            string elementNameString,
            bool showReferencesInline,
            bool showPagingInfo,
            bool randomized)
        {
            List<string> propertyNameList = new List<string>(propertyNames);
            List<string> autoAppendedPropertyNames = new List<string>();
            List<string> referencedIdAttrubuteNames = new List<string>();

            XName coreElementName = elementNamespace + elementNameString;

            Dictionary<string, List<string>> referencesLookup = new Dictionary<string, List<string>>();

            foreach (string referencePropertyName in propertyNameList.Where(f => f.Contains(".")))
            {
                string[] referenceElements = referencePropertyName.Split('.');
                if (referenceElements.Length != 2) throw new InvalidOperationException(string.Format("Property names with a dot must have exactly one dot - failed to parse '{0}'", referencePropertyName));

                if (referencesLookup.ContainsKey(referenceElements[0]) == false)
                    referencesLookup.Add(referenceElements[0], new List<string>());

                referencesLookup[referenceElements[0]].Add(referenceElements[1]);
            }

            // rewrite with linq
            if (showReferencesInline)
            {
                // Ensure keys are included
                foreach (string referencePropertyName in referencesLookup.Keys)
                {
                    if (propertyNameList.Contains(referencePropertyName) == false)
                    {
                        propertyNameList.Add(referencePropertyName);
                        autoAppendedPropertyNames.Add(referencePropertyName);
                    }
                }
            }


            var result = new List<XElement>();

            Expression<Func<T, XElement>> xelementSelector = XElementSelectHelper<T>.BuildXElementSelector(propertyNameList.Where(f => f.IndexOf('.') == -1).ToList(), coreElementName);

            // TODO: handle case of the default sorting (by predicate element => true)
            IOrderByTypeFixer<T> orderByTypeFixer = GetOrderByTypeFixer(orderBy);
            IQueryable<T> coreDataItems = orderByTypeFixer.GetCastedIQueryable(filter, orderBy, orderAscending, coreElementItemsPerPage, coreElementPageNumber, randomized);

            if (randomized && referencesLookup.Any())
            {
                // performance hit! make elegant when time permits.
                coreDataItems = coreDataItems.ToList().AsQueryable();
            }

            // Perf. optimization
            if (coreDataItems.IsEnumerableQuery())
            {
                Func<T, XElement> compiledExpression = XElementSelectHelper<T>.GetCompiledFunction(xelementSelector);
                result.AddRange(Enumerable.Select(coreDataItems, compiledExpression));
            }
            else
            {
                result.AddRange(coreDataItems.Select(xelementSelector));
            }

            var referencedResults = new List<XElement>();

            // int referencedCoreElementCount = (orderByIsDeterministic ? coreElementItemsPerPage : int.MaxValue);
            foreach (string referencePropertyName in referencesLookup.Keys)
            {
                IReferencedDataHelper<T> fixer = ReferencedDataHelperBuilder<T>.Build(referencePropertyName);
                string propertyNamePrefix = (showReferencesInline ? referencePropertyName + "." : "");
                if (showReferencesInline)
                {
                    if (referencesLookup[referencePropertyName].Contains(fixer.TargetTypeKeyPropertyName) == false)
                    {
                        referencesLookup[referencePropertyName].Add(fixer.TargetTypeKeyPropertyName);
                        autoAppendedPropertyNames.Add(propertyNamePrefix + fixer.TargetTypeKeyPropertyName);
                    }
                    referencedIdAttrubuteNames.Add(propertyNamePrefix + fixer.TargetTypeKeyPropertyName);
                }
                XName referenceElementName = elementNamespace + referencePropertyName;
                IEnumerable<XElement> referencesXml = fixer.GetReferencedXElements(coreDataItems, referencesLookup[referencePropertyName], referenceElementName, propertyNamePrefix);
                referencedResults.AddRange(referencesXml);
            }

            if (showReferencesInline)
            {
                Dictionary<string, IEnumerable<XElement>> referencedElementsLookup = new Dictionary<string, IEnumerable<XElement>>();
                Dictionary<string, Func<string, XAttribute>> referencedElementLocatorLookup = new Dictionary<string, Func<string, XAttribute>>();

                foreach (string referencePropertyName in referencesLookup.Keys)
                {
                    XName referenceElementName = elementNamespace + referencePropertyName;

                    IEnumerable<XElement> referenceElements = referencedResults.Where(f => f.Name == referenceElementName);
                    referencedElementsLookup.Add(referencePropertyName, referenceElements);

                    string idPropertyName = referencedIdAttrubuteNames.First(g => g.StartsWith(referencePropertyName + "."));
                    IEnumerable<XElement> referencedElements = referencedElementsLookup[referencePropertyName];
                    Func<string, XAttribute> locateByKeyFunc = f => referencedElements.Attributes(idPropertyName).FirstOrDefault(g => g.Value == f);
                    referencedElementLocatorLookup.Add(referencePropertyName, locateByKeyFunc);
                }

                foreach (XElement coreElement in result.Where(f => f.Name == coreElementName))
                {
                    foreach (string referencePropertyName in referencesLookup.Keys)
                    {
                        XAttribute referenceAttribute = coreElement.Attribute(referencePropertyName);
                        if (referenceAttribute == null) continue; // Handles non-references

                        string keyValue = referenceAttribute.Value;
                        Func<string, XAttribute> fetcher = referencedElementLocatorLookup[referencePropertyName];
                        XAttribute matchingKeyAttribute = fetcher(keyValue);
                        if (matchingKeyAttribute != null)
                        {
                            XElement referenced = matchingKeyAttribute.Parent;
                            coreElement.Add(referenced.Attributes());
                        }
                    }

                    coreElement.Attributes().Where(f => autoAppendedPropertyNames.Contains(f.Name.LocalName)).Remove();

                    yield return coreElement;
                }
            }
            else
            {
                foreach (XElement anyElement in result)
                {
                    yield return anyElement;
                }

                foreach (XElement anyElement in referencedResults)
                {
                    yield return anyElement;
                }
            }

            if (showPagingInfo)
            {
                int totalItemCount = DataFacade.GetData<T>(filter).Count(); // TODO: there shoudn't be a query
                int firstShownElementNumber = ((coreElementPageNumber - 1) * coreElementItemsPerPage) + 1;
                int lastShownElementNumber = Math.Min(totalItemCount, firstShownElementNumber + (coreElementItemsPerPage - 1));
                int shownItemsCount = Math.Max(0, (lastShownElementNumber - firstShownElementNumber) + 1);

                int totelPageCount = (int)Math.Ceiling((((double)totalItemCount) / ((double)coreElementItemsPerPage)));

                XElement pagingInfo = new XElement(elementNamespace + "PagingInfo",
                    new XAttribute("CurrentPageNumber", coreElementPageNumber),
                    new XAttribute("TotalPageCount", totelPageCount),
                    new XAttribute("TotalItemCount", totalItemCount),
                    new XAttribute("ShownItemsCount", shownItemsCount),
                    new XAttribute("MaximumItemsPerPage", coreElementItemsPerPage)
                    );

                if (shownItemsCount > 0)
                {
                    pagingInfo.Add(
                        new XAttribute("CurrentItemNumberStart", firstShownElementNumber),
                        new XAttribute("CurrentItemNumberEnd", lastShownElementNumber)
                     );
                }

                yield return pagingInfo;
            }
        }



        private static IOrderByTypeFixer<T> GetOrderByTypeFixer(LambdaExpression orderByExpression)
        {
            Type expressionType = orderByExpression.GetType();
            Type[] expressionTypeGenericArguments = expressionType.GetGenericArguments();
            Type[] funcGenericArguments = expressionTypeGenericArguments[0].GetGenericArguments();
            Type orderByT = funcGenericArguments[1];
            return GetByTypeFixerImpl(orderByT);
        }


        private static DataToXElements<T>.IOrderByTypeFixer<T> GetByTypeFixerImpl(Type orderByT)
        {
            IOrderByTypeFixer<T> result;

            lock (_lock)
            {
                if (__orderByTypeFixers.TryGetValue(orderByT, out result) == false)
                {
                    Type[] genericArgs = new Type[] { typeof(T), orderByT };
                    result = (IOrderByTypeFixer<T>)Activator.CreateInstance(typeof(OrderByTypeFixer<>).MakeGenericType(genericArgs), null); ;
                    __orderByTypeFixers.Add(orderByT, result);
                }
            }
            return result;
        }


        private static IOrderByTypeFixer<T> GetOrderByTypeFixer(PropertyInfo orderByPropertyInfo)
        {
            return GetByTypeFixerImpl(orderByPropertyInfo.PropertyType);
        }


        private interface IOrderByTypeFixer<T2>
        {
            IQueryable<T2> GetCastedIQueryable(Expression<Func<T2, bool>> filter, LambdaExpression orderBy, bool orderAscending, int coreElementItemsPerPage, int coreElementPageNumber, bool randomized);
            LambdaExpression GetOrderByPropertyNameExpression(PropertyInfo orderByPropertyInfo);
        }


        private class OrderByTypeFixer<OrderKeyT> : IOrderByTypeFixer<T>
        {
            private static readonly Hashtable<object, object> _compiledExpressions = new Hashtable<object, object>();

            private static Func<T, OrderKeyT> CompileExpression(Expression<Func<T, OrderKeyT>> expression)
            {
                object result;

                if (!_compiledExpressions.TryGetValue(expression, out result))
                {
                    lock (_compiledExpressions)
                    {
                        if (!_compiledExpressions.TryGetValue(expression, out result))
                        {
                            result = expression.Compile();
                            _compiledExpressions.Add(expression, result);
                        }
                    }
                }

                return result as Func<T, OrderKeyT>;
            }

            public IQueryable<T> GetCastedIQueryable(Expression<Func<T, bool>> filter, LambdaExpression orderBy, bool orderAscending, int coreElementItemsPerPage, int coreElementPageNumber, bool randomized)
            {
                // TODO: Handle the case when there's no sorting in a proper way
                Expression<Func<T, OrderKeyT>> orderByCasted = (Expression<Func<T, OrderKeyT>>)orderBy;

                IQueryable<T> allDataItemsOrdered = DataFacade.GetData<T>(filter);

                if (randomized)
                {
                    // TODO: optimize for EnumerableQuery instances
                    IQueryable<T> randomizedItems = allDataItemsOrdered.TakeRandom(coreElementItemsPerPage);

                    if (orderBy != DataFacade.GetEmptyPredicate<T>())
                    {
                        randomizedItems = (orderAscending ? randomizedItems.OrderBy(orderByCasted) : randomizedItems.OrderByDescending(orderByCasted));
                    }
                    return randomizedItems;
                }

                if (allDataItemsOrdered.IsEnumerableQuery())
                {
                    Func<T, OrderKeyT> orderByFunc = CompileExpression(orderByCasted);
                    allDataItemsOrdered = (orderAscending ? allDataItemsOrdered.OrderBy(orderByFunc) : allDataItemsOrdered.OrderByDescending(orderByFunc))
                                          .AsQueryable();
                }
                else
                {
                    allDataItemsOrdered = (orderAscending ? allDataItemsOrdered.OrderBy(orderByCasted) : allDataItemsOrdered.OrderByDescending(orderByCasted));
                }

                IQueryable<T> coreDataItems = allDataItemsOrdered;
                if (coreElementPageNumber > 1)
                {
                    coreDataItems = coreDataItems.Skip((coreElementPageNumber - 1) * coreElementItemsPerPage);
                }
                coreDataItems = coreDataItems.Take(coreElementItemsPerPage);
                return coreDataItems;
            }


            public LambdaExpression GetOrderByPropertyNameExpression(PropertyInfo orderByPropertyInfo)
            {
                ParameterExpression sourceItem = Expression.Parameter(typeof(T), "source");
                Expression propertySelector = Expression.Convert(LambdaExpression.Property(sourceItem, orderByPropertyInfo), typeof(OrderKeyT));
                Expression<Func<T, OrderKeyT>> orderByExpression = Expression.Lambda<Func<T, OrderKeyT>>(propertySelector, new ParameterExpression[] { sourceItem });
                return orderByExpression;
            }
        }
    }



    internal static class ReferencedDataHelperBuilder<SOURCE>
            where SOURCE : class, IData
    {
        private static readonly Hashtable<string, IReferencedDataHelper<SOURCE>> __preBuildHelpers = new Hashtable<string, IReferencedDataHelper<SOURCE>>();
        private static readonly object _lock = new object();

        public static IReferencedDataHelper<SOURCE> Build(string foreignKeyPropertyName)
        {
            IReferencedDataHelper<SOURCE> result;

            if (__preBuildHelpers.TryGetValue(foreignKeyPropertyName, out result) == false)
            {
                lock (_lock)
                {
                    if (__preBuildHelpers.TryGetValue(foreignKeyPropertyName, out result) == false)
                    {
                        result = BuildImpl(foreignKeyPropertyName);
                        __preBuildHelpers.Add(foreignKeyPropertyName, result);
                    }
                }
            }
            return result;
        }

        private static IReferencedDataHelper<SOURCE> BuildImpl(string foreignKeyPropertyName)
        {
            Type sourceType = typeof(SOURCE);
            ForeignPropertyInfo keyInfo = DataReferenceFacade.GetForeignKeyPropertyInfo(sourceType, foreignKeyPropertyName);
            Type destinationType = keyInfo.TargetType;

            PropertyInfo sourceKeyPropertyInfo = sourceType.GetDataPropertyRecursivly(foreignKeyPropertyName);
            PropertyInfo destinationKeyPropertyInfo = destinationType.GetSingleKeyProperty();
            Type keyFieldType = destinationKeyPropertyInfo.PropertyType;

            Type[] genericArgs = new Type[] { typeof(SOURCE), destinationType, keyFieldType };

            return (IReferencedDataHelper<SOURCE>)Activator.CreateInstance(typeof(ReferencedDataHelper<,,>).MakeGenericType(genericArgs), sourceKeyPropertyInfo, destinationKeyPropertyInfo);
        }
    }









    internal interface IReferencedDataHelper<SOURCE>
        where SOURCE : class, IData
    {
        IEnumerable<XElement> GetReferencedXElements(IQueryable<SOURCE> sourceTypeIqueryable, List<string> destinationPropertyNames, XName elementName, string propertyNamePrefix);
        string TargetTypeKeyPropertyName { get; }
    }









    internal class ReferencedDataHelper<SOURCE, DEST, KEY> : IReferencedDataHelper<SOURCE>
        where SOURCE : class, IData
        where DEST : class, IData
    {
        private readonly ParameterExpression _sourceItem = Expression.Parameter(typeof(SOURCE), "source");
        private readonly ParameterExpression _destinationItem = Expression.Parameter(typeof(DEST), "destination");

        private readonly PropertyInfo _sourceKeyPropertyInfo;
        private readonly PropertyInfo _destinationKeyPropertyInfo;

        private Expression<Func<SOURCE, KEY>> SourceForeignKeyPropertySelector { get; set; }
        private Expression<Func<SOURCE, bool>> SourceForeignWhereExpression { get; set; }

        public ReferencedDataHelper(PropertyInfo sourceKeyPropertyInfo, PropertyInfo destinationKeyPropertyInfo)
        {
            _sourceKeyPropertyInfo = sourceKeyPropertyInfo;
            _destinationKeyPropertyInfo = destinationKeyPropertyInfo;
            this.TargetTypeKeyPropertyName = _destinationKeyPropertyInfo.Name;

            Expression foreignKeyFieldSelect;
            if ((_sourceKeyPropertyInfo.PropertyType.IsGenericType) && (_sourceKeyPropertyInfo.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>)))
            {
                PropertyInfo hasValuePropertyInfo = _sourceKeyPropertyInfo.PropertyType.GetProperty("HasValue");
                PropertyInfo valuePropertyInfo = _sourceKeyPropertyInfo.PropertyType.GetProperty("Value");

                Expression hasValuePropertyExpression = Expression.Property(Expression.Property(_sourceItem, _sourceKeyPropertyInfo), hasValuePropertyInfo);
                Expression valuePropertyExpression = Expression.Property(Expression.Property(_sourceItem, _sourceKeyPropertyInfo), valuePropertyInfo);
                Expression equalExpression = Expression.Equal(hasValuePropertyExpression, Expression.Constant(true));

                foreignKeyFieldSelect = Expression.Property(Expression.Property(_sourceItem, _sourceKeyPropertyInfo), valuePropertyInfo);

                this.SourceForeignWhereExpression = Expression.Lambda<Func<SOURCE, bool>>(equalExpression, new ParameterExpression[] { _sourceItem });
            }
            else
            {
                foreignKeyFieldSelect = LambdaExpression.Property(_sourceItem, _sourceKeyPropertyInfo);
            }


            this.SourceForeignKeyPropertySelector = Expression.Lambda<Func<SOURCE, KEY>>(foreignKeyFieldSelect, new ParameterExpression[] { _sourceItem });
        }



        public string TargetTypeKeyPropertyName { get; private set; }

        public IEnumerable<XElement> GetReferencedXElements(IQueryable<SOURCE> sourceTypeIqueryable, List<string> destinationPropertyNames, XName elementName, string propertyNamePrefix)
        {
            IQueryable<DEST> data = GetReferencedQueryable(sourceTypeIqueryable);
            Expression<Func<DEST, XElement>> xelementSelector = XElementSelectHelper<DEST>.BuildXElementSelector(destinationPropertyNames, elementName, propertyNamePrefix);

            return data.Select(xelementSelector);
        }



        public IQueryable<DEST> GetReferencedQueryable(IQueryable<SOURCE> sourceTypeIqueryable)
        {
            if (this.SourceForeignWhereExpression != null)
            {
                // Handle Nullable<>
                sourceTypeIqueryable = sourceTypeIqueryable.Where(this.SourceForeignWhereExpression);
            }

            List<KEY> keys = sourceTypeIqueryable.Select(this.SourceForeignKeyPropertySelector).Distinct().ToList();

            // Build "key is in list" expression
            Expression destinationKeyFieldSelect = LambdaExpression.Property(_destinationItem, _destinationKeyPropertyInfo);
            Expression<Func<KEY, bool>> containsExpression = f => keys.Contains(f);
            Expression destinationFilter = Expression.Invoke(containsExpression, destinationKeyFieldSelect);
            var lambdaExpression = Expression.Lambda<Func<DEST, bool>>(destinationFilter, new ParameterExpression[] { _destinationItem });

            // Return queryable
            return DataFacade.GetData<DEST>(lambdaExpression);
        }
    }


    internal static class XElementSelectHelper<T>
    {
        private static readonly Hashtable<string, Expression<Func<T, XElement>>> __preBuildSelectors = new Hashtable<string, Expression<Func<T, XElement>>>();
        private static readonly Hashtable<Expression<Func<T, XElement>>, Func<T, XElement>> _compiledExpressions = new Hashtable<Expression<Func<T, XElement>>, Func<T, XElement>>();

        public static readonly object _syncRoot = new object();

        public static Func<T, XElement> GetCompiledFunction(Expression<Func<T, XElement>> xelementSelector)
        {
            Func<T, XElement> result;

            if (!_compiledExpressions.TryGetValue(xelementSelector, out result))
            {
                lock (_syncRoot)
                {
                    if (!_compiledExpressions.TryGetValue(xelementSelector, out result))
                    {
                        result = xelementSelector.Compile();
                        _compiledExpressions.Add(xelementSelector, result);
                    }
                }
            }
            return result;
        }

        public static Expression<Func<T, XElement>> BuildXElementSelector(List<string> fieldNames, XName elementName)
        {
            return BuildXElementSelector(fieldNames, elementName, "");
        }

        public static Expression<Func<T, XElement>> BuildXElementSelector(List<string> fieldNames, XName elementName, string propertyNamePrefix)
        {
            Expression<Func<T, XElement>> result;

            string lookupKey = string.Format("{0}//{1}//{2}", string.Join(",", fieldNames.ToArray()), elementName, propertyNamePrefix);

            if (__preBuildSelectors.TryGetValue(lookupKey, out result) == false)
            {
                lock (_syncRoot)
                {
                    if (__preBuildSelectors.TryGetValue(lookupKey, out result) == false)
                    {
                        result = BuildXElementSelectorImpl(fieldNames, elementName, propertyNamePrefix);
                        __preBuildSelectors.Add(lookupKey, result);
                    }
                }
            }
            return result;
        }

        private static Expression<Func<T, XElement>> BuildXElementSelectorImpl(List<string> fieldNames, XName elementName, string propertyNamePrefix)
        {
            ParameterExpression _sourceItem = Expression.Parameter(typeof(T), "data");

            ConstructorInfo xElementConstructorInfo = typeof(XElement).GetConstructor(new Type[] { typeof(XName), typeof(object[]) });
            ConstructorInfo xAttributeConstructorInfo = typeof(XAttribute).GetConstructor(new Type[] { typeof(XName), typeof(object) });

            List<Expression> xattributeNewExpressions = new List<Expression>();

            foreach (string fieldName in fieldNames)
            {
                PropertyInfo fieldPropertyInfo = typeof(T).GetPropertiesRecursively(f => f.DeclaringType != typeof(IData)).Where(prop => prop.Name == fieldName).SingleOrDefault();

                if (fieldPropertyInfo == null) throw new InvalidOperationException(string.Format("The type '{0}' does have a property named '{1}'", typeof(T), fieldName));

                Expression attributeNameExpression = Expression.Constant(XName.Get(propertyNamePrefix + fieldName));
                Expression attributeValueExpression = Expression.Convert(LambdaExpression.Property(_sourceItem, fieldPropertyInfo), typeof(object));

                Expression xattributeNewExpression = Expression.New(xAttributeConstructorInfo, new Expression[] { attributeNameExpression, attributeValueExpression });

                // Return "null" instead of "new XAttribute( 'xxx', null )"
                Expression notNullCheck = Expression.NotEqual(attributeValueExpression, Expression.Constant(null));
                Expression nullChecked = Expression.Condition(notNullCheck, Expression.Convert(xattributeNewExpression, typeof(object)), Expression.Constant(null));


                xattributeNewExpressions.Add(nullChecked); //xattributeNewExpression);
            }

            Expression xattributeArrayExpression = Expression.NewArrayInit(typeof(object), xattributeNewExpressions);

            Expression elementNameExpression = Expression.Constant(elementName);
            Expression[] xelementConstructorArguments = new Expression[] { elementNameExpression, xattributeArrayExpression };
            Expression xelementNewExpression = Expression.New(xElementConstructorInfo, xelementConstructorArguments);

            Expression<Func<T, XElement>> lambdaExpression = Expression.Lambda<Func<T, XElement>>(xelementNewExpression, new ParameterExpression[] { _sourceItem });

            return lambdaExpression;
        }
    }
}
