using System;

namespace Composite.Data
{
    /// <summary>
    /// Indicates that the data of the given data type should be searchable.
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface)]
    public class SearchableTypeAttribute: Attribute
    {
    }
}
