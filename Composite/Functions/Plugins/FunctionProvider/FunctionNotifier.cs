using Composite.C1Console.Events;
using Composite.Core.Configuration;
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
            if (SystemSetupFacade.SetupIsRunning)
            {
                return;
            }

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
