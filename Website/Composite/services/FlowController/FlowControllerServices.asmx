<%@ WebService Language="C#" Class="Composite.Services.FlowControllerServices" %>

using System;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.Core;
using Composite.C1Console.Events;
using Composite.C1Console.Actions;

namespace Composite.Services
{

    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class FlowControllerServices : System.Web.Services.WebService
    {

        [WebMethod]
        public bool CancelFlow(string serializedFlowHandle)
        {
            FlowHandle flowHandle = FlowHandle.Deserialize(serializedFlowHandle);
            try
            {
                FlowControllerFacade.CancelFlow(flowHandle.FlowToken);
            }
            catch (Exception ex)
            {
                Log.LogError("FlowControllerServices.CancelFlow", ex);
                return false;
            }

            return true;
        }



        [WebMethod]
        public bool ReleaseAllConsoleResources(string consoleId)
        {
            Verify.ArgumentNotNull(consoleId, "consoleId");

            Log.LogVerbose("FlowControllerServices.asmx", "ReleaseAllConsoleResources for " + consoleId);
            ConsoleFacade.CloseConsole(consoleId);

            return true;
        }

    }

}