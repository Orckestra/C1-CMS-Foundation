using System;

namespace Composite.Types
{
	public sealed class Pair<TFirst, TSecond>
	{

        public Pair(TFirst firstValue, TSecond secondValue)
        {
            this.First = firstValue;
            this.Second = secondValue;
        }

        public TFirst First { get; set; }
        public TSecond Second { get; set; }

        public override bool Equals(object obj)
        {
            return Equals(obj as Pair<TFirst, TSecond>);   
        }

        public bool Equals(Pair<TFirst, TSecond> pair)
        {
            if (pair == null) return false;

            return object.Equals(this.First, pair.First) && object.Equals(this.Second, pair.Second);
        }

        public override int GetHashCode()
        {
            return this.First.GetHashCode() ^ this.Second.GetHashCode();
        }

        public override string ToString()
        {
            return string.Format("First: {0}, Second: {1}", this.First, this.Second);
        }
	}
}
