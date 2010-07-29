using System;
using System.IO;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Xml;
using Composite.Security.Foundation.PluginFacades;
using Composite.StringExtensions;
using Composite.Threading;


namespace Composite.Logging.WCF
{
    [ServiceBehavior(InstanceContextMode=InstanceContextMode.Single)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	internal class LogService: ILogService
	{
        private static readonly string LoggerConfigurationFilePath = @"Composite\services\LogService\Logger.config";
        private static readonly object _syncRoot = new object();

        private static string _loggerPassword;

        private static string LoggerPassword
        {
            get
            {
                if (_loggerPassword == null)
                {
                    lock (_syncRoot)
                    {
                        if (_loggerPassword == null)
                        {
                            string configurationFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, LoggerConfigurationFilePath);

                            if (File.Exists(configurationFilePath))
                            {

                                var doc = new XmlDocument();
                                try
                                {
                                    using (var sr = new StreamReader(configurationFilePath))
                                    {
                                        doc.Load(sr);
                                    }

                                    var passwordNode = doc.SelectSingleNode("logger/password"); 
                                    if(passwordNode != null && !string.IsNullOrEmpty(passwordNode.InnerText))
                                    {
                                        _loggerPassword = passwordNode.InnerText;
                                    }
                                }
                                catch(Exception)
                                {
                                    // Do nothing
                                }

                                if (_loggerPassword == null)
                                {
                                    // Deleting configuration file
                                    File.Delete(configurationFilePath);
                                }
                            }

                            if (_loggerPassword == null) 
                            {
                                _loggerPassword = Guid.NewGuid().ToString();

                                string configFile = @"<logger> <password>{0}</password> </logger>".FormatWith(_loggerPassword);

                                File.WriteAllText(configurationFilePath, configFile);
                            }
                        }
                    }
                }

                return _loggerPassword;
            }
        }

        public string Authenticate(string adminPassword)
        {
            bool userIsValid;

            using(ThreadDataManager.Initialize())
            {
                userIsValid = LoginProviderPluginFacade.FormValidateUser("admin", adminPassword);
            }

            return userIsValid ? LoggerPassword : string.Empty;
        }

        public DateTime GetLastStartupTime()
        {
            CheckSecurity();

            return LogManager.GetLastStartupTime();
        }

        public DateTime GetServerTime()
        {
            CheckSecurity();

            return DateTime.Now;
        }

        public DateTime[] GetLoggingDates()
        {
            CheckSecurity();

            return LogManager.GetLoggingDates();
        }

        public int GetLogEntriesCount(DateTime timeFrom, DateTime timeTo, bool includeVerbose)
        {
            CheckSecurity();

            return LogManager.GetLogEntriesCount(timeFrom, timeTo, includeVerbose);
        }

        public int GetLogEntriesCountByDate(DateTime date, bool includeVerbose)
        {
            CheckSecurity();

            return LogManager.GetLogEntriesCountByDate(date, includeVerbose);
        }

        public LogEntry[] GetLogEntries(DateTime timeFrom, DateTime timeTo, bool includeVerbose, int maximumAmount)
        {
            CheckSecurity();

            return Wrap(LogManager.GetLogEntries(timeFrom, timeTo, includeVerbose, maximumAmount));
        }

        public LogEntry[] GetLogEntriesFrom(DateTime timeFrom, bool includeVerbose, int maximumAmount)
        {
            CheckSecurity();

            return GetLogEntries(timeFrom, DateTime.MaxValue, includeVerbose, maximumAmount);
        }

        private static void CheckSecurity()
        {
            string header = OperationContext.Current.IncomingMessageHeaders.GetHeader<string>("AuthToken", "Composite.Logger");

            Verify.That(header == LoggerPassword, "User hasn't been authentificated");
        }

        private static LogEntry[] Wrap(Composite.Logging.LogEntry[] logEntries)
        {
            if (logEntries == null)
            {
                return null;
            }

            var result = new LogEntry[logEntries.Length];
            for (int i = 0; i < result.Length; i++)
            {
                result[i] = new LogEntry(logEntries[i]);
            }

            return result;
        }
    }
}
