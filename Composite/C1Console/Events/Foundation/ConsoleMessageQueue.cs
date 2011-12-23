using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Serialization;
using Composite.Core.Xml;


namespace Composite.C1Console.Events.Foundation
{
    internal sealed class ConsoleMessageQueue
    {
        private const string MessageQueueFileName = "ConsoleMessages.xml";
        private int _queueItemCounter = 1;
        private readonly object _lock = new object();
        private readonly TimeSpan _timeInterval;
        private readonly List<ConsoleMessageQueueElement> _elements = new List<ConsoleMessageQueueElement>();
        private string MessageQueueFilePath { get; set; }

        public ConsoleMessageQueue(int secondsForItemToLive)
        {
            string directory = PathUtil.Resolve(GlobalSettingsFacade.SerializedConsoleMessagesDirectory);
            if (!C1Directory.Exists(directory)) C1Directory.CreateDirectory(directory);

            MessageQueueFilePath = Path.Combine(directory, MessageQueueFileName);

            _timeInterval = new TimeSpan(0, 0, secondsForItemToLive);
            
            DeserializeMessagesFromFileSystem();

            Timer timer = new Timer(OnWeed, null, new TimeSpan(0, 0, 0), _timeInterval);
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

                SerializeMessagesToFileSystem();
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

            lock (_lock)
            {
                for (int i = _elements.Count - 1; i >= 0; i--)
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



        private void OnWeed(object obj)
        {
            lock (_lock)
            {
                CleanOutOldMessages(_elements);
            }
        }

      

        private void CleanOutOldMessages(List<ConsoleMessageQueueElement> listToClean)
        {
            DateTime now = DateTime.Now;

            int count = listToClean.Count<ConsoleMessageQueueElement>(element => element.EnqueueTime + _timeInterval < now);
           
            if (count > 0)
            {
                listToClean.RemoveRange(0, count);
                SerializeMessagesToFileSystem();
            }
        }



        public void DoDebugSerializationToFileSystem()
        {
            SerializeMessagesToFileSystem(true);
        }



        private void SerializeMessagesToFileSystem(bool forDebug = false)
        {
            lock (_lock)
            {                
                if (_elements != null && _elements.Count > 0)
                {
                    IXmlSerializer xmlSerializer = GetMessageListXmlSerializer();

                    XElement serializedMessages = xmlSerializer.Serialize(_elements.GetType(), _elements);

                    string serializedConsoleMessagesDir = PathUtil.Resolve((forDebug ? GlobalSettingsFacade.TempDirectory : GlobalSettingsFacade.SerializedConsoleMessagesDirectory));

                    //string timeSortedUniqueFileName = string.Format("{0}.{1}.xml", (long.MaxValue - DateTime.Now.Ticks), Guid.NewGuid());
                    string queueElementsXmlFilePath = Path.Combine(serializedConsoleMessagesDir, MessageQueueFileName);

                    serializedMessages.SaveToPath(queueElementsXmlFilePath);
                }
            }
        }

        

        private void DeserializeMessagesFromFileSystem()
        {
            lock (_lock)
            {
                if (!C1File.Exists(MessageQueueFilePath)) return;

                XElement serializedMessages = XElementUtils.Load(MessageQueueFilePath);

                IXmlSerializer xmlSerializer = GetMessageListXmlSerializer();
                List<ConsoleMessageQueueElement> messageList = xmlSerializer.Deserialize(serializedMessages) as List<ConsoleMessageQueueElement>;

                CleanOutOldMessages(messageList);

                //foreach (string xmlFilePath in C1Directory.GetFiles(serializedConsoleMessagesDir).OrderBy(f => f))
                //{
                //    try
                //    {
                //        XElement serializedMessages = XElementUtils.Load(xmlFilePath);

                //        List<ConsoleMessageQueueElement> messageList = xmlSerializer.Deserialize(serializedMessages) as List<ConsoleMessageQueueElement>;

                //        CleanOutOldMessages(messageList);

                //        var unknownElements = messageList.Where(f => _elements.Any(g => g.QueueItemNumber == f.QueueItemNumber) == false).ToList();

                //        if (unknownElements.Count > 0)
                //        {
                //            _elements.AddRange(unknownElements);

                //            LoggingService.LogVerbose("ConsoleMessageQueue", string.Format("Succesfully loaded {0} Console Messages from the file '{1}'", unknownElements.Count(), xmlFilePath));
                //        }
                //        else
                //        {
                //            C1File.Delete(xmlFilePath); // cleaning up obsolete files
                //        }
                //    }
                //    catch (Exception ex)
                //    {
                //        LoggingService.LogCritical("ConsoleMessageQueue", ex);

                //        try
                //        {
                //            C1File.Delete(xmlFilePath); // Delete broken file
                //        }
                //        catch // Ignore exceptions
                //        {
                //        }
                //    }
                //}

                if (_elements.Any())
                {
                    _queueItemCounter = _elements.Max(f => f.QueueItemNumber);
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
