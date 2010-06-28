using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace Composite.Xml
{
    internal interface IXsltExtensionDefinition
    {
        XNamespace ExtensionNamespace { get; }
        object EntensionObjectAsObject { get; }
    }



	internal class XsltExtensionDefinition<T> : IXsltExtensionDefinition
	{
        public XNamespace ExtensionNamespace { get; set; }
        public T EntensionObject { get; set; }

        public object EntensionObjectAsObject
        {
            get { return this.EntensionObject; }
        }
    }
}
