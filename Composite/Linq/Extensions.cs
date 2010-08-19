using System;
using System.Collections;
using System.Collections.Generic;


namespace Composite.Linq
{
    internal static class DictionaryExtensions
    {
        public static int GetContentHashCode(this IDictionary dictionary)
        {
            int hash = 0;

            foreach (DictionaryEntry entry in dictionary)
            {
                hash = hash ^ entry.Key.GetHashCode() ^ entry.Value.GetHashCode();
            }

            return hash;
        }
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IEnumerableExtensions
    {
        /// <summary>
        /// Returns evaluated collection. It allows avoiding of multiple calculations for the same enumerator.
        /// </summary>
        /// <typeparam name="T">Element type.</typeparam>
        /// <param name="enumerable">Enumerable object to be evaluated.</param>
        /// <returns>Evaluated collection.</returns>
        public static IEnumerable<T> Evaluate<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable is T[] || enumerable is List<T>)
            {
                return enumerable;
            }
            return new List<T>(enumerable);
        }



        public static IEnumerable<T> EvaluateOrNull<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable == null) return null;

            if (enumerable is T[] || enumerable is List<T>)
            {
                return enumerable;
            }
            return new List<T>(enumerable);
        }    
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ListExtensions
    {
        public static List<U> ToList<T, U>(this IEnumerable<T> source, Func<T, U> convertor)
        {
            List<U> result = new List<U>();

            foreach (T item in source)
            {
                result.Add(convertor(item));
            }

            return result;
        }

        public static List<object> ToListOfObjects(this IEnumerable enumerable)
        {
            var result = new List<object>();

            foreach (object o in enumerable)
            {
                result.Add(o);
            }

            return result;
        }


        public static IEnumerable<object> ToEnumerableOfObjects(this IEnumerable enumerable)
        {
            var result = new List<object>();

            foreach (object o in enumerable)
            {
                yield return o;
            }
        }
    }
}
