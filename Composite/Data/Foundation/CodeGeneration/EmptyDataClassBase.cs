using System;


namespace Composite.Data.Foundation.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public abstract class EmptyDataClassBase : IData
    {
        [NonSerialized]
        private DataSourceId _dataSourceId = null;


        public DataSourceId DataSourceId
        {
            get 
            {
                if (_dataSourceId == null)
                {
                    _dataSourceId = new DataSourceId(this._InterfaceType);
                }

                return _dataSourceId;
            }
            internal set
            {
                _dataSourceId = value;
            }
        }



        protected abstract Type _InterfaceType { get; }
    }
}
