namespace Composite.Plugins.Search.Endpoint
{
    /// <exclude />
    public class ConsoleSearchQuerySelection
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string[] Values { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchQuery
    {
        /// <exclude />
        public string CultureName { get; set; }
        /// <exclude />
        public string Text { get; set; }
        /// <exclude />
        public string SortBy { get; set; }
        /// <exclude />
        public bool SortInReverseOrder { get; set; }
        /// <exclude />
        public ConsoleSearchQuerySelection[] Selections { get; set; }
    }
}
