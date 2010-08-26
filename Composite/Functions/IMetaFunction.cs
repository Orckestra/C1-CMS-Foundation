using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IMetaFunction
	{
        string Name { get; }
        string Namespace { get; }
        string Description { get; }
        Type ReturnType { get; }
        IEnumerable<ParameterProfile> ParameterProfiles { get; }
        EntityToken EntityToken { get; }
	}
}
