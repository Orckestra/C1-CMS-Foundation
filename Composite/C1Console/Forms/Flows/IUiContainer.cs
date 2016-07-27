using System.Collections.Generic;
using Composite.Core.ResourceSystem;

namespace Composite.C1Console.Forms.Flows
{
    internal interface IUiContainer
    {
        IUiControl Render(
            IUiControl innerForm,
            IUiControl customToolbarItems,
            IFormChannelIdentifier channel, 
            IDictionary<string, object> eventHandlerBindings, 
            string containerLabel,
            string containerLabelField,
            string containerTooltip,
            ResourceHandle containerIcon);
    }
}
