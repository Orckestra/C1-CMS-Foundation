using System.Collections.Generic;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    internal sealed class ProviderHookingElementNode : BaseElementNode
    {
        public ProviderHookingElementNode()
        {
            this.ProviderNames = new List<string>();
        }
        public List<string> ProviderNames { get; set; }
    }
}
