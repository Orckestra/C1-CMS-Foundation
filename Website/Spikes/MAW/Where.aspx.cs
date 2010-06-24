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
using Composite.Renderings.Page;
using System.Linq.Expressions;
using XElementToExpressionTree;

public partial class Spikes_MAW_Where : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XNamespace _ns = XElementToExpressionTreeWorker<IPage>._ns;

        XElement query;
        if (Page.IsPostBack == false)
        {
            query = new XElement(_ns + "Equals",
                new XAttribute("field", "Title"),
                new XAttribute("value", "Hello world"));
        }
        else
        {
            query = XElement.Parse(QueryMarkupTextBox.Text);
        }

        QueryMarkupTextBox.Text = query.ToString();


        var filter = XElementToExpressionTreeWorker<IPage>.GetFilterDelegate(query);

        using (new DataScope(DataScopeIdentifier.Administrated))
        {
            var result = DataFacade.GetData<IPage>(filter);

            var outputElements =
                from page in result
                select new XElement("div", page.Title + " - " + page.Id);

            foreach (var outputElement in outputElements)
            {
                ResultPlaceHolder.Controls.Add(outputElement.AsAspNetControl());
            }
        }

    }


}
