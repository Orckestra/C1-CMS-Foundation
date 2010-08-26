using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Serialization;


namespace Composite.C1Console.Events.Foundation
{
    internal sealed class ConsoleMessageQueue
    {
        private int _queueItemCounter = 1;
        private List<ConsoleMessageQueueElement> _elements = new List<ConsoleMessageQueueElement>();

        private Timer _timer;
        private TimeSpan _timeInterval;

        private object _lock = new object();



        public ConsoleMessageQueue(int secondsForItemToLive)
        {
            _timeInterval = new TimeSpan(0, 0, secondsForItemToLive);

            DeserializeMessagesFromFileSystem();
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);

            _timer = new Timer(OnWeed, null, new TimeSpan(0, 0, 0), _timeInterval);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="queueItem"></param>
        /// <param name="receiverConsoleId">null or empty string is a broardcast</param>        
        public void Enqueue(IConsoleMessageQueueItem queueItem, string receiverConsoleId)
        {
            if (queueItem == null) throw new ArgumentNullException("queueItem");
            if (receiverConsoleId == "") receiverConsoleId = null;


            lock (_lock)
            {
                ConsoleMessageQueueElement queueElement = new ConsoleMessageQueueElement
                   {
                       ReceiverConsoleId = receiverConsoleId,
                       QueueItemNumber = ++_queueItemCounter,
                       EnqueueTime = DateTime.Now,
                       QueueItem = queueItem
                   };


                _elements.Add(queueElement);
            }

        }



        public IEnumerable<ConsoleMessageQueueElement> GetQueueElements(int currentConsoleCounter, string consoleId)
        {
            lock (_lock)
            {
                if (consoleId == null)
                {
                    return (from element in _elements
                            where element.QueueItemNumber > currentConsoleCounter
                            orderby element.QueueItemNumber
                            select element).ToList();
                }

                return (from element in _elements
                        where element.QueueItemNumber > currentConsoleCounter &&
                             (element.ReceiverConsoleId == consoleId || element.ReceiverConsoleId == null)
                        orderby element.QueueItemNumber
                        select element).ToList();
            }
        }


        public int GetLatestMessageNumber(string consoleId)
        {
            Verify.ArgumentNotNull(consoleId, "consoleId");

            lock(_lock)
            {
                for(int i=_elements.Count-1; i >= 0 ; i--)
                {
                    string receiverConsoleId = _elements[i].ReceiverConsoleId;
                    if (receiverConsoleId == null || receiverConsoleId == consoleId)
                    {
                        return _elements[i].QueueItemNumber;
                    }
                }
            }
            return 0;
        }


        public int CurrentQueueItemNumber
        {
            get
            {
                lock (_lock)
                {
                    return _queueItemCounter;
                }
            }
        }


        public void DoDebugSerializationToFileSystem()
        {
            SerializeMessagesToFileSystem(true);
        }



        private void OnWeed(object obj)
        {
            lock (_lock)
            {
                CleanOutOldMessages(_elements);
            }
        }



        private void OnShutDownEvent(ShutDownEventArgs args)
        {
            SerializeMessagesToFileSystem(false);
        }



        private void CleanOutOldMessages(List<ConsoleMessageQueueElement> listToClean)
        {
            DateTime now = DateTime.Now;

            int count = listToClean.Count<ConsoleMessageQueueElement>(element => element.EnqueueTime + _timeInterval < now);

            listToClean.RemoveRange(0, count);
        }



        private void SerializeMessagesToFileSystem(bool forDebug)
        {
            lock (_lock)
            {
                CleanOutOldMessages(_elements);

                if (_elements != null && _elements.Count > 0)
                {
                    IXmlSerializer xmlSerializer = GetMessageListXmlSerializer();

                    XElement serializedMessages = xmlSerializer.Serialize(_elements.GetType(), _elements);
                    
                    string serializedConsoleMessagesDir = PathUtil.Resolve((forDebug ? GlobalSettingsFacade.TempDirectory : GlobalSettingsFacade.SerializedConsoleMessagesDirectory));

                    if (Directory.Exists(serializedConsoleMessagesDir) == false)
                    {
                        Directory.CreateDirectory(serializedConsoleMessagesDir);
                    }

                    string timeSortedUniqueFileName = string.Format("{0}.{1}.xml", (long.MaxValue - DateTime.Now.Ticks), Guid.NewGuid());
                    string queueElementsXmlFilePath = Path.Combine(serializedConsoleMessagesDir, timeSortedUniqueFileName);

                    serializedMessages.Save(queueElementsXmlFilePath);
                }
            }
        }



        private void DeserializeMessagesFromFileSystem()
        {
            lock (_lock)
            {
                string serializedConsoleMessagesDir = PathUtil.Resolve(GlobalSettingsFacade.SerializedConsoleMessagesDirectory);

                if (Directory.Exists(serializedConsoleMessagesDir) == true)
                {
                    IXmlSerializer xmlSerializer = GetMessageListXmlSerializer();

                    foreach (string xmlFilePath in Directory.GetFiles(serializedConsoleMessagesDir).OrderBy(f=>f))
                    {
                        try
                        {
                            XElement serializedMessages = XElement.Load(xmlFilePath);

                            List<ConsoleMessageQueueElement> messageList = xmlSerializer.Deserialize(serializedMessages) as List<ConsoleMessageQueueElement>;

                            CleanOutOldMessages(messageList);

                            var unknownElements = messageList.Where(f => _elements.Any(g => g.QueueItemNumber == f.QueueItemNumber) == false).ToList();

                            if (unknownElements.Count > 0)
                            {
                                _elements.AddRange(unknownElements);

                                LoggingService.LogVerbose("ConsoleMessageQueue", string.Format("Succesfully loaded {0} Console Messages from the file '{1}'", unknownElements.Count(), xmlFilePath));
                            }
                            else
                            {
                                File.Delete(xmlFilePath); // cleaning up obsolete files
                            }
                        }
                        catch (Exception ex)
                        {
                            LoggingService.LogCritical("ConsoleMessageQueue", ex);

                            try
                            {
                                File.Delete(xmlFilePath); // Delete broken file
                            }
                            catch // Ignore exceptions
                            {
                            }
                        }
                    }

                    if (_elements.Any() == true)
                    {
                        _queueItemCounter = _elements.Max(f => f.QueueItemNumber);
                    }
                }
            }
        }



        private static IXmlSerializer GetMessageListXmlSerializer()
        {
            IXmlSerializer xmlSerializer = new XmlSerializer(new IValueXmlSerializer[] {
                    new SystemPrimitivValueXmlSerializer(),
                    new SerializerHandlerValueXmlSerializer(),
                    new ConsoleMessageQueueElementListValueXmlSerializer(),
                    new SystemCollectionValueXmlSerializer(),
                    new SystemTypesValueXmlSerializer(),
                    new SystemSerializableValueXmlSerializer()});

            return xmlSerializer;
        }
    }
}
