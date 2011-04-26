using System.Collections.Specialized;
using Composite.Data;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class UrlData<T> where T : IData
    {
        protected T _data;

        /// <exclude />
        public UrlData()
        {
        }

        /// <exclude />
        public UrlData(T data)
        {
            _data = data;
        }

        /// <exclude />
        public virtual T Data
        {
            get { return _data; }
            set { _data = value;}
        }

        /// <exclude />
        public virtual string PathInfo { get; set; }

        /// <exclude />
        public virtual NameValueCollection QueryParameters { get; set; }

        /// <exclude />
        public virtual UrlKind UrlKind { get; set; }
    }
}
