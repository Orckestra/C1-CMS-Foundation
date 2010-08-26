using Composite.C1Console.Security;
using Composite.C1Console.Actions;
using System.Collections.Generic;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    [ActionExecutor(typeof(AllFunctionsProviderActionExecutor))]
	internal sealed class DocumentFunctionsActionToken : ActionToken
	{
        private IEnumerable<PermissionType> _permissionTypes = new PermissionType[] { PermissionType.Read };

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
            return new DocumentFunctionsActionToken();
        }
	}
}
