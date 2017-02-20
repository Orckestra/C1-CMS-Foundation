using System;

namespace Composite.Data
{
    /// <summary>
    /// Indicates whether the field.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class SearchableFieldAttribute : Attribute
    {
        /// <summary>
        /// Indicates whether the field should be a part of the search index.
        /// </summary>
        /// <param name="indexText">Indicates whether the field will be a part of the text index.</param>
        /// <param name="previewable">Indicates whether the field will will appear in search results.</param>
        /// <param name="faceted">Indicates whether the field will appear as a facet in search results.</param>
        public SearchableFieldAttribute(bool indexText, bool previewable, bool faceted)
        {
            IndexText = indexText;
            Previewable = previewable;
            Faceted = faceted;
        }

        /// <summary>
        /// Indicates whether the field will be a part of the text index.
        /// </summary>
        public bool IndexText { get; }

        /// <summary>
        /// Indicates whether the field value will appear in search results.
        /// </summary>
        public bool Previewable { get; }

        /// <summary>
        /// Indicates whether the field will appear as a facet in search results.
        /// </summary>
        public bool Faceted { get; }

        //public int PreviewOrder { get; }= 1000;
        //public int FacetFieldOrder { get; } = 1000;
    }
}