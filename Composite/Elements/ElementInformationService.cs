using System.Collections.Generic;
using Composite.Actions;


namespace Composite.Elements
{
    public class ElementInformationService : IElementInformationService
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
