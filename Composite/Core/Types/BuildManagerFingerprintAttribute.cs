using System;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerFingerprintAttribute : Attribute
	{
        public BuildManagerFingerprintAttribute(string fingerprint)
        {
            this.Fingerprint = fingerprint;
        }



        public string Fingerprint
        {
            get;
            private set;
        }
	}
}
