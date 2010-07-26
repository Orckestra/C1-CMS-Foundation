using System.Collections.Generic;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
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
