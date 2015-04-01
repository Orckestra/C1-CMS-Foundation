<%@ WebService Language="C#" Class="Composite.Services.ConsoleMessageQueueServices" %>

using System;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.C1Console.Commands;
using Composite.Core;
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


		[WebMethod]
		public bool PlaceConsoleCommand(string consoleId, string consoleCommand)
		{
		    int delimiterIndex = consoleCommand.IndexOf(';');

		    string commandName, payload;

		    if (delimiterIndex == -1)
		    {
		        commandName = consoleCommand;
		        payload = null;
		    }
		    else
		    {
		        commandName = consoleCommand.Substring(0, delimiterIndex);
		        payload = consoleCommand.Substring(delimiterIndex + 1);
		    }

		    try
		    {
		        ConsoleCommandFacade.HandleConsoleCommand(consoleId, commandName, payload);
		    }
		    catch (Exception ex)
		    {
                Log.LogError(this.GetType().Name, "Failed to parse/execute console command '{0}'", consoleCommand);
		        Log.LogError(this.GetType().Name, ex);
		    }
            
			return true;
		}
	}

}