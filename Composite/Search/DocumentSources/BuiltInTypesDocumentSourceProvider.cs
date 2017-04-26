using System.Collections.Generic;

namespace Composite.Search.DocumentSources
{
    internal class BuiltInTypesDocumentSourceProvider: ISearchDocumentSourceProvider
    {
        private readonly ISearchDocumentSource[] _documentSources;

        public BuiltInTypesDocumentSourceProvider(
            CmsPageDocumentSource cmsPageDocumentSource,
            MediaLibraryDocumentSource mediaLibraryDocumentSource)
        {
            _documentSources = new ISearchDocumentSource[]
            {
                cmsPageDocumentSource,
                mediaLibraryDocumentSource
            };
        }

        public IEnumerable<ISearchDocumentSource> GetDocumentSources() => _documentSources;
    }
}
