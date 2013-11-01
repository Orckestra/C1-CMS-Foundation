using System;
using Composite.C1Console.Actions;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IManagementConsoleMessageService : IFlowControllerService
    {
        /// <exclude />
        void CloseCurrentView();

        /// <exclude />
        void RefreshTreeSection(EntityToken entityToken);

        /// <exclude />
        void ShowMessage(DialogType dialogType, string title, string message);

        /// <exclude />
        void ShowGlobalMessage(DialogType dialogType, string title, string message);

        /// <exclude />
        void ShowLogEntry(Type sender, Exception exception);

        /// <exclude />
        void ShowLogEntry(Type sender, LogLevel logLevel, string message);

        /// <exclude />
        bool HasView { get; }

        /// <exclude />
        bool CloseCurrentViewRequested { get; }

        /// <exclude />
        string CurrentConsoleId { get; }

        /// <exclude />
        void RebootConsole();

        /// <exclude />
        void CollapseAndRefresh();

        /// <exclude />
        void LockSystem();

        /// <exclude />
        void BroadcastMessage(string name, string value);

        /// <exclude />
        void SaveStatus(bool succeeded);

        /// <exclude />
        void BindEntityTokenToView(string entityToken);

        /// <exclude />
        void SelectElement(string entityToken);
    }
}
