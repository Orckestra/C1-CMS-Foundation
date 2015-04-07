using System;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ConsoleAction
    {
        /// <exclude />
        public ConsoleAction()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        /// <exclude />
        public string Id { get; set; }

        /// <exclude />
        public int SequenceNumber { get; set; }

        /// <exclude />
        public ActionType ActionType { get; set; }


        /// <exclude />
        public OpenViewParams OpenViewParams { get; set; }

        /// <exclude />
        public OpenGenericViewParams OpenGenericViewParams { get; set; }

        /// <exclude />
        public OpenExternalViewParams OpenExternalViewParams { get; set; }

        /// <exclude />
        public DownloadFileParams DownloadFileParams { get; set; }

        /// <exclude />
        public OpenViewDefinitionParams OpenViewDefinitionParams { get; set; }

        /// <exclude />
        public CloseViewParams CloseViewParams { get; set; }

        /// <exclude />
        public RefreshTreeParams RefreshTreeParams { get; set; }

        /// <exclude />
        public MessageBoxParams MessageBoxParams { get; set; }

        /// <exclude />
        public LogEntryParams LogEntryParams { get; set; }

        /// <exclude />
        public BroadcastMessageParams BroadcastMessageParams { get; set; }

        /// <exclude />
        public CloseAllViewsParams CloseAllViewsParams { get; set; }

        /// <exclude />
        public SaveStatusParams SaveStatusParams { get; set; }

        /// <exclude />
        public BindEntityTokenToViewParams BindEntityTokenToViewParams { get; set; }

        /// <exclude />
        public SelectElementParams SelectElementParams { get; set; }        
    }
}
