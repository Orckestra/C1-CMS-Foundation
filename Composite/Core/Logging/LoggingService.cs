using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.IO;
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
        /// <exclude />
        [FlagsAttribute()]
        public enum Category
        {
            /// <exclude />
            General = 0x1,

            /// <exclude />
            Audit = 0x2,
        }

        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);
        private static readonly string BeginOfInnerExceptionMarker;
        private static readonly string EndOfInnerExceptionMarker;
        private static readonly MethodInfo ExceptionToStringInternal_MethodInfo;

        /// <exclude />
        static LoggingService()
        {
            MethodInfo getRuntimeResourceStringMethodInfo = typeof(Environment)
                .GetMethod("GetRuntimeResourceString", BindingFlags.NonPublic | BindingFlags.Static, null, new[] { typeof(string) }, null);

            // NOTE: "Magic" strings, shouldn't be modified
            BeginOfInnerExceptionMarker = "---> ";
            EndOfInnerExceptionMarker = Environment.NewLine + "   " +
                (string)getRuntimeResourceStringMethodInfo.Invoke(null, new object[] { "Exception_EndOfInnerExceptionStack" });

            ExceptionToStringInternal_MethodInfo = typeof(Exception).GetMethod("ToString", BindingFlags.Instance | BindingFlags.NonPublic);

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }


        /// <exclude />
        public static void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity, int priority, int eventid)
        {
            LogEntry(title, message, null, category, severity, priority, eventid);
        }

        /// <exclude />
        static public void LogEntry(string title, string message, Exception exc, Category category, System.Diagnostics.TraceEventType severity, int priority, int eventid)
        {
            var entry = new Microsoft.Practices.EnterpriseLibrary.Logging.LogEntry();

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

            if (exc != null)
            {
                entry.ExtendedProperties.Add("Exception", exc);
            }

            _resourceLocker.Resources.Writer.Write(entry);
        }

        /// <exclude />
        static public void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity, int priority)
        {
            LogEntry(title, message, category, severity, priority, 0);
        }

        /// <exclude />
        static public void LogEntry(string title, string message, Exception exc, Category category, System.Diagnostics.TraceEventType severity, int priority)
        {
            LogEntry(title, message, exc, category, severity, priority, 0);
        }


        /// <exclude />
        static public void LogEntry(string title, string message, Category category, System.Diagnostics.TraceEventType severity)
        {
            LogEntry(title, message, category, severity, -1, 0);
        }

        /// <exclude />
        static public void LogEntry(string title, string message, Exception exc, Category category, System.Diagnostics.TraceEventType severity)
        {
            LogEntry(title, message, exc, category, severity, -1, 0);
        }


        /// <exclude />
        static public void LogError(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Error);
        }


        /// <exclude />
        static public void LogError(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error);
        }


        /// <exclude />
        static public void LogError(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error, priority);
        }


        /// <exclude />
        static public void LogError(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Error, priority, eventid);
        }


        /// <exclude />
        static public void LogError(string title, Exception e)
        {
            LogEntry(title, PrettyExceptionCallStack(e), e, Category.General, System.Diagnostics.TraceEventType.Error);
        }


        /// <exclude />
        static public void LogCritical(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Critical);
        }


        /// <exclude />
        static public void LogCritical(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical);
        }


        /// <exclude />
        static public void LogCritical(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical, priority);
        }


        /// <exclude />
        static public void LogCritical(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Critical, priority, eventid);
        }


        /// <exclude />
        static public void LogCritical(string title, Exception e)
        {
            LogEntry(title, PrettyExceptionCallStack(e), e, Category.General, System.Diagnostics.TraceEventType.Critical);
        }



        /// <exclude />
        static public void LogInformation(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Information);
        }



        /// <exclude />
        static public void LogVerbose(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Verbose);
        }


        /// <exclude />
        static public void LogVerbose(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose);
        }


        /// <exclude />
        static public void LogVerbose(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose, priority);
        }


        /// <exclude />
        static public void LogVerbose(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Verbose, priority, eventid);
        }




        /// <exclude />
        static public void LogWarning(string title, string message)
        {
            LogEntry(title, message, Category.General, System.Diagnostics.TraceEventType.Warning);
        }


        /// <exclude />
        static public void LogWarning(string title, string message, Category category)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning);
        }


        /// <exclude />
        static public void LogWarning(string title, string message, Category category, int priority)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning, priority);
        }


        /// <exclude />
        static public void LogWarning(string title, string message, Category category, int priority, int eventid)
        {
            LogEntry(title, message, category, System.Diagnostics.TraceEventType.Warning, priority, eventid);
        }


        /// <exclude />
        static public void LogWarning(string title, Exception e)
        {
            LogEntry(title, PrettyExceptionCallStack(e), e, Category.General, System.Diagnostics.TraceEventType.Warning);
        }


        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }


        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }

        static string PrettyExceptionCallStack(Exception ex)
        {
            string serializedException = ex.ToString();

            string cleanException;

            if (ex.InnerException != null && ExcludeInnerExceptionInformation(ex, serializedException, out cleanException))
            {
                return PrettyExceptionCallStack(ex.InnerException) + Environment.NewLine + cleanException;
            }

            var loaderException = ex as ReflectionTypeLoadException;
            if (loaderException?.LoaderExceptions != null)
            {
                foreach (var innerEx in loaderException.LoaderExceptions)
                {
                    serializedException += Environment.NewLine + PrettyExceptionCallStack(innerEx);
                }
            }

            return serializedException;
        }


        private static bool ExcludeInnerExceptionInformation(Exception exception, string serializedException, out string clearedSerializedException)
        {
            string innerExceptionText = exception is ExternalException
                ? BeginOfInnerExceptionMarker + InnerExceptionToString(exception.InnerException)
                : BeginOfInnerExceptionMarker + InnerExceptionToString(exception.InnerException) + EndOfInnerExceptionMarker;

            int offset = serializedException.IndexOf(innerExceptionText, StringComparison.InvariantCulture);
            if (offset < 0)
            {
                clearedSerializedException = null;
                return false;
            }

            clearedSerializedException = serializedException.Substring(0, offset) + serializedException.Substring(offset + innerExceptionText.Length);
            return true;
        }

        private static string InnerExceptionToString(Exception exception)
        {
            return (string)ExceptionToStringInternal_MethodInfo.Invoke(exception, new object[] { true, true });
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
                    string path = Path.Combine(PathUtil.BaseDirectory, string.Format("logging{0}.config", Guid.NewGuid()));

                    using (C1StreamWriter writer = new C1StreamWriter(path))
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

                    resources.Factory = new LogWriterFactory(new FileConfigurationSource(path));
                    resources.Writer = resources.Factory.Create();
                }
            }
        }
    }
}
