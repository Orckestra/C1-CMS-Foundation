using System.Collections.Generic;
using System.Globalization;
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

            foreach (var mediaFile in mediaFiles)
            {
                yield return FromMediaFile(mediaFile);
            }
        }

        private SearchDocument FromMediaFile(IMediaFile mediaFile)
        {
            string label = mediaFile.Title;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = mediaFile.Title;
            }

            string documentId = mediaFile.Id.ToString();
            return new SearchDocument(Name, documentId, label, mediaFile.GetDataEntityToken())
            {
                FullText = new [] { mediaFile.FileName, mediaFile.Description }
            };
        }
    }
}
