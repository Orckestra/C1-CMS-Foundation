<%@ WebService Language="C#" Class="Licensing" %>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite;
using Composite.Core.Threading;
using Composite.Core.Types;

[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class Licensing : System.Web.Services.WebService
{

    public Licensing()
    {
    }

    [WebMethod]
    public bool Registered( bool dummy )
    {
        return true;
    }

    [WebMethod]
    public bool InvokeLicenseFetch(bool dummy)
    {
        return true;
    }
    
    [WebMethod]
    public KeyValuePair[] GetInstallationInfo(bool dummy)
    {
        List<KeyValuePair> list = new List<KeyValuePair>();

        KeyValuePair pair = new KeyValuePair();
        pair.Key = "ProductVersion";
        pair.Value = Composite.RuntimeInformation.ProductVersion.ToString();
        list.Add(pair);

        pair = new KeyValuePair();
        pair.Key = "ProductTitle";
        pair.Value = Composite.RuntimeInformation.ProductTitle;
        list.Add(pair);

        pair = new KeyValuePair();
        pair.Key = "InstallationId";
        pair.Value = Composite.Core.Configuration.InstallationInformationFacade.InstallationId.ToString();
        list.Add(pair);
        
        return list.ToArray();
    }

    [WebMethod]
    public KeyValuePair[] GetCreditsInfo(bool dummy)
    {
        List<KeyValuePair> list = new List<KeyValuePair>();

        KeyValuePair pair = new KeyValuePair();
        pair.Key = "Core Development";
        pair.Value = "Marcus Wendt;Martin Jensen;Dmitry Dzygin;Jesper Moth";
        list.Add(pair);

        /*pair = new KeyValuePair();
        pair.Key = "Package Development";
        pair.Value = "";
        list.Add(pair);

        pair = new KeyValuePair();
        pair.Key = "Localization";
        pair.Value = "";
        list.Add(pair);

        pair = new KeyValuePair();
        pair.Key = "Special Thanks To";
        pair.Value = "";
        list.Add(pair);*/

        return list.ToArray();
    }
}