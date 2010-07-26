using System;


namespace Composite.Types
{
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
