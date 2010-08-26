using System.Linq.Expressions;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal interface IFolderRange
    {
        /// <summary>
        /// Indexed from 0 and up, -1 is wildcard/other
        /// </summary>
        int Index { get; }

        object MinValue { get; }
        object MaxValue { get; }

        bool IsMinOpenEnded { get; }
        bool IsMaxOpenEnded { get; }

        string Label { get; }

        object DefaultValue { get; }
    }
}
