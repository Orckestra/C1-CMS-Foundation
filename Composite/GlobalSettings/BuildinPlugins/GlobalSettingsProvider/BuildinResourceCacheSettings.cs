

namespace Composite.GlobalSettings.BuildinPlugins.GlobalSettingsProvider
{
    internal sealed class BuildinResourceCacheSettings : IResourceCacheSettings
    {
        private string _cachePath = "~";
        private int _serverCacheMinutes = 0;
        private int _clientCacheMinutes = 0;


        public string CachePath
        {
            get { return _cachePath; }
            set { _cachePath = value;  }
        }


        public int ServerCacheMinutes
        {
            get { return _serverCacheMinutes; }
            set { _serverCacheMinutes = value; }
        }

        public int ClientCacheMinutes
        {
            get { return _clientCacheMinutes; }
            set { _clientCacheMinutes = value; }
        }
    }
}
