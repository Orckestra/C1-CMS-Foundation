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
        /// <exclude />
        string Name { get; }

        /// <exclude />
        string Namespace { get; }

        /// <exclude />
        string Description { get; }

        /// <exclude />
        Type ReturnType { get; }

        /// <exclude />
        IEnumerable<ParameterProfile> ParameterProfiles { get; }

        /// <exclude />
        EntityToken EntityToken { get; }
	}
}
