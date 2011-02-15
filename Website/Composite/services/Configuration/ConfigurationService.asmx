<%@ WebService Language="C#" Class="Composite.Services.ConfigurationService" %>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Serialization;

using Composite.Core.Types;
using Composite.C1Console.Users;

namespace Composite.Services
{

    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    [XmlInclude(typeof(Composite.Core.WebClient.Services.TreeServiceObjects.ClientElement))]
    public class ConfigurationService : WebService
    {
        public class ConfigurationElement
        {
            public string Key { get; set; }
            public object Value { get; set; }
        }


        [WebMethod]
        [XmlInclude(typeof(Composite.Core.WebClient.Services.TreeServiceObjects.ClientElement))]
        public List<KeyValuePair> GetValidatingRegularExpressions(string dummyToPreventClientSoapBreak)
        {
            CultureInfo userCulture = UserSettings.CultureInfo;
            string decimalSeparator = userCulture.NumberFormat.NumberDecimalSeparator;
            string groupSeparator = userCulture.NumberFormat.NumberGroupSeparator;

            List<KeyValuePair> regExExpressions = new List<KeyValuePair>
        {
	        new KeyValuePair("number", @"^-?[0-9]+(\" + decimalSeparator + @"[0-9]+)?$"),
	        new KeyValuePair("integer", @"^-?[0-9]+$"),
	        new KeyValuePair("currency", @"^[0-9]{1,3}(\" + groupSeparator + @"[0-9]{3})*(\" + decimalSeparator + @"[0-9]{1,2})?$"),
	        new KeyValuePair("email", @"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$"),
	        new KeyValuePair("string", @"[a-å]|[A-Å]|[0-9]"),
	        new KeyValuePair("url", @"^#|~/|/|.:"),
	        new KeyValuePair("programmingidentifier", @"^[a-zA-Z][a-zA-Z0-9_]*$"),
	        new KeyValuePair("programmingnamespace", @"^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*$"),
	        new KeyValuePair("guid", @"^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$")

        };

            return regExExpressions;
        }
    }
}