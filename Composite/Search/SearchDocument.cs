using System.Collections.Generic;
using Composite.C1Console.Security;

namespace Composite.Search
{
    /// <summary>
    /// Represents a console document to be indexed and searched for.
    /// </summary>
    public sealed class SearchDocument
    {
        /// <summary>
        /// To be used for deserialization.
        /// </summary>
        public SearchDocument()
        {
            
        }

        /// <summary>
        /// Constructs a new search document.
        /// </summary>
        /// <param name="source">The data source name.</param>
        /// <param name="id">An id to update the document later on.</param>
        /// <param name="label">A text to be shown in search results.</param>
        /// <param name="serializedEntityToken">The serialized entity token, will be used to locate the found document in the 
        /// console tree structure.</param>
        public SearchDocument(string source, string id, string label, string serializedEntityToken)
        {
            Verify.ArgumentNotNull(source, nameof(source));
            Verify.ArgumentNotNull(id, nameof(id));
            Verify.ArgumentNotNull(label, nameof(label));
            Verify.ArgumentNotNull(serializedEntityToken, nameof(serializedEntityToken));

            Source = source;
            Id = id;
            Label = label;
            SerializedEntityToken = serializedEntityToken;
        }

        /// <summary>
        /// Constructs a new search document.
        /// </summary>
        /// <param name="source">The data source name.</param>
        /// <param name="id">An id to update the document later on.</param>
        /// <param name="label">A text to be shown in search results.</param>
        /// <param name="entityToken">The entity token, will be used to locate the found document in the 
        /// console tree structure.</param>
        public SearchDocument(string source, string id, string label, EntityToken entityToken)
            : this(source, id, label, "")
        {
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            SerializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);
        }

        /// <summary>
        /// A unique identifier for the document.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Document source name.
        /// </summary>
        public string Source { get; set; }

        /// <summary>
        /// Element label, to be shown in search results as well as searched for.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Element bundle name, to be shown in search results as well as searched for.
        /// </summary>
        public string ElementBundleName { get; set; }

        /// <summary>
        /// A serialized entity token of an console tree element that's related to the document
        /// </summary>
        public string SerializedEntityToken { get; set; }

        /// <summary>
        /// Url, to be shown in search results as well as searched for.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Contains all the text string that should be indexed.
        /// </summary>
        public IEnumerable<string> FullText { get; set; }

        /// <summary>
        /// Field values that is preserved in the index and will appear in the search results.
        /// </summary>
        public IDictionary<string, object> FieldValues { get; set; }

        /// <summary>
        /// Field values that is preserved in the index and will be used in faceted search.
        /// </summary>
        public IDictionary<string, string[]> FacetFieldValues { get; set; }
    }
}