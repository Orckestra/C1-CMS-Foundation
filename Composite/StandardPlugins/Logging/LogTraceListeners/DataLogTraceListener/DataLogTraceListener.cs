using System;
using System.Linq;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Web;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;
using System.Transactions;
using Composite.Transactions;
using Composite.Linq;
using System.Collections.Generic;

using LogEntry = Microsoft.Practices.EnterpriseLibrary.Logging.LogEntry;

namespace Composite.StandardPlugins.Logging.LogTraceListeners.DataLogTraceListener
{
    [Obsolete]
    [ConfigurationElementType(typeof(CustomTraceListenerData))]
    public sealed class DataLogTraceListener : CustomTraceListener
    {
        private static readonly object _lock = new object();
        private static bool _addingInterface = false;

        private TraceEventType _traceEventType = TraceEventType.Transfer;
        private bool _useRecycling = false;
        private int _recycleMinLevel;
        private int _recycleMaxLevel;
        private int? _currentCount;


        public DataLogTraceListener()
        {
        }



        public DataLogTraceListener(string initData)
        {
            if (string.IsNullOrEmpty(initData) == false)
            {
                string[] initializeDatas = initData.Split(',');

                try
                {
                    _traceEventType = (TraceEventType)Enum.Parse(typeof(TraceEventType), initializeDatas[0].Trim());

                    if (initializeDatas.Length > 1)
                    {
                        _useRecycling = true;
                        _recycleMinLevel = int.Parse(initializeDatas[1].Trim());
                        _recycleMaxLevel = int.Parse(initializeDatas[2].Trim());
                    }

                }
                catch (Exception)
                {
                }
            }
        }



        public override void TraceData(TraceEventCache eventCache, string source, TraceEventType eventType, int id, object data)
        {
            if (_traceEventType < eventType) return;

            using (GlobalInitializerFacade.CoreNotLockedScope)
            {
                if (GlobalInitializerFacade.SystemCoreInitialized == true)
                {
                    if (DataFacade.GetAllInterfaces().Contains(typeof(ILogEntry)) == false)
                    {
                        lock (_lock)
                        {
                            if (DataFacade.GetAllInterfaces().Contains(typeof(ILogEntry)) == false)
                            {
                                if (_addingInterface == false)
                                {
                                    _addingInterface = true;

                                    DataTypeDescriptor dataTypeDescripto = DynamicTypeManager.BuildNewDataTypeDescriptor(typeof(ILogEntry));

                                    DynamicTypeManager.CreateStore(dataTypeDescripto);
                                }
                            }
                        }
                    }
                    else
                    {
                        LogEntry entry = (LogEntry)data;

                        using (DataEventSystemFacade.SuppressEvents)
                        using (LoggingService.NoLogging)
                        {
                            ILogEntry logEntry = DataFacade.BuildNew<ILogEntry>();

                            Regex regex = new Regex(@"RGB\((?<r>[0-9]+), (?<g>[0-9]+), (?<b>[0-9]+)\)");
                            Match matchTitle = regex.Match(entry.Title);
                            if (matchTitle.Success == true)
                            {
                                entry.Title = entry.Title.Replace(matchTitle.Groups[0].Value, "");
                            }

                            Match matchMessage = regex.Match(entry.Message);
                            if (matchMessage.Success == true)
                            {
                                entry.Message = entry.Message.Replace(matchMessage.Groups[0].Value, "");
                            }


                            logEntry.Id = Guid.NewGuid();
                            logEntry.Title = (entry.Title.Length > 256 ? entry.Title.Substring(0, 256) : entry.Title);

                            logEntry.Message = entry.Message;
                            logEntry.TraceEventType = eventType.ToString();
                            if (logEntry.TraceEventType.Length > 64) logEntry.TraceEventType = logEntry.TraceEventType.Substring(0, 64);
                            logEntry.TimeStamp = entry.TimeStamp;
                            logEntry.Priority = entry.Priority;
                            logEntry.AppDomainName = (entry.AppDomainName.Length > 256 ? entry.AppDomainName.Substring(0, 256) : entry.AppDomainName);
                            logEntry.MachineName = (entry.MachineName.Length > 256 ? entry.MachineName.Substring(0, 256) : entry.MachineName);

                            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.Url != null)
                            {
                                logEntry.HttpRequestUrl = HttpContext.Current.Request.Url.ToString();

                                if (logEntry.HttpRequestUrl.Length > 512)
                                    logEntry.HttpRequestUrl = logEntry.HttpRequestUrl.Substring(0, 512);

                                if (HttpContext.Current.Request.UrlReferrer != null)
                                {
                                    logEntry.HttpReferingUrl = HttpContext.Current.Request.UrlReferrer.ToString();

                                    if (logEntry.HttpRequestUrl.Length > 512)
                                        logEntry.HttpReferingUrl = logEntry.HttpReferingUrl.Substring(0, 512);
                                }
                            }

                            using (TransactionScope transactionScope = TransactionsFacade.SuppressTransactionScope())
                            {
                                DataFacade.AddNew<ILogEntry>(logEntry);
                                transactionScope.Complete();
                            }

                            if (_useRecycling == true)
                            {
                                if (_currentCount.HasValue == false)
                                {
                                    _currentCount = DataFacade.GetData<ILogEntry>().Count();
                                }

                                _currentCount++;

                                if (_currentCount.Value > _recycleMaxLevel)
                                {
                                    //_currentCount = DataFacade.GetData<ILogEntry>().Count();

                                    IEnumerable<ILogEntry> logEntires;
                                    using (TransactionsFacade.SuppressTransactionScope())
                                    {
                                        logEntires =
                                            DataFacade.GetData<ILogEntry>().
                                            OrderBy(f => f.TimeStamp).
                                            Take(_recycleMaxLevel - _recycleMinLevel).
                                            Evaluate();
                                    }

                                    foreach (ILogEntry le in logEntires)
                                    {
                                        try
                                        {
                                            using (TransactionsFacade.SuppressTransactionScope())
                                            {
                                                DataFacade.Delete(le);
                                            }
                                        }
                                        catch
                                        {
                                        }
                                    }

                                    _currentCount = DataFacade.GetData<ILogEntry>().Count();
                                }
                            }
                        }
                    }
                }
            }
        }


        public override void Write(string message)
        {
            // NOOP
        }



        public override void WriteLine(string compositeMessage)
        {
            // NOOP
        }
    }
}
