using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data;
using System.Globalization;
using Composite.Xml;

namespace Composite.Renderings.Data
{
    public interface IDataXhtmlRenderer
    {
        XhtmlDocument Render(IDataReference dataToRender);
    }
}
