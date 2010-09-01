

namespace Composite.Data
{
    public enum SitemapScope
    {
        Current = 0,
        Children = 2,
        Descendants = 20,
        DescendantsAndCurrent = 1,
        Siblings = 15,
        SiblingsAndSelf = 21,
        Ancestors = 3,
        AncestorsAndCurrent = 4,
        Parent = 5,
        Level1 = 6,
        Level1AndSiblings = 16,
        Level1AndDescendants = 10,
        Level2 = 7,
        Level2AndSiblings = 17,
        Level2AndDescendants = 11,
        Level3 = 8,
        Level3AndSiblings = 18,
        Level3AndDescendants = 12,
        Level4 = 9,
        Level4AndSiblings = 19,
        Level4AndDescendants = 13,
        All = 14
    }
}
