using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class MediaLibraryDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();

        public MediaLibraryDocumentSource(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<SearchDocument> GetAllSearchDocuments(CultureInfo culture)
        {
            IEnumerable<IMediaFile> mediaFiles;

            using (var conn = new DataConnection())
            {
                mediaFiles = conn.Get<IMediaFile>().Evaluate();
            }

            return mediaFiles.Select(FromMediaFile);
        }

        public IEnumerable<DocumentField> CustomFields =>
            DataTypeSearchReflectionHelper.GetDocumentFields(typeof (IMediaFile));

        private SearchDocument FromMediaFile(IMediaFile mediaFile)
        {
            string label = mediaFile.Title;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = mediaFile.FileName;
            }

            string documentId = mediaFile.Id.ToString();

            var documentBuilder = new SearchDocumentBuilder();

            documentBuilder.SetDataType(typeof(IMediaFile));
            documentBuilder.CrawlData(mediaFile);

            return documentBuilder.BuildDocument(Name, documentId, label, null, mediaFile.GetDataEntityToken());
        }
    }
}
