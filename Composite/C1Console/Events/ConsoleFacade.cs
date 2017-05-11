using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using Composite.Core;
using Composite.Data;
using Composite.Data.Types;
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
        public string ConsoleId { get; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ConsoleFacade
    {
        private static readonly string LogTitle = nameof(ConsoleFacade);

        /// <exclude />
        public delegate void ConsoleClosedEventDelegate(ConsoleClosedEventArgs args);

        private static TimeSpan? _timeout;
        private static bool _initialized;
        private static readonly object _lock = new object();
        private static event ConsoleClosedEventDelegate _consoleClosedEvent;


        /// <exclude />
        public static void Initialize()
        {
            WorkflowFacade.RunWhenInitialized(() =>
            {
                lock (_lock)
                {
                    if (!_initialized)
                    {
                        WorkflowInstance workflowInstance = WorkflowFacade.CreateNewWorkflow(WorkflowFacade.GetWorkflowType("Composite.C1Console.Events.Workflows.UserConsoleInformationScavengerWorkflow"));
                        workflowInstance.Start();
                        WorkflowFacade.RunWorkflow(workflowInstance);

                        if (RuntimeInformation.IsDebugBuild)
                        {
                            Log.LogVerbose(LogTitle, "Scavenger started");
                        }
                        _initialized = true;
                    }
                }
            });
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
            return (from d in DataFacade.GetData<IUserConsoleInformation>()
                    where d.Username == username
                    select d.ConsoleId).ToList();
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
                    Log.LogVerbose(LogTitle, $"New console registred by '{username}' id = '{consoleId}'");

                    userConsoleInformation = DataFacade.BuildNew<IUserConsoleInformation>();
                    userConsoleInformation.Id = Guid.NewGuid();
                    userConsoleInformation.Username = username;
                    userConsoleInformation.ConsoleId = consoleId;
                    userConsoleInformation.TimeStamp = DateTime.Now;
                    DataFacade.AddNew<IUserConsoleInformation>(userConsoleInformation);
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
                    Log.LogVerbose(LogTitle, "Console unregistred by '{0}' id = '{1}'", userConsoleInformation.Username, userConsoleInformation.ConsoleId);

                    DataFacade.Delete<IUserConsoleInformation>(userConsoleInformation);

                    FireConsoleClosedEvent(userConsoleInformation.ConsoleId);
                }
            }
        }


        /// <exclude />
        public static void Scavenge()
        {
            if(RuntimeInformation.IsDebugBuild)
            {
                Log.LogVerbose(LogTitle, "Starting scavenger run");
            }

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
                        Log.LogWarning(LogTitle, "The console '{0}' owned by the user '{1}' timed out, closing it", userConsoleInformation.ConsoleId, userConsoleInformation.Username);
                        DataFacade.Delete<IUserConsoleInformation>(userConsoleInformation);
                        FireConsoleClosedEvent(userConsoleInformation.ConsoleId);
                    }
                }
            }
        }



        private static TimeSpan Timeout => _timeout ?? (_timeout = GlobalSettingsFacade.ConsoleTimeout).Value;


        private static void FireConsoleClosedEvent(string consoleId)
        {
            lock (_lock)
            {
                _consoleClosedEvent?.Invoke(new ConsoleClosedEventArgs(consoleId));
            }
        }
    }
}
