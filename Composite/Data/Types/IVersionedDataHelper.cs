using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.Data.Types
{
    /// <summary>
    /// Contract for defining IVersioned extra methods and helper functions
    /// </summary>
    public abstract class VersionedDataHelperContract
    {
        /// <summary>
        /// Returns version name for the IVersioned data if it could otherwise returns null
        /// </summary>
        public abstract string LocalizedVersionName<T>(T data) where T : IVersioned;

        /// <summary>
        /// Returns currently live version name for the IVersioned data if it could otherwise returns null
        /// </summary>
        public abstract string GetLiveVersionName<T>(T data) where T : IVersioned;

        /// <summary>
        /// Returns column name and tooltip for the extra fields in publication overview, if no extra fields needed returns null
        /// </summary>
        public abstract List<VersionedExtraPropertiesColumnInfo> GetExtraPropertiesNames();

        /// <summary>
        /// Returns values for the extra fields in publication overview, if no extra fields needed returns null
        /// </summary>
        public abstract List<VersionedExtraProperties> GetExtraProperties<T>(T data) where T : IVersioned;

    }

    /// <summary>
    /// This class should be used in every versioning package to register it's naming and detecting of live versions
    /// </summary>
    public static class VersionedDataHelper
    {
        private static List<VersionedDataHelperContract> _instances;

        static VersionedDataHelper()
        {
            DataEvents<IPage>.OnBeforeAdd += (sender, args) =>
            {
                var page = (IPage) args.Data;
                if (page.VersionId == Guid.Empty)
                {
                    page.VersionId = Guid.NewGuid();
                }
            };
        }

        internal static void Initialize()
        {
            // The initialization code is in the static constructor
        }

        /// <summary>
        /// Returns if there are any versioning package instances available
        /// </summary>
        public static bool IsThereAnyVersioningServices => _instances!=null && _instances.Count > 0;

        /// <summary>
        /// Registers instances of versioning packages
        /// </summary>
        public static void RegisterVersionHelper(VersionedDataHelperContract vpc)
        {
            if (_instances == null)
            {
                _instances = new List<VersionedDataHelperContract>();
            }

            _instances.Add(vpc);
        }

        /// <summary>
        /// Returns version name for the IVersioned data
        /// </summary>
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

        /// <summary>
        /// Returns column name and tooltip for the extra fields in publication overview
        /// </summary>
        public static List<VersionedExtraPropertiesColumnInfo> GetExtraPropertiesNames()
        {
            return _instances?.SelectMany(p => p.GetExtraPropertiesNames() ?? new List<VersionedExtraPropertiesColumnInfo>()).ToList();
        }

        /// <summary>
        /// Returns values for the extra fields in publication overview
        /// </summary>
        public static List<VersionedExtraProperties> GetExtraProperties<T>(this T str) where T : IVersioned
        {
            return _instances?.SelectMany(p => p.GetExtraProperties(str) ?? new List<VersionedExtraProperties>()).ToList();
        }

        /// <summary>
        /// Returns currently live version name for the IVersioned data
        /// </summary>
        public static string GetLiveVersionName<T>(this T str) where T : IVersioned
        {
            if (_instances == null)
            {
                return null;
            }

            var versionNames = _instances.Select(p => p.GetLiveVersionName(str)).Where(name => name != null).ToList();
            return versionNames.Any() ? string.Join(",", versionNames) : null;
        }

    }

    /// <summary>
    /// Represents Extra fields that a Versioning package needs to insert to the publication overview
    /// </summary>
    public class VersionedExtraProperties
    {
        /// <exclude />
        public string ColumnName;
        /// <exclude />
        public string Value;
        /// <exclude />
        public string SortableValue;
    }

    /// <summary>
    /// Represents column title and tooltip for the Extra fields that a Versioning package needs to insert to the publication overview
    /// </summary>
    public class VersionedExtraPropertiesColumnInfo
    {
        /// <exclude />
        public string ColumnName;
        /// <exclude />
        public string ColumnTooltip;
    }
}
