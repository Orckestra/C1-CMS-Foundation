namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum PageAssociationScope
    {
        CurrentPage = 0,
        CurrentAndDescendantPages = 1,
        ChildPages = 2,
        SiblingPages = 15,
        AncestorPages = 3,
        AncestorAndCurrentPages = 4,
        ParentPage = 5,
        Level1Page = 6,
        Level2Page = 7,
        Level3Page = 8,
        Level4Page = 9,
        Level1AndSiblingPages = 16,
        Level2AndSiblingPages = 17,
        Level3AndSiblingPages = 18,
        Level4AndSiblingPages = 19,
        Level1AndDescendantPages = 10,
        Level2AndDescendantPages = 11,
        Level3AndDescendantPages = 12,
        Level4AndDescendantPages = 13,
        AllPages = 14
    }
}
