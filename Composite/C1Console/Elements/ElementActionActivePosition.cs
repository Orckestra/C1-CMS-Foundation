using System;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// Where an action should be shown visually. One or more may be selected.
    /// </summary>
    [Flags]
    public enum ElementActionActivePosition
    {
        /// <summary>
        /// Available in the C1 Consoles default navigation tree.
        /// </summary>
        NavigatorTree = 1,

        /// <summary>
        /// Available in trees used for item selection (typically shown via pop ups).
        /// </summary>
        SelectorTree = 2,
    }
}
