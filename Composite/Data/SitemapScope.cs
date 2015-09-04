namespace Composite.Data
{

    /// <summary>
    /// Define a set of elements in a tree structure, relative to a particular node.
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
    public enum SitemapScope
    {
        /// <summary>
        /// This page.
        /// </summary>
        Current = 0,

        /// <summary>
        /// Children of this page.
        /// </summary>
        Children = 2,

        /// <summary>
        /// All descendants of this page.
        /// </summary>
        Descendants = 20,

        /// <summary>
        /// All descendants of this page and this page.
        /// </summary>
        DescendantsAndCurrent = 1,

        /// <summary>
        /// Pages sharing the same parent as this page, excluding this page.
        /// </summary>
        Siblings = 15,

        /// <summary>
        /// Pages sharing the same parent as this page, including this page.
        /// </summary>
        SiblingsAndSelf = 21,

        /// <summary>
        /// All ancestor pages
        /// </summary>
        Ancestors = 3,

        /// <exclude />
        AncestorsAndCurrent = 4,

        /// <exclude />
        Parent = 5,

        /// <exclude />
        Level1 = 6,

        /// <exclude />
        Level1AndSiblings = 16,

        /// <exclude />
        Level1AndDescendants = 10,

        /// <exclude />
        Level2 = 7,

        /// <exclude />
        Level2AndSiblings = 17,

        /// <exclude />
        Level2AndDescendants = 11,

        /// <exclude />
        Level3 = 8,

        /// <exclude />
        Level3AndSiblings = 18,

        /// <exclude />
        Level3AndDescendants = 12,

        /// <exclude />
        Level4 = 9,

        /// <exclude />
        Level4AndSiblings = 19,

        /// <exclude />
        Level4AndDescendants = 13,

        /// <exclude />
        All = 14
    }
}
