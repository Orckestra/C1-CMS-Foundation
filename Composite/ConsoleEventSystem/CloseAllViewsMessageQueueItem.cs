using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class CloseAllViewsMessageQueueItem : IConsoleMessageQueueItem    
	{
        public string Reason { get; set; }
	}
}
