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
        XNamespace ExtensionNamespace { get; }
        object EntensionObjectAsObject { get; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class XsltExtensionDefinition<T> : IXsltExtensionDefinition
	{
        public XNamespace ExtensionNamespace { get; set; }
        public T EntensionObject { get; set; }

        public object EntensionObjectAsObject
        {
            get { return this.EntensionObject; }
        }
    }
}
