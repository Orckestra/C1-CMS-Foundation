using System;

namespace Composite.Search.Crawling
{
    [Obsolete("Use DocumentFieldNames instead", true)]
    /// <exclude/>
    public static class DefaultDocumentFieldNames
    {
        /// <exclude/>
        public static readonly string Label = DocumentFieldNames.Label;
        /// <exclude/>
        public static readonly string Source = DocumentFieldNames.Source;
        /// <exclude/>
        public static readonly string Description = DocumentFieldNames.Description;
        /// <exclude/>
        public static readonly string DataType = DocumentFieldNames.DataType;
        /// <exclude/>
        public static readonly string ConsoleAccess = DocumentFieldNames.ConsoleAccess;
        /// <exclude/>
        public static readonly string Ancestors = DocumentFieldNames.Ancestors;
        /// <exclude/>
        public static readonly string HasUrl = DocumentFieldNames.HasUrl;
        /// <exclude/>
        public static readonly string LastUpdated = DocumentFieldNames.LastUpdated;
    }

    /// <summary>
    /// Contains default document field names
    /// </summary>
    public static class DocumentFieldNames
    {
        /// <summary>
        /// The name of the label field.
        /// </summary>
        public static readonly string Label = "label";

        /// <summary>
        /// The name of the source field. 
        /// The source field contains a name of the document source that created the search document.
        /// It is used both for updating documents for a given source as well as filtering search result columns.
        /// </summary>
        public static readonly string Source = "src";

        /// <summary>
        /// The name of the description field.
        /// </summary>
        public static readonly string Description = "desc";

        /// <summary>
        /// The name of the data type field.
        /// </summary>
        public static readonly string DataType = "datatype";

        /// <summary>
        /// The name of the facet field that contains the list of users and user groups that have access to the current document.
        /// </summary>
        public static readonly string ConsoleAccess = "access";

        /// <summary>
        /// The name of the facet field that contains the hashes of all ancestor's and current entity tokens.
        /// </summary>
        public static readonly string Ancestors = "ancestors";

        /// <summary>
        /// The name of the boolean facet field that indicates whether the document has a url.
        ///  </summary>
        public static readonly string HasUrl = "hasUrl";

        /// <summary>
        /// The name of the creation time field.
        /// </summary>
        public static readonly string LastUpdated = "lastupdated";

        /// <summary>
        /// Gets the field name for the given data type property
        /// </summary>
        /// <param name="dataType">The data type.</param>
        /// <param name="propertyName">The property name.</param>
        /// <returns></returns>
        public static string GetFieldName(Type dataType, string propertyName)
        {
            Verify.ArgumentNotNull(dataType, nameof(dataType));
            Verify.ArgumentNotNull(propertyName, nameof(propertyName));

            var propertyInfo = dataType.GetProperty(propertyName);
            Verify.IsNotNull(propertyInfo, "Type '{0}' does not have a prorety '{1}'", dataType.FullName, propertyName);

            var processor = DataTypeSearchReflectionHelper.GetDataFieldProcessor(propertyInfo);
            return processor.GetDocumentFieldName(propertyInfo);
        }
    }
}
