using System;
using Composite.Data;
using Composite.Xml;

namespace Composite.Renderings.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDataXhtmlRenderer
    {
        XhtmlDocument Render(IDataReference dataToRender);
    }
}
