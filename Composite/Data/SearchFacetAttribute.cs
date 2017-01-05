using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.Data
{
    /// <summary>
    /// Indicates that the field should be used as a search facet
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class SearchFacetAttribute: Attribute
    {
        public SearchFacetAttribute()
        {
            
        }

        public int MinCount { get; set; } = int.MinValue;
        public int Limit { get; set; } = int.MaxValue;

        public virtual IEnumerable<string> GetTokens(object fieldValue)
        {
            if (fieldValue == null) return Enumerable.Empty<string>();
            
            var value = fieldValue.ToString();

            if (string.IsNullOrEmpty(value)) return Enumerable.Empty<string>();

            return new[] { value };
        }

        public string GetLabel(string stringValue)
        {
            return stringValue;
        }
    }
}
