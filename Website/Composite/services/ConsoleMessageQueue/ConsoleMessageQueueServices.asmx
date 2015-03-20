<%@ WebService Language="C#" Class="Composite.Services.ConsoleMessageQueueServices" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects;
using Composite.Core.WebClient.Services.ConsoleMessageService;
using Composite.C1Console.Events;

namespace Composite.Services
{

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


#warning THIS IS EXPERIMENTAL
		[WebMethod]
		public bool PlaceMessageOrder(string consoleId, string serializedMessageOrder)
		{
			var messageBox = new MessageBoxMessageQueueItem
			{
				DialogType = Composite.C1Console.Events.DialogType.Message,
				Message = "Your order was '" + serializedMessageOrder + "'",
				Title = "We got your order :)"
			};

			ConsoleMessageQueueFacade.Enqueue(messageBox, consoleId);
			
			return true;
		}
	}

}