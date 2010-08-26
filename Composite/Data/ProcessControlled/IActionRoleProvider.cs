using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Data.ProcessControlled
{
	internal interface IActionPermissionTypeProvider
	{
        IEnumerable<PermissionType> GetActionPermissionTypes(string actionTypeName, IData data);
	}
}
