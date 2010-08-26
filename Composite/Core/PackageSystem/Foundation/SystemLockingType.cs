using System.Xml.Linq;


namespace Composite.Core.PackageSystem.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum SystemLockingType
    {
        None,
        Soft,
        Hard
    }


    internal static class SystemLockingTypeExtensionMethods
    {
        public static bool TryDeserialize(this XAttribute attribute, out SystemLockingType systemLockingType)
        {
            systemLockingType = SystemLockingType.Hard;

            if (attribute == null) return true;

            if (attribute.Value == "soft") systemLockingType = SystemLockingType.Soft;
            else if (attribute.Value == "hard") systemLockingType = SystemLockingType.Hard;
            else if (attribute.Value == "none") systemLockingType = SystemLockingType.None;
            else return false;

            return true;
        }



        public static string Serialize(this SystemLockingType systemLockingType)
        {
            return systemLockingType.ToString().ToLower();
        }
    }
}
