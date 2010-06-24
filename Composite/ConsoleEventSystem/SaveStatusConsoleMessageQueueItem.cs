using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class SaveStatusConsoleMessageQueueItem : IConsoleMessageQueueItem
	{
        public string ViewId { get; set; }
        public bool Succeeded { get; set; }
	}
}
