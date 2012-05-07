using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// This class is responsible for rendering the provided job onto the provided asp.net web forms page. The Render method is called at page construction
    /// and is expected to hook on to asp.net page events (like PreInit) to drive the rendering. This happens early enough to enable the renderer to attach
    /// a Master page to the page if desired.
    /// </summary>
    public interface IPageRenderer
    {
        void AttachToPage(System.Web.UI.Page renderTaget, PageRenderingJob renderJob);
    }
}
