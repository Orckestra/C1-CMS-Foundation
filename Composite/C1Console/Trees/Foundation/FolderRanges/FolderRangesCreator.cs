using System;
using System.Collections.Generic;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal static class FolderRangesCreator
    {
        public static IFolderRanges Create(TreeNode ownerTreeNode, string rangeString, string fieldName, Type propertyType)
        {
            string[] rangesSplit = rangeString.Split(',');

            bool includeWildCard = false;
            List<string> rangeStrings = new List<string>();
            foreach (string rangeSplit in rangesSplit)
            {
                string range = rangeSplit.Trim();

                if (range != "*")
                {
                    rangeStrings.Add(range);
                }
                else
                {
                    includeWildCard = true;
                }
            }
            

            if (rangeStrings.Count == 0)
            {
                ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                return null;
            }

            List<Tuple<string, string>> ranges = new List<Tuple<string, string>>();
            if (rangeStrings.Count == 1)
            {
                Tuple<string, string> range = ValidateRange(rangeStrings[0], allowMinOpenEnded: true, allowMaxOpenEnded: true);
                if (range == null)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                    return null;
                }

                ranges.Add(range);
            }
            else if (rangeStrings.Count > 1)
            {
                string firstString = rangeStrings[0];
                string lastString = rangeStrings[rangeStrings.Count - 1];

                Tuple<string, string> firstRange = ValidateRange(firstString, allowMinOpenEnded: true);
                Tuple<string, string> lastRange = ValidateRange(lastString, allowMaxOpenEnded: true);
                if ((firstRange == null) || (lastRange == null))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                    return null;
                }

                ranges.Add(firstRange);
                
                for (int i = 1; i <= rangeStrings.Count - 2; i++)
                {
                    Tuple<string, string> range = ValidateRange(rangeStrings[i]);
                    if (range == null)
                    {
                        ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                        return null;
                    }

                    ranges.Add(range);
                }

                ranges.Add(lastRange);
            }


            if (propertyType == typeof(int))
            {
                return FolderRangesFactory.CreateIntFolderRangeIterator(ownerTreeNode, ranges, includeWildCard);
            }
            else if (propertyType == typeof(string))
            {
                return FolderRangesFactory.CreateStringFolderRanges(ownerTreeNode, ranges, includeWildCard);
            }
            else
            {
                ownerTreeNode.AddValidationError("TreeValidationError.Range.UnsupportedType", fieldName, propertyType);
                return null;
            }
        }


        private static Tuple<string, string> ValidateRange(string range, bool allowMinOpenEnded = false, bool allowMaxOpenEnded = false)
        {
            string[] str = range.Split('>');

            if (str.Length != 2) return null;

            if ((str[0] == "") && (str[1] == "")) return null;

            if ((str[0] == "") && (allowMinOpenEnded == false)) return null;
            if ((str[1] == "") && (allowMaxOpenEnded == false)) return null;

            return new Tuple<string, string>(str[0], str[1]);
        }
    }
}
