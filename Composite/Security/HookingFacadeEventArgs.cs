using System;


namespace Composite.Security
{
    internal sealed class HookingFacadeEventArgs : EventArgs
    {
        public HookingFacadeEventArgs(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            this.ProviderName = providerName;
        }


        public string ProviderName
        {
            get;
            private set;
        }
    }
}
