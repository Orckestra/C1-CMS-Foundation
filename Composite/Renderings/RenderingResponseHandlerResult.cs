using System;


namespace Composite.Renderings
{
	public sealed class RenderingResponseHandlerResult
	{
        /// <summary>
        /// Default is false
        /// </summary>
        public bool PreventPublicCaching { get; set; }


        /// <summary>
        /// Default is null
        /// </summary>
        public Uri RedirectRequesterTo { get; set; }


        /// <summary>
        /// Default is false
        /// </summary>
        public bool EndRequest { get; set; } 
	}
}
