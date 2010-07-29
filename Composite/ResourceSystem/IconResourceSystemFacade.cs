using System.Collections.Generic;
using System.Drawing;


namespace Composite.ResourceSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IconResourceSystemFacade
    {
        private static IIconResourceSystemFacade _iconResourceSystemFacade = new IconResourceSystemFacadeImpl();

        internal static IIconResourceSystemFacade Implementation { get { return _iconResourceSystemFacade; } set { _iconResourceSystemFacade = value; } }

        public static IEnumerable<ResourceHandle> GetAllIconHandles()
        {
            return _iconResourceSystemFacade.GetAllIconHandles();
        }

        public static ResourceHandle GetResourceHandle(string iconName)
        {
            return _iconResourceSystemFacade.GetResourceHandle(iconName);
        }

        public static Bitmap GetIcon(ResourceHandle resourceHandle, IconSize iconSize)
        {
            return _iconResourceSystemFacade.GetIcon(resourceHandle, iconSize);
        }
    }
}
