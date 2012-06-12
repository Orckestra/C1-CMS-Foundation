using System;
using System.ComponentModel;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public sealed class HookingFacadeEventArgs : EventArgs
    {
        /// <exclude />
        public HookingFacadeEventArgs(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            this.ProviderName = providerName;
        }

        /// <exclude />
        public string ProviderName
        {
            get;
            private set;
        }
    }
}
