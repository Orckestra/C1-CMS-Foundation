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
