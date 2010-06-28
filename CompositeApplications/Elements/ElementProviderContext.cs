using Composite.Security;


namespace Composite.Elements
{
    internal sealed class ElementProviderContext
    {
        private string _providerName;



        public ElementProviderContext(string providerName)
        {
            _providerName = providerName;
        } 



        public ElementHandle CreateElementHandle(EntityToken entityToken)
        {
            return new ElementHandle(_providerName, entityToken);
        }



        public string ProviderName
        {
            get { return _providerName; }
        }
    }
}
