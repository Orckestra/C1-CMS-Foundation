using System;


namespace Composite.Core.WebClient.Renderings.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public abstract class XhtmlRendererProviderAttribute : Attribute
    {
        /// <exclude />
        public abstract XhtmlRenderingType SupportedRenderingType
        {
            get;
        }

        /// <exclude />
        public abstract IDataXhtmlRenderer BuildRenderer();
    }
}
