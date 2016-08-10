using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.Data.Types
{
    /// <summary>
    /// Represents a data item with timed publishing
    /// </summary>
    public abstract class VersionedPageHelperContract
    {
        /// <exclude />
        public abstract string LocalizedVersionName<T>(T data) where T : IVersioned;

        /// <exclude />
        public abstract DateTime? GetPublishDate<T>(T data) where T : IVersioned;

        /// <exclude />
        public abstract DateTime? GetUnpublishDate<T>(T data) where T : IVersioned;
    }

    /// <exclude />
    public static class VersionedPageHelper
    {
        private static List<VersionedPageHelperContract> _instances;

        /// <exclude />
        public static void RegisterVersionHelper(VersionedPageHelperContract vpc)
        {
            if (_instances == null)
            {
                _instances = new List<VersionedPageHelperContract>();
            }

            _instances.Add(vpc);
        }

        /// <exclude />
        public static string LocalizedVersionName<T>(this T str) where T : IVersioned
        {
            var defaultVersionName =
                Core.ResourceSystem.LocalizationFiles.Composite_Management.DefaultVersionName;

            if (_instances == null)
            {
                return defaultVersionName;
            }

            return _instances.Select(p => p.LocalizedVersionName(str)).Any(name => name != null)?
                string.Join(",", _instances.Select(p => p.LocalizedVersionName(str)).Where(name => name != null)): defaultVersionName;
        }

        /// <exclude />
        public static DateTime? GetPublishDate(this IVersioned data)
        {
            return _instances?.Select(p => p.GetPublishDate(data)).FirstOrDefault(date => date != null);
        }

        /// <exclude />
        public static DateTime? GetUnpublishDate(this IVersioned data)
        {
            return _instances?.Select(p => p.GetUnpublishDate(data)).FirstOrDefault(date => date != null);
        }
    }
}
