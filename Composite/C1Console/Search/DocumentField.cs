namespace Composite.C1Console.Search
{
    //public interface IFieldTokenizer
    //{
    //    IEnumerable<string> GetTokens(object fieldValue);
    //}

    public sealed class DocumentFieldFacet
    {
        //public Func<object, IEnumerable<string>> Tokenizer { get; set; }
        public int FieldOrder { get; set; }
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
//            bool indexText, 
            DocumentFieldFacet facetInformation, 
            DocumentFieldPreview previewInformation)
        {
            Name = name;
            //IndexText = indexText;
            Facet = facetInformation;
            Preview = previewInformation;
        }

        /// <summary>
        /// The name of the field
        /// </summary>
        public string Name { get; }

        ///// <summary>
        ///// Indicates whether the field value will be indexed as a part of full-text document field.
        ///// </summary>
        //public bool IndexText { get; }

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
