using System.Collections.Generic;
using Composite.Security;


namespace Composite.Data.ProcessControlled
{
	public interface IActionPermissionTypeProvider
	{
        IEnumerable<PermissionType> GetActionPermissionTypes(string actionTypeName, IData data);
	}
}
