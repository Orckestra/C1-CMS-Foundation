using Composite.C1Console.Security;
using Composite.C1Console.Actions;
using System.Collections.Generic;


namespace Composite.Plugins.Elements.ElementProviders.LogElementProvider
{
    [ActionExecutor(typeof(LogElementProviderActionExecutor))]
	internal sealed class ShowLogActionToken : ActionToken
	{
        private IEnumerable<PermissionType> _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string Serialize()
        {
            return "";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ShowLogActionToken();
        }
	}
}
