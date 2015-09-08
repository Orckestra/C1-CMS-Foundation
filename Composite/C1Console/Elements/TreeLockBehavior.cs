namespace Composite.C1Console.Elements
{
    /// <summary>
    /// When client is searching through elements to find the element with the given entity token, 
    /// the client should disregard elements with TreeLockBehavior = None and continue searching.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public enum TreeLockBehavior
	{
        /// <exclude />
        None,

        /// <exclude />
        Normal
	}
}
