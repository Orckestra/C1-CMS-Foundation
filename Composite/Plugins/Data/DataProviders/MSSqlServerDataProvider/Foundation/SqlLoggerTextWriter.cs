using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Composite.Core.Logging;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal sealed class SqlLoggerTextWriter : System.IO.TextWriter
    {
        private static Regex ContainsParamRegex = new Regex(@"@p[0-9]+", RegexOptions.Compiled);
        private static Regex ParamRegex = new Regex(@"-- (?<param>@p[0-9]+):", RegexOptions.Compiled);

        private readonly SqlLoggingContext _sqlLoggingContext;

        private Dictionary<int, Tuple<string, Dictionary<string, string>>> _threadData = new Dictionary<int, Tuple<string, Dictionary<string, string>>>();
        private readonly object _lock = new object();

        public SqlLoggerTextWriter(SqlLoggingContext sqlLoggingContext)
        {
            _sqlLoggingContext = sqlLoggingContext;
            if (_sqlLoggingContext.TablesToIgnore == null) _sqlLoggingContext.TablesToIgnore = new List<string>();
        }



        public override Encoding Encoding
        {
            get { return Encoding.UTF8; }
        }


        public override void WriteLine(string value)
        {
            if (value.StartsWith("--") == false)
            {
                HandleNewQuery(value);
            }
            else if (value.StartsWith("-- Context:") == false)
            {
                HandleParameter(value);
            }
            else
            {
                HandleEndQuery();
            }
        }



        private void HandleNewQuery(string value)
        {
            foreach (string tableToIgnore in _sqlLoggingContext.TablesToIgnore)
            {
                if (value.Contains(tableToIgnore)) return;
            }


            int parameterCount = ContainsParamRegex.Matches(value).Count;

            if (parameterCount == 0)
            {
                AddLogEntry(value);
                return;
            }

            Tuple<string, Dictionary<string, string>> entry = new Tuple<string, Dictionary<string, string>>(value, new Dictionary<string, string>());
            lock (_lock)
            {
                _threadData.Add(Thread.CurrentThread.ManagedThreadId, entry);
            }
        }



        private void HandleParameter(string value)
        {
            if (_threadData.ContainsKey(Thread.CurrentThread.ManagedThreadId) == false) return;

            Match match = ParamRegex.Match(value);
            string paramId = match.Groups["param"].Value;

            string paramValue = value.Substring(value.IndexOf("["));


            Tuple<string, Dictionary<string, string>> entry;
            lock (_lock)
            {
                entry = _threadData[Thread.CurrentThread.ManagedThreadId];
            }

            entry.Item2.Add(paramId, paramValue);
        }



        public void HandleEndQuery()
        {
            Tuple<string, Dictionary<string, string>> entry = null;

            if (_threadData.ContainsKey(Thread.CurrentThread.ManagedThreadId))
            {
                lock (_lock)
                {
                    if (_threadData.ContainsKey(Thread.CurrentThread.ManagedThreadId))
                    {
                        entry = _threadData[Thread.CurrentThread.ManagedThreadId];
                        _threadData.Remove(Thread.CurrentThread.ManagedThreadId);
                    }
                }
            }

            if (entry != null)
            {
                string value = entry.Item1;
                foreach (var kvp in entry.Item2)
                {
                    value = value.Replace(kvp.Key, kvp.Value);
                }

                AddLogEntry(value);
            }
        }



        private void AddLogEntry(string value)
        {
            if (_sqlLoggingContext.IncludeStack)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(value);
                sb.AppendLine("Stack trace:");
                StackTrace trace = new StackTrace(8, true);
                foreach (StackFrame stackFrame in trace.GetFrames())
                {
                    MemberInfo methodInfo = stackFrame.GetMethod();

                    string type = "";
                    if (methodInfo.DeclaringType != null)
                    {
                        type = methodInfo.DeclaringType.FullName;
                    }

                    sb.AppendLine(string.Format("   at {0}.{1} line {2}", type, methodInfo.Name, stackFrame.GetFileLineNumber()));
                }

                value = sb.ToString();
            }

            LoggingService.LogVerbose("RGB(0, 128, 192)SqlQuery", value);
        }
    }
}
