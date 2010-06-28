using Composite.Functions.Foundation;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    /// <summary>
    /// A widget function provider can use this class to notify if the providers list of functions
    /// has been changed.
    /// </summary>
    internal sealed class WidgetFunctionNotifier
    {
        internal WidgetFunctionNotifier(string providerName)
        {
            this.ProviderName = providerName;
        }




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
