using System.Diagnostics;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    [DebuggerDisplay("{Index} : ({MinValue}-{MaxValue}) : {Label}")]
    internal sealed class StringFolderRange : IFolderRange
    {
        private int _index;
        private string _minValue;
        private string _maxValue;
        private bool _isMinOpenEnded;
        private bool _isMaxOpenEnded;


        public StringFolderRange(int index, string minValue, string maxValue, bool isMinOpenEnded, bool isMaxOpenEnded)
        {
            _index = index;
            _minValue = minValue;
            _maxValue = maxValue;
            _isMinOpenEnded = isMinOpenEnded;
            _isMaxOpenEnded = isMaxOpenEnded;
        }



        public int Index
        {
            get { return _index; }
        }



        public object MinValue
        {
            get { return _minValue; }
        }



        public object MaxValue
        {
            get { return _maxValue; }
        }



        public bool IsMinOpenEnded
        {
            get { return _isMinOpenEnded; }
        }



        public bool IsMaxOpenEnded
        {
            get { return _isMaxOpenEnded; }
        }



        public string Label
        {
            get
            {
                if (this.Index == -1)
                {
                    return StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeRanges.StringRange.Other");
                }
                else if (this.IsMinOpenEnded)
                {
                    return string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeRanges.StringRange.MinOpenEnded"), this.MaxValue);
                }
                else if (this.IsMaxOpenEnded)
                {
                    return string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeRanges.StringRange.MaxOpenEnded"), this.MinValue);
                }
                else 
                {
                    return string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeRanges.StringRange.Closed"), this.MinValue, this.MaxValue);
                }
            }
        }



        public object DefaultValue
        {
            get
            {
                return "";
            }
        }
    }
}
