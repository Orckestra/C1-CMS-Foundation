using Composite.C1Console.Security;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ElementProviderContext
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
