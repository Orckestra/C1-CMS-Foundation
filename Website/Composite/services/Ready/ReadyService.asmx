<%@ WebService Language="C#" Class="ReadyService" %>

using System.Web.Services;
using System.Web.Services.Protocols;
using Composite;


[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class ReadyService : System.Web.Services.WebService
{
    public ReadyService()
    {
    }


    [WebMethod]
    public bool IsServerReady(bool dummy)
    {
        return GlobalInitializerFacade.SystemCoreInitialized && Composite.Application.ApplicationOnlineHandlerFacade.IsApplicationOnline;
    }

}

