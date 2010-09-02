using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.C1Console.Security;
using Composite.Data.Types;
using Composite.Data;
using System.Globalization;


public partial class Tests_PageElementProviderHooks : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //HookingFacade.Flush();

        Random rand = new Random();

        using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture("en-US")))
        {
            IPage page = DataFacade.GetData<IPage>().First();
            page.Description = rand.Next().ToString();
            DataFacade.Update(page);
        }

       // HookingFacade.EnsureInitialization();
    }
}
