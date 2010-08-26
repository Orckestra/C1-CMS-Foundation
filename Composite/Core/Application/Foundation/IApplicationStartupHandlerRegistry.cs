using System.Collections.Generic;


namespace Composite.Core.Application.Foundation
{
	internal interface IApplicationStartupHandlerRegistry
	{
        IEnumerable<string> ApplicationStartupHandlerNames { get; }
        void Flush();
	}
}
