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



        /// <exclude />
        public ElementProviderContext(string providerName)
        {
            _providerName = providerName;
        }



        /// <exclude />
        public ElementHandle CreateElementHandle(EntityToken entityToken)
        {
            return new ElementHandle(_providerName, entityToken);
        }



        /// <exclude />
        public string ProviderName
        {
            get { return _providerName; }
        }
    }
}
