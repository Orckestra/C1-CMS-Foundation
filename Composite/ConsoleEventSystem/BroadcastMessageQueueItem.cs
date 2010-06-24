using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class BroadcastMessageQueueItem : IConsoleMessageQueueItem
	{
        public string Name { get; set; }
        public string Value { get; set; }
	}
}
