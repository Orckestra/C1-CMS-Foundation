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
using Composite.Data.Types;
using Composite.Data;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Reflection;
using Composite.Xml;
using Composite.Types;
using Composite.Logging;

public partial class Spikes_MAW_XElementBuilder : System.Web.UI.Page
{
    private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(IPage), "data");

//    public interface IOrderByExpressionBuilder<T>
//    {
//        Expression BuilderOrderByExpression();
//    }

    private void Sample()
    {
        //Expression<Func<IPage, string>> orderer;

        //Func<IPage, IOrderByBuilder<IPage>> ordererBuilder;
        //        XElement.Parse("").Elements().OrderBy(
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        Sample();
        Expression<Func<IPage, XElement>> selector =
            BuildXElementSelector<IPage>(new List<string> { "Id", "Title" });

        Expression<Func<IPage, object>> orderby = f => f.Abstract;

        var result2 = DataFacade.GetData<IPage>().OrderBy(f=>Title).Select(selector);

        XElement root = new XElement("root", result2);
    }

    protected void Tmp()
    {
        var x = from page in DataFacade.GetData<IPage>()
                orderby page.Abstract descending
                select page;
    }


    protected Expression<Func<T, XElement>> BuildXElementSelector<T>(List<string> fieldNames)
    {
        XName elementName = Namespaces.Data + typeof(T).Name;

        ConstructorInfo xElementConstructorInfo = typeof(XElement).GetConstructor(new Type[] { typeof(XName), typeof(object[]) });
        ConstructorInfo xAttributeConstructorInfo = typeof(XAttribute).GetConstructor(new Type[] { typeof(XName), typeof(object) });

        List<Expression> xattributeNewExpressions = new List<Expression>();
        foreach (string fieldName in fieldNames)
        {
            PropertyInfo fieldPropertyInfo = typeof(T).GetPropertiesRecursively(prop => prop.Name == fieldName).Single();

            Expression attributeNameExpression = Expression.Constant(XName.Get(fieldName));
            Expression attributeValueExpression = Expression.Convert(LambdaExpression.Property(_dataItem, fieldPropertyInfo), typeof(object));

            Expression xattributeNewExpression = Expression.New(xAttributeConstructorInfo, new Expression[] { attributeNameExpression, attributeValueExpression });

            xattributeNewExpressions.Add(xattributeNewExpression);
        }

        Expression xattributeArrayExpression = Expression.NewArrayInit(typeof(object), xattributeNewExpressions);

        Expression elementNameExpression = Expression.Constant(elementName);
        Expression[] xelementConstructorArguments = new Expression[] { elementNameExpression, xattributeArrayExpression };
        Expression xelementNewExpression = Expression.New(xElementConstructorInfo, xelementConstructorArguments);

        Expression<Func<T, XElement>> lambdaExpression = Expression.Lambda<Func<T, XElement>>(xelementNewExpression, new ParameterExpression[] { _dataItem });

        return lambdaExpression;
    }
}
