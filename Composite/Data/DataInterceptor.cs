using System.Linq;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class DataInterceptor
    {
        /// <exclude />
        public DataInterceptor()
        {
        }



        /// <exclude />
        public virtual IQueryable<T> InterceptGetData<T>(IQueryable<T> datas)
            where T : class, IData
        {
            return datas;
        }


        /// <exclude />
        public virtual T InterceptGetDataFromDataSourceId<T>(T data)
            where T : class, IData
        {
            return data;
        }
    }
}
