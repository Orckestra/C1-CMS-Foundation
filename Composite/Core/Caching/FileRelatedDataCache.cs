using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.IO;

namespace Composite.Core.Caching
{
    /// <summary>
    /// Caching for the data, related to specific files. Canche invalidated when LastWriteTime property of the file changes
    /// </summary>
    /// <typeparam name="CachedData">Type of the cached data</typeparam>
    internal class FileRelatedDataCache<CachedData> where CachedData: class
    {
        private static readonly string LogTitle = typeof(FileRelatedDataCache<>).Name;

        private readonly string _cachefolder;
        private readonly string _cacheName;
        private readonly Action<CachedData, string> _serializer;
        private readonly Func<string, CachedData> _deserializer;


        /// <summary>
        /// Initializes a new instance of the <see cref="FileRelatedDataCache{T}" /> class.
        /// </summary>
        /// <param name="cacheDirectoryName">Name of the folder to which cached files will be put.</param>
        /// <param name="cacheName">Name of the cache, used in the naming of cached files.</param>
        /// <param name="toFileSerializer">To file serializer.</param>
        /// <param name="fromFileDeserializer">From file deserializer.</param>
        public FileRelatedDataCache(string cacheDirectoryName, string cacheName, Action<CachedData, string> toFileSerializer, Func<string, CachedData> fromFileDeserializer)
        {
            _cacheName = cacheName;
            _serializer = toFileSerializer;
            _deserializer = fromFileDeserializer;

            string path = PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory);

            if (!string.IsNullOrEmpty(cacheDirectoryName))
            {
                path = Path.Combine(path, cacheDirectoryName);
            }

            _cachefolder = path;

            if (!C1Directory.Exists(_cachefolder))
            {
                C1Directory.CreateDirectory(_cachefolder);
            }
        }

        public void Add(string key, string relatedFile, CachedData cachedData) 
        {
            Add(key, GetLastModifiedUtc(relatedFile), cachedData);
        }

        public void Add(string key, IEnumerable<string> relatedFiles, CachedData cachedData)
        {
            Add(key, GetLastModifiedUtc(relatedFiles), cachedData);
        }

        private void Add(string key, DateTime lastModifiedUtc, CachedData cachedData)
        {
            string cacheFilePath = GetCacheFilePath(key);

            try
            {
                _serializer(cachedData, cacheFilePath);
                C1File.SetCreationTimeUtc(cacheFilePath, lastModifiedUtc);
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to add data to cache '{0}'. Key: '{1}'", _cacheName, key);
                Log.LogWarning(LogTitle, ex);
            }
        }

        public bool Get(string key, string relatedFile, out CachedData cachedData)
        {
            return Get(key, new[] { relatedFile }, out cachedData);
        }

        public bool Get(string key, string[] relatedFiles, out CachedData cachedData)
        {
            return Get(key, GetLastModifiedUtc(relatedFiles), out cachedData);
        }

        private static DateTime GetLastModifiedUtc(string filePath)
        {
            return C1File.GetLastWriteTimeUtc(filePath);
        }

        private static DateTime GetLastModifiedUtc(IEnumerable<string> relatedFiles)
        {
            DateTime maxLastModifiedUtc = DateTime.MinValue;

            foreach (var filePath in relatedFiles)
            {
                if (!string.IsNullOrWhiteSpace(filePath) && C1File.Exists(filePath))
                {
                    DateTime lastModifiedUtc = C1File.GetLastWriteTimeUtc(filePath);
                    if (lastModifiedUtc > maxLastModifiedUtc)
                    {
                        maxLastModifiedUtc = lastModifiedUtc;
                    }
                }
            }

            return maxLastModifiedUtc;
        }

        private bool Get(string key, DateTime lastModifiedUtc, out CachedData cachedData)
        {
            string cacheFileName = GetCacheFilePath(key);

            try
            {
                if (!C1File.Exists(cacheFileName) || C1File.GetCreationTimeUtc(cacheFileName) != lastModifiedUtc)
                {
                    cachedData = null;
                    return false;
                }

                cachedData = _deserializer(cacheFileName);
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, $"Failed to load cached data. Cache '{key}', file: '{cacheFileName}'");
                Log.LogWarning(LogTitle, ex);

                cachedData = null;
                return false;
            }
            return true;
        }

        private string GetCacheFilePath(string key)
        {
            string nameHash = key.GetHashCode().ToString(CultureInfo.InvariantCulture);

            return Path.Combine(_cachefolder, _cacheName + nameHash);
        }
    }

}
