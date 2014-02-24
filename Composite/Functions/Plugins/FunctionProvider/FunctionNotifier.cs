using Composite.C1Console.Events;
using Composite.Functions.Foundation;


namespace Composite.Functions.Plugins.FunctionProvider
{
    /// <summary>
    /// A function provider can use this class to notify if the providers list of functions
    /// has been changed.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FunctionNotifier
	{        
        internal FunctionNotifier(string providerName)
        {
            this.ProviderName = providerName;
        }



        /// <exclude />
        public void FunctionsUpdated()
        {
            MetaFunctionProviderRegistry.ReinitializeFunctionFromProvider(this.ProviderName);

            GlobalEventSystemFacade.FireDesignChangeEvent();
        }



        private string ProviderName
        {
            get;
            set;
        }
	}
}
