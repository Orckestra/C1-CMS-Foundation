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

        /// <summary>
        /// Orders the selected data.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dataset"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> Order<T>(IEnumerable<T> dataset) where T : IVersioned
        {
            return dataset;
        }
    }

    /// <summary>
    /// This class should be used in every versioning package to register it's naming and detecting of live versions
    /// </summary>
    public static class VersionedDataHelper
    {
        private static readonly List<VersionedDataHelperContract> _services = new List<VersionedDataHelperContract>();

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
        public static bool IsThereAnyVersioningServices => _services.Any();

        /// <summary>
        /// Registers instances of versioning packages
        /// </summary>
        public static void RegisterVersionHelper(VersionedDataHelperContract vpc)
        {
            _services.Add(vpc);
        }

        /// <summary>
        /// Returns version name for the IVersioned data
        /// </summary>
        public static string LocalizedVersionName<T>(this T str) where T : IVersioned
        {
            var defaultVersionName =
                Core.ResourceSystem.LocalizationFiles.Composite_Management.DefaultVersionName;

            if (_services.Count == 0)
            {
                return defaultVersionName;
            }

            var versionNames = _services
                .Select(p => p.LocalizedVersionName(str))
                .Where(name => name != null).ToList();

            return versionNames.Any() ? string.Join(",", versionNames) : defaultVersionName;
        }

        /// <summary>
        /// Returns column name and tooltip for the extra fields in publication overview
        /// </summary>
        public static IEnumerable<VersionedExtraPropertiesColumnInfo> GetExtraPropertyNames()
        {
            return _services?.SelectMany(p => p.GetExtraPropertiesNames() ?? Enumerable.Empty<VersionedExtraPropertiesColumnInfo>()).ToList();
        }

        /// <summary>
        /// Returns values for the extra fields in publication overview
        /// </summary>
        public static IEnumerable<VersionedExtraProperties> GetExtraProperties<T>(this T str) where T : IVersioned
        {
            return _services.SelectMany(p => p.GetExtraProperties(str) ?? Enumerable.Empty<VersionedExtraProperties>()).ToList();
        }

        /// <summary>
        /// Returns currently live version name for the IVersioned data
        /// </summary>
        public static string GetLiveVersionName<T>(this T data) where T : IVersioned
        {
            if (!_services.Any())
            {
                return null;
            }

            var versionNames = _services.Select(p => p.GetLiveVersionName(data)).Where(name => name != null).ToList();
            return versionNames.Any() ? string.Join(",", versionNames) : null;
        }


        /// <summary>
        /// Orders the data given in the dataset.
        /// </summary>
        /// <typeparam name="TDataType">The data type.</typeparam>
        /// <param name="dataset">The data set to be ordered.</param>
        /// <returns></returns>
        public static IEnumerable<TDataType> OrderByVersions<TDataType>(this IEnumerable<TDataType> dataset) where TDataType : IVersioned
        {
            if (dataset is ICollection<TDataType> collection && collection.Count < 2)
            {
                return collection;
            }

            var result = dataset;
            foreach (var service in _services)
            {
                result = service.Order(result);
            }

            return result;
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
