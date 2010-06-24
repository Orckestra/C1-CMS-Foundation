using System;

using Composite.Elements.Foundation.PluginFacades;


namespace Composite.Elements
{
    public sealed class ElementDataExchangeService : IElementDataExchangeService
    {
        public ElementDataExchangeService(string elementProviderName)
        {
            this.ElementProviderName = elementProviderName;
        }

        private string ElementProviderName { get; set; }

        public object GetData(string name)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");

            return ElementFacade.GetData(new ElementProviderHandle(this.ElementProviderName), name);
        }
    }
}
