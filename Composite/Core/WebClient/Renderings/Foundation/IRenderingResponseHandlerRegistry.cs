using System.Collections.Generic;


namespace Composite.Core.WebClient.Renderings.Foundation
{
	internal interface IRenderingResponseHandlerRegistry
	{
        IEnumerable<string> RenderingResponseHandlerNames { get; }
        void Flush();
	}
}
