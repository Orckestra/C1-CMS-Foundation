using System;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.VersionPublishing
{
    public class VersioningServiceSettings 
    {
        private readonly VersionFilteringSettings _versionFilteringSettings;
        public VersionFilteringSettings VersionFilteringSettings => _versionFilteringSettings;

        public static VersioningServiceSettings NoFiltering()
        {
            return new VersioningServiceSettings(VersionFilteringMode.None, DateTime.Now);
        }

        public static VersioningServiceSettings Published(DateTime time)
        {
            return new VersioningServiceSettings(VersionFilteringMode.Published, time);
        }

        public static VersioningServiceSettings Published()
        {
            return new VersioningServiceSettings(VersionFilteringMode.Published, DateTime.Now);
        }

        public static VersioningServiceSettings MostRelevant(DateTime time)
        {
            return new VersioningServiceSettings(VersionFilteringMode.Relevant, time);
        }

        public static VersioningServiceSettings MostRelevant()
        {
            return new VersioningServiceSettings(VersionFilteringMode.Relevant, DateTime.Now);
        }

        public static VersioningServiceSettings ByName(string versionName)
        {
            return new VersioningServiceSettings(versionName);
        }

        private VersioningServiceSettings(string versionName)
        {
            SetupDataInterceptor();

            _versionFilteringSettings = new VersionFilteringSettings
            {
                FilteringMode = VersionFilteringMode.Published,
                VersionName = versionName
            };
        }

        private VersioningServiceSettings(VersionFilteringMode filteringMode, DateTime time)
        {
            SetupDataInterceptor();

            _versionFilteringSettings = new VersionFilteringSettings
            {
                FilteringMode = filteringMode,
                Time = time
            };
        }

        private void SetupDataInterceptor()
        {
            if (!DataFacade.HasGlobalDataInterceptor<IVersioned>())
            {
                DataFacade.SetGlobalDataInterceptor<IVersioned>(new PageVersionFilteringDataInterceptor());
            }
        }

        public void ChangeProperties(VersionFilteringMode filteringMode, DateTime? time)
        {
            _versionFilteringSettings.FilteringMode = filteringMode;
            if (time != null)
            {
                _versionFilteringSettings.Time = time;
            }
        }
        
    }
}
