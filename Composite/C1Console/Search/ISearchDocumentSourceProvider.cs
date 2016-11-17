using System.Collections.Generic;

namespace Composite.C1Console.Search
{
    public interface ISearchDocumentSourceProvider
    {
        IEnumerable<ISearchDocumentSource> GetDocumentSources();
    }
}
