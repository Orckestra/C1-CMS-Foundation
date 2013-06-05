using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Core.IO;
using Composite.Core.Configuration;
using System.IO;
using Composite.Data.Caching;

namespace Composite.Core.WebClient.Renderings.Template
{
    /// <summary>
    /// Provides access to Page Template Features
    /// </summary>
    public static class PageTemplateFeatureFacade
    {
        private static readonly Cache<string, XhtmlDocument> _featureCache = new Cache<string, XhtmlDocument>("Page Template Features");
        private static List<string> _featureNamesCache;

        private static readonly object _lock = new object();

        private static C1FileSystemWatcher _featureDirectoryFileSystemWatcher;


        /// <summary>
        /// Gets a Page Template Feature based on name.
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to return.</param>
        /// <returns></returns>
        public static XhtmlDocument GetPageTemplateFeature(string featureName)
        {
            EnsureWatcher();

            string featureKey = featureName.ToLowerInvariant();

            XhtmlDocument cachedFeatureDocument = _featureCache.Get(featureKey);

            if (cachedFeatureDocument == null)
            {
                lock (_lock)
                {
                    cachedFeatureDocument = _featureCache.Get(featureKey);

                    if (cachedFeatureDocument == null)
                    {
                        cachedFeatureDocument = LoadPageTemplateFeature(featureName);

                        _featureCache.Add(featureKey, cachedFeatureDocument);
                    }
                }

            }

            return new XhtmlDocument(cachedFeatureDocument);
        }


        /// <summary>
        /// Gets the feature names.
        /// </summary>
        public static IEnumerable<string> FeatureNames
        {
            get
            {
                EnsureWatcher();

                List<string> featureNames = _featureNamesCache;

                if (featureNames == null)
                {
                    lock (_lock)
                    {
                        featureNames = _featureNamesCache;

                        if (featureNames == null)
                        {
                            string featureDirectoryPath = PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory);
                            C1DirectoryInfo featureDirectory = new C1DirectoryInfo(featureDirectoryPath);

                            var files = featureDirectory.GetFiles("*.xml").Concat(featureDirectory.GetFiles("*.html"));

                            featureNames = new List<string>();

                            foreach (var file in files)
                            {
                                featureNames.Add(Path.GetFileNameWithoutExtension(file.Name));
                            }

                            featureNames =  featureNames.Distinct().ToList();

                            _featureNamesCache = featureNames;
                        }
                    }
                }
                
                return featureNames;
            }
        }

        /// <summary>
        /// Gets the path of a named feature
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to get path for.</param>
        /// <returns></returns>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static string GetPageTemplateFeaturePath(string featureName)
        {
            string extensionlessPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), featureName);

            if (C1File.Exists(extensionlessPath + ".html"))
            {
                return extensionlessPath + ".html";
            }
            else if (C1File.Exists(extensionlessPath + ".xml"))
            {
                return extensionlessPath + ".xml";
            }
            else
            {
                return null;
            }
        }



        /// <summary>
        /// Gets the path of a named feature
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to get path for.</param>
        /// <param name="extension">The extension.</param>
        /// <returns></returns>
        /// <exclude/>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static string GetNewPageTemplateFeaturePath(string featureName, string extension)
        {
            if (!extension.StartsWith("."))
            {
                extension = "." + extension;
            }

            if (extension != ".xml" && extension != ".html")
            {
                throw new ArgumentException("Expecting '.xml' or '.html'", "extension");
            }

            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), featureName + extension);
        }


        /// <summary>
        /// Loads a Page Template Feature based on name.
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to load.</param>
        /// <returns></returns>
        private static XhtmlDocument LoadPageTemplateFeature(string featureName)
        {
            string featurePath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), featureName + ".xml");

            if (!C1File.Exists(featurePath))
            {
                featurePath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), featureName + ".html");
            }

            if (!C1File.Exists(featurePath))
            {
                throw new InvalidOperationException("Unknown feature '" + featureName + "'");
            }

            var doc = XDocumentUtils.Load(featurePath);

            return new XhtmlDocument(doc);
        }


        private static void EnsureWatcher()
        {
            if (_featureDirectoryFileSystemWatcher==null)
            {
                lock (_lock)
                {
                    if (_featureDirectoryFileSystemWatcher == null)
                    {
                        string featureDirectoryPath = PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory);

                        _featureDirectoryFileSystemWatcher = new C1FileSystemWatcher(featureDirectoryPath,"*");

                        _featureDirectoryFileSystemWatcher.Changed += FeatureDirectory_Changed;
                        _featureDirectoryFileSystemWatcher.Created += FeatureDirectory_Changed;
                        _featureDirectoryFileSystemWatcher.Deleted += FeatureDirectory_Changed;
                        _featureDirectoryFileSystemWatcher.Renamed += FeatureDirectory_Changed;
                        _featureDirectoryFileSystemWatcher.EnableRaisingEvents = true;

                    }
                }
            }
        }

        private static void FeatureDirectory_Changed(object sender, FileSystemEventArgs e)
        {
            lock (_lock)
            {
                _featureNamesCache = null;
                _featureCache.Clear();
            }
        }


    }
}
