using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Composite.Core.Serialization;
using System.Collections.Generic;
using Composite.Core.Types;
using System.Reflection;
using Composite.C1Console.Security;
using System.Xml.Linq;
using System.Text;
using Composite.Data.Types;
using Composite.Data;
using Composite.Core.WebClient;
using Composite.Core.IO;
using Composite.Core.Configuration;
using Composite.Core.NewIO;


public partial class ShowElementInformation_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["PiggyBagId"] == null)
        {
            ElementInformationPlaceHolder.Controls.Add(new LiteralControl("No entity token.... nothing to do.... "));

            return;
        }

        Guid piggybagId = new Guid(Request.QueryString["PiggyBagId"]);
        string filename = System.IO.Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), string.Format("{0}.showinfo", piggybagId));

        string[] showinfo = File.ReadAllLines(filename);

        string serializedEntityToken = showinfo[0];
        string serializedPiggyBag = showinfo[1];

        EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

        Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedPiggyBag);
        Dictionary<string, string> piggybag = new Dictionary<string, string>();
        foreach (var kvp in dic)
        {
            piggybag.Add(kvp.Key, StringConversionServices.DeserializeValueString(kvp.Value));
        }

        string entityTokenHtml = entityToken.GetPrettyHtml(piggybag);

        ElementInformationPlaceHolder.Controls.Add(new LiteralControl(entityTokenHtml));
    }
}
