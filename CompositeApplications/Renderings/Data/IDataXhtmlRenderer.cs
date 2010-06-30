using System;
using Composite.Data;
using Composite.Xml;

namespace Composite.Renderings.Data
{
    public interface IDataXhtmlRenderer
    {
        XhtmlDocument Render(IDataReference dataToRender);
    }
}
