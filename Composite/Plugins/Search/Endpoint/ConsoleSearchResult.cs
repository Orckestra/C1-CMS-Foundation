using System.Collections.Generic;

namespace Composite.Plugins.Search.Endpoint
{
    /// <exclude />
    public class ConsoleSearchResult
    {
        /// <exclude />
        public string QueryText { get; set; }
        /// <exclude />
        public ConsoleSearchResultColumn[] Columns { get; set; }
        /// <exclude />
        public ConsoleSearchResultRow[] Rows { get; set; }
        /// <exclude />
        public int TotalHits { get; set; }
        /// <exclude />
        public ConsoleSearchResultFacetField[] FacetFields { get; set; }
    }



    /// <exclude />
    public class ConsoleSearchResultColumn
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public bool Sortable { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultRow
    {
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public string Url { get; set; }
        /// <exclude />
        public Dictionary<string, string> Values { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultFacetField
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public ConsoleSearchResultFacetValue[] Facets { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultFacetValue
    {
        /// <exclude />
        public string Value { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public int HitCount { get; set; }
    }
}
