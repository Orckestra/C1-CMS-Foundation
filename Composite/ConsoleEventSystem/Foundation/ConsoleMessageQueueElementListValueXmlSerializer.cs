using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Serialization;
using System.Collections.Generic;
using Composite.Logging;


namespace Composite.ConsoleEventSystem.Foundation
{
    internal sealed class ConsoleMessageQueueElementListValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedList)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            serializedList = null;
            if (objectToSerializeType != typeof(List<ConsoleMessageQueueElement>)) return false;

            List<ConsoleMessageQueueElement> queueElements = objectToSerialize as List<ConsoleMessageQueueElement>;

            serializedList = new XElement("ConsoleMessageQueueElements");

            if (queueElements != null)
            {
                foreach (ConsoleMessageQueueElement queueElement in queueElements)
                {
                    XElement serializedQueueItem = xmlSerializer.Serialize(queueElement.QueueItem.GetType(), queueElement.QueueItem);

                    XElement serializedElement = new XElement("QueueElement",
                        new XAttribute("time", queueElement.EnqueueTime),
                        new XAttribute("number", queueElement.QueueItemNumber),
                        new XAttribute("itemtype", queueElement.QueueItem.GetType()),
                        serializedQueueItem);

                    if (string.IsNullOrEmpty(queueElement.ReceiverConsoleId) == false)
                    {
                        serializedElement.Add(new XAttribute("console", queueElement.ReceiverConsoleId));
                    }

                    serializedList.Add(serializedElement);
                }
            }

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "ConsoleMessageQueueElements") return false;

            List<ConsoleMessageQueueElement> queueElements = new List<ConsoleMessageQueueElement>();

            foreach (XElement queueElement in serializedObject.Elements())
            {
                ConsoleMessageQueueElement result = new ConsoleMessageQueueElement();
                result.EnqueueTime = DateTime.Parse(queueElement.Attribute("time").Value);
                result.QueueItemNumber = Int32.Parse(queueElement.Attribute("number").Value);
                if (queueElement.Attribute("console") != null)
                    result.ReceiverConsoleId = queueElement.Attribute("console").Value;

                try
                {
                    result.QueueItem = (IConsoleMessageQueueItem)xmlSerializer.Deserialize(queueElement.Elements().First());
                }
                catch (Exception ex)
                {
                    string errorInfo = string.Format("Deserialization of message #{0} failed with an '{1}' exception - the message has been dropped. Details: '{2}'", queueElement.Attribute("number").Value, ex.GetType().Name, ex.Message);
                    // pad queue to ensure sequence.
                    LoggingService.LogWarning("ConsoleMessageQueue", errorInfo);
                    result.QueueItem = new LogEntryMessageQueueItem { Level = LogLevel.Error, Message = errorInfo, Sender = this.GetType() }; 
                }

                queueElements.Add(result);
            }

            deserializedObject = queueElements;
            return true;
        }
    }
}

