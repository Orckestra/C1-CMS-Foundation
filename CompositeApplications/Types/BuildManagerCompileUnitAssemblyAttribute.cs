using System;


namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Assembly)]
    public sealed class BuildManagerCompileUnitAssemblyAttribute : Attribute
	{
        public BuildManagerCompileUnitAssemblyAttribute(string id, bool cacheble)
        {
            this.Id = id;
            this.Cacheble = cacheble;
        }


        public string Id
        {
            get;
            private set;
        }


        public bool Cacheble
        {
            get;
            private set;
        }
	}
}
