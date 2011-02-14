namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IDataWrapper
	{
        /// <exclude />
        IData WrappedData { get; }

        /// <exclude />
        void CommitData();
	}
}
