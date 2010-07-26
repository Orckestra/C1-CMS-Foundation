using Composite.Functions.Foundation;


namespace Composite.Functions.Plugins.FunctionProvider
{
    /// <summary>
    /// A function provider can use this class to notify if the providers list of functions
    /// has been changed.
    /// </summary>
	public sealed class FunctionNotifier
	{        
        internal FunctionNotifier(string providerName)
        {
            this.ProviderName = providerName;
        }




        public void FunctionsUpdated()
        {
            MetaFunctionProviderRegistry.ReinitializeFunctionFromProvider(this.ProviderName);
        }



        private string ProviderName
        {
            get;
            set;
        }
	}
}
