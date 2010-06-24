<%@ WebService Language="C#" Class="ConsoleMessageQueueServices" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite.WebClient.FlowMediators;
using Composite.WebClient.Services.TreeServiceObjects;
using Composite.WebClient.Services.ConsoleMessageService;
using Composite.ConsoleEventSystem;


[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class ConsoleMessageQueueServices : WebService
{

    [WebMethod]
    public int GetCurrentSequenceNumber(string dummyToPreventClientSoapBreak)
    {
        return ConsoleMessageQueueFacade.CurrentChangeNumber;
    }



    [WebMethod]
    public GetMessagesResult GetMessages(string consoleId, int lastKnownChangeNumber)
    {
        return ConsoleMessageServiceFacade.GetNewMessages(consoleId, lastKnownChangeNumber);
    }
}

