using System;


namespace Composite.Data.Hierarchy.DataAncestorProviders
{
#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class NoAncestorDataAncestorProvider : IDataAncestorProvider
	{
        public IData GetParent(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return null;
        }
    }
}
