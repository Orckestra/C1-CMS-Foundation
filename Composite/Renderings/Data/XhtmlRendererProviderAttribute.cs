using System;


namespace Composite.Renderings.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public abstract class XhtmlRendererProviderAttribute : Attribute
    {
        public abstract XhtmlRenderingType SupportedRenderingType
        {
            get;
        }

        public abstract IDataXhtmlRenderer BuildRenderer();
    }
}
