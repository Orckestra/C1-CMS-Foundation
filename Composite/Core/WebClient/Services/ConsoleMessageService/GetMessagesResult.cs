using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class GetMessagesResult
    {
        public int CurrentSequenceNumber { get; set; }
        public List<ConsoleAction> ConsoleActions { get; set; }
    }
}
