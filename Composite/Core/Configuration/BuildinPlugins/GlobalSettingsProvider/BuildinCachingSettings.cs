using System.Collections.Generic;

namespace Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider
{
	internal class BuildinCachingSettings: ICachingSettings
	{
	    private bool _enabled;
        private IEnumerable<ICacheSettings> _cacheSettingsCollection = new ICacheSettings[0];

        public bool Enabled
        {
            get { return _enabled; }
            set { _enabled = value; }
        }

        public IEnumerable<ICacheSettings> Caches
        {
            get { return _cacheSettingsCollection; }
            set { _cacheSettingsCollection = value; }
        }
    }
}
