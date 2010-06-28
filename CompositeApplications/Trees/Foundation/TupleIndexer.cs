using System;


namespace Composite.Trees.Foundation
{
    internal sealed class TupleIndexer
    {
        private dynamic _tuple;

        public TupleIndexer(dynamic tuple)
        {
            _tuple = tuple;
        }


        public int this[int index]
        {
            get
            {
                if (index == 1) return (int)_tuple.Item1;
                else if (index == 2) return (int)_tuple.Item2;
                else if (index == 3) return (int)_tuple.Item3;
                else if (index == 4) return (int)_tuple.Item4;
                else if (index == 5) return (int)_tuple.Item5;
                else if (index == 6) return (int)_tuple.Item6;
                else if (index == 7) return (int)_tuple.Item7;
                else if (index == 8) return (int)_tuple.Item8;
                else throw new IndexOutOfRangeException();
            }
        }



        public object GetAtIndex(int index)
        {
            if (index == 1) return _tuple.Item1;
            else if (index == 2) return _tuple.Item2;
            else if (index == 3) return _tuple.Item3;
            else if (index == 4) return _tuple.Item4;
            else if (index == 5) return _tuple.Item5;
            else if (index == 6) return _tuple.Item6;
            else if (index == 7) return _tuple.Item7;
            else if (index == 8) return _tuple.Item8;
            else throw new IndexOutOfRangeException();
        }
    }
}
