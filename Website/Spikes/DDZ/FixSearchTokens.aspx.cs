using System;
using System.Linq;
using System.Web;
using System.Xml.Linq;

using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Extensions;


public partial class FixSearchTokens : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void Process(object sender, EventArgs e)
    {
        Process();
    }

    private void Process()
    {
        UpdateFormDefinitions();
        WriteLine("Done.");
    }

    void UpdateFormDefinitions()
    {
        WriteLine("Updating form definitions");

        foreach (Type type in DataFacade.GetAllInterfaces())
        {
            Guid tempGuid;
            if (!type.TryGetImmutableTypeId(out tempGuid)) continue;

            var typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
            string markup = DynamicTypesAlternateFormFacade.GetAlternateFormMarkup(typeDescriptor);

            if (markup == null) continue;

            XElement xml = XElement.Parse(markup);

            bool changed = false;

            // var xmlNamespace = (XNamespace)"http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0";
            foreach (XElement element in xml.Descendants().Where(node => node.Name.LocalName == "DataReferenceTreeSelector"))
            {
                XAttribute searchTokenAttr = element.Attribute("SearchToken");

                if (searchTokenAttr == null
                    || !searchTokenAttr.Value.Contains("MediaFileSearchToken"))
                {
                    continue;
                }

                string oldSerializedSearchToken = searchTokenAttr.Value;
                string newSerializedSearchToken = FixMediaFileSearchToken(oldSerializedSearchToken);

                if (newSerializedSearchToken == oldSerializedSearchToken) continue;

                changed = true;

                searchTokenAttr.Value = newSerializedSearchToken;
            }

            if (!changed) continue;

            WriteLine("Updating form markup for type '{0}'".FormatWith(type.FullName));
            DynamicTypesAlternateFormFacade.SetAlternateForm(typeDescriptor, xml.ToString());
        }
    }

    private static string FixMediaFileSearchToken(string searchToken)
    {
        if(!searchToken.Contains("Extensions="))
        {
            searchToken += ", Extensions=null";
        }
        if (!searchToken.Contains("HideSubfolders="))
        {
            searchToken += ", HideSubfolders='False'";
        }
        return searchToken;
    }

    private void WriteLine(string str)
    {
        Response.Write(HttpUtility.HtmlEncode(str));
        Response.Write("<br />");
    }
}
