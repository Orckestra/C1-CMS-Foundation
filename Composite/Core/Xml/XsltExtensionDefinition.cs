using System;
using System.Xml.Linq;

namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IXsltExtensionDefinition
    {
        /// <exclude />
        XNamespace ExtensionNamespace { get; }

        /// <exclude />
        object EntensionObjectAsObject { get; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class XsltExtensionDefinition<T> : IXsltExtensionDefinition
	{
        /// <exclude />
        public XNamespace ExtensionNamespace { get; set; }

        /// <exclude />
        public T EntensionObject { get; set; }

        /// <exclude />
        public object EntensionObjectAsObject
        {
            get { return this.EntensionObject; }
        }
    }
}
