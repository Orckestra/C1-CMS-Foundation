using System;
using System.Web.UI;

namespace Composite.WebClient
{
    public class FlowPage: Page
    {
        public bool SaveStepSucceded { get; set; }
        public EventHandler OnSave { get; set; }
    }
}
