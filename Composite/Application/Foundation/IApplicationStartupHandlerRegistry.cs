using System.Collections.Generic;


namespace Composite.Application.Foundation
{
	internal interface IApplicationStartupHandlerRegistry
	{
        IEnumerable<string> ApplicationStartupHandlerNames { get; }
        void Flush();
	}
}
