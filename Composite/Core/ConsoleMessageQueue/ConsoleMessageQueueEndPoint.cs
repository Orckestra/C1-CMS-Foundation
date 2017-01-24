using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using Castle.Core.Internal;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.WebClient.Services.ConsoleMessageService;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Core.ConsoleMessageQueue
{
    [ApplicationStartup]
    class ComponentsEndpoint
    {
        public static void OnInitialized()
        {
            WampRouterFacade.RegisterCallee(new MessageQueueRpcService());
        }
    }

    /// <summary>
    /// Rpc service for interaction with message queue service
    /// </summary>
    public class MessageQueueRpcService : IRpcService
    {
        List<string> _consoleIds = new List<string>();

        /// <summary>
        /// To start message queue publisher
        /// </summary>
        /// <returns>if publisher successfully started</returns>
        [WampProcedure("messageQueue.start")]
        public bool StartMessageQueueTopic(string consoleId)
        {
            if (_consoleIds.Contains(consoleId))
                return false;
            _consoleIds.Add(consoleId);
            return WampRouterFacade.RegisterPublisher(new MessageQueuePublisher(consoleId));
        }
    }

    internal class MessageQueuePublisher : IWampEventHandler<object, GetMessagesResult>
    {
        private int _lastChanged;
        private static string _consoleId;

        public static string Topic => "consoleMessage.new." + _consoleId;

        internal MessageQueuePublisher(string consoleId)
        {
            _lastChanged = ConsoleMessageQueueFacade.CurrentChangeNumber;
            _consoleId = consoleId;
        }

        string IWampEventHandler<object, GetMessagesResult>.Topic => Topic;

        public IObservable<object> Event => Observable.FromEventPattern
            (ev => ConsoleMessageQueueFacade.ChangeEvent += ev,
                ev => ConsoleMessageQueueFacade.ChangeEvent -= ev)
            .Where(f => (string) f.Sender == _consoleId || ((string) f.Sender).IsNullOrEmpty());

        public GetMessagesResult GetNewData()
        {
            ConsoleFacade.Initialize();
            var res =
                ConsoleMessageServiceFacade.GetNewMessages(_consoleId, _lastChanged);
            _lastChanged = ConsoleMessageQueueFacade.CurrentChangeNumber;
            return res;
        }
    }
}
