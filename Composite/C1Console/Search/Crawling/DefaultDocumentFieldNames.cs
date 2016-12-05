namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// Contains default document field names
    /// </summary>
    public static class DefaultDocumentFieldNames
    {
        /// <summary>
        /// The name of the label field.
        /// </summary>
        public static readonly string Label = "label";

        /// <summary>
        /// The name of the description field.
        /// </summary>
        public static readonly string Description = "desc";

        /// <summary>
        /// The name of the data type field.
        /// </summary>
        public static readonly string DataType = "datatype";

        /// <summary>
        /// The name of the boolean facet field that indicates whether the document has a url.
        ///  </summary>
        public static readonly string HasUrl = "hasUrl";

        /// <summary>
        /// The name of the creation time field.
        /// </summary>
        public static readonly string CreationTime = "ctime";
    }
}
