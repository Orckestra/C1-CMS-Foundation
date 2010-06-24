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
using Composite.ResourceSystem;
using System.Globalization;
using System.Collections.Generic;
using Composite.Types;

public partial class Spikes_MAW_LocalizationList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        IEnumerable<CultureInfo> cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures).OrderBy(f => f.DisplayName);
        List<CultureInfo> supportedCultures = StringResourceSystemFacade.GetSupportedCultures().ToList();
        CultureInfo defaultCulture = StringResourceSystemFacade.GetDefaultStringCulture();

        Dictionary<string, string> options = new Dictionary<string, string>();

        List<KeyValuePair> culturesLocalizedList = StringResourceSystemFacade.GetLocalization("Composite.Cultures");

        string defaultCultureDisplayName = culturesLocalizedList.Where(f => f.Key == defaultCulture.Name).Select(f=>f.Value).FirstOrDefault();
        if (defaultCultureDisplayName == null) defaultCultureDisplayName = defaultCulture.EnglishName;

        foreach (CultureInfo culture in cultures)
        {
            string cultureDisplayName = culturesLocalizedList.Where(f => f.Key == culture.Name).Select(f => f.Value).FirstOrDefault();
            if (cultureDisplayName == null) cultureDisplayName = culture.EnglishName;

            string language = (supportedCultures.Contains(culture) ? cultureDisplayName : defaultCultureDisplayName);
            string listLabel = string.Format("{0} / {1}", cultureDisplayName, language);

            options.Add(culture.Name, listLabel);
        }

        Response.Write("<table>");
        foreach (var thing in options.OrderBy(f=>f.Value))
        {
            Response.Write(string.Format("<tr><td>{0}</td><td>{1}</td></tr>", thing.Key, thing.Value));
        }
        Response.Write("</table>\n");

        foreach (var thing in cultures.OrderBy(f => f.EnglishName))
        {
            Response.Write(string.Format("<string key=\"{0}\" value=\"{1}\" />\n,", thing.Name, thing.EnglishName));
        }
    }
}
