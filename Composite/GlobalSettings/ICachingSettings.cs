using System.Collections.Generic;

namespace Composite.GlobalSettings
{
	public interface ICachingSettings
	{
        bool Enabled { get; }
        IEnumerable<ICacheSettings> Caches { get; }
	}

    public interface ICacheSettings
    {
        string Name { get; }
        bool Enabled { get; }
        int Size { get; }
    }
}
