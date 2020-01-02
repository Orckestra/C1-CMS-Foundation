using System;


namespace Composite.Core.WebClient.Renderings
{
    /// <summary>
    /// Describe how a request should be handled in terms of allowing the request, ending it, redirecting it and caching it.
    /// </summary>
	public sealed class RenderingResponseHandlerResult
	{
        /// <summary>
        /// When true full page caching will explicitly be denied. Page caching can greatly increase website performance,
        /// but is not desireable on pages that require validation or contain personalized content. Default is false.
        /// </summary>
        public bool PreventPublicCaching { get; set; }


        /// <summary>
        /// To block the request and have the user redirected to another location specify the destination URL here. 
        /// Default is null.
        /// </summary>
        public Uri RedirectRequesterTo { get; set; }


        /// <summary>
        /// When true, the request will not continue. Default is false
        /// </summary>
        public bool EndRequest { get; set; }

        internal bool IsNotEmpty => PreventPublicCaching || EndRequest || RedirectRequesterTo != null;
    }
}
