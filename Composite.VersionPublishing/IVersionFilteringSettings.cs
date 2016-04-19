using System;
using Composite.Data;

namespace Composite.VersionPublishing
{
    public interface IVersionFilteringSettings
    {
        VersionFilteringMode FilteringMode { get; }
        DateTime? Time { get; }
        string VersionName { get; }
    }

    public class VersionFilteringSettings : IVersionFilteringSettings
    {
        public VersionFilteringMode FilteringMode { get; set; }
        public DateTime? Time { get; set; }
        public string VersionName { get; set; }
    }

    public enum VersionFilteringMode
    {
        /// <summary>
        /// No filtering should be applied
        /// </summary>
        None = 0,
        /// <summary>
        /// Only currently published data should be returned
        /// </summary>
        Published = 1,
        /// <summary>
        /// Only relevant data should be returned
        /// </summary>
        Relevant = 2
    }
}
