using System.Collections.Generic;

namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface ICachingSettings
	{
        /// <exclude />
        bool Enabled { get; }

        /// <exclude />
        IEnumerable<ICacheSettings> Caches { get; }
	}



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ICacheSettings
    {
        /// <exclude />
        string Name { get; }

        /// <exclude />
        bool Enabled { get; }

        /// <exclude />
        int Size { get; }
    }
}
