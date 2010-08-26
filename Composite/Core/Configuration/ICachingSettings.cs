using System.Collections.Generic;

namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface ICachingSettings
	{
        bool Enabled { get; }
        IEnumerable<ICacheSettings> Caches { get; }
	}



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ICacheSettings
    {
        string Name { get; }
        bool Enabled { get; }
        int Size { get; }
    }
}
