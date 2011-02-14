namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface ISetPropertyHandler
	{
        /// <exclude />
        void Handle(IData data, object value);
	}
}
