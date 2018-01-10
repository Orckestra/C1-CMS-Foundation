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

        private readonly Lazy<IReadOnlyCollection<DocumentField>> _customFields;
        private readonly DataChangesIndexNotifier _changesIndexNotifier;
        private readonly IEnumerable<ISearchDocumentBuilderExtension> _docBuilderExtensions;

        public MediaLibraryDocumentSource(IEnumerable<ISearchDocumentBuilderExtension> extensions)
        {
            _customFields = new Lazy<IReadOnlyCollection<DocumentField>>(() =>
                DataTypeSearchReflectionHelper.GetDocumentFields(typeof(IMediaFile)).ToList());

            _docBuilderExtensions = extensions;

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, typeof(IMediaFile),
                (data, culture) => FromMediaFile((IMediaFile)data),
                data => ((IMediaFile)data).Id.ToString());
            _changesIndexNotifier.Start();
        }

        public string Name => typeof(IMediaFile).FullName;

        public IReadOnlyCollection<DocumentField> CustomFields => _customFields.Value;

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<DocumentWithContinuationToken> GetSearchDocuments(CultureInfo culture, string continuationToken = null)
        {
            IEnumerable<IMediaFile> mediaFiles;

            Guid lastMediaFileId = continuationToken == null ? Guid.Empty : new Guid(continuationToken);

            using (var conn = new DataConnection())
            {
                mediaFiles = conn.Get<IMediaFile>()
                    .Where(m => m.Id.CompareTo(lastMediaFileId) > 0)
                    .OrderBy(m => m.Id)
                    .Evaluate();
            }

            return mediaFiles.Select(m => new DocumentWithContinuationToken
            {
                Document = FromMediaFile(m),
                ContinuationToken = m.Id.ToString()
            });
        }

        private SearchDocument FromMediaFile(IMediaFile mediaFile)
        {
            string label = mediaFile.Title;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = mediaFile.FileName;
            }

            string documentId = mediaFile.Id.ToString();

            var docBuilder = new SearchDocumentBuilder(_docBuilderExtensions);

            docBuilder.SetDataType(typeof(IMediaFile));
            docBuilder.CrawlData(mediaFile);

            return docBuilder.BuildDocument(Name, documentId, label, null, mediaFile.GetDataEntityToken());
        }
    }
}
