namespace Composite.Data.Hierarchy.DataAncestorProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class NoAncestorDataAncestorProvider : IDataAncestorProvider
	{
        public IData GetParent(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return null;
        }
    }
}
