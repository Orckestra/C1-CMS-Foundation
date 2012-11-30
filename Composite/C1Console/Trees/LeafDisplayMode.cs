using System;
using System.Xml.Linq;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// Defines the way an element is shown depending on presense of the child elements
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum LeafDisplayMode
    {
        /// <summary>
        /// Only shows the elements that has child elements; hides all the elements without child elements.
        /// </summary>
        Compact = 0,

        /// <summary>
        /// Element is always shown, as well as the the "+" sign even when element doesn't have any child items. Default value, has the best performance
        /// </summary>
        Lazy = 1,

        /// <summary>
        /// Element is always shown, the "+" sign is shown only if there're child elements.
        /// </summary>
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
            if (attribute != null)
            {
                LeafDisplayMode parsedValue;

                if (Enum.TryParse(attribute.Value, out parsedValue))
                {
                    return parsedValue;
                }

                tree.AddValidationError(attribute.GetXPath(), "TreeValidationError.Common.WrongAttributeValue", attribute.Value);
            }

            return LeafDisplayMode.Lazy;
        }
    }
}