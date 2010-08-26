using System;
using System.Linq;
using System.Collections.Generic;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal static class FolderRangesFactory
    {
        public static IFolderRanges CreateIntFolderRangeIterator(TreeNode ownerTreeNode, List<Tuple<string, string>> ranges, bool includeWildCard)
        {
            IntFolderRanges folderRanges = new IntFolderRanges();

            int counter = 0;
            int? lastMaxValue = null;
            foreach (Tuple<string, string> range in ranges)
            {
                int minValue = 0;
                int maxValue = 0;
                bool isMinOpenEnded = range.Item1 == "";
                bool isMaxOpenEnded = range.Item2 == "";

                if ((range.Item1 != "") && (int.TryParse(range.Item1, out minValue) == false))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                    return null;
                }

                if ((range.Item2 != "") && (int.TryParse(range.Item2, out maxValue) == false))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                    return null;
                }

                if ((isMinOpenEnded == false) && (isMaxOpenEnded == false) && (minValue >= maxValue))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.MinMaxError", minValue, maxValue);                    
                    return null;
                }
                
                if (lastMaxValue.HasValue == false)
                {
                    lastMaxValue = maxValue;
                }
                else if (lastMaxValue.Value >= minValue)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.NextRangeError");
                }


                IntFolderRange folderRange = new IntFolderRange(
                    counter++,
                    minValue,
                    maxValue,
                    isMinOpenEnded,
                    isMaxOpenEnded
                );

                folderRanges.AddFolderRange(folderRange);
            }

            if (includeWildCard == true)
            {
                IntFolderRange folderRange = new IntFolderRange(
                    -1,
                    0,
                    0,
                    false,
                    false
                );

                folderRanges.AddFolderRange(folderRange);
            }            

            return folderRanges;
        }


        public static IFolderRanges CreateStringFolderRanges(TreeNode ownerTreeNode, List<Tuple<string, string>> ranges, bool includeWildCard)
        {
            StringFolderRanges folderRanges = new StringFolderRanges();

            int counter = 0;
            string lastMaxValue = null;
            foreach (Tuple<string, string> range in ranges)
            {
                string minValue = "";
                string maxValue = "";
                bool isMinOpenEnded = range.Item1 == "";
                bool isMaxOpenEnded = range.Item2 == "";

                if (range.Item1 != "")
                {
                    if (range.Item1.Length != 1)
                    {
                        ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                        return null;
                    }
                    else
                    {                        
                        minValue = range.Item1;
                    }
                }

                if (range.Item2 != "")
                {
                    if (range.Item2.Length != 1)
                    {
                        ownerTreeNode.AddValidationError("TreeValidationError.Range.WrongFormat");
                        return null;
                    }
                    else
                    {                        
                        maxValue = range.Item2;
                    }
                }


                if ((isMinOpenEnded == false) && (isMaxOpenEnded == false) && (string.Compare(minValue, maxValue) >= 0))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.MinMaxError", minValue, maxValue);
                    return null;
                }

                if (lastMaxValue == null)
                {
                    lastMaxValue = maxValue;
                }
                else if (string.Compare(lastMaxValue, minValue) >= 0)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Range.NextRangeError");
                }


                StringFolderRange folderRange = new StringFolderRange(
                    counter++,
                    minValue,
                    maxValue,
                    isMinOpenEnded,
                    isMaxOpenEnded
                );

                folderRanges.AddFolderRange(folderRange);
            }

            if (includeWildCard == true)
            {
                StringFolderRange folderRange = new StringFolderRange(
                    -1,
                    "",
                    "",
                    false,
                    false
                );

                folderRanges.AddFolderRange(folderRange);
            }

            return folderRanges;
        }
    }
}
