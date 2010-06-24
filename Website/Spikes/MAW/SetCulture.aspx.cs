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
using System.Globalization;
using Composite;
using Composite.Security;

public partial class Spikes_MAW_SetCulture : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Write(Composite.Users.UserSettings.CultureInfo.Name);

        IUserSettings settings = DataFacade.GetData<IUserSettings>(f => f.Username == "palle").First();

        if (settings.CultureName == "en-US")
        {
            settings.CultureName = "da-DK";
        }
        else
        {
            settings.CultureName = "en-US";
        }
        DataFacade.Update(settings);

        Response.Write(Composite.Users.UserSettings.CultureInfo.Name);

        //Composite.Users.UserSettings.CultureInfo = new CultureInfo("da-DK");

        //if (RuntimeInformation.IsUnittest == false) Response.Write("<p>OK</p>");
        //if (GlobalInitializerFacade.SystemInitialized) Response.Write("<p>OK</p>");
        //if (UserValidationFacade.IsLoggedIn()) Response.Write("<p>OK</p>");


    }
}
