using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.WebClient.Services.ConsoleMessageService
{
    public sealed class GetMessagesResult
    {
        public int CurrentSequenceNumber { get; set; }
        public List<ConsoleAction> ConsoleActions { get; set; }
    }
}
