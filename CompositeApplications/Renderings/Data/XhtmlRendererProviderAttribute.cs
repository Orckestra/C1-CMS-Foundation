using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
