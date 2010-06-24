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
using System.Linq.Expressions;
using Composite.Data;
using System.Reflection;

public partial class Spikes_MAW_InvokeBasedFiltering : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        ParameterExpression _dataItem = Expression.Parameter(typeof(IUserActivePerspective), "data");
        
        Expression<Func<string, bool>> predicateA = f => f.Contains("all");
        Expression<Func<string, bool>> predicateB = f => f.Contains("Data");
        MemberExpression propertyExpressionA = MemberExpression.Property(_dataItem, GetProperty("Username"));
        MemberExpression propertyExpressionB = MemberExpression.Property(_dataItem, GetProperty("SerializedEntityToken"));

        Expression filterA = Expression.Invoke(predicateA, new Expression[] { propertyExpressionA });
        Expression filterB = Expression.Invoke(predicateB, new Expression[] { propertyExpressionB });

        Expression filter = Expression.And(filterA, filterB);

        Expression<Func<IUserActivePerspective, bool>> lambdaExpression = Expression.Lambda<Func<IUserActivePerspective, bool>>(filter, new ParameterExpression[] { _dataItem });

        var found = DataFacade.GetData<IUserActivePerspective>(lambdaExpression);

        foreach (var file in found)
        {
            Response.Write(file.SerializedEntityToken + "<br />");
        }

    }

    private PropertyInfo GetProperty(string fieldName)
    {
        PropertyInfo fieldPropertyInfo = typeof(IUserActivePerspective).GetProperties().Where(f => f.Name == fieldName).Single();
        return fieldPropertyInfo;
    }

}
