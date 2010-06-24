using System;


namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerCompileUnitIdAttribute : Attribute
	{
        public BuildManagerCompileUnitIdAttribute(string id)
        {
            this.Id = id;
        }



        public string Id
        {
            get;
            private set;
        }
	}
}
