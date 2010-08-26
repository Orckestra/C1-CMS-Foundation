using System.Collections.Generic;
using System.Drawing;


namespace Composite.Core.ResourceSystem
{
    internal interface IIconResourceSystemFacade
    {
        IEnumerable<ResourceHandle> GetAllIconHandles();
        ResourceHandle GetResourceHandle(string iconName);
        Bitmap GetIcon(ResourceHandle resourceHandle, IconSize iconSize);
    }
}
