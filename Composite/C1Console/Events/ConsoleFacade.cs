using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Logging;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;


namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ConsoleClosedEventArgs : EventArgs
    {
        /// <exclude />
        public ConsoleClosedEventArgs(string consoleId)
        {
            this.ConsoleId = consoleId;
        }


        /// <exclude />
        public string ConsoleId
        {
            get;
            private set;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ConsoleFacade
    {
        /// <exclude />
        public delegate void ConsoleClosedEventDelegate(ConsoleClosedEventArgs args);

        private static TimeSpan? _timeout = null; 
        private static bool _initialized = false;
        private static readonly object _lock = new object();
        private static event ConsoleClosedEventDelegate _consoleClosedEvent;


        /// <exclude />
        public static void Initialize()
        {
            lock (_lock)
            {
                if (_initialized == false)
                {
                    WorkflowInstance workflowInstance = WorkflowFacade.CreateNewWorkflow(WorkflowFacade.GetWorkflowType("Composite.C1Console.Events.Workflows.UserConsoleInformationScavengerWorkflow"));
                    workflowInstance.Start();
                    WorkflowFacade.RunWorkflow(workflowInstance);

                    LoggingService.LogVerbose("ConsoleFacade", "Scavenger started");

                    _initialized = true;
                }
            }
        }



        /// <summary>
        /// Flush code MAY NOT do ANY kind of re-initialization. 
        /// </summary>
        /// <param name="eventDelegate"></param>
        public static void SubscribeToConsoleClosedEvent(ConsoleClosedEventDelegate eventDelegate)
        {
            _consoleClosedEvent += eventDelegate;
        }


        /// <exclude />
        public static void UnsubscribeFromConsoleClosedEvent(ConsoleClosedEventDelegate eventDelegate)
        {
            _consoleClosedEvent -= eventDelegate;
        }


        /// <exclude />
        public static void CloseConsole(string consoleId)
        {
            UnregisterConsole(UserSettings.Username, consoleId);            
        }


        /// <exclude />
        public static IEnumerable<string> GetConsoleIdsByUsername(string username)
        {
            List<string> consoleIds =
                (from d in DataFacade.GetData<IUserConsoleInformation>()
                 where d.Username == username                        
                 select d.ConsoleId).ToList();

            return consoleIds;
        }



        internal static void RegisterConsole(string username, string consoleId)
        {
            using(GlobalInitializerFacade.CoreIsInitializedScope) 
            lock (_lock)
            {
                IUserConsoleInformation userConsoleInformation =
                    (from d in DataFacade.GetData<IUserConsoleInformation>()
                     where d.Username == username &&
                           d.ConsoleId == consoleId
                     select d).FirstOrDefault();

                if (userConsoleInformation == null)
                {
                    LoggingService.LogVerbose("ConsoleFacade", string.Format("New console registred by '{0}' id = '{1}'", username, consoleId));

                    userConsoleInformation = DataFacade.BuildNew<IUserConsoleInformation>();
                    userConsoleInformation.Id = Guid.NewGuid();
                    userConsoleInformation.Username = username;
                    userConsoleInformation.ConsoleId = consoleId;
                    userConsoleInformation.TimeStamp = DateTime.Now;
                    userConsoleInformation = DataFacade.AddNew<IUserConsoleInformation>(userConsoleInformation);
                }
                else
                {
                    userConsoleInformation.TimeStamp = DateTime.Now;
                    DataFacade.Update(userConsoleInformation);
                }
            }
        }



        internal static void UnregisterConsole(string username, string consoleId)
        {
            lock (_lock)
            {
                List<IUserConsoleInformation> userConsoleInformations =
                    (from d in DataFacade.GetData<IUserConsoleInformation>()
                     where d.Username == username && d.ConsoleId == consoleId
                     select d).ToList();

                foreach (IUserConsoleInformation userConsoleInformation in userConsoleInformations)
                {
                    LoggingService.LogVerbose("ConsoleFacade", string.Format("Console unregistred by '{0}' id = '{1}'", userConsoleInformation.Username, userConsoleInformation.ConsoleId));

                    DataFacade.Delete<IUserConsoleInformation>(userConsoleInformation);
                }
            }
        }


        /// <exclude />
        public static void Scavenge()
        {
            LoggingService.LogVerbose("ConsoleFacade", "Starting scavenger run");

            using(GlobalInitializerFacade.CoreIsInitializedScope) // Holding this lock in order to avoid deadlocks
            lock (_lock)
            {
                DateTime now = DateTime.Now;
                List<IUserConsoleInformation> userConsoleInformations =
                    (from d in DataFacade.GetData<IUserConsoleInformation>()
                     select d).ToList();

                foreach (IUserConsoleInformation userConsoleInformation in userConsoleInformations)
                {
                    if (now - userConsoleInformation.TimeStamp > Timeout)
                    {
                        LoggingService.LogVerbose("ConsoleFacade", string.Format("The console '{0}' owned by the user '{1}' timed out, closing it", userConsoleInformation.ConsoleId, userConsoleInformation.Username));
                        DataFacade.Delete<IUserConsoleInformation>(userConsoleInformation);
                        FireConsoleClosedEvent(userConsoleInformation.ConsoleId);
                    }
                }
            }
        }



        private static TimeSpan Timeout
        {
            get
            {
                if (_timeout.HasValue == false)
                {
                    _timeout = GlobalSettingsFacade.ConsoleTimeout;
                }

                return _timeout.Value;
            }
        }



        private static void FireConsoleClosedEvent(string consoleId)
        {
            lock (_lock)
            {
                ConsoleClosedEventDelegate consoleClosedEvent = _consoleClosedEvent;

                if (consoleClosedEvent != null)
                {
                    consoleClosedEvent(new ConsoleClosedEventArgs(consoleId));
                }
            }
        }
    }
}
