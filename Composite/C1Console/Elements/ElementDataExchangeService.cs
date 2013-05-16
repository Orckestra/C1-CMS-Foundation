using System;

using Composite.C1Console.Elements.Foundation.PluginFacades;


namespace Composite.C1Console.Elements
{
    internal sealed class ElementDataExchangeService : IElementDataExchangeService
    {
        public ElementDataExchangeService(string elementProviderName)
        {
            this.ElementProviderName = elementProviderName;
        }

        private string ElementProviderName { get; set; }

        public object GetData(string name)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name");

            return ElementFacade.GetData(new ElementProviderHandle(this.ElementProviderName), name);
        }
    }
}
