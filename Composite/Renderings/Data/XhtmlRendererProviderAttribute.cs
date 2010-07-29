using System;


namespace Composite.Renderings.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
