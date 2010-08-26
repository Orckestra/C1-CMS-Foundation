using System;


namespace Composite.Core.WebClient.Renderings
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
