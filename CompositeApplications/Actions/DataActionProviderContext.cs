namespace Composite.Actions
{
    public sealed class DataActionProviderContext
    {
        private string _providerName; 


        internal DataActionProviderContext(string providerName)
        {
            _providerName = providerName;
        }
    }
}
