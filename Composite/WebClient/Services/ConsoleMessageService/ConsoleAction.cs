using System;


namespace Composite.WebClient.Services.ConsoleMessageService
{
    public class ConsoleAction
    {
        public ConsoleAction()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }
        public int SequenceNumber { get; set; }
        
        public ActionType ActionType { get; set; }

        public OpenViewParams OpenViewParams { get; set; }
        public OpenGenericViewParams OpenGenericViewParams { get; set; }
        public DownloadFileParams DownloadFileParams { get; set; }
        public OpenViewDefinitionParams OpenViewDefinitionParams { get; set; }
        public CloseViewParams CloseViewParams { get; set; }
        public RefreshTreeParams RefreshTreeParams { get; set; }
        public MessageBoxParams MessageBoxParams { get; set; }
        public LogEntryParams LogEntryParams { get; set; }
        public BroadcastMessageParams BroadcastMessageParams { get; set; }
        public CloseAllViewsParams CloseAllViewsParams { get; set; }
        public SaveStatusParams SaveStatusParams { get; set; }
        public BindEntityTokenToViewParams BindEntityTokenToViewParams { get; set; }
    }
}
