using System;
using System.Text;
using Composite.Core.Configuration;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Events
{
    internal sealed class ManagementConsoleMessageService : IManagementConsoleMessageService
    {
        private bool _closeCurrentViewRequested = false;

        public ManagementConsoleMessageService(string consoleId)
        {
            if (consoleId == null) throw new ArgumentNullException("consoleId");

            this.ConsoleId = consoleId;
        }


        public ManagementConsoleMessageService(string consoleId, string viewId)
        {
            if (consoleId == null) throw new ArgumentNullException("consoleId");

            this.ConsoleId = consoleId;
            this.ViewId = viewId;
        }

        private string ConsoleId { get; set; }
        private string ViewId { get; set; }



        public bool HasView
        {
            get
            {
                return (string.IsNullOrEmpty(this.ViewId) == false);
            }
        }


        public void CloseCurrentView()
        {
            if (string.IsNullOrEmpty(this.ViewId)) throw new InvalidOperationException("Can not close current view. No view ID has been associated with this message service");

            if (_closeCurrentViewRequested == false)
            {
                ConsoleMessageQueueFacade.Enqueue(new CloseViewMessageQueueItem { ViewId = this.ViewId }, this.ConsoleId);
            }

            _closeCurrentViewRequested = true;
        }


        public void RefreshTreeSection(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            if (GlobalSettingsFacade.BroadcastConsoleElementChanges)
            {
                ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = entityToken }, null);
            }
            else
            {
                ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = entityToken }, this.ConsoleId);
            }
        }


        public void ShowLogEntry(Type sender, Exception exception)
        {
            StringBuilder messageBuilder = new StringBuilder();

            Exception logException = exception;

            string indention = "";

            while (logException != null)
            {
                messageBuilder.AppendLine(String.Format("{0}{1} threw an exception of type {2}", indention, logException.Source, logException.GetType()));
                messageBuilder.AppendLine(indention + logException.Message);
                if (logException.StackTrace != null)
                {
                    messageBuilder.AppendLine(indention + logException.StackTrace.Replace("\n", "\n" + indention));
                }

                indention += "     ";
                logException = logException.InnerException;
                if (logException != null) messageBuilder.AppendLine();
            }

            ShowLogEntry(sender, LogLevel.Fatal, messageBuilder.ToString());
        }


        public void ShowLogEntry(Type sender, LogLevel logLevel, string message)
        {
            ConsoleMessageQueueFacade.Enqueue(new LogEntryMessageQueueItem { Sender = sender, Level = logLevel, Message = message }, this.ConsoleId);
        }


        public void ShowMessage(DialogType dialogType, string title, string message)
        {
            ConsoleMessageQueueFacade.Enqueue(new MessageBoxMessageQueueItem { DialogType = dialogType, Title = title, Message = message }, this.ConsoleId);
        }


        public void ShowGlobalMessage(DialogType dialogType, string title, string message)
        {
            ConsoleMessageQueueFacade.Enqueue(new MessageBoxMessageQueueItem { DialogType = dialogType, Title = title, Message = message }, null);
        }

        public bool CloseCurrentViewRequested
        {
            get { return _closeCurrentViewRequested; }
        }

        public string CurrentConsoleId
        {
            get { return this.ConsoleId; }
        }

        public void RebootConsole()
        {
            ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), this.ConsoleId);
        }

        public void CollapseAndRefresh()
        {
            ConsoleMessageQueueFacade.Enqueue(new CollapseAndRefreshConsoleMessageQueueItem(), this.ConsoleId);
        }

        public void LockSystem()
        {
            ConsoleMessageQueueFacade.Enqueue(new LockSystemConsoleMessageQueueItem(), this.ConsoleId);
        }

        public void BroadcastMessage(string name, string value)
        {
            ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = name, Value = value }, this.ConsoleId);
        }

        public void SaveStatus(bool succeeded)
        {
            ConsoleMessageQueueFacade.Enqueue(new SaveStatusConsoleMessageQueueItem { ViewId = ViewId, Succeeded = succeeded }, this.ConsoleId);
        }

        public void BindEntityTokenToView(string entityToken)
        {
            ConsoleMessageQueueFacade.Enqueue(new BindEntityTokenToViewQueueItem { ViewId = ViewId, EntityToken = entityToken }, this.ConsoleId);
        }

        public void SelectElement(string entityToken)
        {
            ConsoleMessageQueueFacade.Enqueue(new SelectElementQueueItem { EntityToken = entityToken }, this.ConsoleId);
        }
    }
}
