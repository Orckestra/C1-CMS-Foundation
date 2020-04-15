using System.Xml.Linq;
using Composite.Functions;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// This class is responsible for rendering the provided job onto the provided ASP.NET Web Forms page. 
    /// The AttachToPage method is called at page construction  and is expected to hook on to asp.net page events (like PreInit) to drive the rendering. 
    /// </summary>
    public interface IPageRenderer
    {
        /// <summary>
        /// Attaches rendering code to an instance of <c cref="System.Web.UI.Page"></c>.
        /// </summary>
        /// <param name="renderTarget">The render target.</param>
        /// <param name="contentToRender">The render job.</param>
        void AttachToPage(System.Web.UI.Page renderTarget, PageContentToRender contentToRender);
    }

    /// <summary>
    /// A page renderer that does not rely of request being handled by ASP.NET Web Forms
    /// and does not support UserControl functions
    /// </summary>
    public interface ISlimPageRenderer : IPageRenderer
    {
        /// <summary>
        /// Rendering the content into an <c cref="XDocument" />.
        /// </summary>
        /// <param name="contentToRender">The render job.</param>
        /// <param name="functionContextContainer">The function context container.</param>
        XDocument Render(PageContentToRender contentToRender, 
                         FunctionContextContainer functionContextContainer);
    }
}
