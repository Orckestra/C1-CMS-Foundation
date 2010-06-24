using System;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Spikes.DDZ
{
    public partial class DataLayerTest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Process(object sender, EventArgs e)
        {
            using (new DataScope(DataScopeIdentifier.Administrated, new CultureInfo("en-US")))
            {
                IPage selectedPage = DataFacade.GetData<IPage>().First();

                IPage anotherPageInstance = DataFacade.GetData<IPage>(f => f.Id == selectedPage.Id).Single();

                string title = selectedPage.Title;

                if (title.EndsWith("1"))
                {
                    title = title.Substring(0, title.Length - 1);
                }
                else
                {
                    title += 1;
                }
                selectedPage.Title = title;

                DataFacade.Update(selectedPage);

                if (anotherPageInstance.Title == selectedPage.Title)
                {
                    Response.Write("It's not working in a right way!!!");
                } 
                else
                {
                    Response.Write("We're good now!!!");
                }
            }
        }
    }
}
