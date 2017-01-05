using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;


namespace Composite.Core.Linq
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DictionaryExtensions
    {
        /// <exclude />
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
        /// Returns an evaluated collection. It allows avoiding of multiple calculations for the same enumerator.
        /// </summary>
        /// <typeparam name="T">Element type.</typeparam>
        /// <param name="enumerable">Enumerable object to be evaluated.</param>
        /// <returns>Evaluated collection.</returns>
        public static ICollection<T> Evaluate<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable is T[])
            {
                return enumerable as T[];
            }

            if (enumerable is ICollection<T>)
            {
                return enumerable as ICollection<T>;
            }

            return new List<T>(enumerable);
        }



        /// <exclude />
        public static IEnumerable<T> EvaluateOrNull<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable == null) return null;

            if (enumerable is T[] || enumerable is List<T>)
            {
                return enumerable;
            }
            return new List<T>(enumerable);
        }    

        /// <summary>
        /// Extends standard IQueryable<typeparamref name="T"/>.Single method, allows specifying exception text.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="exceptionOnEmpty">Exception format for not a single row found</param>
        /// <param name="exceptionOnMultipleResults">Exception format for multiple rows found</param>
        /// <param name="formatArgs"></param>
        /// <returns></returns>
        [StringFormatMethod("formatArgs")]
        public static T SingleOrException<T>(this IQueryable<T> query, string exceptionOnEmpty, string exceptionOnMultipleResults, params object[] formatArgs) 
        {
            var result = query.ToList();

            if (result.Count == 0) throw new InvalidOperationException(string.Format(exceptionOnEmpty, formatArgs));
            
            if (result.Count == 1) return result[0];

            throw new InvalidOperationException(string.Format(exceptionOnMultipleResults, formatArgs));
        }

        /// <summary>
        /// Extends standard IQueryable<typeparamref name="T"/>.Single method, allows specifying exception text.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="exceptionOnEmpty">Exception format for not a single row found</param>
        /// <param name="exceptionOnMultipleResults">Exception format for multiple rows found</param>
        /// <param name="formatArgs"></param>
        /// <returns></returns>
        [StringFormatMethod("formatArgs")]
        public static T SingleOrException<T>(this IEnumerable<T> query, string exceptionOnEmpty, string exceptionOnMultipleResults, params object[] formatArgs)
        {
            var result = query.ToList();

            if (result.Count == 0) throw new InvalidOperationException(string.Format(exceptionOnEmpty, formatArgs));

            if (result.Count == 1) return result[0];

            throw new InvalidOperationException(string.Format(exceptionOnMultipleResults, formatArgs));
        }

        /// <summary>
        /// Extends standard IQueryable<typeparamref name="T"/>.Single method, allows specifying exception text.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="exceptionOnMultipleResults">Exception format for multiple rows found</param>
        /// <param name="formatArgs">Format arguments</param>
        /// <returns></returns>
        [StringFormatMethod("formatArgs")]
        public static T SingleOrDefaultOrException<T>(this IEnumerable<T> query, string exceptionOnMultipleResults, params object[] formatArgs)
        {
            var result = query.ToList();

            if (result.Count == 0) return default(T);

            if (result.Count == 1) return result[0];

            throw new InvalidOperationException(string.Format(exceptionOnMultipleResults, formatArgs));
        }

        /// <summary>
        /// Extends standard IEnumerable<typeparamref name="T"/>.First() method, allows specifying exception text.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="exceptionOnEmpty">Exception format for not a single row found</param>
        /// <param name="formatArgs">Format arguments</param>
        /// <returns></returns>
        [StringFormatMethod("formatArgs")]
        public static T FirstOrException<T>(this IEnumerable<T> query, string exceptionOnEmpty, params object[] formatArgs) where T : class
        {
            var result = query.FirstOrDefault();

            if (result == null) throw new InvalidOperationException(string.Format(exceptionOnEmpty, formatArgs));

            return result;
        }

        internal static IEnumerable<T> ExcludeDuplicateKeys<T, TKey>(this IEnumerable<T> sequence, Func<T, TKey> getKeyFunc)
        {
            var keys = new HashSet<TKey>();

            foreach (var el in sequence)
            {
                TKey key = getKeyFunc(el);

                if (keys.Contains(key)) continue;

                keys.Add(key);

                yield return el;
            }
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ListExtensions
    {
        /// <exclude />
        public static List<U> ToList<T, U>(this IEnumerable<T> source, Func<T, U> convertor)
        {
            return source.Select(convertor).ToList();
        }


        /// <exclude />
        public static List<object> ToListOfObjects(this IEnumerable enumerable)
        {
            return enumerable.Cast<object>().ToList();
        }


        /// <exclude />
        public static IEnumerable<object> ToEnumerableOfObjects(this IEnumerable enumerable)
        {
            return enumerable.Cast<object>();
        }
    }
}
