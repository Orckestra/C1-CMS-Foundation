using System.Collections.Generic;
using System.Linq;


namespace Composite.Data
{
    /// <summary>
    /// Let you transform queries before data providers. Enable you to augment queries from alternate sources.
    /// </summary>
    public abstract class DataInterceptor
    {
        /// <summary>
        /// Let you transform queries before data providers. Enable you to augment queries from alternate sources.
        /// </summary>
        public virtual IQueryable<T> InterceptGetData<T>(IQueryable<T> dataset)
            where T : class, IData
        {
            return dataset;
        }


        /// <summary>
        /// Let you transform an in-memory result-set. 
        /// This transformation should behave exactly as the IQueryable equivalent.
        /// </summary>
        public virtual IEnumerable<T> InterceptGetData<T>(IEnumerable<T> dataset)
            where T : class, IData
        {
            return InterceptGetData(dataset.AsQueryable());
        }


        /// <summary>
        /// Enable you to intercept queries for a single data item.
        /// </summary>
        public virtual T InterceptGetDataFromDataSourceId<T>(T data)
            where T : class, IData
        {
            return data;
        }
    }
}
