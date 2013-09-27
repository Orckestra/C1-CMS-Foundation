<%@ WebService Language="C#" Class="Composite.Services.FunctionService" %>

using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite.Functions;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class FunctionService : System.Web.Services.WebService
    {
        [WebMethod]
        public FunctionCallEditorSettings GetCustomEditorSettings(string functionName)
        {
            return FunctionCallEditorManager.GetCustomEditorSettings(functionName);
        }

        [WebMethod]
        public FunctionCallEditorSettings GetCustomEditorSettingsByMarkup(string xml)
        {
            var xElement = XElement.Parse(xml);

            string functionName = (string) xElement.Attribute("name");

            return functionName != null ? FunctionCallEditorManager.GetCustomEditorSettings(functionName) : null;
        }
    }
}
