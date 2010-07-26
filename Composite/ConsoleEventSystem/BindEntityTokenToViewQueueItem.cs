using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public class BindEntityTokenToViewQueueItem : IConsoleMessageQueueItem
	{
        public string ViewId { get; set; }
        public string EntityToken { get; set; }
	}
}
