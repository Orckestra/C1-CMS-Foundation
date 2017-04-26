using System;
using System.Collections.Generic;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// Allows adding custom document fields to existing document sources. 
    /// </summary>
    public interface IDocumentFieldProvider
    {
        /// <summary>
        /// Returns custom fields that should be added to the datatype's search document.
        /// </summary>
        /// <param name="dataType">The data type.</param>
        /// <returns></returns>
        IEnumerable<DocumentField> GetCustomFields(Type dataType);
    }
}
