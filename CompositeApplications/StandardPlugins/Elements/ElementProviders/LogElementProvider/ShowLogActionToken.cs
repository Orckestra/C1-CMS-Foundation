using Composite.Security;
using Composite.Actions;
using System.Collections.Generic;


namespace Composite.StandardPlugins.Elements.ElementProviders.LogElementProvider
{
    [ActionExecutor(typeof(LogElementProviderActionExecutor))]
	public sealed class ShowLogActionToken : ActionToken
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
