using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Composite.Core;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal sealed class SqlLoggerTextWriter : System.IO.TextWriter
    {
        private static readonly Regex ContainsParamRegex = new Regex(@"@(p|x)[0-9]+", RegexOptions.Compiled);
        private static readonly Regex ParamRegex = new Regex(@"-- (?<param>@(p|x)[0-9]+):", RegexOptions.Compiled);

        private readonly SqlLoggingContext _sqlLoggingContext;

        private readonly ConcurrentDictionary<int, Tuple<string, Dictionary<string, string>>> _threadData 
            = new ConcurrentDictionary<int, Tuple<string, Dictionary<string, string>>>();

        public SqlLoggerTextWriter(SqlLoggingContext sqlLoggingContext)
        {
            _sqlLoggingContext = sqlLoggingContext;
            if (_sqlLoggingContext.TablesToIgnore == null) _sqlLoggingContext.TablesToIgnore = new List<string>();
        }



        public override Encoding Encoding => Encoding.UTF8;


        public override void WriteLine(string value)
        {
            if (!value.StartsWith("--"))
            {
                HandleNewQuery(value);
            }
            else if (!value.StartsWith("-- Context:"))
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
            if (_sqlLoggingContext.TablesToIgnore.Any(value.Contains))
            {
                return;
            }


            int parameterCount = ContainsParamRegex.Matches(value).Count;

            if (parameterCount == 0)
            {
                AddLogEntry(value);
                return;
            }

            var entry = new Tuple<string, Dictionary<string, string>>(value, new Dictionary<string, string>());

            _threadData[Thread.CurrentThread.ManagedThreadId] = entry;
        }



        private void HandleParameter(string value)
        {
            Tuple<string, Dictionary<string, string>> entry;

            if (!_threadData.TryGetValue(Thread.CurrentThread.ManagedThreadId, out entry))
            {
                return;
            }

            Match match = ParamRegex.Match(value);

            string paramId = match.Groups["param"].Value;
            if (string.IsNullOrEmpty(paramId))
            {
                Log.LogWarning(nameof(SqlLoggerTextWriter), "Failed to parse parameter line: " + value);
                return;
            }

            string paramValue = value.Substring(value.IndexOf('['));
            entry.Item2.Add(paramId, paramValue);
        }



        public void HandleEndQuery()
        {
            Tuple<string, Dictionary<string, string>> entry;

            var threadId = Thread.CurrentThread.ManagedThreadId;

            if (_threadData.TryRemove(threadId, out entry))
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
                var sb = new StringBuilder();
                sb.AppendLine(value);
                sb.AppendLine("Stack trace:");

                var trace = new StackTrace(8, true);
                foreach (StackFrame stackFrame in trace.GetFrames())
                {
                    MemberInfo methodInfo = stackFrame.GetMethod();

                    string type = "";
                    if (methodInfo.DeclaringType != null)
                    {
                        type = methodInfo.DeclaringType.FullName;
                    }

                    sb.AppendLine($"   at {type}.{methodInfo.Name} line {stackFrame.GetFileLineNumber()}");
                }

                value = sb.ToString();
            }

            Log.LogVerbose("RGB(0, 128, 192)SqlQuery", value);
        }
    }
}
