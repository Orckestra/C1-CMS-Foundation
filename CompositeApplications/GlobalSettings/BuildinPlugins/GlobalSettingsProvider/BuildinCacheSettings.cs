namespace Composite.GlobalSettings.BuildinPlugins.GlobalSettingsProvider
{
	internal class BuildinCacheSettings: ICacheSettings
	{
        public BuildinCacheSettings(string name, bool enabled, int size)
        {
            Name = name;
            Enabled = enabled;
            Size = size;
        }

        public string Name
        {
            get; set; 
        }

        public bool Enabled
        {
            get;
            set; 
        }

        public int Size
        {
            get;
            set; 
        }
    }
}
