using System;
using Composite.Data;
using Composite.Core.Xml;

namespace Composite.Core.WebClient.Renderings.Data
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
