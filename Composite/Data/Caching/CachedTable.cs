using System.Collections.Generic;
using System.Linq;

namespace Composite.Data.Caching
{
    /// <summary>
    /// Cached table
    /// </summary>
    internal abstract class CachedTable
    {
        /// <summary>
        /// The queryable data
        /// </summary>
        public abstract IQueryable Queryable { get; }

        internal abstract void Remove(IEnumerable<IData> dataset);

        /// <summary>
        /// Row by key table
        /// </summary>
        public abstract IReadOnlyDictionary<object, IEnumerable<IData>> RowsByKey { get; }
    }

    internal class CachedTable<T> : CachedTable 
    {
        private IReadOnlyCollection<T> _items;
        private IReadOnlyDictionary<object, IEnumerable<IData>> _rowsByKey;

        public CachedTable(IReadOnlyCollection<T> items)
        {
            _items = items;
        }

        public override IQueryable Queryable => _items.AsQueryable();

        internal override void Remove(IEnumerable<IData> dataset)
        {
            var toRemove = new HashSet<DataSourceId>(dataset.Select(_ => _.DataSourceId));

            lock (this)
            {
                var existingRows = _items;
                _items = existingRows.Where(data => !toRemove.Contains((data as IData).DataSourceId)).ToList();
                _rowsByKey = null; // Can be optimized as well
            }
        }

        public override IReadOnlyDictionary<object, IEnumerable<IData>> RowsByKey
        {
            get
            {
                var result = _rowsByKey;
                if (result != null) return result;

                lock (this)
                {
                    result = _rowsByKey;
                    if (result != null) return result;

                    var keyPropertyInfo = typeof(T).GetKeyProperties().Single();

                    result = _items
                        .GroupBy(data => keyPropertyInfo.GetValue(data, null))
                        .ToDictionary(group => group.Key, group => group.ToArray() as IEnumerable<IData>);

                    return _rowsByKey = result;
                }
            }
        }
    }
}
