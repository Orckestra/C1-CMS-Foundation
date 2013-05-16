

namespace Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider
{
    internal sealed class BuildinResourceCacheSettings : IResourceCacheSettings
    {
        private string _resourceCacheDirectory = "~";
        private int _serverCacheMinutes = 0;
        private int _clientCacheMinutes = 0;


        public string ResourceCacheDirectory
        {
            get { return _resourceCacheDirectory; }
            set { _resourceCacheDirectory = value;  }
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
