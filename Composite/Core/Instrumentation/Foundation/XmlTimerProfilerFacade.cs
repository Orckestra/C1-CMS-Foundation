using System;
using System.Xml.Linq;
using System.Collections.Generic;


namespace Composite.Core.Instrumentation.Foundation
{
    internal sealed class XmlTimerProfilerFacade : IDisposable
    {
        private static XmlTimerProfilerFacade _instance = null;
        private static readonly object _lock = new object();


        public Stack<XElement> _elementStack = new Stack<XElement>();


        private XmlTimerProfilerFacade()
        {
            Composite.Core.Logging.LoggingService.LogVerbose("XmlTimerProfilerFacade", "XmlTimerProfiler running");
            _elementStack.Push(new XElement("Root"));
        }



        internal static XmlTimerProfilerFacade Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lock)
                    {
                        if (_instance == null)
                        {
                            _instance = new XmlTimerProfilerFacade();
                        }
                    }
                }

                return _instance;
            }
        }



        internal void Push(string methodName, string message)
        {
            lock (_lock)
            {
                XElement element = _elementStack.Peek();
                
                XElement newElement = new XElement(methodName.Replace('`', '_').Replace('+', '_').Replace('<', '_').Replace('>', '_'));
                if (message != null)
                {
                    newElement.Add(new XAttribute("message", message));
                }
                _elementStack.Push(newElement);

                //System.Threading.Thread.CurrentThread.ManagedThreadId
                element.Add(newElement);
            }
        }



        internal void Pop(int elapsedTime)
        {
            lock (_lock)
            {
                XElement element = _elementStack.Pop();

                element.Add(new XAttribute("elapsedTime", elapsedTime));
            }
        }        



        public void Dispose()
        {
            try
            {
                XElement element = _elementStack.Pop();

                XDocument doc = new XDocument(element);

                // avoid writes to windows/system32 dir on web
                doc.Save(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "TimerProfile.xml"));
            }
            catch( Exception ex)
            {
                Composite.Core.Logging.LoggingService.LogCritical("XmlTimerProfilerFacade", ex);
            }
        }



        ~XmlTimerProfilerFacade()
        {
            Dispose();
        }
    }
}
