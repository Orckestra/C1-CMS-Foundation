using Composite.Functions.Foundation;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    /// <summary>
    /// A widget function provider can use this class to notify if the providers list of functions
    /// has been changed.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class WidgetFunctionNotifier
    {
        internal WidgetFunctionNotifier(string providerName)
        {
            this.ProviderName = providerName;
        }



        /// <exclude />
        public void WidgetFunctionsUpdated()
        {
            MetaFunctionProviderRegistry.ReinitializeWidgetFunctionFromProvider(this.ProviderName);
        }



        private string ProviderName
        {
            get;
            set;
        }
    }
}
