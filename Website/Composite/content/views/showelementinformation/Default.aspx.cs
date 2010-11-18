using System;
using System.Collections.Generic;
using System.IO;
using System.Web.UI;
using Composite.C1Console.Security;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Serialization;


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
        string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), string.Format("{0}.showinfo", piggybagId));

        string[] showinfo = C1File.ReadAllLines(filename);

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
