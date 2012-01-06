using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [ActionExecutor(typeof(ClearServerCacheActionExecutor))]
    internal sealed class ClearServerCacheActionToken : ActionToken
    {
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string Serialize()
        {
            return "PackageElementProvider.ClearServerCache";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ClearServerCacheActionToken();
        }
    }
}
