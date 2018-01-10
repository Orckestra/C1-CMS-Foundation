using Composite.Core.Xml;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// An interface that allows post processing of pages generated with <see cref="PageRenderer"/> class.
    /// </summary>
    public interface IPageContentFilter
    {
        /// <summary>
        /// Filters the output.
        /// </summary>
        /// <param name="document">The document to be updated.</param>
        /// <param name="page">The C1 page currently being rendered.</param>
        /// <returns></returns>
        void Filter(XhtmlDocument document, IPage page);

        /// <summary>
        /// Gets the execution order. Filters wil lower values will be executed first.
        /// </summary>
        int Order { get; }
    }
}