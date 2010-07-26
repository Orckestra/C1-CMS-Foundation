using System.Collections.Generic;
using Composite.Security;


namespace Composite.Data.ProcessControlled
{
	internal interface IActionPermissionTypeProvider
	{
        IEnumerable<PermissionType> GetActionPermissionTypes(string actionTypeName, IData data);
	}
}
