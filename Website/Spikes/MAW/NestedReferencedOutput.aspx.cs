using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.Data;
using Composite.Types;
using Composite.Data.Types;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Reflection;
using Composite.Logging;
using InlinePageDataDemo;

public partial class Spikes_MAW_NestedReferencedOutput : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Expression<Func<IPage, Guid>> orderBy = f => Guid.NewGuid();

        List<string> propertyNames = new List<string> { "Id", "Title", "TemplateId", "TemplateId.Title", "TemplateId.PageTemplateFilePath", "TemplateId.Id" };
        foreach (XElement templateXmlx in DataToXElements<IPage>.GetXElements(
            f => f.Title != "xHejsa",
            orderBy,
            false,
            4,
            3,
            propertyNames,
            "#crap",
            "NamingItHere",
            false,
            true))
        {
            Response.Write("<pre>" + HttpUtility.HtmlEncode(templateXmlx.ToString()) + "</pre>");
        }
    }
}

public static class DataToXElements<T> where T : class, IData
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
        bool orderByIsDeterministic,
        int coreElementItemsPerPage,
        int coreElementPageNumber,
        IEnumerable<string> propertyNames,
        XNamespace elementNamespace,
        string elementNameString,
        bool showReferencesInline,
        bool showPagingInfo)
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
        if (showReferencesInline == true)
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


        List<XElement> result = new List<XElement>();

        Expression<Func<T, XElement>> xelementSelector = XElementSelectHelper<T>.BuildXElementSelector(propertyNameList.Where(f => f.IndexOf('.') == -1).ToList(), coreElementName);

        IOrderByTypeFixer<T> orderByTypeFixer = GetOrderByTypeFixer(orderBy);
        IQueryable<T> coreDataItems = orderByTypeFixer.GetCastedIQueryable(filter, orderBy, coreElementItemsPerPage, coreElementPageNumber);

        if (orderByIsDeterministic == false && referencesLookup.Any())
        {
            // performance hit! make elegant when time permits.
            coreDataItems = coreDataItems.ToList().AsQueryable();
        }
        IEnumerable<XElement> coreData = coreDataItems.Select(xelementSelector);


        result.AddRange(coreData);

        int referencedCoreElementCount = (orderByIsDeterministic ? coreElementItemsPerPage : int.MaxValue);
        foreach (string referencePropertyName in referencesLookup.Keys)
        {
            if (referencePropertyName == elementNameString) throw new InvalidOperationException("Element name can not be the same as that of a foreign key property");

            IReferencedDataHelper<T> fixer = ReferencedDataHelperBuilder<T>.Build(referencePropertyName);
            string propertyNamePrefix = (showReferencesInline ? referencePropertyName + "." : "");
            if (showReferencesInline == true)
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
            result.AddRange(referencesXml);
        }

        if (showPagingInfo == true)
        {
            int totalItemCount = DataFacade.GetData<T>(filter).Count();
            int firstShownElementNumber = ((coreElementPageNumber - 1) * coreElementItemsPerPage) + 1;
            int lastShownElementNumber = Math.Min(totalItemCount, firstShownElementNumber + (coreElementItemsPerPage - 1));
            int shownItemCount = Math.Max( 0, (lastShownElementNumber - firstShownElementNumber) + 1);
            int totelPageCount = (int)((((double)totalItemCount) / ((double)coreElementItemsPerPage)) + 0.5);

            XElement pagingInfo = new XElement("PagingInfo",
                new XAttribute("CurrentPageNumber", coreElementPageNumber),
                new XAttribute("TotalPageCount", totelPageCount),
                new XAttribute("TotalItemCount", totalItemCount),
                new XAttribute("ShownItemCount", shownItemCount),
                new XAttribute("MaximumItemsPerPage", coreElementItemsPerPage)
                );

            if (shownItemCount > 0)
            {
                pagingInfo.Add(
                    new XAttribute("CurrentItemNumberStart", firstShownElementNumber),
                    new XAttribute("CurrentItemNumberEnd", lastShownElementNumber)
                 );
            }

            yield return pagingInfo;
        }

        if (showReferencesInline == true)
        {
            Dictionary<string, IEnumerable<XElement>> referencedElementsLookup = new Dictionary<string, IEnumerable<XElement>>();
            Dictionary<string, Func<string, XElement>> referencedElementLocatorLookup = new Dictionary<string, Func<string, XElement>>();

            foreach (string referencePropertyName in referencesLookup.Keys)
            {
                XName referenceElementName = elementNamespace + referencePropertyName;

                IEnumerable<XElement> referenceElements = result.Where(f => f.Name == referenceElementName);
                referencedElementsLookup.Add(referencePropertyName, referenceElements);

                string idPropertyName = referencedIdAttrubuteNames.First(g => g.StartsWith(referencePropertyName + "."));
                Func<string, XElement> locateByKeyFunc = f => referencedElementsLookup[referencePropertyName].Attributes(idPropertyName).Where(g => g.Value == f).First().Parent;
                referencedElementLocatorLookup.Add(referencePropertyName, locateByKeyFunc);
            }

            foreach (XElement coreElement in result.Where(f => f.Name == coreElementName))
            {
                foreach (string referencePropertyName in referencesLookup.Keys)
                {
                    string keyValue = coreElement.Attribute(referencePropertyName).Value;
                    Func<string, XElement> fetcher = referencedElementLocatorLookup[referencePropertyName];
                    XElement referenced = fetcher(keyValue);
                    coreElement.Add(referenced.Attributes());
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
        IQueryable<T2> GetCastedIQueryable(Expression<Func<T2, bool>> filter, LambdaExpression orderBy, int coreElementItemsPerPage, int coreElementPageNumber);
        LambdaExpression GetOrderByPropertyNameExpression(PropertyInfo orderByPropertyInfo);
    }

    private class OrderByTypeFixer<OrderKeyT> : IOrderByTypeFixer<T>
    {
        public IQueryable<T> GetCastedIQueryable(Expression<Func<T, bool>> filter, LambdaExpression orderBy, int coreElementItemsPerPage, int coreElementPageNumber)
        {
            Expression<Func<T, OrderKeyT>> orderByCasted = (Expression<Func<T, OrderKeyT>>)orderBy;
            IQueryable<T> coreDataItems = DataFacade.GetData<T>(filter).OrderBy(orderByCasted).Skip((coreElementPageNumber - 1) * coreElementItemsPerPage).Take(coreElementItemsPerPage);
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


public static class ReferencedDataHelperBuilder<SOURCE>
        where SOURCE : class, IData
{
    private static Dictionary<string, IReferencedDataHelper<SOURCE>> __preBuildHelpers = new Dictionary<string, IReferencedDataHelper<SOURCE>>();
    private static object _lock = new object();

    public static IReferencedDataHelper<SOURCE> Build(string foreignKeyPropertyName)
    {
        IReferencedDataHelper<SOURCE> result;

        lock (_lock)
        {
            if (__preBuildHelpers.TryGetValue(foreignKeyPropertyName, out result) == false)
            {
                result = BuildImpl(foreignKeyPropertyName);
                __preBuildHelpers.Add(foreignKeyPropertyName, result);
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
        PropertyInfo destinationKeyPropertyInfo = destinationType.GetKeyPropertyInfoes().Single();
        Type keyFieldType = destinationKeyPropertyInfo.PropertyType;

        //        object[] constructorArgs = new object[] { sourceKeyPropertyInfo, destinationKeyPropertyInfo };
        Type[] genericArgs = new Type[] { typeof(SOURCE), destinationType, keyFieldType };

        return (IReferencedDataHelper<SOURCE>)Activator.CreateInstance(typeof(ReferencedDataHelper<,,>).MakeGenericType(genericArgs), sourceKeyPropertyInfo, destinationKeyPropertyInfo);
    }
}

public interface IReferencedDataHelper<SOURCE>
    where SOURCE : class, IData
{
    IEnumerable<XElement> GetReferencedXElements(IQueryable<SOURCE> sourceTypeIqueryable, List<string> destinationPropertyNames, XName elementName, string propertyNamePrefix);
    string TargetTypeKeyPropertyName { get; }
}

public class ReferencedDataHelper<SOURCE, DEST, KEY> : IReferencedDataHelper<SOURCE>
    where SOURCE : class, IData
    where DEST : class, IData
{
    private readonly ParameterExpression _sourceItem = Expression.Parameter(typeof(SOURCE), "source");
    private readonly ParameterExpression _destinationItem = Expression.Parameter(typeof(DEST), "destination");

    private readonly PropertyInfo _sourceKeyPropertyInfo;
    private readonly PropertyInfo _destinationKeyPropertyInfo;

    public ReferencedDataHelper(PropertyInfo sourceKeyPropertyInfo, PropertyInfo destinationKeyPropertyInfo)
    {
        _sourceKeyPropertyInfo = sourceKeyPropertyInfo;
        _destinationKeyPropertyInfo = destinationKeyPropertyInfo;
        this.TargetTypeKeyPropertyName = _destinationKeyPropertyInfo.Name;

        Expression foreignKeyFieldSelect = LambdaExpression.Property(_sourceItem, _sourceKeyPropertyInfo);
        this.SourceForeignKeyPropertySelector = Expression.Lambda<Func<SOURCE, KEY>>(foreignKeyFieldSelect, new ParameterExpression[] { _sourceItem });
    }

    private Expression<Func<SOURCE, KEY>> SourceForeignKeyPropertySelector { get; set; }

    public string TargetTypeKeyPropertyName { get; private set; }

    public IEnumerable<XElement> GetReferencedXElements(IQueryable<SOURCE> sourceTypeIqueryable, List<string> destinationPropertyNames, XName elementName, string propertyNamePrefix)
    {
        IQueryable<DEST> data = GetReferencedQueryable(sourceTypeIqueryable);
        Expression<Func<DEST, XElement>> xelementSelector = XElementSelectHelper<DEST>.BuildXElementSelector(destinationPropertyNames, elementName, propertyNamePrefix);

        return data.Select(xelementSelector);
    }



    public IQueryable<DEST> GetReferencedQueryable(IQueryable<SOURCE> sourceTypeIqueryable)
    {
        // Fetch list of foreigh keys
        Expression foreignKeyFieldSelect = LambdaExpression.Property(_sourceItem, _sourceKeyPropertyInfo);
        Expression<Func<SOURCE, KEY>> usedKeysSelector = Expression.Lambda<Func<SOURCE, KEY>>(foreignKeyFieldSelect, new ParameterExpression[] { _sourceItem });
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



public static class XElementSelectHelper<T>
{
    public static Expression<Func<T, XElement>> BuildXElementSelector(List<string> fieldNames, XName elementName)
    {
        return BuildXElementSelector(fieldNames, elementName, "");
    }

    private static Dictionary<string, Expression<Func<T, XElement>>> __preBuildSelectors = new Dictionary<string, Expression<Func<T, XElement>>>();
    public static object _lock = new object();

    public static Expression<Func<T, XElement>> BuildXElementSelector(List<string> fieldNames, XName elementName, string propertyNamePrefix)
    {
        Expression<Func<T, XElement>> result;

        string lookupKey = string.Format("{0}//{1}//{2}", string.Join(",", fieldNames.ToArray()), elementName, propertyNamePrefix);

        lock (_lock)
        {
            if (__preBuildSelectors.TryGetValue(lookupKey, out result) == false)
            {
                result = BuildXElementSelectorImpl(fieldNames, elementName, propertyNamePrefix);
                __preBuildSelectors.Add(lookupKey, result);
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
            PropertyInfo fieldPropertyInfo = typeof(T).GetPropertiesRecursively(f => f.DeclaringType != typeof(IData)).Where(prop => prop.Name == fieldName).Single();

            Expression attributeNameExpression = Expression.Constant(XName.Get(propertyNamePrefix + fieldName));
            Expression attributeValueExpression = Expression.Convert(LambdaExpression.Property(_sourceItem, fieldPropertyInfo), typeof(object));

            Expression xattributeNewExpression = Expression.New(xAttributeConstructorInfo, new Expression[] { attributeNameExpression, attributeValueExpression });

            xattributeNewExpressions.Add(xattributeNewExpression);
        }

        Expression xattributeArrayExpression = Expression.NewArrayInit(typeof(object), xattributeNewExpressions);

        Expression elementNameExpression = Expression.Constant(elementName);
        Expression[] xelementConstructorArguments = new Expression[] { elementNameExpression, xattributeArrayExpression };
        Expression xelementNewExpression = Expression.New(xElementConstructorInfo, xelementConstructorArguments);

        Expression<Func<T, XElement>> lambdaExpression = Expression.Lambda<Func<T, XElement>>(xelementNewExpression, new ParameterExpression[] { _sourceItem });

        return lambdaExpression;
    }

}

