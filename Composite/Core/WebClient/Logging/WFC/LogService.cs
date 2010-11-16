using System;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Xml;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.WebClient.Logging.WCF
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    internal class LogService : ILogService
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

                            if (C1File.Exists(configurationFilePath))
                            {

                                var doc = new XmlDocument();
                                try
                                {
                                    using (var sr = new C1StreamReader(configurationFilePath))
                                    {
                                        doc.Load(sr);
                                    }

                                    var passwordNode = doc.SelectSingleNode("logger/password");
                                    if (passwordNode != null && !string.IsNullOrEmpty(passwordNode.InnerText))
                                    {
                                        _loggerPassword = passwordNode.InnerText;
                                    }
                                }
                                catch (Exception)
                                {
                                    // Do nothing
                                }

                                if (_loggerPassword == null)
                                {
                                    // Deleting configuration file
                                    C1File.Delete(configurationFilePath);
                                }
                            }

                            if (_loggerPassword == null)
                            {
                                _loggerPassword = Guid.NewGuid().ToString();

                                string configFile = @"<logger> <password>{0}</password> </logger>".FormatWith(_loggerPassword);

                                C1File.WriteAllText(configurationFilePath, configFile);
                            }
                        }
                    }
                }

                return _loggerPassword;
            }
        }

        public string GetVersion()
        {
            return "2.0";
        }

        public string Authenticate(string loginAndPassword)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return "";

            bool userIsValid;

            string login;
            string password;

            int separatorOffset = loginAndPassword.IndexOf("|");
            if(separatorOffset > 0 && separatorOffset < loginAndPassword.Length - 1)
            {
                login = loginAndPassword.Substring(0, separatorOffset);
                password = loginAndPassword.Substring(separatorOffset + 1);
            }
            else
            {
                // Backward compatibility with old LogViewer
                login = "admin";
                password = loginAndPassword;
            }

            bool userIsAdmin = false;

            using (ThreadDataManager.Initialize())
            {
                userIsValid = LoginProviderPluginFacade.FormValidateUser(login, password);

                // Checking whether the user is an administrator
                if(userIsValid)
                {
                    IUserGroup adminGroup = DataFacade.GetData<IUserGroup>().Where(f => f.Name == "Administrator").SingleOrDefault();

                    userIsAdmin = adminGroup != null && UserGroupFacade.GetUserGroupIds(login).Any(groupId => groupId == adminGroup.Id);
                }
            }

            return (userIsValid && userIsAdmin) ? LoggerPassword : string.Empty;
        }

        public DateTime GetLastStartupTime()
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return DateTime.MinValue;

            CheckSecurity();

            return LogManager.GetLastStartupTime();
        }

        public DateTime GetServerTime()
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return DateTime.MinValue;

            CheckSecurity();

            return DateTime.Now;
        }

        public DateTime[] GetLoggingDates()
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return new DateTime[] { };

            CheckSecurity();

            return LogManager.GetLoggingDates();
        }

        public int GetLogEntriesCount(DateTime timeFrom, DateTime timeTo, bool includeVerbose)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return 0;

            CheckSecurity();

            return LogManager.GetLogEntriesCount(timeFrom, timeTo, includeVerbose);
        }

        public int GetLogEntriesCountByDate(DateTime date, bool includeVerbose)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return 0;

            CheckSecurity();

            return LogManager.GetLogEntriesCountByDate(date, includeVerbose);
        }

        public LogEntry[] GetLogEntries(DateTime timeFrom, DateTime timeTo, bool includeVerbose, int maximumAmount)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return new LogEntry[] { };

            CheckSecurity();

            return Wrap(LogManager.GetLogEntries(timeFrom, timeTo, includeVerbose, maximumAmount));
        }

        public LogEntry[] GetLogEntriesFrom(DateTime timeFrom, bool includeVerbose, int maximumAmount)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return new LogEntry[] { };

            CheckSecurity();

            return GetLogEntries(timeFrom, DateTime.MaxValue, includeVerbose, maximumAmount);
        }

        private static void CheckSecurity()
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return;

            string header = OperationContext.Current.IncomingMessageHeaders.GetHeader<string>("AuthToken", "Composite.Logger");

            Verify.That(header == LoggerPassword, "User hasn't been authentificated");
        }

        private static LogEntry[] Wrap(Composite.Core.Logging.LogEntry[] logEntries)
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
