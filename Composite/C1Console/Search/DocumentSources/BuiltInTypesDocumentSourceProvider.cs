using System.Collections.Generic;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class BuiltInTypesDocumentSourceProvider: ISearchDocumentSourceProvider
    {
        private readonly List<ISearchDocumentSource> _documentSources;

        public BuiltInTypesDocumentSourceProvider()
        {
            _documentSources = new List<ISearchDocumentSource>
            {
                new CmsPageDocumentSource(),
                new MediaLibraryDocumentSource()
            };
        }

        public IEnumerable<ISearchDocumentSource> GetDocumentSources()
        {
            return _documentSources;
        }
    }
}
