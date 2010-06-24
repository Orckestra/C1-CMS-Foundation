using System.Collections.Generic;


namespace Composite.Renderings.Foundation
{
	internal interface IRenderingResponseHandlerRegistry
	{
        IEnumerable<string> RenderingResponseHandlerNames { get; }
        void Flush();
	}
}
