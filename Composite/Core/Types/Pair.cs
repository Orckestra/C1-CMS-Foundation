using System;

namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class Pair<TFirst, TSecond>
	{

        /// <exclude />
        public Pair(TFirst firstValue, TSecond secondValue)
        {
            this.First = firstValue;
            this.Second = secondValue;
        }

        /// <exclude />
        public TFirst First { get; set; }

        /// <exclude />
        public TSecond Second { get; set; }

        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as Pair<TFirst, TSecond>);   
        }

        /// <exclude />
        public bool Equals(Pair<TFirst, TSecond> pair)
        {
            if (pair == null) return false;

            return object.Equals(this.First, pair.First) && object.Equals(this.Second, pair.Second);
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return this.First.GetHashCode() ^ this.Second.GetHashCode();
        }

        /// <exclude />
        public override string ToString()
        {
            return string.Format("First: {0}, Second: {1}", this.First, this.Second);
        }
	}
}
