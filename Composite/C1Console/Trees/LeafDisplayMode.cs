using System.Xml.Linq;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum LeafDisplayMode
    {
        /// <exclude />
        Compact = 0,

        /// <exclude />
        Lazy = 1,

        /// <exclude />
        Auto = 2
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LeafDisplayModeHelper
    {
        /// <exclude />
        public static LeafDisplayMode ParseDisplayMode(XAttribute attribute, Tree tree)
        {
            LeafDisplayMode displayMode = LeafDisplayMode.Lazy;
            if (attribute != null)
            {
                switch (attribute.Value)
                {
                    case "Compact":
                        displayMode = LeafDisplayMode.Compact;
                        break;

                    case "Lazy":
                        displayMode = LeafDisplayMode.Lazy;
                        break;

                    case "Auto":
                        displayMode = LeafDisplayMode.Auto;
                        break;

                    default:
                        tree.AddValidationError(attribute.GetXPath(), "TreeValidationError.Common.WrongAttributeValue", attribute.Value);
                        break;
                }
            }

            return displayMode;
        }
    }
}
