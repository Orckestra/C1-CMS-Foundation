namespace Composite.C1Console.Search
{
    //public interface IFieldTokenizer
    //{
    //    IEnumerable<string> GetTokens(object fieldValue);
    //}

    public class DocumentFieldFacet
    {
        /// <summary>
        /// Gets or sets the maximum number of choices to return. The default value is 0 which means - all.
        /// </summary>
        public int Limit { get; set; }

        /// <summary>
        /// Gets or sets the minimum about of hits a choice should have to be listed in the result.
        /// </summary>
        public int MinHitCount { get; set; } = 1;

        public int FieldOrder { get; set; }

        // TODO: add sorting options
    }

    public sealed class DocumentFieldPreview
    {
        //public Func<object, string> PreviewFunction { get; set; }

        /// <summary>
        /// Indicates whether sorting for the given field should be enabled.
        /// </summary>
        public bool Sortable { get; set; }

        /// <summary>
        /// Indicates the order in which the field appears
        /// </summary>
        public int FieldOrder { get; set; }
    }

    /// <summary>
    /// Defines a custom field in a search document.
    /// </summary>
    public sealed class DocumentField
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        ///// <param name="indexText"></param>
        /// <param name="facetInformation"></param>
        /// <param name="previewInformation"></param>
        public DocumentField(
            string name, 
            DocumentFieldFacet facetInformation, 
            DocumentFieldPreview previewInformation)
        {
            Name = name;
            Facet = facetInformation;
            Preview = previewInformation;
        }

        /// <summary>
        /// The name of the field
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// Indicates whether faceted search is enabled for this field.
        /// </summary>
        public bool FacetedSearchEnabled => Facet != null;

        /// <summary>
        /// Indicates whether field value is preserved in the index to be shown in search results.
        /// </summary>
        public bool FieldValuePreserved => Preview != null;

        /// <summary>
        /// Faceted search information.
        /// </summary>
        public DocumentFieldFacet Facet { get; set; }

        /// <summary>
        /// Field preview information.
        /// </summary>
        public DocumentFieldPreview Preview { get; set; }
    }
}
