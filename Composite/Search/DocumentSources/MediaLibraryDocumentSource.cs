using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Search.Crawling;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Search.DocumentSources
{
    internal class MediaLibraryDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();

        private readonly Lazy<ICollection<DocumentField>> _customFields;
        private readonly DataChangesIndexNotifier _changesIndexNotifier;

        public MediaLibraryDocumentSource()
        {
            _customFields = new Lazy<ICollection<DocumentField>>(() =>
                DataTypeSearchReflectionHelper.GetDocumentFields(typeof(IMediaFile)).Evaluate());

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, typeof(IMediaFile),
                data => FromMediaFile((IMediaFile)data),
                data => ((IMediaFile)data).Id.ToString());
            _changesIndexNotifier.Start();
        }

        public string Name => typeof(IMediaFile).FullName;

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

            var docBuilder = new SearchDocumentBuilder();

            docBuilder.SetDataType(typeof(IMediaFile));
            docBuilder.CrawlData(mediaFile);

            return docBuilder.BuildDocument(Name, documentId, label, null, mediaFile.GetDataEntityToken(), null);
        }
    }
}
