using System;

namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class CachingAttribute : Attribute
	{
        public CachingAttribute(CachingType cachingType)
        {
            this.CachingType = cachingType;
        }


        public CachingType CachingType
        {
            get;
            private set;
        }
	}



    public enum CachingType
    {
        Full,
        None
    }
}
