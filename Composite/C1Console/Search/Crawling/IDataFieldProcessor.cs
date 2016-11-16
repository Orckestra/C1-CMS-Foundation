using System.Collections.Generic;
using System.Globalization;
using System.Reflection;

namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// Extracts indexable information for a data type field.
    /// </summary>
    public interface IDataFieldProcessor
    {
        IEnumerable<string> GetTextParts(object fieldValue);
        object GetIndexValue(object fieldValue);
        string[] GetFacetValues(object fieldValue);

        string GetDocumentFieldName(PropertyInfo propertyInfo);
        DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo);
        DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo propertyInfo);

        string GetFieldLabel(PropertyInfo propertyInfo, CultureInfo cultureInfo);
    }
}
