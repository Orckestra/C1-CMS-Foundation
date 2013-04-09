using Composite.C1Console.Security;


namespace Composite.C1Console.Elements
{
    /// <summary>   
    /// Context assigned to element providers when they are constructed. Contains a helper method for constructing a provider specific <see cref="ElementHandle"/> and the configuation based name of the provider.
    /// </summary>
    public sealed class ElementProviderContext
    {
        private string _providerName;



        /// <summary>
        /// Constructs a new instance of <see cref="ElementProviderContext"/>
        /// </summary>
        /// <param name="providerName">Name of the provider</param>
        public ElementProviderContext(string providerName)
        {
            _providerName = providerName;
        }



        /// <summary>
        /// Created a provider instance (based on name) specific <see cref="ElementHandle"/> for a given <see cref="EntityToken"/>, making it possible to tie an entiry token to a specific provider instance. 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <returns></returns>
        public ElementHandle CreateElementHandle(EntityToken entityToken)
        {
            return new ElementHandle(_providerName, entityToken);
        }



        /// <summary>
        /// The name if the provider instance. This name typically originate from configuration. A given provider type may exist as multiple instances, but all with have a unique name.
        /// </summary>
        public string ProviderName
        {
            get { return _providerName; }
        }
    }
}
