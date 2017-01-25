using System.Collections.Generic;
using System.Reflection;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// Extracts indexable information for a data type field.
    /// </summary>
    public interface IDataFieldProcessor
    {
        /// <summary>
        /// Gets the text parts for the full text search.
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <returns></returns>
        IEnumerable<string> GetTextParts(object fieldValue);

        /// <summary>
        /// Get the field value to be preserved in the index.
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <returns></returns>
        object GetIndexValue(object fieldValue);

        /// <summary>
        /// Gets the facet values from the given field.
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <returns></returns>
        string[] GetFacetValues(object fieldValue);

        /// <summary>
        /// Gets the document field name for the specified data type property.
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        string GetDocumentFieldName(PropertyInfo propertyInfo);

        /// <summary>
        /// Gets the facet information for the given property.
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo);

        /// <summary>
        /// Gets the field preview information for the given property.
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo propertyInfo);

        /// <summary>
        /// Gets the field label in a given locale.
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        string GetFieldLabel(PropertyInfo propertyInfo);
    }
}
