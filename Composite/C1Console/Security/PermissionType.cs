using System;
using System.Collections.Generic;
using System.Text;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// Permission types that can be attached to actions in the C1 Console
    /// </summary>
    public enum PermissionType
    {
        /// <summary>
        /// User may read/view the element
        /// </summary>
        Read = 0,

        /// <summary>
        /// User may edit the element
        /// </summary>
        Edit = 1,

        /// <summary>
        /// User may add items below this element
        /// </summary>
        Add = 2,

        /// <summary>
        /// User may delete the element
        /// </summary>
        Delete = 3,

        /// <summary>
        /// User may approve the element as part of a workflow
        /// </summary>
        Approve = 4,

        /// <summary>
        /// User may publish the element as part of a workflow
        /// </summary>
        Publish = 5,

        /// <summary>
        /// User may do administrative tasks on the element
        /// </summary>
        Administrate = 6,

        /// <exclude />
        ClearPermissions = 7,

        /// <summary>
        /// User may do configuration tasks on the element - super user actions.
        /// </summary>
        Configure = 8
    }



    internal static class PermissionTypePredefined
    {
        public static readonly IEnumerable<PermissionType> Add = new PermissionType[] { PermissionType.Add };
        public static readonly IEnumerable<PermissionType> Delete = new PermissionType[] { PermissionType.Delete };
        public static readonly IEnumerable<PermissionType> Edit = new PermissionType[] { PermissionType.Edit };
    }



    internal static class PermissionTypeExtensionMethods
    {
        public static IEnumerable<PermissionType> FromListOfStrings(this IEnumerable<string> permissionTypeNames)
        {
            if (permissionTypeNames == null) throw new ArgumentNullException("permissionTypeNames");

            foreach (string permissionTypeName in permissionTypeNames)
            {
                PermissionType permissionType = (PermissionType)Enum.Parse(typeof(PermissionType), permissionTypeName);

                yield return permissionType;
            }
        }



        public static string SerializePermissionTypes(this IEnumerable<PermissionType> permissionTypes)
        {
            if (permissionTypes == null) throw new ArgumentNullException("permissionType");

            StringBuilder sb = new StringBuilder();
            bool first = true;
            foreach (PermissionType permissionType in permissionTypes)
            {
                if (first == false) sb.Append("·");
                else first = false;

                sb.Append(permissionType.ToString());
            }

            return sb.ToString();
        }




        public static IEnumerable<PermissionType> DesrializePermissionTypes(this string serializedPermissionTypes)
        {
            if (serializedPermissionTypes == null) throw new ArgumentNullException("serializedPermissionTypes");

            string[] split = serializedPermissionTypes.Split(new[] { '·' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (string s in split)
            {
                yield return (PermissionType)Enum.Parse(typeof(PermissionType), s);
            }
        }
    }
}
