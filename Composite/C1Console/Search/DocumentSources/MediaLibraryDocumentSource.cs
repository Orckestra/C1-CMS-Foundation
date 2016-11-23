using System;
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

        private readonly Lazy<ICollection<DocumentField>> _customFields;

        public MediaLibraryDocumentSource(string name)
        {
            Name = name;
            _customFields = new Lazy<ICollection<DocumentField>>(() =>
                DataTypeSearchReflectionHelper.GetDocumentFields(typeof(IMediaFile)).Evaluate());
        }

        public string Name { get; }

        public ICollection<DocumentField> CustomFields => _customFields.Value;

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

        private SearchDocument FromMediaFile(IMediaFile mediaFile)
        {
            string label = mediaFile.Title;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = mediaFile.FileName;
            }

            string documentId = mediaFile.Id.ToString();

            var documentBuilder = new SearchDocumentBuilder();

            documentBuilder.SetDataType("Media File"); //TODO: localize
            documentBuilder.CrawlData(mediaFile);

            return documentBuilder.BuildDocument(Name, documentId, label, null, mediaFile.GetDataEntityToken());
        }
    }
}
