using System;
using System.Reflection;
using System.Text;
using System.Threading;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;


namespace Composite.Core.Logging
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LoggingService
    {
        [FlagsAttribute()]
        public enum Category
        {
            General = 0x1,
            Audit = 0x2,
        }

        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);
        private static readonly string BeginOfInnerExceptionMarker;
        private static readonly string EndOfInnerExceptionMarker;

        static LoggingService()
        {
            MethodInfo getRuntimeResourceStringMethodInfo = typeof(Environment)
                .GetMethod("GetRuntimeResourceString", BindingFlags.NonPublic | BindingFlags.Static, null, new [] {typeof(string)}, null );

            // NOTE: "Magic" strings, shouldn't be modified
            BeginOfInnerExceptionMarker = "---> ";
            EndOfInnerExceptionMarker = Environment.NewLine +  "   " + 
                (string) getRuntimeResourceStringMethodInfo.Invoke(null, new object[] { "Exception_EndOfInnerExceptionStack" });

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        static public void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity, int priority, int eventid)
        {
            if (GetNoLoggingCounter() > 0)
            {
                return;
            }

            var entry = new Microsoft.Practices.EnterpriseLibrary.Logging.LogEntry();
            //entry.Title = title;
            // TODO: refactor this code
            entry.Title = string.Format("({0} - {1}) {2}", AppDomain.CurrentDomain.Id, Thread.CurrentThread.ManagedThreadId, title);
            entry.Message = message;
            entry.Severity = severity;
            entry.Priority = priority;
            entry.EventId = eventid;

            if ((category & Category.General) != 0)
            {
                entry.Categories.Add("General");
            }

            if ((category & Category.Audit) != 0)
            {
                entry.Categories.Add("Audit");
            }

            _resourceLocker.Resources.Writer.Write(entry);
        }


        static public void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity, int priority)
        {
            LogEntry(title, message, category, severity, priority, 0);
        }

        static public void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity)
        {
            LogEntry(title, message, category, severity, -1, 0);
        }




        static public void LogError(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Error);
        }

        static public void LogError(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error);
        }

        static public void LogError(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error, priority);
        }

        static public void LogError(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error, priority, eventid);
        }

        static public void LogError(string title, Exception e)
        {
            string serializedException = e.ToString();

            if (e.InnerException != null)
            {
                serializedException = ExcludeInnerExceptionInformation(serializedException, e.InnerException);
            }

            LogEntry(title, serializedException, Category.General, System.Diagnostics.TraceEventType.Error);

            if (e.InnerException != null)
            {
                LogError(title + " | INNER", e.InnerException);
            }
        }



        static public void LogCritical(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Critical);
        }

        static public void LogCritical(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical);
        }

        static public void LogCritical(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical, priority);
        }

        static public void LogCritical(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical, priority, eventid);
        }

        static public void LogCritical(string title, Exception e)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine(e.ToString());

            LogEntry(title, sb.ToString(), Category.General, System.Diagnostics.TraceEventType.Critical);

            if (e.InnerException != null)
            {
                LogCritical(title + " | INNER", e.InnerException);
            }
        }


        static public void LogInformation(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Information);
        }


        static public void LogVerbose(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Verbose);
        }

        static public void LogVerbose(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose);
        }

        static public void LogVerbose(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose, priority);
        }

        static public void LogVerbose(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose, priority, eventid);
        }




        static public void LogWarning(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Warning);
        }

        static public void LogWarning(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning);
        }

        static public void LogWarning(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning, priority);
        }

        static public void LogWarning(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning, priority, eventid);
        }

        static public void LogWarning(string title, Exception e)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine(e.ToString());

            LogEntry(title, sb.ToString(), Category.General, System.Diagnostics.TraceEventType.Warning);

            if (e.InnerException != null)
            {
                LogWarning(title + " | INNER", e.InnerException);
            }
        }


        [Obsolete("Has effect only for DataLogTraceListener, which isn't used any more.")]
        public static IDisposable NoLogging
        {
            get
            {
                return new NoLoggingDisposable();
            }
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }


        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }



        private static void PushNoLogging()
        {
            LoggingScopeCounter.Counter++;
        }



        private static void PopNoLogging()
        {
            LoggingScopeCounter.Counter--;
        }



        private static int GetNoLoggingCounter()
        {
            return LoggingScopeCounter.Counter;
        }

        private static string ExcludeInnerExceptionInformation(string serializedException, Exception innerException)
        {

            string innerExceptionText = BeginOfInnerExceptionMarker + innerException.ToString() + EndOfInnerExceptionMarker;

            int offset = serializedException.IndexOf(innerExceptionText);
            if(offset < 0)
            {
                return serializedException;
            }

            return serializedException.Substring(0, offset) + serializedException.Substring(offset + innerExceptionText.Length);
        }

        private sealed class Resources
        {
            public LogWriterFactory Factory { get; set; }
            public LogWriter Writer { get; set; }

            public static void Initialize(Resources resources)
            {
                LoggingSettings section = null;
                if (ConfigurationServices.ConfigurationSource != null)
                {
                    section = ConfigurationServices.ConfigurationSource.GetSection(LoggingSettings.SectionName) as LoggingSettings; ;
                }

                if (section != null)
                {
                    resources.Factory = new LogWriterFactory(ConfigurationServices.ConfigurationSource);
                    resources.Writer = resources.Factory.Create();
                }
                else
                {
                    string path = System.IO.Path.Combine(Core.IO.PathUtil.BaseDirectory, string.Format("logging{0}.config", Guid.NewGuid()));

                    using (Composite.Core.NewIO.StreamWriter writer = new Composite.Core.NewIO.StreamWriter(path))
                    {
                        Type type = typeof(LoggingService).Assembly
                            .GetType("Composite.Plugins.Logging.LogTraceListeners.TcpLogTraceListener.TcpLogTraceListener", false);

                        if ((type != null) && (RuntimeInformation.IsUnittest == false))
                        {
                            #region config file
                            writer.WriteLine(@"<?xml version=""1.0"" encoding=""utf-8""?>
  <configuration>
  <configSections>
    <section name=""loggingConfiguration"" type=""Microsoft.Practices.EnterpriseLibrary.Logging.Configuration.LoggingSettings, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0"" />
  </configSections>
  <loggingConfiguration name=""Logging Application Block"" tracingEnabled=""true""
    defaultCategory=""General"" logWarningsWhenNoCategoriesMatch=""true"">
    <listeners>
        <add listenerDataType=""Microsoft.Practices.EnterpriseLibrary.Logging.Configuration.CustomTraceListenerData, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0""
            traceOutputOptions=""None"" type=""Composite.Plugins.Logging.LogTraceListeners.TcpLogTraceListener.TcpLogTraceListener, Composite, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null""
            name=""Tcp Custom Trace Listener"" initializeData="""" formatter=""Text Formatter"" />
      </listeners>
    <formatters>
     <add template=""Timestamp: {timestamp}&#xD;&#xA;Message: {message}&#xD;&#xA;Category: {category}&#xD;&#xA;Priority: {priority}&#xD;&#xA;EventId: {eventid}&#xD;&#xA;Severity: {severity}&#xD;&#xA;Title: {title}&#xD;&#xA;Machine: {machine}&#xD;&#xA;Application Domain: {appDomain}&#xD;&#xA;Process Id: {processId}&#xD;&#xA;Process Name: {processName}&#xD;&#xA;Win32 Thread Id: {win32ThreadId}&#xD;&#xA;Thread Name: {threadName}&#xD;&#xA;Extended Properties: {dictionary({key} - {value}&#xD;&#xA;)}""
        type=""Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.TextFormatter, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0""
        name=""Text Formatter"" />
     </formatters>
    <categorySources>
      <add switchValue=""All"" name=""General"" />
    </categorySources>
    <specialSources>
      <allEvents switchValue=""All"" name=""All Events"">
        <listeners>
          <add name=""Tcp Custom Trace Listener"" />
        </listeners>
      </allEvents>
      <notProcessed switchValue=""All"" name=""Unprocessed Category"" />
      <errors switchValue=""All"" name=""Logging Errors &amp; Warnings"" />
    </specialSources>
  </loggingConfiguration>
</configuration>");
                            #endregion
                        }
                        else
                        {
                            #region config file
                            writer.WriteLine(@"<?xml version=""1.0"" encoding=""utf-8""?>
  <configuration>
  <configSections>
    <section name=""loggingConfiguration"" type=""Microsoft.Practices.EnterpriseLibrary.Logging.Configuration.LoggingSettings, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0"" />
  </configSections>s
  <loggingConfiguration name=""Logging Application Block"" tracingEnabled=""true""
    defaultCategory=""General"" logWarningsWhenNoCategoriesMatch=""true"">
    <listeners>
      <add listenerDataType=""Microsoft.Practices.EnterpriseLibrary.Logging.Configuration.CustomTraceListenerData, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0""
        traceOutputOptions=""None"" type=""Composite.Core.Logging.NullLogTraceListener, Composite, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null""
        name=""NullLogTraceListener"" initializeData="""" formatter=""Text Formatter"" />
    </listeners>
    <formatters>
      <add template=""Timestamp: {timestamp}&#xD;&#xA;Message: {message}&#xD;&#xA;Category: {category}&#xD;&#xA;Priority: {priority}&#xD;&#xA;EventId: {eventid}&#xD;&#xA;Severity: {severity}&#xD;&#xA;Title:{title}&#xD;&#xA;Machine: {machine}&#xD;&#xA;Application Domain: {appDomain}&#xD;&#xA;Process Id: {processId}&#xD;&#xA;Process Name: {processName}&#xD;&#xA;Win32 Thread Id: {win32ThreadId}&#xD;&#xA;Thread Name: {threadName}&#xD;&#xA;Extended Properties: {dictionary({key} - {value}&#xD;&#xA;)}""
        type=""Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.TextFormatter, Microsoft.Practices.EnterpriseLibrary.Logging, Version=3.0.0.0""
        name=""Text Formatter"" />
    </formatters>
    <categorySources>
      <add switchValue=""All"" name=""General"" />
    </categorySources>
    <specialSources>
      <allEvents switchValue=""All"" name=""All Events"">
        <listeners>
          <add name=""NullLogTraceListener"" />
        </listeners>
      </allEvents>
      <notProcessed switchValue=""All"" name=""Unprocessed Category"" />
      <errors switchValue=""All"" name=""Logging Errors &amp; Warnings"" />
    </specialSources>
  </loggingConfiguration>
</configuration>");
                            #endregion
                        }
                    }

                    resources.Factory = new LogWriterFactory(new Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationSource(path));
                    resources.Writer = resources.Factory.Create();
                }
            }
        }




        private sealed class NoLoggingDisposable : IDisposable
        {
            public NoLoggingDisposable()
            {
                LoggingService.PushNoLogging();
            }

            public void Dispose()
            {
                LoggingService.PopNoLogging();
            }
        }



        private sealed class CounterContainer
        {
            public CounterContainer()
            {
                this.Counter = 0;
            }

            public int Counter { get; set; }
        }


        // Using thread statis because the request life time cache does not work if a non-asp.net is the invoker /MRJ
        [ThreadStatic]
        private static CounterContainer _counterContainer = null;


        private static CounterContainer LoggingScopeCounter
        {
            get
            {
                if (_counterContainer == null)
                {
                    _counterContainer = new CounterContainer();
                }

                return _counterContainer;


                //CounterContainer counterContainer = RequestLifetimeCache.TryGet<CounterContainer>("LoggingService:LoggingScopeCounter");
                //if (counterContainer == null)
                //{
                //    counterContainer = new CounterContainer();
                //    RequestLifetimeCache.Add("LoggingService:LoggingScopeCounter", counterContainer);
                //}

                //return counterContainer;
            }
        }
    }
}
