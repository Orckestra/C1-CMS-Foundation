using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;

namespace Composite.Linq.Disassembled
{
    public static class ReadOnlyCollectionExtensions
    {
        // Methods
        public static ReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> sequence)
        {
            if (sequence == null)
            {
                return DefaultReadOnlyCollection<T>.Empty;
            }
            ReadOnlyCollection<T> onlys = sequence as ReadOnlyCollection<T>;
            if (onlys != null)
            {
                return onlys;
            }
            return new ReadOnlyCollection<T>(sequence.ToArray<T>());
        }

        // Nested Types
        private static class DefaultReadOnlyCollection<T>
        {
            // Fields
            private static ReadOnlyCollection<T> _defaultCollection;

            // Properties
            public static ReadOnlyCollection<T> Empty
            {
                get
                {
                    if (ReadOnlyCollectionExtensions.DefaultReadOnlyCollection<T>._defaultCollection == null)
                    {
                        ReadOnlyCollectionExtensions.DefaultReadOnlyCollection<T>._defaultCollection = new ReadOnlyCollection<T>(new T[0]);
                    }
                    return ReadOnlyCollectionExtensions.DefaultReadOnlyCollection<T>._defaultCollection;
                }
            }
        }
    }
}
