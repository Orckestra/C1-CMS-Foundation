using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.Functions
{
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
