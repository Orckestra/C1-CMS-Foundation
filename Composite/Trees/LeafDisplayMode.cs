using System.Xml.Linq;
using Composite.Xml;


namespace Composite.Trees
{
    internal enum LeafDisplayMode
    {
        Compact = 0,
        Lazy = 1,
        Auto = 2
    }



    internal static class LeafDisplayModeHelper
    {
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
