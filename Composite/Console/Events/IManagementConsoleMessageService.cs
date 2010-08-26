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
        void CloseCurrentView();
        void RefreshTreeSection(EntityToken entityToken);
        void ShowMessage(DialogType dislogType, string title, string message);
        void ShowGlobalMessage(DialogType dialogType, string title, string message);
        void ShowLogEntry(Type sender, Exception exception);
        void ShowLogEntry(Type sender, LogLevel logLevel, string message);
        bool HasView { get; }
        bool CloseCurrentViewRequested { get; }
        string CurrentConsoleId { get; }
        void RebootConsole();
        void CollapseAndRefresh();
        void LockSystem();
        void BroadcastMessage(string name, string value);
        void SaveStatus(bool succeeded);
        void BindEntityTokenToView(string entityToken);
    }
}
