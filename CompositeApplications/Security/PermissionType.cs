using System;
using System.Collections.Generic;
using System.Text;


namespace Composite.Security
{
    public enum PermissionType
    {
        Read,
        Edit,
        Add,
        Delete,
        Approve,
        Publish,
        Administrate,
        ClearPermissions
    }



    public static class PermissionTypePredefined
    {
        public static readonly IEnumerable<PermissionType> Add = new PermissionType[] { PermissionType.Add };
        public static readonly IEnumerable<PermissionType> Delete = new PermissionType[] { PermissionType.Delete };
        public static readonly IEnumerable<PermissionType> Edit = new PermissionType[] { PermissionType.Edit };
    }



    public static class PermissionTypeExtensionMethods
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

            string[] split = serializedPermissionTypes.Split(new [] {'·'}, StringSplitOptions.RemoveEmptyEntries);

            foreach (string s in split)
            {
                yield return (PermissionType)Enum.Parse(typeof(PermissionType), s);
            }
        }
    }
}
