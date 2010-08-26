using System.Collections.Generic;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Elements
{
    internal class ElementInformationService : IElementInformationService
	{
        private ElementHandle _elementHandle;


        public ElementInformationService(ElementHandle elementHandle)
        {
            _elementHandle = elementHandle;
        }



        public string ProviderName
        {
            get 
            { 
                return _elementHandle.ProviderName; 
            }
        }



        public Dictionary<string, string> Piggyback
        {
            get 
            {
                return _elementHandle.Piggyback;
            }
        }
    }
}
